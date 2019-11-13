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
var commonTasks_1 = require("../build_library/commonTasks");
var taskBase_1 = require("./taskBase");
var _ = require("lodash");
var TaskRemove = /** @class */ (function (_super) {
    __extends(TaskRemove, _super);
    function TaskRemove($waitOnCompleted, $visualProject, $angularProject) {
        var _this = this;
        var ct = new commonTasks_1.CommonTasks();
        _this = _super.call(this) || this;
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
        if ($angularProject !== null && $angularProject !== undefined) {
            _this.angularProject = $angularProject;
        }
        else {
            var angularProject = _this.getCommandArg('angularProject', 'unknown');
            if (angularProject === 'unknown') {
                throw new Error('angularProject parameter is missing!');
            }
            else {
                _this.angularProject = angularProject;
            }
        }
        process.chdir('..//');
        // update the DeveloperSettings
        var ds = _this.getDevelopersSettings(_this.visualProject);
        ds.forEach(function (d) {
            d.serveApp = 'desktop';
            var ngProject = _.find(d.angularProjects, function (x) { return (x.name.toLowerCase() === _this.angularProject.toLowerCase()); });
            if (ngProject) {
                _.remove(d.angularProjects, ngProject);
            }
        });
        _this.saveDevelopersSettings(_this.visualProject, ds);
        // update the angular.json
        var aj = _this.getAngularJson(_this.visualProject);
        delete aj.projects[_this.angularProject];
        _this.saveAngularJson(_this.visualProject, aj);
        // update the package.json
        var pj = _this.getPackageJson(_this.visualProject);
        var script = 'serveApp:' + _this.angularProject;
        delete pj.scripts[script];
        _this.savePackageJson(_this.visualProject, pj);
        // remove the folders
        var projectPath = process.cwd() + '\\' + _this.visualProject + '\\wwwroot\\projects\\' + _this.angularProject;
        ct.removeDirectory(projectPath);
        console.log('Completed removing: ' + _this.angularProject + ' from Visual Studio project: ' + _this.visualProject);
        while (_this.waitOnCompleted) { }
        return _this;
    }
    return TaskRemove;
}(taskBase_1.TaskBase));
exports.TaskRemove = TaskRemove;
//# sourceMappingURL=taskRemove.js.map