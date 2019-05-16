import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { MatSidenav } from '@angular/material';

// services
import { AppConfig } from "../../common/appConfig";
import { AppServices } from "../../shared/ng2-apphelper/appServices";

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-side-nav',
  templateUrl: "./side-nav.component.html",
  styleUrls: ["./side-nav.component.css"],
  providers: [AppConfig, AppServices]
})
export class SideNavComponent implements OnInit {


  private appHref: string;
  private selectedFeature: string;

  private mediaMatcher: MediaQueryList =
    matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);
  constructor(private readonly route: ActivatedRoute, private readonly router: Router, private readonly ac: AppConfig, private readonly as: AppServices, zone: NgZone) {

    this.mediaMatcher.addListener(mql =>
      zone.run(() => this.mediaMatcher = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)));
  }

  private restartApp() {
    window.location.href = this.appHref;
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

  toggleTheme() {
  }

  toggleDir() {
  }

  ngOnInit() {
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }

}
