"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var coloredLogger_1 = require("./coloredLogger");
var apiVersions_1 = require("../wwwroot/shared/client-side-models/apiVersions");
var commandLine_1 = require("./commandLine");
var fs = require("fs");
var BuildTime = /** @class */ (function () {
    function BuildTime() {
        this.exitAfterExecution = false;
        this.isDebuggingGulp = false;
    }
    return BuildTime;
}());
var ProjectSettings = /** @class */ (function () {
    function ProjectSettings() {
    }
    return ProjectSettings;
}());
var CommonTasks = /** @class */ (function () {
    function CommonTasks() {
        this.cl = new coloredLogger_1.ColoredLogger();
        this.buildTime = new BuildTime();
        this.cli = new commandLine_1.CommandLine();
    }
    CommonTasks.prototype.getProjectSettings = function () {
        var cwd = process.cwd();
        var projectSettings = fs.readFileSync(cwd + "\\projectSettings.json").toString();
        if (projectSettings.charCodeAt(0) === 0xFEFF)
            projectSettings = projectSettings.substring(1, projectSettings.length);
        return JSON.parse(projectSettings);
    };
    CommonTasks.prototype.setProjectSettings = function (projectSettings) {
        var cwd = process.cwd();
        var projectSettingsString = JSON.stringify(projectSettings, null, 2);
        fs.writeFileSync(cwd + "\\projectSettings.json", projectSettingsString);
    };
    CommonTasks.prototype.getAppSettings = function () {
        var appsettings = fs.readFileSync(process.cwd() + "\\appsettings.json").toString();
        if (appsettings.charCodeAt(0) === 0xFEFF)
            appsettings = appsettings.substring(1, appsettings.length);
        var json = JSON.parse(appsettings);
        return json.AppSettings;
    };
    CommonTasks.prototype.setAppSettings = function (appSettings) {
        var newSettings = '{  "AppSettings":   ' + JSON.stringify(appSettings, null, 2) + '}';
        fs.writeFileSync(process.cwd() + "\\appsettings.json", newSettings);
    };
    CommonTasks.prototype.getPackageJson = function () {
        var packageJson = fs.readFileSync(process.cwd() + '\\wwwroot\\package.json').toString();
        if (packageJson.charCodeAt(0) === 0xFEFF)
            packageJson = packageJson.substring(1, packageJson.length);
        return JSON.parse(packageJson);
    };
    CommonTasks.prototype.setPackageJson = function ($packageJson) {
        fs.writeFileSync(process.cwd() + '\\wwwroot\\package.json', JSON.stringify($packageJson, null, 2));
    };
    CommonTasks.prototype.getInstalledDependencies = function (apiVersions) {
        var path = process.cwd() + "\\wwwroot\\package.json";
        var jsonString = fs.readFileSync(process.cwd() + "\\wwwroot\\package.json").toString();
        if (jsonString.charCodeAt(0) === 0xFEFF)
            jsonString = jsonString.substring(1, jsonString.length);
        var dependencies = JSON.parse(jsonString).dependencies;
        apiVersions.rxJs = this.getDependency(dependencies, "rxjs");
        apiVersions.lodash = this.getDependency(dependencies, "lodash");
        apiVersions.moment = this.getDependency(dependencies, "moment");
        apiVersions.ngxtoastr = this.getDependency(dependencies, "ngx-toastr");
        apiVersions.fileSaver = this.getDependency(dependencies, "file-saver");
        apiVersions.coreJs = this.getDependency(dependencies, "core-js");
        apiVersions.zoneJs = this.getDependency(dependencies, "zone.js");
        apiVersions.googleMaps = this.getDependency(dependencies, "@types/google-maps");
    };
    CommonTasks.prototype.getInstalledDevDependencies = function (apiVersions) {
        var path = process.cwd() + "\\wwwroot\\package.json";
        var jsonString = fs.readFileSync(process.cwd() + "\\wwwroot\\package.json").toString();
        if (jsonString.charCodeAt(0) === 0xFEFF)
            jsonString = jsonString.substring(1, jsonString.length);
        var devDependencies = JSON.parse(jsonString).devDependencies;
        apiVersions.typeScript = this.getDependency(devDependencies, "typescript");
    };
    CommonTasks.prototype.getApiVersions = function () {
        var apiVersions = new apiVersions_1.ApiVersions();
        this.getInstalledDependencies(apiVersions);
        this.getInstalledDevDependencies(apiVersions);
        return apiVersions;
    };
    CommonTasks.prototype.getDependency = function (obj, key) {
        var version = obj[key];
        if (!version)
            return "";
        version = version.replace("^", "");
        version = version.replace("~", "");
        return version;
    };
    // create a TypeScript class from an object
    CommonTasks.prototype.objToString = function (obj) {
        var objName = obj.constructor.name;
        var preString = "export class " + objName + " {\n";
        var properties = "";
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                var value = "";
                if (obj[p])
                    value = obj[p];
                properties += "    " + p + " = \'" + value + "\';\n";
            }
        }
        var postString = "    }\n";
        return preString + properties + postString;
    };
    CommonTasks.prototype.printTime = function () {
        var d = new Date();
        var t = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ":" + d.getMilliseconds();
        this.cl.printSuccess("TIME: " + t);
    };
    CommonTasks.prototype.printVersion = function () {
        var rt = this.getAppSettings();
        var vn = rt.projectVersionNo;
        this.cl.printSuccess("VERSION: " + vn);
    };
    CommonTasks.prototype.getVersion = function () {
        var rt = this.getAppSettings();
        return rt.projectVersionNo;
    };
    CommonTasks.prototype.removeDirectory = function (directory) {
        var _this = this;
        if (!fs.existsSync(directory))
            return;
        fs.readdirSync(directory).forEach(function (i) {
            var path = directory + "\\" + i;
            if (fs.statSync(path).isDirectory()) {
                _this.removeDirectory(path);
            }
            else {
                fs.unlinkSync(path);
            }
        });
        fs.rmdirSync(directory);
    };
    return CommonTasks;
}());
exports.CommonTasks = CommonTasks;
//# sourceMappingURL=commonTasks.js.map