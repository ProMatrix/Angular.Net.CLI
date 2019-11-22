import { TaskBase } from "./taskBase";
import { CommandLine } from "./build_library/commandLine";
import { TaskExport } from "./taskExport";
import { TaskBuild } from "./taskBuild";
const _ = require("lodash");

export class TaskGitCommit extends TaskBase {
    private readonly cli = new CommandLine();
    private readonly te = new TaskExport();
    private readonly tb = new TaskBuild();
    waitOnHook = false;

    constructor() {
        super();
        const waitOnHook = this.getCommandArg("waitOnHook", "unknown");
        if (waitOnHook === "unknown")
            return;
        this.waitOnHook = true;
        process.chdir("../ProjectBuild");
        this.execute();
    }

    execute() {
        let cwd = process.cwd();
        this.tb.multiple();
        process.chdir(cwd);
        this.te.multiple();
        process.chdir(cwd + "../../");
        this.cli.executeSync("git add -u");
        if (this.waitOnHook)
            while (true) { };
    }
}

try {
    new TaskGitCommit();
} catch (e) {
    console.log(e);
    while (true) { }
}