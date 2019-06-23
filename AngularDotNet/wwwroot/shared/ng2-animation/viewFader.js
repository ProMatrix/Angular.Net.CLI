import * as tslib_1 from "tslib";
import { Component, Input } from "@angular/core";
import { trigger, state, animate, transition, style } from "@angular/animations";
var ViewFader = /** @class */ (function () {
    function ViewFader() {
        this.isViewVisible = false;
        this.visibility = "hidden";
        this.initalized = false;
    }
    ViewFader.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.initalized = true;
            if (_this.isViewVisible)
                _this.visibility = "shown";
            else
                _this.visibility = "hidden";
        }, 500);
    };
    ViewFader.prototype.ngOnChanges = function () {
        if (!this.initalized)
            return;
        this.visibility = this.isViewVisible ? "shown" : "hidden";
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ViewFader.prototype, "isViewVisible", void 0);
    ViewFader = tslib_1.__decorate([
        Component({
            selector: "view-fader",
            template: "\n    <div [@visibilityChanged]=\"visibility\" [style.visibility]=\"initalized ? 'visible' : 'hidden' \">\n      <ng-content></ng-content>    \n    </div>\n  ",
            animations: [
                trigger("visibilityChanged", [
                    state("shown", style({ opacity: 1 })),
                    state("hidden", style({ opacity: 0 })),
                    transition("* => *", animate(".5s"))
                ])
            ]
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], ViewFader);
    return ViewFader;
}());
export { ViewFader };
//# sourceMappingURL=viewFader.js.map