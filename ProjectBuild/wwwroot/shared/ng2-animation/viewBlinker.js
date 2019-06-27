import * as tslib_1 from "tslib";
import { Component, Input } from "@angular/core";
import { trigger, state, animate, transition, style } from "@angular/animations";
var ViewBlinker = /** @class */ (function () {
    function ViewBlinker() {
        this.blinking = false;
        this.visibleWhenNotBlinking = false;
        this.visibility = "hidden";
        this.initalized = false;
    }
    ViewBlinker.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.initalized = true;
        }, 500);
    };
    ViewBlinker.prototype.startBlinking = function () {
        var _this = this;
        this.intervalId = setInterval(function () {
            if (!_this.blinking) {
                clearInterval(_this.intervalId);
                return;
            }
            if (_this.visibility === "shown")
                _this.visibility = "hidden";
            else
                _this.visibility = "shown";
        }, 750);
    };
    ViewBlinker.prototype.ngOnChanges = function () {
        if (this.blinking)
            this.startBlinking();
        this.visibility = this.visibleWhenNotBlinking ? "shown" : "hidden";
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ViewBlinker.prototype, "blinking", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ViewBlinker.prototype, "visibleWhenNotBlinking", void 0);
    ViewBlinker = tslib_1.__decorate([
        Component({
            selector: "view-blinker",
            template: "\n    <div [@visibilityChanged]=\"visibility\" [style.visibility]=\"initalized ? 'visible' : 'hidden' \">\n      <ng-content></ng-content>    \n    </div>\n  ",
            animations: [
                trigger("visibilityChanged", [
                    state("shown", style({ opacity: 1 })),
                    state("hidden", style({ opacity: 0 })),
                    transition("* => *", animate(".25s"))
                ])
            ]
        })
    ], ViewBlinker);
    return ViewBlinker;
}());
export { ViewBlinker };
//# sourceMappingURL=viewBlinker.js.map