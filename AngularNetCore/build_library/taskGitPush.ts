import { TaskBase } from './taskBase';
import { CommandLine } from './commandLine';

export class TaskGitPush extends TaskBase {
    private branch: string;
    public publishCompleted = false;

    constructor($branch?: string) {
        super();
        if ($branch !== null && $branch !== undefined) {
            this.branch = $branch;
        } else {
            const branch = this.getCommandArg('branch', 'unknown');
            if (branch === 'unknown') {
                throw new Error('branch parameter is missing!');
            } else {
                this.branch = branch;
            }
        }
        this.execute();
    }

    execute() {
        let currentBranch = this.getCurrentBranch();
        if (currentBranch !== this.branch) {
            console.log('Cannot publish from the branch: ' + currentBranch);
            return;
        }
        let outgoingCommits = this.cli.executeSync('git log origin/' + this.branch + '..' + this.branch);
        if (outgoingCommits.length > 0) {
            process.chdir('angular-lib');
            console.log('begin build of: ' + this.branch);
            this.cli.executeSync('npm run build-npm');
            console.log('completed build of: ' + this.branch);

            console.log('begin publish of: ' + this.branch);
            this.cli.executeSync('npm run publish-npm');
            console.log('completed publish of: ' + this.branch);
            this.publishCompleted = true;
        }
    }
}
