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
var taskBase_1 = require("./taskBase");
var commandLine_1 = require("./commandLine");
var taskBuild_1 = require("./taskBuild");
var _ = require('lodash');
// note this doesn't commit, but is simply a hook during the commit process
var TaskGitCommit = /** @class */ (function (_super) {
    __extends(TaskGitCommit, _super);
    function TaskGitCommit($waitOnCompleted, $visualProject, $synchronous) {
        var _this = _super.call(this) || this;
        _this.cli = new commandLine_1.CommandLine();
        // private readonly te = new TaskExport();
        _this.tb = new taskBuild_1.TaskBuild();
        _this.synchronous = true;
        if ($waitOnCompleted !== null && $waitOnCompleted !== undefined) {
            _this.waitOnCompleted = $waitOnCompleted;
        }
        else {
            var waitOnCompleted = _this.getCommandArg('waitOnCompleted', 'true');
            if (waitOnCompleted === 'true') {
                _this.waitOnCompleted = true;
            }
            else {
                _this.waitOnCompleted = false;
            }
        }
        if ($synchronous !== null && $synchronous !== undefined) {
            _this.synchronous = $synchronous;
        }
        else {
            var synchronous = _this.getCommandArg('synchronous', 'true');
            if (synchronous === 'true') {
                _this.synchronous = true;
            }
            else {
                _this.synchronous = false;
            }
        }
        if ($visualProject !== null && $visualProject !== undefined) {
            _this.visualProject = $visualProject;
        }
        else {
            var visualProject = _this.getCommandArg('visualProject', 'unknown');
            if (visualProject === 'unknown') {
                throw new Error('visualProject parameter is missing!');
            }
            else {
                _this.visualProject = visualProject;
            }
        }
        _this.execute();
        return _this;
    }
    TaskGitCommit.prototype.execute = function () {
        var $cwd = process.cwd();
        var bc = this.getBuildConfiguration();
        if (true) {
            var noop = new taskBuild_1.TaskBuild(true, "AngularNetCore", true);
            process.chdir($cwd + '../../');
            // added any changed files after the Build process
            //this.cli.executeSync('git add -u');
        }
        if (this.waitOnCompleted) {
            while (true) { }
        }
    };
    return TaskGitCommit;
}(taskBase_1.TaskBase));
exports.TaskGitCommit = TaskGitCommit;
try {
    var noop = new TaskGitCommit();
}
catch (e) {
    console.log(e);
    while (true) { }
}
//# sourceMappingURL=taskGitCommit.js.map