import { TaskGitMerge } from './taskGitMerge';

try {
    process.chdir('..\\AngularNetCore\\wwwroot\\library_ng');
    const noop = new TaskGitMerge();
    while (true) { }
} catch (e) {
    console.log(e);
    while (true) { }
}
