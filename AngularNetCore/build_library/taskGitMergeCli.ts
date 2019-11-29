import { TaskGitMerge } from './taskGitMerge';

try {
    const noop = new TaskGitMerge();
} catch (e) {
    console.log(e);
    while (true) { }
}
