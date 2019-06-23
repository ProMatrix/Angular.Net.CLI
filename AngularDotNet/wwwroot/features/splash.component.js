import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
// services
import { AppConfig } from "../common/appConfig";
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
        this.image7Visible = false;
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
            if (_this.sequence === 8)
                _this.sequence = 0;
            _this.image0Visible = false;
            _this.image1Visible = false;
            _this.image2Visible = false;
            _this.image3Visible = false;
            _this.image4Visible = false;
            _this.image5Visible = false;
            _this.image6Visible = false;
            _this.image7Visible = false;
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
                case 7:
                    _this.image7Visible = true;
                    break;
            }
            _this.sequence++;
        }, 2000);
    };
    SplashComponent = tslib_1.__decorate([
        Component({
            // #region template
            templateUrl: "./splash.component.html"
            // #endregion
        }),
        tslib_1.__metadata("design:paramtypes", [AppConfig])
    ], SplashComponent);
    return SplashComponent;
}());
export { SplashComponent };
//# sourceMappingURL=splash.component.js.map