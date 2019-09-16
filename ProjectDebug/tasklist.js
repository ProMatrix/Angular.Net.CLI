"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commonTasks_1 = require("../AngularDotNet/build_library/commonTasks");
var coloredLogger_1 = require("../AngularDotNet/build_library/coloredLogger");
var versioning_1 = require("../AngularDotNet/build_library/versioning");
//import { TaskLaunch } from "../ProjectBuild/taskLaunch";
var taskConfig_1 = require("../AngularDotNet/taskConfig");
var TaskList = /** @class */ (function () {
    function TaskList() {
        var _this = this;
        this.ct = new commonTasks_1.CommonTasks();
        this.cl = new coloredLogger_1.ColoredLogger();
        this.vn = new versioning_1.Versioning();
        //private readonly tl = new TaskLaunch();
        this.cwd = process.cwd();
        this.execute = function (task) {
            try {
                process.chdir(_this.cwd);
                console.log("\n");
                _this.cl.printInfo("Executing: " + task);
                switch (task) {
                    case "print-time":
                        _this.ct.printTime();
                        break;
                    case "print-version":
                        process.chdir("..\\Angular.Net");
                        _this.ct.printVersion();
                        break;
                    //case "launch":
                    //    process.chdir("..\\ProjectBuild");
                    //    this.tl.execute("ProjectBuild");
                    //    break;
                    case "task-cofigure":
                        new taskConfig_1.TaskConfig();
                        break;
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