import { Component } from "@angular/core";
// services
import { AppConfig } from "../common/appConfig";

@Component({
  // #region template
  template: "\n\n<view-fader [isViewVisible]=\"isViewVisible\">\n\n    <h2 class=\"feature-title\" style=\"font-family: px-neuropol; \">ALREADY READY</h2>\n    <h3 class=\"feature-subtitle\" style=\"font-family: px-neuropol; \">Add the New Feature Here</h3>\n    <div class=\"feature-text\">\n        <div style=\"margin: 5px; \">\n            The AngularDotNet Starter Application comes with the scaffolding for you to immediately begin implementing your own custom feature.\n        </div>\n    </div>\n</view-fader>\n\n"/* this was squashed */,
  styleUrls: ["./alreadyReady.component.css"]
  // #endregion
})
export class AlreadyReadyComponent {
  private isViewVisible = false;

  constructor(private readonly ac: AppConfig) {
  }

  ngOnInit() {
    this.ac.waitUntilInitialized(() => {
      this.isViewVisible = true;
    });
  }
}

