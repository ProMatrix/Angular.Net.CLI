import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
var SettingsHelpDialog = /** @class */ (function () {
    function SettingsHelpDialog(data) {
        this.data = data;
        // data contains values passed by the router
    }
    SettingsHelpDialog = tslib_1.__decorate([
        Component({
            templateUrl: "./settings.component.help.html"
        }),
        tslib_1.__param(0, Inject(MAT_DIALOG_DATA)),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], SettingsHelpDialog);
    return SettingsHelpDialog;
}());
export { SettingsHelpDialog };
//# sourceMappingURL=settings.component.help.js.map