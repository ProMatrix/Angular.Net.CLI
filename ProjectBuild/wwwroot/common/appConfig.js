var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseServices } from "./baseServices";
import { AppSettings } from "../shared/client-side-models/buildModels";
import { AnalyticsData, Performance } from "../shared/client-side-models/analyticsData";
import * as moment from "moment";
import * as _ from "lodash";
var AppConfig = /** @class */ (function (_super) {
    __extends(AppConfig, _super);
    function AppConfig(http) {
        var _this = _super.call(this, http) || this;
        _this.http = http;
        _this.appSettings = new AppSettings();
        _this.analyticsData = new AnalyticsData();
        _this.isPhoneSize = false;
        _this.isLandscapeView = false;
        _this.isInitialized = false;
        _this.isSpinnerAvailable = false;
        _this.isSpinnerVisible = false;
        _this.screenWidth = 0;
        _this.screenHeight = 0;
        return _this;
    }
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
        this.beginRequest = new Date().getTime();
        try {
            performance.mark("BEGIN REQUEST");
        }
        catch (e) { }
        this.httpGet("sysInfo", "", "", function (appSettings) {
            _this.logResonseData(new Date().getTime() - _this.beginRequest);
            _this.setLocalStorage("appSettings", appSettings);
            try {
                performance.mark("REQUEST ENDED");
            }
            catch (e) { }
            _this.appSettings = appSettings;
            _this.isInitialized = true;
            success();
        }, function (errorMessage) {
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
    AppConfig = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], AppConfig);
    return AppConfig;
}(BaseServices));
export { AppConfig };
//# sourceMappingURL=appConfig.js.map