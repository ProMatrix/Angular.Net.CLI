import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// services
import { AppConfig } from "../common/appConfig";
import * as _ from "lodash";
// models
import { Dependency } from "../shared/client-side-models/buildModels";

@Component({
  // #region template

  templateUrl: "./features.component.html"
  // #endregion
})
export class FeaturesComponent {
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
  templateUrl: "./features.component.help.html"
})
export class FeaturesHelpDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {
  }) {
    // data contains values passed by the router
  }
}
