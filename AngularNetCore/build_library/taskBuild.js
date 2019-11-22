import { __extends } from "tslib";
import { ColoredLogger } from '../build_library/coloredLogger';
import { Versioning } from '../build_library/versioning';
import { CommonTasks } from '../build_library/commonTasks';
import { CommandLine } from '../build_library/commandLine';
import { ProductionReady } from '../build_library/productionReady';
import { TaskBase } from './taskBase';
var _ = require('lodash');
import * as fs from 'fs';
var ncp = require('ncp');
var TaskBuild = /** @class */ (function (_super) {
    __extends(TaskBuild, _super);
    function TaskBuild($waitOnCompleted, $visualProject, $synchronous) {
        var _this = _super.call(this) || this;
        _this.cl = new ColoredLogger();
        _this.ver = new Versioning();
        _this.pr = new ProductionReady();
        _this.cli = new CommandLine();
        _this.ct = new CommonTasks();
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
}(TaskBase));
export { TaskBuild };
//# sourceMappingURL=taskBuild.js.map