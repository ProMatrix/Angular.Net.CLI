import { TaskBase } from './taskBase';
import { CommandLine } from './commandLine';

export class TaskNpmUpdate extends TaskBase {
    private readonly cli = new CommandLine();
    private npmPackage: string;

    constructor($npmPackage?: string) {
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
        this.execute();
    }

    execute() {
        const versionOnNpm = this.cli.executeSync('npm info ' + this.npmPackage + ' version');
        console.log('versionOnNpm: ' + versionOnNpm);

        const previousVersion = this.cli.executeSync('npm list ' + this.npmPackage);
        console.log('previousVersion: ' + previousVersion);

        const uninstall = this.cli.executeSync('npm uninstall ' + this.npmPackage + ' --save');
        console.log(uninstall);
        const install = this.cli.executeSync('npm install ' + this.npmPackage + ' --save');
        console.log(install);

        const latestVersion = this.cli.executeSync('npm list ' + this.npmPackage);
        console.log('latestVersion: ' + latestVersion);

        if (previousVersion === latestVersion) {
            throw new Error('Error: The version was never updated on npm!');
        }

    }
}
