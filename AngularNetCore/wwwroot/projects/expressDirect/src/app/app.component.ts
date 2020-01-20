import { Component, ViewChild } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: []
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

    constructor() {
        this.appHref = window.location.href;
    }

    ngAfterViewInit() {
      this.navigateForward();
    }

    private navigateForward() {
        setTimeout(() => {
            this.showOpeningTitle = false;
            this.showMobileApiView = true;
        }, 2000);
    }
}
