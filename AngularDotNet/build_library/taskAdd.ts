import { CommandLine } from "../build_library/commandLine";
import { TaskBase } from "./taskbase";
import { AngularProject } from "../wwwroot/shared/client-side-models/buildModels";

export class TaskAdd extends TaskBase {
    cli = new CommandLine();
    synchronous = false;
    constructor($visualProject?: string, $angularProject?: string, $synchronous?: boolean) {
        super();

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
        const cwd = process.cwd();

        this.addAngularProject(this.visualProject, this.angularProject, () => {
            process.chdir(cwd);
            // update the package.json
            const pj = this.getPackageJson(this.visualProject);
            if (!pj.scripts["serveApp:" + this.angularProject])
                pj.scripts["serveApp:" + this.angularProject] = "ng serve " + this.angularProject;
            this.savePackageJson(this.visualProject, pj);

            // update the DeveloperSettings
            const ds = this.getDevelopersSettings(this.visualProject);
            const newAngularProject = new AngularProject();
            newAngularProject.angularModule = "\\wwwroot\\projects\\" + this.angularProject + "\\src\\app";
            newAngularProject.angularProjectDir = "projects\\" + this.angularProject;
            newAngularProject.angularRoot = this.angularProject;
            newAngularProject.buildEnabled = false;
            newAngularProject.distFolder = "dist-" + this.angularProject;
            newAngularProject.name = this.angularProject;
            newAngularProject.production = false;
            newAngularProject.showPanel = false;
            newAngularProject.visualProject = null;

            ds.forEach((d) => {
                d.angularProjects.push(newAngularProject);
            });
            this.saveDevelopersSettings(this.visualProject, ds);
            console.log("Completed adding: " + this.angularProject + " to Visual Studio project: " + this.visualProject);
            while (this.waitOnCompleted) { }
        });
    }

    addAngularProject(visualProject: string, angularProject: string, callback: Function) {
        process.chdir(visualProject + "\\wwwroot");
        console.log("\nBeginning add to: " + visualProject + " Angular project: ");
        this.cli.executeAdd(angularProject, this.synchronous, () => {
            callback();
        });
    }
}
