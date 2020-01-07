import { Component, OnInit, AfterViewChecked, AfterViewInit, EventEmitter, Output, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// services
import { AppConfig } from '../common/appConfig';
import { TimingMetrics } from '../library_ng/enterprise/timingmetrics';
import { TextMessage } from 'ng2-models';

@Component({
  // #region template
  templateUrl: './alreadyReady.component.html'
  // #endregion
})
export class AlreadyReadyComponent implements OnInit, AfterViewChecked {
  private isViewVisible = false;
  private timerId = null;
  private snapshotTaken = false;
  private tm = new TimingMetrics('AlreadyReady');

  constructor(private readonly ac: AppConfig) {
  }

  ngOnInit() {
    this.tm.setStartMarker();
    this.ac.waitUntilInitialized(() => {
      setTimeout(() => {
        const x = new TextMessage();
        x.message = 'GREAT!';
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

@Component({
  templateUrl: './alreadyReady.component.help.html'
})
export class AlreadyReadyHelpDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {
  }) {
    // data contains values passed by the router
  }
}
