import { TaskBase } from './taskBase';
import { CommandLine } from './commandLine';

export class TaskNpmPublish extends TaskBase {
    private npmPackage: string;
    private branch: string;
    public publishCompleted = false;

    constructor($npmPackage?: string, $branch?: string) {
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
        const localVersion = this.getLocalVersionNo(this.npmPackage);
        console.log(this.npmPackage + '- local Version: ' + localVersion);


        let currentBranch = this.getCurrentBranch();
        if (currentBranch !== this.branch) {
            console.log('Cannot publish from the branch: ' + currentBranch);
            return;
        }
        let outgoingCommits = this.cli.executeSync('git log origin/' + this.branch + '..' + this.branch);
        if (outgoingCommits.length > 0) {
            // any outgoingCommits into the this.branch will publish to npm
            process.chdir('angular-lib\\');
            const libFolder = process.cwd();

            process.chdir('projects\\' + this.npmPackage);
            // get the latest version from npm, and update local package version no.
            let versionOnNpm = this.getNpmVersionNo(this.npmPackage);
            console.log('Version On npm (before build): ' + versionOnNpm);
            this.cli.executeSync('npm version ' + versionOnNpm + ' --allow-same-version');

            // run build script
            console.log('begin build of: ' + this.branch);
            this.cli.executeSync('npm version patch');
            process.chdir('..\\');

            console.log('cwd: ' + process.cwd());
            // could not find a way to do this without running a script command
            this.cli.executeSync('npm run package-ng2-express');
            console.log('completed build of: ' + this.branch);

            console.log('begin publish of: ' + this.branch);
            process.chdir(this.npmPackage + '\\dist');
            this.cli.executeSync('npm publish');
            console.log('completed publish of: ' + this.branch);

            versionOnNpm = this.getNpmVersionNo(this.npmPackage);
            console.log('Version On npm (after build): ' + versionOnNpm);
            this.cli.executeSync('npm version ' + versionOnNpm + ' --allow-same-version');


            //????
            this.publishCompleted = true;

            process.chdir('..\\..\\..\\..\\..\\'); // wwwroot
            console.log('cwd: ' + process.cwd());

            const uninstall = this.cli.executeSync('npm uninstall ' + this.npmPackage + ' --save');
            console.log(uninstall);
            const install = this.cli.executeSync('npm install ' + this.npmPackage + ' --save');
            console.log(install);

            const localVersion = this.getLocalVersionNo(this.npmPackage);
            console.log(this.npmPackage + '- local Version: ' + localVersion);
            console.log(this.npmPackage + '- npm Version: ' + versionOnNpm);

            if (versionOnNpm !== localVersion) {
                throw new Error('Error: npm package version mismatch!');
            }

            // Undo files that changed during the build process (package.json)
            process.chdir('library_ng');
            const changedFiles = this.getChangedFiles();
            changedFiles.forEach((changedFile) => {
                console.log('Undo: ' + changedFile);
                let message = this.undoLocalChangedFile(changedFile);
                console.log('message: ' + message);
            });
        }
    }
}