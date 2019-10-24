import { TaskRemove } from "./taskRemove";

try {
    const noop = new TaskRemove();
} catch (e) {
    console.log(e);
    while (true) { }
}
