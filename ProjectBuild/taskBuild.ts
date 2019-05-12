﻿import { ColoredLogger } from "./build_library/coloredLogger";
import { BuildConfiguration, AngularProject, VisualProject } from "./wwwroot/shared/client-side-models/buildModels";
import { Versioning } from "./build_library/versioning";
import { CommonTasks } from "./build_library/commonTasks";
import { CommandLine } from "./build_library/commandLine";
import { ProductionReady } from "./build_library/productionReady";
import { TaskBase } from "./taskBase";
const _ = require("lodash");

export class TaskBuild extends TaskBase {
    private readonly cl = new ColoredLogger();
    private readonly ver = new Versioning();
    private readonly pr = new ProductionReady();
    private readonly cli = new CommandLine();
    private readonly ct = new CommonTasks();
    private ngProjectQueue: Array<AngularProject>;
    private cwd: string;
    private synchronous = true;
    constructor() {
        super();
        const waitOnCompleted = this.getCommandArg("waitOnCompleted", "unknown");
        if (waitOnCompleted === "unknown")
            return;

        if (waitOnCompleted === "true")
            this.waitOnCompleted = true;

        const synchronous = this.getCommandArg("synchronous", "unknown");
        if (synchronous === "false")
            this.synchronous = false;

        const visualProject = this.getCommandArg("visualProject", "unknown");
        if (visualProject !== "unknown")
            this.single(visualProject);
        else
            this.multiple();
    }

    single(visualProject: string) {
        this.cwd = process.cwd();
        const bc = this.getBuildConfiguration();
        const vsProject = _.find(bc.visualProjects, x => (x.name === visualProject)) as VisualProject;
        if (!vsProject)
            throw new Error("Can't find vsProject: " + visualProject);
        this.buildVsProject(vsProject);
    }

    multiple() {
        this.cwd = process.cwd();
        const bc = this.getBuildConfiguration() as BuildConfiguration;
        bc.visualProjects.forEach(visualProject => {
            if (visualProject.developerSettings.buildHook)
                this.buildVsProject(visualProject);
        });
    }

    private buildVsProject(vsProject: VisualProject) {
        const angularProjects = _.filter(vsProject.developerSettings.angularProjects, (x => x.buildEnabled)) as Array<AngularProject>;
        if (angularProjects.length === 0) {
            console.log("There are not Angular projects with Build enabled!");
            while (this.waitOnCompleted) { };
        } else {
            this.ngProjectQueue = _.cloneDeep(angularProjects);
            this.nextNgProject(vsProject);
        }
    }

    private nextNgProject(vsProject: VisualProject) {
        const ngProject = this.ngProjectQueue.shift();
        const distFolder = "dist/" + ngProject.distFolder;
        process.chdir(this.cwd);
        process.chdir("..\\" + vsProject.name);
        const vsProjectDir = process.cwd();
        const appVersion = this.ver.updateVersions().application;
        process.chdir("wwwroot\\dist");
        this.ct.removeDirectory(ngProject.distFolder);
        process.chdir("..\\");
        this.pr.embed_image(vsProjectDir + ngProject.angularModule);
        this.pr.embed_image(vsProjectDir + "\\wwwroot\\features");

        if (ngProject.angularProjectDir.length > 0)
            process.chdir(ngProject.angularProjectDir);

        this.pr.squash(vsProjectDir + ngProject.angularModule);
        //this.pr.squash(vsProjectDir + "\\wwwroot\\features");
        console.log("\nBeginning build of: " + vsProject.name + " (" + ngProject.name + ")");


        //???
        //this.pr.unSquash(vsProjectDir + ngProject.angularModule);
        //this.pr.unSquash(vsProjectDir + "\\wwwroot\\features");
        //console.log("Completed build of: " + vsProject.name + " (" + ngProject.name + ") : Version: " + appVersion);
        //???
        return;
        this.cli.executeBuild(ngProject.angularRoot, distFolder, ngProject.production, this.synchronous, () => {
            this.pr.unSquash(vsProjectDir + ngProject.angularModule);
            this.pr.unSquash(vsProjectDir + "\\wwwroot\\features");
            process.chdir(vsProjectDir + "\\" + "wwwroot");
            this.pr.copyProjectFiles(distFolder);
            this.pr.manageManifestPath(distFolder);

            if (ngProject.pwaSupport) {
                this.pr.createServiceWorker(distFolder, appVersion);
                this.pr.enableServiceWorker(distFolder);
            }
            else {
                this.pr.removeServiceWorker(distFolder);
            }
            console.log("Completed build of: " + vsProject.name + " (" + ngProject.name + ") : Version: " + appVersion);
            if (this.ngProjectQueue.length === 0) {

                while (this.waitOnCompleted) { }
            }
            else {
                this.nextNgProject(vsProject);
            }
        });
    }
}

try {
    new TaskBuild();
} catch (e) {
    console.log(e);
    while (true) { }
}