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
var ExpressNpmComponent = /** @class */ (function () {
    function ExpressNpmComponent(ac) {
        this.ac = ac;
        this.isViewVisible = false;
        this.timerId = null;
    }
    ExpressNpmComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ac.waitUntilInitialized(function () {
            setTimeout(function () {
                _this.isViewVisible = true;
            }, 0);
        });
    };
    ExpressNpmComponent.prototype.ngAfterViewChecked = function () {
    };
    ExpressNpmComponent = __decorate([
        core_1.Component({
            // #region template
            templateUrl: './expressNpm.component.html'
            // #endregion
        })
    ], ExpressNpmComponent);
    return ExpressNpmComponent;
}());
exports.ExpressNpmComponent = ExpressNpmComponent;
var ExpressNpmHelpDialogComponent = /** @class */ (function () {
    function ExpressNpmHelpDialogComponent(data) {
        this.data = data;
        // data contains values passed by the router
    }
    ExpressNpmHelpDialogComponent = __decorate([
        core_1.Component({
            templateUrl: './expressNpm.component.help.html'
        }),
        __param(0, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], ExpressNpmHelpDialogComponent);
    return ExpressNpmHelpDialogComponent;
}());
exports.ExpressNpmHelpDialogComponent = ExpressNpmHelpDialogComponent;
//# sourceMappingURL=expressNpm.component.js.map