import * as tslib_1 from "tslib";
import { Component, NgZone, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import * as moment from "moment";
import { filter } from 'rxjs/operators';
// services
import { AppConfig } from "../../common/appConfig";
import { MessagePump } from "../../common/messagePump";
import { AppServices } from "../../shared/ng2-apphelper/appServices";
var SideNavComponent = /** @class */ (function () {
    function SideNavComponent(route, router, ac, as, zone, cdr) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.ac = ac;
        this.as = as;
        this.zone = zone;
        this.cdr = cdr;
        this.subtitle = "";
        this.mediaMatcher = matchMedia("(max-width: " + this.ac.smallWidthBreakpoint + "px)");
        this.mediaMatcher.addListener(function (mql) {
            return zone.run(function () { return _this.mediaMatcher = matchMedia("(max-width: " + _this.ac.smallWidthBreakpoint + "px)"); });
        });
    }
    SideNavComponent.prototype.ngAfterViewInit = function () {
    };
    SideNavComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.events.pipe(filter(function (event) { return event instanceof NavigationEnd; })).subscribe(function (event) {
            var currentRoute = _this.route.root;
            while (currentRoute.children[0] !== undefined) {
                currentRoute = currentRoute.children[0];
            }
            _this.subtitle = currentRoute.snapshot.data.subtitle;
        });
        this.date = new Date();
        this.theWeekOf = moment().startOf("week").format("ddd MMM D YYYY");
        this.appHref = window.location.origin;
        this.ac.getAppSettings(function () {
            _this.checkForUpdates();
            _this.navigateForward();
        }, function (errorMessage) {
            if (navigator.onLine)
                _this.ac.toastrError(errorMessage);
            else
                _this.ac.toastrWarning("This App is Offline!");
            _this.navigateForward();
        });
    };
    SideNavComponent.prototype.restartApp = function () {
        window.location.href = this.appHref;
    };
    SideNavComponent.prototype.navigateForward = function () {
        var _this = this;
        setTimeout(function () {
            if (window.screen.width <= 768) {
                _this.navigateTo("/mobileApis");
                return;
            }
            var navigateTo = _this.ac.getLocalStorage("navigateTo");
            if (navigateTo)
                _this.navigateTo(navigateTo.feature);
            else
                _this.navigateTo("/splash");
        }, this.ac.appSettings.splashTime); // navigate away from splash view        
    };
    SideNavComponent.prototype.animateTo = function (feature) {
        feature.data.show = false;
        setTimeout(function () {
            feature.data.show = true;
        }, 500);
        this.navigateTo(feature.path);
    };
    SideNavComponent.prototype.navigateTo = function (featurePath) {
        //this.store.dispatch([new NavigateTo(feature)]);
        var _this = this;
        if (featurePath === "restart") {
            this.ac.toastrWarning("Restarting the application now...");
            setTimeout(function () {
                _this.restartApp();
            }, 1000);
            return;
        }
        else {
            this.ac.setLocalStorage("navigateTo", { feature: featurePath });
            this.selectedFeature = featurePath;
            this.router.navigate([featurePath]);
        }
    };
    SideNavComponent.prototype.isScreenSmall = function () {
        return this.mediaMatcher.matches;
    };
    SideNavComponent.prototype.updateVersionAndRestart = function () {
        var _this = this;
        this.ac.setLocalStorage("versionNumber", { vn: this.ac.appSettings.projectVersionNo });
        this.ac.toastrInfo("Updating to latest version! Restarting the application...");
        setTimeout(function () {
            _this.restartApp();
        }, 3000);
    };
    SideNavComponent.prototype.checkForUpdates = function () {
        if (this.ac.appSettings.debug)
            return;
        var versionNumber = this.ac.getLocalStorage("versionNumber");
        if (!versionNumber)
            this.updateVersionAndRestart();
        if (versionNumber.vn !== this.ac.appSettings.projectVersionNo)
            this.updateVersionAndRestart();
        if (navigator.onLine) {
            this.ac.isOnline = true;
            this.ac.toastrSuccess("This application is operating online as normal.");
        }
        else {
            this.ac.isOnline = false;
            this.ac.toastrWarning("This application is operating offline as normal.");
        }
    };
    SideNavComponent = tslib_1.__decorate([
        Component({
            selector: 'app-side-nav',
            templateUrl: "./side-nav.component.html",
            providers: [AppConfig, AppServices, MessagePump]
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, Router, AppConfig, AppServices, NgZone, ChangeDetectorRef])
    ], SideNavComponent);
    return SideNavComponent;
}());
export { SideNavComponent };
//# sourceMappingURL=side-nav.component.js.map