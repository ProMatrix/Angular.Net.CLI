"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var coloredLogger_1 = require("./build_library/coloredLogger");
var versioning_1 = require("./build_library/versioning");
var commonTasks_1 = require("./build_library/commonTasks");
var commandLine_1 = require("./build_library/commandLine");
var productionReady_1 = require("./build_library/productionReady");
var taskBase_1 = require("./taskBase");
var _ = require("lodash");
var TaskBuild = /** @class */ (function (_super) {
    __extends(TaskBuild, _super);
    function TaskBuild() {
        var _this = _super.call(this) || this;
        _this.cl = new coloredLogger_1.ColoredLogger();
        _this.ver = new versioning_1.Versioning();
        _this.pr = new productionReady_1.ProductionReady();
        _this.cli = new commandLine_1.CommandLine();
        _this.ct = new commonTasks_1.CommonTasks();
        _this.synchronous = true;
        var waitOnCompleted = _this.getCommandArg("waitOnCompleted", "unknown");
        if (waitOnCompleted === "unknown")
            return _this;
        if (waitOnCompleted === "true")
            _this.waitOnCompleted = true;
        var synchronous = _this.getCommandArg("synchronous", "unknown");
        if (synchronous === "false")
            _this.synchronous = false;
        var visualProject = _this.getCommandArg("visualProject", "unknown");
        if (visualProject !== "unknown")
            _this.single(visualProject);
        else
            _this.multiple();
        return _this;
    }
    TaskBuild.prototype.single = function (visualProject) {
        this.cwd = process.cwd();
        var bc = this.getBuildConfiguration();
        var vsProject = _.find(bc.visualProjects, function (x) { return (x.name === visualProject); });
        if (!vsProject)
            throw new Error("Can't find vsProject: " + visualProject);
        this.buildVsProject(vsProject);
    };
    TaskBuild.prototype.multiple = function () {
        var _this = this;
        this.cwd = process.cwd();
        var bc = this.getBuildConfiguration();
        bc.visualProjects.forEach(function (visualProject) {
            if (visualProject.developerSettings.buildHook)
                _this.buildVsProject(visualProject);
        });
    };
    TaskBuild.prototype.buildVsProject = function (vsProject) {
        var angularProjects = _.filter(vsProject.developerSettings.angularProjects, (function (x) { return x.buildEnabled; }));
        if (angularProjects.length === 0) {
            console.log("There are not Angular projects with Build enabled!");
            while (this.waitOnCompleted) { }
            ;
        }
        else {
            this.ngProjectQueue = _.cloneDeep(angularProjects);
            this.nextNgProject(vsProject);
        }
    };
    TaskBuild.prototype.nextNgProject = function (vsProject) {
        var _this = this;
        var ngProject = this.ngProjectQueue.shift();
        var distFolder = "dist\\" + ngProject.distFolder;
        process.chdir(this.cwd);
        process.chdir("..\\" + vsProject.name);
        var vsProjectDir = process.cwd();
        var appVersion = this.ver.updateVersions().application;
        process.chdir("wwwroot\\dist");
        this.ct.removeDirectory(ngProject.distFolder);
        process.chdir("..\\");
        this.pr.embed_image(vsProjectDir + ngProject.angularModule);
        this.pr.embed_image(vsProjectDir + "\\wwwroot\\features");
        if (ngProject.angularProjectDir.length > 0)
            process.chdir(ngProject.angularProjectDir);
        this.pr.squash(vsProjectDir + ngProject.angularModule);
        this.pr.squash(vsProjectDir + "\\wwwroot\\features");
        console.log("\nBeginning build of: " + vsProject.name + " (" + ngProject.name + ")");
        this.cli.executeBuild(ngProject.angularRoot, distFolder, ngProject.production, this.synchronous, function () {
            _this.pr.unSquash(vsProjectDir + ngProject.angularModule);
            _this.pr.unSquash(vsProjectDir + "\\wwwroot\\features");
            process.chdir(vsProjectDir + "\\" + "wwwroot");
            _this.pr.copyProjectFiles(distFolder);
            _this.pr.manageManifestPath(distFolder);
            if (ngProject.pwaSupport) {
                _this.pr.createServiceWorker(distFolder, appVersion);
                _this.pr.enableServiceWorker(distFolder);
            }
            else {
                _this.pr.removeServiceWorker(distFolder);
            }
            console.log("Completed build of: " + vsProject.name + " (" + ngProject.name + ") : Version: " + appVersion);
            if (_this.ngProjectQueue.length === 0) {
                while (_this.waitOnCompleted) { }
            }
            else {
                _this.nextNgProject(vsProject);
            }
        });
    };
    return TaskBuild;
}(taskBase_1.TaskBase));
exports.TaskBuild = TaskBuild;
try {
    new TaskBuild();
}
catch (e) {
    console.log(e);
    while (true) { }
}
//# sourceMappingURL=taskBuild.js.map