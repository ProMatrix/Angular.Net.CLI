import { Component, OnInit, NgZone, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MatSidenav } from '@angular/material';
import * as moment from 'moment';
import { filter } from 'rxjs/operators';
// ngxs
import { Store } from '@ngxs/store';

// services
import { AppConfig } from '../../common/appConfig';
import { MessagePump } from '../../common/messagePump';
import { AppServices } from '../../shared/ng2-apphelper/appServices';
import { ModalDialogComponent } from '../../shared/ng2-animation/modalDialog';
import { SideNavState, SideNavStateModel } from './side-nav.component.state';
import { RequestAppSettings, ResponseAppSettings, NavigateTo, SideNavInit } from './side-nav.component.actions';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  providers: [AppConfig, AppServices, MessagePump]
})
export class SideNavComponent implements OnInit, AfterViewInit {

  private appHref: string;
  private selectedFeature: string;
  private date: Date;
  private theWeekOf: string;
  private subtitle = '';
  private sideNavState = new SideNavStateModel();
  private defaultState: any;

  private mediaMatcher: MediaQueryList =
    matchMedia(`(max-width: ${this.ac.smallWidthBreakpoint}px)`);
  constructor(
    private store: Store,
    private readonly route: ActivatedRoute, private readonly router: Router,
    private readonly ac: AppConfig, private readonly as: AppServices,
    private readonly zone: NgZone, private readonly cdr: ChangeDetectorRef) {

    this.mediaMatcher.addEventListener('change', () => {
      this.mediaMatcher = matchMedia(`(max-width: ${this.ac.smallWidthBreakpoint}px)`);
    });
    this.stateChanges();
    this.store.dispatch(new SideNavInit(this.ac.actionQueue));

    setTimeout(() => {

      this.store.dispatch({ type: '@@INIT' });
      //this.store.dispatch(new NavigateTo('features'));
      //this.store.dispatch(new NavigateTo('alreadyReady'));
      //this.store.dispatch(new NavigateTo('httpDemo'));

      setTimeout(() => {
        const actionQueue = Array.from(this.ac.actionQueue);
        this.ac.actionQueue.length = 0;
        actionQueue.forEach((action) => {
          if (action.playback) {
            this.store.dispatch(action);
          }
        });

      }, 5000);

    }, 10000);
  }

  private stateChanges() {
    this.store.subscribe(state => {
      if (state.sideNav) {
        const sideNavState = state.sideNav as SideNavStateModel;
        sideNavState.previousState = this.sideNavState;
        this.sideNavState = sideNavState;

        // RequestAppSettings
        if (sideNavState.requestAppSettings) {
          this.getAppSettings();
        }

        // ResponseAppSettings - patchState only

        // NavigateTo
        if (sideNavState.featureName !== sideNavState.previousState.featureName) {
            this.routerNavigate(sideNavState.featureName);
        }



      }
    });
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
    this.theWeekOf = moment().startOf('week').format('ddd MMM D YYYY');
    this.appHref = window.location.origin;
    this.store.dispatch(new RequestAppSettings(true, false));
    this.store.dispatch(new RequestAppSettings(false, false));
  }

  private getAppSettings() {
    this.sideNavState.requestAppSettings = false;
    this.ac.getAppSettings(() => {
      this.store.dispatch(new ResponseAppSettings(this.ac.appSettings, false));
      this.checkForUpdates();
      this.navigateForward();
    }, (errorMessage) => {
      if (navigator.onLine) {
        this.ac.toastrError(errorMessage);
      } else {
        this.ac.toastrWarning('This App is Offline!');
      }
      this.navigateForward();
    });
  }

  private restartApp() {
    window.location.href = this.appHref;
  }

  private navigateForward() {
    setTimeout(() => {
      const navigateTo = this.ac.getLocalStorage('navigateTo');
      if (navigateTo) {
        this.navigateTo(navigateTo.feature);
      } else {
        this.navigateTo('/splash');
      }
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
    this.store.dispatch(new NavigateTo(featurePath, true));
  }

  private routerNavigate(featurePath) {
    if (featurePath === 'restart') {
      this.ac.toastrWarning('Restarting the application now...');
      setTimeout(() => {
        this.restartApp();
      }, 1000);
      return;
    } else {
      this.ac.setLocalStorage('navigateTo', { feature: featurePath });
      this.selectedFeature = featurePath;
      this.router.navigate([featurePath]);
    }
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }

  private updateVersionAndRestart() {
    this.ac.setLocalStorage('versionNumber', { vn: this.ac.appSettings.projectVersionNo });
    this.ac.toastrInfo('Updating to latest version! Restarting the application...');
    setTimeout(() => {
      this.restartApp();
    }, 3000);
  }

  private checkForUpdates() {
    if (this.ac.appSettings.debug) {
      return;
    }

    const versionNumber = this.ac.getLocalStorage('versionNumber');
    if (!versionNumber) {
      this.updateVersionAndRestart();
    }

    if (versionNumber.vn !== this.ac.appSettings.projectVersionNo) {
      this.updateVersionAndRestart();
    }

    if (navigator.onLine) {
      this.ac.isOnline = true;
      this.ac.toastrSuccess('This application is operating online as normal.');
    } else {
      this.ac.isOnline = false;
      this.ac.toastrWarning('This application is operating offline as normal.');
    }
  }


}
