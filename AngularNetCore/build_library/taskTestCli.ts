import { TaskGitMerge } from './taskGitMerge';
import { TaskNpmUpdate } from './taskNpmUpdate';
try {
    let cwd = process.cwd();
    while (true) {
        process.chdir(cwd);
        process.chdir('..\\AngularNetCore\\wwwroot\\library_ng');
        const noop1 = new TaskGitMerge('master', 'npm');
        process.chdir(cwd);
        process.chdir('..\\AngularNetCore\\wwwroot');
        const noop2 = new TaskNpmUpdate('ng2-express');
    }
} catch (e) {
    console.log(e);
    while (true) { }
}
