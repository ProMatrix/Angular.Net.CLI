"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
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
    __decorate([
        core_1.Input()
    ], ViewBlinker.prototype, "blinking", void 0);
    __decorate([
        core_1.Input()
    ], ViewBlinker.prototype, "visibleWhenNotBlinking", void 0);
    ViewBlinker = __decorate([
        core_1.Component({
            selector: "view-blinker",
            template: "\n    <div [@visibilityChanged]=\"visibility\" [style.visibility]=\"initalized ? 'visible' : 'hidden' \">\n      <ng-content></ng-content>    \n    </div>\n  ",
            animations: [
                animations_1.trigger("visibilityChanged", [
                    animations_1.state("shown", animations_1.style({ opacity: 1 })),
                    animations_1.state("hidden", animations_1.style({ opacity: 0 })),
                    animations_1.transition("* => *", animations_1.animate(".25s"))
                ])
            ]
        })
    ], ViewBlinker);
    return ViewBlinker;
}());
exports.ViewBlinker = ViewBlinker;
//# sourceMappingURL=viewBlinker.js.map