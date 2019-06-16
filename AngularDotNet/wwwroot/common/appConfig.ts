// #region Imports
import { Injectable, VERSION } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseServices } from "./baseServices";
import { TextMessage, AppSettings } from "../shared/client-side-models/buildModels";
import { AnalyticsData, Performance } from "../shared/client-side-models/analyticsData";
import { ApiVersions } from "../shared/client-side-models/apiVersions";
import * as moment from "moment";
import * as _ from "lodash";
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Data } from "@angular/router";
import { TimingMetrics } from "../shared/analysis/timingmetrics";

// ngxs
import { Store } from '@ngxs/store';
import { GetAppSettings, ServiceSuccess, ServiceError } from '../shared/modules/app.actions';
import { AppState, AppStateModel } from '../shared/modules/app.state';
import { MobileApisState, MobileApisStateModel } from "../features/mobileapis/mobileapis.state";

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
  appState: AppStateModel;
  mobileApisState: MobileApisStateModel;
  private tm = new TimingMetrics("getAppSettings");

  readonly smallWidthBreakpoint = 720;
  readonly headerHeight = 200;
  readonly sideNavWidth = 400;
  readonly mapControlsHeight = 250;
  readonly mapControlsWidth = 300;
  readonly mediaQueryBreak = 1280;

  constructor(private readonly route: ActivatedRoute, private snackBar: MatSnackBar, private store: Store, public readonly http: HttpClient) {
    super(http);
    this.store.subscribe(state => {
      this.appState = state.app as AppStateModel;
      this.mobileApisState = state.mobileApis as MobileApisStateModel;
    });
  }

  getRouteData(): Data {
    let currentRoute = this.route.root;
    while (currentRoute.children[0] !== undefined) {
      currentRoute = currentRoute.children[0];
    }
    return currentRoute.snapshot.data;
  }

  getHelpFileHtml(helpFile: string, success: Function) {
    this.http.get(helpFile, { responseType: 'text' }).subscribe(html => {
      success(html);
    });
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
    this.store.dispatch([new GetAppSettings(moment().format("MM/DD/YYYY HH:mm:ss"))]);
    this.apiVersions.angular = VERSION.full;
    this.isStandAlone = window.matchMedia("(display-mode: standalone)").matches;
    this.beginRequest = new Date().getTime();
    try {
      this.tm.setStartMarker();
    } catch (e) { }

    this.httpGet("sysInfo", (appSettings: AppSettings) => {
      this.store.dispatch([new ServiceSuccess("getAppSettings")]);
      this.logResonseData(new Date().getTime() - this.beginRequest);
      this.setLocalStorage("appSettings", appSettings);
      try {
        this.tm.setEndMarker();
        this.tm.measureInterval();
      } catch (e) { }
      this.appSettings = appSettings;
      this.isInitialized = true;
      success();
    },
      errorMessage => {
        this.store.dispatch([new ServiceError("getAppSettings")]);
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

  toastrSuccess(message: string) {
    this.snackBar.open(message, "X", {
      duration: 3000,
      panelClass: ["snackbar-success"]
    });
  }

  toastrError(message: string) {
    this.snackBar.open(message, "X", {
      duration: -1,
      panelClass: ["snackbar-error"]
    });
  }

  toastrWarning(message: string) {
    this.snackBar.open(message, "X", {
      duration: 3000,
      panelClass: ["snackbar-warning"]
    });
  }

  toastrInfo(message: string) {
    this.snackBar.open(message, "X", {
      duration: 3000,
      panelClass: ["snackbar-info"]
    });
  }

}
