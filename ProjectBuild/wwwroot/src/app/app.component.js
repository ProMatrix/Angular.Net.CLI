var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
// services
import { AppConfig } from "../../common/appConfig";
import { BuildConfig } from "../../common/buildConfig";
import { ToastrService } from 'ngx-toastr';
import { AppServices } from '../../shared/ng2-apphelper/appServices';
import { AngularProject } from "../../shared/client-side-models/buildModels";
import { ModalDialogComponent } from "../../shared/ng2-animation/modalDialog";
import * as _ from "lodash";
var AppComponent = /** @class */ (function () {
    function AppComponent(ac, bc, toastr, as) {
        this.ac = ac;
        this.bc = bc;
        this.toastr = toastr;
        this.appTitle = "Angular.Net Configuration Tool";
        this.showOpeningTitle = true;
        this.showBuildView = false;
        this.appLoaded = false;
        this.showModalDialog = false;
        this.showBuildDialog = false;
        this.showAddDialog = false;
        this.showRemoveDialog = false;
        this.savingChanges = false;
        this.isImportsUpdated = false;
        this.isExportsUpdated = false;
        this.newAngularProject = "";
        this.appHref = window.location.href;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.getBuildConfig();
    };
    AppComponent.prototype.getBuildConfig = function () {
        var _this = this;
        this.bc.getBuildConfig(function () {
            setTimeout(function () {
                _this.showOpeningTitle = false;
                setTimeout(function () {
                    _this.bc.buildOutput = "Angular.Net> ";
                    _this.showBuildView = true;
                }, 500);
            }, 500);
        }, function (errorMessage) {
            _this.toastr.error(errorMessage);
        });
    };
    AppComponent.prototype.onClickDebugRelease = function (vsProject) {
        vsProject.developerSettings.executeDist = !vsProject.developerSettings.executeDist;
    };
    AppComponent.prototype.willExecuteRelease = function (vsProject) {
        if (vsProject.developerSettings.executeDist)
            return "checked";
        else
            return "";
    };
    AppComponent.prototype.angularProjectSelected = function (vsProject, angularProject) {
        if (vsProject.developerSettings.serveApp === angularProject.name)
            return true;
        else
            return false;
    };
    AppComponent.prototype.willExecuteProject = function (vsProject, angularProject) {
        if (vsProject.developerSettings.serveApp === angularProject.name && !vsProject.developerSettings.executeDist)
            return true;
        else
            return false;
    };
    AppComponent.prototype.onClickDebugEnabled = function (vsProject, angularProject) {
        vsProject.developerSettings.executeDist = false;
        vsProject.developerSettings.serveApp = angularProject.name;
    };
    AppComponent.prototype.onClickReleaseProject = function (vsProject, angularProject) {
        vsProject.developerSettings.serveApp = angularProject.name;
    };
    AppComponent.prototype.isBuildDisabled = function (vsProject) {
        if (_.filter(vsProject.developerSettings.angularProjects, function (x) { return (x.buildEnabled); }).length === 0)
            return true;
        else
            return false;
    };
    AppComponent.prototype.saveChanges = function (vsProject) {
        var _this = this;
        if (this.savingChanges)
            return;
        this.savingChanges = true;
        this.bc.saveVisualProject(vsProject, function () {
            _this.savingChanges = false;
        }, function (errorMessage) {
            _this.toastr.error(errorMessage);
            _this.savingChanges = false;
        });
    };
    AppComponent.prototype.isProjectNameValue = function () {
        var _this = this;
        this.md.okDisabled = true;
        if (this.newAngularProject.length > 2)
            this.md.okDisabled = false;
        if (_.find(this.bc.visualProject.developerSettings.angularProjects, function (x) { return (x.name === _this.newAngularProject); }))
            this.md.okDisabled = true;
    };
    AppComponent.prototype.isKeyValid = function (key) {
        if (key === " ")
            return false;
        var rg1 = /^[^\\/:\*\?\]"<>.,0123456789;!@#$%^&'{}[\|]+$/; // forbidden characters
        if (rg1.test(key))
            return true;
        return false;
    };
    AppComponent.prototype.onClickRemove = function (vsProject, angularProject) {
        var _this = this;
        this.bc.visualProject = vsProject;
        this.bc.angularProject = angularProject;
        this.md.modalDialogTitle = "Removing an Angular Project";
        this.md.showCancelButton = false;
        this.md.isClosable = true;
        this.md.desiredWidth = 400;
        this.md.desiredHeight = 200;
        this.md.showYesButton = true;
        this.md.showNoButton = true;
        this.md.showOkButton = false;
        this.md.showCancelButton = false;
        this.showModalDialog = false;
        this.showBuildDialog = false;
        this.showAddDialog = false;
        this.showRemoveDialog = false;
        setTimeout(function () {
            _this.showModalDialog = true;
            _this.showRemoveDialog = true;
        }, 0);
        this.md.dialogButtonCallback = function (buttonClicked) {
            if (buttonClicked === "yes") {
                // move Angular project to the bottom
                _.remove(vsProject.developerSettings.angularProjects, angularProject);
                vsProject.developerSettings.angularProjects.push(angularProject);
                _this.bc.removeProject(vsProject, function () {
                    _this.toastr.success("Completed the remove successfully!");
                    _.remove(vsProject.developerSettings.angularProjects, angularProject);
                    _this.md.closeDialog();
                }, function (errorMessage) {
                    _this.toastr.error(errorMessage);
                });
            }
            else
                _this.md.closeDialog();
        };
    };
    AppComponent.prototype.onClickLanch = function (vsProject) {
        var _this = this;
        this.bc.launchApp(vsProject, function () {
            _this.toastr.success("Completed the launch successfully!");
        }, function (errorMessage) {
            _this.toastr.error(errorMessage);
        });
    };
    AppComponent.prototype.onClickAdd = function (vsProject) {
        var _this = this;
        this.bc.visualProject = vsProject;
        this.md.modalDialogTitle = "Adding an Angular Project to: " + vsProject.name;
        this.md.showCancelButton = false;
        this.md.isClosable = true;
        this.md.desiredWidth = 400;
        this.md.desiredHeight = 200;
        this.md.showOkButton = true;
        this.md.showCancelButton = true;
        this.md.showYesButton = false;
        this.md.showNoButton = false;
        this.md.okDisabled = true;
        this.showModalDialog = false;
        this.showBuildDialog = false;
        this.showAddDialog = false;
        this.showRemoveDialog = false;
        this.newAngularProject = "";
        setTimeout(function () {
            _this.showModalDialog = true;
            _this.showAddDialog = true;
            setTimeout(function () {
                var angularProjectName = document.querySelector(".angularProjectName");
                angularProjectName.focus();
            }, 0);
        }, 0);
        this.md.dialogButtonCallback = function (buttonClicked) {
            if (buttonClicked === "ok") {
                _this.md.closeDialog();
                var angularProject_1 = new AngularProject();
                angularProject_1.name = _this.newAngularProject;
                var vsp = _.cloneDeep(vsProject);
                vsp.developerSettings.angularProjects.push(angularProject_1);
                _this.ac.showSpinner(true);
                _this.bc.addProject(vsp, function () {
                    _this.ac.showSpinner(false);
                    vsProject.developerSettings.angularProjects.push(angularProject_1);
                    _this.toastr.success("Completed the add successfully!");
                }, function (errorMessage) {
                    _this.toastr.error(errorMessage);
                });
            }
            else
                _this.md.closeDialog();
        };
    };
    AppComponent.prototype.onClickBuild = function (visualProject) {
        var _this = this;
        this.md.modalDialogTitle = "Building: " + visualProject.name;
        this.md.showCancelButton = false;
        this.md.isClosable = false;
        this.md.showOkButton = false;
        this.md.showCancelButton = false;
        this.md.showYesButton = false;
        this.md.showNoButton = false;
        this.md.desiredWidth = 650;
        this.md.desiredHeight = 475;
        this.showModalDialog = false;
        this.showBuildDialog = false;
        this.showAddDialog = false;
        this.showRemoveDialog = false;
        this.md.denyClosing = true;
        setTimeout(function () {
            _this.showModalDialog = true;
            _this.showBuildDialog = true;
            setTimeout(function () {
                _this.bc.buildAngularProjects(visualProject, function () {
                    setTimeout(function () {
                        _this.md.closeDialog();
                        visualProject.showVersion = false;
                        _this.toastr.success("Completed the build successfully!");
                        setTimeout(function () {
                            visualProject.showVersion = true;
                        }, 1000);
                    }, 3000);
                }, function (errorMessage) {
                    _this.toastr.error(errorMessage);
                });
            }, 1000);
        }, 0);
        this.md.dialogButtonCallback = function (buttonClicked) {
            _this.md.closeDialog();
        };
    };
    AppComponent.prototype.isFolderExported = function (visualProject, folder) {
        var selected = "";
        if (_.find(visualProject.developerSettings.libraryExports, function (x) { return (x === folder); }))
            return "selected";
    };
    AppComponent.prototype.onChangeLibraryExport = function (target, selectedLibraries, vsProjectName) {
        var _this = this;
        selectedLibraries.length = 0;
        var libraries = _.filter(target.options, function (x) { return (x.selected); });
        var otherVsProjects = _.filter(this.bc.config.visualProjects, function (x) { return (x.name !== vsProjectName); });
        libraries.forEach(function (library) {
            if (!_this.isExportedAlready(otherVsProjects, library.innerHTML)) {
                selectedLibraries.push(library.innerHTML);
            }
            else
                library.selected = false;
        });
    };
    AppComponent.prototype.isExportedAlready = function (otherVsProjects, library) {
        var _this = this;
        var alreadyExported = false;
        otherVsProjects.forEach(function (vsProject) {
            if (_.find(vsProject.developerSettings.libraryExports, function (x) { return (x === library); })) {
                _this.toastr.error("Library: " + library + " is already exported by Project: " + vsProject.name, "", { tapToDismiss: true, closeButton: true });
                alreadyExported = true;
            }
        });
        return alreadyExported;
    };
    AppComponent.prototype.isProjectBuildProject = function (vsProject) {
        return vsProject.name === "ProjectBuild";
    };
    AppComponent.prototype.openVsProjectPanel = function (vsProject) {
        var _this = this;
        if (vsProject.showPanel) {
            this.bc.getIsExportsUpdated(vsProject, function (isExportsUpdated) { _this.isExportsUpdated = isExportsUpdated; }, function (errorMessage) {
                _this.toastr.error(errorMessage);
            });
        }
    };
    __decorate([
        ViewChild(ModalDialogComponent),
        __metadata("design:type", ModalDialogComponent)
    ], AppComponent.prototype, "md", void 0);
    AppComponent = __decorate([
        Component({
            selector: "app-root",
            templateUrl: "./app.component.html",
            styles: [],
            providers: [AppConfig, BuildConfig]
        }),
        __metadata("design:paramtypes", [AppConfig, BuildConfig, ToastrService, AppServices])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map