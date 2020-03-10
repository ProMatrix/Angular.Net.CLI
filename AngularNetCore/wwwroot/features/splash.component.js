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
var SplashComponent = /** @class */ (function () {
    function SplashComponent(ac) {
        this.ac = ac;
        this.isViewVisible = true;
        this.image0Visible = false;
        this.image1Visible = false;
        this.image2Visible = false;
        this.image3Visible = false;
        this.image4Visible = false;
        this.image5Visible = false;
        this.image6Visible = false;
        this.sequence = 0;
    }
    SplashComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ac.waitUntilInitialized(function () {
            _this.isViewVisible = true;
            _this.switchImages();
        });
    };
    SplashComponent.prototype.switchImages = function () {
        var _this = this;
        setInterval(function () {
            if (_this.sequence === 7) {
                _this.sequence = 0;
            }
            _this.image0Visible = false;
            _this.image1Visible = false;
            _this.image2Visible = false;
            _this.image3Visible = false;
            _this.image4Visible = false;
            _this.image5Visible = false;
            _this.image6Visible = false;
            switch (_this.sequence) {
                case 0:
                    _this.image0Visible = true;
                    break;
                case 1:
                    _this.image1Visible = true;
                    break;
                case 2:
                    _this.image2Visible = true;
                    break;
                case 3:
                    _this.image3Visible = true;
                    break;
                case 4:
                    _this.image4Visible = true;
                    break;
                case 5:
                    _this.image5Visible = true;
                    break;
                case 6:
                    _this.image6Visible = true;
                    break;
            }
            _this.sequence++;
        }, 2000);
    };
    SplashComponent = __decorate([
        core_1.Component({
            // #region template
            templateUrl: './splash.component.html'
            // #endregion
        })
    ], SplashComponent);
    return SplashComponent;
}());
exports.SplashComponent = SplashComponent;
var SplashHelpDialogComponent = /** @class */ (function () {
    function SplashHelpDialogComponent(data) {
        this.data = data;
        // data contains values passed by the router
    }
    SplashHelpDialogComponent = __decorate([
        core_1.Component({
            templateUrl: './splash.component.help.html'
        }),
        __param(0, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], SplashHelpDialogComponent);
    return SplashHelpDialogComponent;
}());
exports.SplashHelpDialogComponent = SplashHelpDialogComponent;
//# sourceMappingURL=splash.component.js.map