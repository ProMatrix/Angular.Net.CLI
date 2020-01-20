import { Component, ViewChild } from '@angular/core';

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

    constructor(private readonly ac: AppConfig) {
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
            this.navigateForward();
        }, (errorMessage) => {
            this.navigateForward();
        });
    }

    private navigateForward() {
        setTimeout(() => {
            this.showOpeningTitle = false;
            this.showMobileApiView = true;
        }, 2000); // navigate away from splash view
    }
}
