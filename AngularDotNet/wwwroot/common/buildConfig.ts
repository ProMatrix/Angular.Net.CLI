import { Injectable, VERSION } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ApiService } from '../shared/enterprise/apiService';
import { AnalyticsData, Performance } from '../shared/client-side-models/analyticsData';
import * as moment from 'moment';
import * as _ from 'lodash';
import { BuildConfiguration, VisualProject, AngularProject, BuildResponse } from '../shared/client-side-models/buildModels';
import { environment } from '../src/environments/environment';
import { Store } from '@ngxs/store';

@Injectable()
export class BuildConfig extends ApiService {
  buildOutput = '';
  config = new BuildConfiguration();
  projectQueue: Array<AngularProject>;
  consoleWindow: HTMLTextAreaElement;
  angularProject: AngularProject;
  buildConfig = new BuildConfiguration();
  vsProject = new VisualProject();

  constructor(public store: Store, public readonly http: HttpClient) {
    super(http, store);
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
    this.post(angularProject, environment.api.buildAngularProject, (buildResponse: any) => {
      this.buildOutput += buildResponse.consoleWindow;
      success(buildResponse.versionNo);
    },
      errorMessage => {
        error(errorMessage);
      });

  }

  buildAngularProjects(success: (buildVersion: string) => void, error: () => void) {
    this.consoleWindow = document.querySelector('.textAreaForConsole');
    this.projectQueue = _.cloneDeep(this.vsProject.developerSettings.angularProjects);
    this.buildOutput = this.vsProject.name + '>';
    setTimeout(() => {
      this.projectQueue.forEach((project) => { project.visualProject = this.vsProject.name; });
      this.buildOutput = '';
      this.buildProjectLoop(success, error);
    }, 1000);
  }

  private buildProjectLoop(success: (buildVersion: string) => void, error: () => void) {
    this.nextAngularProject((buildVersion: string) => {
      setTimeout(() => {
        this.consoleWindow.scrollTop = this.consoleWindow.scrollHeight;
      }, 0);

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
      const intervalId = setInterval(() => {
        this.buildOutput += '.';
      }, 250);

      this.buildAngularProject(angularProject, (buildVersion: string) => {
        clearInterval(intervalId);
        success(buildVersion);
      }, (errorMessage) => {
        error();
      });
    } else {
      success(null);
    }
  }

  // updateImports(visualProject: VisualProject, success: Function, error: Function) {
  //    this.httpPost("build", "updateImports", visualProject, () => {
  //        success();
  //    },
  //        errorMessage => {
  //            error(errorMessage);
  //        });
  // }

  // updateExports(visualProject: VisualProject, success: Function, error: Function) {
  //    this.httpPost("build", "updateExports", visualProject, () => {
  //        success();
  //    },
  //        errorMessage => {
  //            error(errorMessage);
  //        });
  // }

  // isImportsUpdated(vsProject: VisualProject): boolean {
  //    return false;
  // }

  // getIsExportsUpdated(vsProject: VisualProject, success: Function, error: Function): boolean {
  //    this.httpGet("build", "getIsExportLibrariesSame", vsProject.name, (allFilesSame: boolean) => {
  //        success(allFilesSame);
  //    },
  //        errorMessage => {
  //            error(errorMessage);
  //        });
  //    return false;
  // }

  // addProject(visualProject: VisualProject, success: Function, error: Function) {
  //    this.httpPost("build", "addProject", visualProject, (visualProject: VisualProject) => {
  //        this.config.visualProjects = _.map(this.config.visualProjects, (x) => { return x.name === this.visualProject.name ? visualProject : x; });
  //        success();
  //    },
  //        errorMessage => {
  //            error(errorMessage);
  //        });
  // }

  // removeProject(visualProject: VisualProject, success: Function, error: Function) {
  //    this.httpPost("build", "removeProject", visualProject, () => {
  //        visualProject.developerSettings.serveApp = "desktop";
  //        success();
  //    },
  //        errorMessage => {
  //            error(errorMessage);
  //        });
  // }

  // launchApp(visualProject: VisualProject, success: Function, error: Function) {
  //    this.httpPost("build", "launchApp", visualProject, () => {
  //        success();
  //    },
  //        errorMessage => {
  //            error(errorMessage);
  //        });
  // }

}
