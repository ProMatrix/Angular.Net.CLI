import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
var NotificationHelpDialog = /** @class */ (function () {
    function NotificationHelpDialog(data) {
        this.data = data;
        // data contains values passed by the router
    }
    NotificationHelpDialog = tslib_1.__decorate([
        Component({
            templateUrl: "./notification.component.help.html"
        }),
        tslib_1.__param(0, Inject(MAT_DIALOG_DATA)),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], NotificationHelpDialog);
    return NotificationHelpDialog;
}());
export { NotificationHelpDialog };
//# sourceMappingURL=notification.component.help.js.map