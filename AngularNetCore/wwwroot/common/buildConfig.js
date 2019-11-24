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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var apiService_1 = require("../library_ng/enterprise/apiService");
var buildModels_1 = require("../library_ng/client-side-models/buildModels");
var environment_1 = require("../src/environments/environment");
var EventProperties = /** @class */ (function () {
    function EventProperties() {
    }
    return EventProperties;
}());
exports.EventProperties = EventProperties;
var EventLogEntry = /** @class */ (function () {
    function EventLogEntry() {
    }
    return EventLogEntry;
}());
exports.EventLogEntry = EventLogEntry;
var BuildConfig = /** @class */ (function (_super) {
    __extends(BuildConfig, _super);
    function BuildConfig(store, http) {
        var _this = _super.call(this, http, store) || this;
        _this.store = store;
        _this.http = http;
        _this.buildOutput = '';
        _this.config = new buildModels_1.BuildConfiguration();
        _this.buildConfig = new buildModels_1.BuildConfiguration();
        _this.vsProject = new buildModels_1.VisualProject();
        _this.eventLogEntries = new Array();
        _this.eventProperties = { exception: '', message: '', entryType: 1 };
        return _this;
    }
    BuildConfig.prototype.throwException = function (success, error) {
        this.post(this.eventProperties, environment_1.environment.api.throwException, function (response) {
            success();
        }, function () {
            error('Error: Successfully generated an Application Exception!');
        });
    };
    BuildConfig.prototype.logEntry = function (success, error) {
        this.post(this.eventProperties, environment_1.environment.api.postLogEntry, function (response) {
            success();
        }, function () {
            error('Error: Successfully created a log entry!');
        });
    };
    BuildConfig.prototype.getLogEntries = function (success, error) {
        var _this = this;
        this.get(environment_1.environment.api.getLogEntries, function (eventLogEntries) {
            _this.eventLogEntries = eventLogEntries;
            _this.eventLogEntries.forEach(function (entry) {
                entry.timeGenerated = new Date(entry.timeGenerated);
                entry.timeWritten = new Date(entry.timeWritten);
                entry.replacementStrings[1] = entry.replacementStrings[1].replace('\n', '<br />');
            });
            success();
        }, function (errorMessage) { error(errorMessage); });
    };
    BuildConfig.prototype.getBuildConfig = function (success, error) {
        var _this = this;
        this.get(environment_1.environment.api.getBuildConfig, function (buildConfig) {
            _this.buildConfig = buildConfig;
            _this.vsProject = buildConfig.visualProjects[0];
            success();
        }, function (errorMessage) { error(errorMessage); });
    };
    BuildConfig.prototype.saveVisualProject = function (success, error) {
        this.post(this.vsProject, environment_1.environment.api.saveVisualProject, function (response) {
            success();
        }, function () {
            error('Error: Problems saving changes! Could be that the server is not available.');
        });
    };
    BuildConfig.prototype.buildAngularProject = function (angularProject, success, error) {
        var _this = this;
        this.angularProject = angularProject;
        setTimeout(function () {
            _this.post(angularProject, environment_1.environment.api.buildAngularProject, function (buildResponse) {
                switch (buildResponse.payloadType) {
                    case 'processing':
                        _this.buildAngularProject(angularProject, success, error);
                        _this.buildOutput += buildResponse.consoleText;
                        break;
                    case 'completed':
                        _this.buildOutput += buildResponse.consoleText;
                        success(buildResponse.versionNo);
                        break;
                    case 'errored':
                        _this.buildOutput += buildResponse.consoleText;
                        error('Error while building: ' + angularProject.name);
                        break;
                }
                setTimeout(function () {
                    _this.consoleWindow.scrollTop = _this.consoleWindow.scrollHeight;
                }, 0);
            }, function (errorMessage) {
                error(errorMessage);
            });
        }, 1000);
    };
    BuildConfig.prototype.buildAngularProjects = function (success, error) {
        var _this = this;
        this.consoleWindow = document.querySelector('.textAreaForConsole');
        this.projectQueue = this.vsProject.developerSettings.angularProjects.filter(function (angularProject) { return angularProject.buildEnabled === true; });
        this.buildOutput = this.vsProject.name + '>';
        setTimeout(function () {
            _this.projectQueue.forEach(function (project) { project.visualProject = _this.vsProject.name; });
            _this.buildOutput = '';
            _this.buildProjectLoop(success, error);
        }, 1000);
    };
    BuildConfig.prototype.buildProjectLoop = function (success, error) {
        var _this = this;
        this.nextAngularProject(function (buildVersion) {
            if (_this.projectQueue.length === 0) {
                success(buildVersion);
            }
            else {
                _this.buildProjectLoop(success, error);
            }
        }, function () {
            error();
        });
    };
    BuildConfig.prototype.nextAngularProject = function (success, error) {
        var angularProject = this.projectQueue.shift();
        if (angularProject.buildEnabled) {
            this.buildOutput += angularProject.name + '>';
            this.buildAngularProject(angularProject, function (buildVersion) {
                success(buildVersion);
            }, function (errorMessage) {
                error();
            });
        }
        else {
            success(null);
        }
    };
    // updateImports(visualProject: VisualProject, success: Function, error: Function) {
    //    this.httpPost("build", "updateImports", visualProject, () => {
    //        success();
    //    },
    //        errorMessage => {
    //            error(errorMessage);
    //        });
    // }
    // updateExports(visualProject: VisualProject, success: Function, error: Function) {
    //    this.httpPost("build", "updateExports", visualProject, () => {
    //        success();
    //    },
    //        errorMessage => {
    //            error(errorMessage);
    //        });
    // }
    // isImportsUpdated(vsProject: VisualProject): boolean {
    //    return false;
    // }
    // getIsExportsUpdated(vsProject: VisualProject, success: Function, error: Function): boolean {
    //    this.httpGet("build", "getIsExportLibrariesSame", vsProject.name, (allFilesSame: boolean) => {
    //        success(allFilesSame);
    //    },
    //        errorMessage => {
    //            error(errorMessage);
    //        });
    //    return false;
    // }
    BuildConfig.prototype.addProject = function (success, error, finale) {
        var _this = this;
        var vsp = new buildModels_1.VisualProject();
        vsp.name = this.vsProject.name;
        vsp.developerSettings.angularProjects = Array.from(this.vsProject.developerSettings.angularProjects);
        vsp.developerSettings.angularProjects.push(this.angularProject);
        this.post(vsp, environment_1.environment.api.addAngularProject, function (visualProject) {
            _this.vsProject = visualProject;
            success();
            finale();
        }, function (errorMessage) {
            error(errorMessage);
            finale();
        });
    };
    BuildConfig.prototype.removeProject = function (success, error) {
        var _this = this;
        var angularProjects = Array.from(this.vsProject.developerSettings.angularProjects);
        // move the AngularProject to the bottom
        var projectToMove = this.vsProject.developerSettings.angularProjects.splice(this.vsProject.developerSettings.angularProjects.indexOf(this.angularProject), 1)[0];
        this.vsProject.developerSettings.angularProjects.push(projectToMove);
        this.post(this.vsProject, environment_1.environment.api.removeAngularProject, function () {
            _this.vsProject.developerSettings.serveApp = 'desktop';
            _this.vsProject.developerSettings.angularProjects.pop();
            success();
        }, function (errorMessage) {
            _this.vsProject.developerSettings.angularProjects = angularProjects;
            error(errorMessage);
        });
    };
    BuildConfig = __decorate([
        core_1.Injectable()
    ], BuildConfig);
    return BuildConfig;
}(apiService_1.ApiService));
exports.BuildConfig = BuildConfig;
//# sourceMappingURL=buildConfig.js.map