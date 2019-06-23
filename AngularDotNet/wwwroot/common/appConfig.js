import * as tslib_1 from "tslib";
// #region Imports
import { Injectable, VERSION } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseServices } from "./baseServices";
import { AppSettings } from "../shared/client-side-models/buildModels";
import { AnalyticsData, Performance } from "../shared/client-side-models/analyticsData";
import { ApiVersions } from "../shared/client-side-models/apiVersions";
import * as moment from "moment";
import * as _ from "lodash";
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from "@angular/router";
import { TimingMetrics } from "../shared/analysis/timingmetrics";
// ngxs
import { Store } from '@ngxs/store';
import { GetAppSettings, ServiceSuccess, ServiceError } from '../shared/modules/app.actions';
// #endregion
var AppConfig = /** @class */ (function (_super) {
    tslib_1.__extends(AppConfig, _super);
    function AppConfig(route, snackBar, store, http) {
        var _this = _super.call(this, http) || this;
        _this.route = route;
        _this.snackBar = snackBar;
        _this.store = store;
        _this.http = http;
        _this.appSettings = new AppSettings();
        _this.analyticsData = new AnalyticsData();
        _this.isPhoneSize = false;
        _this.isLandscapeView = false;
        _this.isInitialized = false;
        _this.isSpinnerAvailable = false;
        _this.isSpinnerVisible = false;
        _this.isStandAlone = false;
        _this.isOnline = true;
        _this.apiVersions = new ApiVersions();
        _this.tm = new TimingMetrics("getAppSettings");
        _this.smallWidthBreakpoint = 720;
        _this.headerHeight = 200;
        _this.sideNavWidth = 400;
        _this.mapControlsHeight = 275;
        _this.mapControlsWidth = 300;
        _this.mediaQueryBreak = 1280;
        _this.screenWidth = 0;
        _this.screenHeight = 0;
        _this.store.subscribe(function (state) {
            _this.appState = state.app;
            _this.mobileApisState = state.mobileApis;
        });
        return _this;
    }
    AppConfig.prototype.getRouteData = function () {
        var currentRoute = this.route.root;
        while (currentRoute.children[0] !== undefined) {
            currentRoute = currentRoute.children[0];
        }
        return currentRoute.snapshot.data;
    };
    AppConfig.prototype.getHelpFileHtml = function (helpFile, success) {
        this.http.get(helpFile, { responseType: 'text' }).subscribe(function (html) {
            success(html);
        });
    };
    AppConfig.prototype.showSpinner = function (show) {
        var _this = this;
        if (show) {
            this.isSpinnerAvailable = true;
            setTimeout(function () {
                _this.isSpinnerVisible = true;
            });
        }
        else {
            this.isSpinnerVisible = false;
            setTimeout(function () {
                _this.isSpinnerAvailable = false;
            }, 1000);
        }
    };
    AppConfig.prototype.updateAnalytics = function () {
        this.analyticsData = this.getLocalStorage("analyticsData");
        this.analyticsData.exceptions = _.map(this.analyticsData.exceptions, function (a) {
            a.dateString = moment(a.date).format("YYYY-MM-DD");
            a.timeString = moment(a.date).format("HH:mm:ss");
            return a;
        });
        var totalResponseTime = 0;
        this.analyticsData.performances = _.map(this.analyticsData.performances, function (a) {
            a.dateString = moment(a.date).format("YYYY-MM-DD");
            a.timeString = moment(a.date).format("HH:mm:ss");
            totalResponseTime += a.responseTime;
            return a;
        });
        if (this.analyticsData.performances.length === 0)
            this.analyticsData.averageResponseTime = 0;
        else
            this.analyticsData.averageResponseTime = Math.round(totalResponseTime / this.analyticsData.performances.length);
    };
    AppConfig.prototype.clearExceptions = function () {
        this.analyticsData.exceptions.length = 0;
        this.setLocalStorage("analyticsData", this.analyticsData);
    };
    AppConfig.prototype.clearResponseTime = function () {
        this.analyticsData.performances.length = 0;
        this.analyticsData.averageResponseTime = 0;
        this.setLocalStorage("analyticsData", this.analyticsData);
    };
    AppConfig.prototype.logResonseData = function (responseTime) {
        var analyticsData = this.getLocalStorage("analyticsData");
        if (analyticsData.performances.length > 9) {
            analyticsData.performances.pop();
        }
        var performance = new Performance();
        performance.date = new Date();
        performance.responseTime = responseTime;
        analyticsData.performances.unshift(performance);
        this.setLocalStorage("analyticsData", analyticsData);
    };
    AppConfig.prototype.waitUntilInitialized = function (callback) {
        var _this = this;
        var intervalTimer = setInterval(function () {
            if (_this.isInitialized) {
                clearInterval(intervalTimer);
                callback();
            }
        }, 1000);
    };
    AppConfig.prototype.getAppSettings = function (success, error) {
        var _this = this;
        this.store.dispatch([new GetAppSettings(moment().format("MM/DD/YYYY HH:mm:ss"))]);
        this.apiVersions.angular = VERSION.full;
        this.isStandAlone = window.matchMedia("(display-mode: standalone)").matches;
        this.beginRequest = new Date().getTime();
        try {
            this.tm.setStartMarker();
        }
        catch (e) { }
        this.httpGet("sysInfo", function (appSettings) {
            _this.store.dispatch([new ServiceSuccess("getAppSettings")]);
            _this.logResonseData(new Date().getTime() - _this.beginRequest);
            _this.setLocalStorage("appSettings", appSettings);
            try {
                _this.tm.setEndMarker();
                _this.tm.measureInterval();
            }
            catch (e) { }
            _this.appSettings = appSettings;
            _this.isInitialized = true;
            success();
        }, function (errorMessage) {
            _this.store.dispatch([new ServiceError("getAppSettings")]);
            _this.appSettings = _this.getLocalStorage("appSettings");
            if (!_this.appSettings) {
                _this.appSettings = new AppSettings();
                _this.appSettings.debug = false;
                _this.appSettings.testing = false;
                _this.appSettings.projectVersionNo = "xx.xx.xx";
                _this.appSettings.splashTime = 5000;
            }
            _this.isInitialized = true;
            error(errorMessage);
        });
    };
    AppConfig.prototype.sendTextMessage = function (textMessage, success, error) {
        this.httpPost("comm", "post", textMessage, function () {
            success();
        }, function (errorMessage) {
            error(errorMessage);
            // this error is generated from the service worker, because of a post
        });
    };
    AppConfig.prototype.onResizeApp = function () {
        if (screen.availWidth <= 767)
            this.isPhoneSize = true;
        else
            this.isPhoneSize = false;
        this.onOrientationChange();
        this.screenWidth = this.getScreenWidth();
        this.screenHeight = this.getScreenHeight();
    };
    AppConfig.prototype.onOrientationChange = function () {
        if (screen.availWidth > screen.availHeight)
            this.isLandscapeView = true;
        else
            this.isLandscapeView = false;
    };
    AppConfig.prototype.getScreenWidth = function () {
        if (this.isPhoneSize)
            return screen.availWidth;
        else
            return document.body.clientWidth;
    };
    AppConfig.prototype.getScreenHeight = function () {
        if (this.isPhoneSize)
            return screen.availHeight;
        else
            return document.body.clientHeight;
    };
    AppConfig.prototype.toastrSuccess = function (message) {
        this.snackBar.open(message, "X", {
            duration: 3000,
            panelClass: ["snackbar-success"]
        });
    };
    AppConfig.prototype.toastrError = function (message) {
        this.snackBar.open(message, "X", {
            duration: -1,
            panelClass: ["snackbar-error"]
        });
    };
    AppConfig.prototype.toastrWarning = function (message) {
        this.snackBar.open(message, "X", {
            duration: 3000,
            panelClass: ["snackbar-warning"]
        });
    };
    AppConfig.prototype.toastrInfo = function (message) {
        this.snackBar.open(message, "X", {
            duration: 3000,
            panelClass: ["snackbar-info"]
        });
    };
    AppConfig = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, MatSnackBar, Store, HttpClient])
    ], AppConfig);
    return AppConfig;
}(BaseServices));
export { AppConfig };
//# sourceMappingURL=appConfig.js.map