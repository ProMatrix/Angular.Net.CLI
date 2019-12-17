import { TaskBase } from './taskBase';
import { CommandLine } from './commandLine';

export class TaskGitPush extends TaskBase {
    private readonly cli = new CommandLine();
    private branch: string;

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
    }

}

