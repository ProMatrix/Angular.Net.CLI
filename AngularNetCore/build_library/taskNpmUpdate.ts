import { TaskBase } from './taskBase';
import { CommandLine } from './commandLine';

export class TaskNpmUpdate extends TaskBase {
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
        const versionOnNpm = this.getNpmVersionNo(this.npmPackage);
        console.log('versionOnNpm: ' + versionOnNpm);

        const uninstall = this.cli.executeSync('npm uninstall ' + this.npmPackage + ' --save');
        console.log(uninstall);
        const install = this.cli.executeSync('npm install ' + this.npmPackage + ' --save');
        console.log(install);

        const latestVersion = this.getLocalVersionNo(this.npmPackage);
        console.log('latestVersion: ' + latestVersion);

        if (versionOnNpm !== latestVersion) {
            throw new Error('Error: npm package version mismatch!');
        }

        // Undo changes
        process.chdir('library_ng');

        const changedFiles = this.getChangedFiles();
        changedFiles.forEach((changedFile) => {
            console.log('Undo: ' + changedFile);
            let message = this.undoLocalChangedFile(changedFile);
            console.log('message: ' + message);
        });
    }
}