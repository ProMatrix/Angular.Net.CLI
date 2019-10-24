import { TaskAdd } from "./taskAdd";

try {
    const noop = new TaskAdd();
} catch (e) {
    console.log(e);
    while (true) { }
}
