import { CommonTasks } from "../AngularDotNet/build_library/commonTasks";
import { ColoredLogger } from "../AngularDotNet/build_library/coloredLogger";
import { Versioning } from "../AngularDotNet/build_library/versioning";
//import { TaskLaunch } from "../ProjectBuild/taskLaunch";
import { TaskConfig } from "../AngularDotNet/taskConfig";

export class TaskList {
    private readonly ct = new CommonTasks();
    private readonly cl = new ColoredLogger();
    private readonly vn = new Versioning();
    //private readonly tl = new TaskLaunch();
    private readonly cwd = process.cwd();

    execute = (task) => {
        try {
            process.chdir(this.cwd);
            console.log("\n");
            this.cl.printInfo("Executing: " + task);
            switch (task) {
                case "print-time":
                    this.ct.printTime();
                    break;
                case "print-version":
                    process.chdir("..\\Angular.Net");
                    this.ct.printVersion();
                    break;
                //case "launch":
                //    process.chdir("..\\ProjectBuild");
                //    this.tl.execute("ProjectBuild");
                //    break;
                case "task-cofigure":
                    new TaskConfig();
                    break;
            }
        } catch (e) {
            this.cl.printError(e.message);
        }
    }
}