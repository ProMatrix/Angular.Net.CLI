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
var file_transfer_dialog_1 = require("../shared/enterprise/file.transfer.dialog");
var entityService_1 = require("../common/entityService");
var httpDemo_component_state_1 = require("./httpDemo.component.state");
var httpDemo_component_actions_1 = require("./httpDemo.component.actions");
var HttpDemoComponent = /** @class */ (function () {
    function HttpDemoComponent(store, ac, es, dialog) {
        this.store = store;
        this.ac = ac;
        this.es = es;
        this.dialog = dialog;
        this.isViewVisible = false;
        this.httpDemoState = new httpDemo_component_state_1.HttpDemoStateModel();
        this.stateChanges();
    }
    HttpDemoComponent.prototype.stateChanges = function () {
        var _this = this;
        this.store.subscribe(function (state) {
            if (state.sideNav) {
                var httpDemoState = state.httpDemo;
                _this.httpDemoState = httpDemoState;
                // RequestHttpDownload
                if (httpDemoState.requestHttpDownload) {
                    _this.downloadTextFile();
                }
                // ResponseHttpDownload - patchState only
            }
        });
    };
    HttpDemoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ac.waitUntilInitialized(function () {
            setTimeout(function () {
                _this.isViewVisible = true;
            }, 0);
        });
    };
    //#region Http Get
    HttpDemoComponent.prototype.getAll = function () {
        var _this = this;
        this.es.getAll(function (library) {
            _this.ac.toastrInfo('Successfully completed GetAll!', -1);
        }, function (errorMessage) {
            _this.ac.toastrError(errorMessage);
        });
    };
    HttpDemoComponent.prototype.getFromId = function () {
        var _this = this;
        this.es.getFromId(function (textMessage) {
            _this.ac.toastrInfo(textMessage, -1);
        }, function (errorMessage) {
            _this.ac.toastrError(errorMessage);
        }, 'tsserver.txt');
    };
    HttpDemoComponent.prototype.getWithProgress = function () {
        var _this = this;
        this.es.getWithProgress(function (successMessage) {
            _this.ac.toastrInfo(successMessage, -1);
        }, function (errorMessage) {
            _this.ac.toastrError(errorMessage);
        }, 'tsserver.txt', function (event) {
            if (event.loaded < 1024) {
                console.log("Get in progress! " + event.loaded + " bytes loaded");
            }
            else {
                var kbDownloaded = Math.round(event.loaded / 1024);
                console.log("Get in progress! " + kbDownloaded + "Kb loaded");
            }
        });
    };
    HttpDemoComponent.prototype.onClickDownloadTextFile = function () {
        this.store.dispatch(new httpDemo_component_actions_1.RequestHttpDownload(true));
        this.store.dispatch(new httpDemo_component_actions_1.RequestHttpDownload(false));
    };
    HttpDemoComponent.prototype.downloadTextFile = function () {
        var _this = this;
        var fileName = 'simple.txt';
        this.es.downloadFile(function (fileBlob) {
            _this.es.saveFile(fileBlob, fileName);
            // this.store.dispatch(new ResponseHttpDownload(fileBlob, true));
            _this.ac.toastrInfo('Successfully downloaded: ' + fileName, -1);
        }, function (errorMessage) {
            _this.ac.toastrError(errorMessage);
        }, fileName);
    };
    HttpDemoComponent.prototype.downloadPdfFile = function () {
        var _this = this;
        var fileName = 'proASPNetCoreMVC.pdf';
        this.es.downloadFile(function (fileBlob) {
            _this.es.saveFile(fileBlob, fileName);
            _this.ac.toastrInfo('Successfully downloaded: ' + fileName, -1);
        }, function (errorMessage) {
            _this.ac.toastrError(errorMessage);
        }, fileName);
    };
    HttpDemoComponent.prototype.downloadPdfWithProgress = function () {
        var _this = this;
        var dialogConfig = { width: '450px', disableClose: true };
        dialogConfig.data = {
            id: 1,
            title: 'Download: ProASPNetCoreMVC.pdf',
            description: 'Download Progress (click Cancel to discontinue)',
            bytesTransfered: 0,
            totalBytes: 0,
            cancel: false
        };
        var matDialogRef = this.dialog.open(file_transfer_dialog_1.FileTransferDialogComponent, dialogConfig);
        this.es.downloadWithProgress(function () {
            setTimeout(function () { matDialogRef.close(); }, 1000);
        }, function (errorMessage) {
            if (!dialogConfig.data.cancel) {
                matDialogRef.close();
                setTimeout(function () {
                    _this.ac.toastrError(errorMessage);
                }, 500);
                return true;
            }
        }, 'ProASPNetCoreMVC.pdf', function (event) {
            dialogConfig.data.bytesTransfered = Math.round(event.loaded / 1000);
            dialogConfig.data.totalBytes = Math.round(event.total / 1000);
            dialogConfig.data.percentComplete = 100 / (event.total / event.loaded);
            if (dialogConfig.data.cancel) {
                matDialogRef.close();
                return true;
            }
        });
    };
    HttpDemoComponent.prototype.dowloadJson = function () {
        var _this = this;
        this.es.getAll(function (library) {
            var stringVal = JSON.stringify(library, null, 2);
            var fileBlob = new Blob([stringVal], { type: 'text/plain' });
            // manually move this file to the assests folder to be used with getJson
            _this.es.saveFile(fileBlob, 'library.json');
            _this.ac.toastrInfo('Successfully completed saving Json!', -1);
        }, function (errorMessage) {
            _this.ac.toastrError(errorMessage);
        });
    };
    HttpDemoComponent.prototype.getJson = function () {
        var _this = this;
        this.es.getAllLocally(function (library) {
            _this.ac.toastrInfo('Successfully completed locally getting Json!', -1);
        }, function (errorMessage) {
            _this.ac.toastrError(errorMessage);
        });
    };
    //#endregion
    //#region Http Post
    HttpDemoComponent.prototype.postEntity = function () {
        var _this = this;
        this.es.postEntity(function (successMessage) {
            _this.ac.toastrInfo(successMessage, -1);
        }, function (errorMessage) {
            _this.ac.toastrError(errorMessage);
        });
    };
    HttpDemoComponent.prototype.postCollection = function () {
        var _this = this;
        this.es.postCollection(function (successMessage) {
            _this.ac.toastrInfo(successMessage, -1);
        }, function (errorMessage) {
            _this.ac.toastrError(errorMessage);
        });
    };
    HttpDemoComponent.prototype.postCollectionWithProgess = function () {
        var _this = this;
        this.es.postCollectionWithProgess(function (successMessage) {
            _this.ac.toastrInfo(successMessage, -1);
        }, function (errorMessage) {
            _this.ac.toastrError(errorMessage);
        }, function (event) {
            if (event.loaded < 1024) {
                console.log("Post in progress! " + event.loaded + " bytes loaded");
            }
            else {
                var kbUploaded = Math.round(event.loaded / 1024);
                console.log("Post in progress! " + kbUploaded + "Kb loaded");
            }
        });
    };
    HttpDemoComponent.prototype.uploadFiles = function (element, files) {
        var _this = this;
        this.es.uploadFile(files, function (successMessage) {
            element.value = null;
            _this.ac.toastrInfo(successMessage, -1);
        }, function (errorMessage) {
            element.value = null;
            _this.ac.toastrError(errorMessage);
        }, function (event) {
            if (event.loaded < 1024) {
                console.log("Post in progress! " + event.loaded + " bytes loaded");
            }
            else {
                var kbUploaded = Math.round(event.loaded / 1024);
                console.log("Post in progress! " + kbUploaded + "Kb loaded");
            }
        });
    };
    HttpDemoComponent.prototype.uploadWithProgress = function (element, files) {
        var _this = this;
        var dialogConfig = { width: '450px', disableClose: true };
        dialogConfig.data = {
            id: 1,
            title: 'Upload: Choose any file to upload',
            description: 'Upload Progress (click Cancel to discontinue)',
            bytesTransfered: 0,
            totalBytes: 0,
            cancel: false
        };
        var matDialogRef = this.dialog.open(file_transfer_dialog_1.FileTransferDialogComponent, dialogConfig);
        this.es.uploadFileWithProgess(files, function () {
            setTimeout(function () {
                matDialogRef.close();
                element.value = null;
            }, 1000);
        }, function (errorMessage) {
            element.value = null;
            if (!dialogConfig.data.cancel) {
                matDialogRef.close();
                setTimeout(function () {
                    _this.ac.toastrError(errorMessage);
                }, 500);
                return true;
            }
        }, function (event) {
            dialogConfig.data.bytesTransfered = Math.round(event.loaded / 1000);
            dialogConfig.data.totalBytes = Math.round(event.total / 1000);
            dialogConfig.data.percentComplete = 100 / (event.total / event.loaded);
            if (dialogConfig.data.cancel) {
                matDialogRef.close();
                element.value = null;
                return true;
            }
        });
    };
    //#endregion
    //#region Http Delete
    HttpDemoComponent.prototype.deleteEntity = function () {
        var _this = this;
        this.es.deleteEntity(function (successMessage) {
            _this.ac.toastrInfo(successMessage, -1);
        }, function (errorMessage) {
            _this.ac.toastrError(errorMessage);
        }, '1492');
    };
    HttpDemoComponent = __decorate([
        core_1.Component({
            // #region template
            templateUrl: './httpDemo.component.html',
            providers: [entityService_1.EntityService]
            // #endregion
        })
    ], HttpDemoComponent);
    return HttpDemoComponent;
}());
exports.HttpDemoComponent = HttpDemoComponent;
var HttpDemoHelpDialogComponent = /** @class */ (function () {
    function HttpDemoHelpDialogComponent(data) {
        this.data = data;
        // data contains values passed by the router
    }
    HttpDemoHelpDialogComponent = __decorate([
        core_1.Component({
            templateUrl: './httpDemo.component.help.html'
        }),
        __param(0, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], HttpDemoHelpDialogComponent);
    return HttpDemoHelpDialogComponent;
}());
exports.HttpDemoHelpDialogComponent = HttpDemoHelpDialogComponent;
//# sourceMappingURL=httpDemo.component.js.map