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
var messagePump_1 = require("../../common/messagePump");
var appServices_1 = require("../../shared/ng2-apphelper/appServices");
var side_nav_component_state_1 = require("./side-nav.component.state");
var side_nav_component_actions_1 = require("./side-nav.component.actions");
var SideNavComponent = /** @class */ (function () {
    function SideNavComponent(store, route, router, ac, as, zone, cdr) {
        var _this = this;
        this.store = store;
        this.route = route;
        this.router = router;
        this.ac = ac;
        this.as = as;
        this.zone = zone;
        this.cdr = cdr;
        this.subtitle = '';
        this.sideNavState = new side_nav_component_state_1.SideNavStateModel();
        this.autoStartActionsRecording = false;
        this.mediaMatcher = matchMedia("(max-width: " + this.ac.smallWidthBreakpoint + "px)");
        this.mediaMatcher.addEventListener('change', function () {
            _this.mediaMatcher = matchMedia("(max-width: " + _this.ac.smallWidthBreakpoint + "px)");
        });
        this.store.dispatch(new side_nav_component_actions_1.SideNavInit(this.ac.ngAction));
        this.stateChanges();
        if (this.autoStartActionsRecording) {
            this.recordStateChanges();
        }
    }
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
                // RequestAppSettings
                if (sideNavState.requestAppSettings) {
                    _this.getAppSettings();
                }
                // ResponseAppSettings - patchState only
                // NavigateTo
                if (sideNavState.featureName !== sideNavState.previousState.featureName) {
                    _this.routerNavigate(sideNavState.featureName);
                }
            }
        });
    };
    SideNavComponent.prototype.ngOnInit = function () {
        var _this = this;
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
    SideNavComponent.prototype.getAppSettings = function () {
        var _this = this;
        this.sideNavState.requestAppSettings = false;
        this.ac.getAppSettings(function () {
            _this.store.dispatch(new side_nav_component_actions_1.ResponseAppSettings('', 'ResponseSettings', _this.ac.appSettings, false, -1));
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
    SideNavComponent.prototype.restartApp = function () {
        window.location.href = this.appHref;
    };
    SideNavComponent.prototype.navigateForward = function () {
        var _this = this;
        setTimeout(function () {
            var navigateTo = _this.ac.getLocalStorage('navigateTo');
            if (navigateTo) {
                _this.navigateTo(navigateTo.feature);
            }
            else {
                _this.navigateTo('/splash');
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
        this.ac.setLocalStorage('apiVersions', { vn: this.ac.apiVersions });
        this.ac.toastrInfo('Updating to latest version: ' + this.ac.apiVersions.application + ' Restarting the application...');
        setTimeout(function () {
            _this.restartApp();
        }, 3000);
    };
    SideNavComponent.prototype.checkForUpdates = function () {
        if (this.ac.appSettings.debug) {
            return;
        }
        var apiVersions = this.ac.getLocalStorage('apiVersions');
        if (!apiVersions) {
            this.updateVersionAndRestart();
            return;
        }
        if (apiVersions.vn.application !== this.ac.apiVersions.application) {
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
            providers: [appConfig_1.AppConfig, appServices_1.AppServices, messagePump_1.MessagePump]
        })
    ], SideNavComponent);
    return SideNavComponent;
}());
exports.SideNavComponent = SideNavComponent;
//# sourceMappingURL=side-nav.component.js.map