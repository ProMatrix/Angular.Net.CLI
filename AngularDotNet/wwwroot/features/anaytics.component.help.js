import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
var AnalyticsHelpDialog = /** @class */ (function () {
    function AnalyticsHelpDialog(data) {
        this.data = data;
        // data contains values passed by the router
    }
    AnalyticsHelpDialog = tslib_1.__decorate([
        Component({
            templateUrl: "./analytics.component.help.html"
        }),
        tslib_1.__param(0, Inject(MAT_DIALOG_DATA)),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], AnalyticsHelpDialog);
    return AnalyticsHelpDialog;
}());
export { AnalyticsHelpDialog };
//# sourceMappingURL=anaytics.component.help.js.map