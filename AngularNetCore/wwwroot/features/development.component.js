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
var DevelopmentComponent = /** @class */ (function () {
    function DevelopmentComponent(ac, es) {
        this.ac = ac;
        this.es = es;
        this.isViewVisible = false;
        this.selectedIndex = 1;
    }
    DevelopmentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ac.waitUntilInitialized(function () {
            setTimeout(function () {
                _this.isViewVisible = true;
            }, 0);
        });
    };
    DevelopmentComponent.prototype.ngAfterViewChecked = function () { };
    DevelopmentComponent.prototype.onClickSave = function () {
        var _this = this;
        this.es.saveActionsQueue(function (successMessage) {
            _this.ac.toastrInfo(successMessage, -1);
        }, function (errorMessage) {
            _this.ac.toastrError(errorMessage);
        });
    };
    DevelopmentComponent.prototype.onClickLoad = function () {
        var _this = this;
        this.es.loadActionsQueue(function (textMessage) {
            _this.ac.toastrInfo(textMessage, -1);
        }, function (errorMessage) {
            _this.ac.toastrError(errorMessage);
        }, 'actionsQueue003.json');
    };
    DevelopmentComponent = __decorate([
        core_1.Component({
            // #region template
            templateUrl: './development.component.html'
            // #endregion
        })
    ], DevelopmentComponent);
    return DevelopmentComponent;
}());
exports.DevelopmentComponent = DevelopmentComponent;
var DevelopmentHelpDialogComponent = /** @class */ (function () {
    function DevelopmentHelpDialogComponent(data) {
        this.data = data;
        // data contains values passed by the router
    }
    DevelopmentHelpDialogComponent = __decorate([
        core_1.Component({
            templateUrl: './development.component.help.html'
        }),
        __param(0, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DevelopmentHelpDialogComponent);
    return DevelopmentHelpDialogComponent;
}());
exports.DevelopmentHelpDialogComponent = DevelopmentHelpDialogComponent;
//# sourceMappingURL=development.component.js.map