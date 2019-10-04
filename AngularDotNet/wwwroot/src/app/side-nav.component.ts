import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MatSidenav } from '@angular/material';
import * as moment from 'moment';
import { filter } from 'rxjs/operators';
// ngxs
import { Store } from '@ngxs/store';

// services
import { AppConfig } from '../../common/appConfig';
import { BuildConfig } from '../../common/buildConfig';
import { MessagePump } from '../../common/messagePump';
import { AppServices } from '../../shared/ng2-apphelper/appServices';
import { ModalDialogComponent } from '../../shared/ng2-animation/modalDialog';
import { SideNavState, SideNavStateModel } from './side-nav.component.state';
import { RequestAppSettings, ResponseAppSettings, NavigateTo, SideNavInit } from './side-nav.component.actions';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  providers: [AppConfig, BuildConfig, AppServices, MessagePump]
})
export class SideNavComponent implements OnInit {

  private appHref: string;
  private selectedFeature: string;
  private date: Date;
  private theWeekOf: string;
  private subtitle = '';
  private sideNavState = new SideNavStateModel();
  private defaultState: any;
  private autoStartActionsRecording = false;

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

    this.store.dispatch(new SideNavInit(this.ac.ngAction));
    this.stateChanges();
    if (this.autoStartActionsRecording) {
      this.recordStateChanges();
    }
  }

  private toggleRecord() {
    if (this.ac.ngAction.isRecording()) {
      this.ac.ngAction.stopRecording();
    } else {
      this.ac.ngAction.startRecording();
    }
  }

  private recordingStatus(): string {
    if (this.ac.ngAction.isRecording()) {
      return 'Pause';
    } else {
      return 'Record';
    }
  }

  private recordStateChanges() {
    this.ac.ngAction.startRecording();
  }

  private onClickPlayback() {
    this.ac.ngAction.playback();
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
    this.store.dispatch(new RequestAppSettings('', 'RequestSettings', true, false, -1));
    this.store.dispatch(new RequestAppSettings('', 'RequestSettings', false, false, -1));
  }

  private getAppSettings() {
    this.sideNavState.requestAppSettings = false;
    this.ac.getAppSettings(() => {
      this.store.dispatch(new ResponseAppSettings('', 'ResponseSettings', this.ac.appSettings, false, -1));
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
        this.navigateTo('splash');
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
    const feature = this.router.config.find(obj => obj.path === featurePath);
    if (feature === undefined) {
      throw new Error('splash config object not found!');
    }
    this.store.dispatch(new NavigateTo('NavigateTo', feature.data.title, featurePath, true, -1));
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
    this.ac.setLocalStorage('apiVersions', { vn: this.ac.appSettings.apiVersions } );
    this.ac.toastrInfo('Updating to latest version: ' + this.ac.appSettings.buildVersion + ' Restarting the application...');
    setTimeout(() => {
      this.restartApp();
    }, 3000);
  }

  private checkForUpdates() {
    if (this.ac.appSettings.debug) {
      return;
    }

    const apiVersions = this.ac.getLocalStorage('apiVersions');
    if (!apiVersions) {
      this.updateVersionAndRestart();
      return;
    }

    if (apiVersions.vn.application !== this.ac.appSettings.buildVersion) {
      this.updateVersionAndRestart();
      return;
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
