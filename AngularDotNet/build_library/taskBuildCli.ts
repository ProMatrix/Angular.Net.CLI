import { TaskBuild } from './taskBuild';

try {
    const noop = new TaskBuild();
} catch (e) {
    console.log(e);
    while (true) { }
}
