﻿const _ = require("lodash");
import { CommandLine } from "./build_library/commandLine";
import { TaskBase } from "./taskBase";
import { VisualProject } from "./wwwroot/shared/client-side-models/buildModels";

export class TaskLaunch extends TaskBase {
    private cli = new CommandLine();
    constructor() {
        super();
        const visualProject = this.getCommandArg("visualProject", "unknown");
        if (visualProject !== "unknown")
            this.execute(visualProject);
    }

    execute(vsProjectName: string) {
        let cwd = process.cwd();
        const bc = this.getBuildConfiguration();
        process.chdir(cwd);
        const vsProject = _.find(bc.visualProjects, x => (x.name === vsProjectName)) as VisualProject;
        if (!vsProject)
            throw new Error("Can't find vsProject: " + vsProjectName);
        process.chdir("../" + vsProjectName);
        cwd = process.cwd();
        const startChrome = "start chrome --app=" + vsProject.applicationUrl;

        this.cli.executeSync(startChrome);
        this.cli.executeLaunch(vsProjectName, () => {
        });
    }
}
try {
    new TaskLaunch();
} catch (e) {
    console.log(e);
    while (true) { }
}