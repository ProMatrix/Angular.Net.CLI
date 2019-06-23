import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppConfig } from "../../common/appConfig";
var ApplicationAboutDialog = /** @class */ (function () {
    function ApplicationAboutDialog(data, ac) {
        this.data = data;
        this.ac = ac;
    }
    ApplicationAboutDialog = tslib_1.__decorate([
        Component({
            templateUrl: "./toolbar.component.help.html",
            providers: [AppConfig]
        }),
        tslib_1.__param(0, Inject(MAT_DIALOG_DATA)),
        tslib_1.__metadata("design:paramtypes", [Object, AppConfig])
    ], ApplicationAboutDialog);
    return ApplicationAboutDialog;
}());
export { ApplicationAboutDialog };
//# sourceMappingURL=toolbar.component.help.js.map