import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { AppServices } from './appServices';
var AppHelper = /** @class */ (function () {
    function AppHelper() {
    }
    AppHelper_1 = AppHelper;
    AppHelper.forRoot = function () {
        return {
            ngModule: AppHelper_1,
            providers: [AppServices]
        };
    };
    var AppHelper_1;
    AppHelper = AppHelper_1 = tslib_1.__decorate([
        NgModule({
            declarations: [],
            exports: []
        })
    ], AppHelper);
    return AppHelper;
}());
export { AppHelper };
//# sourceMappingURL=appHelper.js.map