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
        this.visualProject = '';
        this.angularProject = '';
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
        // let packageJson2 = JSON.stringify(packageJson, null, 2);
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
            .filter(function (x) { return fs.statSync(x).isDirectory(); });
        dirs.forEach(function (dir) {
            var appsettingsPath = dir + '\\appsettings.json';
            if (fs.existsSync(appsettingsPath)) {
                var appsettings = fs.readFileSync(appsettingsPath).toString();
                if (appsettings.charCodeAt(0) === 0xFEFF) {
                    appsettings = appsettings.substring(1, appsettings.length);
                }
                var ax = JSON.parse(appsettings);
                var as = ax.appSettings;
                if (as) {
                    var buildVersion = as.buildVersion;
                    if (buildVersion) {
                        var developersettingsPath = dir + '\\developersSettings.json';
                        var developersSettings = JSON.parse(fs.readFileSync(developersettingsPath)
                            .toString());
                        var developerSettings = _.find(developersSettings, function (x) { return (x.machineName === os.hostname()); });
                        var launchSettingsPath = dir + '\\properties\\launchsettings.json';
                        var launchSettings = new buildModels_1.LaunchSettings();
                        var project = dir.substr(dir.lastIndexOf('\\') + 1);
                        if (fs.existsSync(launchSettingsPath)) {
                            var launchSettingsString = fs.readFileSync(launchSettingsPath).toString();
                            if (launchSettingsString.charCodeAt(0) === 0xFEFF) {
                                launchSettingsString = launchSettingsString.substring(1, launchSettingsString.length);
                            }
                            launchSettings = JSON.parse(launchSettingsString);
                        }
                        if (!developerSettings) {
                            developerSettings = _.find(developersSettings, function (x) { return (x.machineName === 'ANONYMOUS DEVELOPERS MACHINE NAME'); });
                        }
                        if (launchSettings.profiles[project]) {
                            var applicationUrl = launchSettings.profiles[project].applicationUrl;
                            if (applicationUrl.indexOf(';') !== -1) {
                                applicationUrl = applicationUrl.substr(0, applicationUrl.indexOf(';'));
                            }
                            bc.visualProjects.push({ name: path.basename(dir),
                                developerSettings: developerSettings, showPanel: false, showVersion: true,
                                applicationUrl: applicationUrl, workingDirectory: dir
                            });
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