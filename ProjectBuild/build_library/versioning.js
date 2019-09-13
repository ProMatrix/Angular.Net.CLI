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
    Versioning.prototype.incrementApplicationVersion = function () {
        var appSettings = this.ct.getAppSettings();
        var parts = appSettings.projectVersionNo.split(".");
        var patch = parseInt(parts[2]);
        patch++;
        parts[2] = patch.toString();
        appSettings.projectVersionNo = parts.join(".");
        this.ct.setAppSettings(appSettings);
        // ???
        var packageJson = this.ct.getPackageJson();
        var versionParts = packageJson.version.split('.');
        var versionPatch = parseInt(versionParts[2]);
        versionPatch++;
        versionParts[2] = versionPatch.toString();
        packageJson.version = versionParts.join(".");
        this.ct.setPackageJson(packageJson);
    };
    Versioning.prototype.updateVersions = function () {
        this.incrementApplicationVersion();
        var apiVersions = this.ct.getApiVersions();
        apiVersions.nodeJs = process.versions.node;
        apiVersions.v8Engine = process.versions.v8;
        apiVersions.application = this.ct.getVersion();
        this.ct.setApiVersions(apiVersions);
        return apiVersions;
    };
    return Versioning;
}());
exports.Versioning = Versioning;
//# sourceMappingURL=versioning.js.map