"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// services
var appConfig_1 = require("../../../../common/appConfig");
var AppComponent = /** @class */ (function () {
    function AppComponent(route, router, ac) {
        this.route = route;
        this.router = router;
        this.ac = ac;
        this.appTitle = 'ExpressNpm Integration';
        this.showOpeningTitle = true;
        this.showMobileApiView = false;
        this.appLoaded = false;
        this.appHref = window.location.href;
    }
    AppComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.ac.onResizeApp();
        this.ac.onOrientationChange();
        window.addEventListener('offline', function (event) {
            _this.ac.toastrInfo('The application just went offline!');
            _this.ac.isOnline = false;
        }, false);
        window.addEventListener('online', function (event) {
            _this.ac.toastrInfo('The application is back online!');
            _this.ac.isOnline = true;
        }, false);
        window.addEventListener('resize', function (event) {
            if (_this.resizeTimerId) {
                return;
            }
            _this.resizeTimerId = setTimeout(function () {
                _this.ac.onResizeApp();
                _this.resizeTimerId = null;
            }, 500);
        }, false);
        window.addEventListener('orientationchange', function (event) {
            setTimeout(function () {
                _this.ac.onOrientationChange();
            });
        }, false);
        this.ac.getAppSettings(function () {
            _this.checkForUpdates();
            _this.navigateForward();
        }, function (errorMessage) {
            _this.navigateForward();
        });
    };
    AppComponent.prototype.checkForUpdates = function () {
        var _this = this;
        setTimeout(function () {
            var versionNumber = _this.ac.getLocalStorage('versionNumber');
            if (versionNumber && versionNumber.vn !== _this.ac.appSettings.buildVersion && !_this.ac.appSettings.debug) {
                _this.ac.setLocalStorage('versionNumber', { vn: _this.ac.appSettings.buildVersion });
                setTimeout(function () {
                    _this.restartApp();
                }, 5000);
            }
            else {
                _this.ac.setLocalStorage('versionNumber', { vn: _this.ac.appSettings.buildVersion });
                setTimeout(function () {
                    if (navigator.onLine) {
                        _this.ac.isOnline = true;
                    }
                    else {
                        _this.ac.isOnline = false;
                    }
                });
            }
        }, 3000);
    };
    AppComponent.prototype.navigateForward = function () {
        var _this = this;
        setTimeout(function () {
            _this.showOpeningTitle = false;
            _this.showMobileApiView = true;
            _this.router.navigate(['/expressNpm']);
        }, 2000); // navigate away from splash view
    };
    AppComponent.prototype.restartApp = function () {
        window.location.href = this.appHref;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css'],
            providers: [appConfig_1.AppConfig]
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map