//import { CommonTasks, ColoredLogger, Versioning, TaskLaunch, TaskConfig, TaskBuild, TaskEmbed, TaskNpmPublish, TaskNgServe } from 'self-control';
import { CommonTasks, ColoredLogger, Versioning, TaskLaunch, TaskConfig, TaskBuild, TaskEmbed, TaskNpmPublish, TaskNgServe } from '../../NgResources/self-control';

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
                case "npm-publish-angular": {
                    // to debug this, commit a change, only locally, not remotely
                    // then this will be in the same state as a pre-push git hook
                    const noop = new TaskNpmPublish('ng2-express', 'npm', '..\\..\\NgResources\\ng2-express', 'library', 'projects\\ng2-express\\dist', '..\\AngularNetCore\\wwwroot', 'package-ng2-express');
                    break;
                }
                case "npm-publish-library": {
                    // to debug this, commit a change, only locally, not remotely
                    // then this will be in the same state as a pre-push git hook
                    //const noop = new TaskNpmPublish('self-control', 'npm', '..\\..\\NgResources\\self-control', '.\\', '.\\', '..\\..\\Angular.Net.CLI\\ProjectDebug,..\\..\\Angular.Net.CLI\\AngularNetCore\\wwwroot', '');
                    const noop = new TaskNpmPublish('ngx-api-services', 'npm', '..\\..\\NgResources\\ngx-api-services', '.\\', '.\\', '..\\..\\NgResources\\self-control', '');
                    break;
                }
                case "task-ng-serve": {
                    const noop = new TaskNgServe();
                    break;
                }
            }
        } catch (e) {
            this.cl.printError(e.message);
        }
    }
}