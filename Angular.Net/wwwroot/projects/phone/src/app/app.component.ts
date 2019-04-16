import { Component } from '@angular/core';
import { MobileApis } from "../../../../features/mobileApis";
import { ToastrModule } from "ngx-toastr";
// services
import { AppConfig } from "../../../../common/appConfig";
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-root',
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
    providers: [AppConfig]
})
export class AppComponent {
    private appTitle = "Angular.Net Starter (Mobile)";
    private appHref: string;
    private appCache: string;
    private showOpeningTitle = true;
    private showMobileApiView = false;
    private selectedFeature: string;
    private appLoaded = false;
    private resizeTimerId: any;

    constructor(private readonly ac: AppConfig, private readonly toastr: ToastrService) {
        this.appHref = window.location.href;
    }

    private ngAfterViewInit() {
        this.ac.onResizeApp();
        this.ac.onOrientationChange();

        window.addEventListener("offline", (event: Event) => {
            this.toastr.info("The application just went offline!");
            this.ac.isOnline = false;
        }, false);

        window.addEventListener("online", (event: Event) => {
            this.toastr.info("The application is back online!");
            this.ac.isOnline = true;
        }, false);

        window.addEventListener("resize", (event: Event) => {
            if (this.resizeTimerId)
                return;
            this.resizeTimerId = setTimeout(() => {
                this.ac.onResizeApp();
                this.resizeTimerId = null;
            }, 500);
        }, false);

        window.addEventListener("orientationchange", (event: Event) => {
            setTimeout(() => {
                this.ac.onOrientationChange();
            });
        }, false);

        this.ac.getAppSettings(() => {
            this.checkForUpdates();
            this.navigateForward();
        }, (errorMessage) => {
            this.toastr.warning(this.appTitle + ": is Offline!");
            this.navigateForward();
        });
    }

    private checkForUpdates() {
        setTimeout(() => {
            const versionNumber = this.ac.getLocalStorage("versionNumber");
            if (versionNumber && versionNumber.vn !== this.ac.appSettings.projectVersionNo && !this.ac.appSettings.debug) {
                this.ac.setLocalStorage("versionNumber", { vn: this.ac.appSettings.projectVersionNo });
                this.toastr.info("A newer version is available! Restarting the application...");
                setTimeout(() => {
                    this.restartApp();
                }, 5000);
            } else {
                this.ac.setLocalStorage("versionNumber", { vn: this.ac.appSettings.projectVersionNo });
                setTimeout(() => {
                    if (navigator.onLine) {
                        this.ac.isOnline = true;
                        this.toastr.success("This application is operating online as normal.", "Success!");
                    }
                    else {
                        this.ac.isOnline = false;
                        this.toastr.warning("This application is operating offline as normal.", "Warning!");
                    }
                });
            }
        }, 3000);
    }

    private navigateForward() {
        setTimeout(() => {
            this.showOpeningTitle = false;
            this.showMobileApiView = true;
        }, this.ac.appSettings.splashTime); // navigate away from splash view        
    }

    private restartApp() {
        window.location.href = this.appHref;
    }

}
