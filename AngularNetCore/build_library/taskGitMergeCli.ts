import { TaskGitMerge } from './taskGitMerge';

try {
    const merge = new TaskGitMerge();
    merge.execute();
} catch (e) {
    console.log(e);
    while (true) { }
}
