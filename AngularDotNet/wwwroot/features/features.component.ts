import { Component } from "@angular/core";
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
