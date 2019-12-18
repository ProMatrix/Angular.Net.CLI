import { TaskBase } from './taskBase';
import { CommandLine } from './commandLine';
//************************** UNTESTED ********************************

export class TaskGitMerge extends TaskBase {
    private npmPackage: string;
    private mergeFrom: string;
    private mergeTo: string;
    public publishCompleted = false;

    constructor($npmPackage?: string, $mergeFrom?: string, $mergeTo?: string) {
        super();
        if ($npmPackage !== null && $npmPackage !== undefined) {
            this.npmPackage = $npmPackage;
        } else {
            const npmPackage = this.getCommandArg('npmPackage', 'unknown');
            if (npmPackage === 'unknown') {
                throw new Error('npmPackage parameter is missing!');
            } else {
                this.npmPackage = npmPackage;
            }
        }

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
        let outgoingMerges = this.cli.executeSync('git log ' + this.mergeTo + ' --merges --not --remotes');
        console.log('outgoingMerges (' + this.mergeFrom + ' -> ' + this.mergeTo + '): ' + outgoingMerges);
        if (outgoingMerges.length > 0) {
            // any merges into the mergeTo branch will publish to npm
            process.chdir('angular-lib');
            const libFolder = process.cwd();

            process.chdir('projects\\' + this.npmPackage);
            // get the latest version from npm, and update local package version no.
            const versionOnNpm = this.getNpmVersionNo(this.npmPackage);
            console.log('versionOnNpm: ' + versionOnNpm);
            this.cli.executeSync('npm version ' + versionOnNpm + ' --allow-same-version');
            // run build script
            process.chdir(libFolder);
            console.log('begin build of: ' + this.mergeTo);
            this.cli.executeSync('npm run build-npm');
            console.log('completed build of: ' + this.mergeTo);

            console.log('begin publish of: ' + this.mergeTo);
            this.cli.executeSync('npm run publish-npm');
            console.log('completed publish of: ' + this.mergeTo);
            this.publishCompleted = true;
        }
    }

}
