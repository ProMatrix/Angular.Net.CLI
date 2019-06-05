import { Component } from "@angular/core";
// services
import { AppConfig } from "../common/appConfig";
import { AnalyticsData, Exception, Performance } from "../shared/client-side-models/analyticsData";

@Component({
  // #region template
  template: "\n<view-fader [isViewVisible]=\"isViewVisible\">\n\n  <span class=\"text-primary\" style=\"font-size: 20px;\">\n    <span style=\"font-size: 34px; margin-left: 40%; font-family: px-neuropol; \">Exceptions</span>\n    <span style=\"float: right;\">\n      Errors Count: {{ac.analyticsData.exceptions.length}}\n      <button class=\"btn btn-primary\" [disabled]=\"ac.analyticsData.exceptions.length === 0\" style=\"width: 75px;\" (click)=\"onClickClearErrors()\">Clear</button>\n    </span>&nbsp;&nbsp;\n  </span>\n\n  <div style=\"height: 10px;\"></div>\n\n  <div class=\" text-primary\">\n    <div class=\"card \" *ngFor=\"let exception of ac.analyticsData.exceptions\">\n      <div class=\"card-header\">\n        <h4 class=\"card-header\">\n          <span>{{exception.dateString}}&nbsp;&nbsp;&nbsp;{{exception.timeString}}&nbsp;&nbsp;&nbsp;{{exception.errorMessage}}</span>\n        </h4>\n      </div>\n\n    </div>\n  </div>\n\n  <span class=\"text-primary\" style=\"font-size: 20px;\">\n    <span style=\"font-size: 34px; margin-left: 40%; font-family: px-neuropol; \">Performance</span>\n    <span style=\"float: right;\">\n      Average Response Time: {{ac.analyticsData.averageResponseTime}}ms\n      <button class=\"btn btn-primary\" [disabled]=\"ac.analyticsData.performances.length === 0\" style=\"width: 75px;\" (click)=\"onClickClearResponseTime()\">Clear</button>\n    </span>&nbsp;&nbsp;\n  </span>\n  <div style=\"height: 10px;\"></div>\n\n  <div class=\" text-primary\">\n    <div class=\"card \" *ngFor=\"let performance of ac.analyticsData.performances\">\n      <div class=\"card-header\">\n        <h4 class=\"card-header\">\n          <span>{{performance.dateString}}&nbsp;&nbsp;&nbsp;{{performance.timeString}}&nbsp;&nbsp;&nbsp;{{performance.responseTime}}ms</span>\n        </h4>\n      </div>\n\n    </div>\n  </div>\n\n</view-fader>\n"/* this was squashed */
  // #endregion
})
export class AnalyticsComponent {
  private isViewVisible = false;

  constructor(private readonly ac: AppConfig) {
  }

  ngOnInit() {
    this.ac.waitUntilInitialized(() => {
      this.isViewVisible = true;
      this.ac.updateAnalytics();
    });
  }

  onClickClearErrors() {
    this.ac.clearExceptions();
  }

  onClickClearResponseTime() {
    this.ac.clearResponseTime();
  }

}
