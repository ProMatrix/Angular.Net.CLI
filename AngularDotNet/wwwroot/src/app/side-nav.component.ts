import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { MatSidenav } from '@angular/material';
import * as moment from "moment";
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/operators';

// ngxs
import { Store } from '@ngxs/store';
import { NavigateTo } from '../../shared/modules/app.actions';

// services
import { AppConfig } from "../../common/appConfig";
import { MessagePump } from "../../common/messagePump";
import { AppServices } from "../../shared/ng2-apphelper/appServices";
import { ModalDialog } from "../../shared/ng2-animation/modalDialog";


const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-side-nav',
  templateUrl: "./side-nav.component.html",
  styleUrls: ["./side-nav.component.css"],
  providers: [AppConfig, AppServices, MessagePump]
})
export class SideNavComponent implements OnInit {

  private appHref: string;
  private selectedFeature: string;
  private date: Date;
  private theWeekOf: string;
  private subtitle = "";

  private mediaMatcher: MediaQueryList =
    matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);
  constructor(private readonly route: ActivatedRoute, private readonly router: Router, private readonly ac: AppConfig, private readonly as: AppServices, zone: NgZone) {

    this.mediaMatcher.addListener(mql =>
      zone.run(() => this.mediaMatcher = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)));
  }

  ngOnInit() {
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
      //if (navigator.onLine)
      //  this.toastr.error(errorMessage);
      //else
      //  this.toastr.warning(this.appTitle + ": is Offline!");
      //this.navigateForward();
    });
  }

  private restartApp() {
    window.location.href = this.appHref;
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
      //this.titleBlinking = false;
      //this.appLoaded = true;
    }, this.ac.appSettings.splashTime); // navigate away from splash view        
  }

  private navigateTo(feature) {
    //this.store.dispatch([new NavigateTo(feature)]);
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

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }

  private updateVersionAndRestart() {
    this.ac.setLocalStorage("versionNumber", { vn: this.ac.appSettings.projectVersionNo });
    //this.toastr.info("Updating to latest version! Restarting the application...");
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
      //this.toastr.success("This application is operating online as normal.", "Success!");
    }
    else {
      this.ac.isOnline = false;
      //this.toastr.warning("This application is operating offline as normal.", "Warning!");
    }
  }


}
