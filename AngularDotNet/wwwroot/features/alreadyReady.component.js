import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
// services
import { AppConfig } from "../common/appConfig";
import { TimingMetrics } from "../shared/analysis/timingmetrics";
var AlreadyReadyComponent = /** @class */ (function () {
    function AlreadyReadyComponent(ac) {
        this.ac = ac;
        this.isViewVisible = false;
        this.timerId = null;
        this.snapshotTaken = false;
        this.tm = new TimingMetrics("AlreadyReady");
    }
    AlreadyReadyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tm.setStartMarker();
        this.ac.waitUntilInitialized(function () {
            setTimeout(function () {
                _this.isViewVisible = true;
            }, 0);
        });
    };
    AlreadyReadyComponent.prototype.ngAfterViewChecked = function () {
        if (this.isViewVisible) {
            this.tm.setEndMarker();
            this.tm.measureInterval();
        }
    };
    AlreadyReadyComponent = tslib_1.__decorate([
        Component({
            // #region template
            templateUrl: "./alreadyReady.component.html"
            // #endregion
        }),
        tslib_1.__metadata("design:paramtypes", [AppConfig])
    ], AlreadyReadyComponent);
    return AlreadyReadyComponent;
}());
export { AlreadyReadyComponent };
//# sourceMappingURL=alreadyReady.component.js.map