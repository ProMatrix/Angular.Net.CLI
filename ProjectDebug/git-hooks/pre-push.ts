import { TaskGitMerge } from '../../angularnetcore/build_library/taskGitMerge';
export class PrePush {

    constructor() {
        try {
            new TaskGitMerge('master', 'publish');
        } catch (e) {
            console.error(e.message);
            process.exit(1);
        }
    }
}
new PrePush();