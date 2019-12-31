import { TaskGitCommit } from 'self-control';

export class PreCommit {

    constructor() {
        try {
            process.chdir('./AngularNetCore');
            new TaskGitCommit(false, 'AngularNetCore', true);
        } catch (e) {
            console.error(e.message);
            process.exit(1);
        }
    }
}
new PreCommit();