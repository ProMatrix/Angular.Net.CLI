import { TaskBase } from './taskBase';
import { CommandLine } from './commandLine';
// import { TaskExport } from "./taskExport";
import { TaskBuild } from './taskBuild';
const _ = require('lodash');

// note this doesn't commit, but is simply a hook during the commit process

export class TaskGitCommit extends TaskBase {
    private readonly cli = new CommandLine();
    // private readonly te = new TaskExport();
    private readonly tb = new TaskBuild();
    waitOnHook = false;

    constructor() {
        super();
        const waitOnHook = this.getCommandArg('waitOnHook', 'unknown');
        if (waitOnHook === 'unknown') {
            return;
        }
        this.waitOnHook = true;
        process.chdir('../ProjectBuild');
        this.execute();
    }

    execute() {
        const cwd = process.cwd();

        // this.tb.multiple();

        // export is unnecessary at the moment
        // process.chdir(cwd);
        // this.te.multiple();
        process.chdir(cwd + '../../');
        // added any changed files after the Build process
        this.cli.executeSync('git add -u');
        if (this.waitOnHook) {
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
