const _ = require("lodash");
import { CommandLine } from "../build_library/commandLine";
import { TaskBase } from "./taskBase";
import { VisualProject } from "../wwwroot/shared/client-side-models/buildModels";

export class TaskLaunch extends TaskBase {
    private cli = new CommandLine();
    private synchronous = true;

    constructor($visualProject?: string, $synchronous?: boolean, $angularProject?: string) {
        super();

        if ($visualProject !== null && $visualProject !== undefined) {
            this.visualProject = $visualProject;
        } else {
            const visualProject = this.getCommandArg("visualProject", "unknown");
            if (visualProject === "unknown") {
                throw new Error("visualProject parameter is missing!");
            } else {
                this.visualProject = visualProject;
            }
        }

        if ($synchronous !== null && $synchronous !== undefined) {
            this.synchronous = $synchronous;
        } else {
            const synchronous = this.getCommandArg("synchronous", "true");
            if (synchronous === "true") {
                this.synchronous = true;
            } else {
                this.synchronous = false;
            }
        }

        if ($angularProject !== null && $angularProject !== undefined) {
            this.angularProject = $angularProject;
        } else {
            const angularProject = this.getCommandArg("angularProject", "unknown");
            if (angularProject !== "unknown") {
                this.angularProject = angularProject;
            }
        }
        this.launch();
    }

    launch() {
        let cwd = process.cwd();
        const bc = this.getBuildConfiguration();
        process.chdir(cwd);
        const vsProject = _.find(bc.visualProjects, x => (x.name === this.visualProject)) as VisualProject;
        if (!vsProject)
            throw new Error('Can\'t find vsProject: ' + this.visualProject);
        process.chdir('../' + this.visualProject);
        cwd = process.cwd();
        let startChrome = 'start chrome --app=' + vsProject.applicationUrl;
        if (this.angularProject) {
            startChrome += 'dist/' + this.angularProject + '/index.html';
        }
        this.cli.executeSync(startChrome);
        console.log('Launching: ' + this.visualProject + '...');
        this.cli.executeLaunch(this.visualProject, () => { }, this.synchronous);
    }
}
