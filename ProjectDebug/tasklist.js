"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import { CommonTasks, ColoredLogger, Versioning, TaskLaunch, TaskConfig, TaskBuild, TaskEmbed, TaskNpmPublish } from 'self-control';
var self_control_1 = require("../../NgResources/self-control");
var TaskList = /** @class */ (function () {
    function TaskList() {
        var _this = this;
        this.ct = new self_control_1.CommonTasks();
        this.cl = new self_control_1.ColoredLogger();
        this.vn = new self_control_1.Versioning();
        this.projectDebugging = "AngularNetCore";
        this.execute = function (task) {
            try {
                var taskParts = task.split(";");
                process.chdir(taskParts[0]);
                process.chdir("..\\" + _this.projectDebugging);
                console.log("\n");
                _this.cl.printInfo("Executing: " + task);
                switch (taskParts[1]) {
                    case "print-time": {
                        _this.ct.printTime();
                        break;
                    }
                    case "print-version": {
                        _this.ct.printVersion();
                        break;
                    }
                    case "task-launch": {
                        var noop = new self_control_1.TaskLaunch(_this.projectDebugging, false);
                        break;
                    }
                    case "task-config": {
                        var noop = new self_control_1.TaskConfig(false, _this.projectDebugging);
                        break;
                    }
                    case "task-build": {
                        var noop = new self_control_1.TaskBuild(false, _this.projectDebugging, true);
                        break;
                    }
                    case "task-embed": {
                        var noop = new self_control_1.TaskEmbed(false, _this.projectDebugging);
                        break;
                    }
                    case "npm-publish-angular": {
                        // to debug this, commit a change, only locally, not remotely
                        // then this will be in the same state as a pre-push git hook
                        var noop = new self_control_1.TaskNpmPublish('ng2-express', 'npm', '..\\..\\NgResources\\ng2-express', 'library', 'projects\\ng2-express\\dist', '..\\AngularNetCore\\wwwroot', 'package-ng2-express');
                        break;
                    }
                    case "npm-publish-library": {
                        // to debug this, commit a change, only locally, not remotely
                        // then this will be in the same state as a pre-push git hook
                        var noop = new self_control_1.TaskNpmPublish('self-control', 'npm', '..\\..\\NgResources\\self-control', '.\\', '.\\', '..\\..\\Angular.Net.CLI\\ProjectDebug,..\\..\\Angular.Net.CLI\\AngularNetCore\\wwwroot', '');
                        break;
                    }
                }
            }
            catch (e) {
                _this.cl.printError(e.message);
            }
        };
    }
    return TaskList;
}());
exports.TaskList = TaskList;
//# sourceMappingURL=tasklist.js.map