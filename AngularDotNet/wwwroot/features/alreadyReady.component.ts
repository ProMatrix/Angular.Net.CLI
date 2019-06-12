import { Component, OnInit, AfterViewChecked, AfterViewInit } from "@angular/core";
// services
import { AppConfig } from "../common/appConfig";
import { TimingMetrics } from "../shared/analysis/timingmetrics";

@Component({
  // #region template
  template: "\n\n<view-fader [isViewVisible]=\"isViewVisible\">\n\n  <h2 class=\"already-feature-title\" style=\"font-family: px-neuropol; \">ALREADY READY</h2>\n  <h3 class=\"already-feature-subtitle\" style=\"font-family: px-neuropol; \">Add the New Feature Here</h3>\n  <div class=\"already-feature-text\">\n    <div style=\"margin: 5px; \">\n      The Angular.Net Application comes with the scaffolding for you to immediately begin implementing your own custom feature.\n    </div>\n  </div>\n</view-fader>\n\n"/* this was squashed */
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

