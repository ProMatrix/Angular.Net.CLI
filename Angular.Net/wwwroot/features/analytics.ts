import { Component } from "@angular/core";
// services
import { AppConfig } from "../common/appConfig";
import { AnalyticsData, Exception, Performance } from "../shared/client-side-models/analyticsData";

@Component({
    // #region template
    templateUrl: "./analytics.html",
    styleUrls: ["./analytics.css"]
    // #endregion
})
export class Analytics {
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
