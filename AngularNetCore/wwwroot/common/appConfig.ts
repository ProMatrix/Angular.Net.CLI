// #region Imports
import { Injectable, VERSION, setTestabilityGetter } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ApiService } from '../library_ng/enterprise/apiService';
import { TextMessage, AppSettings } from '../library_ng/client-side-models/buildModels';
import { AnalyticsData, Performance } from '../library_ng/client-side-models/analyticsData';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Data } from '@angular/router';
import { TimingMetrics } from '../library_ng/enterprise/timingmetrics';
import { environment } from '../src/environments/environment';
import { NgAction } from '../common/ngAction';

// ngxs
import { Store } from '@ngxs/store';
import { BuildConfiguration, VisualProject, AngularProject, BuildResponse } from '../library_ng/client-side-models/buildModels';

// #endregion
@Injectable()
export class AppConfig extends ApiService {
    appSettings = new AppSettings();
    analyticsData = new AnalyticsData();
    isPhoneSize = false;
    isLandscapeView = false;
    isInitialized = false;
    isSpinnerAvailable = false;
    isSpinnerVisible = false;
    isStandAlone = false;
    isOnline = true;
    screenWidth = 0;
    screenHeight = 0;

    readonly smallWidthBreakpoint = 720;
    readonly headerHeight = 200;
    readonly sideNavWidth = 400;
    readonly mapControlsHeight = 275;
    readonly mapControlsWidth = 300;
    readonly mediaQueryBreak = 1280;
    private tm = new TimingMetrics('getAppSettings');

    constructor(
        private readonly route: ActivatedRoute,
        private snackBar: MatSnackBar,
        public store: Store,
        public http: HttpClient) {
        super(http, store);
    }

    getRouteData(): Data {
        let currentRoute = this.route.root;
        while (currentRoute.children[0] !== undefined) {
            currentRoute = currentRoute.children[0];
        }
        return currentRoute.snapshot.data;
    }

    getHelpFileHtml(helpFile: string, success: (x: string) => void) {
        this.http.get(helpFile, { responseType: 'text' }).subscribe(html => {
            success(html);
        });
    }

    showSpinner(show: boolean) {
        if (show) {
            this.isSpinnerAvailable = true;
            setTimeout(() => {
                this.isSpinnerVisible = true;
            }, 0);
        } else {
            this.isSpinnerVisible = false;
            setTimeout(() => {
                this.isSpinnerAvailable = false;
            }, 1000);
        }
    }

    updateAnalytics() {
        let totalResponseTime = 0;
        this.analyticsData.performances = this.analyticsData.performances.map(x => {
            x.dateString = moment(x.date).format('YYYY-MM-DD');
            x.timeString = moment(x.date).format('HH:mm:ss');
            totalResponseTime += x.responseTime;
            return x;
        });
        if (this.analyticsData.performances.length === 0) {
            this.analyticsData.averageResponseTime = 0;
        } else {
            this.analyticsData.averageResponseTime = Math.round(totalResponseTime / this.analyticsData.performances.length);
        }
        this.setLocalStorage('analyticsData', this.analyticsData);
    }

    clearResponseTime() {
        this.analyticsData.performances.length = 0;
        this.analyticsData.averageResponseTime = 0;
        this.setLocalStorage('analyticsData', this.analyticsData);
    }

    private logResonseData(responseTime: number) {
        if (this.analyticsData.performances.length > 9) {
            this.analyticsData.performances.pop();
        }
        const performance = new Performance(); performance.date = new Date(); performance.responseTime = responseTime;
        this.analyticsData.performances.unshift(performance);
        this.setLocalStorage('analyticsData', this.analyticsData);
    }

    waitUntilInitialized(callback: () => void) {
        const intervalTimer = setInterval(() => {
            if (this.isInitialized) {
                clearInterval(intervalTimer);
                callback();
            }
        }, 1000);
    }

    getAppSettings(success: () => void, error: (x: string) => void) {
        this.isStandAlone = window.matchMedia('(display-mode: standalone)').matches;
        try {
            this.tm.setStartMarker();
        } catch (e) { }

        this.analyticsData = this.getLocalStorage('analyticsData');
        if (!this.analyticsData) {
            this.analyticsData = new AnalyticsData();
        }
        this.get(environment.api.getSysInfo, (appSettings: AppSettings) => {
            appSettings.apiVersions.angular = VERSION.full;
            this.setLocalStorage('appSettings', appSettings);
            try {
                this.tm.setEndMarker();
                this.logResonseData(this.tm.measureInterval());
            } catch (e) { }
            this.updateAnalytics();
            this.appSettings = appSettings;
            this.isInitialized = true;
            success();
        },
            errorMessage => {
                this.appSettings = this.getLocalStorage('appSettings');
                if (!this.appSettings) {
                    this.appSettings = new AppSettings();
                    this.appSettings.debug = false;
                    this.appSettings.testing = false;
                    this.appSettings.buildVersion = 'xx.xx.xx';
                    this.appSettings.splashTime = 5000;
                }
                this.isInitialized = true;
                error(errorMessage);
            });
    }

    sendTextMessage(textMessage: TextMessage, success, error) {
        this.post(textMessage, environment.api.sendTextMessage,
            () => {
                success();
            },
            errorMessage => {
                error(errorMessage);
                // this error is generated from the service worker, because of a post
            });
    }

    onResizeApp() {
        if (screen.availWidth <= 767) {
            this.isPhoneSize = true;
        } else {
            this.isPhoneSize = false;
        }
        this.onOrientationChange();
        this.screenWidth = this.getScreenWidth();
        this.screenHeight = this.getScreenHeight();
    }

    onOrientationChange() {
        if (screen.availWidth > screen.availHeight) {
            this.isLandscapeView = true;
        } else {
            this.isLandscapeView = false;
        }
    }

    private getScreenWidth(): number {
        if (this.isPhoneSize) {
            return screen.availWidth;
        } else {
            return document.body.clientWidth;
        }
    }

    private getScreenHeight(): number {
        if (this.isPhoneSize) {
            return screen.availHeight;
        } else {
            return document.body.clientHeight;
        }
    }

    toastrSuccess(message: string, duration$?: number) {
        if (!duration$) {
            duration$ = 3000;
        }
        this.snackBar.open(message, 'X', {
            duration: duration$,
            panelClass: ['snackbar-success']
        });
    }

    toastrError(message: string, duration$?: number) {
        if (!duration$) {
            duration$ = -1;
        }

        this.snackBar.open(message, 'X', {
            duration: duration$,
            panelClass: ['snackbar-error']
        });
        setTimeout(() => {
            const toastr = document.querySelector('.mat-snack-bar-container') as HTMLElement;
            toastr.style.maxWidth = '100%';
        }, 0);
    }

    toastrWarning(message: string, duration$?: number) {
        if (!duration$) {
            duration$ = 3000;
        }
        this.snackBar.open(message, 'X', {
            duration: duration$,
            panelClass: ['snackbar-warning']
        });
    }

    toastrInfo(message: string, duration$?: number) {
        if (!duration$) {
            duration$ = 3000;
        }
        this.snackBar.open(message, 'X', {
            duration: duration$,
            panelClass: ['snackbar-info']
        });
    }

}
