import { Component } from "@angular/core";
// services
import { AppConfig } from "../common/appConfig";

@Component({
  // #region template
  templateUrl: "./alreadyReady.component.html",
  styleUrls: ["./alreadyReady.component.css"]
  // #endregion
})
export class AlreadyReadyComponent {
  private isViewVisible = true;

  constructor(private readonly ac: AppConfig) {
  }

  ngOnInit() {
    this.ac.waitUntilInitialized(() => {
      this.isViewVisible = true;
    });
  }
}

