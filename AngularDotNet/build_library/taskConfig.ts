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
            this.visualProject = "";
        } else {
            this.visualProject = visualProject;
        }

        console.log(JSON.stringify(this.getBuildConfiguration(), null, 2));
        if (this.waitOnCompleted) {
            while (true) { }
        }
    }
}
