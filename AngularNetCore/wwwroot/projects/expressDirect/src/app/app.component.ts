import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

// services
import { AppConfig } from '../../../../common/appConfig';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [AppConfig]
})
export class AppComponent {

    private appTitle = 'ExpressDirect Integration';
    private appHref: string;
    private appCache: string;
    private showOpeningTitle = true;
    private showMobileApiView = false;
    private selectedFeature: string;
    private appLoaded = false;
    private resizeTimerId: any;

    constructor(private readonly route: ActivatedRoute, private readonly router: Router, private readonly ac: AppConfig) {
        this.appHref = window.location.href;
    }

    ngAfterViewInit() {
        this.ac.onResizeApp();
        this.ac.onOrientationChange();

        window.addEventListener('offline', (event: Event) => {
            this.ac.toastrInfo('The application just went offline!');
            this.ac.isOnline = false;
        }, false);

        window.addEventListener('online', (event: Event) => {
            this.ac.toastrInfo('The application is back online!');
            this.ac.isOnline = true;
        }, false);

        window.addEventListener('resize', (event: Event) => {
            if (this.resizeTimerId) {
                return;
            }
            this.resizeTimerId = setTimeout(() => {
                this.ac.onResizeApp();
                this.resizeTimerId = null;
            }, 500);
        }, false);

        window.addEventListener('orientationchange', (event: Event) => {
            setTimeout(() => {
                this.ac.onOrientationChange();
            });
        }, false);

        this.ac.getAppSettings(() => {
            this.checkForUpdates();
            this.navigateForward();
        }, (errorMessage) => {
            this.navigateForward();
        });
    }

    private checkForUpdates() {
        setTimeout(() => {
            const versionNumber = this.ac.getLocalStorage('versionNumber');
            if (versionNumber && versionNumber.vn !== this.ac.appSettings.buildVersion && !this.ac.appSettings.debug) {
                this.ac.setLocalStorage('versionNumber', { vn: this.ac.appSettings.buildVersion });
                setTimeout(() => {
                    this.restartApp();
                }, 5000);
            } else {
                this.ac.setLocalStorage('versionNumber', { vn: this.ac.appSettings.buildVersion });
                setTimeout(() => {
                    if (navigator.onLine) {
                        this.ac.isOnline = true;
                    } else {
                        this.ac.isOnline = false;
                    }
                });
            }
        }, 3000);
    }

    private navigateForward() {
        setTimeout(() => {
            this.showOpeningTitle = false;
            this.showMobileApiView = true;
            //this.router.navigate(['/expressDirect']);
        }, 2000); // navigate away from splash view
    }

    private restartApp() {
        window.location.href = this.appHref;
    }

}
