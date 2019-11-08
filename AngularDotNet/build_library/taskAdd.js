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
var commandLine_1 = require("../build_library/commandLine");
var taskbase_1 = require("./taskbase");
var buildModels_1 = require("../wwwroot/shared/client-side-models/buildModels");
var TaskAdd = /** @class */ (function (_super) {
    __extends(TaskAdd, _super);
    function TaskAdd($visualProject, $angularProject, $synchronous) {
        var _this = _super.call(this) || this;
        _this.cli = new commandLine_1.CommandLine();
        _this.synchronous = false;
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
        if ($angularProject !== null && $angularProject !== undefined) {
            _this.angularProject = $angularProject;
        }
        else {
            var angularProject = _this.getCommandArg("angularProject", "unknown");
            if (angularProject === "unknown") {
                throw new Error("angularProject parameter is missing!");
            }
            else {
                _this.angularProject = angularProject;
            }
        }
        process.chdir("..//");
        var cwd = process.cwd();
        _this.addAngularProject(_this.visualProject, _this.angularProject, function () {
            process.chdir(cwd);
            // update the package.json
            var pj = _this.getPackageJson(_this.visualProject);
            if (!pj.scripts["serveApp:" + _this.angularProject])
                pj.scripts["serveApp:" + _this.angularProject] = "ng serve " + _this.angularProject;
            _this.savePackageJson(_this.visualProject, pj);
            // update the DeveloperSettings
            var ds = _this.getDevelopersSettings(_this.visualProject);
            var newAngularProject = new buildModels_1.AngularProject();
            newAngularProject.angularModule = "\\wwwroot\\projects\\" + _this.angularProject + "\\src\\app";
            newAngularProject.angularProjectDir = "projects\\" + _this.angularProject;
            newAngularProject.angularRoot = _this.angularProject;
            newAngularProject.buildEnabled = false;
            newAngularProject.distFolder = _this.angularProject;
            newAngularProject.name = _this.angularProject;
            newAngularProject.production = false;
            newAngularProject.showPanel = false;
            newAngularProject.visualProject = null;
            ds.forEach(function (d) {
                d.angularProjects.push(newAngularProject);
            });
            _this.saveDevelopersSettings(_this.visualProject, ds);
            console.log("Completed adding: " + _this.angularProject + " to Visual Studio project: " + _this.visualProject);
            while (_this.waitOnCompleted) { }
        });
        return _this;
    }
    TaskAdd.prototype.addAngularProject = function (visualProject, angularProject, callback) {
        process.chdir(visualProject + "\\wwwroot");
        console.log("\nBeginning add to: " + visualProject + " Angular project: ");
        this.cli.executeAdd(angularProject, this.synchronous, function () {
            callback();
        });
    };
    return TaskAdd;
}(taskbase_1.TaskBase));
exports.TaskAdd = TaskAdd;
//# sourceMappingURL=taskAdd.js.map