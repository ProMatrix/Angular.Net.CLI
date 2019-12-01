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
var commonTasks_1 = require("../build_library/commonTasks");
var taskbase_1 = require("./taskbase");
var buildModels_1 = require("../wwwroot/library_ng/client-side-models/buildModels");
var fs = require("fs");
var ncp = require('ncp');
var glob = require('glob');
var TaskAdd = /** @class */ (function (_super) {
    __extends(TaskAdd, _super);
    function TaskAdd($visualProject, $angularProject, $synchronous) {
        var _this = _super.call(this) || this;
        _this.cli = new commandLine_1.CommandLine();
        _this.ct = new commonTasks_1.CommonTasks();
        _this.synchronous = false;
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
        var cwd = process.cwd();
        // quick fix
        _this.manageProjectFiles();
        return _this;
        _this.addAngularProject(function () {
            process.chdir(cwd);
            // update the package.json
            var pj = _this.getPackageJson(_this.visualProject);
            if (!pj.scripts['serveApp:' + _this.angularProject]) {
                pj.scripts['serveApp:' + _this.angularProject] = 'ng serve ' + _this.angularProject;
            }
            _this.savePackageJson(_this.visualProject, pj);
            // update the DeveloperSettings
            var ds = _this.getDevelopersSettings(_this.visualProject);
            var newAngularProject = new buildModels_1.AngularProject();
            newAngularProject.angularModule = '\\wwwroot\\projects\\' + _this.angularProject + '\\src\\app';
            newAngularProject.angularProjectDir = 'projects\\' + _this.angularProject;
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
            //this.manageProjectFiles();
            console.log('Completed adding: ' + _this.angularProject + ' to Visual Studio project: ' + _this.visualProject);
            while (_this.waitOnCompleted) { }
        });
        return _this;
    }
    TaskAdd.prototype.addAngularProject = function (callback) {
        process.chdir(this.visualProject + '\\wwwroot');
        console.log('\nBeginning add to: ' + this.visualProject + ' Angular project: ');
        this.cli.executeAdd(this.angularProject, this.synchronous, function () {
            callback();
        });
    };
    TaskAdd.prototype.manageProjectFiles = function () {
        var _this = this;
        var cwd = process.cwd();
        var templateProject = cwd + '\\' + this.visualProject + '\\wwwroot\\projects\\template';
        var originalProject = cwd + '\\' + this.visualProject + '\\wwwroot\\projects\\' + this.angularProject;
        if (fs.existsSync(originalProject)) {
            this.ct.removeDirectory(originalProject);
        }
        ncp(templateProject, originalProject, function (err) {
            if (err) {
                return console.error(err);
            }
            var sourceRoot = originalProject + '\\src\\app';
            glob.sync(sourceRoot + '\\template.component.*').forEach(function (filePath) {
                var newFilePath = filePath.replace('template.component', _this.angularProject + '.component');
                fs.renameSync(filePath, newFilePath);
            });
        });
    };
    TaskAdd.prototype.renameFile = function () {
    };
    return TaskAdd;
}(taskbase_1.TaskBase));
exports.TaskAdd = TaskAdd;
//# sourceMappingURL=taskAdd.js.map