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
        const checkout = 'checkout: moving ';
        let lastMerge = this.cli.executeSync('git reflog -1');
        const index = lastMerge.indexOf(checkout);
        if (index !== -1) {
            lastMerge = lastMerge.substr(index + checkout.length);

            const x = "from " + this.mergeFrom + " to " + this.mergeTo;
            if (lastMerge === "from " + this.mergeFrom + " to " + this.mergeTo) {
                // here is where we will update npm
                let x = 0;
            }
        }
    }
}

try {
    const noop = new TaskGitMerge();
} catch (e) {
    console.log(e);
    while (true) { const noop = 0; }
}
