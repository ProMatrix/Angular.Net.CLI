"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commonTasks_1 = require("../AngularDotNet/build_library/commonTasks");
var coloredLogger_1 = require("../AngularDotNet/build_library/coloredLogger");
var versioning_1 = require("../AngularDotNet/build_library/versioning");
var taskLaunch_1 = require("../AngularDotNet/build_library/taskLaunch");
var taskConfig_1 = require("../AngularDotNet/build_library/taskConfig");
var taskBuild_1 = require("../AngularDotNet/build_library/taskBuild");
var TaskList = /** @class */ (function () {
    function TaskList() {
        var _this = this;
        this.ct = new commonTasks_1.CommonTasks();
        this.cl = new coloredLogger_1.ColoredLogger();
        this.vn = new versioning_1.Versioning();
        this.projectDebugging = "AngularDotNet";
        // private readonly tl = new TaskLaunch();
        this.execute = function (task) {
            try {
                var taskParts = task.split(';');
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
                        var noop = new taskLaunch_1.TaskLaunch(_this.projectDebugging, false);
                        break;
                    }
                    case "task-config": {
                        var noop = new taskConfig_1.TaskConfig(false, _this.projectDebugging);
                        break;
                    }
                    case "task-build": {
                        var noop = new taskBuild_1.TaskBuild(false, _this.projectDebugging, true);
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