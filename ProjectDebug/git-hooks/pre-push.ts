import { TaskGitMerge } from '../../angularnetcore/build_library/taskGitMerge';
export class PrePush {

    constructor() {
        try {
            new TaskGitMerge('master', 'npm');

            // we can only see the console.log is the process.exit(1);
            // process.exit(1);
        } catch (e) {
            console.error(e.message);
            process.exit(1);
        }
    }
}
new PrePush();