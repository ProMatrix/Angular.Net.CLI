import { CommonTasks } from "../AngularDotNet/build_library/commonTasks";
import { ColoredLogger } from "../AngularDotNet/build_library/coloredLogger";
import { Versioning } from "../AngularDotNet/build_library/versioning";
import { TaskLaunch } from "../AngularDotNet/build_library/taskLaunch";
import { TaskConfig } from "../AngularDotNet/build_library/taskConfig";
import { TaskBuild } from "../AngularDotNet/build_library/taskBuild";

export class TaskList {
    private readonly ct = new CommonTasks();
    private readonly cl = new ColoredLogger();
    private readonly vn = new Versioning();
    private readonly projectDebugging = "AngularDotNet";
    // private readonly tl = new TaskLaunch();

    execute = (task: string) => {
        try {
            let taskParts = task.split(';');
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
            }
        } catch (e) {
            this.cl.printError(e.message);
        }
    }
}