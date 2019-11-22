import { TaskGitCommit } from '../../angularnetcore/build_library/taskGitCommit';

export class PreCommit {

    constructor() {
        try {

        } catch (e) {
            console.error(e.message);
            process.exit(1);
        }
    }
}
new PreCommit();
