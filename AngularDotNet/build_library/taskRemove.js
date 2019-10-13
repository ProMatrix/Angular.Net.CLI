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
var commonTasks_1 = require("./build_library/commonTasks");
var taskBase_1 = require("./taskBase");
var _ = require("lodash");
var TaskRemove = /** @class */ (function (_super) {
    __extends(TaskRemove, _super);
    function TaskRemove() {
        var _this = this;
        var ct = new commonTasks_1.CommonTasks();
        _this = _super.call(this) || this;
        var visualProject = _this.findValueOf("visualProject");
        var angularProject = _this.findValueOf("angularProject");
        console.log("\n" + visualProject + ": " + angularProject);
        _this.waitOnCompleted = false;
        if (_this.findValueOf("waitOnCompleted") === "true")
            _this.waitOnCompleted = true;
        process.chdir("..//");
        // update the DeveloperSettings
        var ds = _this.getDevelopersSettings(visualProject);
        ds.forEach(function (d) {
            d.serveApp = "desktop";
            var ngProject = _.find(d.angularProjects, function (x) { return (x.name.toLowerCase() === angularProject.toLowerCase()); });
            if (ngProject) {
                _.remove(d.angularProjects, ngProject);
            }
        });
        _this.saveDevelopersSettings(visualProject, ds);
        // update the angular.json
        var aj = _this.getAngularJson(visualProject);
        delete aj.projects[angularProject];
        _this.saveAngularJson(visualProject, aj);
        // update the package.json
        var pj = _this.getPackageJson(visualProject);
        var script = "serveApp:" + angularProject;
        delete pj.scripts[script];
        _this.savePackageJson(visualProject, pj);
        // remove the folders
        var projectPath = process.cwd() + "\\" + visualProject + "\\wwwroot\\projects\\" + angularProject;
        ct.removeDirectory(projectPath);
        console.log("Completed removing: " + angularProject + " from Visual Studio project: " + visualProject);
        while (_this.waitOnCompleted) { }
        ;
        return _this;
    }
    return TaskRemove;
}(taskBase_1.TaskBase));
exports.TaskRemove = TaskRemove;
//# sourceMappingURL=taskRemove.js.map