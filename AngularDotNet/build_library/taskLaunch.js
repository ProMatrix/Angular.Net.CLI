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
var commandLine_1 = require("../build_library/commandLine");
var taskBase_1 = require("./taskBase");
var TaskLaunch = /** @class */ (function (_super) {
    __extends(TaskLaunch, _super);
    function TaskLaunch($visualProject, $synchronous) {
        var _this = _super.call(this) || this;
        _this.cli = new commandLine_1.CommandLine();
        _this.synchronous = true;
        if ($visualProject !== null) {
            _this.visualProject = $visualProject;
        }
        else {
            var visualProject = _this.getCommandArg("visualProject", "unknown");
            if (visualProject === "unknown") {
                throw new Error("visualProject parameter is missing!");
            }
            else {
                _this.visualProject = visualProject;
            }
        }
        if ($synchronous !== null) {
            _this.synchronous = $synchronous;
        }
        else {
            var synchronous = _this.getCommandArg("synchronous", "true");
            if (synchronous === "true") {
                _this.synchronous = true;
            }
            else {
                _this.synchronous = false;
            }
        }
        _this.launch(_this.visualProject);
        return _this;
    }
    TaskLaunch.prototype.launch = function (vsProjectName) {
        var cwd = process.cwd();
        var bc = this.getBuildConfiguration();
        process.chdir(cwd);
        var vsProject = _.find(bc.visualProjects, function (x) { return (x.name === vsProjectName); });
        if (!vsProject)
            throw new Error('Can\'t find vsProject: ' + vsProjectName);
        process.chdir('../' + vsProjectName);
        cwd = process.cwd();
        var startChrome = 'start chrome --app=' + vsProject.applicationUrl;
        this.cli.executeSync(startChrome);
        console.log('Launching: ' + vsProjectName + '...');
        this.cli.executeLaunch(vsProjectName, function () { }, this.synchronous);
    };
    return TaskLaunch;
}(taskBase_1.TaskBase));
exports.TaskLaunch = TaskLaunch;
//# sourceMappingURL=taskLaunch.js.map