﻿import { TaskBase } from './taskBase';
import { CommandLine } from './commandLine';
import { TaskBuild } from './taskBuild';
const _ = require('lodash');

// note this doesn't commit, but is simply a hook during the commit process

export class TaskGitCommit extends TaskBase {
    private readonly cli = new CommandLine();
    // private readonly te = new TaskExport();
    private readonly tb = new TaskBuild();
    private synchronous = true;

    constructor($waitOnCompleted?: boolean, $visualProject?: string, $synchronous?: boolean) {
        super();

        if ($waitOnCompleted !== null && $waitOnCompleted !== undefined) {
            this.waitOnCompleted = $waitOnCompleted;
        } else {
            const waitOnCompleted = this.getCommandArg('waitOnCompleted', 'true');
            if (waitOnCompleted === 'true') {
                this.waitOnCompleted = true;
            } else {
                this.waitOnCompleted = false;
            }
        }

        if ($synchronous !== null && $synchronous !== undefined) {
            this.synchronous = $synchronous;
        } else {
            const synchronous = this.getCommandArg('synchronous', 'true');
            if (synchronous === 'true') {
                this.synchronous = true;
            } else {
                this.synchronous = false;
            }
        }

        if ($visualProject !== null && $visualProject !== undefined) {
            this.visualProject = $visualProject;
        } else {
            const visualProject = this.getCommandArg('visualProject', 'unknown');
            if (visualProject === 'unknown') {
                throw new Error('visualProject parameter is missing!');
            } else {
                this.visualProject = visualProject;
            }
        }
        this.execute();
    }

    execute() {
        let $cwd = process.cwd();
        const bc = this.getBuildConfiguration();
        if (true) {
            const noop = new TaskBuild(true, "AngularNetCore", true);

            process.chdir($cwd + '../../');

            // added any changed files after the Build process
            //this.cli.executeSync('git add -u');

        }

        if (this.waitOnCompleted) {
            while (true) { }
        }
    }
}

try {
    const noop = new TaskGitCommit();
} catch (e) {
    console.log(e);
    while (true) { }
}
