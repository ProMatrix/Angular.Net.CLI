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
    function TaskAdd() {
        var _this = _super.call(this) || this;
        _this.cli = new commandLine_1.CommandLine();
        _this.synchronous = false;
        var visualProject = _this.findValueOf("visualProject");
        var angularProject = _this.findValueOf("angularProject");
        console.log("\n" + visualProject + ": " + angularProject);
        _this.waitOnCompleted = false;
        if (_this.findValueOf("waitOnCompleted") === "true")
            _this.waitOnCompleted = true;
        if (_this.findValueOf("synchronous") === "true")
            _this.synchronous = true;
        process.chdir("..//");
        var cwd = process.cwd();
        _this.addAngularProject(visualProject, angularProject, function () {
            process.chdir(cwd);
            // update the package.json
            var pj = _this.getPackageJson(visualProject);
            if (!pj.scripts["serveApp:" + angularProject])
                pj.scripts["serveApp:" + angularProject] = "ng serve " + angularProject;
            _this.savePackageJson(visualProject, pj);
            // update the DeveloperSettings
            var ds = _this.getDevelopersSettings(visualProject);
            var newAngularProject = new buildModels_1.AngularProject();
            newAngularProject.angularModule = "\\wwwroot\\projects\\" + angularProject + "\\src\\app";
            newAngularProject.angularProjectDir = "projects\\" + angularProject;
            newAngularProject.angularRoot = angularProject;
            newAngularProject.buildEnabled = false;
            newAngularProject.distFolder = "dist-" + angularProject;
            newAngularProject.name = angularProject;
            newAngularProject.production = false;
            newAngularProject.showPanel = false;
            newAngularProject.visualProject = null;
            ds.forEach(function (d) {
                d.angularProjects.push(newAngularProject);
            });
            _this.saveDevelopersSettings(visualProject, ds);
            console.log("Completed adding: " + angularProject + " to Visual Studio project: " + visualProject);
            while (_this.waitOnCompleted) { }
            ;
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