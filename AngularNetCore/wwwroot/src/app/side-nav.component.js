"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var moment = require("moment");
var operators_1 = require("rxjs/operators");
// services
var appConfig_1 = require("../../common/appConfig");
var buildConfig_1 = require("../../common/buildConfig");
var messagePump_1 = require("../../common/messagePump");
var ngx_motion_1 = require("ngx-motion");
var side_nav_component_state_1 = require("./side-nav.component.state");
var side_nav_component_actions_1 = require("./side-nav.component.actions");
var SideNavComponent = /** @class */ (function () {
    function SideNavComponent(ac, store, route, router, as, zone, cdr) {
        this.store = store;
        this.route = route;
        this.router = router;
        this.as = as;
        this.zone = zone;
        this.cdr = cdr;
        this.subtitle = '';
        this.sideNavState = new side_nav_component_state_1.SideNavStateModel();
        this.autoStartActionsRecording = false;
        this.mediaMatcher = matchMedia("(max-width: 720px)");
        this.ac = ac;
    }
    SideNavComponent.prototype.ngOnInit = function () {
        this.getNewAppSettings();
    };
    SideNavComponent.prototype.getNewAppSettings = function () {
        var _this = this;
        this.ac.getAppSettings(function () {
            _this.initSideNav();
            _this.checkForUpdates();
            _this.navigateForward();
        }, function (errorMessage) {
            if (navigator.onLine) {
                _this.ac.toastrError(errorMessage);
            }
            else {
                _this.ac.toastrWarning('This App is Offline!');
            }
            _this.navigateForward();
        });
    };
    SideNavComponent.prototype.initSideNav = function () {
        var _this = this;
        this.mediaMatcher.addEventListener('change', function () {
            _this.mediaMatcher = matchMedia("(max-width: " + _this.ac.smallWidthBreakpoint + "px)");
        });
        this.store.dispatch(new side_nav_component_actions_1.SideNavInit(this.ac.ngAction));
        this.stateChanges();
        if (this.autoStartActionsRecording) {
            this.recordStateChanges();
        }
        this.router.events.pipe(operators_1.filter(function (event) { return event instanceof router_1.NavigationEnd; })).subscribe(function (event) {
            var currentRoute = _this.route.root;
            while (currentRoute.children[0] !== undefined) {
                currentRoute = currentRoute.children[0];
            }
            _this.subtitle = currentRoute.snapshot.data.subtitle;
        });
        this.date = new Date();
        this.theWeekOf = moment().startOf('week').format('ddd MMM D YYYY');
        this.appHref = window.location.origin;
        this.store.dispatch(new side_nav_component_actions_1.RequestAppSettings('', 'RequestSettings', true, false, -1));
        this.store.dispatch(new side_nav_component_actions_1.RequestAppSettings('', 'RequestSettings', false, false, -1));
    };
    SideNavComponent.prototype.getVsCurrentConfiguration = function () {
        if (location.hostname !== 'localhost') {
            return '';
        }
        if (this.ac.appSettings.debug) {
            return 'Debug';
        }
        else {
            return 'Release';
        }
    };
    SideNavComponent.prototype.toggleRecord = function () {
        if (this.ac.ngAction.isRecording()) {
            this.ac.ngAction.stopRecording();
        }
        else {
            this.ac.ngAction.startRecording();
        }
    };
    SideNavComponent.prototype.recordingStatus = function () {
        if (this.ac.ngAction.isRecording()) {
            return 'Pause';
        }
        else {
            return 'Record';
        }
    };
    SideNavComponent.prototype.recordStateChanges = function () {
        this.ac.ngAction.startRecording();
    };
    SideNavComponent.prototype.onClickPlayback = function () {
        this.ac.ngAction.playback();
    };
    SideNavComponent.prototype.stateChanges = function () {
        var _this = this;
        this.store.subscribe(function (state) {
            if (state.sideNav) {
                var sideNavState = state.sideNav;
                sideNavState.previousState = _this.sideNavState;
                _this.sideNavState = sideNavState;
                // ResponseAppSettings - patchState only
                // NavigateTo
                if (sideNavState.featureName !== sideNavState.previousState.featureName) {
                    _this.routerNavigate(sideNavState.featureName);
                }
            }
        });
    };
    SideNavComponent.prototype.restartApp = function () {
        window.location.href = this.appHref;
    };
    SideNavComponent.prototype.navigateForward = function () {
        var _this = this;
        setTimeout(function () {
            var navigateTo = _this.ac.getLocalStorage('navigateTo');
            if (navigateTo) {
                if (navigateTo.feature === 'development' && _this.ac.appSettings.debug === false) {
                    _this.navigateTo('splash');
                    return;
                }
                _this.navigateTo(navigateTo.feature);
            }
            else {
                _this.navigateTo('splash');
            }
        }, this.ac.appSettings.splashTime); // navigate away from splash view
    };
    SideNavComponent.prototype.animateTo = function (feature) {
        feature.data.show = false;
        setTimeout(function () {
            feature.data.show = true;
        }, 500);
        this.navigateTo(feature.path);
    };
    SideNavComponent.prototype.navigateTo = function (featurePath) {
        var feature = this.router.config.find(function (obj) { return obj.path === featurePath; });
        if (feature === undefined) {
            throw new Error('splash config object not found!');
        }
        this.store.dispatch(new side_nav_component_actions_1.NavigateTo('NavigateTo', feature.data.title, featurePath, true, -1));
    };
    SideNavComponent.prototype.routerNavigate = function (featurePath) {
        var _this = this;
        if (featurePath === 'restart') {
            this.ac.toastrWarning('Restarting the application now...');
            setTimeout(function () {
                _this.restartApp();
            }, 1000);
            return;
        }
        else {
            this.ac.setLocalStorage('navigateTo', { feature: featurePath });
            this.selectedFeature = featurePath;
            this.router.navigate([featurePath]);
        }
    };
    SideNavComponent.prototype.isScreenSmall = function () {
        return this.mediaMatcher.matches;
    };
    SideNavComponent.prototype.updateVersionAndRestart = function () {
        var _this = this;
        this.ac.setLocalStorage('buildVersion', { buildVersion: this.ac.appSettings.buildVersion });
        this.ac.toastrInfo('Updating to latest version: ' + this.ac.appSettings.buildVersion + ' Restarting the application...');
        setTimeout(function () {
            _this.restartApp();
        }, 3000);
    };
    SideNavComponent.prototype.checkForUpdates = function () {
        if (this.ac.appSettings.debug) {
            return;
        }
        var buildVersion = this.ac.getLocalStorage('buildVersion');
        if (!buildVersion) {
            this.updateVersionAndRestart();
            return;
        }
        if (buildVersion.buildVersion !== this.ac.appSettings.buildVersion) {
            this.updateVersionAndRestart();
            return;
        }
        if (navigator.onLine) {
            this.ac.isOnline = true;
            this.ac.toastrSuccess('This application is operating online as normal.');
        }
        else {
            this.ac.isOnline = false;
            this.ac.toastrWarning('This application is operating offline as normal.');
        }
    };
    SideNavComponent = __decorate([
        core_1.Component({
            selector: 'app-side-nav',
            templateUrl: './side-nav.component.html',
            providers: [appConfig_1.AppConfig, buildConfig_1.BuildConfig, ngx_motion_1.AppServices, messagePump_1.MessagePump]
        })
    ], SideNavComponent);
    return SideNavComponent;
}());
exports.SideNavComponent = SideNavComponent;
//# sourceMappingURL=side-nav.component.js.map