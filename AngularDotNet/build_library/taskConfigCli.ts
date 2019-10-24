import { TaskConfig } from "./taskConfig";

try {
    const noop = new TaskConfig();
} catch (e) {
    console.log(e);
    if (this.waitOnCompleted) {
        while (true) { }
    }
}