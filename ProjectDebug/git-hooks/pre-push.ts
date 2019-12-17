import { TaskGitPush } from '../../angularnetcore/build_library/taskGitPush';
import { TaskNpmUpdate } from '../../angularnetcore/build_library/taskNpmUpdate';

export class PrePush {

    constructor() {
        try {
            // assume the libary_ng is in wwwroot, find the path for the npm update
            const tgp = new TaskGitPush('npm');
            process.chdir('..\\..\\');
            // should be in wwwroot
            if (tgp.publishCompleted) {
                new TaskNpmUpdate('ng2-express');
            }
            // we can only see the console.log is the process.exit(1);
            // process.exit(1);
        } catch (e) {
            console.error(e.message);
            process.exit(1);
        }
    }
}
new PrePush();