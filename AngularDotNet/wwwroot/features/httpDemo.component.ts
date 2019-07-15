import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// services
import { AppConfig } from "../common/appConfig";

@Component({
  // #region template
  templateUrl: "./httpDemo.component.html"
  // #endregion
})
export class HttpDemoComponent implements OnInit {
  private isViewVisible = false;

  constructor(private readonly ac: AppConfig) {
  }

  ngOnInit() {
    this.ac.waitUntilInitialized(() => {
      setTimeout(() => {
        this.isViewVisible = true;
      }, 0);
    });
  }
}

@Component({
  templateUrl: "./httpDemo.component.help.html"
})
export class HttpDemoHelpDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {
  }) {
    // data contains values passed by the router
  }
}
