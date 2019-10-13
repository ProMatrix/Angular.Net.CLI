import { CommonTasks } from "./build_library/commonTasks";
import { DeveloperSettings } from "./wwwroot/shared/client-side-models/buildModels";
import { TaskBase } from "./taskBase";
import * as _ from "lodash";
import fs = require('fs');

export class TaskRemove extends TaskBase {
    constructor() {
        const ct = new CommonTasks();
        super();
        const visualProject = this.findValueOf("visualProject");
        const angularProject = this.findValueOf("angularProject");
        console.log("\n" + visualProject + ": " + angularProject);
        this.waitOnCompleted = false;
        if (this.findValueOf("waitOnCompleted") === "true")
            this.waitOnCompleted = true;
        process.chdir("..//");

        // update the DeveloperSettings
        const ds = this.getDevelopersSettings(visualProject) as Array<DeveloperSettings>;
        ds.forEach((d: DeveloperSettings) => {
            d.serveApp = "desktop";
            const ngProject = _.find(d.angularProjects, x => (x.name.toLowerCase() === angularProject.toLowerCase()));
            if (ngProject) {
                _.remove(d.angularProjects, ngProject);
            }
        });
        this.saveDevelopersSettings(visualProject, ds);

        // update the angular.json
        const aj = this.getAngularJson(visualProject);
        delete aj.projects[angularProject];
        this.saveAngularJson(visualProject, aj);

        // update the package.json
        const pj = this.getPackageJson(visualProject);
        const script = "serveApp:" + angularProject;
        delete pj.scripts[script];
        this.savePackageJson(visualProject, pj);

        // remove the folders
        const projectPath = process.cwd() + "\\" + visualProject + "\\wwwroot\\projects\\" + angularProject;
        ct.removeDirectory(projectPath);
        console.log("Completed removing: " + angularProject + " from Visual Studio project: " + visualProject);
        while (this.waitOnCompleted) { };
    }
}
