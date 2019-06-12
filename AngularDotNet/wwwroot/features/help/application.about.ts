import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppConfig } from "../../common/appConfig";

@Component({
  template: "\n<h1 mat-dialog-title>About: Angular.Net</h1>\n<div mat-dialog-content>\n  <div style=\"text-align: center; \">\n    <label>Application Version: {{ac.apiVersions.application}}</label>\n    <br />\n  </div>\n</div>\n"/* this was squashed */,
  providers: [AppConfig]
})
export class ApplicationAboutDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {}, private readonly ac: AppConfig) {
  }
}
