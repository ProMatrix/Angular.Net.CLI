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
        const uninstall = this.cli.executeSync('npm uninstall ' + this.npmPackage + ' --save-dev');
        console.log(uninstall);
        const install = this.cli.executeSync('npm install ' + this.npmPackage + ' --save-dev');
        console.log(install);
    }


}
