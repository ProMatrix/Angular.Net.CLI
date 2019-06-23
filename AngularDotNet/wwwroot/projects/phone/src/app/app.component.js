import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
// services
import { AppConfig } from "../../../../common/appConfig";
var AppComponent = /** @class */ (function () {
    function AppComponent(route, router, ac) {
        this.route = route;
        this.router = router;
        this.ac = ac;
        this.appTitle = "Angular.Net Application (Phone)";
        this.showOpeningTitle = true;
        this.showMobileApiView = false;
        this.appLoaded = false;
        this.appHref = window.location.href;
    }
    AppComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.ac.onResizeApp();
        this.ac.onOrientationChange();
        window.addEventListener("offline", function (event) {
            _this.ac.toastrInfo("The application just went offline!");
            _this.ac.isOnline = false;
        }, false);
        window.addEventListener("online", function (event) {
            _this.ac.toastrInfo("The application is back online!");
            //this.toastr.info("The application is back online!");
            _this.ac.isOnline = true;
        }, false);
        window.addEventListener("resize", function (event) {
            if (_this.resizeTimerId)
                return;
            _this.resizeTimerId = setTimeout(function () {
                _this.ac.onResizeApp();
                _this.resizeTimerId = null;
            }, 500);
        }, false);
        window.addEventListener("orientationchange", function (event) {
            setTimeout(function () {
                _this.ac.onOrientationChange();
            });
        }, false);
        this.ac.getAppSettings(function () {
            _this.checkForUpdates();
            _this.navigateForward();
        }, function (errorMessage) {
            //this.toastr.warning(this.appTitle + ": is Offline!");
            _this.navigateForward();
        });
    };
    AppComponent.prototype.checkForUpdates = function () {
        var _this = this;
        setTimeout(function () {
            var versionNumber = _this.ac.getLocalStorage("versionNumber");
            if (versionNumber && versionNumber.vn !== _this.ac.appSettings.projectVersionNo && !_this.ac.appSettings.debug) {
                _this.ac.setLocalStorage("versionNumber", { vn: _this.ac.appSettings.projectVersionNo });
                //this.toastr.info("A newer version is available! Restarting the application...");
                setTimeout(function () {
                    _this.restartApp();
                }, 5000);
            }
            else {
                _this.ac.setLocalStorage("versionNumber", { vn: _this.ac.appSettings.projectVersionNo });
                setTimeout(function () {
                    if (navigator.onLine) {
                        _this.ac.isOnline = true;
                        //this.toastr.success("This application is operating online as normal.", "Success!");
                    }
                    else {
                        _this.ac.isOnline = false;
                        //this.toastr.warning("This application is operating offline as normal.", "Warning!");
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
            _this.router.navigate(["/mobileApis"]);
        }, this.ac.appSettings.splashTime); // navigate away from splash view        
    };
    AppComponent.prototype.restartApp = function () {
        window.location.href = this.appHref;
    };
    AppComponent = tslib_1.__decorate([
        Component({
            selector: 'app-root',
            templateUrl: "./app.component.html",
            styleUrls: ["./app.component.css"],
            providers: [AppConfig]
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, Router, AppConfig])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map