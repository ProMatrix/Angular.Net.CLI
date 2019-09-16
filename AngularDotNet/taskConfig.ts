import { TaskBase } from "./taskBase";

export class TaskConfig extends TaskBase {
  constructor() {
    super();

    const visualProject = this.getCommandArg("waitOnCompleted", "unknown");
    if (visualProject !== "unknown") {
      this.waitOnCompleted = true;
    }

    console.log(JSON.stringify(this.getBuildConfiguration(), null, 2));
    if (this.waitOnCompleted) {
      while (true) { }
    }
  }
}
