"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var commandLine_1 = require("./build_library/commandLine");
var taskBase_1 = require("./taskBase");
var TaskLaunch = /** @class */ (function (_super) {
    __extends(TaskLaunch, _super);
    function TaskLaunch() {
        var _this = _super.call(this) || this;
        _this.cli = new commandLine_1.CommandLine();
        var visualProject = _this.getCommandArg("visualProject", "unknown");
        if (visualProject !== "unknown")
            _this.execute(visualProject);
        return _this;
    }
    TaskLaunch.prototype.execute = function (vsProjectName) {
        var cwd = process.cwd();
        var bc = this.getBuildConfiguration();
        process.chdir(cwd);
        var vsProject = _.find(bc.visualProjects, function (x) { return (x.name === vsProjectName); });
        if (!vsProject)
            throw new Error("Can't find vsProject: " + vsProjectName);
        process.chdir("../" + vsProjectName);
        cwd = process.cwd();
        var startChrome = "start chrome --app=" + vsProject.applicationUrl;
        this.cli.executeSync(startChrome);
        this.cli.executeLaunch(vsProjectName, function () {
        });
    };
    return TaskLaunch;
}(taskBase_1.TaskBase));
exports.TaskLaunch = TaskLaunch;
try {
    new TaskLaunch();
}
catch (e) {
    console.log(e);
    while (true) { }
}
//# sourceMappingURL=taskLaunch.js.map