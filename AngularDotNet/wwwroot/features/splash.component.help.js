import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
var SplashHelpDialog = /** @class */ (function () {
    function SplashHelpDialog(data) {
        this.data = data;
        // data contains values passed by the router
    }
    SplashHelpDialog = tslib_1.__decorate([
        Component({
            templateUrl: "./splash.component.help.html"
        }),
        tslib_1.__param(0, Inject(MAT_DIALOG_DATA)),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], SplashHelpDialog);
    return SplashHelpDialog;
}());
export { SplashHelpDialog };
//# sourceMappingURL=splash.component.help.js.map