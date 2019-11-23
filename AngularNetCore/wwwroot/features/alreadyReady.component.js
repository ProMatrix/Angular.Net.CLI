"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var timingmetrics_1 = require("../library_ng/enterprise/timingmetrics");
var AlreadyReadyComponent = /** @class */ (function () {
    function AlreadyReadyComponent(ac) {
        this.ac = ac;
        this.isViewVisible = false;
        this.timerId = null;
        this.snapshotTaken = false;
        this.tm = new timingmetrics_1.TimingMetrics('AlreadyReady');
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
    AlreadyReadyComponent = __decorate([
        core_1.Component({
            // #region template
            templateUrl: './alreadyReady.component.html'
            // #endregion
        })
    ], AlreadyReadyComponent);
    return AlreadyReadyComponent;
}());
exports.AlreadyReadyComponent = AlreadyReadyComponent;
var AlreadyReadyHelpDialogComponent = /** @class */ (function () {
    function AlreadyReadyHelpDialogComponent(data) {
        this.data = data;
        // data contains values passed by the router
    }
    AlreadyReadyHelpDialogComponent = __decorate([
        core_1.Component({
            templateUrl: './alreadyReady.component.help.html'
        }),
        __param(0, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], AlreadyReadyHelpDialogComponent);
    return AlreadyReadyHelpDialogComponent;
}());
exports.AlreadyReadyHelpDialogComponent = AlreadyReadyHelpDialogComponent;
//# sourceMappingURL=alreadyReady.component.js.map