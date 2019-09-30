"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commonTasks_1 = require("./commonTasks");
var coloredLogger_1 = require("./coloredLogger");
var Versioning = /** @class */ (function () {
    function Versioning() {
        this.ct = new commonTasks_1.CommonTasks();
        this.cl = new coloredLogger_1.ColoredLogger();
        try {
            var ct = new commonTasks_1.CommonTasks();
        }
        catch (e) {
            console.log(e);
            while (true) {
            }
        }
    }
    Versioning.prototype.updatePackageVersion = function () {
        var packageJson = this.ct.getPackageJson();
        var versionParts = packageJson.version.split('.');
        var versionPatch = parseInt(versionParts[2]);
        versionPatch++;
        versionParts[2] = versionPatch.toString();
        packageJson.version = versionParts.join(".");
        this.ct.setPackageJson(packageJson);
        return packageJson.version;
    };
    Versioning.prototype.updateVersions = function () {
        var version = this.updatePackageVersion();
        var apiVersions = this.ct.getApiVersions();
        apiVersions.nodeJs = process.versions.node;
        apiVersions.v8Engine = process.versions.v8;
        var appSettings = this.ct.getAppSettings();
        appSettings.apiVersions = apiVersions;
        appSettings.projectVersionNo = version;
        this.ct.setAppSettings(appSettings);
        return version;
    };
    return Versioning;
}());
exports.Versioning = Versioning;
//# sourceMappingURL=versioning.js.map