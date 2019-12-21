import { TaskGitPush } from '../../angularnetcore/build_library/taskGitPush';
import { TaskNpmPublish } from '../../angularnetcore/build_library/taskNpmPublish';

export class PrePush {

    constructor() {
        try {
            return;
            // assume the libary_ng is in wwwroot, find the path for the npm update
            const tgp = new TaskNpmPublish('ng2-express', 'npm');
            //process.chdir('..\\'); // quick

            process.chdir('..\\..\\');
            // should now be in wwwroot
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