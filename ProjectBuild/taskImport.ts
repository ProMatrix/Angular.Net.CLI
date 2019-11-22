import { TaskBase } from "./taskBase";
import { Librarian } from "./build_library/librarian";
import { BuildConfiguration, VisualProject } from "./wwwroot/shared/client-side-models/buildModels";
const _ = require("lodash");

export class TaskImport extends TaskBase {
    private readonly lib = new Librarian();
    constructor() {
        super();

        const waitOnCompleted = this.getCommandArg("waitOnCompleted", "unknown");
        if (waitOnCompleted === "unknown")
            return;
        this.waitOnCompleted = true;
        const visualProject = this.getCommandArg("visualProject", "unknown");
        if (visualProject !== "unknown")
            this.single(visualProject);
        else
            this.multiple();
    });

    single(visualProject: string) {
        const bc = this.getBuildConfiguration() as BuildConfiguration;
        this.lib.importLibrariesForVsProject(bc, visualProject);
        console.log("Import Single Completed!");
        while (this.waitOnCompleted) { }
    }

    multiple() {
        const bc = this.getBuildConfiguration() as BuildConfiguration;
        const visualProjects = _.filter(bc.visualProjects, x => (x.developerSettings.importHook)) as Array<VisualProject>;
        visualProjects.forEach(visualProject => {
            if (visualProject.name !== "ProjectBuild")
                if (visualProject.developerSettings.importHook)
                    this.lib.importLibrariesForVsProject(bc, visualProject.name);
        });
        console.log("Import Multiple Completed!");
        while (this.waitOnCompleted) { }
    }
}

try {
    new TaskImport();
} catch (e) {
    console.log(e);
    while (true) { }
}
