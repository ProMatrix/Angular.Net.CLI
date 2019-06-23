import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
// services
import { AppConfig } from "../common/appConfig";
var FeaturesComponent = /** @class */ (function () {
    function FeaturesComponent(ac) {
        this.ac = ac;
        this.isViewVisible = true;
        this.dependencies = Array();
    }
    FeaturesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ac.waitUntilInitialized(function () {
            _this.isViewVisible = true;
        });
    };
    FeaturesComponent = tslib_1.__decorate([
        Component({
            // #region template
            templateUrl: "./features.component.html"
            // #endregion
        }),
        tslib_1.__metadata("design:paramtypes", [AppConfig])
    ], FeaturesComponent);
    return FeaturesComponent;
}());
export { FeaturesComponent };
//# sourceMappingURL=features.component.js.map