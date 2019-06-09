import { Component, OnInit, AfterViewChecked, AfterViewInit } from "@angular/core";
// services
import { AppConfig } from "../common/appConfig";
import { TimingMetrics } from "../shared/analysis/timingmetrics";

@Component({
  // #region template
  templateUrl: "./alreadyReady.component.html"
  // #endregion
})
export class AlreadyReadyComponent implements OnInit, AfterViewChecked {
  private isViewVisible = false;
  private timerId = null;
  private snapshotTaken = false;
  private tm = new TimingMetrics("AlreadyReady");

  constructor(private readonly ac: AppConfig) {
  }

  ngOnInit() {
    this.tm.setStartMarker();
    this.ac.waitUntilInitialized(() => {
      setTimeout(() => {
        this.isViewVisible = true;
      }, 0);
    });
  }

  ngAfterViewChecked() {
    if (this.isViewVisible) {
      this.tm.setEndMarker();
      this.tm.measureInterval();
    }
  }
}

