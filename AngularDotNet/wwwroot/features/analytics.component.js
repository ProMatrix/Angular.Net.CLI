import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
// services
import { AppConfig } from "../common/appConfig";
var AnalyticsComponent = /** @class */ (function () {
    function AnalyticsComponent(ac) {
        this.ac = ac;
        this.isViewVisible = false;
    }
    AnalyticsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ac.waitUntilInitialized(function () {
            _this.isViewVisible = true;
            _this.ac.updateAnalytics();
        });
    };
    AnalyticsComponent.prototype.onClickClearErrors = function () {
        this.ac.clearExceptions();
    };
    AnalyticsComponent.prototype.onClickClearResponseTime = function () {
        this.ac.clearResponseTime();
    };
    AnalyticsComponent = tslib_1.__decorate([
        Component({
            // #region template
            templateUrl: "./analytics.component.html"
            // #endregion
        }),
        tslib_1.__metadata("design:paramtypes", [AppConfig])
    ], AnalyticsComponent);
    return AnalyticsComponent;
}());
export { AnalyticsComponent };
//# sourceMappingURL=analytics.component.js.map