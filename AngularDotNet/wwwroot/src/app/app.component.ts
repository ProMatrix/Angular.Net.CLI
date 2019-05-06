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
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
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
