import { ViewChild } from "@angular/core";
import { Component } from "@angular/core";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import * as moment from "moment";
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/operators';

// ngxs
import { Store } from '@ngxs/store';
import { NavigateTo } from './app.actions';

// services
import { AppConfig } from "../../common/appConfig";
import { MessagePump } from "../../common/messagePump";
import { AppServices } from "../../shared/ng2-apphelper/appServices";
import { ModalDialog } from "../../shared/ng2-animation/modalDialog";

@Component({
  selector: "app-root",
  template: "\n<modal-dialog class=\"text-primary\" [isVisible]=\"showModalDialog\">\n    <div style=\"text-align: center; \">\n        <label>Project Version: {{ac.apiVersions.application}}</label>\n        <br />\n        <label>Angular Version: {{ac.apiVersions.angular}}</label>\n        <br />\n        <label>ASP.Net Core Version: {{ac.appSettings.aspNetCoreVersion}}</label>\n        <br />\n        <div>The date is: {{date.toLocaleDateString()}}</div>\n        <div>The time is: {{date.toLocaleTimeString()}}</div>\n        <div>This is the week of: {{theWeekOf}}</div>\n    </div>\n</modal-dialog>\n\n<view-fader *ngIf=\"ac.isSpinnerAvailable\" [isViewVisible]=\"ac.isSpinnerVisible\" style=\"position: fixed; top: 45%; left: 45%; z-index: 500; font-size: 75px; color:#3379b7\">\n    <i class=\"fa fa-spinner fa-spin\"></i>\n</view-fader>\n\n<div class=\"topMargin\">\n    <view-fader class=\"displayIfNotPhone\" [isViewVisible]=\"appLoaded\">\n        <div *ngIf=\"appLoaded\">\n            <button class=\"btn btn-primary\" style=\"float: right; margin-left: 10px; margin-top: 7px;\" (click)=\"onClickAbout();\">About</button>\n            <div *ngIf=\"this.ac.isOnline\"><i class=\"fa fa-podcast fa-2x\" style=\"float: right; margin-left: 10px; margin-top: 10px; color: green; \" title=\"Application is Online\"></i></div>\n            <div *ngIf=\"!this.ac.isOnline\"><i class=\"fa fa-podcast fa-2x\" style=\"float: right; margin-left: 10px; margin-top: 10px; color: #ff6a00; \" title=\"Application is Offline\"></i></div>\n            <div class=\"btn-group\" style=\"float: right; top: 7px; \">\n                <button class=\"btn btn-primary btn-sm feature-not-selected\" [ngClass]=\"{\'btn-outline-primary btn-sm feature-selected\': selectedFeature === \'/restart\'}\" (click)=\"navigateTo(\'/restart\')\">Restart</button>\n                <button class=\"btn btn-primary btn-sm feature-not-selected\" [ngClass]=\"{\'btn-outline-primary btn-sm feature-selected\': currentRouteUrl() === \'/notification\'}\" (click)=\"navigateTo(\'/notification\')\">Notification</button>\n                <button class=\"btn btn-primary btn-sm feature-not-selected\" [ngClass]=\"{\'btn-outline-primary btn-sm feature-selected\': currentRouteUrl() === \'/mobileApis\'}\" (click)=\"navigateTo(\'/mobileApis\')\">Mobile APIs</button>\n                <button class=\"btn btn-primary btn-sm feature-not-selected\" [ngClass]=\"{\'btn-outline-primary btn-sm feature-selected\': currentRouteUrl() === \'/splash\'}\" (click)=\"navigateTo(\'/splash\')\">Technology</button>\n                <button class=\"btn btn-primary btn-sm feature-not-selected\" [ngClass]=\"{\'btn-outline-primary btn-sm feature-selected\': currentRouteUrl() === \'/settings\'}\" (click)=\"navigateTo(\'/settings\')\">Settings</button>\n                <button class=\"btn btn-primary btn-sm feature-not-selected\" [ngClass]=\"{\'btn-outline-primary btn-sm feature-selected\': currentRouteUrl() === \'/features\'}\" (click)=\"navigateTo(\'/features\')\">Features</button>\n                <button class=\"btn btn-primary btn-sm feature-not-selected\" [ngClass]=\"{\'btn-outline-primary btn-sm feature-selected\': currentRouteUrl() === \'/analytics\'}\" (click)=\"navigateTo(\'/analytics\')\">Analytics</button>\n                <button class=\"btn btn-primary btn-sm feature-not-selected\" [ngClass]=\"{\'btn-outline-primary btn-sm feature-selected\': currentRouteUrl() === \'/alreadyReady\'}\" (click)=\"navigateTo(\'/alreadyReady\')\">Already Ready</button>\n            </div>\n        </div>\n    </view-fader>\n    <br /><br />\n    <view-blinker class=\"displayIfNotPhone\" [blinking]=\"titleBlinking\" [visibleWhenNotBlinking]=\"true\">\n        <div class=\"text-primary\" style=\"text-align: center; width: 100%; font-family: px-neuropol; font-size: 54px; \">{{appTitle}}</div>\n    </view-blinker>\n    <router-outlet></router-outlet>\n</div>\n"/* this was squashed */,
  styles: ["\n.topMargin {\n  margin: 20px;\n}\n\n.displayIfNotPhone { /*is not phone*/\n  display: normal;\n}\n\n@media screen and (max-width: 667px) {\n  .topMargin {\n    margin: -20px;\n  }\n\n  .displayIfNotPhone {\n    display: none;\n  }\n}\n\n.feature-selected {\n  cursor: none;\n  background-color: white;\n}\n\n.feature-selected:hover {\n        cursor: default;\n        color: #007bff;\n        background-color: transparent;\n    }\n\n.feature-not-selected {\n  cursor: pointer;\n}\n"/* this was squashed */],
  // #endregion
  providers: [AppConfig, AppServices, MessagePump]
})
export class AppComponent {
  @ViewChild(ModalDialog) md: ModalDialog;
  private appTitle = "Angular.Net Application";
  private date: Date;
  private theWeekOf: string;
  private appHref: string;
  private titleBlinking = true;
  private titleVisibleWhenNotBlinking = true;
  private showModalDialog = false;
  private selectedFeature: string;
  private appLoaded = false;
  private resizeTimerId: any;
  private subtitle = "";

  constructor(private store: Store, private readonly route: ActivatedRoute, private readonly router: Router, private readonly ac: AppConfig, private readonly toastr: ToastrService, private readonly as: AppServices) {
  }

  private ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      let currentRoute = this.route.root;
      while (currentRoute.children[0] !== undefined) {
        currentRoute = currentRoute.children[0];
      }
      this.subtitle = currentRoute.snapshot.data.subtitle;
    });

    this.date = new Date();
    this.theWeekOf = moment().startOf("week").format("ddd MMM D YYYY");
    this.appHref = window.location.href;
    this.ac.getAppSettings(() => {
      this.checkForUpdates();
      this.navigateForward();
    }, (errorMessage) => {
      if (navigator.onLine)
        this.toastr.error(errorMessage);
      else
        this.toastr.warning(this.appTitle + ": is Offline!");
      this.navigateForward();
    });
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
  }

  private updateVersionAndRestart() {
    this.ac.setLocalStorage("versionNumber", { vn: this.ac.appSettings.projectVersionNo });
    this.toastr.info("Updating to latest version! Restarting the application...");
    setTimeout(() => {
      this.restartApp();
    }, 3000);
  }

  private checkForUpdates() {
    if (this.ac.appSettings.debug)
      return;

    const versionNumber = this.ac.getLocalStorage("versionNumber");
    if (!versionNumber)
      this.updateVersionAndRestart();

    if (versionNumber.vn !== this.ac.appSettings.projectVersionNo)
      this.updateVersionAndRestart();

    if (navigator.onLine) {
      this.ac.isOnline = true;
      this.toastr.success("This application is operating online as normal.", "Success!");
    }
    else {
      this.ac.isOnline = false;
      this.toastr.warning("This application is operating offline as normal.", "Warning!");
    }
  }

  private getOnlineStatus() {
    return navigator.onLine;
  }

  private navigateForward() {
    setTimeout(() => {
      if (window.screen.width <= 768) {
        this.navigateTo("/mobileApis");
        return;
      }

      const navigateTo = this.ac.getLocalStorage("navigateTo");
      if (navigateTo)
        this.navigateTo(navigateTo.feature);
      else
        this.navigateTo("/splash");
      this.titleBlinking = false;
      this.appLoaded = true;
    }, this.ac.appSettings.splashTime); // navigate away from splash view        
  }

  private restartApp() {
    window.location.href = this.appHref;
  }

  private currentRouteUrl(): string {
    if (this.selectedFeature === "/restart")
      return "/restart";
    return this.router.url;
  }

  private navigateTo(feature) {
    this.store.dispatch([new NavigateTo(feature)]);
    this.selectedFeature = feature;
    if (feature === "/restart") {
      setTimeout(() => {
        this.restartApp();
      }, 1000);
      return;
    }

    this.ac.setLocalStorage("navigateTo", { feature: feature });
    this.router.navigate([feature]);
  }

  private onClickAbout() {
    this.md.modalDialogTitle = `About: ${this.appTitle}`;
    this.md.showOkButton = true;
    this.md.isClosable = true;
    this.md.desiredWidth = 430;
    this.md.desiredHeight = 300;
    this.showModalDialog = false;
    setTimeout(() => {
      this.showModalDialog = true;
    });
    this.md.dialogButtonCallback = (buttonClicked: string) => {
      if (buttonClicked === "ok") {
        this.md.closeDialog();
      }
    };
  }
}
