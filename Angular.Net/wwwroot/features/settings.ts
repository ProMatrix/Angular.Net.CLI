import { Component } from "@angular/core";
import * as _ from "lodash";
// services
import { AppConfig } from "../common/appConfig";

@Component({
    // #region template
    templateUrl: "./settings.html",
    styleUrls: ["./settings.css"]
    // #endregion
})
export class Settings {
    private isViewVisible = false;

    constructor(private readonly ac: AppConfig) {
    }

    ngOnInit() {
        this.ac.waitUntilInitialized(() => {
            this.isViewVisible = true;
        });
    }
}

