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
var FileTransferData = /** @class */ (function () {
    function FileTransferData() {
        this.bytesTransfered = 0;
        this.totalBytes = 0;
        this.percentComplete = 0;
        this.cancel = false;
    }
    return FileTransferData;
}());
exports.FileTransferData = FileTransferData;
var FileTransferDialogComponent = /** @class */ (function () {
    function FileTransferDialogComponent(data, dialogRef) {
        this.data = data;
        this.dialogRef = dialogRef;
    }
    FileTransferDialogComponent.prototype.cancel = function (data) {
        data.cancel = true;
        this.dialogRef.close();
    };
    FileTransferDialogComponent = __decorate([
        core_1.Component({
            templateUrl: './file.transfer.dialog.html',
        }),
        __param(0, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], FileTransferDialogComponent);
    return FileTransferDialogComponent;
}());
exports.FileTransferDialogComponent = FileTransferDialogComponent;
//# sourceMappingURL=file.transfer.dialog.js.map