(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "../../common/appConfig.ts":
/*!********************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/common/appConfig.ts ***!
  \********************************************************************************/
/*! exports provided: AppConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppConfig", function() { return AppConfig; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "../../node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _shared_enterprise_apiService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/enterprise/apiService */ "../../shared/enterprise/apiService.ts");
/* harmony import */ var _shared_client_side_models_buildModels__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/client-side-models/buildModels */ "../../shared/client-side-models/buildModels.ts");
/* harmony import */ var _shared_client_side_models_analyticsData__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/client-side-models/analyticsData */ "../../shared/client-side-models/analyticsData.ts");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! moment */ "../../node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material */ "../../node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_enterprise_timingmetrics__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../shared/enterprise/timingmetrics */ "../../shared/enterprise/timingmetrics.ts");
/* harmony import */ var _src_environments_environment__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../src/environments/environment */ "../../src/environments/environment.ts");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ngxs/store */ "../../node_modules/@ngxs/store/fesm5/ngxs-store.js");

// #region Imports











// ngxs

// #endregion
var AppConfig = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](AppConfig, _super);
    function AppConfig(route, snackBar, store, http) {
        var _this = _super.call(this, http, store) || this;
        _this.route = route;
        _this.snackBar = snackBar;
        _this.store = store;
        _this.http = http;
        _this.appSettings = new _shared_client_side_models_buildModels__WEBPACK_IMPORTED_MODULE_4__["AppSettings"]();
        _this.analyticsData = new _shared_client_side_models_analyticsData__WEBPACK_IMPORTED_MODULE_5__["AnalyticsData"]();
        _this.isPhoneSize = false;
        _this.isLandscapeView = false;
        _this.isInitialized = false;
        _this.isSpinnerAvailable = false;
        _this.isSpinnerVisible = false;
        _this.isStandAlone = false;
        _this.isOnline = true;
        _this.screenWidth = 0;
        _this.screenHeight = 0;
        _this.smallWidthBreakpoint = 720;
        _this.headerHeight = 200;
        _this.sideNavWidth = 400;
        _this.mapControlsHeight = 275;
        _this.mapControlsWidth = 300;
        _this.mediaQueryBreak = 1280;
        _this.tm = new _shared_enterprise_timingmetrics__WEBPACK_IMPORTED_MODULE_10__["TimingMetrics"]('getAppSettings');
        return _this;
    }
    AppConfig.prototype.getRouteData = function () {
        var currentRoute = this.route.root;
        while (currentRoute.children[0] !== undefined) {
            currentRoute = currentRoute.children[0];
        }
        return currentRoute.snapshot.data;
    };
    AppConfig.prototype.getHelpFileHtml = function (helpFile, success) {
        this.http.get(helpFile, { responseType: 'text' }).subscribe(function (html) {
            success(html);
        });
    };
    AppConfig.prototype.showSpinner = function (show) {
        var _this = this;
        if (show) {
            this.isSpinnerAvailable = true;
            setTimeout(function () {
                _this.isSpinnerVisible = true;
            });
        }
        else {
            this.isSpinnerVisible = false;
            setTimeout(function () {
                _this.isSpinnerAvailable = false;
            }, 1000);
        }
    };
    AppConfig.prototype.updateAnalytics = function () {
        this.analyticsData = this.getLocalStorage('analyticsData');
        if (!this.analyticsData) {
            this.analyticsData = new _shared_client_side_models_analyticsData__WEBPACK_IMPORTED_MODULE_5__["AnalyticsData"]();
        }
        this.analyticsData.exceptions = lodash__WEBPACK_IMPORTED_MODULE_7__["map"](this.analyticsData.exceptions, function (a) {
            a.dateString = moment__WEBPACK_IMPORTED_MODULE_6__(a.date).format('YYYY-MM-DD');
            a.timeString = moment__WEBPACK_IMPORTED_MODULE_6__(a.date).format('HH:mm:ss');
            return a;
        });
        var totalResponseTime = 0;
        this.analyticsData.performances = lodash__WEBPACK_IMPORTED_MODULE_7__["map"](this.analyticsData.performances, function (a) {
            a.dateString = moment__WEBPACK_IMPORTED_MODULE_6__(a.date).format('YYYY-MM-DD');
            a.timeString = moment__WEBPACK_IMPORTED_MODULE_6__(a.date).format('HH:mm:ss');
            totalResponseTime += a.responseTime;
            return a;
        });
        if (this.analyticsData.performances.length === 0) {
            this.analyticsData.averageResponseTime = 0;
        }
        else {
            this.analyticsData.averageResponseTime = Math.round(totalResponseTime / this.analyticsData.performances.length);
        }
    };
    AppConfig.prototype.clearExceptions = function () {
        this.analyticsData.exceptions.length = 0;
        this.setLocalStorage('analyticsData', this.analyticsData);
    };
    AppConfig.prototype.clearResponseTime = function () {
        this.analyticsData.performances.length = 0;
        this.analyticsData.averageResponseTime = 0;
        this.setLocalStorage('analyticsData', this.analyticsData);
    };
    AppConfig.prototype.logResonseData = function (responseTime) {
        var analyticsData = this.getLocalStorage('analyticsData');
        if (analyticsData.performances.length > 9) {
            analyticsData.performances.pop();
        }
        var performance = new _shared_client_side_models_analyticsData__WEBPACK_IMPORTED_MODULE_5__["Performance"]();
        performance.date = new Date();
        performance.responseTime = responseTime;
        analyticsData.performances.unshift(performance);
        this.setLocalStorage('analyticsData', analyticsData);
    };
    AppConfig.prototype.waitUntilInitialized = function (callback) {
        var _this = this;
        var intervalTimer = setInterval(function () {
            if (_this.isInitialized) {
                clearInterval(intervalTimer);
                callback();
            }
        }, 1000);
    };
    AppConfig.prototype.getAppSettings = function (success, error) {
        var _this = this;
        this.isStandAlone = window.matchMedia('(display-mode: standalone)').matches;
        try {
            this.tm.setStartMarker();
        }
        catch (e) { }
        this.get(_src_environments_environment__WEBPACK_IMPORTED_MODULE_11__["environment"].api.getSysInfo, function (appSettings) {
            appSettings.apiVersions.angular = _angular_core__WEBPACK_IMPORTED_MODULE_1__["VERSION"].full;
            _this.setLocalStorage('appSettings', appSettings);
            try {
                _this.tm.setEndMarker();
                _this.logResonseData(_this.tm.measureInterval());
            }
            catch (e) { }
            _this.appSettings = appSettings;
            _this.isInitialized = true;
            success();
        }, function (errorMessage) {
            _this.appSettings = _this.getLocalStorage('appSettings');
            if (!_this.appSettings) {
                _this.appSettings = new _shared_client_side_models_buildModels__WEBPACK_IMPORTED_MODULE_4__["AppSettings"]();
                _this.appSettings.debug = false;
                _this.appSettings.testing = false;
                _this.appSettings.buildVersion = 'xx.xx.xx';
                _this.appSettings.splashTime = 5000;
            }
            _this.isInitialized = true;
            error(errorMessage);
        });
    };
    AppConfig.prototype.sendTextMessage = function (textMessage, success, error) {
        this.post(textMessage, _src_environments_environment__WEBPACK_IMPORTED_MODULE_11__["environment"].api.sendTextMessage, function () {
            success();
        }, function (errorMessage) {
            error(errorMessage);
            // this error is generated from the service worker, because of a post
        });
    };
    AppConfig.prototype.onResizeApp = function () {
        if (screen.availWidth <= 767) {
            this.isPhoneSize = true;
        }
        else {
            this.isPhoneSize = false;
        }
        this.onOrientationChange();
        this.screenWidth = this.getScreenWidth();
        this.screenHeight = this.getScreenHeight();
    };
    AppConfig.prototype.onOrientationChange = function () {
        if (screen.availWidth > screen.availHeight) {
            this.isLandscapeView = true;
        }
        else {
            this.isLandscapeView = false;
        }
    };
    AppConfig.prototype.getScreenWidth = function () {
        if (this.isPhoneSize) {
            return screen.availWidth;
        }
        else {
            return document.body.clientWidth;
        }
    };
    AppConfig.prototype.getScreenHeight = function () {
        if (this.isPhoneSize) {
            return screen.availHeight;
        }
        else {
            return document.body.clientHeight;
        }
    };
    AppConfig.prototype.toastrSuccess = function (message, duration$) {
        if (!duration$) {
            duration$ = 3000;
        }
        this.snackBar.open(message, 'X', {
            duration: duration$,
            panelClass: ['snackbar-success']
        });
    };
    AppConfig.prototype.toastrError = function (message, duration$) {
        if (!duration$) {
            duration$ = -1;
        }
        this.snackBar.open(message, 'X', {
            duration: duration$,
            panelClass: ['snackbar-error']
        });
        setTimeout(function () {
            var toastr = document.querySelector('.mat-snack-bar-container');
            toastr.style.maxWidth = '100%';
        }, 0);
    };
    AppConfig.prototype.toastrWarning = function (message, duration$) {
        if (!duration$) {
            duration$ = 3000;
        }
        this.snackBar.open(message, 'X', {
            duration: duration$,
            panelClass: ['snackbar-warning']
        });
    };
    AppConfig.prototype.toastrInfo = function (message, duration$) {
        if (!duration$) {
            duration$ = 3000;
        }
        this.snackBar.open(message, 'X', {
            duration: duration$,
            panelClass: ['snackbar-info']
        });
    };
    AppConfig.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_9__["ActivatedRoute"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatSnackBar"] },
        { type: _ngxs_store__WEBPACK_IMPORTED_MODULE_12__["Store"] },
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    AppConfig = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_9__["ActivatedRoute"],
            _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatSnackBar"],
            _ngxs_store__WEBPACK_IMPORTED_MODULE_12__["Store"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], AppConfig);
    return AppConfig;
}(_shared_enterprise_apiService__WEBPACK_IMPORTED_MODULE_3__["ApiService"]));



/***/ }),

/***/ "../../common/ngAction.ts":
/*!*******************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/common/ngAction.ts ***!
  \*******************************************************************************/
/*! exports provided: Action, NgAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Action", function() { return Action; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgAction", function() { return NgAction; });
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngxs/store */ "../../node_modules/@ngxs/store/fesm5/ngxs-store.js");
/* harmony import */ var _src_app_side_nav_component_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/app/side-nav.component.actions */ "../../src/app/side-nav.component.actions.ts");
/* harmony import */ var _features_mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../features/mobileApis.component.actions */ "../../features/mobileApis.component.actions.ts");



var Action = /** @class */ (function () {
    function Action() {
    }
    return Action;
}());

var NgAction = /** @class */ (function () {
    function NgAction(store) {
        this.store = store;
        this.actionsQueue = new Array(); // fills as new actions are dispatched
        this.currentIndex = -1;
        this.recording = false;
        this.dispatching = false;
        this.lastTicks = 0;
        this.continuation = false;
        NgAction.store = store;
    }
    NgAction.getInstance = function (store) {
        if (!NgAction.instance) {
            NgAction.instance = new NgAction(store);
        }
        return NgAction.instance;
    };
    NgAction.prototype.startRecording = function () {
        this.recording = true;
        this.lastTicks = 0;
    };
    NgAction.prototype.stopRecording = function () {
        this.recording = false;
    };
    NgAction.prototype.isRecording = function () {
        return this.recording;
    };
    NgAction.prototype.isDispatching = function () {
        return this.dispatching;
    };
    NgAction.prototype.appendToQueue = function (action) {
        if (this.recording) {
            var currentTicks = new Date().getTime();
            if (this.lastTicks === 0) {
                action.delay = 1000;
            }
            else {
                action.delay = currentTicks - this.lastTicks;
            }
            this.lastTicks = currentTicks;
            this.actionsQueue.push(action);
            this.currentIndex = this.actionsQueue.length - 1;
        }
    };
    NgAction.prototype.clearQueue = function () {
        this.actionsQueue.length = 0;
        this.currentIndex = -1;
    };
    NgAction.prototype.getLatestIndex = function () {
        return this.currentIndex;
    };
    NgAction.prototype.setLatestIndex = function (index) {
        this.currentIndex = index;
    };
    NgAction.prototype.singleAction = function (index) {
        this.recording = false;
        this.dispatching = false;
        this.store.dispatch(this.actionsQueue[index]);
        this.currentIndex = index;
    };
    NgAction.prototype.playback = function () {
        var _this = this;
        this.dispatching = true;
        this.recording = false;
        var playbackDelay;
        if (this.currentIndex === this.actionsQueue.length - 1) {
            this.continuation = false;
            playbackDelay = 2000;
            this.currentIndex = -1; // from the beginning
        }
        else {
            this.continuation = true;
            this.currentIndex++;
            playbackDelay = 500; // continuation
        }
        setTimeout(function () { _this.playbackDelayed(); }, playbackDelay);
    };
    NgAction.prototype.playbackDelayed = function () {
        var _this = this;
        this.store.dispatch({ type: '@@INIT' });
        this.store.dispatch({ type: '@@UPDATE_STATE' });
        var delay = 0;
        if (this.currentIndex === -1) {
            this.currentIndex = 0;
        }
        var _loop_1 = function (i) {
            var action = this_1.actionsQueue[i];
            if (action.playback) {
                if (this_1.continuation) {
                    this_1.continuation = false;
                }
                else {
                    delay += action.delay;
                }
                setTimeout(function () {
                    _this.currentIndex = i;
                    _this.store.dispatch(action);
                    if (i === _this.actionsQueue.length - 1) {
                        _this.dispatching = false;
                    }
                }, delay);
            }
        };
        var this_1 = this;
        for (var i = this.currentIndex; i < this.actionsQueue.length; i++) {
            _loop_1(i);
        }
    };
    NgAction.prototype.replaceActionsQueue = function (actionsQueue) {
        var _this = this;
        var newActionsArray = new Array();
        actionsQueue.forEach(function (action) {
            newActionsArray.push(_this.createNewAction(action));
        });
        this.actionsQueue = newActionsArray;
        this.setLatestIndex(this.actionsQueue.length - 1);
    };
    NgAction.prototype.createNewAction = function (action) {
        switch (action.name) {
            case 'NavigateTo':
                return new _src_app_side_nav_component_actions__WEBPACK_IMPORTED_MODULE_1__["NavigateTo"](action.name, action.title, action.payload, action.playback, action.delay - 0);
            case 'ChangeTab':
                return new _features_mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_2__["ChangeTabIndex"](action.name, action.title, action.payload, action.playback, action.delay - 0);
            case 'SpellChecking':
                return new _features_mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_2__["ToggleSpellChecking"](action.name, action.title, action.payload, action.playback, action.delay - 0);
            case 'UpdateMessage':
                return new _features_mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_2__["UpdateTextMessage"](action.name, action.title, action.payload, action.playback, action.delay - 0);
            case 'ClearMessage':
                return new _features_mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_2__["ClearTextMessage"](action.name, action.title, action.payload, action.playback, action.delay - 0);
            default:
                throw new Error('Action type not found!');
        }
    };
    NgAction.ctorParameters = function () { return [
        { type: _ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Store"] }
    ]; };
    return NgAction;
}());



/***/ }),

/***/ "../../features/base.help.dialog.ts":
/*!*****************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/features/base.help.dialog.ts ***!
  \*****************************************************************************************/
/*! exports provided: BaseHelpDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseHelpDialogComponent", function() { return BaseHelpDialogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "../../node_modules/@angular/material/esm5/dialog.es5.js");



var BaseHelpDialogComponent = /** @class */ (function () {
    function BaseHelpDialogComponent(data) {
        this.data = data;
        // data contains values passed by the router
    }
    BaseHelpDialogComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"],] }] }
    ]; };
    BaseHelpDialogComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'base-help-dialog',
            template: __webpack_require__(/*! raw-loader!./base.help.dialog.html */ "../../node_modules/raw-loader/index.js!../../features/base.help.dialog.html")
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object])
    ], BaseHelpDialogComponent);
    return BaseHelpDialogComponent;
}());



/***/ }),

/***/ "../../features/mobileApis.component.actions.ts":
/*!*****************************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/features/mobileApis.component.actions.ts ***!
  \*****************************************************************************************************/
/*! exports provided: ChangeTabIndex, ToggleSpellChecking, UpdateTextMessage, ClearTextMessage, ChangeMobileCarrier, UpdateMobileNumber, MobileApiInit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChangeTabIndex", function() { return ChangeTabIndex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToggleSpellChecking", function() { return ToggleSpellChecking; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateTextMessage", function() { return UpdateTextMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClearTextMessage", function() { return ClearTextMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChangeMobileCarrier", function() { return ChangeMobileCarrier; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateMobileNumber", function() { return UpdateMobileNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MobileApiInit", function() { return MobileApiInit; });
var ChangeTabIndex = /** @class */ (function () {
    function ChangeTabIndex(name, title, payload, playback, delay) {
        this.name = name;
        this.title = title;
        this.payload = payload;
        this.playback = playback;
        this.delay = delay;
    }
    ChangeTabIndex.type = '[mobileApi] ChangeTabIndex';
    ChangeTabIndex.ctorParameters = function () { return [
        { type: String },
        { type: String },
        { type: Number },
        null,
        { type: Number }
    ]; };
    return ChangeTabIndex;
}());

var ToggleSpellChecking = /** @class */ (function () {
    function ToggleSpellChecking(name, title, payload, playback, delay) {
        this.name = name;
        this.title = title;
        this.payload = payload;
        this.playback = playback;
        this.delay = delay;
    }
    ToggleSpellChecking.type = '[mobileApi] ToggleSpellChecking';
    ToggleSpellChecking.ctorParameters = function () { return [
        { type: String },
        { type: String },
        { type: Boolean },
        null,
        { type: Number }
    ]; };
    return ToggleSpellChecking;
}());

var UpdateTextMessage = /** @class */ (function () {
    function UpdateTextMessage(name, title, payload, playback, delay) {
        this.name = name;
        this.title = title;
        this.payload = payload;
        this.playback = playback;
        this.delay = delay;
    }
    UpdateTextMessage.type = '[mobileApi] UpdateTextMessage';
    UpdateTextMessage.ctorParameters = function () { return [
        { type: String },
        { type: String },
        { type: String },
        null,
        { type: Number }
    ]; };
    return UpdateTextMessage;
}());

var ClearTextMessage = /** @class */ (function () {
    function ClearTextMessage(name, title, payload, playback, delay) {
        this.name = name;
        this.title = title;
        this.payload = payload;
        this.playback = playback;
        this.delay = delay;
    }
    ClearTextMessage.type = '[mobileApi] ClearTextMessage';
    ClearTextMessage.ctorParameters = function () { return [
        { type: String },
        { type: String },
        { type: Boolean },
        null,
        { type: Number }
    ]; };
    return ClearTextMessage;
}());

var ChangeMobileCarrier = /** @class */ (function () {
    function ChangeMobileCarrier(name, title, payload, playback, delay) {
        this.name = name;
        this.title = title;
        this.payload = payload;
        this.playback = playback;
        this.delay = delay;
    }
    ChangeMobileCarrier.type = '[mobileApi] ChangeMobileCarrier';
    ChangeMobileCarrier.ctorParameters = function () { return [
        { type: String },
        { type: String },
        { type: String },
        null,
        { type: Number }
    ]; };
    return ChangeMobileCarrier;
}());

var UpdateMobileNumber = /** @class */ (function () {
    function UpdateMobileNumber(name, title, payload, playback, delay) {
        this.name = name;
        this.title = title;
        this.payload = payload;
        this.playback = playback;
        this.delay = delay;
    }
    UpdateMobileNumber.type = '[mobileApi] UpdateMobileNumber';
    UpdateMobileNumber.ctorParameters = function () { return [
        { type: String },
        { type: String },
        { type: Number },
        null,
        { type: Number }
    ]; };
    return UpdateMobileNumber;
}());

var MobileApiInit = /** @class */ (function () {
    function MobileApiInit(ngAction) {
        this.ngAction = ngAction;
    }
    MobileApiInit.type = '[mobileApi] MobileApiInit';
    MobileApiInit.ctorParameters = function () { return [
        { type: undefined }
    ]; };
    return MobileApiInit;
}());



/***/ }),

/***/ "../../features/mobileApis.component.state.ts":
/*!***************************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/features/mobileApis.component.state.ts ***!
  \***************************************************************************************************/
/*! exports provided: $MobileApisStateModel, MobileApisStateModel, MobileApisState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "$MobileApisStateModel", function() { return $MobileApisStateModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MobileApisStateModel", function() { return MobileApisStateModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MobileApisState", function() { return MobileApisState; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngxs/store */ "../../node_modules/@ngxs/store/fesm5/ngxs-store.js");
/* harmony import */ var _mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mobileApis.component.actions */ "../../features/mobileApis.component.actions.ts");



var $MobileApisStateModel = /** @class */ (function () {
    function $MobileApisStateModel() {
        this.selectedIndex = 0;
        this.spellCheckingEnabled = false;
        this.clearTextMessage = false;
        this.textMessage = '';
        this.mobileCarrier = '';
        this.mobileNumber = null;
    }
    return $MobileApisStateModel;
}());

var MobileApisStateModel = /** @class */ (function () {
    function MobileApisStateModel() {
        this.selectedIndex = 0;
        this.spellCheckingEnabled = false;
        this.clearTextMessage = false;
        this.textMessage = '';
        this.mobileCarrier = '';
        this.mobileNumber = null;
        this.previousState = new $MobileApisStateModel();
    }
    return MobileApisStateModel;
}());

var MobileApisState = /** @class */ (function () {
    function MobileApisState() {
    }
    MobileApisState.prototype.action01 = function (_a, _b) {
        var patchState = _a.patchState;
        var name = _b.name, title = _b.title, payload = _b.payload, playback = _b.playback, delay = _b.delay;
        patchState({ selectedIndex: payload });
        this.ngAction.appendToQueue(new _mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_2__["ChangeTabIndex"](name, title, payload, playback, delay));
    };
    MobileApisState.prototype.action02 = function (_a, _b) {
        var patchState = _a.patchState;
        var name = _b.name, title = _b.title, payload = _b.payload, playback = _b.playback, delay = _b.delay;
        patchState({ spellCheckingEnabled: payload });
        this.ngAction.appendToQueue(new _mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_2__["ToggleSpellChecking"](name, title, payload, playback, delay));
    };
    MobileApisState.prototype.action03 = function (_a, _b) {
        var patchState = _a.patchState;
        var name = _b.name, title = _b.title, payload = _b.payload, playback = _b.playback, delay = _b.delay;
        patchState({ clearTextMessage: payload });
        this.ngAction.appendToQueue(new _mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_2__["ClearTextMessage"](name, title, payload, playback, delay));
    };
    MobileApisState.prototype.action04 = function (_a, _b) {
        var patchState = _a.patchState;
        var name = _b.name, title = _b.title, payload = _b.payload, playback = _b.playback, delay = _b.delay;
        patchState({ textMessage: payload });
        this.ngAction.appendToQueue(new _mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_2__["UpdateTextMessage"](name, title, payload, playback, delay));
    };
    MobileApisState.prototype.action05 = function (_a, _b) {
        var patchState = _a.patchState;
        var name = _b.name, title = _b.title, payload = _b.payload, playback = _b.playback, delay = _b.delay;
        patchState({ mobileCarrier: payload });
        this.ngAction.appendToQueue(new _mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_2__["ChangeMobileCarrier"](name, title, payload, playback, delay));
    };
    MobileApisState.prototype.action06 = function (_a, _b) {
        var patchState = _a.patchState;
        var name = _b.name, title = _b.title, payload = _b.payload, playback = _b.playback, delay = _b.delay;
        patchState({ mobileNumber: payload });
        this.ngAction.appendToQueue(new _mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_2__["UpdateMobileNumber"](name, title, payload, playback, delay));
    };
    MobileApisState.prototype.action07 = function (_a, _b) {
        var patchState = _a.patchState;
        var ngAction = _b.ngAction;
        patchState({ selectedIndex: 0 });
        patchState({ spellCheckingEnabled: false });
        patchState({ clearTextMessage: false });
        patchState({ textMessage: '' });
        patchState({ mobileCarrier: '' });
        patchState({ mobileNumber: null });
        patchState({ previousState: new $MobileApisStateModel() });
        this.ngAction = ngAction;
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Action"])(_mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_2__["ChangeTabIndex"]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object, _mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_2__["ChangeTabIndex"]]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
    ], MobileApisState.prototype, "action01", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Action"])(_mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_2__["ToggleSpellChecking"]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object, _mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_2__["ToggleSpellChecking"]]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
    ], MobileApisState.prototype, "action02", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Action"])(_mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_2__["ClearTextMessage"]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object, _mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_2__["ClearTextMessage"]]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
    ], MobileApisState.prototype, "action03", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Action"])(_mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_2__["UpdateTextMessage"]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object, _mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_2__["UpdateTextMessage"]]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
    ], MobileApisState.prototype, "action04", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Action"])(_mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_2__["ChangeMobileCarrier"]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object, _mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_2__["ChangeMobileCarrier"]]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
    ], MobileApisState.prototype, "action05", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Action"])(_mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_2__["UpdateMobileNumber"]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object, _mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_2__["UpdateMobileNumber"]]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
    ], MobileApisState.prototype, "action06", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Action"])(_mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_2__["MobileApiInit"]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object, _mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_2__["MobileApiInit"]]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
    ], MobileApisState.prototype, "action07", null);
    MobileApisState = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["State"])({
            name: 'mobileApis',
            defaults: new MobileApisStateModel()
        })
    ], MobileApisState);
    return MobileApisState;
}());



/***/ }),

/***/ "../../features/mobileApis.component.ts":
/*!*********************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/features/mobileApis.component.ts ***!
  \*********************************************************************************************/
/*! exports provided: MobileApisComponent, MobileApisHelpDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MobileApisComponent", function() { return MobileApisComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MobileApisHelpDialogComponent", function() { return MobileApisHelpDialogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "../../node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var _common_appConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/appConfig */ "../../common/appConfig.ts");
/* harmony import */ var _shared_ng2_mobiletech_speechToText__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/ng2-mobiletech/speechToText */ "../../shared/ng2-mobiletech/speechToText.ts");
/* harmony import */ var _shared_ng2_mobiletech_textToSpeech__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/ng2-mobiletech/textToSpeech */ "../../shared/ng2-mobiletech/textToSpeech.ts");
/* harmony import */ var _shared_ng2_mobiletech_googleMaps__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/ng2-mobiletech/googleMaps */ "../../shared/ng2-mobiletech/googleMaps.ts");
/* harmony import */ var _shared_ng2_apphelper_appServices__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/ng2-apphelper/appServices */ "../../shared/ng2-apphelper/appServices.ts");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngxs/store */ "../../node_modules/@ngxs/store/fesm5/ngxs-store.js");
/* harmony import */ var _mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./mobileApis.component.actions */ "../../features/mobileApis.component.actions.ts");
/* harmony import */ var _mobileApis_component_state__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./mobileApis.component.state */ "../../features/mobileApis.component.state.ts");

// #region Imports


// services





// ngxs



// #endregions
// #region Constructor
var MobileApisComponent = /** @class */ (function () {
    function MobileApisComponent(store, ac, cd, as) {
        this.store = store;
        this.ac = ac;
        this.cd = cd;
        this.as = as;
        this.selectedIndex = 0;
        this.isViewVisible = false;
        this.speechRecognitionOn = false;
        this.speechRecognitionPaused = false;
        this.showSpeechToText = false;
        this.showTextToSpeech = false;
        this.latitude = 0;
        this.longitude = 0;
        this.address = '';
        this.zipcode = '';
        this.showTextArea = true;
        this.showToggleGroup = false;
        this.cellCarriers = new Array();
        this.textAreaMinRowCount = 4;
        this.mobileNumberMaxLength = 10;
        this.gmHeaderHeight = 80;
        this.gmTextHeight = 230;
        this.mobileApisState = new _mobileApis_component_state__WEBPACK_IMPORTED_MODULE_10__["MobileApisStateModel"]();
        this.store.dispatch(new _mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_9__["MobileApiInit"](this.ac.ngAction));
        this.stateChanges();
    }
    MobileApisComponent.prototype.stateChanges = function () {
        var _this = this;
        this.store.subscribe(function (state) {
            if (state.mobileApis) {
                var mobileApisState = state.mobileApis;
                mobileApisState.previousState = _this.mobileApisState;
                _this.mobileApisState = mobileApisState;
                if (mobileApisState.selectedIndex !== mobileApisState.previousState.selectedIndex) {
                    _this.updateTabIndex(mobileApisState.selectedIndex);
                }
                if (mobileApisState.spellCheckingEnabled !== mobileApisState.previousState.spellCheckingEnabled) {
                    _this.spellCheck();
                }
                if (mobileApisState.clearTextMessage !== mobileApisState.previousState.clearTextMessage) {
                    setTimeout(function () {
                        _this.clearTextMessage();
                    }, 500); // Adding motion
                }
            }
        });
    };
    MobileApisComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ac.waitUntilInitialized(function () {
            _this.isViewVisible = true;
            _this.updateCellCarriers();
            setTimeout(function () {
                _this.showToggleGroup = true;
                _this.initGoogleMaps();
            }, 0);
        });
    };
    // #endregion
    MobileApisComponent.prototype.onChangeTab = function (selectedIndex) {
        if (!this.ac.ngAction.isDispatching()) {
            this.store.dispatch(new _mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_9__["ChangeTabIndex"]('ChangeTab', 'Click Tab', selectedIndex, true, -1));
        }
    };
    MobileApisComponent.prototype.updateTabIndex = function (selectedIndex) {
        this.selectedIndex = selectedIndex;
    };
    //#region Speech To Text:
    MobileApisComponent.prototype.onClickSpeechToText = function () {
        var _this = this;
        if (!this.s2T.featureIsAvailable) {
            this.unavailableFeature('Speech to Text');
            return;
        }
        this.s2T.owner = this;
        this.s2T.onRestartCallback = function () {
            // Don't do anything for now
        };
        this.s2T.onResultsCallback = function (speech) {
            _this.store.dispatch(new _mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_9__["UpdateTextMessage"]('UpdateMessage', 'Enter Message', _this.mobileApisState.textMessage + speech, true, -1));
            _this.cd.detectChanges();
        };
        this.s2T.isClosable = true;
        this.s2T.positionTop = -75;
        this.showSpeechToText = false;
        this.store.dispatch(new _mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_9__["UpdateTextMessage"]('UpdateMessage', 'Enter Message', '', true, -1));
        setTimeout(function () {
            _this.showSpeechToText = true;
        });
    };
    MobileApisComponent.prototype.onChangeTextMessage = function (text) {
        this.store.dispatch(new _mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_9__["UpdateTextMessage"]('UpdateMessage', 'Enter Message', text, true, -1));
    };
    MobileApisComponent.prototype.unavailableFeature = function (feature) {
        var _this = this;
        this.ac.toastrInfo(feature + ' is unavailable with this browser...');
        setTimeout(function () {
            _this.ac.toastrInfo('Upgrade to Google Chrome!');
        }, 5000);
    };
    MobileApisComponent.prototype.onClickTextToSpeech = function () {
        var _this = this;
        if (!this.t2S.featureIsAvailable) {
            this.unavailableFeature('Text to Speech');
            return;
        }
        this.t2S.textToSpeak = this.mobileApisState.textMessage;
        this.t2S.isClosable = true;
        this.t2S.positionTop = -75;
        this.t2S.owner = this;
        this.t2S.onChangeCallback = function (text) {
            // Speech completed, paused, or stopped
        };
        this.showTextToSpeech = false;
        setTimeout(function () {
            _this.showTextToSpeech = true;
        });
    };
    MobileApisComponent.prototype.onClickClearTextMessage = function () {
        this.store.dispatch(new _mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_9__["ClearTextMessage"]('ClearMessage', 'Clear Message', true, true, -1));
    };
    MobileApisComponent.prototype.clearTextMessage = function () {
        this.mobileApisState.textMessage = '';
        this.mobileApisState.clearTextMessage = false;
    };
    MobileApisComponent.prototype.onClickSpellCheck = function (spellCheck) {
        this.store.dispatch(new _mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_9__["ToggleSpellChecking"]('SpellChecking', 'SpellChecking', spellCheck, true, -1));
    };
    MobileApisComponent.prototype.spellCheck = function () {
        var _this = this;
        if (this.mobileApisState.spellCheckingEnabled) {
            var textArea = document.querySelector('.textAreaNgModel');
            if (this.mobileApisState.spellCheckingEnabled) {
                this.as.spellChecker(textArea);
            }
            else {
                textArea.focus();
            }
        }
        else {
            setTimeout(function () {
                _this.showTextArea = false;
                setTimeout(function () {
                    _this.showTextArea = true;
                });
            });
        }
    };
    MobileApisComponent.prototype.getRowCount = function () {
        try {
            var count = document.querySelector('.textAreaNgModel').value.split('\n').length;
            if (count > this.textAreaMinRowCount) {
                return count;
            }
            else {
                return this.textAreaMinRowCount;
            }
        }
        catch (e) {
            return this.textAreaMinRowCount;
        }
    };
    // #endregion
    //#region Text Messaging:
    MobileApisComponent.prototype.updateCellCarriers = function () {
        var _this = this;
        this.cellCarriers = new Array();
        this.ac.appSettings.cellCarriers.split(';').forEach(function (cellCarrier) {
            _this.cellCarriers.push({ name: cellCarrier.split(':')[0], smsProfile: cellCarrier.split(':')[1] });
        });
    };
    MobileApisComponent.prototype.onChangeCarrier = function (carrier) {
        // this.store.dispatch(new ChangeMobileCarrier(carrier));
        this.shouldSendBeDisabled();
    };
    MobileApisComponent.prototype.onKeyDown = function (event) {
        var mobileNumber = event.target.value;
        if (event.key === 'Backspace' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            return true;
        }
        if (mobileNumber.length === this.mobileNumberMaxLength) {
            return false;
        }
        else {
            return true;
        }
    };
    MobileApisComponent.prototype.onKeyUp = function (mobileNumber) {
        this.mobileNumber = mobileNumber;
        if (mobileNumber.toString().length === this.mobileNumberMaxLength) {
            // this.store.dispatch(new UpdateMobileNumber(mobileNumber));
        }
    };
    MobileApisComponent.prototype.shouldSendBeDisabled = function () {
        if (this.mobileApisState.mobileCarrier.length === 0) {
            return true;
        }
        if (!this.mobileNumber) {
            return true;
        }
        if (this.mobileNumber.toString().length < this.mobileNumberMaxLength) {
            return true;
        }
        return false;
    };
    MobileApisComponent.prototype.onClickSend = function () {
        var _this = this;
        this.ac.showSpinner(true);
        this.ac.sendTextMessage({
            message: this.mobileApisState.textMessage,
            cellCarrierName: this.mobileApisState.mobileCarrier,
            mobileNumber: this.mobileApisState.mobileNumber
        }, function () {
            _this.ac.showSpinner(false);
            _this.playAscending(0.01);
            _this.ac.toastrSuccess("Success: Your text message has been sent to: " + _this.mobileApisState.mobileNumber);
        }, function (errorMessage) {
            _this.ac.showSpinner(false);
            _this.ac.toastrError("Error: " + errorMessage);
        });
    };
    MobileApisComponent.prototype.playAscending = function (volume) {
        var _this = this;
        setTimeout(function () {
            _this.play4Ths(volume);
            setTimeout(function () {
                _this.play4Ths(volume / 2);
                setTimeout(function () {
                    _this.play4Ths(volume / 4);
                    setTimeout(function () {
                        _this.play4Ths(volume / 8);
                    }, 500);
                }, 500);
            }, 500);
        }, 500);
    };
    MobileApisComponent.prototype.play4Ths = function (volume) {
        var _this = this;
        setTimeout(function () {
            _this.as.beep(1500, 523.25, volume, 'sine', null);
            setTimeout(function () {
                _this.as.beep(1500, 698.46, volume, 'sine', null);
                setTimeout(function () {
                    _this.as.beep(1500, 932.33, volume, 'sine', null);
                    setTimeout(function () {
                        _this.as.beep(1500, 1244.51, volume, 'sine', null);
                    }, 250);
                }, 250);
            }, 250);
        }, 250);
    };
    // #endregion
    //#region GoogleMaps:
    MobileApisComponent.prototype.initGoogleMaps = function () {
        var _this = this;
        setTimeout(function () {
            _this.gm.owner = _this;
            _this.gm.updateCoordinatesCallback = 'updateCoordinatesCallback';
            _this.gm.updateAddressCallback = 'updateAddressCallback';
            _this.gm.googleMapKey = _this.ac.appSettings.googleMapKey;
            _this.gm.initialize();
        });
    };
    MobileApisComponent.prototype.updateAddressCallback = function (address, zipcode) {
        this.address = address;
        this.zipcode = zipcode;
    };
    MobileApisComponent.prototype.updateCoordinatesCallback = function (latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.gm.lookupAddress();
    };
    MobileApisComponent.prototype.shouldUpdateByAddressBeDisabled = function () {
        return this.address.trim().length === 0 || this.zipcode.toString().trim().length < 5;
    };
    MobileApisComponent.prototype.calcGmTextWidth = function () {
        if (this.ac.isPhoneSize) {
            if (this.ac.isLandscapeView) {
                return this.ac.screenWidth / 3;
            }
            else {
                return this.ac.screenWidth - 70;
            }
        }
        return 270;
    };
    MobileApisComponent.prototype.getGmTextWidth = function () {
        return this.calcGmTextWidth();
    };
    MobileApisComponent.prototype.getMapWidth = function () {
        if (document.documentElement.clientWidth <= this.ac.smallWidthBreakpoint) {
            return document.documentElement.clientWidth;
        }
        if (document.documentElement.clientWidth <= this.ac.mediaQueryBreak) {
            return document.documentElement.clientWidth - (this.ac.sideNavWidth);
        }
        return document.documentElement.clientWidth - (this.ac.sideNavWidth + this.ac.mapControlsWidth);
    };
    MobileApisComponent.prototype.getMapHeight = function () {
        if (document.documentElement.clientWidth <= this.ac.mediaQueryBreak) {
            return document.documentElement.clientHeight - (this.ac.headerHeight + this.ac.mapControlsHeight);
        }
        return document.documentElement.clientHeight - this.ac.headerHeight;
    };
    MobileApisComponent.ctorParameters = function () { return [
        { type: _ngxs_store__WEBPACK_IMPORTED_MODULE_8__["Store"] },
        { type: _common_appConfig__WEBPACK_IMPORTED_MODULE_3__["AppConfig"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"] },
        { type: _shared_ng2_apphelper_appServices__WEBPACK_IMPORTED_MODULE_7__["AppServices"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_shared_ng2_mobiletech_speechToText__WEBPACK_IMPORTED_MODULE_4__["SpeechToTextComponent"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _shared_ng2_mobiletech_speechToText__WEBPACK_IMPORTED_MODULE_4__["SpeechToTextComponent"])
    ], MobileApisComponent.prototype, "s2T", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_shared_ng2_mobiletech_textToSpeech__WEBPACK_IMPORTED_MODULE_5__["TextToSpeechComponent"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _shared_ng2_mobiletech_textToSpeech__WEBPACK_IMPORTED_MODULE_5__["TextToSpeechComponent"])
    ], MobileApisComponent.prototype, "t2S", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_shared_ng2_mobiletech_googleMaps__WEBPACK_IMPORTED_MODULE_6__["GoogleMapsComponent"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _shared_ng2_mobiletech_googleMaps__WEBPACK_IMPORTED_MODULE_6__["GoogleMapsComponent"])
    ], MobileApisComponent.prototype, "gm", void 0);
    MobileApisComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            // #region template
            template: __webpack_require__(/*! raw-loader!./mobileApis.component.html */ "../../node_modules/raw-loader/index.js!../../features/mobileApis.component.html")
            // #endregion
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ngxs_store__WEBPACK_IMPORTED_MODULE_8__["Store"],
            _common_appConfig__WEBPACK_IMPORTED_MODULE_3__["AppConfig"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"],
            _shared_ng2_apphelper_appServices__WEBPACK_IMPORTED_MODULE_7__["AppServices"]])
    ], MobileApisComponent);
    return MobileApisComponent;
}());

var MobileApisHelpDialogComponent = /** @class */ (function () {
    function MobileApisHelpDialogComponent(data) {
        this.data = data;
    }
    MobileApisHelpDialogComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"],] }] }
    ]; };
    MobileApisHelpDialogComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            template: __webpack_require__(/*! raw-loader!./mobileApis.component.help.html */ "../../node_modules/raw-loader/index.js!../../features/mobileApis.component.help.html")
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object])
    ], MobileApisHelpDialogComponent);
    return MobileApisHelpDialogComponent;
}());



/***/ }),

/***/ "../../features/mobileApis.module.ts":
/*!******************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/features/mobileApis.module.ts ***!
  \******************************************************************************************/
/*! exports provided: MobileApisModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MobileApisModule", function() { return MobileApisModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_ng2_animation_appAnimation_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/ng2-animation/appAnimation.module */ "../../shared/ng2-animation/appAnimation.module.ts");
/* harmony import */ var _shared_ng2_mobiletech_mobileTech_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/ng2-mobiletech/mobileTech.module */ "../../shared/ng2-mobiletech/mobileTech.module.ts");
/* harmony import */ var _shared_ng2_apphelper_appHelper_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/ng2-apphelper/appHelper.module */ "../../shared/ng2-apphelper/appHelper.module.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _mobileApis_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./mobileApis.component */ "../../features/mobileApis.component.ts");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngxs/store */ "../../node_modules/@ngxs/store/fesm5/ngxs-store.js");
/* harmony import */ var _mobileApis_component_state__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./mobileApis.component.state */ "../../features/mobileApis.component.state.ts");
/* harmony import */ var _shared_modules_material_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../shared/modules/material.module */ "../../shared/modules/material.module.ts");












var MobileApisModule = /** @class */ (function () {
    function MobileApisModule() {
    }
    MobileApisModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _mobileApis_component__WEBPACK_IMPORTED_MODULE_7__["MobileApisComponent"],
            ],
            imports: [
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _shared_ng2_animation_appAnimation_module__WEBPACK_IMPORTED_MODULE_3__["AppAnimationModule"],
                _shared_ng2_mobiletech_mobileTech_module__WEBPACK_IMPORTED_MODULE_4__["MobileTechModule"],
                _shared_modules_material_module__WEBPACK_IMPORTED_MODULE_10__["MaterialModule"],
                _shared_ng2_apphelper_appHelper_module__WEBPACK_IMPORTED_MODULE_5__["AppHelperModule"].forRoot(),
                _angular_router__WEBPACK_IMPORTED_MODULE_6__["RouterModule"].forChild([
                    {
                        path: 'mobileApis',
                        component: _mobileApis_component__WEBPACK_IMPORTED_MODULE_7__["MobileApisComponent"],
                        data: { debugOnly: false, title: 'Mobile Apis', subtitle: 'Mobile API features', show: true, helpTemplate: _mobileApis_component__WEBPACK_IMPORTED_MODULE_7__["MobileApisHelpDialogComponent"] }
                    },
                ]),
                _ngxs_store__WEBPACK_IMPORTED_MODULE_8__["NgxsModule"].forFeature([
                    _mobileApis_component_state__WEBPACK_IMPORTED_MODULE_9__["MobileApisState"]
                ])
            ]
        })
    ], MobileApisModule);
    return MobileApisModule;
}());



/***/ }),

/***/ "../../node_modules/moment/locale sync recursive ^\\.\\/.*$":
/*!*****************************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/node_modules/moment/locale sync ^\.\/.*$ ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "../../node_modules/moment/locale/af.js",
	"./af.js": "../../node_modules/moment/locale/af.js",
	"./ar": "../../node_modules/moment/locale/ar.js",
	"./ar-dz": "../../node_modules/moment/locale/ar-dz.js",
	"./ar-dz.js": "../../node_modules/moment/locale/ar-dz.js",
	"./ar-kw": "../../node_modules/moment/locale/ar-kw.js",
	"./ar-kw.js": "../../node_modules/moment/locale/ar-kw.js",
	"./ar-ly": "../../node_modules/moment/locale/ar-ly.js",
	"./ar-ly.js": "../../node_modules/moment/locale/ar-ly.js",
	"./ar-ma": "../../node_modules/moment/locale/ar-ma.js",
	"./ar-ma.js": "../../node_modules/moment/locale/ar-ma.js",
	"./ar-sa": "../../node_modules/moment/locale/ar-sa.js",
	"./ar-sa.js": "../../node_modules/moment/locale/ar-sa.js",
	"./ar-tn": "../../node_modules/moment/locale/ar-tn.js",
	"./ar-tn.js": "../../node_modules/moment/locale/ar-tn.js",
	"./ar.js": "../../node_modules/moment/locale/ar.js",
	"./az": "../../node_modules/moment/locale/az.js",
	"./az.js": "../../node_modules/moment/locale/az.js",
	"./be": "../../node_modules/moment/locale/be.js",
	"./be.js": "../../node_modules/moment/locale/be.js",
	"./bg": "../../node_modules/moment/locale/bg.js",
	"./bg.js": "../../node_modules/moment/locale/bg.js",
	"./bm": "../../node_modules/moment/locale/bm.js",
	"./bm.js": "../../node_modules/moment/locale/bm.js",
	"./bn": "../../node_modules/moment/locale/bn.js",
	"./bn.js": "../../node_modules/moment/locale/bn.js",
	"./bo": "../../node_modules/moment/locale/bo.js",
	"./bo.js": "../../node_modules/moment/locale/bo.js",
	"./br": "../../node_modules/moment/locale/br.js",
	"./br.js": "../../node_modules/moment/locale/br.js",
	"./bs": "../../node_modules/moment/locale/bs.js",
	"./bs.js": "../../node_modules/moment/locale/bs.js",
	"./ca": "../../node_modules/moment/locale/ca.js",
	"./ca.js": "../../node_modules/moment/locale/ca.js",
	"./cs": "../../node_modules/moment/locale/cs.js",
	"./cs.js": "../../node_modules/moment/locale/cs.js",
	"./cv": "../../node_modules/moment/locale/cv.js",
	"./cv.js": "../../node_modules/moment/locale/cv.js",
	"./cy": "../../node_modules/moment/locale/cy.js",
	"./cy.js": "../../node_modules/moment/locale/cy.js",
	"./da": "../../node_modules/moment/locale/da.js",
	"./da.js": "../../node_modules/moment/locale/da.js",
	"./de": "../../node_modules/moment/locale/de.js",
	"./de-at": "../../node_modules/moment/locale/de-at.js",
	"./de-at.js": "../../node_modules/moment/locale/de-at.js",
	"./de-ch": "../../node_modules/moment/locale/de-ch.js",
	"./de-ch.js": "../../node_modules/moment/locale/de-ch.js",
	"./de.js": "../../node_modules/moment/locale/de.js",
	"./dv": "../../node_modules/moment/locale/dv.js",
	"./dv.js": "../../node_modules/moment/locale/dv.js",
	"./el": "../../node_modules/moment/locale/el.js",
	"./el.js": "../../node_modules/moment/locale/el.js",
	"./en-SG": "../../node_modules/moment/locale/en-SG.js",
	"./en-SG.js": "../../node_modules/moment/locale/en-SG.js",
	"./en-au": "../../node_modules/moment/locale/en-au.js",
	"./en-au.js": "../../node_modules/moment/locale/en-au.js",
	"./en-ca": "../../node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "../../node_modules/moment/locale/en-ca.js",
	"./en-gb": "../../node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "../../node_modules/moment/locale/en-gb.js",
	"./en-ie": "../../node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "../../node_modules/moment/locale/en-ie.js",
	"./en-il": "../../node_modules/moment/locale/en-il.js",
	"./en-il.js": "../../node_modules/moment/locale/en-il.js",
	"./en-nz": "../../node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "../../node_modules/moment/locale/en-nz.js",
	"./eo": "../../node_modules/moment/locale/eo.js",
	"./eo.js": "../../node_modules/moment/locale/eo.js",
	"./es": "../../node_modules/moment/locale/es.js",
	"./es-do": "../../node_modules/moment/locale/es-do.js",
	"./es-do.js": "../../node_modules/moment/locale/es-do.js",
	"./es-us": "../../node_modules/moment/locale/es-us.js",
	"./es-us.js": "../../node_modules/moment/locale/es-us.js",
	"./es.js": "../../node_modules/moment/locale/es.js",
	"./et": "../../node_modules/moment/locale/et.js",
	"./et.js": "../../node_modules/moment/locale/et.js",
	"./eu": "../../node_modules/moment/locale/eu.js",
	"./eu.js": "../../node_modules/moment/locale/eu.js",
	"./fa": "../../node_modules/moment/locale/fa.js",
	"./fa.js": "../../node_modules/moment/locale/fa.js",
	"./fi": "../../node_modules/moment/locale/fi.js",
	"./fi.js": "../../node_modules/moment/locale/fi.js",
	"./fo": "../../node_modules/moment/locale/fo.js",
	"./fo.js": "../../node_modules/moment/locale/fo.js",
	"./fr": "../../node_modules/moment/locale/fr.js",
	"./fr-ca": "../../node_modules/moment/locale/fr-ca.js",
	"./fr-ca.js": "../../node_modules/moment/locale/fr-ca.js",
	"./fr-ch": "../../node_modules/moment/locale/fr-ch.js",
	"./fr-ch.js": "../../node_modules/moment/locale/fr-ch.js",
	"./fr.js": "../../node_modules/moment/locale/fr.js",
	"./fy": "../../node_modules/moment/locale/fy.js",
	"./fy.js": "../../node_modules/moment/locale/fy.js",
	"./ga": "../../node_modules/moment/locale/ga.js",
	"./ga.js": "../../node_modules/moment/locale/ga.js",
	"./gd": "../../node_modules/moment/locale/gd.js",
	"./gd.js": "../../node_modules/moment/locale/gd.js",
	"./gl": "../../node_modules/moment/locale/gl.js",
	"./gl.js": "../../node_modules/moment/locale/gl.js",
	"./gom-latn": "../../node_modules/moment/locale/gom-latn.js",
	"./gom-latn.js": "../../node_modules/moment/locale/gom-latn.js",
	"./gu": "../../node_modules/moment/locale/gu.js",
	"./gu.js": "../../node_modules/moment/locale/gu.js",
	"./he": "../../node_modules/moment/locale/he.js",
	"./he.js": "../../node_modules/moment/locale/he.js",
	"./hi": "../../node_modules/moment/locale/hi.js",
	"./hi.js": "../../node_modules/moment/locale/hi.js",
	"./hr": "../../node_modules/moment/locale/hr.js",
	"./hr.js": "../../node_modules/moment/locale/hr.js",
	"./hu": "../../node_modules/moment/locale/hu.js",
	"./hu.js": "../../node_modules/moment/locale/hu.js",
	"./hy-am": "../../node_modules/moment/locale/hy-am.js",
	"./hy-am.js": "../../node_modules/moment/locale/hy-am.js",
	"./id": "../../node_modules/moment/locale/id.js",
	"./id.js": "../../node_modules/moment/locale/id.js",
	"./is": "../../node_modules/moment/locale/is.js",
	"./is.js": "../../node_modules/moment/locale/is.js",
	"./it": "../../node_modules/moment/locale/it.js",
	"./it-ch": "../../node_modules/moment/locale/it-ch.js",
	"./it-ch.js": "../../node_modules/moment/locale/it-ch.js",
	"./it.js": "../../node_modules/moment/locale/it.js",
	"./ja": "../../node_modules/moment/locale/ja.js",
	"./ja.js": "../../node_modules/moment/locale/ja.js",
	"./jv": "../../node_modules/moment/locale/jv.js",
	"./jv.js": "../../node_modules/moment/locale/jv.js",
	"./ka": "../../node_modules/moment/locale/ka.js",
	"./ka.js": "../../node_modules/moment/locale/ka.js",
	"./kk": "../../node_modules/moment/locale/kk.js",
	"./kk.js": "../../node_modules/moment/locale/kk.js",
	"./km": "../../node_modules/moment/locale/km.js",
	"./km.js": "../../node_modules/moment/locale/km.js",
	"./kn": "../../node_modules/moment/locale/kn.js",
	"./kn.js": "../../node_modules/moment/locale/kn.js",
	"./ko": "../../node_modules/moment/locale/ko.js",
	"./ko.js": "../../node_modules/moment/locale/ko.js",
	"./ku": "../../node_modules/moment/locale/ku.js",
	"./ku.js": "../../node_modules/moment/locale/ku.js",
	"./ky": "../../node_modules/moment/locale/ky.js",
	"./ky.js": "../../node_modules/moment/locale/ky.js",
	"./lb": "../../node_modules/moment/locale/lb.js",
	"./lb.js": "../../node_modules/moment/locale/lb.js",
	"./lo": "../../node_modules/moment/locale/lo.js",
	"./lo.js": "../../node_modules/moment/locale/lo.js",
	"./lt": "../../node_modules/moment/locale/lt.js",
	"./lt.js": "../../node_modules/moment/locale/lt.js",
	"./lv": "../../node_modules/moment/locale/lv.js",
	"./lv.js": "../../node_modules/moment/locale/lv.js",
	"./me": "../../node_modules/moment/locale/me.js",
	"./me.js": "../../node_modules/moment/locale/me.js",
	"./mi": "../../node_modules/moment/locale/mi.js",
	"./mi.js": "../../node_modules/moment/locale/mi.js",
	"./mk": "../../node_modules/moment/locale/mk.js",
	"./mk.js": "../../node_modules/moment/locale/mk.js",
	"./ml": "../../node_modules/moment/locale/ml.js",
	"./ml.js": "../../node_modules/moment/locale/ml.js",
	"./mn": "../../node_modules/moment/locale/mn.js",
	"./mn.js": "../../node_modules/moment/locale/mn.js",
	"./mr": "../../node_modules/moment/locale/mr.js",
	"./mr.js": "../../node_modules/moment/locale/mr.js",
	"./ms": "../../node_modules/moment/locale/ms.js",
	"./ms-my": "../../node_modules/moment/locale/ms-my.js",
	"./ms-my.js": "../../node_modules/moment/locale/ms-my.js",
	"./ms.js": "../../node_modules/moment/locale/ms.js",
	"./mt": "../../node_modules/moment/locale/mt.js",
	"./mt.js": "../../node_modules/moment/locale/mt.js",
	"./my": "../../node_modules/moment/locale/my.js",
	"./my.js": "../../node_modules/moment/locale/my.js",
	"./nb": "../../node_modules/moment/locale/nb.js",
	"./nb.js": "../../node_modules/moment/locale/nb.js",
	"./ne": "../../node_modules/moment/locale/ne.js",
	"./ne.js": "../../node_modules/moment/locale/ne.js",
	"./nl": "../../node_modules/moment/locale/nl.js",
	"./nl-be": "../../node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "../../node_modules/moment/locale/nl-be.js",
	"./nl.js": "../../node_modules/moment/locale/nl.js",
	"./nn": "../../node_modules/moment/locale/nn.js",
	"./nn.js": "../../node_modules/moment/locale/nn.js",
	"./pa-in": "../../node_modules/moment/locale/pa-in.js",
	"./pa-in.js": "../../node_modules/moment/locale/pa-in.js",
	"./pl": "../../node_modules/moment/locale/pl.js",
	"./pl.js": "../../node_modules/moment/locale/pl.js",
	"./pt": "../../node_modules/moment/locale/pt.js",
	"./pt-br": "../../node_modules/moment/locale/pt-br.js",
	"./pt-br.js": "../../node_modules/moment/locale/pt-br.js",
	"./pt.js": "../../node_modules/moment/locale/pt.js",
	"./ro": "../../node_modules/moment/locale/ro.js",
	"./ro.js": "../../node_modules/moment/locale/ro.js",
	"./ru": "../../node_modules/moment/locale/ru.js",
	"./ru.js": "../../node_modules/moment/locale/ru.js",
	"./sd": "../../node_modules/moment/locale/sd.js",
	"./sd.js": "../../node_modules/moment/locale/sd.js",
	"./se": "../../node_modules/moment/locale/se.js",
	"./se.js": "../../node_modules/moment/locale/se.js",
	"./si": "../../node_modules/moment/locale/si.js",
	"./si.js": "../../node_modules/moment/locale/si.js",
	"./sk": "../../node_modules/moment/locale/sk.js",
	"./sk.js": "../../node_modules/moment/locale/sk.js",
	"./sl": "../../node_modules/moment/locale/sl.js",
	"./sl.js": "../../node_modules/moment/locale/sl.js",
	"./sq": "../../node_modules/moment/locale/sq.js",
	"./sq.js": "../../node_modules/moment/locale/sq.js",
	"./sr": "../../node_modules/moment/locale/sr.js",
	"./sr-cyrl": "../../node_modules/moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "../../node_modules/moment/locale/sr-cyrl.js",
	"./sr.js": "../../node_modules/moment/locale/sr.js",
	"./ss": "../../node_modules/moment/locale/ss.js",
	"./ss.js": "../../node_modules/moment/locale/ss.js",
	"./sv": "../../node_modules/moment/locale/sv.js",
	"./sv.js": "../../node_modules/moment/locale/sv.js",
	"./sw": "../../node_modules/moment/locale/sw.js",
	"./sw.js": "../../node_modules/moment/locale/sw.js",
	"./ta": "../../node_modules/moment/locale/ta.js",
	"./ta.js": "../../node_modules/moment/locale/ta.js",
	"./te": "../../node_modules/moment/locale/te.js",
	"./te.js": "../../node_modules/moment/locale/te.js",
	"./tet": "../../node_modules/moment/locale/tet.js",
	"./tet.js": "../../node_modules/moment/locale/tet.js",
	"./tg": "../../node_modules/moment/locale/tg.js",
	"./tg.js": "../../node_modules/moment/locale/tg.js",
	"./th": "../../node_modules/moment/locale/th.js",
	"./th.js": "../../node_modules/moment/locale/th.js",
	"./tl-ph": "../../node_modules/moment/locale/tl-ph.js",
	"./tl-ph.js": "../../node_modules/moment/locale/tl-ph.js",
	"./tlh": "../../node_modules/moment/locale/tlh.js",
	"./tlh.js": "../../node_modules/moment/locale/tlh.js",
	"./tr": "../../node_modules/moment/locale/tr.js",
	"./tr.js": "../../node_modules/moment/locale/tr.js",
	"./tzl": "../../node_modules/moment/locale/tzl.js",
	"./tzl.js": "../../node_modules/moment/locale/tzl.js",
	"./tzm": "../../node_modules/moment/locale/tzm.js",
	"./tzm-latn": "../../node_modules/moment/locale/tzm-latn.js",
	"./tzm-latn.js": "../../node_modules/moment/locale/tzm-latn.js",
	"./tzm.js": "../../node_modules/moment/locale/tzm.js",
	"./ug-cn": "../../node_modules/moment/locale/ug-cn.js",
	"./ug-cn.js": "../../node_modules/moment/locale/ug-cn.js",
	"./uk": "../../node_modules/moment/locale/uk.js",
	"./uk.js": "../../node_modules/moment/locale/uk.js",
	"./ur": "../../node_modules/moment/locale/ur.js",
	"./ur.js": "../../node_modules/moment/locale/ur.js",
	"./uz": "../../node_modules/moment/locale/uz.js",
	"./uz-latn": "../../node_modules/moment/locale/uz-latn.js",
	"./uz-latn.js": "../../node_modules/moment/locale/uz-latn.js",
	"./uz.js": "../../node_modules/moment/locale/uz.js",
	"./vi": "../../node_modules/moment/locale/vi.js",
	"./vi.js": "../../node_modules/moment/locale/vi.js",
	"./x-pseudo": "../../node_modules/moment/locale/x-pseudo.js",
	"./x-pseudo.js": "../../node_modules/moment/locale/x-pseudo.js",
	"./yo": "../../node_modules/moment/locale/yo.js",
	"./yo.js": "../../node_modules/moment/locale/yo.js",
	"./zh-cn": "../../node_modules/moment/locale/zh-cn.js",
	"./zh-cn.js": "../../node_modules/moment/locale/zh-cn.js",
	"./zh-hk": "../../node_modules/moment/locale/zh-hk.js",
	"./zh-hk.js": "../../node_modules/moment/locale/zh-hk.js",
	"./zh-tw": "../../node_modules/moment/locale/zh-tw.js",
	"./zh-tw.js": "../../node_modules/moment/locale/zh-tw.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "../../node_modules/moment/locale sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!../../features/base.help.dialog.html":
/*!************************************************************************************************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/node_modules/raw-loader!C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/features/base.help.dialog.html ***!
  \************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-dialog-actions style=\"float: right; \">\r\n  <button mat-button [mat-dialog-close]=\"true\" style=\"min-width: 35px; top: 5px; \">\r\n    <mat-icon style=\"cursor: pointer; margin-top: 0; \" title=\"Close Help\">clear</mat-icon>\r\n  </button>\r\n</mat-dialog-actions>\r\n<br />\r\n<h1 mat-dialog-title style=\"text-align: center; background-color: aliceblue; height: 35px; padding-top: 5px; \">\r\n  Help with the: {{data.subtitle}}\r\n</h1>\r\n"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!../../features/mobileApis.component.help.html":
/*!*********************************************************************************************************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/node_modules/raw-loader!C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/features/mobileApis.component.help.html ***!
  \*********************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<base-help-dialog></base-help-dialog>\r\n\r\n  Here is where you will find help with the: {{data.subtitle}}\r\n"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!../../features/mobileApis.component.html":
/*!****************************************************************************************************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/node_modules/raw-loader!C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/features/mobileApis.component.html ***!
  \****************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<speech-to-text [isVisible]=\"showSpeechToText\"></speech-to-text>\r\n<text-to-speech [isVisible]=\"showTextToSpeech\"></text-to-speech>\r\n\r\n<view-fader [isViewVisible]=\"isViewVisible\">\r\n  <mat-tab-group mat-align-tabs=\"center\" color=\"primary\" dynamicHeight [selectedIndex]=\"selectedIndex\" (selectedIndexChange)=\"onChangeTab($event)\" >\r\n    <mat-tab label=\"Map\">\r\n      <div class=\"flex-container\">\r\n\r\n        <div class=\"flex-item map-controls\">\r\n\r\n          <mat-form-field>\r\n            <input matInput placeholder=\"Address\" [(ngModel)]=\"address\">\r\n          </mat-form-field>\r\n\r\n          <mat-form-field>\r\n            <input matInput placeholder=\"Zip Code\" [(ngModel)]=\"zipcode\">\r\n          </mat-form-field>\r\n          <br />\r\n\r\n          <div style=\"float: left; margin-top: 10px; \">&nbsp;&nbsp;Latitude</div>\r\n          <div style=\"float: right; margin-top: 10px; \">Longitude&nbsp;&nbsp;</div>\r\n          <br />\r\n          <div style=\"margin-top: 10px; \">\r\n            <div *ngIf=\"latitude !== 0\" style=\"float: left; \">&nbsp;&nbsp;{{latitude}}</div>\r\n            <div *ngIf=\"latitude === 0\" style=\"float: left; \">&nbsp;&nbsp;00.00000</div>\r\n\r\n            <div *ngIf=\"longitude !== 0\" style=\"float: right; \">{{longitude}}&nbsp;&nbsp;&nbsp;</div>\r\n            <div *ngIf=\"longitude === 0\" style=\"float: right; \">00.00000&nbsp;&nbsp;&nbsp;</div>\r\n            <br /><br />\r\n            <button mat-flat-button color=\"primary\" (click)=\"gm.findMe()\" style=\"float: left; \" title=\"Find Me on Google Maps\">Find Me</button>\r\n            <button mat-flat-button color=\"primary\" (click)=\"gm.useAddress(address, zipcode)\" [disabled]=\"shouldUpdateByAddressBeDisabled()\" style=\"float: right; \" title=\"Use Address to Google Maps\">Use Address</button>\r\n          </div>\r\n        </div>\r\n\r\n        <google-maps class=\"flex-item map-view\" heightPercent=\"100\" [isVisible]=\"true\" style=\"border-radius: 10px; display: block; \" [style.width.px]=\"getMapWidth()\" [style.height.px]=\"getMapHeight()\"></google-maps>\r\n\r\n      </div>\r\n    </mat-tab>\r\n\r\n    <mat-tab label=\"Speech\">\r\n      <div class=\"flex-container\">\r\n        <div class=\"flex-item\">\r\n          <div class=\"s2t-text\" style=\"width: 285px;  margin-top: 20px; margin-left:10px; \">\r\n            <span>\r\n              <mat-icon color=\"primary\" class=\"toolbar-icon-button\" (click)=\"onClickTextToSpeech()\" style=\"float:left; cursor: pointer; margin-bottom: 15px; font-size: 40px; \" title=\"Convert Text to Speech\">volume_up</mat-icon>\r\n              <mat-icon color=\"primary\" class=\"toolbar-icon-button\" (click)=\"onClickSpeechToText()\" style=\"float:right; cursor: pointer; margin-bottom: 15px; font-size: 40px; \" title=\"Convert Speech to Text\">mic</mat-icon>\r\n            </span>\r\n            <textarea style=\"font-size: 110%; min-height: 170px; min-width: 290px; color: rgba(63, 81, 181, 1); \" *ngIf=\"showTextArea\" [spellcheck]=\"mobileApisState.spellCheckingEnabled\" class=\"form-control textAreaNgModel\" [rows]=\"getRowCount()\" (change)=\"onChangeTextMessage($event.target.value)\" [ngModel]=\"mobileApisState.textMessage\"></textarea>\r\n            <span>\r\n              <mat-icon *ngIf=\"!mobileApisState.spellCheckingEnabled\" color=\"primary\" class=\"toolbar-icon-button\" (click)=\"onClickSpellCheck(true)\" style=\"float:left; cursor: pointer; margin-top: 0; font-size: 40px; \" title=\"Spell Checking: Off\">check_circle_outline</mat-icon>\r\n              <mat-icon *ngIf=\"mobileApisState.spellCheckingEnabled\" color=\"primary\" class=\"toolbar-icon-button\" (click)=\"onClickSpellCheck(false)\" style=\"float:left; cursor: pointer; margin-top: 0; font-size: 40px; \" title=\"Spell Checking: On\">check_circle</mat-icon>\r\n\r\n              <mat-icon *ngIf=\"!mobileApisState.clearTextMessage\" color=\"primary\" class=\"toolbar-icon-button\" (click)=\"onClickClearTextMessage()\" style=\"float:right; cursor: pointer; margin-top: 0; font-size: 40px; \" title=\"Clear Text\">clear</mat-icon>\r\n              <mat-icon *ngIf=\"mobileApisState.clearTextMessage\" color=\"primary\" class=\"toolbar-icon-button\" style=\"float:right; cursor: default; margin-top: 0; font-size: 40px; \" title=\"Clearing Text\">block</mat-icon>\r\n\r\n              <span class=\"app-text-primary\" style=\"float: left; margin-left: 5px; margin-top: 7px; font-size: 16px; \">\r\n                Spell Checking: <span style=\"font-weight: bold; \">{{ mobileApisState.spellCheckingEnabled ? \"On\" : \"Off\" }}</span>\r\n              </span>\r\n            </span>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </mat-tab>\r\n\r\n    <mat-tab label=\"SMS\">\r\n      <div class=\"flex-container\">\r\n        <div class=\"flex-item\">\r\n          <div style=\"width: 285px; margin-left: 10px; \">\r\n            <br />\r\n            <mat-form-field>\r\n              <mat-label>* Cellular Carrier</mat-label>\r\n              <mat-select class=\"mat-select-options\" [(value)]=\"mobileApisState.mobileCarrier\">\r\n                <mat-option *ngFor=\"let cellCarrier of cellCarriers\" [value]=\"cellCarrier.name\">\r\n                  {{cellCarrier.name}}\r\n                </mat-option>\r\n              </mat-select>\r\n            </mat-form-field>\r\n            <br /><br />\r\n            <mat-form-field>\r\n              <input min=\"0\" max=\"9999999999\" (keyup)=\"onKeyUp($event.target.value)\" (keydown)=\"onKeyDown($event)\" type=\"number\" matInput placeholder=\"* Mobile Number (Numbers Only)\" [ngModel]=\"mobileNumber\">\r\n            </mat-form-field>\r\n            <br /><br />\r\n            <button mat-flat-button color=\"primary\" [disabled]=\"shouldSendBeDisabled()\" (click)=\"onClickSend()\" style=\"float: right; \">Send</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </mat-tab>\r\n  </mat-tab-group>\r\n\r\n</view-fader>\r\n"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!../../shared/ng2-mobiletech/speechToText.html":
/*!*********************************************************************************************************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/node_modules/raw-loader!C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/shared/ng2-mobiletech/speechToText.html ***!
  \*********************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div [@modalDialogTrigger] *ngIf=\"isVisible\" class=\"modalDialog\" style=\"width: 350px; height: 73px; \" [style.top.px]=\"positionTop\">\r\n  <ng-content></ng-content>\r\n  <button *ngIf=\"isClosable\" (click)=\"closeDialog()\" aria-label=\"Close\" class=\"dialog__close-btn\">X</button>\r\n  <div style=\"text-align: center; \">\r\n    <i class=\"fa fa-microphone fa-2x\" style=\"color: cornflowerblue; float:left; margin-left: 20px;\"></i>\r\n    <div class=\"btn-group\" style=\"margin-right: 20px;\">\r\n      <button mat-fab color=\"accent\" [disabled]=\"!s2tOn\" style=\"top: -2px;\" (click)=\"onClickStop()\">Stop</button>\r\n      <button mat-fab color=\"accent\" [disabled]=\"!s2tOn\" style=\"top: -2px; left: 5px;\" (click)=\"onClickPause()\">Pause</button>\r\n      <button mat-fab color=\"accent\" [disabled]=\"s2tOn\" style=\"top: -2px; left: 10px;\" (click)=\"onClickStart()\">{{ startButtonLabel }}</button>\r\n    </div>\r\n    <div id=\"debugText\" style=\"color: red; font-weight: bold; overflow: hidden; font-family: Arial; \"></div>\r\n  </div>\r\n</div>\r\n<div *ngIf=\"isVisible\" class=\"overlay\" (click)=\"closeDialog()\"></div>\r\n"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!../../shared/ng2-mobiletech/textToSpeech.html":
/*!*********************************************************************************************************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/node_modules/raw-loader!C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/shared/ng2-mobiletech/textToSpeech.html ***!
  \*********************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div [@modalDialogTrigger] *ngIf=\"isVisible\" class=\"modalDialog\" style=\"width: 350px; height: 53px; \" [style.top.px]=\"positionTop\">\r\n  <ng-content></ng-content>\r\n\r\n  <button *ngIf=\"isClosable\" (click)=\"closeDialog()\" aria-label=\"Close\" class=\"dialog__close-btn\">X</button>\r\n  <div style=\"text-align: center; \">\r\n    <i class=\"fa fa-volume-up fa-2x\" style=\"color: cornflowerblue; float:left; margin-left: 20px;\"></i>\r\n    <div class=\"btn-group\" style=\"margin-right: 20px;\">\r\n      <button mat-fab color=\"accent\" [disabled]=\"!t2sOn\" style=\"top: -2px;\" (click)=\"onClickStop()\">Stop</button>\r\n      <button mat-fab color=\"accent\" [disabled]=\"!t2sOn\" style=\"top: -2px; left: 5px;\" (click)=\"onClickPause()\">Pause</button>\r\n      <button mat-fab color=\"accent\" [disabled]=\"t2sOn\" style=\"top: -2px; left: 10px;\" (click)=\"onClickStart()\">{{ startButtonLabel }}</button>\r\n    </div>\r\n  </div>\r\n</div>\r\n<div *ngIf=\"isVisible\" class=\"overlay\" (click)=\"closeDialog()\"></div>\r\n"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/app.component.htmx":
/*!*****************************************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/node_modules/raw-loader!./src/app/app.component.htmx ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<view-fader *ngIf=\"ac.isSpinnerAvailable\" [isViewVisible]=\"ac.isSpinnerVisible\" style=\"position: fixed; top: 45%; left: 45%; z-index: 500; font-size: 75px; color:#3379b7\">\r\n  <i class=\"fa fa-spinner fa-spin\"></i>\r\n</view-fader>\r\n\r\n<div>\r\n  <view-blinker *ngIf=\"showOpeningTitle\" [blinking]=\"true\" [visibleWhenNotBlinking]=\"false\">\r\n    <br /><br />\r\n    <div class=\"text-primary\" style=\"text-align: center; width: 100%; font-family: px-neuropol; font-size: 54px; margin-top: -50px; \">{{appTitle}}</div>\r\n  </view-blinker>\r\n  <view-fader *ngIf=\"showOpeningTitle\" [isViewVisible]=\"showOpeningTitle\">\r\n    <div align=\"center\" style=\"font-family: px-neuropol; \">\r\n      <img style=\"width: 15%; \" src=\"data:image/png;base64,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\" /><i class=\"fa fa-plus fa\"></i>\r\n      <img style=\"width: 15%; \" src=\"data:image/png;base64,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\" /><i class=\"fa fa-plus fa\"></i>\r\n      <img style=\"width: 15%; \" src=\"data:image/png;base64,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\" /><i class=\"fa fa-plus fa\"></i>\r\n      <img style=\"width: 15%; \" src=\"data:image/png;base64,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\" /><i class=\"fa fa-plus fa\"></i>\r\n      <img style=\"width: 15%; \" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAMAAABOo35HAAAAO3RFWHRDb3B5cmlnaHQAwqkgdGgxMzQxIC0gaHR0cDovL3d3dy5yZWRidWJibGUuY29tL3Blb3BsZS90aDEzNGhB9R0AAAs/dEVYdFhNTDpjb20uYWRvYmUueG1wADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuMS4yIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj4KICAgICAgICAgPGRjOnJpZ2h0cz4KICAgICAgICAgICAgPHJkZjpBbHQ+CiAgICAgICAgICAgICAgIDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+wqkgdGgxMzQxIC0gaHR0cDovL3d3dy5yZWRidWJibGUuY29tL3Blb3BsZS90aDEzNDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpBbHQ+CiAgICAgICAgIDwvZGM6cmlnaHRzPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43Mi8xPC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj43Mi8xPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpSZXNvbHV0aW9uVW5pdD4yPC90aWZmOlJlc29sdXRpb25Vbml0PgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+5FsTHAAAAAd0SU1FB+ECGg4mJKHrzOMAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAEZ0FNQQAAsY8L/GEFAAAC91BMVEX+/v7x+eTj8dTu+Oj6/PTV6cS00pKcyGKKvTOMvTuGvjOZxFOqynvK3bLz+uzj7diGwSyJvSuQxTWOxT2QxUGNyDyJwi2IwRyZvlbL3rj2+vLs9OLB1pyMvEOHyCaOyECQxT6kynTc69HG27OUwlGFwRuOxEKRyD2GxTGz0Yrp8tzc6sugxmOGwBTI2aXy9uuwzYOLxDOJvRyWwVzO4rn3/PjB2puRvESSyjWNyDXg68zS47uJvSO0z5Oly4GNyC/J3a3l8duJwSOFvCKYvlvE26mQvTqOwkmQxizU5MC81Zvw9eTj8MypyXSTykPK4K2605Sixmna6cT49/CFwSPj7dTZ5cObw2Pt+OWrzIKHxTyWvljR5LWkxnPa5svX6MijyWySvUvD2qSaw1uTwkuox3nf6tiGvCq41Y6205rD1qqnyoidxWru+t+ly3mFvRSy0ITZ6L/A2ZaxzonM4bOLu0qKvhShymTo79euzoiv0YuGwQDt9Oi92ZuDvB36+u7f59KbylrR37KJwBO72pTw+N6lxXqEwAieyGzA1KO91qGCugmw0n+ZxUuZy0p2mUJ3oECWykmby1KWyVN8nEtIVjU6NTQ7NTpMXDZ9oUuZzEV7nENUZTWOtVNTZDk1OTJERTxISDxAQzVZbTqMs0yHqFRBPUE1NDRUaDaOuFJmgkE6OjRIRj1FSDyTvFJhfD1GRkE2NziQtUtykkJB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\" /><i class=\"fa fa-plus fa\"></i>\r\n      <img style=\"width: 15%; \" src=\"data:image/png;base64,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\" />&nbsp;&nbsp;<i class=\"fa fa-plus fa\"></i>\r\n      <img style=\"width: 15%; \" src=\"data:image/png;base64,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\" />&nbsp;&nbsp;<i class=\"fa fa-plus fa\"></i>\r\n      <h3 style=\"text-align: center; font-family: px-neuropol; \">Project Version: {{ac.appSettings.buildVersion}}</h3>\r\n      <h3 style=\"text-align: center; font-family: px-neuropol; \">Angular Version: {{ac.appSettings.angularVersionNumber}}</h3>\r\n      <h3 style=\"text-align: center;  font-family: px-neuropol; \">ASP.Net Core Version: {{ac.appSettings.aspNetCoreVersion}}</h3>\r\n    </div>\r\n  </view-fader>\r\n  <view-fader *ngIf=\"showMobileApiView\" [isViewVisible]=\"showMobileApiView\">\r\n    <br />\r\n    <router-outlet></router-outlet>\r\n  </view-fader>\r\n</div>\r\n"

/***/ }),

/***/ "../../shared/client-side-models/analyticsData.ts":
/*!*******************************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/shared/client-side-models/analyticsData.ts ***!
  \*******************************************************************************************************/
/*! exports provided: Exception, Performance, AnalyticsData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Exception", function() { return Exception; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Performance", function() { return Performance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnalyticsData", function() { return AnalyticsData; });
var Exception = /** @class */ (function () {
    function Exception() {
    }
    return Exception;
}());

var Performance = /** @class */ (function () {
    function Performance() {
    }
    return Performance;
}());

var AnalyticsData = /** @class */ (function () {
    function AnalyticsData() {
        this.exceptions = Array();
        this.performances = Array();
        this.averageResponseTime = 0;
    }
    return AnalyticsData;
}());



/***/ }),

/***/ "../../shared/client-side-models/buildModels.ts":
/*!*****************************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/shared/client-side-models/buildModels.ts ***!
  \*****************************************************************************************************/
/*! exports provided: Dependency, TextMessage, CellCarrier, ApiVersions, AppSettings, AngularProject, LaunchSettings, DeveloperSettings, VisualProject, BuildConfiguration, BuildResponse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Dependency", function() { return Dependency; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextMessage", function() { return TextMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CellCarrier", function() { return CellCarrier; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiVersions", function() { return ApiVersions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppSettings", function() { return AppSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AngularProject", function() { return AngularProject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LaunchSettings", function() { return LaunchSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeveloperSettings", function() { return DeveloperSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VisualProject", function() { return VisualProject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BuildConfiguration", function() { return BuildConfiguration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BuildResponse", function() { return BuildResponse; });
var Dependency = /** @class */ (function () {
    function Dependency() {
    }
    return Dependency;
}());

var TextMessage = /** @class */ (function () {
    function TextMessage() {
    }
    return TextMessage;
}());

var CellCarrier = /** @class */ (function () {
    function CellCarrier() {
    }
    return CellCarrier;
}());

var ApiVersions = /** @class */ (function () {
    function ApiVersions() {
        this.typeScript = '';
        this.nodeJs = '';
        this.v8Engine = '';
        this.angular = '';
        this.rxJs = '';
        this.lodash = '';
        this.moment = '';
        this.fileSaver = '';
        this.coreJs = '';
        this.zoneJs = '';
        this.googleMaps = '';
        this.ngxtoastr = '';
    }
    return ApiVersions;
}());

var AppSettings = /** @class */ (function () {
    function AppSettings() {
        this.debug = false;
        this.testing = false;
        this.connectionString = '';
        this.buildVersion = '';
        this.splashTime = 0;
        this.googleMapKey = '';
        this.smtpReply = '';
        this.smtpHost = '';
        this.smtpPort = 0;
        this.smtpUn = '';
        this.smtpPw = '';
        this.cellCarriers = '';
        this.aspNetCoreVersion = '';
        this.apiVersions = new ApiVersions();
    }
    return AppSettings;
}());

var AngularProject = /** @class */ (function () {
    function AngularProject() {
        this.visualProject = '';
        this.name = '';
        this.buildEnabled = false;
        this.pwaSupport = false;
        this.production = false;
        this.distFolder = '';
        this.angularModule = '';
        this.angularRoot = '';
        this.angularProjectDir = '';
        this.showPanel = false;
    }
    return AngularProject;
}());

var LaunchSettings = /** @class */ (function () {
    function LaunchSettings() {
    }
    return LaunchSettings;
}());

var DeveloperSettings = /** @class */ (function () {
    function DeveloperSettings() {
        this.machineName = '';
        this.buildHook = false;
        this.importHook = false;
        this.executeDist = false;
        this.serveApp = '';
        this.releaseApp = '';
        this.libraryExports = Array();
        this.angularProjects = Array();
    }
    return DeveloperSettings;
}());

var VisualProject = /** @class */ (function () {
    function VisualProject() {
        this.name = '';
        this.applicationUrl = '';
        this.workingDirectory = '';
        this.developerSettings = new DeveloperSettings();
        this.showPanel = false;
        this.showVersion = true;
    }
    return VisualProject;
}());

var BuildConfiguration = /** @class */ (function () {
    function BuildConfiguration() {
        this.machineName = '';
        this.visualProjects = Array();
        this.shared = Array();
    }
    return BuildConfiguration;
}());

var BuildResponse = /** @class */ (function () {
    function BuildResponse() {
        this.payloadType = '';
        this.consoleText = '';
        this.versionNo = '';
    }
    return BuildResponse;
}());



/***/ }),

/***/ "../../shared/enterprise/apiService.ts":
/*!********************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/shared/enterprise/apiService.ts ***!
  \********************************************************************************************/
/*! exports provided: ApiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiService", function() { return ApiService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "../../node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _common_ngAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/ngAction */ "../../common/ngAction.ts");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngxs/store */ "../../node_modules/@ngxs/store/fesm5/ngxs-store.js");



var ApiService = /** @class */ (function () {
    function ApiService(http, store) {
        this.http = http;
        this.store = store;
        this.serverError = 'Server could be busy or offline!';
        this.downloadTimeout = 45000;
        this.uploadTimeout = 45000;
        this.ngAction = _common_ngAction__WEBPACK_IMPORTED_MODULE_1__["NgAction"].getInstance(store);
    }
    //#region httpRequest
    ApiService.prototype.httpRequest = function (obj, requestType, responseType$, url, success, error, params$, headers$, progressCallback) {
        var _this = this;
        var reportProgress$ = (progressCallback !== undefined && progressCallback !== null);
        var request;
        if (obj) {
            request = new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpRequest"](requestType, url, obj, { reportProgress: reportProgress$, headers: headers$, params: params$ });
        }
        else {
            request = new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpRequest"](requestType, url, {
                responseType: responseType$,
                reportProgress: reportProgress$,
                headers: headers$, params: params$
            });
        }
        var timerId = null;
        var httpSubscription = this.http.request(request).subscribe(function (event) {
            if (timerId) {
                clearTimeout(timerId);
            }
            timerId = setTimeout(function () {
                clearTimeout(timerId);
                timerId = null;
                httpSubscription.unsubscribe();
                error(_this.serverError);
            }, _this.downloadTimeout);
            switch (event.type) {
                case _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpEventType"].Sent:
                    break;
                case _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpEventType"].ResponseHeader:
                    break;
                case _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpEventType"].DownloadProgress:
                    if (requestType === 'Get') {
                        if (progressCallback(event)) {
                            clearTimeout(timerId);
                            httpSubscription.unsubscribe();
                        }
                    }
                    break;
                case _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpEventType"].UploadProgress:
                    if (requestType === 'Post') {
                        if (progressCallback(event)) {
                            clearTimeout(timerId);
                            httpSubscription.unsubscribe();
                        }
                    }
                    break;
                case _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpEventType"].Response:
                    clearTimeout(timerId);
                    httpSubscription.unsubscribe();
                    if (event.body instanceof Blob) {
                        success(event);
                    }
                    else {
                        success(event.body);
                    }
                    break;
            }
        }, function (errorResponse) {
            clearTimeout(timerId);
            httpSubscription.unsubscribe();
            if (errorResponse.error.ExceptionMessage) {
                error(errorResponse.error.ExceptionMessage);
            }
            else {
                error(errorResponse.error);
            }
        });
    };
    //#endregion
    //#region http get
    ApiService.prototype.get = function (url, success, error, params, headers, progressCallback) {
        this.httpRequest(null, 'Get', 'json', url, success, error, params, headers, progressCallback);
    };
    ApiService.prototype.download = function (url, success, error, params, headers, progressCallback) {
        this.httpRequest(null, 'Get', 'blob', url, success, error, params, headers, progressCallback);
    };
    //#endregion
    //#region http post
    ApiService.prototype.post = function (object$, url, success, error, params, headers, progressCallback) {
        this.httpRequest(object$, 'Post', 'json', url, success, error, params, headers, progressCallback);
    };
    ApiService.prototype.upload = function (files, url, success, error, params, headers, progressCallback) {
        var formData = new FormData();
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var file = files_1[_i];
            formData.append(file.name, file);
        }
        this.post(formData, url, success, error, params, headers, progressCallback);
    };
    //#endregion
    //#region http delete
    ApiService.prototype.delete = function (url, success, error, params, headers, progressCallback) {
        this.httpRequest(null, 'Delete', 'json', url, success, error, params, headers, progressCallback);
    };
    //#endregion
    //#region save file
    ApiService.prototype.saveFile = function (blob, filename) {
        if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, filename);
        }
        else {
            var a_1 = document.createElement('a');
            document.body.appendChild(a_1);
            var url_1 = window.URL.createObjectURL(blob);
            a_1.href = url_1;
            a_1.download = filename;
            a_1.click();
            setTimeout(function () {
                window.URL.revokeObjectURL(url_1);
                document.body.removeChild(a_1);
            }, 0);
        }
    };
    ApiService.prototype.handleError = function (customResponse, caught) {
        // do something to capture the error for reporting purposes
        throw customResponse.error;
    };
    //#endregion
    ApiService.prototype.setLocalStorage = function (name, anyObject) {
        if (anyObject instanceof Array) {
            anyObject = { array: anyObject };
        }
        if (typeof (anyObject) === 'object') {
            var stringVal = JSON.stringify(anyObject, null, 2);
            if (stringVal) {
                localStorage.setItem(name, stringVal);
            }
        }
    };
    ApiService.prototype.getLocalStorage = function (name) {
        var value = localStorage.getItem(name);
        if (!value) {
            return null;
        }
        if (value.substring(0, 1) === '{') {
            var obj = JSON.parse(value);
            if ('array' in obj) {
                return obj.array;
            }
            return obj;
        }
        return null;
    };
    ApiService.prototype.filterFileNameChar = function (key) {
        var illegalCharacters = ' \ / : * ? " < > | ';
        if (illegalCharacters.includes(key))
            return false;
        else
            return true;
    };
    ApiService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"] },
        { type: _ngxs_store__WEBPACK_IMPORTED_MODULE_2__["Store"] }
    ]; };
    return ApiService;
}());



/***/ }),

/***/ "../../shared/enterprise/timingmetrics.ts":
/*!***********************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/shared/enterprise/timingmetrics.ts ***!
  \***********************************************************************************************/
/*! exports provided: TimingMetrics */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimingMetrics", function() { return TimingMetrics; });
var TimingMetrics = /** @class */ (function () {
    function TimingMetrics(metricName) {
        this.capturedMetric = false;
        this.startTimeMs = 0;
        this.metricName = metricName;
    }
    TimingMetrics.prototype.setStartMarker = function () {
        if (this.startName) {
            console.log('start metric already set');
            return;
        }
        this.startName = 'Start: ' + this.metricName;
        this.startTimeMs = new Date().getTime();
        window.performance.mark(this.startName);
    };
    TimingMetrics.prototype.setEndMarker = function () {
        if (this.capturedMetric) {
            return;
        }
        if (!this.startName) {
            console.log('start metric not set');
            return;
        }
        if (this.endName) {
            console.log('end metric already set');
            return;
        }
        this.endName = 'End: ' + this.metricName;
        window.performance.mark(this.endName);
    };
    TimingMetrics.prototype.measureInterval = function () {
        if (this.capturedMetric) {
            return -1;
        }
        if (!this.startName) {
            console.log('start metric not set');
            return 0;
        }
        if (!this.endName) {
            console.log('end metric not set');
            return 0;
        }
        if (this.timerId) {
            clearTimeout(this.timerId);
        }
        this.capturedMetric = true;
        window.performance.measure(': ' + this.metricName, this.startName, this.endName);
        return new Date().getTime() - this.startTimeMs;
    };
    TimingMetrics.ctorParameters = function () { return [
        { type: String }
    ]; };
    return TimingMetrics;
}());



/***/ }),

/***/ "../../shared/modules/material.module.ts":
/*!**********************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/shared/modules/material.module.ts ***!
  \**********************************************************************************************/
/*! exports provided: MaterialModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaterialModule", function() { return MaterialModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "../../node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_cdk_table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/table */ "../../node_modules/@angular/cdk/esm5/table.es5.js");




var MaterialModule = /** @class */ (function () {
    function MaterialModule() {
    }
    MaterialModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatAutocompleteModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatButtonToggleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatCheckboxModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatChipsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDatepickerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatExpansionModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatGridListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatMenuModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatNativeDateModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginatorModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatProgressBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatProgressSpinnerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatRadioModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatRippleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSidenavModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSliderModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSlideToggleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSnackBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatStepperModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSortModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTabsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTooltipModule"],
                _angular_cdk_table__WEBPACK_IMPORTED_MODULE_3__["CdkTableModule"]
            ],
            exports: [
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatAutocompleteModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatButtonToggleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatCheckboxModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatChipsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDatepickerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatExpansionModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatGridListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatMenuModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatNativeDateModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginatorModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatProgressBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatProgressSpinnerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatRadioModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatRippleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSidenavModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSliderModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSlideToggleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSnackBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatStepperModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSortModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTabsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTooltipModule"],
                _angular_cdk_table__WEBPACK_IMPORTED_MODULE_3__["CdkTableModule"]
            ]
        })
    ], MaterialModule);
    return MaterialModule;
}());



/***/ }),

/***/ "../../shared/ng2-animation/appAnimation.module.ts":
/*!********************************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/shared/ng2-animation/appAnimation.module.ts ***!
  \********************************************************************************************************/
/*! exports provided: AppAnimationModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppAnimationModule", function() { return AppAnimationModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _expandVisible__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./expandVisible */ "../../shared/ng2-animation/expandVisible.ts");
/* harmony import */ var _viewFader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./viewFader */ "../../shared/ng2-animation/viewFader.ts");
/* harmony import */ var _viewBlinker__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./viewBlinker */ "../../shared/ng2-animation/viewBlinker.ts");
/* harmony import */ var _modalDialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modalDialog */ "../../shared/ng2-animation/modalDialog.ts");








var AppAnimationModule = /** @class */ (function () {
    function AppAnimationModule() {
    }
    AppAnimationModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]],
            declarations: [_viewFader__WEBPACK_IMPORTED_MODULE_5__["ViewFaderComponent"], _viewBlinker__WEBPACK_IMPORTED_MODULE_6__["ViewBlinkerComponent"], _expandVisible__WEBPACK_IMPORTED_MODULE_4__["ExpandVisibleComponent"], _modalDialog__WEBPACK_IMPORTED_MODULE_7__["ModalDialogComponent"]],
            exports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _viewFader__WEBPACK_IMPORTED_MODULE_5__["ViewFaderComponent"],
                _viewBlinker__WEBPACK_IMPORTED_MODULE_6__["ViewBlinkerComponent"],
                _expandVisible__WEBPACK_IMPORTED_MODULE_4__["ExpandVisibleComponent"],
                _modalDialog__WEBPACK_IMPORTED_MODULE_7__["ModalDialogComponent"]
            ]
        })
    ], AppAnimationModule);
    return AppAnimationModule;
}());



/***/ }),

/***/ "../../shared/ng2-animation/expandVisible.ts":
/*!**************************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/shared/ng2-animation/expandVisible.ts ***!
  \**************************************************************************************************/
/*! exports provided: ExpandVisibleComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExpandVisibleComponent", function() { return ExpandVisibleComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/animations */ "../../node_modules/@angular/animations/fesm5/animations.js");



var ExpandVisibleComponent = /** @class */ (function () {
    function ExpandVisibleComponent() {
        this.isVisible = false;
        this.visibility = 'hidden';
        this.initalized = false;
    }
    ExpandVisibleComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.initalized = true;
        }, 500);
    };
    ExpandVisibleComponent.prototype.ngOnChanges = function () {
        this.visibility = this.isVisible ? 'shown' : 'hidden';
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ExpandVisibleComponent.prototype, "isVisible", void 0);
    ExpandVisibleComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'expand-visible',
            template: "\n    <div [@visibilityChanged]=\"visibility\" [style.visibility]=\"initalized ? 'visible' : 'hidden' \">\n      <ng-content></ng-content>\n    </div>\n  ",
            animations: [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["trigger"])('visibilityChanged', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["state"])('shown', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ opacity: 1, height: '100%', width: '100%' })),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["state"])('hidden', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ opacity: 0, height: '0', width: '0' })),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])('* => *', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])('.5s'))
                ])
            ]
        })
    ], ExpandVisibleComponent);
    return ExpandVisibleComponent;
}());



/***/ }),

/***/ "../../shared/ng2-animation/modalDialog.ts":
/*!************************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/shared/ng2-animation/modalDialog.ts ***!
  \************************************************************************************************/
/*! exports provided: ModalDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalDialogComponent", function() { return ModalDialogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/animations */ "../../node_modules/@angular/animations/fesm5/animations.js");



var ModalDialogComponent = /** @class */ (function () {
    function ModalDialogComponent() {
        this.isClosable = true;
        this.showOkButton = false;
        this.showCancelButton = false;
        this.showYesButton = false;
        this.showNoButton = false;
        this.okDisabled = false;
        this.cancelDisabled = false;
        this.yesDisabled = false;
        this.noDisabled = false;
        this.desiredHeight = 0;
        this.desiredWidth = 0;
        this.dialogHeight = 0;
        this.dialogWidth = 0;
        this.visibleChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.initalized = false;
    }
    ModalDialogComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.initalized = true;
        }, 500);
    };
    ModalDialogComponent.prototype.ngOnChanges = function () {
        if (!this.initalized) {
            return;
        }
        this.dialogWidth = this.desiredWidth;
        this.dialogHeight = this.desiredHeight;
    };
    ModalDialogComponent.prototype.clickedOutsideOfDialog = function () {
        if (this.denyClosing) {
            return;
        }
        this.closeDialog();
    };
    ModalDialogComponent.prototype.closeDialog = function () {
        this.isVisible = false;
        this.visibleChange.emit(this.isVisible);
    };
    ModalDialogComponent.prototype.onbuttonClicked = function (buttonClicked) {
        try {
            this.dialogButtonCallback(buttonClicked);
        }
        catch (e) { /* the owner must not have a "dialogButtonClicked()" function */
            // I implemented it this way because using a callback does not preserve the "this" pointer
            this.closeDialog();
        }
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ModalDialogComponent.prototype, "isClosable", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], ModalDialogComponent.prototype, "isVisible", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ModalDialogComponent.prototype, "showOkButton", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ModalDialogComponent.prototype, "showCancelButton", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ModalDialogComponent.prototype, "showYesButton", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ModalDialogComponent.prototype, "showNoButton", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ModalDialogComponent.prototype, "okDisabled", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ModalDialogComponent.prototype, "cancelDisabled", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ModalDialogComponent.prototype, "yesDisabled", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ModalDialogComponent.prototype, "noDisabled", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], ModalDialogComponent.prototype, "modalDialogTitle", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ModalDialogComponent.prototype, "desiredHeight", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ModalDialogComponent.prototype, "desiredWidth", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ModalDialogComponent.prototype, "dialogHeight", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ModalDialogComponent.prototype, "dialogWidth", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], ModalDialogComponent.prototype, "denyClosing", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ModalDialogComponent.prototype, "visibleChange", void 0);
    ModalDialogComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'modal-dialog',
            //#region template:
            template: "\n    <div [@modalDialogTrigger] *ngIf=\"isVisible\" class=\"modalDialog\" [style.height.px]=\"dialogHeight\" [style.width.px]=\"dialogWidth\">\n        <div class=\"dialogTitle\">\n            <p>{{modalDialogTitle}}</p>\n        </div>\n        <ng-content></ng-content>\n        <button *ngIf=\"isClosable\" (click)=\"closeDialog()\" aria-label=\"Close\" class=\"dialog__close-btn\">X</button>\n        <div class=\"dialogFooter\" >\n            <hr style=\"margin-left: 20px; margin-bottom: 10px; \" />\n            <button *ngIf=\"showCancelButton\" [disabled]=\"cancelDisabled\" class=\"btn btn-primary\"\n            style=\"float: right; margin-left: 5px; margin-bottom: 10px; width: 75px;\" (click)=\"onbuttonClicked('cancel')\">Cancel</button>\n            <button *ngIf=\"showOkButton\" [disabled]=\"okDisabled\" class=\"btn btn-primary\"\n            style=\"float: right; margin-left: 5px; margin-bottom: 10px; width: 75px;\" (click)=\"onbuttonClicked('ok')\">OK</button>\n            <button *ngIf=\"showNoButton\" [disabled]=\"noDisabled\" class=\"btn btn-primary\"\n            style=\"float: right; margin-left: 5px; margin-bottom: 10px; width: 75px;\" (click)=\"onbuttonClicked('no')\">No</button>\n            <button *ngIf=\"showYesButton\" [disabled]=\"yesDisabled\" class=\"btn btn-primary\"\n            style=\"float: right; margin-left: 5px; margin-bottom: 10px; width: 75px;\" (click)=\"onbuttonClicked('yes')\">Yes</button>\n        </div>\n    </div>\n    <div *ngIf=\"isVisible\" class=\"overlay\" (click)=\"clickedOutsideOfDialog()\"></div>\n    ",
            // #endregion
            animations: [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["trigger"])('modalDialogTrigger', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])('void => *', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ transform: 'scale3d(.3, .3, .3)' }),
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])(100)
                    ]),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])('* => void', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])(100, Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ transform: 'scale3d(.0, .0, .0)' }))
                    ])
                ])
            ],
            styles: ["\n    .overlay {\n      position: fixed;\n      top: 0;\n      bottom: 0;\n      left: 0;\n      right: 0;\n      background-color: rgba(0, 0, 0, 0.5);\n      z-index: 999;\n    }\n    .modalDialog {\n      z-index: 1000;\n      position: fixed;\n      right: 0;\n      left: 0;\n      top: 20px;\n      margin-top: 100px;\n      margin-right: auto;\n      margin-left: auto;\n      background-color: #fff;\n      padding: 12px;\n      box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2), 0 13px 19px 2px rgba(0, 0, 0, 0.14), 0 5px 24px 4px rgba(0, 0, 0, 0.12);\n     -ms-border-radius: 5px !important;\n     border-radius: 5px !important;\n    }\n    @media (min-width: 768px) {\n      .modalDialog {\n        top: 40px;\n      }\n    }\n    .dialog__close-btn {\n      border: 0;\n      background: none;\n      color: #2d2d2d;\n      position: absolute;\n      top: 8px;\n      right: 8px;\n      font-size: 1.2em;\n      cursor: pointer;\n    }\n    .dialogTitle {\n      overflow:auto;\n        width: 90%;\n      max-width: 520px;\n        font-size: 16px;\n    }\n    .dialogFooter {\n      overflow:hidden;\n        width: 95%;\n        position: absolute;\n        bottom: 0;\n    }\n    "]
        })
    ], ModalDialogComponent);
    return ModalDialogComponent;
}());



/***/ }),

/***/ "../../shared/ng2-animation/viewBlinker.ts":
/*!************************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/shared/ng2-animation/viewBlinker.ts ***!
  \************************************************************************************************/
/*! exports provided: ViewBlinkerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewBlinkerComponent", function() { return ViewBlinkerComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/animations */ "../../node_modules/@angular/animations/fesm5/animations.js");



var ViewBlinkerComponent = /** @class */ (function () {
    function ViewBlinkerComponent() {
        this.blinking = false;
        this.visibleWhenNotBlinking = false;
        this.visibility = 'hidden';
        this.initalized = false;
    }
    ViewBlinkerComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.initalized = true;
        }, 500);
    };
    ViewBlinkerComponent.prototype.startBlinking = function () {
        var _this = this;
        this.intervalId = setInterval(function () {
            if (!_this.blinking) {
                clearInterval(_this.intervalId);
                return;
            }
            if (_this.visibility === 'shown') {
                _this.visibility = 'hidden';
            }
            else {
                _this.visibility = 'shown';
            }
        }, 750);
    };
    ViewBlinkerComponent.prototype.ngOnChanges = function () {
        if (this.blinking) {
            this.startBlinking();
        }
        this.visibility = this.visibleWhenNotBlinking ? 'shown' : 'hidden';
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ViewBlinkerComponent.prototype, "blinking", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ViewBlinkerComponent.prototype, "visibleWhenNotBlinking", void 0);
    ViewBlinkerComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'view-blinker',
            template: "\n    <div [@visibilityChanged]='visibility' [style.visibility]=\"initalized ? 'visible' : 'hidden'\" >\n      <ng-content></ng-content>\n    </div>\n  ",
            animations: [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["trigger"])('visibilityChanged', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["state"])('shown', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ opacity: 1 })),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["state"])('hidden', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ opacity: 0 })),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])('* => *', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])('.25s'))
                ])
            ]
        })
    ], ViewBlinkerComponent);
    return ViewBlinkerComponent;
}());



/***/ }),

/***/ "../../shared/ng2-animation/viewFader.ts":
/*!**********************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/shared/ng2-animation/viewFader.ts ***!
  \**********************************************************************************************/
/*! exports provided: ViewFaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewFaderComponent", function() { return ViewFaderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/animations */ "../../node_modules/@angular/animations/fesm5/animations.js");



var ViewFaderComponent = /** @class */ (function () {
    function ViewFaderComponent() {
        this.isViewVisible = false;
        this.visibility = 'hidden';
        this.initalized = false;
    }
    ViewFaderComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.initalized = true;
            if (_this.isViewVisible) {
                _this.visibility = 'shown';
            }
            else {
                _this.visibility = 'hidden';
            }
        }, 500);
    };
    ViewFaderComponent.prototype.ngOnChanges = function () {
        if (!this.initalized) {
            return;
        }
        this.visibility = this.isViewVisible ? 'shown' : 'hidden';
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ViewFaderComponent.prototype, "isViewVisible", void 0);
    ViewFaderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'view-fader',
            template: "\n    <div [@visibilityChanged]=\"visibility\" [style.visibility]=\"initalized ? 'visible' : 'hidden' \">\n      <ng-content></ng-content>\n    </div>\n  ",
            animations: [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["trigger"])('visibilityChanged', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["state"])('shown', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ opacity: 1 })),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["state"])('hidden', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ opacity: 0 })),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])('* => *', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])('.5s'))
                ])
            ]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], ViewFaderComponent);
    return ViewFaderComponent;
}());



/***/ }),

/***/ "../../shared/ng2-apphelper/appHelper.module.ts":
/*!*****************************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/shared/ng2-apphelper/appHelper.module.ts ***!
  \*****************************************************************************************************/
/*! exports provided: AppHelperModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppHelperModule", function() { return AppHelperModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _appServices__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./appServices */ "../../shared/ng2-apphelper/appServices.ts");



var AppHelperModule = /** @class */ (function () {
    function AppHelperModule() {
    }
    AppHelperModule_1 = AppHelperModule;
    AppHelperModule.forRoot = function () {
        return {
            ngModule: AppHelperModule_1,
            providers: [_appServices__WEBPACK_IMPORTED_MODULE_2__["AppServices"]]
        };
    };
    var AppHelperModule_1;
    AppHelperModule = AppHelperModule_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [],
            exports: []
        })
    ], AppHelperModule);
    return AppHelperModule;
}());



/***/ }),

/***/ "../../shared/ng2-apphelper/appServices.ts":
/*!************************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/shared/ng2-apphelper/appServices.ts ***!
  \************************************************************************************************/
/*! exports provided: ThisWindow, AppServices */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThisWindow", function() { return ThisWindow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppServices", function() { return AppServices; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");


var ThisWindow = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ThisWindow, _super);
    function ThisWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ThisWindow;
}(Window));

var AppServices = /** @class */ (function () {
    function AppServices() {
    }
    //#region beep
    AppServices.prototype.beep = function (duration, frequency, volume, type, callback) {
        // type can be: sine, square, sawtooth, triangle or custom
        // frequency: 440 is 440Hz
        if (!this.audioCtx) {
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext || window.audioContext)();
        }
        var oscillator = this.audioCtx.createOscillator();
        var gainNode = this.audioCtx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(this.audioCtx.destination);
        if (volume) {
            gainNode.gain.setValueAtTime(volume, this.audioCtx.currentTime);
        }
        if (frequency) {
            oscillator.frequency.setValueAtTime(frequency, this.audioCtx.currentTime);
        }
        if (type) {
            oscillator.type = type;
        }
        if (callback) {
            oscillator.onended = callback;
        }
        oscillator.start();
        setTimeout(function () { oscillator.stop(); }, (duration ? duration : 500));
    };
    //#endregion
    //#region sleep
    AppServices.prototype.sleep = function (ms) {
        var futureMs = new Date().getTime() + ms;
        var timeNow = 0;
        do {
            timeNow = new Date().getTime();
        } while (timeNow < futureMs);
    };
    //#endregion
    //#region spellChecker
    AppServices.prototype.spellChecker = function (txtElement) {
        var newLines = new Array();
        var index = 0;
        newLines.push(index);
        var newLineArray = txtElement.value.split('\n');
        newLineArray.forEach(function (newLine) {
            index += newLine.length + 1;
            newLines.push(index);
        });
        index = 0;
        var intervalId = setInterval(function () {
            if (txtElement.setSelectionRange) {
                txtElement.focus();
                txtElement.setSelectionRange(newLines[index], newLines[index]);
            }
            else if (txtElement.createTextRange) {
                var range = txtElement.createTextRange();
                range.moveStart('character', newLines[index]);
                range.select();
            }
            if (index === newLines.length - 1) {
                clearInterval(intervalId);
            }
            index++;
        }, 100);
    };
    //#endregion
    //#region fullscreen
    AppServices.prototype.launchFullScreen = function () {
        var element = document.documentElement;
        if (element.requestFullScreen) {
            element.requestFullScreen();
        }
        else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
        }
        else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        }
    };
    AppServices.prototype.exitFullScreen = function () {
        var doc = document;
        if (doc.exitFullscreen) {
            doc.exitFullscreen();
        }
        else if (doc.mozCancelFullScreen) {
            doc.mozCancelFullScreen();
        }
        else if (doc.webkitExitFullscreen) {
            doc.webkitExitFullscreen();
        }
    };
    AppServices.prototype.isFullScreen = function () {
        var doc = document;
        if (doc.fullscreenElement || doc.webkitFullscreenElement || doc.mozFullScreenElement || doc.msFullscreenElement) {
            return true;
        }
        else {
            return false;
        }
    };
    AppServices = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], AppServices);
    return AppServices;
}());



/***/ }),

/***/ "../../shared/ng2-mobiletech/googleMaps.ts":
/*!************************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/shared/ng2-mobiletech/googleMaps.ts ***!
  \************************************************************************************************/
/*! exports provided: GoogleMapsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GoogleMapsComponent", function() { return GoogleMapsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");


var GoogleMapsComponent = /** @class */ (function () {
    function GoogleMapsComponent(cd, ngZone) {
        this.cd = cd;
        this.ngZone = ngZone;
        this.maplat = 0;
        this.maplng = 0;
        this.width = '';
        this.height = '';
        this.widthPercent = '';
        this.heightPercent = '';
        this.visibleChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    GoogleMapsComponent_1 = GoogleMapsComponent;
    GoogleMapsComponent.prototype.initialize = function () {
        var _this = this;
        this.url = 'https://maps.googleapis.com/maps/api/js?key=' + this.googleMapKey + '&callback=__onGoogleLoaded';
        GoogleMapsComponent_1.promise = new Promise(function () {
            var s = '__onGoogleLoaded';
            window[s] = function () {
                _this.loadGoogleMaps();
            };
            var node = document.createElement('script');
            node.src = _this.url;
            node.type = 'text/javascript';
            document.getElementsByTagName('head')[0].appendChild(node);
        });
        return GoogleMapsComponent_1.promise;
    };
    GoogleMapsComponent.prototype.loadGoogleMaps = function () {
        var _this = this;
        if (!isNaN(this.latitude) && !isNaN(this.longitude)) {
            this.maplat = this.latitude;
            this.maplng = this.longitude;
        }
        var mapProp = {
            center: new google.maps.LatLng(this.maplat, this.maplng),
            zoom: 13,
            fullscreenControl: false,
            streetViewControl: false
        };
        this.map = new google.maps.Map(document.getElementById('googleMap'), mapProp);
        this.marker = new google.maps.Marker({ position: new google.maps.LatLng(this.maplat, this.maplng), draggable: true });
        this.marker.setMap(this.map);
        google.maps.event.addListener(this.map, 'click', function (event) {
            _this.marker.setPosition(event.latLng);
            _this.latitude = event.latLng.lat();
            _this.longitude = event.latLng.lng();
        });
        var contentInfoWindow = "\n        <div>\n        <div>Set the Latitude and Longitude</div>\n        <div>to this marker location?</div>\n        <button style=\"margin-top:.5em;\" class=\"btn btn-primary btn-xs buttonUpdateCoordsFromMarkerLocation\">Update</button>\n        </div>";
        google.maps.event.addListener(this.marker, 'click', function () {
            var div = document.createElement('div');
            div.innerHTML = contentInfoWindow;
            var buttonUpdateCoordsFromMarkerLocation = div.getElementsByClassName('buttonUpdateCoordsFromMarkerLocation');
            if (buttonUpdateCoordsFromMarkerLocation.length) {
                var button = buttonUpdateCoordsFromMarkerLocation[0];
                button.onclick = function () {
                    _this.onClickUpdateCoordsFromMarkerLocation();
                };
            }
            var infowindow = new google.maps.InfoWindow({
                content: div
            });
            infowindow.open(_this.map, _this.marker);
        });
        google.maps.event.addListener(this.marker, 'dragend', function (event) {
            _this.latitude = event.latLng.lat();
            _this.longitude = event.latLng.lng();
        });
    };
    GoogleMapsComponent.prototype.recenterMapAndMarker = function () {
        if (!isNaN(this.latitude) && !isNaN(this.longitude)) {
            this.maplat = this.latitude;
            this.maplng = this.longitude;
            var latLgn = new google.maps.LatLng(this.maplat, this.maplng);
            this.map.setCenter(latLgn);
            this.marker.setPosition(latLgn);
        }
    };
    GoogleMapsComponent.prototype.markerDragEnd = function (m, $event) {
        this.latitude = $event.latLng.lat();
        this.longitude = $event.latLng.lng();
    };
    GoogleMapsComponent.prototype.onClickUpdateCoordsFromMarkerLocation = function () {
        var _this = this;
        this.ngZone.run(function () {
            _this.updateOwner();
        });
    };
    GoogleMapsComponent.prototype.updateOwner = function () {
        if (this.owner && this.updateCoordinatesCallback) {
            this.owner[this.updateCoordinatesCallback](Math.round(this.latitude * 100000) / 100000, Math.round(this.longitude * 100000) / 100000);
        }
    };
    GoogleMapsComponent.prototype.onBlurLatLng = function () {
        this.recenterMapAndMarker();
    };
    GoogleMapsComponent.prototype.findMe = function () {
        var _this = this;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                _this.latitude = position.coords.latitude;
                _this.longitude = position.coords.longitude;
                _this.recenterMapAndMarker();
                _this.updateOwner();
            }, function (error) {
                alert(error.message);
            });
        }
    };
    GoogleMapsComponent.prototype.useAddress = function (address$, zipcode$) {
        var _this = this;
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: address$ + ' ' + zipcode$ }, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                _this.latitude = results[0].geometry.location.lat();
                _this.longitude = results[0].geometry.location.lng();
                _this.recenterMapAndMarker();
                _this.updateOwner();
            }
            else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    };
    GoogleMapsComponent.prototype.lookupAddress = function () {
        var _this = this;
        var geocoder = new google.maps.Geocoder();
        var latlng = { lat: this.latitude, lng: this.longitude };
        geocoder.geocode({ location: latlng }, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                var address = results[0].address_components[0].short_name + ' ' + results[0].address_components[1].short_name;
                _this.owner[_this.updateAddressCallback](address, results[0].address_components[6].short_name);
            }
            else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    };
    var GoogleMapsComponent_1;
    GoogleMapsComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], GoogleMapsComponent.prototype, "isVisible", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], GoogleMapsComponent.prototype, "owner", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], GoogleMapsComponent.prototype, "updateCoordinatesCallback", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], GoogleMapsComponent.prototype, "updateAddressCallback", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], GoogleMapsComponent.prototype, "width", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], GoogleMapsComponent.prototype, "height", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], GoogleMapsComponent.prototype, "widthPercent", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], GoogleMapsComponent.prototype, "heightPercent", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], GoogleMapsComponent.prototype, "latitude", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], GoogleMapsComponent.prototype, "longitude", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], GoogleMapsComponent.prototype, "visibleChange", void 0);
    GoogleMapsComponent = GoogleMapsComponent_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'google-maps',
            //#region template:
            template: "<div id=\"googleMap\" [style.height.px]=\"height\"\n  [style.height.%]=\"heightPercent\" [style.width.px]=\"width\" [style.width.%]=\"widthPercent\" ></div>"
            // #endregion
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]])
    ], GoogleMapsComponent);
    return GoogleMapsComponent;
}());



/***/ }),

/***/ "../../shared/ng2-mobiletech/mobileTech.module.ts":
/*!*******************************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/shared/ng2-mobiletech/mobileTech.module.ts ***!
  \*******************************************************************************************************/
/*! exports provided: MobileTechModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MobileTechModule", function() { return MobileTechModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_modules_material_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/modules/material.module */ "../../shared/modules/material.module.ts");
/* harmony import */ var _speechToText__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./speechToText */ "../../shared/ng2-mobiletech/speechToText.ts");
/* harmony import */ var _textToSpeech__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./textToSpeech */ "../../shared/ng2-mobiletech/textToSpeech.ts");
/* harmony import */ var _googleMaps__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./googleMaps */ "../../shared/ng2-mobiletech/googleMaps.ts");








var MobileTechModule = /** @class */ (function () {
    function MobileTechModule() {
    }
    MobileTechModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _shared_modules_material_module__WEBPACK_IMPORTED_MODULE_4__["MaterialModule"]],
            declarations: [_speechToText__WEBPACK_IMPORTED_MODULE_5__["SpeechToTextComponent"], _textToSpeech__WEBPACK_IMPORTED_MODULE_6__["TextToSpeechComponent"], _googleMaps__WEBPACK_IMPORTED_MODULE_7__["GoogleMapsComponent"]],
            exports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _speechToText__WEBPACK_IMPORTED_MODULE_5__["SpeechToTextComponent"],
                _textToSpeech__WEBPACK_IMPORTED_MODULE_6__["TextToSpeechComponent"],
                _googleMaps__WEBPACK_IMPORTED_MODULE_7__["GoogleMapsComponent"]
            ],
            providers: []
        })
    ], MobileTechModule);
    return MobileTechModule;
}());



/***/ }),

/***/ "../../shared/ng2-mobiletech/speechToText.css":
/*!***************************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/shared/ng2-mobiletech/speechToText.css ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".overlay {\r\n  position: fixed;\r\n  top: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  right: 0;\r\n  background-color: rgba(0, 0, 0, 0.25);\r\n  z-index: 999;\r\n}\r\n\r\n.modalDialog {\r\n  z-index: 1000;\r\n  position: fixed;\r\n  right: 0;\r\n  left: 0;\r\n  top: 20px;\r\n  margin-top: 100px;\r\n  margin-right: auto;\r\n  margin-left: auto;\r\n  height: 200px;\r\n  width: 90%;\r\n  max-width: 520px;\r\n  background-color: #fff;\r\n  padding: 12px;\r\n  box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2), 0 13px 19px 2px rgba(0, 0, 0, 0.14), 0 5px 24px 4px rgba(0, 0, 0, 0.12);\r\n  border-radius: 25px !important;\r\n}\r\n\r\n@media (min-width: 768px) {\r\n  .modalDialog {\r\n    top: 40px;\r\n  }\r\n}\r\n\r\n.dialog__close-btn {\r\n  border: 0;\r\n  background: none;\r\n  color: #2d2d2d;\r\n  position: absolute;\r\n  top: 8px;\r\n  right: 8px;\r\n  font-size: 1.2em;\r\n  cursor: pointer;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NoYXJlZC9uZzItbW9iaWxldGVjaC9zcGVlY2hUb1RleHQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZUFBZTtFQUNmLE1BQU07RUFDTixTQUFTO0VBQ1QsT0FBTztFQUNQLFFBQVE7RUFDUixxQ0FBcUM7RUFDckMsWUFBWTtBQUNkOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGVBQWU7RUFDZixRQUFRO0VBQ1IsT0FBTztFQUNQLFNBQVM7RUFDVCxpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLGlCQUFpQjtFQUNqQixhQUFhO0VBQ2IsVUFBVTtFQUNWLGdCQUFnQjtFQUNoQixzQkFBc0I7RUFDdEIsYUFBYTtFQUNiLHNIQUFzSDtFQUV0SCw4QkFBOEI7QUFDaEM7O0FBRUE7RUFDRTtJQUNFLFNBQVM7RUFDWDtBQUNGOztBQUVBO0VBQ0UsU0FBUztFQUNULGdCQUFnQjtFQUNoQixjQUFjO0VBQ2Qsa0JBQWtCO0VBQ2xCLFFBQVE7RUFDUixVQUFVO0VBQ1YsZ0JBQWdCO0VBQ2hCLGVBQWU7QUFDakIiLCJmaWxlIjoiLi4vLi4vc2hhcmVkL25nMi1tb2JpbGV0ZWNoL3NwZWVjaFRvVGV4dC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIub3ZlcmxheSB7XHJcbiAgcG9zaXRpb246IGZpeGVkO1xyXG4gIHRvcDogMDtcclxuICBib3R0b206IDA7XHJcbiAgbGVmdDogMDtcclxuICByaWdodDogMDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMjUpO1xyXG4gIHotaW5kZXg6IDk5OTtcclxufVxyXG5cclxuLm1vZGFsRGlhbG9nIHtcclxuICB6LWluZGV4OiAxMDAwO1xyXG4gIHBvc2l0aW9uOiBmaXhlZDtcclxuICByaWdodDogMDtcclxuICBsZWZ0OiAwO1xyXG4gIHRvcDogMjBweDtcclxuICBtYXJnaW4tdG9wOiAxMDBweDtcclxuICBtYXJnaW4tcmlnaHQ6IGF1dG87XHJcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XHJcbiAgaGVpZ2h0OiAyMDBweDtcclxuICB3aWR0aDogOTAlO1xyXG4gIG1heC13aWR0aDogNTIwcHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICBwYWRkaW5nOiAxMnB4O1xyXG4gIGJveC1zaGFkb3c6IDAgN3B4IDhweCAtNHB4IHJnYmEoMCwgMCwgMCwgMC4yKSwgMCAxM3B4IDE5cHggMnB4IHJnYmEoMCwgMCwgMCwgMC4xNCksIDAgNXB4IDI0cHggNHB4IHJnYmEoMCwgMCwgMCwgMC4xMik7XHJcbiAgLW1zLWJvcmRlci1yYWRpdXM6IDVweCAhaW1wb3J0YW50O1xyXG4gIGJvcmRlci1yYWRpdXM6IDI1cHggIWltcG9ydGFudDtcclxufVxyXG5cclxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XHJcbiAgLm1vZGFsRGlhbG9nIHtcclxuICAgIHRvcDogNDBweDtcclxuICB9XHJcbn1cclxuXHJcbi5kaWFsb2dfX2Nsb3NlLWJ0biB7XHJcbiAgYm9yZGVyOiAwO1xyXG4gIGJhY2tncm91bmQ6IG5vbmU7XHJcbiAgY29sb3I6ICMyZDJkMmQ7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRvcDogOHB4O1xyXG4gIHJpZ2h0OiA4cHg7XHJcbiAgZm9udC1zaXplOiAxLjJlbTtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "../../shared/ng2-mobiletech/speechToText.ts":
/*!**************************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/shared/ng2-mobiletech/speechToText.ts ***!
  \**************************************************************************************************/
/*! exports provided: ThisWindow, SpeechToTextComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThisWindow", function() { return ThisWindow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpeechToTextComponent", function() { return SpeechToTextComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/animations */ "../../node_modules/@angular/animations/fesm5/animations.js");



var ThisWindow = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ThisWindow, _super);
    function ThisWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ThisWindow;
}(Window));

var SpeechToTextComponent = /** @class */ (function () {
    function SpeechToTextComponent(cd) {
        this.cd = cd;
        this.isClosable = true;
        this.positionTop = 20;
        this.autoRetry = false;
        this.visibleChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.initalized = false;
        this.s2tOn = false;
        this.s2tPaused = false;
        this.featureIsAvailable = true;
    }
    SpeechToTextComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.initalized = true;
            _this.setupSpeechToText();
        }, 500);
    };
    SpeechToTextComponent.prototype.debugText = function (message) {
        setTimeout(function () {
            try {
                var dt = document.getElementById('debugText');
                dt.innerHTML = message;
            }
            catch (e) { }
        });
    };
    SpeechToTextComponent.prototype.setupSpeechToText = function () {
        var _this = this;
        try {
            this.s2t = new (window.SpeechRecognition ||
                window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
        }
        catch (e) {
            this.featureIsAvailable = false;
            return;
        }
        this.s2t.lang = 'en-US';
        this.s2t.interimResults = false;
        this.s2t.continuous = true;
        this.s2t.maxAlternatives = 5;
        this.s2t.onresult = function (event) {
            _this.onResultsS2T(event);
        };
        this.s2t.onspeechend = function (event) {
            _this.endS2T();
        };
        this.s2t.onend = function (event) {
            _this.endS2T();
        };
        this.s2t.onerror = function (event) {
            _this.errorS2T(event.error);
        };
        this.s2t.onnomatch = function (event) {
            _this.noMatchS2T();
        };
    };
    SpeechToTextComponent.prototype.ngOnChanges = function () {
        if (!this.initalized) {
            return;
        }
        if (!this.s2tOn) {
            this.startButtonLabel = 'Start';
            this.onClickStart();
        }
    };
    SpeechToTextComponent.prototype.closeDialog = function () {
        if (this.s2tOn || this.s2tPaused) {
            this.onClickStop();
        }
        this.isVisible = false;
        this.visibleChange.emit(this.isVisible);
    };
    SpeechToTextComponent.prototype.onClickStart = function () {
        this.debugText('');
        this.startS2T();
        this.s2tOn = true;
    };
    SpeechToTextComponent.prototype.onClickStop = function () {
        this.s2t.stop();
        this.s2tOn = false;
        this.s2tPaused = false;
        this.startButtonLabel = 'Restart';
    };
    SpeechToTextComponent.prototype.onClickPause = function () {
        this.s2t.stop();
        this.s2tOn = false;
        this.s2tPaused = true;
        this.startButtonLabel = 'Resume';
    };
    SpeechToTextComponent.prototype.endS2T = function () {
        if (this.s2tOn) {
            this.s2tPaused = true;
            try {
                this.s2t.start();
            }
            catch (e) { }
        }
    };
    SpeechToTextComponent.prototype.startS2T = function () {
        if (!this.s2tOn) {
            if (!this.s2tPaused) {
                this.onRestartCallback();
                this.newSentence = true;
            }
            this.s2t.start();
        }
    };
    SpeechToTextComponent.prototype.errorS2T = function (message) {
        var _this = this;
        this.onClickPause();
        this.debugText('System Error: ' + message);
        this.cd.detectChanges();
        if (!this.autoRetry) {
            return;
        }
        this.debugText('Auto Retry');
        setTimeout(function () {
            _this.onClickStart();
        }, 1000);
    };
    SpeechToTextComponent.prototype.noMatchS2T = function () {
        this.debugText('System Error: Cannot recognize speech!');
    };
    SpeechToTextComponent.prototype.onResultsS2T = function (event) {
        var speech = event.results[event.results.length - 1][0].transcript;
        speech = this.speechRules(speech);
        this.onResultsCallback(speech);
    };
    SpeechToTextComponent.prototype.speechRules = function (inputString) {
        inputString = inputString.charAt(0).toUpperCase() + inputString.slice(1);
        return inputString;
    };
    SpeechToTextComponent.prototype.ngOnDestroy = function () {
        if (this.s2tOn) {
            this.onClickStop();
        }
    };
    SpeechToTextComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], SpeechToTextComponent.prototype, "isClosable", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], SpeechToTextComponent.prototype, "isVisible", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], SpeechToTextComponent.prototype, "owner", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function)
    ], SpeechToTextComponent.prototype, "onResultsCallback", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function)
    ], SpeechToTextComponent.prototype, "onRestartCallback", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], SpeechToTextComponent.prototype, "positionTop", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], SpeechToTextComponent.prototype, "autoRetry", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], SpeechToTextComponent.prototype, "visibleChange", void 0);
    SpeechToTextComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'speech-to-text',
            //#region template:
            template: __webpack_require__(/*! raw-loader!./speechToText.html */ "../../node_modules/raw-loader/index.js!../../shared/ng2-mobiletech/speechToText.html"),
            // #endregion
            animations: [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["trigger"])('modalDialogTrigger', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])('void => *', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ transform: 'scale3d(.3, .3, .3)' }),
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])(100)
                    ]),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])('* => void', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])(100, Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ transform: 'scale3d(.0, .0, .0)' }))
                    ])
                ])
            ],
            styles: [__webpack_require__(/*! ./speechToText.css */ "../../shared/ng2-mobiletech/speechToText.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])
    ], SpeechToTextComponent);
    return SpeechToTextComponent;
}());



/***/ }),

/***/ "../../shared/ng2-mobiletech/textToSpeech.css":
/*!***************************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/shared/ng2-mobiletech/textToSpeech.css ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".overlay {\r\n  position: fixed;\r\n  top: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  right: 0;\r\n  background-color: rgba(0, 0, 0, 0.25);\r\n  z-index: 999;\r\n}\r\n\r\n.modalDialog {\r\n  z-index: 1000;\r\n  position: fixed;\r\n  right: 0;\r\n  left: 0;\r\n  top: 20px;\r\n  margin-top: 100px;\r\n  margin-right: auto;\r\n  margin-left: auto;\r\n  height: 200px;\r\n  width: 90%;\r\n  max-width: 520px;\r\n  background-color: #fff;\r\n  padding: 12px;\r\n  box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2), 0 13px 19px 2px rgba(0, 0, 0, 0.14), 0 5px 24px 4px rgba(0, 0, 0, 0.12);\r\n  border-radius: 25px !important;\r\n}\r\n\r\n@media (min-width: 768px) {\r\n  .modalDialog {\r\n    top: 40px;\r\n  }\r\n}\r\n\r\n.dialog__close-btn {\r\n  border: 0;\r\n  background: none;\r\n  color: #2d2d2d;\r\n  position: absolute;\r\n  top: 8px;\r\n  right: 8px;\r\n  font-size: 1.2em;\r\n  cursor: pointer;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NoYXJlZC9uZzItbW9iaWxldGVjaC90ZXh0VG9TcGVlY2guY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZUFBZTtFQUNmLE1BQU07RUFDTixTQUFTO0VBQ1QsT0FBTztFQUNQLFFBQVE7RUFDUixxQ0FBcUM7RUFDckMsWUFBWTtBQUNkOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGVBQWU7RUFDZixRQUFRO0VBQ1IsT0FBTztFQUNQLFNBQVM7RUFDVCxpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLGlCQUFpQjtFQUNqQixhQUFhO0VBQ2IsVUFBVTtFQUNWLGdCQUFnQjtFQUNoQixzQkFBc0I7RUFDdEIsYUFBYTtFQUNiLHNIQUFzSDtFQUV0SCw4QkFBOEI7QUFDaEM7O0FBRUE7RUFDRTtJQUNFLFNBQVM7RUFDWDtBQUNGOztBQUVBO0VBQ0UsU0FBUztFQUNULGdCQUFnQjtFQUNoQixjQUFjO0VBQ2Qsa0JBQWtCO0VBQ2xCLFFBQVE7RUFDUixVQUFVO0VBQ1YsZ0JBQWdCO0VBQ2hCLGVBQWU7QUFDakIiLCJmaWxlIjoiLi4vLi4vc2hhcmVkL25nMi1tb2JpbGV0ZWNoL3RleHRUb1NwZWVjaC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIub3ZlcmxheSB7XHJcbiAgcG9zaXRpb246IGZpeGVkO1xyXG4gIHRvcDogMDtcclxuICBib3R0b206IDA7XHJcbiAgbGVmdDogMDtcclxuICByaWdodDogMDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMjUpO1xyXG4gIHotaW5kZXg6IDk5OTtcclxufVxyXG5cclxuLm1vZGFsRGlhbG9nIHtcclxuICB6LWluZGV4OiAxMDAwO1xyXG4gIHBvc2l0aW9uOiBmaXhlZDtcclxuICByaWdodDogMDtcclxuICBsZWZ0OiAwO1xyXG4gIHRvcDogMjBweDtcclxuICBtYXJnaW4tdG9wOiAxMDBweDtcclxuICBtYXJnaW4tcmlnaHQ6IGF1dG87XHJcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XHJcbiAgaGVpZ2h0OiAyMDBweDtcclxuICB3aWR0aDogOTAlO1xyXG4gIG1heC13aWR0aDogNTIwcHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICBwYWRkaW5nOiAxMnB4O1xyXG4gIGJveC1zaGFkb3c6IDAgN3B4IDhweCAtNHB4IHJnYmEoMCwgMCwgMCwgMC4yKSwgMCAxM3B4IDE5cHggMnB4IHJnYmEoMCwgMCwgMCwgMC4xNCksIDAgNXB4IDI0cHggNHB4IHJnYmEoMCwgMCwgMCwgMC4xMik7XHJcbiAgLW1zLWJvcmRlci1yYWRpdXM6IDVweCAhaW1wb3J0YW50O1xyXG4gIGJvcmRlci1yYWRpdXM6IDI1cHggIWltcG9ydGFudDtcclxufVxyXG5cclxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XHJcbiAgLm1vZGFsRGlhbG9nIHtcclxuICAgIHRvcDogNDBweDtcclxuICB9XHJcbn1cclxuXHJcbi5kaWFsb2dfX2Nsb3NlLWJ0biB7XHJcbiAgYm9yZGVyOiAwO1xyXG4gIGJhY2tncm91bmQ6IG5vbmU7XHJcbiAgY29sb3I6ICMyZDJkMmQ7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRvcDogOHB4O1xyXG4gIHJpZ2h0OiA4cHg7XHJcbiAgZm9udC1zaXplOiAxLjJlbTtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "../../shared/ng2-mobiletech/textToSpeech.ts":
/*!**************************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/shared/ng2-mobiletech/textToSpeech.ts ***!
  \**************************************************************************************************/
/*! exports provided: TextToSpeechComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextToSpeechComponent", function() { return TextToSpeechComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/animations */ "../../node_modules/@angular/animations/fesm5/animations.js");



var TextToSpeechComponent = /** @class */ (function () {
    function TextToSpeechComponent(cd) {
        this.cd = cd;
        this.isClosable = true;
        this.isUnattended = false;
        this.positionTop = 20;
        this.visibleChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.initalized = false;
        this.t2sOn = false;
        this.t2sPaused = false;
        this.featureIsAvailable = true;
    }
    TextToSpeechComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.initalized = true;
            _this.setupT2S();
        }, 500);
    };
    TextToSpeechComponent.prototype.setupT2S = function () {
        try {
            this.t2s = window.speechSynthesis;
            var textToSpeak = new SpeechSynthesisUtterance('testing... 1, 2, 3');
        }
        catch (e) {
            this.featureIsAvailable = false;
            return;
        }
    };
    TextToSpeechComponent.prototype.ngOnChanges = function () {
        if (!this.initalized) {
            return;
        }
        if (!this.t2sOn) {
            this.startButtonLabel = 'Start';
            this.onClickStart();
        }
    };
    TextToSpeechComponent.prototype.closeDialog = function () {
        if (this.t2sOn || this.t2sPaused) {
            this.onClickStop();
        }
        this.isVisible = false;
        this.visibleChange.emit(this.isVisible);
    };
    TextToSpeechComponent.prototype.Start = function () {
        var _this = this;
        if (this.t2sPaused) {
            this.t2s.resume();
        }
        else {
            var textToSpeak = new SpeechSynthesisUtterance(this.textToSpeak);
            this.t2s.speak(textToSpeak);
            textToSpeak.onend = function (event) {
                _this.onClickStop();
                _this.cd.detectChanges();
            };
        }
        this.t2sOn = true;
        this.t2sPaused = false;
        this.owner.onChangeCallback();
    };
    TextToSpeechComponent.prototype.onClickStart = function () {
        this.Start();
    };
    TextToSpeechComponent.prototype.onClickStop = function () {
        this.t2s.cancel();
        this.t2sOn = false;
        this.t2sPaused = false;
        this.startButtonLabel = 'Restart';
        this.owner.onChangeCallback();
    };
    TextToSpeechComponent.prototype.onClickPause = function () {
        this.t2sOn = false;
        this.t2sPaused = true;
        this.t2s.pause();
        this.startButtonLabel = 'Resume';
        this.owner.onChangeCallback();
    };
    TextToSpeechComponent.prototype.ngOnDestroy = function () {
        if (this.t2sOn) {
            this.onClickStop();
        }
    };
    TextToSpeechComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], TextToSpeechComponent.prototype, "isClosable", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], TextToSpeechComponent.prototype, "isUnattended", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], TextToSpeechComponent.prototype, "isVisible", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], TextToSpeechComponent.prototype, "textToSpeak", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], TextToSpeechComponent.prototype, "owner", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function)
    ], TextToSpeechComponent.prototype, "onChangeCallback", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], TextToSpeechComponent.prototype, "positionTop", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], TextToSpeechComponent.prototype, "visibleChange", void 0);
    TextToSpeechComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'text-to-speech',
            //#region template:
            template: __webpack_require__(/*! raw-loader!./textToSpeech.html */ "../../node_modules/raw-loader/index.js!../../shared/ng2-mobiletech/textToSpeech.html"),
            // #endregion
            animations: [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["trigger"])('modalDialogTrigger', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])('void => *', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ transform: 'scale3d(.3, .3, .3)' }),
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])(100)
                    ]),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])('* => void', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])(100, Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ transform: 'scale3d(.0, .0, .0)' }))
                    ])
                ])
            ],
            styles: [__webpack_require__(/*! ./textToSpeech.css */ "../../shared/ng2-mobiletech/textToSpeech.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])
    ], TextToSpeechComponent);
    return TextToSpeechComponent;
}());



/***/ }),

/***/ "../../src/app/side-nav.component.actions.ts":
/*!**************************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/src/app/side-nav.component.actions.ts ***!
  \**************************************************************************************************/
/*! exports provided: RequestAppSettings, ResponseAppSettings, NavigateTo, SideNavInit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestAppSettings", function() { return RequestAppSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResponseAppSettings", function() { return ResponseAppSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavigateTo", function() { return NavigateTo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SideNavInit", function() { return SideNavInit; });
/* harmony import */ var _shared_client_side_models_buildModels__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/client-side-models/buildModels */ "../../shared/client-side-models/buildModels.ts");

var RequestAppSettings = /** @class */ (function () {
    function RequestAppSettings(name, title, payload, playback, delay) {
        this.name = name;
        this.title = title;
        this.payload = payload;
        this.playback = playback;
        this.delay = delay;
    }
    RequestAppSettings.type = '[side-nav] Request AppSettings';
    RequestAppSettings.ctorParameters = function () { return [
        { type: String },
        { type: String },
        { type: Boolean },
        null,
        { type: Number }
    ]; };
    return RequestAppSettings;
}());

var ResponseAppSettings = /** @class */ (function () {
    function ResponseAppSettings(name, title, payload, playback, delay) {
        this.name = name;
        this.title = title;
        this.payload = payload;
        this.playback = playback;
        this.delay = delay;
    }
    ResponseAppSettings.type = '[side-nav] Response AppSettings';
    ResponseAppSettings.ctorParameters = function () { return [
        { type: String },
        { type: String },
        { type: _shared_client_side_models_buildModels__WEBPACK_IMPORTED_MODULE_0__["AppSettings"] },
        { type: Boolean },
        { type: Number }
    ]; };
    return ResponseAppSettings;
}());

var NavigateTo = /** @class */ (function () {
    function NavigateTo(name, title, payload, playback, delay) {
        this.name = name;
        this.title = title;
        this.payload = payload;
        this.playback = playback;
        this.delay = delay;
    }
    NavigateTo.type = '[side-nav] NavigateTo';
    NavigateTo.ctorParameters = function () { return [
        { type: String },
        { type: String },
        { type: String },
        { type: Boolean },
        { type: Number }
    ]; };
    return NavigateTo;
}());

var SideNavInit = /** @class */ (function () {
    // remove circular reference by using ngAction: any
    function SideNavInit(ngAction) {
        this.ngAction = ngAction;
    }
    SideNavInit.type = '[side-nav] SideNavInit';
    SideNavInit.ctorParameters = function () { return [
        { type: undefined }
    ]; };
    return SideNavInit;
}());



/***/ }),

/***/ "../../src/environments/environment.ts":
/*!********************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/src/environments/environment.ts ***!
  \********************************************************************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// this will work whenever the frontend and backend are served from one server
var environment = {
    production: false,
    api: {
        // App Settings
        getSysInfo: location.origin + '/api/sysInfo',
        sendTextMessage: location.origin + '/api/comm',
        // Http Demo
        getAll: location.origin + '/api/GetAll',
        getAllLocally: './assets/data/library.json',
        getContent: location.origin + '/api/GetContent',
        download: location.origin + '/api/Download',
        postEntity: location.origin + '/api/PostEntity',
        postCollection: location.origin + '/api/PostCollection',
        upload: location.origin + '/api/Upload',
        deleteEntity: location.origin + '/api/DeleteEntity',
        // Message Pump
        getRegisteredChannels: location.origin + '/api/messagePump/getRegisteredChannels',
        getChannelData: location.origin + '/api/messagePump/getchanneldata',
        sendChannelMessage: location.origin + '/api/messagePump/sendChannelMessage',
        executeNamedUnregister: location.origin + '/api/messagePump/executeNamedUnregister',
        executeChannelUnregistration: location.origin + '/api/messagePump/executeChannelUnregistration',
        executeChannelRegistration: location.origin + '/api/messagePump/executeChannelRegistration',
        // Redux
        samplePayload: location.origin + '/api/SamplePayload',
        // NgXs
        saveActionsQueue: location.origin + '/api/saveActionsQueue',
        loadActionsQueue: location.origin + '/api/loadActionsQueue',
        // Build
        getPackageJson: './package.json',
        getBuildConfig: location.origin + '/api/build/getConfig',
        saveVisualProject: location.origin + '/api/build/saveVisualProject',
        buildAngularProject: location.origin + '/api/build/buildAngularProject',
        addAngularProject: location.origin + '/api/build/addAngularProject',
        removeAngularProject: location.origin + '/api/build/removeAngularProject',
        // logEntry
        throwException: location.origin + '/api/build/throwException',
        postLogEntry: location.origin + '/api/build/postLogEntry',
        getLogEntries: location.origin + '/api/build/getLogEntries'
    }
};


/***/ }),

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _common_appConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../common/appConfig */ "../../common/appConfig.ts");



// services

var AppComponent = /** @class */ (function () {
    function AppComponent(route, router, ac) {
        this.route = route;
        this.router = router;
        this.ac = ac;
        this.appTitle = 'Angular.Net Application (Phone)';
        this.showOpeningTitle = true;
        this.showMobileApiView = false;
        this.appLoaded = false;
        this.appHref = window.location.href;
    }
    AppComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.ac.onResizeApp();
        this.ac.onOrientationChange();
        window.addEventListener('offline', function (event) {
            _this.ac.toastrInfo('The application just went offline!');
            _this.ac.isOnline = false;
        }, false);
        window.addEventListener('online', function (event) {
            _this.ac.toastrInfo('The application is back online!');
            _this.ac.isOnline = true;
        }, false);
        window.addEventListener('resize', function (event) {
            if (_this.resizeTimerId) {
                return;
            }
            _this.resizeTimerId = setTimeout(function () {
                _this.ac.onResizeApp();
                _this.resizeTimerId = null;
            }, 500);
        }, false);
        window.addEventListener('orientationchange', function (event) {
            setTimeout(function () {
                _this.ac.onOrientationChange();
            });
        }, false);
        this.ac.getAppSettings(function () {
            _this.checkForUpdates();
            _this.navigateForward();
        }, function (errorMessage) {
            // this.toastr.warning(this.appTitle + ': is Offline!');
            _this.navigateForward();
        });
    };
    AppComponent.prototype.checkForUpdates = function () {
        var _this = this;
        setTimeout(function () {
            var versionNumber = _this.ac.getLocalStorage('versionNumber');
            if (versionNumber && versionNumber.vn !== _this.ac.appSettings.buildVersion && !_this.ac.appSettings.debug) {
                _this.ac.setLocalStorage('versionNumber', { vn: _this.ac.appSettings.buildVersion });
                // this.toastr.info('A newer version is available! Restarting the application...');
                setTimeout(function () {
                    _this.restartApp();
                }, 5000);
            }
            else {
                _this.ac.setLocalStorage('versionNumber', { vn: _this.ac.appSettings.buildVersion });
                setTimeout(function () {
                    if (navigator.onLine) {
                        _this.ac.isOnline = true;
                        // this.toastr.success('This application is operating online as normal.', 'Success!');
                    }
                    else {
                        _this.ac.isOnline = false;
                        // this.toastr.warning('This application is operating offline as normal.', 'Warning!');
                    }
                });
            }
        }, 3000);
    };
    AppComponent.prototype.navigateForward = function () {
        var _this = this;
        setTimeout(function () {
            _this.showOpeningTitle = false;
            _this.showMobileApiView = true;
            _this.router.navigate(['/mobileApis']);
        }, this.ac.appSettings.splashTime); // navigate away from splash view
    };
    AppComponent.prototype.restartApp = function () {
        window.location.href = this.appHref;
    };
    AppComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: _common_appConfig__WEBPACK_IMPORTED_MODULE_3__["AppConfig"] }
    ]; };
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! raw-loader!./app.component.htmx */ "../../node_modules/raw-loader/index.js!./src/app/app.component.htmx"),
            providers: [_common_appConfig__WEBPACK_IMPORTED_MODULE_3__["AppConfig"]],
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _common_appConfig__WEBPACK_IMPORTED_MODULE_3__["AppConfig"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "../../node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "../../node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser/animations */ "../../node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _shared_ng2_animation_appAnimation_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../shared/ng2-animation/appAnimation.module */ "../../shared/ng2-animation/appAnimation.module.ts");
/* harmony import */ var _shared_ng2_mobiletech_mobileTech_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../shared/ng2-mobiletech/mobileTech.module */ "../../shared/ng2-mobiletech/mobileTech.module.ts");
/* harmony import */ var _shared_ng2_apphelper_appHelper_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../shared/ng2-apphelper/appHelper.module */ "../../shared/ng2-apphelper/appHelper.module.ts");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ngxs/store */ "../../node_modules/@ngxs/store/fesm5/ngxs-store.js");
/* harmony import */ var _ngxs_devtools_plugin__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ngxs/devtools-plugin */ "../../node_modules/@ngxs/devtools-plugin/fesm5/ngxs-devtools-plugin.js");
/* harmony import */ var _ngxs_logger_plugin__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ngxs/logger-plugin */ "../../node_modules/@ngxs/logger-plugin/fesm5/ngxs-logger-plugin.js");
/* harmony import */ var _features_mobileApis_module__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../features/mobileApis.module */ "../../features/mobileApis.module.ts");
/* harmony import */ var _shared_modules_material_module__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../shared/modules/material.module */ "../../shared/modules/material.module.ts");
/* harmony import */ var _features_base_help_dialog__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../features/base.help.dialog */ "../../features/base.help.dialog.ts");
/* harmony import */ var _features_mobileApis_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../features/mobileApis.component */ "../../features/mobileApis.component.ts");







// features

// services



// ngxs







var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"], _features_base_help_dialog__WEBPACK_IMPORTED_MODULE_16__["BaseHelpDialogComponent"], _features_mobileApis_component__WEBPACK_IMPORTED_MODULE_17__["MobileApisHelpDialogComponent"]],
            imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"],
                _shared_ng2_animation_appAnimation_module__WEBPACK_IMPORTED_MODULE_8__["AppAnimationModule"],
                _shared_ng2_mobiletech_mobileTech_module__WEBPACK_IMPORTED_MODULE_9__["MobileTechModule"],
                _shared_ng2_apphelper_appHelper_module__WEBPACK_IMPORTED_MODULE_10__["AppHelperModule"].forRoot(),
                _features_mobileApis_module__WEBPACK_IMPORTED_MODULE_14__["MobileApisModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"].forRoot([]),
                _ngxs_store__WEBPACK_IMPORTED_MODULE_11__["NgxsModule"].forRoot([]),
                _features_mobileApis_module__WEBPACK_IMPORTED_MODULE_14__["MobileApisModule"],
                _ngxs_devtools_plugin__WEBPACK_IMPORTED_MODULE_12__["NgxsReduxDevtoolsPluginModule"].forRoot(),
                _ngxs_logger_plugin__WEBPACK_IMPORTED_MODULE_13__["NgxsLoggerPluginModule"].forRoot(), _shared_modules_material_module__WEBPACK_IMPORTED_MODULE_15__["MaterialModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "../../node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\ProMatrix.2\Angular.Net.CLI\AngularDotNet\wwwroot\projects\phone\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map