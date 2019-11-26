"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var buildModels_1 = require("../library_ng/client-side-models/buildModels");
var BuildDialogData = /** @class */ (function () {
    function BuildDialogData() {
    }
    return BuildDialogData;
}());
exports.BuildDialogData = BuildDialogData;
var DevelopmentBuildDialogComponent = /** @class */ (function () {
    function DevelopmentBuildDialogComponent(data) {
        this.data = data;
        this.buildDialogData = data.buildDialogData;
    }
    DevelopmentBuildDialogComponent = __decorate([
        core_1.Component({
            templateUrl: './development.build.dialog.html'
        }),
        __param(0, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DevelopmentBuildDialogComponent);
    return DevelopmentBuildDialogComponent;
}());
exports.DevelopmentBuildDialogComponent = DevelopmentBuildDialogComponent;
var AddDialogData = /** @class */ (function () {
    function AddDialogData() {
    }
    return AddDialogData;
}());
exports.AddDialogData = AddDialogData;
var DevelopmentAddDialogComponent = /** @class */ (function () {
    function DevelopmentAddDialogComponent(data) {
        this.data = data;
        this.showSpinner = false;
        this.ad = data.addDialogData;
    }
    DevelopmentAddDialogComponent.prototype.onClickAddAngularProject = function () {
        var _this = this;
        if (this.ad.bc.vsProject.developerSettings.angularProjects.find(function (project) { return project.name === _this.ad.projectName; })) {
            this.ad.ac.toastrError('A project with that name already exists! Please choose a unique project name.');
            return;
        }
        this.showSpinner = true;
        this.ad.bc.angularProject = new buildModels_1.AngularProject();
        this.ad.bc.angularProject.name = this.ad.projectName;
        this.ad.bc.addProject(function () {
            _this.ad.ac.toastrSuccess('Completed the add successfully!');
            _this.ad.matDialogRef.close();
        }, function (errorMessage) {
            _this.ad.ac.toastrError(errorMessage);
        }, function () {
            _this.showSpinner = false;
        });
    };
    DevelopmentAddDialogComponent = __decorate([
        core_1.Component({
            templateUrl: './development.add.dialog.html'
        }),
        __param(0, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DevelopmentAddDialogComponent);
    return DevelopmentAddDialogComponent;
}());
exports.DevelopmentAddDialogComponent = DevelopmentAddDialogComponent;
var RemoveDialogData = /** @class */ (function () {
    function RemoveDialogData() {
    }
    return RemoveDialogData;
}());
exports.RemoveDialogData = RemoveDialogData;
var DevelopmentRemoveDialogComponent = /** @class */ (function () {
    function DevelopmentRemoveDialogComponent(data) {
        this.data = data;
        this.removeDialogData = data.removeDialogData;
    }
    DevelopmentRemoveDialogComponent.prototype.onClickYes = function () {
        var _this = this;
        this.removeDialogData.bc.removeProject(function () {
            _this.removeDialogData.ac.toastrSuccess('Completed the remove successfully!');
            _this.removeDialogData.matDialogRef.close();
        }, function (errorMessage) {
            _this.removeDialogData.ac.toastrError(errorMessage);
        });
    };
    DevelopmentRemoveDialogComponent = __decorate([
        core_1.Component({
            templateUrl: './development.remove.dialog.html'
        }),
        __param(0, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DevelopmentRemoveDialogComponent);
    return DevelopmentRemoveDialogComponent;
}());
exports.DevelopmentRemoveDialogComponent = DevelopmentRemoveDialogComponent;
var DevelopmentComponent = /** @class */ (function () {
    function DevelopmentComponent(bc, ac, dialog, es) {
        this.bc = bc;
        this.ac = ac;
        this.dialog = dialog;
        this.es = es;
        this.isViewVisible = false;
        this.selectedIndex = 1;
        this.savingChanges = false;
        this.buildDialogData = new BuildDialogData();
        this.addDialogData = new AddDialogData();
        this.removeDialogData = new RemoveDialogData();
    }
    DevelopmentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ac.waitUntilInitialized(function () {
            setTimeout(function () {
                _this.getBuildConfig();
            }, 0);
        });
    };
    DevelopmentComponent.prototype.onChangeTab = function (selectedIndex) {
        if (selectedIndex === 2) {
            this.getLogEntries();
        }
    };
    DevelopmentComponent.prototype.getBuildConfig = function () {
        var _this = this;
        this.bc.getBuildConfig(function () {
            _this.isViewVisible = true;
        }, function (errorMessage) {
            _this.isViewVisible = true;
        });
    };
    // project management
    DevelopmentComponent.prototype.onClickDebugRelease = function (vsProject) {
        vsProject.developerSettings.executeDist = true;
    };
    DevelopmentComponent.prototype.willExecuteProject = function (angularProject) {
        if (this.bc.vsProject.developerSettings.serveApp === angularProject.name && !this.bc.vsProject.developerSettings.executeDist) {
            return true;
        }
        else {
            return false;
        }
    };
    DevelopmentComponent.prototype.angularProjectSelected = function (vsProject, angularProject) {
        if (vsProject.developerSettings.serveApp === angularProject.name) {
            return true;
        }
        else {
            return false;
        }
    };
    DevelopmentComponent.prototype.onClickReleaseProject = function (angularProject) {
        this.bc.vsProject.developerSettings.serveApp = angularProject.name;
    };
    DevelopmentComponent.prototype.onClickDebugEnabled = function (angularProject) {
        this.bc.vsProject.developerSettings.executeDist = false;
        this.bc.vsProject.developerSettings.serveApp = angularProject.name;
    };
    DevelopmentComponent.prototype.saveChanges = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.savingChanges) {
                return;
            }
            _this.savingChanges = true;
            _this.bc.saveVisualProject(function () {
                _this.savingChanges = false;
            }, function (errorMessage) {
                _this.ac.toastrError(errorMessage);
                _this.savingChanges = false;
            });
        }, 0);
    };
    DevelopmentComponent.prototype.willExecuteRelease = function (vsProject) {
        if (vsProject.developerSettings.executeDist) {
            return 'checked';
        }
        else {
            return '';
        }
    };
    DevelopmentComponent.prototype.onClickBuild = function () {
        var _this = this;
        this.bc.buildOutput = '';
        this.buildDialogData.title = 'Building: Angular Project(s)';
        this.buildDialogData.bc = this.bc;
        this.buildDialogData.closeDisabled = true;
        this.matDialogRef = this.dialog.open(DevelopmentBuildDialogComponent, {
            width: '675px',
            disableClose: true,
            data: {
                buildDialogData: this.buildDialogData
            }
        });
        this.bc.buildAngularProjects(function (buildVersion) {
            _this.buildDialogData.closeDisabled = false;
            if (buildVersion) {
                _this.buildDialogData.closeDisabled = false;
            }
            _this.ac.toastrSuccess('Successful build!');
        }, function () {
            _this.ac.toastrError('Error while building: ');
            _this.buildDialogData.closeDisabled = false;
        });
    };
    DevelopmentComponent.prototype.onClickAdd = function () {
        this.addDialogData.title = 'Adding: Angular Project';
        this.addDialogData.ac = this.ac;
        this.addDialogData.bc = this.bc;
        this.addDialogData.saveDisabled = false;
        this.addDialogData.projectName = '';
        this.addDialogData.matDialogRef = this.dialog.open(DevelopmentAddDialogComponent, {
            width: '400px',
            disableClose: true,
            data: {
                addDialogData: this.addDialogData,
            }
        });
    };
    DevelopmentComponent.prototype.onClickRemove = function (vsProject, angularProject) {
        this.bc.angularProject = angularProject;
        this.removeDialogData.title = 'Warning! Removing Project: ' + angularProject.name;
        this.removeDialogData.ac = this.ac;
        this.removeDialogData.bc = this.bc;
        this.removeDialogData.message = 'Are you sure that you want to remove the project: ' + angularProject.name + ', and all of its components?';
        this.removeDialogData.projectName = angularProject.name;
        this.removeDialogData.matDialogRef = this.dialog.open(DevelopmentRemoveDialogComponent, {
            width: '400px',
            disableClose: true,
            data: {
                removeDialogData: this.removeDialogData,
            }
        });
    };
    // State Management
    DevelopmentComponent.prototype.onClickSave = function () {
        var _this = this;
        this.es.saveActionsQueue(function (successMessage) {
            _this.ac.toastrInfo(successMessage, -1);
        }, function (errorMessage) {
            _this.ac.toastrError(errorMessage);
        });
    };
    DevelopmentComponent.prototype.onClickLoad = function () {
        var _this = this;
        this.es.loadActionsQueue(function (textMessage) {
            _this.ac.toastrInfo(textMessage, -1);
        }, function (errorMessage) {
            _this.ac.toastrError(errorMessage);
        }, 'actionsQueue003.json');
    };
    // Application Exceptions
    DevelopmentComponent.prototype.getLogEntries = function () {
        var _this = this;
        this.bc.getLogEntries(function () {
            _this.isViewVisible = true;
        }, function (errorMessage) {
            _this.isViewVisible = true;
        });
    };
    DevelopmentComponent.prototype.getEventTypeColor = function (entryType) {
        switch (entryType) {
            case 0: return 'yellow';
            case 1: return 'red';
            case 2: return 'orange';
            case 3: return 'yellow';
            case 4: return 'blue';
        }
        return 'orange';
    };
    DevelopmentComponent.prototype.getIconName = function (entryType) {
        switch (entryType) {
            case 0: return 'missing';
            case 1: return 'error';
            case 2: return 'warning';
            case 3: return 'missing';
            case 4: return 'error_outline';
        }
        return 'orange';
    };
    DevelopmentComponent.prototype.getEventTypeText = function (entryType) {
        switch (entryType) {
            case 0: return 'Missing';
            case 1: return 'Error';
            case 2: return 'Warning';
            case 3: return 'Missing';
            case 4: return 'Information';
        }
        return 'orange';
    };
    DevelopmentComponent.prototype.onClickThrowException = function () {
        var _this = this;
        this.bc.throwException(function () {
        }, function (errorMessage) {
            _this.getLogEntries();
            _this.ac.toastrError(errorMessage);
        });
    };
    DevelopmentComponent.prototype.onClickLogEntry = function () {
        var _this = this;
        this.bc.logEntry(function () {
            _this.getLogEntries();
        }, function (errorMessage) {
            _this.ac.toastrError(errorMessage);
        });
    };
    // Metrics
    DevelopmentComponent.prototype.onClickClearResponseTime = function () {
        this.ac.clearResponseTime();
    };
    DevelopmentComponent = __decorate([
        core_1.Component({
            templateUrl: './development.component.html'
        })
    ], DevelopmentComponent);
    return DevelopmentComponent;
}());
exports.DevelopmentComponent = DevelopmentComponent;
var DevelopmentHelpDialogComponent = /** @class */ (function () {
    function DevelopmentHelpDialogComponent(data) {
        this.data = data;
        // data contains values passed by the router
    }
    DevelopmentHelpDialogComponent = __decorate([
        core_1.Component({
            templateUrl: './development.component.help.html'
        }),
        __param(0, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DevelopmentHelpDialogComponent);
    return DevelopmentHelpDialogComponent;
}());
exports.DevelopmentHelpDialogComponent = DevelopmentHelpDialogComponent;
//# sourceMappingURL=development.component.js.map