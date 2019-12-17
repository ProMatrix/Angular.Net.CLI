import { TaskGitPush } from './taskGitPush';

try {
    process.chdir('..\\AngularNetCore\\wwwroot\\library_ng');
    const noop = new TaskGitPush();
} catch (e) {
    console.log(e);
}
while (true) { }
