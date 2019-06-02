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
  template: "\n<mat-drawer-container class=\"app-sidenav-container\" style=\"position: fixed; \">\n\n  <mat-drawer #drawer class=\"app-side-nav\"\n              [opened]=\"!isScreenSmall()\"\n              [mode]=\"isScreenSmall() ? \'over\' : \'side\'\">\n    <mat-toolbar color=\"primary\"></mat-toolbar>\n    <mat-list class=\"app-side-listgroup\" role=\"list\">\n      <mat-list-item role=\"listitem\"><div (click)=\"navigateTo(\'/restart\')\" class=\"app-side-listitem\" [ngClass]=\"{\'app-side-selected-item\': selectedFeature === \'/restart\'}\">Restart</div></mat-list-item>\n      <mat-list-item role=\"listitem\"><div (click)=\"navigateTo(\'/notification\')\" class=\"app-side-listitem\" [ngClass]=\"{\'app-side-selected-item\': selectedFeature === \'/notification\'}\">Notification</div></mat-list-item>\n      <mat-list-item role=\"listitem\"><div (click)=\"navigateTo(\'/mobileApis\')\" class=\"app-side-listitem\" [ngClass]=\"{\'app-side-selected-item\': selectedFeature === \'/mobileApis\'}\">Mobile APIs</div></mat-list-item>\n      <mat-list-item role=\"listitem\"><div (click)=\"navigateTo(\'/splash\')\" class=\"app-side-listitem\" [ngClass]=\"{\'app-side-selected-item\': selectedFeature === \'/splash\'}\">Technology</div></mat-list-item>\n      <mat-list-item role=\"listitem\"><div (click)=\"navigateTo(\'/settings\')\" class=\"app-side-listitem\" [ngClass]=\"{\'app-side-selected-item\': selectedFeature === \'/settings\'}\">Settings</div></mat-list-item>\n      <mat-list-item role=\"listitem\"><div (click)=\"navigateTo(\'/features\')\" class=\"app-side-listitem\" [ngClass]=\"{\'app-side-selected-item\': selectedFeature === \'/features\'}\">Features</div></mat-list-item>\n      <mat-list-item role=\"listitem\"><div (click)=\"navigateTo(\'/analytics\')\" class=\"app-side-listitem\" [ngClass]=\"{\'app-side-selected-item\': selectedFeature === \'/analytics\'}\">Analytics</div></mat-list-item>\n      <mat-list-item role=\"listitem\"><div (click)=\"navigateTo(\'/alreadyReady\')\" class=\"app-side-listitem\" [ngClass]=\"{\'app-side-selected-item\': selectedFeature === \'/alreadyReady\'}\">Already Ready</div></mat-list-item>\n    </mat-list>\n\n  </mat-drawer>\n\n  <!--<app-toolbar (toggleTheme)=\"toggleTheme()\"\n               (toggleSidenav)=\"drawer.toggle()\"\n               (toggleDir)=\"toggleDir()\">\n  </app-toolbar>-->\n\n  <app-toolbar (toggleSidenav)=\"drawer.toggle()\"></app-toolbar>\n\n\n  <div class=\"side-nav-content\">\n    <router-outlet></router-outlet>\n  </div>\n\n</mat-drawer-container>\n\n"/* this was squashed */,
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
      this.ac.toastrSuccess("This application is operating online as normal.");
    }
    else {
      this.ac.isOnline = false;
      this.ac.toastrWarning("This application is operating offline as normal.");
    }
  }


}
