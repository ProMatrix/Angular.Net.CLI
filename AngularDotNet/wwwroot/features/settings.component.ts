import { Component } from "@angular/core";
import * as _ from "lodash";
// services
import { AppConfig } from "../common/appConfig";
// models
import { Dependency } from "../shared/client-side-models/buildModels";

@Component({
  // #region template
  template: "\n\n<view-fader [isViewVisible]=\"isViewVisible\">\n\n  <h2 class=\"feature-title\" style=\"font-family: px-neuropol; \">VERSIONS & SETTINGS</h2>\n\n  <br />\n\n  <div class=\"row\">\n\n    <div class=\"feature-text col-5 offset-1\" style=\"height: 600px; \">\n      <div class=\"feature-subtitle\" style=\"font-family: px-neuropol; \">\n        <h3>Versions for AngularDotNet</h3>\n        <h4 style=\"font-family: px-neuropol; \">Application: {{ac.apiVersions.application}}</h4>\n      </div>\n      <table style=\"margin-left: 100px; \">\n        <tr>\n          <td style=\"width: 170px; text-align: right; color:darkgreen;\">ASP.Net Core:</td>\n          <td style=\"width: 20px; \">&nbsp;</td>\n          <td style=\"width: 20px; color:darkgreen;\">{{ac.appSettings.aspNetCoreVersion}}</td>\n        </tr>\n        <tr>\n          <td style=\"width: 170px; text-align: right; color: orangered;\">Angular:</td>\n          <td style=\"width: 20px; \">&nbsp;</td>\n          <td style=\"width: 20px; color: orangered;\">{{ac.apiVersions.angular}}</td>\n        </tr>\n        <tr>\n          <td style=\"width: 170px; text-align: right; color: orangered;\">TypeScript:</td>\n          <td style=\"width: 20px; \">&nbsp;</td>\n          <td style=\"width: 20px; color: orangered;\">{{ac.apiVersions.typeScript}}</td>\n        </tr>\n        <tr>\n          <td style=\"width: 170px; text-align: right; color: orangered;\">NodeJs:</td>\n          <td style=\"width: 20px; \">&nbsp;</td>\n          <td style=\"width: 20px; color: orangered;\">{{ac.apiVersions.nodeJs}}</td>\n        </tr>\n        <tr>\n          <td style=\"width: 170px; text-align: right; color: orangered;\">V8 Engine:</td>\n          <td style=\"width: 20px; \">&nbsp;</td>\n          <td style=\"width: 20px; color: orangered;\">{{ac.apiVersions.v8Engine}}</td>\n        </tr>\n        <tr>\n          <td style=\"width: 170px; text-align: right; \">RxJs:</td>\n          <td style=\"width: 20px; \">&nbsp;</td>\n          <td style=\"width: 20px; \">{{ac.apiVersions.rxJs}}</td>\n        </tr>\n        <tr>\n          <td style=\"width: 170px; text-align: right; \">Bootstrap:</td>\n          <td style=\"width: 20px; \">&nbsp;</td>\n          <td style=\"width: 20px; \">{{ac.apiVersions.bootstrap}}</td>\n        </tr>\n        <tr>\n          <td style=\"width: 170px; text-align: right; \">Lodash:</td>\n          <td style=\"width: 20px; \">&nbsp;</td>\n          <td style=\"width: 20px; \">{{ac.apiVersions.lodash}}</td>\n        </tr>\n        <tr>\n          <td style=\"width: 170px; text-align: right; \">Moment:</td>\n          <td style=\"width: 20px; \">&nbsp;</td>\n          <td style=\"width: 20px; \">{{ac.apiVersions.moment}}</td>\n        </tr>\n        <tr>\n          <td style=\"width: 170px; text-align: right; \">ngxToastr:</td>\n          <td style=\"width: 20px; \">&nbsp;</td>\n          <td style=\"width: 20px; \">{{ac.apiVersions.ngxtoastr}}</td>\n        </tr>\n        <tr>\n          <td style=\"width: 170px; text-align: right; \">FileSaver:</td>\n          <td style=\"width: 20px; \">&nbsp;</td>\n          <td style=\"width: 20px; \">{{ac.apiVersions.fileSaver}}</td>\n        </tr>\n        <tr>\n          <td style=\"width: 170px; text-align: right; \">CoreJs:</td>\n          <td style=\"width: 20px; \">&nbsp;</td>\n          <td style=\"width: 20px; \">{{ac.apiVersions.coreJs}}</td>\n        </tr>\n        <tr>\n          <td style=\"width: 170px; text-align: right; \">ZoneJs:</td>\n          <td style=\"width: 20px; \">&nbsp;</td>\n          <td style=\"width: 20px; \">{{ac.apiVersions.zoneJs}}</td>\n        </tr>\n        <tr>\n          <td style=\"width: 170px; text-align: right; \">GoogleMaps:</td>\n          <td style=\"width: 20px; \">&nbsp;</td>\n          <td style=\"width: 20px; \">{{ac.apiVersions.googleMaps}}</td>\n        </tr>\n      </table>\n    </div>\n\n    <div class=\"feature-text col-5 offset-1\">\n      <h3 class=\"feature-subtitle\" style=\"font-family: px-neuropol; \">Settings for AngularDotNet</h3>\n      <div style=\"margin-left: 170px; \">\n        <div>Debug={{ac.appSettings.debug}}</div>\n        <div>Testing={{ac.appSettings.testing}}</div>\n        <div>Splash Time={{ac.appSettings.splashTime}}ms</div>\n        <div>Online Status={{ac.isOnline}}</div>\n        <div>Standalone={{ac.isStandAlone}}</div>\n      </div>\n    </div>\n\n  </div>\n\n</view-fader>\n\n"/* this was squashed */,
  styles: ["\n.feature-title {\n    color: #007aff;\n    background-color: #dfdfdf;\n    padding: 10px;\n    width: 500px;\n    height: 60px;\n    text-align: center;\n    border-radius: 25px;\n}\n\n.feature-subtitle {\n    margin-left: 40px;\n    color: #007aff;\n    background-color:ghostwhite;\n    padding: 10px;\n    width: 425px;\n    text-align: center;\n    border-radius: 25px;\n}\n\n.feature-text {\n    color: #007aff;\n    background-color: #dfdfdf;\n    padding: 10px;\n    max-width: 525px;\n    height: 300px;\n    text-align: justify;\n    border-radius: 25px;\n    font-size: 20px;\n}\n\n"/* this was squashed */]
  // #endregion
})
export class SettingsComponent {
  private isViewVisible = false;
  private dependencies = Array<Dependency>();

  constructor(private readonly ac: AppConfig) {
  }

  ngOnInit() {
    this.ac.waitUntilInitialized(() => {
      this.isViewVisible = true;
    });
  }
}

