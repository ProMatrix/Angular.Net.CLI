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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseServices } from "./baseServices";
import * as _ from "lodash";
import { BuildConfiguration } from "../shared/client-side-models/buildModels";
var BuildConfig = /** @class */ (function (_super) {
    __extends(BuildConfig, _super);
    function BuildConfig(http) {
        var _this = _super.call(this, http) || this;
        _this.http = http;
        _this.buildOutput = "";
        _this.config = new BuildConfiguration();
        return _this;
    }
    BuildConfig.prototype.getBuildConfig = function (success, error) {
        var _this = this;
        this.httpGet("build", "getConfig", "", function (config) {
            _this.config = config;
            success();
        }, function (errorMessage) {
            error(errorMessage);
        });
    };
    BuildConfig.prototype.buildAngularProject = function (angularProject, success, error) {
        var _this = this;
        this.angularProject = angularProject;
        this.httpPost("build", "buildAngularProject", angularProject, function (buildResponse) {
            _this.buildOutput += buildResponse.consoleWindow;
            var visualProject = _.filter(_this.config.visualProjects, function (x) { return (x.name === _this.visualProject.name); })[0];
            visualProject.projectVersionNo = buildResponse.versionNo;
            success();
        }, function (errorMessage) {
            error(errorMessage);
        });
    };
    BuildConfig.prototype.buildAngularProjects = function (visualProject, success, error) {
        var _this = this;
        this.visualProject = visualProject;
        this.consoleWindow = document.querySelector(".textAreaForConsole");
        this.projectQueue = _.cloneDeep(visualProject.developerSettings.angularProjects);
        this.buildOutput = visualProject.name + ">";
        setTimeout(function () {
            _this.projectQueue.forEach(function (project) { project.visualProject = visualProject.name; });
            _this.buildOutput = "";
            _this.buildProjectLoop(success, error);
        }, 1000);
    };
    BuildConfig.prototype.buildProjectLoop = function (success, error) {
        var _this = this;
        this.nextAngularProject(function () {
            setTimeout(function () {
                _this.consoleWindow.scrollTop = _this.consoleWindow.scrollHeight;
            }, 0);
            if (_this.projectQueue.length === 0)
                success();
            else
                _this.buildProjectLoop(success, error);
        }, function () {
            error();
        });
    };
    BuildConfig.prototype.nextAngularProject = function (success, error) {
        var _this = this;
        var angularProject = this.projectQueue.shift();
        if (angularProject.buildEnabled) {
            this.buildOutput += angularProject.name + ">";
            var intervalId_1 = setInterval(function () {
                _this.buildOutput += ".";
            }, 250);
            this.buildAngularProject(angularProject, function (build) {
                clearInterval(intervalId_1);
                success();
            }, function (errorMessage) {
                error(errorMessage);
            });
        }
        else
            success();
    };
    BuildConfig.prototype.saveVisualProject = function (visualProject, success, error) {
        this.httpPost("build", "saveVisualProject", visualProject, function () {
            success();
        }, function () {
            error("Error: Problems saving changes! Could be that the server is not available.");
        });
    };
    BuildConfig.prototype.updateImports = function (visualProject, success, error) {
        this.httpPost("build", "updateImports", visualProject, function () {
            success();
        }, function (errorMessage) {
            error(errorMessage);
        });
    };
    BuildConfig.prototype.updateExports = function (visualProject, success, error) {
        this.httpPost("build", "updateExports", visualProject, function () {
            success();
        }, function (errorMessage) {
            error(errorMessage);
        });
    };
    BuildConfig.prototype.isImportsUpdated = function (vsProject) {
        return false;
    };
    BuildConfig.prototype.getIsExportsUpdated = function (vsProject, success, error) {
        this.httpGet("build", "getIsExportLibrariesSame", vsProject.name, function (allFilesSame) {
            success(allFilesSame);
        }, function (errorMessage) {
            error(errorMessage);
        });
        return false;
    };
    BuildConfig.prototype.addProject = function (visualProject, success, error) {
        var _this = this;
        this.httpPost("build", "addProject", visualProject, function (visualProject) {
            _this.config.visualProjects = _.map(_this.config.visualProjects, function (x) { return x.name === _this.visualProject.name ? visualProject : x; });
            success();
        }, function (errorMessage) {
            error(errorMessage);
        });
    };
    BuildConfig.prototype.removeProject = function (visualProject, success, error) {
        return;
        this.httpPost("build", "removeProject", visualProject, function () {
            visualProject.developerSettings.serveApp = "desktop";
            success();
        }, function (errorMessage) {
            error(errorMessage);
        });
    };
    BuildConfig.prototype.launchApp = function (visualProject, success, error) {
        this.httpPost("build", "launchApp", visualProject, function () {
            success();
        }, function (errorMessage) {
            error(errorMessage);
        });
    };
    BuildConfig = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], BuildConfig);
    return BuildConfig;
}(BaseServices));
export { BuildConfig };
//# sourceMappingURL=buildConfig.js.map