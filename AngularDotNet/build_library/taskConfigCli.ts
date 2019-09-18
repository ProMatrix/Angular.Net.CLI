import { TaskConfig } from "./taskConfig";

try {
    new TaskConfig();
} catch (e) {
    console.log(e);
    if (this.waitOnCompleted) {
        while (true) { }
    }
}