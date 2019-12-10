import { TaskGitMerge } from '../../angularnetcore/build_library/taskGitMerge';
import { TaskNpmUpdate } from '../../angularnetcore/build_library/taskNpmUpdate';

export class PrePush {

    constructor() {
        try {
            // assume the libary_ng is in wwwroot, find the path for the npm update
            const cwd = process.cwd();
            process.chdir('../');
            const wwwroot = process.cwd();
            process.chdir(cwd);
            const tgm = new TaskGitMerge('master', 'npm');

            process.chdir(wwwroot);
            if (tgm.mergeCompleted) {
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