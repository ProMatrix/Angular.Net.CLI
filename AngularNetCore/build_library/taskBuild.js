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
var _ = require('lodash');
var fs = require("fs");
var ncp = require('ncp');
var TaskBuild = /** @class */ (function (_super) {
    __extends(TaskBuild, _super);
    function TaskBuild($waitOnCompleted, $visualProject, $synchronous) {
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
        _this.build(_this.visualProject);
        return _this;
    }
    TaskBuild.prototype.build = function (visualProject) {
        this.cwd = process.cwd();
        var bc = this.getBuildConfiguration();
        var vsProject = _.find(bc.visualProjects, function (x) { return (x.name === visualProject); });
        if (!vsProject) {
            throw new Error('Can\'t find vsProject: ' + visualProject);
        }
        this.buildVsProject(vsProject);
    };
    TaskBuild.prototype.buildVsProject = function (vsProject) {
        var angularProjects = _.filter(vsProject.developerSettings.angularProjects, (function (x) { return x.buildEnabled; }));
        if (angularProjects.length === 0) {
            console.log('There are not Angular projects with Build enabled!');
            while (this.waitOnCompleted) { }
        }
        else {
            this.ngProjectQueue = _.cloneDeep(angularProjects);
            this.nextNgProject(vsProject);
        }
    };
    TaskBuild.prototype.nextNgProject = function (vsProject) {
        var _this = this;
        var ngProject = this.ngProjectQueue.shift();
        var outputFolder = 'dist/' + ngProject.distFolder;
        process.chdir(this.cwd);
        process.chdir('..\\' + vsProject.name);
        var vsProjectDir = process.cwd();
        var appVersion = this.ver.updateVersions();
        if (!fs.existsSync('wwwroot\\dist')) {
            fs.mkdirSync('wwwroot\\dist');
        }
        process.chdir('wwwroot\\dist');
        this.ct.removeDirectory('temp');
        process.chdir('..\\');
        if (ngProject.angularProjectDir.length > 0) {
            process.chdir(ngProject.angularProjectDir);
        }
        console.log('\nBeginning build of: ' + vsProject.name + ' (' + ngProject.name + ')');
        this.cli.executeBuild(ngProject.angularRoot, 'dist/temp', ngProject.production, this.synchronous, function () {
            if (ngProject.angularProjectDir.length > 0) {
                process.chdir('..\\..\\dist');
            }
            else {
                process.chdir('dist');
            }
            _this.ct.updateHref('temp\\index.html', 'dist/temp', 'dist/' + ngProject.distFolder);
            _this.ct.removeDirectory(ngProject.distFolder);
            ncp('temp', ngProject.distFolder, function (err) {
                if (err) {
                    return console.error(err);
                }
                process.chdir(vsProjectDir + '\\' + 'wwwroot');
                _this.pr.copyProjectFiles(outputFolder);
                _this.pr.manageManifestPath(outputFolder);
                if (ngProject.pwaSupport) {
                    _this.pr.createServiceWorker(outputFolder, appVersion);
                    _this.pr.enableServiceWorker(outputFolder);
                }
                else {
                    _this.pr.removeServiceWorker(outputFolder);
                }
                console.log('Completed build of: ' + vsProject.name + ' (' + ngProject.name + ') : Version: ' + appVersion);
                if (_this.ngProjectQueue.length === 0) {
                    while (_this.waitOnCompleted) { }
                }
                else {
                    _this.nextNgProject(vsProject);
                }
            });
        }, function () {
            console.log('Error building: ' + vsProject.name + ' (' + ngProject.name + ')');
        });
    };
    return TaskBuild;
}(taskBase_1.TaskBase));
exports.TaskBuild = TaskBuild;
//# sourceMappingURL=taskBuild.js.map