"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var os = require("os");
var _ = require("lodash");
var path = require('path');
var buildModels_1 = require("../wwwroot/shared/client-side-models/buildModels");
var TaskBase = /** @class */ (function () {
    function TaskBase() {
        this.waitOnCompleted = false;
        this.visualProject = "";
    }
    TaskBase.prototype.getDevelopersSettings = function (visualProject) {
        var developersettingsPath = process.cwd() + '\\' + visualProject + '\\developersSettings.json';
        var developersSettings = JSON.parse(fs.readFileSync(developersettingsPath).toString());
        return developersSettings;
    };
    TaskBase.prototype.saveDevelopersSettings = function (visualProject, developersSettings) {
        var developersettingsPath = process.cwd() + '\\' + visualProject + '\\developersSettings.json';
        fs.writeFileSync(developersettingsPath, JSON.stringify(developersSettings, null, 2));
    };
    TaskBase.prototype.getAngularJson = function (visualProject) {
        var angularJsonPath = process.cwd() + '\\' + visualProject + '\\wwwroot\\angular.json';
        var angularJson = JSON.parse(fs.readFileSync(angularJsonPath).toString());
        return angularJson;
    };
    TaskBase.prototype.saveAngularJson = function (visualProject, angularJson) {
        var angularJsonPath = process.cwd() + '\\' + visualProject + '\\wwwroot\\angular.json';
        fs.writeFileSync(angularJsonPath, JSON.stringify(angularJson, null, 2));
    };
    TaskBase.prototype.getPackageJson = function (visualProject) {
        var packageJsonPath = process.cwd() + '\\' + visualProject + '\\wwwroot\\package.json';
        var packageJsonString = fs.readFileSync(packageJsonPath).toString();
        var packageJson = JSON.parse(packageJsonString);
        return packageJson;
    };
    TaskBase.prototype.savePackageJson = function (visualProject, packageJson) {
        //let packageJson2 = JSON.stringify(packageJson, null, 2);
        var packageJsonPath = process.cwd() + '\\' + visualProject + '\\wwwroot\\package.json';
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    };
    TaskBase.prototype.getBuildConfiguration = function () {
        process.chdir('..\\' + this.visualProject);
        var pbp = process.cwd();
        var sharedPath = process.cwd();
        sharedPath += '\\wwwroot\\shared';
        var shared = fs.readdirSync(sharedPath);
        process.chdir('..\\');
        var cwd = process.cwd();
        var bc = { machineName: os.hostname(), visualProjects: new Array(), shared: shared };
        var dirs = fs.readdirSync(cwd)
            .map(function (file) { return path.join(cwd, file); })
            .filter(function (path) { return fs.statSync(path).isDirectory(); });
        dirs.forEach(function (dir) {
            var appsettings = dir + '\\appsettings.json';
            if (fs.existsSync(appsettings)) {
                var ax = JSON.parse(fs.readFileSync(appsettings).toString());
                var as = ax['AppSettings'];
                if (as) {
                    var projectVersionNo = as.projectVersionNo;
                    if (projectVersionNo) {
                        var developersettingsPath = dir + '\\developersSettings.json';
                        var developersSettings = JSON.parse(fs.readFileSync(developersettingsPath).toString());
                        var developerSettings = _.find(developersSettings, function (x) { return (x.machineName === os.hostname()); });
                        var launchsettingsPath = dir + '\\properties\\launchsettings.json';
                        var launchSettings = new buildModels_1.LaunchSettings();
                        var project = dir.substr(dir.lastIndexOf('\\') + 1);
                        if (fs.existsSync(launchsettingsPath)) {
                            launchSettings = JSON.parse(fs.readFileSync(launchsettingsPath).toString());
                        }
                        if (!developerSettings)
                            developerSettings = _.find(developersSettings, function (x) { return (x.machineName === 'ANONYMOUS DEVELOPERS MACHINE NAME'); });
                        if (launchSettings.profiles[project]) {
                            var applicationUrl = launchSettings.profiles[project].applicationUrl;
                            if (applicationUrl.indexOf(';') !== -1)
                                applicationUrl = applicationUrl.substr(0, applicationUrl.indexOf(';'));
                            bc.visualProjects.push({ name: path.basename(dir), projectVersionNo: projectVersionNo, developerSettings: developerSettings, showPanel: false, showVersion: true, applicationUrl: applicationUrl, workingDirectory: dir });
                        }
                    }
                }
            }
        });
        process.chdir(pbp);
        return bc;
    };
    TaskBase.prototype.findValueOf = function (arg) {
        try {
            return process.argv.filter(function (x) { return x.indexOf(arg) !== -1; })[0].split('=')[1];
        }
        catch (e) {
            // expected
        }
    };
    TaskBase.prototype.getCommandArg = function (arg, defaultString) {
        try {
            return process.argv.filter(function (x) { return x.indexOf(arg) !== -1; })[0].split('=')[1];
        }
        catch (e) {
            return defaultString;
        }
    };
    return TaskBase;
}());
exports.TaskBase = TaskBase;
//# sourceMappingURL=taskBase.js.map