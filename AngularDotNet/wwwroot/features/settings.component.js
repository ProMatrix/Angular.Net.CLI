import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
// services
import { AppConfig } from "../common/appConfig";
var SettingsComponent = /** @class */ (function () {
    function SettingsComponent(ac) {
        this.ac = ac;
        this.isViewVisible = true;
        this.dependencies = Array();
    }
    SettingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ac.waitUntilInitialized(function () {
            _this.isViewVisible = true;
        });
    };
    SettingsComponent = tslib_1.__decorate([
        Component({
            // #region template
            templateUrl: "./settings.component.html"
            // #endregion
        }),
        tslib_1.__metadata("design:paramtypes", [AppConfig])
    ], SettingsComponent);
    return SettingsComponent;
}());
export { SettingsComponent };
//# sourceMappingURL=settings.component.js.map