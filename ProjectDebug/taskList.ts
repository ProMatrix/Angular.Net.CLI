//import { CommonTasks, ColoredLogger, Versioning, TaskLaunch, TaskConfig, TaskBuild, TaskEmbed, TaskNpmPublish, TaskNgServe, TaskAdd, TaskRemove } from 'self-control';
import { CommonTasks, ColoredLogger, Versioning, TaskLaunch, TaskConfig, TaskBuild, TaskEmbed, TaskNpmPublish, TaskNgServe, TaskAdd, TaskRemove } from '../../NgResources/self-control';

export class TaskList {
    private readonly ct = new CommonTasks();
    private readonly cl = new ColoredLogger();
    private readonly vn = new Versioning();
    private readonly projectDebugging = "AngularNetCore";
    cwd: string;
    execute = (task: string) => {
        try {
            let taskParts = task.split(";");
            process.chdir(taskParts[0]);
            process.chdir("..\\" + this.projectDebugging);
            this.cwd = process.cwd();
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
                case "task-add": {
                    const ta = new TaskAdd(false, 'AngularNetCore', 'newbee', true);
                    break;
                }
                case "task-remove": {
                    const tr = new TaskRemove(false, 'AngularNetCore', 'newbee');
                    break;
                }
                case "add-remove-test": {
                    while (true) {
                        process.chdir(this.cwd);
                        const ta = new TaskAdd(false, 'AngularNetCore', 'newbee', true);
                        process.chdir(this.cwd);
                        const tr = new TaskRemove(false, 'AngularNetCore', 'newbee');
                    }
                    break;
                }
            }
        } catch (e) {
            this.cl.printError(e.message);
        }
    }
}