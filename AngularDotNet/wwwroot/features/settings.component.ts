import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _ from 'lodash';
// services
import { AppConfig } from '../common/appConfig';
// models
import { Dependency } from '../shared/client-side-models/buildModels';

@Component({
  // #region template
  templateUrl: './settings.component.html'
  // #endregion
})
export class SettingsComponent {
  private isViewVisible = true;
  private dependencies = Array<Dependency>();

  constructor(private readonly ac: AppConfig) {
  }

  ngOnInit() {
    this.ac.waitUntilInitialized(() => {
      this.isViewVisible = true;
    });
  }
}

@Component({
  templateUrl: './settings.component.help.html'
})
export class SettingsHelpDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {
  }) {
    // data contains values passed by the router
  }
}

