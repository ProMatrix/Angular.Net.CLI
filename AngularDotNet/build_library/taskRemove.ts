import { CommonTasks } from "../build_library/commonTasks";
import { DeveloperSettings } from "../wwwroot/shared/client-side-models/buildModels";
import { TaskBase } from "./taskBase";
import * as _ from "lodash";
import fs = require('fs');

export class TaskRemove extends TaskBase {
    constructor($waitOnCompleted?: boolean, $visualProject?: string, $angularProject?: string) {
        const ct = new CommonTasks();
        super();

        if ($waitOnCompleted !== null && $waitOnCompleted !== undefined) {
            this.waitOnCompleted = $waitOnCompleted;
        } else {
            const waitOnCompleted = this.getCommandArg("waitOnCompleted", "true");
            if (waitOnCompleted === "true") {
                this.waitOnCompleted = true;
            } else {
                this.waitOnCompleted = false;
            }
        }

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

        if ($angularProject !== null && $angularProject !== undefined) {
            this.angularProject = $angularProject;
        } else {
            const angularProject = this.getCommandArg("angularProject", "unknown");
            if (angularProject === "unknown") {
                throw new Error("angularProject parameter is missing!");
            } else {
                this.angularProject = angularProject;
            }
        }

        process.chdir("..//");
        // update the DeveloperSettings
        const ds = this.getDevelopersSettings(this.visualProject) as Array<DeveloperSettings>;
        ds.forEach((d: DeveloperSettings) => {
            d.serveApp = "desktop";
            const ngProject = _.find(d.angularProjects, x => (x.name.toLowerCase() === this.angularProject.toLowerCase()));
            if (ngProject) {
                _.remove(d.angularProjects, ngProject);
            }
        });
        this.saveDevelopersSettings(this.visualProject, ds);

        // update the angular.json
        const aj = this.getAngularJson(this.visualProject);
        delete aj.projects[this.angularProject];
        this.saveAngularJson(this.visualProject, aj);

        // update the package.json
        const pj = this.getPackageJson(this.visualProject);
        const script = "serveApp:" + this.angularProject;
        delete pj.scripts[script];
        this.savePackageJson(this.visualProject, pj);

        // remove the folders
        const projectPath = process.cwd() + "\\" + this.visualProject + "\\wwwroot\\projects\\" + this.angularProject;
        ct.removeDirectory(projectPath);
        console.log("Completed removing: " + this.angularProject + " from Visual Studio project: " + this.visualProject);
        while (this.waitOnCompleted) { }
    }
}
