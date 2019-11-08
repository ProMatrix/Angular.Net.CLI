import { TaskLaunch } from "./taskLaunch";

try {
    const noop = new TaskLaunch();
} catch (e) {
    console.log(e);
    while (true) { }
}