import { TaskGitCommit } from '../../angularnetcore/build_library/taskGitCommit';

export class PreCommit {

    constructor() {
        try {
            process.chdir('./AngularNetCore');
            //new TaskGitCommit(false, 'AngularNetCore', true);
            //throw new Error('Debug Message!');
        } catch (e) {
            console.error(e.message);
            process.exit(1);
        }
    }
}
new PreCommit();
