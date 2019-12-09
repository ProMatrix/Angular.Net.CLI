import { TaskBase } from './taskBase';
import { CommandLine } from './commandLine';

export class TaskGitMerge extends TaskBase {
    private readonly cli = new CommandLine();
    private mergeFrom: string;
    private mergeTo: string;

    constructor($mergeFrom?: string, $mergeTo?: string) {
        super();
        if ($mergeFrom !== null && $mergeFrom !== undefined) {
            this.mergeFrom = $mergeFrom;
        } else {
            const mergeFrom = this.getCommandArg('mergeFrom', 'unknown');
            if (mergeFrom === 'unknown') {
                throw new Error('mergeFrom parameter is missing!');
            } else {
                this.mergeFrom = mergeFrom;
            }
        }

        if ($mergeTo !== null && $mergeTo !== undefined) {
            this.mergeTo = $mergeTo;
        } else {
            const mergeTo = this.getCommandArg('mergeTo', 'unknown');
            if (mergeTo === 'unknown') {
                throw new Error('mergeTo parameter is missing!');
            } else {
                this.mergeTo = mergeTo;
            }
        }
        this.execute();
    }

    execute() {
        const outgoingMerges = this.cli.executeSync('git log ' + this.mergeTo + ' --merges --not --remotes');
        console.log('outgoingMerges: ' + outgoingMerges);
        if (outgoingMerges.length > 0) {
            // any merges into the mergeTo branch will publish to npm
            process.chdir('angular-lib');

            console.log('begin build of: ' + this.mergeTo);
            this.cli.executeSync('npm run build-npm');
            console.log('completed build of: ' + this.mergeTo);

            console.log('begin publish of: ' + this.mergeTo);
            this.cli.executeSync('npm run publish-npm');
            console.log('completed publish of: ' + this.mergeTo);
        }
    }
}
