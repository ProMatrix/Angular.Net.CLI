"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// #region Imports
var core_1 = require("@angular/core");
var apiService_1 = require("./apiService");
var ngx_modeling_1 = require("ngx-modeling");
var moment = require("moment");
var environment_1 = require("../src/environments/environment");
// #endregion
var AppConfig = /** @class */ (function (_super) {
    __extends(AppConfig, _super);
    function AppConfig(route, snackBar, store, http) {
        var _this = _super.call(this, http, store) || this;
        _this.route = route;
        _this.snackBar = snackBar;
        _this.store = store;
        _this.http = http;
        _this.appSettings = new ngx_modeling_1.AppSettings();
        _this.settingsAvailable = false;
        _this.analyticsData = new ngx_modeling_1.AnalyticsData();
        _this.isPhoneSize = false;
        _this.isLandscapeView = false;
        _this.isInitialized = false;
        _this.isSpinnerAvailable = false;
        _this.isSpinnerVisible = false;
        _this.isStandAlone = false;
        _this.isOnline = true;
        _this.screenWidth = 0;
        _this.screenHeight = 0;
        _this.smallWidthBreakpoint = 720;
        _this.headerHeight = 200;
        _this.sideNavWidth = 400;
        _this.mapControlsHeight = 275;
        _this.mapControlsWidth = 300;
        _this.mediaQueryBreak = 1280;
        _this.tm = new ngx_modeling_1.TimingMetrics('getAppSettings');
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
            }, 0);
        }
        else {
            this.isSpinnerVisible = false;
            setTimeout(function () {
                _this.isSpinnerAvailable = false;
            }, 1000);
        }
    };
    AppConfig.prototype.updateAnalytics = function () {
        var totalResponseTime = 0;
        this.analyticsData.performances = this.analyticsData.performances.map(function (x) {
            x.dateString = moment(x.date).format('YYYY-MM-DD');
            x.timeString = moment(x.date).format('HH:mm:ss');
            totalResponseTime += x.responseTime;
            return x;
        });
        if (this.analyticsData.performances.length === 0) {
            this.analyticsData.averageResponseTime = 0;
        }
        else {
            this.analyticsData.averageResponseTime = Math.round(totalResponseTime / this.analyticsData.performances.length);
        }
        this.setLocalStorage('analyticsData', this.analyticsData);
    };
    AppConfig.prototype.clearResponseTime = function () {
        this.analyticsData.performances.length = 0;
        this.analyticsData.averageResponseTime = 0;
        this.setLocalStorage('analyticsData', this.analyticsData);
    };
    AppConfig.prototype.logResonseData = function (responseTime) {
        if (this.analyticsData.performances.length > 9) {
            this.analyticsData.performances.pop();
        }
        var performance = new ngx_modeling_1.Performance();
        performance.date = new Date();
        performance.responseTime = responseTime;
        this.analyticsData.performances.unshift(performance);
        this.setLocalStorage('analyticsData', this.analyticsData);
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
        this.isStandAlone = window.matchMedia('(display-mode: standalone)').matches;
        try {
            this.tm.setStartMarker();
        }
        catch (e) { }
        this.analyticsData = this.getLocalStorage('analyticsData');
        if (!this.analyticsData) {
            this.analyticsData = new ngx_modeling_1.AnalyticsData();
        }
        this.get(environment_1.environment.api.getSysInfo, function (appSettings) {
            _this.settingsAvailable = true;
            appSettings.apiVersions.angular = core_1.VERSION.full;
            _this.setLocalStorage('appSettings', appSettings);
            try {
                _this.tm.setEndMarker();
                _this.logResonseData(_this.tm.measureInterval());
            }
            catch (e) { }
            _this.updateAnalytics();
            _this.appSettings = appSettings;
            _this.isInitialized = true;
            success();
        }, function (errorMessage) {
            _this.appSettings = _this.getLocalStorage('appSettings');
            if (!_this.appSettings) {
                _this.appSettings = new ngx_modeling_1.AppSettings();
                _this.appSettings.debug = false;
                _this.appSettings.testing = false;
                _this.appSettings.buildVersion = 'xx.xx.xx';
                _this.appSettings.splashTime = 5000;
            }
            _this.isInitialized = true;
            error(errorMessage);
        });
    };
    AppConfig.prototype.sendTextMessage = function (textMessage, success, error) {
        this.post(textMessage, environment_1.environment.api.sendTextMessage, function () {
            success();
        }, function (errorMessage) {
            error(errorMessage);
            // this error is generated from the service worker, because of a post
        });
    };
    AppConfig.prototype.onResizeApp = function () {
        if (screen.availWidth <= 767) {
            this.isPhoneSize = true;
        }
        else {
            this.isPhoneSize = false;
        }
        this.onOrientationChange();
        this.screenWidth = this.getScreenWidth();
        this.screenHeight = this.getScreenHeight();
    };
    AppConfig.prototype.onOrientationChange = function () {
        if (screen.availWidth > screen.availHeight) {
            this.isLandscapeView = true;
        }
        else {
            this.isLandscapeView = false;
        }
    };
    AppConfig.prototype.getScreenWidth = function () {
        if (this.isPhoneSize) {
            return screen.availWidth;
        }
        else {
            return document.body.clientWidth;
        }
    };
    AppConfig.prototype.getScreenHeight = function () {
        if (this.isPhoneSize) {
            return screen.availHeight;
        }
        else {
            return document.body.clientHeight;
        }
    };
    AppConfig.prototype.toastrSuccess = function (message, duration$) {
        if (!duration$) {
            duration$ = 3000;
        }
        this.snackBar.open(message, 'X', {
            duration: duration$,
            panelClass: ['snackbar-success']
        });
    };
    AppConfig.prototype.toastrError = function (message, duration$) {
        if (!duration$) {
            duration$ = -1;
        }
        this.snackBar.open(message, 'X', {
            duration: duration$,
            panelClass: ['snackbar-error']
        });
        setTimeout(function () {
            var toastr = document.querySelector('.mat-snack-bar-container');
            toastr.style.maxWidth = '100%';
        }, 0);
    };
    AppConfig.prototype.toastrWarning = function (message, duration$) {
        if (!duration$) {
            duration$ = 3000;
        }
        this.snackBar.open(message, 'X', {
            duration: duration$,
            panelClass: ['snackbar-warning']
        });
    };
    AppConfig.prototype.toastrInfo = function (message, duration$) {
        if (!duration$) {
            duration$ = 3000;
        }
        this.snackBar.open(message, 'X', {
            duration: duration$,
            panelClass: ['snackbar-info']
        });
    };
    AppConfig = __decorate([
        core_1.Injectable()
    ], AppConfig);
    return AppConfig;
}(apiService_1.ApiService));
exports.AppConfig = AppConfig;
//# sourceMappingURL=appConfig.js.map