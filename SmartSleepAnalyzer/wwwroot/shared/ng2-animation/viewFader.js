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
    __decorate([
        core_1.Input()
    ], ViewFader.prototype, "isViewVisible", void 0);
    ViewFader = __decorate([
        core_1.Component({
            selector: "view-fader",
            template: "\n    <div [@visibilityChanged]=\"visibility\" [style.visibility]=\"initalized ? 'visible' : 'hidden' \">\n      <ng-content></ng-content>    \n    </div>\n  ",
            animations: [
                animations_1.trigger("visibilityChanged", [
                    animations_1.state("shown", animations_1.style({ opacity: 1 })),
                    animations_1.state("hidden", animations_1.style({ opacity: 0 })),
                    animations_1.transition("* => *", animations_1.animate(".5s"))
                ])
            ]
        })
    ], ViewFader);
    return ViewFader;
}());
exports.ViewFader = ViewFader;
//# sourceMappingURL=viewFader.js.map