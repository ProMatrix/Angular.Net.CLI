const _ = require("lodash");
import { CommandLine } from "../build_library/commandLine";
import { TaskBase } from "./taskBase";
import { VisualProject } from "../wwwroot/shared/client-side-models/buildModels";

export class TaskLaunch extends TaskBase {
    private cli = new CommandLine();
    private synchronous = true;

    constructor($visualProject?: string, $synchronous?: boolean) {
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
        this.launch(this.visualProject);
    }

    launch(vsProjectName: string) {
        let cwd = process.cwd();
        const bc = this.getBuildConfiguration();
        process.chdir(cwd);
        const vsProject = _.find(bc.visualProjects, x => (x.name === vsProjectName)) as VisualProject;
        if (!vsProject)
            throw new Error('Can\'t find vsProject: ' + vsProjectName);
        process.chdir('../' + vsProjectName);
        cwd = process.cwd();
        const startChrome = 'start chrome --app=' + vsProject.applicationUrl;

        this.cli.executeSync(startChrome);
        console.log('Launching: ' + vsProjectName + '...');
        this.cli.executeLaunch(vsProjectName, () => { }, this.synchronous);
    }
}
