import { TaskGitCommit } from './taskGitCommit';

try {
    const noop = new TaskGitCommit();
} catch (e) {
    console.log(e);
    while (true) { }
}
