import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// services
import { AppConfig } from '../common/appConfig';
import { AnalyticsData, Exception, Performance } from '../library_ng/client-side-models/analyticsData';

@Component({
  // #region template
  templateUrl: './analytics.component.html'
  // #endregion
})
export class AnalyticsComponent implements OnInit {
  private isViewVisible = false;

  constructor(private readonly ac: AppConfig) {
  }

  ngOnInit() {
    this.ac.waitUntilInitialized(() => {
      this.isViewVisible = true;
    });
  }

  onClickClearErrors() {
    this.ac.clearExceptions();
  }

  onClickClearResponseTime() {
    this.ac.clearResponseTime();
  }
}


@Component({
  templateUrl: './analytics.component.help.html'
})
export class AnalyticsHelpDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {
  }) {
    // data contains values passed by the router
  }
}
