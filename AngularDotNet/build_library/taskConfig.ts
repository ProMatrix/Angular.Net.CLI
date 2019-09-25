import { TaskBase } from "./taskBase";

export class TaskConfig extends TaskBase {
    constructor() {
        super();

        const waitOnCompleted = this.getCommandArg("waitOnCompleted", "true");
        if (waitOnCompleted === "true") {
            this.waitOnCompleted = true;
        } else {
            this.waitOnCompleted = false;
        }

        const visualProject = this.getCommandArg("visualProject", "unknown");
        if (visualProject === "unknown") {
            throw new Error("visualProject parameter is missing!");
        } else {
            this.visualProject = visualProject;


        }

        console.log(JSON.stringify(this.getBuildConfiguration(), null, 2));
        if (this.waitOnCompleted) {
            while (true) { }
        }
    }
}
