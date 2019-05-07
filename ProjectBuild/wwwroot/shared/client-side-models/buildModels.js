"use strict";
exports.__esModule = true;
var Dependency = /** @class */ (function () {
    function Dependency() {
    }
    return Dependency;
}());
exports.Dependency = Dependency;
var TextMessage = /** @class */ (function () {
    function TextMessage() {
    }
    return TextMessage;
}());
exports.TextMessage = TextMessage;
var CellCarrier = /** @class */ (function () {
    function CellCarrier() {
    }
    return CellCarrier;
}());
exports.CellCarrier = CellCarrier;
var AppSettings = /** @class */ (function () {
    function AppSettings() {
        this.debug = false;
        this.testing = false;
        this.connectionString = "";
        this.projectVersionNo = "";
        this.splashTime = 0;
        this.googleMapKey = "";
        this.smtpReply = "";
        this.smtpHost = "";
        this.smtpPort = 0;
        this.smtpUn = "";
        this.smtpPw = "";
        this.cellCarriers = "";
        this.aspNetCoreVersion = "";
    }
    return AppSettings;
}());
exports.AppSettings = AppSettings;
var AngularProject = /** @class */ (function () {
    function AngularProject() {
        this.visualProject = "";
        this.name = "";
        this.buildEnabled = false;
        this.pwaSupport = false;
        this.production = false;
        this.distFolder = "";
        this.angularModule = "";
        this.angularRoot = "";
        this.angularProjectDir = "";
        this.showPanel = false;
    }
    return AngularProject;
}());
exports.AngularProject = AngularProject;
var LaunchSettings = /** @class */ (function () {
    function LaunchSettings() {
    }
    return LaunchSettings;
}());
exports.LaunchSettings = LaunchSettings;
var DeveloperSettings = /** @class */ (function () {
    function DeveloperSettings() {
        this.machineName = "";
        this.buildHook = false;
        this.importHook = false;
        this.executeDist = false;
        this.serveApp = "";
        this.releaseApp = "";
        this.libraryExports = Array();
        this.angularProjects = Array();
    }
    return DeveloperSettings;
}());
exports.DeveloperSettings = DeveloperSettings;
var VisualProject = /** @class */ (function () {
    function VisualProject() {
        this.name = "";
        this.projectVersionNo = "";
        this.applicationUrl = "";
        this.workingDirectory = "";
        this.developerSettings = new DeveloperSettings();
        this.showPanel = false;
        this.showVersion = true;
    }
    return VisualProject;
}());
exports.VisualProject = VisualProject;
var BuildConfiguration = /** @class */ (function () {
    function BuildConfiguration() {
        this.machineName = "";
        this.visualProjects = Array();
        this.shared = Array();
    }
    return BuildConfiguration;
}());
exports.BuildConfiguration = BuildConfiguration;
var BuildResponse = /** @class */ (function () {
    function BuildResponse() {
        this.consoleWindow = "";
        this.versionNo = "";
    }
    return BuildResponse;
}());
exports.BuildResponse = BuildResponse;
