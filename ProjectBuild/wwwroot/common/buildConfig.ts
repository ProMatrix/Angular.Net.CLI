import { Injectable, VERSION } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseServices } from "./baseServices";
import { AnalyticsData, Performance } from "../shared/client-side-models/analyticsData";
import * as moment from "moment";
import * as _ from "lodash";
import { BuildConfiguration, VisualProject, AngularProject, BuildResponse } from "../shared/client-side-models/buildModels";

@Injectable()
export class BuildConfig extends BaseServices {
    buildOutput = "";
    config = new BuildConfiguration();
    projectQueue: Array<AngularProject>;
    consoleWindow: HTMLTextAreaElement;
    visualProject: VisualProject;
    angularProject: AngularProject;
    constructor(public readonly http: HttpClient) {
        super(http);
    }

    getBuildConfig(success: Function, error: Function) {
        this.httpGet("build", "getConfig", "", (config: BuildConfiguration) => {
            this.config = config;
            success();
        },
            errorMessage => {
                error(errorMessage);
            });
    }

    buildAngularProject(angularProject: AngularProject, success: Function, error: Function) {
        this.angularProject = angularProject;
        this.httpPost("build", "buildAngularProject", angularProject, (buildResponse: BuildResponse) => {
            this.buildOutput += buildResponse.consoleWindow;
            let visualProject = _.filter(this.config.visualProjects, x => (x.name === this.visualProject.name))[0];
            visualProject.projectVersionNo = buildResponse.versionNo;
            success();
        },
            errorMessage => {
                error(errorMessage);
            });
    }

    buildAngularProjects(visualProject: VisualProject, success: Function, error: Function) {
        this.visualProject = visualProject;
        this.consoleWindow = document.querySelector(".textAreaForConsole");
        this.projectQueue = _.cloneDeep(visualProject.developerSettings.angularProjects);
        this.buildOutput = visualProject.name + ">";
        setTimeout(() => {
            this.projectQueue.forEach((project) => { project.visualProject = visualProject.name; });
            this.buildOutput = "";
            this.buildProjectLoop(success, error);
        }, 1000);
    }

    private buildProjectLoop(success: Function, error: Function) {
        this.nextAngularProject(() => {
            setTimeout(() => {
                this.consoleWindow.scrollTop = this.consoleWindow.scrollHeight;
            }, 0);

            if (this.projectQueue.length === 0)
                success();
            else
                this.buildProjectLoop(success, error);
        }, () => {
            error();
        });
    }

    private nextAngularProject(success: Function, error: Function) {
        const angularProject = this.projectQueue.shift();

        if (angularProject.buildEnabled) {
            this.buildOutput += angularProject.name + ">";
            const intervalId = setInterval(() => {
                this.buildOutput += ".";
            }, 250);

            this.buildAngularProject(angularProject, (build: any) => {
                clearInterval(intervalId);
                success();
            }, (errorMessage) => {
                error(errorMessage);
            });
        } else success();
    }

    saveVisualProject(visualProject: VisualProject, success: Function, error: Function) {
        this.httpPost("build", "saveVisualProject", visualProject, () => {
            success();
        },
            () => {
                error("Error: Problems saving changes! Could be that the server is not available.");
            });
    }

    updateImports(visualProject: VisualProject, success: Function, error: Function) {
        this.httpPost("build", "updateImports", visualProject, () => {
            success();
        },
            errorMessage => {
                error(errorMessage);
            });
    }

    updateExports(visualProject: VisualProject, success: Function, error: Function) {
        this.httpPost("build", "updateExports", visualProject, () => {
            success();
        },
            errorMessage => {
                error(errorMessage);
            });
    }

    isImportsUpdated(vsProject: VisualProject): boolean {
        return false;
    }

    getIsExportsUpdated(vsProject: VisualProject, success: Function, error: Function): boolean {
        this.httpGet("build", "getIsExportLibrariesSame", vsProject.name, (allFilesSame: boolean) => {
            success(allFilesSame);
        },
            errorMessage => {
                error(errorMessage);
            });
        return false;
    }

    addProject(visualProject: VisualProject, success: Function, error: Function) {
        this.httpPost("build", "addProject", visualProject, (visualProject: VisualProject) => {
            this.config.visualProjects = _.map(this.config.visualProjects, (x) => { return x.name === this.visualProject.name ? visualProject : x; });
            success();
        },
            errorMessage => {
                error(errorMessage);
            });
    }

    removeProject(visualProject: VisualProject, success: Function, error: Function) {
        this.httpPost("build", "removeProject", visualProject, () => {
            visualProject.developerSettings.serveApp = "desktop";
            success();
        },
            errorMessage => {
                error(errorMessage);
            });
    }

    launchApp(visualProject: VisualProject, success: Function, error: Function) {
        this.httpPost("build", "launchApp", visualProject, () => {
            success();
        },
            errorMessage => {
                error(errorMessage);
            });
    }

}
