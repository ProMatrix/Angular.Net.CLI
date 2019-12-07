import { TaskGitMerge } from '../../angularnetcore/build_library/taskGitMerge';

export class PreCommit {

    constructor() {
        try {
            throw new Error('Bad Juju');
            //new TaskGitMerge('master', 'release');
        } catch (e) {
            console.error(e.message);
            process.exit(1);
        }
    }
}
new PreCommit();