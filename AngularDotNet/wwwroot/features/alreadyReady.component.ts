import { Component, OnInit, AfterViewChecked, AfterViewInit } from "@angular/core";
// services
import { AppConfig } from "../common/appConfig";

class TimingMetrics {
  metricName: string;
  startName: string;
  endName: string;
  private capturedMetric = false;
  private timerId: any;

  constructor(metricName: string) {
    this.metricName = metricName;
  }

  setStartMarker() {
    if (this.startName) {
      console.log("start metric already set");
      return;
    }
    this.startName = "Start " + this.metricName;
    window.performance.mark(this.startName);
  }

  setEndMarker() {
    if (!this.startName) {
      console.log("start metric not set");
      return;
    }

    if (this.endName) {
      console.log("end metric already set");
      return;
    }

    this.endName = "End " + this.metricName;
    window.performance.mark(this.endName);
  }

  measureTiming() {
    if (this.capturedMetric) {
      return;
    }

    if (!this.startName) {
      console.log("start metric not set");
      return;
    }

    if (!this.endName) {
      console.log("end metric not set");
      return;
    }

    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    this.timerId = setTimeout(() => {
      clearTimeout(this.timerId);
      this.timerId = null;
      this.capturedMetric = true;
      window.performance.measure("Measure " + this.metricName, this.startName, this.endName);
    }, 0);
  }

  takeSnapshot(snapshotName: string, startName: string, endName: string) {
    if (this.capturedMetric)
      return;
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    this.timerId = setTimeout(() => {
      clearTimeout(this.timerId);
      this.timerId = null;
      this.capturedMetric = true;
      window.performance.measure(snapshotName, startName, endName);
    }, 0);
  }

}

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
      this.tm.measureTiming();
    }
  }
}

