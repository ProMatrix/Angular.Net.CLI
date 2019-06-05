import { Component, OnInit, NgZone, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { MatSidenav } from '@angular/material';
import * as moment from "moment";
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
  providers: [AppConfig, AppServices, MessagePump]
})
export class SideNavComponent implements OnInit, AfterViewInit {

  private appHref: string;
  private selectedFeature: string;
  private date: Date;
  private theWeekOf: string;
  private subtitle = "";

  private mediaMatcher: MediaQueryList =
    matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);
  constructor(private readonly route: ActivatedRoute, private readonly router: Router, private readonly ac: AppConfig, private readonly as: AppServices, private readonly zone: NgZone, private readonly cdr: ChangeDetectorRef) {
    this.mediaMatcher.addListener(mql =>
      zone.run(() => this.mediaMatcher = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)));
  }

  ngAfterViewInit() {
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
      if (navigator.onLine)
        this.ac.toastrError(errorMessage);
      else
        this.ac.toastrWarning("This App is Offline!");
      this.navigateForward();
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
    }, this.ac.appSettings.splashTime); // navigate away from splash view        
  }

  private animateTo(feature) {
    feature.data.show = false;
    setTimeout(() => {
      feature.data.show = true;
    }, 500);
    this.navigateTo(feature.path);
  }

  private navigateTo(featurePath) {
    //this.store.dispatch([new NavigateTo(feature)]);

    if (featurePath === "restart") {
      this.ac.toastrWarning("Restarting the application now...");
      setTimeout(() => {
        this.restartApp();
      }, 1000);
      return;
    } else {
      this.ac.setLocalStorage("navigateTo", { feature: featurePath });
      this.selectedFeature = featurePath;
      this.router.navigate([featurePath]);
    }
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }

  private updateVersionAndRestart() {
    this.ac.setLocalStorage("versionNumber", { vn: this.ac.appSettings.projectVersionNo });
    this.ac.toastrInfo("Updating to latest version! Restarting the application...");
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
      this.ac.toastrSuccess("This application is operating online as normal.");
    }
    else {
      this.ac.isOnline = false;
      this.ac.toastrWarning("This application is operating offline as normal.");
    }
  }


}
