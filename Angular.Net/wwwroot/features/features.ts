import { Component } from "@angular/core";
// services
import { AppConfig } from "../common/appConfig";
import { ToastrService } from 'ngx-toastr';
import * as _ from "lodash";
// models
import { Dependency } from "../shared/client-side-models/buildModels";

@Component({
    // #region template
    templateUrl: "./features.html",
    styleUrls: ["./features.css"]
    // #endregion
})
export class Features {
    private isViewVisible = false;

    constructor(private readonly ac: AppConfig, private readonly toastr: ToastrService) {
    }

    ngOnInit() {
        this.ac.waitUntilInitialized(() => {
            this.isViewVisible = true;
        });
    }
}
