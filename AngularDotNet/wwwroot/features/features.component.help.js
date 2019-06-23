import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
var FeaturesHelpDialog = /** @class */ (function () {
    function FeaturesHelpDialog(data) {
        this.data = data;
        // data contains values passed by the router
    }
    FeaturesHelpDialog = tslib_1.__decorate([
        Component({
            templateUrl: "./features.component.help.html"
        }),
        tslib_1.__param(0, Inject(MAT_DIALOG_DATA)),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], FeaturesHelpDialog);
    return FeaturesHelpDialog;
}());
export { FeaturesHelpDialog };
//# sourceMappingURL=features.component.help.js.map