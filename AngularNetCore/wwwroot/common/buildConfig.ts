import { Injectable, VERSION } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { ApiService } from './apiService';
import { AnalyticsData, Performance, BuildConfiguration, VisualProject, AngularProject, BuildResponse } from 'ngx-modeling';
import { environment } from '../src/environments/environment';
import { Store } from '@ngxs/store';

export class EventProperties {
  exception: string;
  message: string;
  entryType: number;
}

export class EventLogEntry {
  canRaiseEvents: boolean;
  category: string;
  categoryNumber: number;
  container: any;
  data: Array<number>;
  designMode: boolean;
  entryType: number;
  eventID: number;
  events: any;
  index: number;
  instanceId: number;
  machineName: string;
  message: string;
  replacementStrings: Array<string>;
  site: any;
  source: string;
  timeGenerated: Date;
  timeWritten: Date;
  userName: string;
}

@Injectable()
export class BuildConfig extends ApiService {
  buildOutput = '';
  config = new BuildConfiguration();
  projectQueue: Array<AngularProject>;
  consoleWindow: HTMLTextAreaElement;
  angularProject: AngularProject;
  buildConfig = new BuildConfiguration();
  vsProject = new VisualProject();
  eventLogEntries = new Array<EventLogEntry>();
  eventProperties: EventProperties = { exception: '', message: '', entryType: 1 };

  constructor(public store: Store, public readonly http: HttpClient) {
    super(http, store);
  }

  throwException(success: () => any, error: (x: string) => any) {
    this.post(this.eventProperties, environment.api.throwException, (response: HttpResponse<any>) => {
      success();
    }, () => {
      error('Error: Successfully generated an Application Exception!');
    });
  }

  logEntry(success: () => any, error: (x: string) => any) {
    this.post(this.eventProperties, environment.api.postLogEntry, (response: HttpResponse<any>) => {
      success();
    }, () => {
      error('Error: Successfully created a log entry!');
    });
  }

  getLogEntries(success: () => void, error: (x: string) => void) {
    this.get(environment.api.getLogEntries,
      (eventLogEntries: Array<EventLogEntry>) => {
        this.eventLogEntries = eventLogEntries;
        this.eventLogEntries.forEach(entry => {
          entry.timeGenerated = new Date(entry.timeGenerated);
          entry.timeWritten = new Date(entry.timeWritten);
          entry.replacementStrings[1] = entry.replacementStrings[1].replace('\n', '<br />');
        });
        success();
      }, (errorMessage: string) => { error(errorMessage); });
  }

  getBuildConfig(success: () => void, error: (x: string) => void) {
    this.get(environment.api.getBuildConfig,
      (buildConfig: BuildConfiguration) => {
        this.buildConfig = buildConfig;
        this.vsProject = buildConfig.visualProjects[0];
        success();
      }, (errorMessage: string) => { error(errorMessage); });
  }

  saveVisualProject(success: () => any, error: (x: string) => any) {
    this.post(this.vsProject, environment.api.saveVisualProject, (response: HttpResponse<any>) => {
      success();
    }, () => {
      error('Error: Problems saving changes! Could be that the server is not available.');
    });
  }

  buildAngularProject(angularProject: AngularProject, success: (buildVersion: string) => any, error: (x: string) => any) {
    this.angularProject = angularProject;

    setTimeout(() => {
      this.post(angularProject, environment.api.buildAngularProject, (buildResponse: BuildResponse) => {
        switch (buildResponse.payloadType) {
          case 'processing':
            this.buildAngularProject(angularProject, success, error);
            this.buildOutput += buildResponse.consoleText;
            break;
          case 'completed':
            this.buildOutput += buildResponse.consoleText;
            success(buildResponse.versionNo);
            break;
          case 'errored':
            this.buildOutput += buildResponse.consoleText;
            error('Error while building: ' + angularProject.name);
            break;
        }
        setTimeout(() => {
          this.consoleWindow.scrollTop = this.consoleWindow.scrollHeight;
        }, 0);
      }, errorMessage => {
        error(errorMessage);
      });

    }, 1000);
  }

  buildAngularProjects(success: (buildVersion: string) => void, error: () => void) {
    this.consoleWindow = document.querySelector('.textAreaForConsole');
    this.projectQueue = this.vsProject.developerSettings.angularProjects.filter((angularProject) => angularProject.buildEnabled === true);
    this.buildOutput = this.vsProject.name + '>';
    setTimeout(() => {
      this.projectQueue.forEach((project) => { project.visualProject = this.vsProject.name; });
      this.buildOutput = '';
      this.buildProjectLoop(success, error);
    }, 1000);
  }

  private buildProjectLoop(success: (buildVersion: string) => void, error: () => void) {
    this.nextAngularProject((buildVersion: string) => {
      if (this.projectQueue.length === 0) {
        success(buildVersion);
      } else {
        this.buildProjectLoop(success, error);
      }
    }, () => {
      error();
    });
  }

  private nextAngularProject(success: (buildVersion: string) => void, error: () => void) {
    const angularProject = this.projectQueue.shift();

    if (angularProject.buildEnabled) {
      this.buildOutput += angularProject.name + '>';
      this.buildAngularProject(angularProject, (buildVersion: string) => {
        success(buildVersion);
      }, (errorMessage) => {
        error();
      });
    } else {
      success(null);
    }
  }

  addProject(success: () => void, error: (x: string) => void, finale: () => void) {
    const vsp = new VisualProject();
    vsp.name = this.vsProject.name;
    vsp.developerSettings.angularProjects = Array.from(this.vsProject.developerSettings.angularProjects);
    vsp.developerSettings.angularProjects.push(this.angularProject);
    this.post(vsp, environment.api.addAngularProject, (visualProject: VisualProject) => {
      this.vsProject = visualProject;
      success();
      finale();
    },
      errorMessage => {
        error(errorMessage);
        finale();
      });
  }

  removeProject(success: () => void, error: (x: string) => void) {
    const angularProjects = Array.from(this.vsProject.developerSettings.angularProjects);
    // move the AngularProject to the bottom
    const projectToMove = this.vsProject.developerSettings.angularProjects.splice(this.vsProject.developerSettings.angularProjects.indexOf(this.angularProject), 1)[0];
    this.vsProject.developerSettings.angularProjects.push(projectToMove);
    this.post(this.vsProject, environment.api.removeAngularProject, () => {
      this.vsProject.developerSettings.serveApp = 'desktop';
      this.vsProject.developerSettings.angularProjects.pop();
      success();
    },
      errorMessage => {
        this.vsProject.developerSettings.angularProjects = angularProjects;
        error(errorMessage);
      });
  }
}
