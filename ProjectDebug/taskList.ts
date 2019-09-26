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
    // private readonly tl = new TaskLaunch();
    private readonly cwd = process.cwd();

    execute = (task) => {
        try {
            process.chdir(this.cwd);
            console.log("\n");
            this.cl.printInfo("Executing: " + task);
            switch (task) {
                case "print-time": {
                    this.ct.printTime();
                    break;
                }
                case "print-version": {
                    process.chdir("..\\AngularDotNet");
                    this.ct.printVersion();
                    break;
                }
                case "launch": {
                    let noop = new TaskLaunch("AngularDotNet");
                    break;
                }
                case "task-cofigure": {
                    let noop = new TaskConfig(true, "AngularDotNet");
                    break;
                }
                case "task-build": {
                    const noop = new TaskBuild(true, "AngularDotNet", true);
                    break;
                }
            }
        } catch (e) {
            this.cl.printError(e.message);
        }
    }
}