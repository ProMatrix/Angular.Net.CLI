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
var coloredLogger_1 = require("../build_library/coloredLogger");
var versioning_1 = require("../build_library/versioning");
var commonTasks_1 = require("../build_library/commonTasks");
var commandLine_1 = require("../build_library/commandLine");
var productionReady_1 = require("../build_library/productionReady");
var taskBase_1 = require("./taskBase");
var _ = require("lodash");
var ncp = require("ncp");
var TaskEmbed = /** @class */ (function (_super) {
    __extends(TaskEmbed, _super);
    function TaskEmbed($waitOnCompleted, $visualProject, $synchronous) {
        var _this = _super.call(this) || this;
        _this.cl = new coloredLogger_1.ColoredLogger();
        _this.ver = new versioning_1.Versioning();
        _this.pr = new productionReady_1.ProductionReady();
        _this.cli = new commandLine_1.CommandLine();
        _this.ct = new commonTasks_1.CommonTasks();
        _this.synchronous = true;
        if ($waitOnCompleted !== null && $waitOnCompleted !== undefined) {
            _this.waitOnCompleted = $waitOnCompleted;
        }
        else {
            var waitOnCompleted = _this.getCommandArg("waitOnCompleted", "true");
            if (waitOnCompleted === "true") {
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
            var synchronous = _this.getCommandArg("synchronous", "true");
            if (synchronous === "true") {
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
            var visualProject = _this.getCommandArg("visualProject", "unknown");
            if (visualProject === "unknown") {
                throw new Error("visualProject parameter is missing!");
            }
            else {
                _this.visualProject = visualProject;
            }
        }
        _this.embed(_this.visualProject);
        return _this;
    }
    TaskEmbed.prototype.embed = function (visualProject) {
        var _this = this;
        this.cwd = process.cwd();
        var bc = this.getBuildConfiguration();
        var vsProject = _.find(bc.visualProjects, function (x) { return (x.name === visualProject); });
        if (!vsProject) {
            throw new Error("Can't find vsProject: " + visualProject);
        }
        vsProject.developerSettings.angularProjects.forEach(function (angularProject) {
            var angularProjectDir = _this.cwd + angularProject.angularModule;
            // this.pr.embed_image(angularProjectDir);
        });
        var angularProjectDir = this.cwd + "\\wwwroot\\features";
        //this.pr.embed_image(angularProjectDir);
    };
    return TaskEmbed;
}(taskBase_1.TaskBase));
exports.TaskEmbed = TaskEmbed;
//# sourceMappingURL=taskEmbed.js.map