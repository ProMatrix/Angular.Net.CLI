// #region Imports
import { Injectable, VERSION } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseServices } from "./baseServices";
import { TextMessage, AppSettings } from "../shared/client-side-models/buildModels";
import { AnalyticsData, Performance } from "../shared/client-side-models/analyticsData";
import { ApiVersions } from "../shared/client-side-models/apiVersions";
import * as moment from "moment";
import * as _ from "lodash";
// #endregion
@Injectable()
export class AppConfig extends BaseServices {
    appSettings = new AppSettings();
    analyticsData = new AnalyticsData();
    beginRequest: number;
    isPhoneSize = false;
    isLandscapeView = false;
    isInitialized = false;
    isSpinnerAvailable = false;
    isSpinnerVisible = false;
    isStandAlone = false;
    isOnline = true;
    apiVersions = new ApiVersions();

    constructor(public readonly http: HttpClient) {
        super(http);
    }

    showSpinner(show: boolean) {
        if (show) {
            this.isSpinnerAvailable = true;
            setTimeout(() => {
                this.isSpinnerVisible = true;
            });
        } else {
            this.isSpinnerVisible = false;
            setTimeout(() => {
                this.isSpinnerAvailable = false;
            }, 1000);
        }
    }

    updateAnalytics() {
        this.analyticsData = this.getLocalStorage("analyticsData");
        this.analyticsData.exceptions = _.map(this.analyticsData.exceptions, (a) => {
            a.dateString = moment(a.date).format("YYYY-MM-DD");
            a.timeString = moment(a.date).format("HH:mm:ss");
            return a;
        });

        let totalResponseTime = 0;
        this.analyticsData.performances = _.map(this.analyticsData.performances, (a) => {
            a.dateString = moment(a.date).format("YYYY-MM-DD");
            a.timeString = moment(a.date).format("HH:mm:ss");
            totalResponseTime += a.responseTime;
            return a;
        });
        if (this.analyticsData.performances.length === 0)
            this.analyticsData.averageResponseTime = 0;
        else
            this.analyticsData.averageResponseTime = Math.round(totalResponseTime / this.analyticsData.performances.length);
    }

    clearExceptions() {
        this.analyticsData.exceptions.length = 0;
        this.setLocalStorage("analyticsData", this.analyticsData);
    }

    clearResponseTime() {
        this.analyticsData.performances.length = 0;
        this.analyticsData.averageResponseTime = 0;
        this.setLocalStorage("analyticsData", this.analyticsData);
    }

    private logResonseData(responseTime: number) {
        const analyticsData: AnalyticsData = this.getLocalStorage("analyticsData");

        if (analyticsData.performances.length > 9) {
            analyticsData.performances.pop();
        }
        const performance = new Performance(); performance.date = new Date(); performance.responseTime = responseTime;
        analyticsData.performances.unshift(performance);
        this.setLocalStorage("analyticsData", analyticsData);
    }

    waitUntilInitialized(callback: Function) {
        const intervalTimer = setInterval(() => {
            if (this.isInitialized) {
                clearInterval(intervalTimer);
                callback();
            }
        }, 1000);
    }

    getAppSettings(success: Function, error: Function) {
        this.apiVersions.angular = VERSION.full;
        this.isStandAlone = window.matchMedia("(display-mode: standalone)").matches;
        this.beginRequest = new Date().getTime();
        try {
            performance.mark("BEGIN REQUEST");
        } catch (e) { }
        this.httpGet("sysInfo", "", "", (appSettings: AppSettings) => {
            this.logResonseData(new Date().getTime() - this.beginRequest);
            this.setLocalStorage("appSettings", appSettings);
            try {
                performance.mark("REQUEST ENDED");
            } catch (e) { }
            this.appSettings = appSettings;
            this.isInitialized = true;
            success();
        },
            errorMessage => {
                this.appSettings = this.getLocalStorage("appSettings");
                if (!this.appSettings) {
                    this.appSettings = new AppSettings();
                    this.appSettings.debug = false;
                    this.appSettings.testing = false;
                    this.appSettings.projectVersionNo = "xx.xx.xx";
                    this.appSettings.splashTime = 5000;
                }
                this.isInitialized = true;
                error(errorMessage);
            });
    }

    sendTextMessage(textMessage: TextMessage, success, error) {
        this.httpPost("comm", "post", textMessage,
            () => {
                success();
            },
            errorMessage => {
                error(errorMessage);
                // this error is generated from the service worker, because of a post
            });
    }

    screenWidth = 0;
    screenHeight = 0;
    onResizeApp() {
        if (screen.availWidth <= 767)
            this.isPhoneSize = true;
        else
            this.isPhoneSize = false;
        this.onOrientationChange();
        this.screenWidth = this.getScreenWidth();
        this.screenHeight = this.getScreenHeight();
    }

    onOrientationChange() {
        if (screen.availWidth > screen.availHeight)
            this.isLandscapeView = true;
        else
            this.isLandscapeView = false;
    }

    private getScreenWidth(): number {
        if (this.isPhoneSize)
            return screen.availWidth;
        else
            return document.body.clientWidth;
    }

    private getScreenHeight(): number {
        if (this.isPhoneSize)
            return screen.availHeight;
        else
            return document.body.clientHeight;
    }

}
