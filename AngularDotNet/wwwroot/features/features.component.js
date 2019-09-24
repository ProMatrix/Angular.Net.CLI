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
    FeaturesComponent = __decorate([
        core_1.Component({
            // #region template
            templateUrl: './features.component.html'
            // #endregion
        })
    ], FeaturesComponent);
    return FeaturesComponent;
}());
exports.FeaturesComponent = FeaturesComponent;
var FeaturesHelpDialogComponent = /** @class */ (function () {
    function FeaturesHelpDialogComponent(data) {
        this.data = data;
        // data contains values passed by the router
    }
    FeaturesHelpDialogComponent = __decorate([
        core_1.Component({
            templateUrl: './features.component.help.html'
        }),
        __param(0, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], FeaturesHelpDialogComponent);
    return FeaturesHelpDialogComponent;
}());
exports.FeaturesHelpDialogComponent = FeaturesHelpDialogComponent;
//# sourceMappingURL=features.component.js.map