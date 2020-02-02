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
var NewbeeComponent = /** @class */ (function () {
    function NewbeeComponent(ac) {
        this.ac = ac;
        this.isViewVisible = false;
        this.timerId = null;
    }
    NewbeeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ac.waitUntilInitialized(function () {
            setTimeout(function () {
                _this.isViewVisible = true;
            }, 0);
        });
    };
    NewbeeComponent.prototype.ngAfterViewChecked = function () {
    };
    NewbeeComponent.prototype.onClickDebug = function () {
        debugger;
    };
    NewbeeComponent = __decorate([
        core_1.Component({
            // #region template
            templateUrl: './newbee.component.html'
            // #endregion
        })
    ], NewbeeComponent);
    return NewbeeComponent;
}());
exports.NewbeeComponent = NewbeeComponent;
var NewbeeHelpDialogComponent = /** @class */ (function () {
    function NewbeeHelpDialogComponent(data) {
        this.data = data;
        // data contains values passed by the router
    }
    NewbeeHelpDialogComponent = __decorate([
        core_1.Component({
            templateUrl: './newbee.component.help.html'
        }),
        __param(0, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], NewbeeHelpDialogComponent);
    return NewbeeHelpDialogComponent;
}());
exports.NewbeeHelpDialogComponent = NewbeeHelpDialogComponent;
//# sourceMappingURL=newbee.component.js.map