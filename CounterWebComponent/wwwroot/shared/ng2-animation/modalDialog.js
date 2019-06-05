"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var ModalDialog = /** @class */ (function () {
    function ModalDialog() {
        this.isClosable = true;
        this.showOkButton = false;
        this.showCancelButton = false;
        this.showYesButton = false;
        this.showNoButton = false;
        this.okDisabled = false;
        this.cancelDisabled = false;
        this.yesDisabled = false;
        this.noDisabled = false;
        this.desiredHeight = 0;
        this.desiredWidth = 0;
        this.dialogHeight = 0;
        this.dialogWidth = 0;
        this.visibleChange = new core_1.EventEmitter();
        this.initalized = false;
    }
    ModalDialog.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.initalized = true;
        }, 500);
    };
    ModalDialog.prototype.ngOnChanges = function () {
        if (!this.initalized)
            return;
        this.dialogWidth = this.desiredWidth;
        this.dialogHeight = this.desiredHeight;
    };
    ModalDialog.prototype.clickedOutsideOfDialog = function () {
        if (this.denyClosing)
            return;
        this.closeDialog();
    };
    ModalDialog.prototype.closeDialog = function () {
        this.isVisible = false;
        this.visibleChange.emit(this.isVisible);
    };
    ModalDialog.prototype.onbuttonClicked = function (buttonClicked) {
        try {
            this.dialogButtonCallback(buttonClicked);
        }
        catch (e) { /* the owner must not have a "dialogButtonClicked()" function */
            // I implemented it this way because using a callback does not preserve the "this" pointer
            this.closeDialog();
        }
    };
    __decorate([
        core_1.Input()
    ], ModalDialog.prototype, "isClosable", void 0);
    __decorate([
        core_1.Input()
    ], ModalDialog.prototype, "isVisible", void 0);
    __decorate([
        core_1.Input()
    ], ModalDialog.prototype, "showOkButton", void 0);
    __decorate([
        core_1.Input()
    ], ModalDialog.prototype, "showCancelButton", void 0);
    __decorate([
        core_1.Input()
    ], ModalDialog.prototype, "showYesButton", void 0);
    __decorate([
        core_1.Input()
    ], ModalDialog.prototype, "showNoButton", void 0);
    __decorate([
        core_1.Input()
    ], ModalDialog.prototype, "okDisabled", void 0);
    __decorate([
        core_1.Input()
    ], ModalDialog.prototype, "cancelDisabled", void 0);
    __decorate([
        core_1.Input()
    ], ModalDialog.prototype, "yesDisabled", void 0);
    __decorate([
        core_1.Input()
    ], ModalDialog.prototype, "noDisabled", void 0);
    __decorate([
        core_1.Input()
    ], ModalDialog.prototype, "modalDialogTitle", void 0);
    __decorate([
        core_1.Input()
    ], ModalDialog.prototype, "desiredHeight", void 0);
    __decorate([
        core_1.Input()
    ], ModalDialog.prototype, "desiredWidth", void 0);
    __decorate([
        core_1.Input()
    ], ModalDialog.prototype, "dialogHeight", void 0);
    __decorate([
        core_1.Input()
    ], ModalDialog.prototype, "dialogWidth", void 0);
    __decorate([
        core_1.Input()
    ], ModalDialog.prototype, "denyClosing", void 0);
    __decorate([
        core_1.Output()
    ], ModalDialog.prototype, "visibleChange", void 0);
    ModalDialog = __decorate([
        core_1.Component({
            selector: "modal-dialog",
            //#region template:
            template: "\n    <div [@modalDialogTrigger] *ngIf=\"isVisible\" class=\"modalDialog\" [style.height.px]=\"dialogHeight\" [style.width.px]=\"dialogWidth\">\n        <div class=\"dialogTitle\">\n            <p>{{modalDialogTitle}}</p>\n        </div>\n        <ng-content></ng-content>\n        <button *ngIf=\"isClosable\" (click)=\"closeDialog()\" aria-label=\"Close\" class=\"dialog__close-btn\">X</button>\n        <div class=\"dialogFooter\" >\n            <hr style=\"margin-left: 20px; margin-bottom: 10px; \" />\n            <button *ngIf=\"showCancelButton\" [disabled]=\"cancelDisabled\" class=\"btn btn-primary\" style=\"float: right; margin-left: 5px; margin-bottom: 10px; width: 75px;\" (click)=\"onbuttonClicked('cancel')\">Cancel</button>\n            <button *ngIf=\"showOkButton\" [disabled]=\"okDisabled\" class=\"btn btn-primary\" style=\"float: right; margin-left: 5px; margin-bottom: 10px; width: 75px;\" (click)=\"onbuttonClicked('ok')\">OK</button>\n            <button *ngIf=\"showNoButton\" [disabled]=\"noDisabled\" class=\"btn btn-primary\" style=\"float: right; margin-left: 5px; margin-bottom: 10px; width: 75px;\" (click)=\"onbuttonClicked('no')\">No</button>\n            <button *ngIf=\"showYesButton\" [disabled]=\"yesDisabled\" class=\"btn btn-primary\" style=\"float: right; margin-left: 5px; margin-bottom: 10px; width: 75px;\" (click)=\"onbuttonClicked('yes')\">Yes</button>\n        </div>\n    </div>\n    <div *ngIf=\"isVisible\" class=\"overlay\" (click)=\"clickedOutsideOfDialog()\"></div>\n    ",
            // #endregion
            //#region styles:
            styles: ["\n    .overlay {\n      position: fixed;\n      top: 0;\n      bottom: 0;\n      left: 0;\n      right: 0;\n      background-color: rgba(0, 0, 0, 0.5);\n      z-index: 999;\n    }\n    .modalDialog {\n      z-index: 1000;\n      position: fixed;\n      right: 0;\n      left: 0;\n      top: 20px;\n      margin-top: 100px;\n      margin-right: auto;\n      margin-left: auto;\n      background-color: #fff;\n      padding: 12px;\n      box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2), 0 13px 19px 2px rgba(0, 0, 0, 0.14), 0 5px 24px 4px rgba(0, 0, 0, 0.12);\n     -ms-border-radius: 5px !important;\n     border-radius: 5px !important;\n    }\n    @media (min-width: 768px) {\n      .modalDialog {\n        top: 40px;\n      }\n    }\n    .dialog__close-btn {\n      border: 0;\n      background: none;\n      color: #2d2d2d;\n      position: absolute;\n      top: 8px;\n      right: 8px;\n      font-size: 1.2em;\n      cursor: pointer;\n    }\n    .dialogTitle {\n      overflow:auto;\n        width: 90%;\n      max-width: 520px;\n        font-size: 16px;\n    }\n    .dialogFooter {\n      overflow:hidden;\n        width: 95%;\n        position: absolute;\n        bottom: 0;\n    }\n    "],
            // #endregion
            animations: [
                animations_1.trigger("modalDialogTrigger", [
                    animations_1.transition("void => *", [
                        animations_1.style({ transform: "scale3d(.3, .3, .3)" }),
                        animations_1.animate(100)
                    ]),
                    animations_1.transition("* => void", [
                        animations_1.animate(100, animations_1.style({ transform: "scale3d(.0, .0, .0)" }))
                    ])
                ])
            ]
        })
    ], ModalDialog);
    return ModalDialog;
}());
exports.ModalDialog = ModalDialog;
//# sourceMappingURL=modalDialog.js.map