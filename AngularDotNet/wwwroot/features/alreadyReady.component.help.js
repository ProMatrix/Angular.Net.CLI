import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
var AlreadyReadyHelpDialog = /** @class */ (function () {
    function AlreadyReadyHelpDialog(data) {
        this.data = data;
        // data contains values passed by the router
    }
    AlreadyReadyHelpDialog = tslib_1.__decorate([
        Component({
            templateUrl: "./alreadyReady.component.help.html"
        }),
        tslib_1.__param(0, Inject(MAT_DIALOG_DATA)),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], AlreadyReadyHelpDialog);
    return AlreadyReadyHelpDialog;
}());
export { AlreadyReadyHelpDialog };
//# sourceMappingURL=alreadyReady.component.help.js.map