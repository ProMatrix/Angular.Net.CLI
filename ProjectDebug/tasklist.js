"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commonTasks_1 = require("../AngularNetCore/build_library/commonTasks");
var coloredLogger_1 = require("../AngularNetCore/build_library/coloredLogger");
var versioning_1 = require("../AngularNetCore/build_library/versioning");
var taskLaunch_1 = require("../AngularNetCore/build_library/taskLaunch");
var taskConfig_1 = require("../AngularNetCore/build_library/taskConfig");
var taskBuild_1 = require("../AngularNetCore/build_library/taskBuild");
var taskEmbed_1 = require("../AngularNetCore/build_library/taskEmbed");
var taskNpmPublish_1 = require("../AngularNetCore/build_library/taskNpmPublish");
var TaskList = /** @class */ (function () {
    function TaskList() {
        var _this = this;
        this.ct = new commonTasks_1.CommonTasks();
        this.cl = new coloredLogger_1.ColoredLogger();
        this.vn = new versioning_1.Versioning();
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
                    case "task-embed": {
                        var noop = new taskEmbed_1.TaskEmbed(false, _this.projectDebugging);
                        break;
                    }
                    case "npm-publish": {
                        // to debug this, commit a change, only locally, not remotely
                        // then this will be in the same state as a pre-push git hook
                        var noop = new taskNpmPublish_1.TaskNpmPublish('ng2-express', 'npm', '..\\..\\NgResources\\ng2-express', 'library', '..\\AngularNetCore\\wwwroot');
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