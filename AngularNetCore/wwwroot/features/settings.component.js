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
var SettingsComponent = /** @class */ (function () {
    function SettingsComponent(ac) {
        this.ac = ac;
        this.isViewVisible = true;
        this.dependencies = Array();
    }
    SettingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ac.waitUntilInitialized(function () {
            _this.isViewVisible = true;
        });
    };
    SettingsComponent = __decorate([
        core_1.Component({
            // #region template
            templateUrl: './settings.component.html'
            // #endregion
        })
    ], SettingsComponent);
    return SettingsComponent;
}());
exports.SettingsComponent = SettingsComponent;
var SettingsHelpDialogComponent = /** @class */ (function () {
    function SettingsHelpDialogComponent(data) {
        this.data = data;
        // data contains values passed by the router
    }
    SettingsHelpDialogComponent = __decorate([
        core_1.Component({
            templateUrl: './settings.component.help.html'
        }),
        __param(0, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], SettingsHelpDialogComponent);
    return SettingsHelpDialogComponent;
}());
exports.SettingsHelpDialogComponent = SettingsHelpDialogComponent;
//# sourceMappingURL=settings.component.js.map