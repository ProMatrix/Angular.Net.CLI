import { CommonTasks } from "../AngularNetCore/build_library/commonTasks";
import { ColoredLogger } from "../AngularNetCore/build_library/coloredLogger";
import { Versioning } from "../AngularNetCore/build_library/versioning";
import { TaskLaunch } from "../AngularNetCore/build_library/taskLaunch";
import { TaskConfig } from "../AngularNetCore/build_library/taskConfig";
import { TaskBuild } from "../AngularNetCore/build_library/taskBuild";
import { TaskEmbed } from "../AngularNetCore/build_library/taskEmbed";
import { TaskNpmPublish } from "../AngularNetCore/build_library/taskNpmPublish";

export class TaskList {
    private readonly ct = new CommonTasks();
    private readonly cl = new ColoredLogger();
    private readonly vn = new Versioning();
    private readonly projectDebugging = "AngularNetCore";

    execute = (task: string) => {
        try {
            let taskParts = task.split(";");
            process.chdir(taskParts[0]);
            process.chdir("..\\" + this.projectDebugging);
            console.log("\n");
            this.cl.printInfo("Executing: " + task);
            switch (taskParts[1]) {
                case "print-time": {
                    this.ct.printTime();
                    break;
                }
                case "print-version": {
                    this.ct.printVersion();
                    break;
                }
                case "task-launch": {
                    let noop = new TaskLaunch(this.projectDebugging, false);
                    break;
                }
                case "task-config": {
                    let noop = new TaskConfig(false, this.projectDebugging);
                    break;
                }
                case "task-build": {
                    const noop = new TaskBuild(false, this.projectDebugging, true);
                    break;
                }
                case "task-embed": {
                    const noop = new TaskEmbed(false, this.projectDebugging);
                    break;
                }
                case "npm-publish": {
                    // to debug this, commit a change, only locally, not remotely
                    // then this will be in the same state as a pre-push git hook
                    const noop = new TaskNpmPublish('ng2-express', 'npm', '..\\..\\NgResources\\ng2-express', 'library', 'projects\\ng2-express\\dist', '..\\AngularNetCore\\wwwroot', 'package-ng2-express');
                    break;
                }
            }
        } catch (e) {
            this.cl.printError(e.message);
        }
    }
}