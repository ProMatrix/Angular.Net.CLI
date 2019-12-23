﻿import { TaskBase } from './taskBase';
import { CommandLine } from './commandLine';

export class TaskNpmPublish extends TaskBase {
    private npmPackage: string; // package to publish
    private branch: string; // branch to publish
    private gitFolder: string; // local git repo
    private gitPath: string; // local git path
    private libFolder: string; // library folder
    private libPath: string; // library path
    private workspaces: string; // workspaces using library
    private entryPath: string; // entry cwd

    constructor($npmPackage?: string, $branch?: string, $gitFolder?: string, $libFolder?: string, $workspaces?: string) {
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

        if ($gitFolder !== null && $gitFolder !== undefined) {
            this.gitFolder = $gitFolder;
        } else {
            const gitFolder = this.getCommandArg('gitFolder', 'unknown');
            if (gitFolder === 'unknown') {
                throw new Error('gitFolder parameter is missing!');
            } else {
                this.gitFolder = gitFolder;
            }
        }

        if ($libFolder !== null && $libFolder !== undefined) {
            this.libFolder = $libFolder;
        } else {
            const libFolder = this.getCommandArg('libFolder', 'unknown');
            if (libFolder === 'unknown') {
                throw new Error('libFolder parameter is missing!');
            } else {
                this.libFolder = libFolder;
            }
        }

        if ($workspaces !== null && $workspaces !== undefined) {
            this.workspaces = $workspaces;
        } else {
            const workspaces = this.getCommandArg('workspaces', 'unknown');
            if (workspaces === 'unknown') {
                throw new Error('workspaces parameter is missing!');
            } else {
                this.workspaces = workspaces;
            }
        }
        this.execute();
    }

    execute() {
        this.entryPath = process.cwd();

        process.chdir(this.gitFolder);
        this.gitPath = process.cwd();
        process.chdir(this.libFolder);
        this.libPath = process.cwd();

        process.chdir(this.gitPath);
        let currentBranch = this.getCurrentBranch();
        if (currentBranch !== this.branch) {
            console.log('Cannot publish from the branch: ' + currentBranch);
            return;
        }
        let outgoingCommits = this.cli.executeSync('git log origin/' + this.branch + '..' + this.branch);
        if (outgoingCommits.length > 0) {
            // any outgoingCommits into the this.branch will publish to npm

            process.chdir(this.libPath + '\\projects\\' + this.npmPackage);
            // get the latest version from npm, and update local package version no.
            let versionOnNpm = this.getNpmVersionNo(this.npmPackage);
            console.log(this.npmPackage + ' - npm Version: ' + versionOnNpm);
            this.cli.executeSync('npm version ' + versionOnNpm + ' --allow-same-version');

            // run build script
            console.log('begin build of: ' + this.npmPackage);
            this.cli.executeSync('npm version patch');
            process.chdir('..\\');

            // could not find a way to do this without running a script command
            this.cli.executeSync('npm run package-ng2-express');

            console.log('begin publish of: ' + this.npmPackage);
            process.chdir(this.npmPackage + '\\dist');
            this.cli.executeSync('npm publish');

            versionOnNpm = this.getNpmVersionNo(this.npmPackage);
            console.log(this.npmPackage + '- npm Version: ' + versionOnNpm);
            this.cli.executeSync('npm version ' + versionOnNpm + ' --allow-same-version');

            process.chdir(this.gitPath);
            const cwd = process.cwd();

            // Undo all files that changed during the build process (package.json)
            // By undoing these files, we will be able to change to another branch
            const changedFiles = this.getChangedFiles();
            changedFiles.forEach((changedFile) => {
                console.log('Undo: ' + changedFile);
                this.undoLocalChangedFile(changedFile);
            });

            process.chdir(this.entryPath);

            // loop here
            process.chdir(this.workspaces);
            // reinstall the package on all the Angular workspace that use the this.npmPackage
            // 1st workspace is wwwroot
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


            //
            console.log('npm publishing completed');

        }
    }
}