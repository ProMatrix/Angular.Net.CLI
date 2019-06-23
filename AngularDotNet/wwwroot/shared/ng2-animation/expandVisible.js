import * as tslib_1 from "tslib";
import { Component, Input } from "@angular/core";
import { trigger, state, animate, transition, style } from "@angular/animations";
var ExpandVisible = /** @class */ (function () {
    function ExpandVisible() {
        this.isVisible = false;
        this.visibility = "hidden";
        this.initalized = false;
    }
    ExpandVisible.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.initalized = true;
        }, 500);
    };
    ExpandVisible.prototype.ngOnChanges = function () {
        this.visibility = this.isVisible ? "shown" : "hidden";
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ExpandVisible.prototype, "isVisible", void 0);
    ExpandVisible = tslib_1.__decorate([
        Component({
            selector: "expand-visible",
            template: "\n    <div [@visibilityChanged]=\"visibility\" [style.visibility]=\"initalized ? 'visible' : 'hidden' \">\n      <ng-content></ng-content>    \n    </div>\n  ",
            animations: [
                trigger("visibilityChanged", [
                    state("shown", style({ opacity: 1, height: "100%", width: "100%" })),
                    state("hidden", style({ opacity: 0, height: "0", width: "0" })),
                    transition("* => *", animate(".5s"))
                ])
            ]
        })
    ], ExpandVisible);
    return ExpandVisible;
}());
export { ExpandVisible };
//# sourceMappingURL=expandVisible.js.map