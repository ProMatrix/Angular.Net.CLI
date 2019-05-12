import { Component } from "@angular/core";
// services
import { AppConfig } from "../common/appConfig";

@Component({
  // #region template
  template: "\n\n<view-fader [isViewVisible]=\"isViewVisible\">\n\n    <h2 class=\"feature-title\" style=\"font-family: px-neuropol; \">ALREADY READY</h2>\n    <h3 class=\"feature-subtitle\" style=\"font-family: px-neuropol; \">Add the New Feature Here</h3>\n    <div class=\"feature-text\">\n        <div style=\"margin: 5px; \">\n            The AngularDotNet Starter Application comes with the scaffolding for you to immediately begin implementing your own custom feature.\n        </div>\n    </div>\n</view-fader>\n\n"/* this was squashed */,
  styles: ["\n.feature-title {\n    color: #007aff;\n    background-color: #dfdfdf;\n    padding: 10px;\n    width: 400px;\n    height: 60px;\n    text-align: center;\n    border-radius: 25px;\n}\n\n.feature-subtitle {\n    margin-left: 25%;\n    color: #007aff;\n    background-color: #dfdfdf;\n    padding: 10px;\n    width: 600px;\n    height: 60px;\n    text-align: center;\n    border-radius: 25px;\n}\n\n.feature-text {\n    margin-left: 25%;\n    color: #007aff;\n    background-color: #dfdfdf;\n    padding: 10px;\n    width: 600px;\n    height: 150px;\n    text-align: justify;\n    border-radius: 25px;\n    font-size: 20px;\n}"/* this was squashed */]
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

