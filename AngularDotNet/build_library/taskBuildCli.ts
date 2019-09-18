import { TaskBuild } from "./taskBuild";

try {
    new TaskBuild();
} catch (e) {
    console.log(e);
    while (true) { }
}