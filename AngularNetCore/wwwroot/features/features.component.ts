import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// services
import { AppConfig } from '../common/appConfig';

// models
import { Dependency } from 'ngx-modeling';

@Component({
  // #region template

  templateUrl: './features.component.html'
  // #endregion
})
export class FeaturesComponent implements OnInit {
  isViewVisible = true;
  private dependencies = Array<Dependency>();

  constructor(readonly ac: AppConfig) {
  }

  ngOnInit() {
    this.ac.waitUntilInitialized(() => {
      this.isViewVisible = true;
    });
  }
}

@Component({
  templateUrl: './features.component.help.html'
})
export class FeaturesHelpDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { debugOnly, title, subtitle, show, helpTemplate }) {
    // data contains values passed by the router
  }
}
