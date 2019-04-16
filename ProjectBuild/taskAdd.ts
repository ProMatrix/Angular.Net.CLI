import { CommandLine } from "./build_library/commandLine";
import { TaskBase } from "./taskbase";
import { AngularProject } from "./wwwroot/shared/client-side-models/buildModels";

export class TaskAdd extends TaskBase {
    cli = new CommandLine();
    synchronous = false;
    constructor() {
        super();

        const visualProject = this.findValueOf("visualProject");
        const angularProject = this.findValueOf("angularProject");
        console.log("\n" + visualProject + ": " + angularProject);
        this.waitOnCompleted = false;
        if (this.findValueOf("waitOnCompleted") === "true")
            this.waitOnCompleted = true;
        if (this.findValueOf("synchronous") === "true")
            this.synchronous = true;

        process.chdir("..//");
        const cwd = process.cwd();

        this.addAngularProject(visualProject, angularProject, () => {
            process.chdir(cwd);
            // update the package.json
            const pj = this.getPackageJson(visualProject);
            if (!pj.scripts["serveApp:" + angularProject])
                pj.scripts["serveApp:" + angularProject] = "ng serve " + angularProject;
            this.savePackageJson(visualProject, pj);

            // update the DeveloperSettings
            const ds = this.getDevelopersSettings(visualProject);
            const newAngularProject = new AngularProject();
            newAngularProject.angularModule = "\\wwwroot\\projects\\" + angularProject + "\\src\\app";
            newAngularProject.angularProjectDir = "projects\\" + angularProject;
            newAngularProject.angularRoot = angularProject;
            newAngularProject.buildEnabled = false;
            newAngularProject.distFolder = "dist-" + angularProject;
            newAngularProject.name = angularProject;
            newAngularProject.production = false;
            newAngularProject.showPanel = false;
            newAngularProject.visualProject = null;

            ds.forEach((d) => {
                d.angularProjects.push(newAngularProject);
            });
            this.saveDevelopersSettings(visualProject, ds);
            console.log("Completed adding: " + angularProject + " to Visual Studio project: " + visualProject);
            while (this.waitOnCompleted) { };
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

try {
    new TaskAdd();
} catch (e) {
    console.log(e);
    while (true) { }
}
