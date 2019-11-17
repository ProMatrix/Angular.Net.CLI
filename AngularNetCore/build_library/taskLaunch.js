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
var _ = require('lodash');
var commandLine_1 = require("../build_library/commandLine");
var taskBase_1 = require("./taskBase");
var TaskLaunch = /** @class */ (function (_super) {
    __extends(TaskLaunch, _super);
    function TaskLaunch($visualProject, $synchronous, $angularProject) {
        var _this = _super.call(this) || this;
        _this.cli = new commandLine_1.CommandLine();
        _this.synchronous = true;
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
        if ($angularProject !== null && $angularProject !== undefined) {
            _this.angularProject = $angularProject;
        }
        else {
            var angularProject = _this.getCommandArg('angularProject', 'unknown');
            if (angularProject !== 'unknown') {
                _this.angularProject = angularProject;
            }
        }
        _this.launch();
        return _this;
    }
    TaskLaunch.prototype.launch = function () {
        var _this = this;
        var cwd = process.cwd();
        var bc = this.getBuildConfiguration();
        process.chdir(cwd);
        var vsProject = _.find(bc.visualProjects, function (x) { return (x.name === _this.visualProject); });
        if (!vsProject) {
            throw new Error('Can\'t find vsProject: ' + this.visualProject);
        }
        process.chdir('../' + this.visualProject);
        var startChrome = 'start chrome --app=' + vsProject.applicationUrl;
        if (this.angularProject) {
            startChrome += 'dist/' + this.angularProject + '/index.html';
        }
        console.log('Launching ' + this.visualProject + ':');
        this.cli.executeLaunch(this.visualProject, function () { }, this.synchronous);
        setTimeout(function () {
            console.log("Start Chrome: ");
            console.log(process.cwd() + "> " + startChrome);
            _this.cli.executeSync(startChrome);
            _this.applicationRunning();
        }, 1000);
    };
    TaskLaunch.prototype.applicationRunning = function () {
        console.log(this.visualProject + ' is running!');
        var showOn = false;
        setInterval(function () {
            if (showOn)
                console.log('⚫');
            else
                console.log('⚪');
            showOn = !showOn;
        }, 1000);
    };
    return TaskLaunch;
}(taskBase_1.TaskBase));
exports.TaskLaunch = TaskLaunch;
//# sourceMappingURL=taskLaunch.js.map