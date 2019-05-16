import { Component } from "@angular/core";
import * as _ from "lodash";
// services
import { AppConfig } from "../common/appConfig";
// models
import { Dependency } from "../shared/client-side-models/buildModels";

@Component({
  // #region template
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"]
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

