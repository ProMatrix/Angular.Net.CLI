import { ColoredLogger } from "../build_library/coloredLogger";
import { BuildConfiguration, AngularProject, VisualProject } from "../wwwroot/shared/client-side-models/buildModels";
import { Versioning } from "../build_library/versioning";
import { CommonTasks } from "../build_library/commonTasks";
import { CommandLine } from "../build_library/commandLine";
import { ProductionReady } from "../build_library/productionReady";
import { TaskBase } from "./taskBase";
const _ = require("lodash");
import * as fs from "fs";
const ncp = require("ncp");

export class TaskBuild extends TaskBase {
    private readonly cl = new ColoredLogger();
    private readonly ver = new Versioning();
    private readonly pr = new ProductionReady();
    private readonly cli = new CommandLine();
    private readonly ct = new CommonTasks();
    private ngProjectQueue: Array<AngularProject>;
    private cwd: string;
    private synchronous = true;
    constructor($waitOnCompleted?: boolean, $visualProject?: string, $synchronous?: boolean) {
        super();

        if ($waitOnCompleted !== null) {
            this.waitOnCompleted = $waitOnCompleted;
        } else {
            const waitOnCompleted = this.getCommandArg("waitOnCompleted", "true");
            if (waitOnCompleted === "true") {
                this.waitOnCompleted = true;
            } else {
                this.waitOnCompleted = false;
            }
        }

        if ($synchronous !== null) {
            this.synchronous = $synchronous;
        } else {
            const synchronous = this.getCommandArg("synchronous", "true");
            if (synchronous === "true") {
                this.synchronous = true;
            } else {
                this.synchronous = false;
            }
        }

        if ($visualProject !== null) {
            this.visualProject = $visualProject;
        } else {
            const visualProject = this.getCommandArg("visualProject", "unknown");
            if (visualProject === "unknown") {
                throw new Error("visualProject parameter is missing!");
            } else {
                this.visualProject = visualProject;

            }
        }
        this.build(this.visualProject);
    }

    squash(visualProject: string) {
        const bc = this.getBuildConfiguration();
        const vsProject = _.find(bc.visualProjects, x => (x.name === visualProject)) as VisualProject;
        if (!vsProject) {
            throw new Error("Can't find vsProject: " + visualProject);
        }
        vsProject.developerSettings.angularProjects.forEach(ngProject => {
            process.chdir("..\\" + vsProject.name);
            const vsProjectDir = process.cwd();
            process.chdir("wwwroot");
            this.pr.embed_image(vsProjectDir + ngProject.angularModule);
            this.pr.embed_image(vsProjectDir + "\\wwwroot\\features");
            if (ngProject.angularProjectDir.length > 0) {
                process.chdir(ngProject.angularProjectDir);
            }
            this.pr.squash(vsProjectDir + ngProject.angularModule);
            this.pr.squash(vsProjectDir + "\\wwwroot\\features");
            console.log("Completed squash of: " + vsProject.name + " (" + ngProject.name + ")");
        });
    }

    unsquash(visualProject: string) {
        const bc = this.getBuildConfiguration();
        const vsProject = _.find(bc.visualProjects, x => (x.name === visualProject)) as VisualProject;
        if (!vsProject) {
            throw new Error("Can't find vsProject: " + visualProject);
        }
        vsProject.developerSettings.angularProjects.forEach(ngProject => {
            process.chdir("..\\" + vsProject.name);
            const vsProjectDir = process.cwd();
            this.pr.unSquash(vsProjectDir + ngProject.angularModule);
            this.pr.unSquash(vsProjectDir + "\\wwwroot\\features");
            console.log("Completed unsquash of: " + vsProject.name + " (" + ngProject.name + ")");
        });
    }

    build(visualProject: string) {
        this.cwd = process.cwd();
        const bc = this.getBuildConfiguration();
        const vsProject = _.find(bc.visualProjects, x => (x.name === visualProject)) as VisualProject;
        if (!vsProject) {
            throw new Error("Can't find vsProject: " + visualProject);
        }
        this.buildVsProject(vsProject);
    }

    private buildVsProject(vsProject: VisualProject) {
        const angularProjects = _.filter(vsProject.developerSettings.angularProjects, (x => x.buildEnabled)) as Array<AngularProject>;
        if (angularProjects.length === 0) {
            console.log("There are not Angular projects with Build enabled!");
            while (this.waitOnCompleted) { }
        } else {
            this.ngProjectQueue = _.cloneDeep(angularProjects);
            this.nextNgProject(vsProject);
        }
    }

    private nextNgProject(vsProject: VisualProject) {
        const ngProject = this.ngProjectQueue.shift();
        const outputFolder = "dist/" + ngProject.distFolder;
        process.chdir(this.cwd);
        process.chdir("..\\" + vsProject.name);
        const vsProjectDir = process.cwd();
        const appVersion = this.ver.updateVersions();

        if (!fs.existsSync("wwwroot\\dist")) {
            fs.mkdirSync("wwwroot\\dist");
        }

        process.chdir("wwwroot\\dist");
        this.ct.removeDirectory("temp");
        process.chdir("..\\dist");


        //this.ct.removeDirectory(ngProject.distFolder);
        //process.chdir("..\\");

        const cwd = process.cwd();

        // this.pr.embed_image(vsProjectDir + ngProject.angularModule);
        // this.pr.embed_image(vsProjectDir + "\\wwwroot\\features");

        // ???
        if (ngProject.angularProjectDir.length > 0) {
            process.chdir(ngProject.angularProjectDir);
        }

        console.log("\nBeginning build of: " + vsProject.name + " (" + ngProject.name + ")");
        this.cli.executeBuild(ngProject.angularRoot, "dist/temp", ngProject.production, this.synchronous, () => {

            this.ct.removeDirectory(ngProject.distFolder);
            ncp("temp", ngProject.distFolder, (err) => {
                if (err) {
                    return console.error(err);
                }

                process.chdir(vsProjectDir + "\\" + "wwwroot");
                this.pr.copyProjectFiles(outputFolder);
                this.pr.manageManifestPath(outputFolder);

                if (ngProject.pwaSupport) {
                    this.pr.createServiceWorker(outputFolder, appVersion);
                    this.pr.enableServiceWorker(outputFolder);
                } else {
                    this.pr.removeServiceWorker(outputFolder);
                }
                console.log("Completed build of: " + vsProject.name + " (" + ngProject.name + ") : Version: " + appVersion);
                if (this.ngProjectQueue.length === 0) {

                    while (this.waitOnCompleted) { }
                } else {
                    this.nextNgProject(vsProject);
                }

            });
        }, () => { // error callback
            console.log("Error building: " + vsProject.name + " (" + ngProject.name + ")");
        }
        );
    }
}