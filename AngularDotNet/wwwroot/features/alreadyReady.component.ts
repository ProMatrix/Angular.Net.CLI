import { Component, OnInit, AfterViewChecked, AfterViewInit } from "@angular/core";
// services
import { AppConfig } from "../common/appConfig";

@Component({
  // #region template
  templateUrl: "./alreadyReady.component.html"
  // #endregion
})
export class AlreadyReadyComponent implements OnInit, AfterViewChecked {
  private isViewVisible = false;
  private timerId = null;
  private snapshotTaken = false;
  constructor(private readonly ac: AppConfig) {
  }

  ngOnInit() {
    this.setMarker("Start ngOnInit");
    this.ac.waitUntilInitialized(() => {
      setTimeout(() => {
        this.isViewVisible = true;
      }, 0);
    });
  }

  ngAfterViewChecked() {
    if (this.snapshotTaken || !this.isViewVisible)
      return;
    this.takeSnapshot("INITIALIZING AlreadyReady", "Start ngOnInit", "End ngAfterViewInit")
  }

  private setMarker(name: string) {
    window.performance.mark(name);
  }

  private takeSnapshot(snapshotName: string, startName: string, endName: string) {
    if (this.snapshotTaken || !this.isViewVisible)
      return;
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    this.timerId = setTimeout(() => {
      clearTimeout(this.timerId);
      this.timerId = null;
      this.snapshotTaken = true;
      this.setMarker("End ngAfterViewInit");
      window.performance.measure(snapshotName, startName, endName);
    }, 0);
  }

}

