import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
var BaseHelpDialog = /** @class */ (function () {
    function BaseHelpDialog(data) {
        this.data = data;
        // data contains values passed by the router
    }
    BaseHelpDialog = tslib_1.__decorate([
        Component({
            selector: "base-help-dialog",
            templateUrl: "./base.help.dialog.html"
        }),
        tslib_1.__param(0, Inject(MAT_DIALOG_DATA)),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], BaseHelpDialog);
    return BaseHelpDialog;
}());
export { BaseHelpDialog };
//# sourceMappingURL=base.help.dialog.js.map