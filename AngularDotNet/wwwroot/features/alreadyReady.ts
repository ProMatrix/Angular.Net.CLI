import { Component } from "@angular/core";
// services
import { AppConfig } from "../common/appConfig";

@Component({
    // #region template
    templateUrl: "./alreadyReady.html",
    styleUrls: ["./alreadyReady.css"]
    // #endregion
})
export class AlreadyReady {
    private isViewVisible = false;

    constructor(private readonly ac: AppConfig) {
    }

    ngOnInit() {
        this.ac.waitUntilInitialized(() => {
            this.isViewVisible = true;
        });
    }
}

