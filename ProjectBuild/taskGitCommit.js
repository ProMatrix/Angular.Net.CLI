"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var taskBase_1 = require("./taskBase");
var commandLine_1 = require("./build_library/commandLine");
var taskExport_1 = require("./taskExport");
var taskBuild_1 = require("./taskBuild");
var _ = require("lodash");
// Note this doesn't commit, but is simply a hook during the commit process
var TaskGitCommit = /** @class */ (function (_super) {
    __extends(TaskGitCommit, _super);
    function TaskGitCommit() {
        var _this = _super.call(this) || this;
        _this.cli = new commandLine_1.CommandLine();
        _this.te = new taskExport_1.TaskExport();
        _this.tb = new taskBuild_1.TaskBuild();
        _this.waitOnHook = false;
        var waitOnHook = _this.getCommandArg("waitOnHook", "unknown");
        if (waitOnHook === "unknown")
            return _this;
        _this.waitOnHook = true;
        process.chdir("../ProjectBuild");
        _this.execute();
        return _this;
    }
    TaskGitCommit.prototype.execute = function () {
        var cwd = process.cwd();
        this.tb.multiple();
        process.chdir(cwd);
        this.te.multiple();
        process.chdir(cwd + "../../");
        this.cli.executeSync("git add -u");
        if (this.waitOnHook)
            while (true) { }
        ;
    };
    return TaskGitCommit;
}(taskBase_1.TaskBase));
exports.TaskGitCommit = TaskGitCommit;
try {
    new TaskGitCommit();
}
catch (e) {
    console.log(e);
    while (true) { }
}
//# sourceMappingURL=taskGitCommit.js.map