import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppConfig } from "../../common/appConfig";

@Component({
  templateUrl: "./application.about.html",
  providers: [AppConfig]
})
export class ApplicationAboutDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {}, private readonly ac: AppConfig) {
  }
}
