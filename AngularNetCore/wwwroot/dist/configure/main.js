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

/***/ "../../common/buildConfig.ts":
/*!**********************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/common/buildConfig.ts ***!
  \**********************************************************************************/
/*! exports provided: EventProperties, EventLogEntry, BuildConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventProperties", function() { return EventProperties; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventLogEntry", function() { return EventLogEntry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BuildConfig", function() { return BuildConfig; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "../../node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _shared_enterprise_apiService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/enterprise/apiService */ "../../shared/enterprise/apiService.ts");
/* harmony import */ var _shared_client_side_models_buildModels__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/client-side-models/buildModels */ "../../shared/client-side-models/buildModels.ts");
/* harmony import */ var _src_environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../src/environments/environment */ "../../src/environments/environment.ts");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngxs/store */ "../../node_modules/@ngxs/store/fesm5/ngxs-store.js");







var EventProperties = /** @class */ (function () {
    function EventProperties() {
    }
    return EventProperties;
}());

var EventLogEntry = /** @class */ (function () {
    function EventLogEntry() {
    }
    return EventLogEntry;
}());

var BuildConfig = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](BuildConfig, _super);
    function BuildConfig(store, http) {
        var _this = _super.call(this, http, store) || this;
        _this.store = store;
        _this.http = http;
        _this.buildOutput = '';
        _this.config = new _shared_client_side_models_buildModels__WEBPACK_IMPORTED_MODULE_4__["BuildConfiguration"]();
        _this.buildConfig = new _shared_client_side_models_buildModels__WEBPACK_IMPORTED_MODULE_4__["BuildConfiguration"]();
        _this.vsProject = new _shared_client_side_models_buildModels__WEBPACK_IMPORTED_MODULE_4__["VisualProject"]();
        _this.eventLogEntries = new Array();
        _this.eventProperties = { exception: '', message: '', entryType: 1 };
        return _this;
    }
    BuildConfig.prototype.throwException = function (success, error) {
        this.post(this.eventProperties, _src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].api.throwException, function (response) {
            success();
        }, function () {
            error('Error: Successfully generated an Application Exception!');
        });
    };
    BuildConfig.prototype.logEntry = function (success, error) {
        this.post(this.eventProperties, _src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].api.postLogEntry, function (response) {
            success();
        }, function () {
            error('Error: Successfully created a log entry!');
        });
    };
    BuildConfig.prototype.getLogEntries = function (success, error) {
        var _this = this;
        this.get(_src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].api.getLogEntries, function (eventLogEntries) {
            _this.eventLogEntries = eventLogEntries;
            _this.eventLogEntries.forEach(function (entry) {
                entry.timeGenerated = new Date(entry.timeGenerated);
                entry.timeWritten = new Date(entry.timeWritten);
                entry.replacementStrings[1] = entry.replacementStrings[1].replace('\n', '<br />');
            });
            success();
        }, function (errorMessage) { error(errorMessage); });
    };
    BuildConfig.prototype.getBuildConfig = function (success, error) {
        var _this = this;
        this.get(_src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].api.getBuildConfig, function (buildConfig) {
            _this.buildConfig = buildConfig;
            _this.vsProject = buildConfig.visualProjects[0];
            success();
        }, function (errorMessage) { error(errorMessage); });
    };
    BuildConfig.prototype.saveVisualProject = function (success, error) {
        this.post(this.vsProject, _src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].api.saveVisualProject, function (response) {
            success();
        }, function () {
            error('Error: Problems saving changes! Could be that the server is not available.');
        });
    };
    BuildConfig.prototype.buildAngularProject = function (angularProject, success, error) {
        var _this = this;
        this.angularProject = angularProject;
        setTimeout(function () {
            _this.post(angularProject, _src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].api.buildAngularProject, function (buildResponse) {
                switch (buildResponse.payloadType) {
                    case 'processing':
                        _this.buildAngularProject(angularProject, success, error);
                        _this.buildOutput += buildResponse.consoleText;
                        break;
                    case 'completed':
                        _this.buildOutput += buildResponse.consoleText;
                        success(buildResponse.versionNo);
                        break;
                    case 'errored':
                        _this.buildOutput += buildResponse.consoleText;
                        error('Error while building: ' + angularProject.name);
                        break;
                }
                setTimeout(function () {
                    _this.consoleWindow.scrollTop = _this.consoleWindow.scrollHeight;
                }, 0);
            }, function (errorMessage) {
                error(errorMessage);
            });
        }, 1000);
    };
    BuildConfig.prototype.buildAngularProjects = function (success, error) {
        var _this = this;
        this.consoleWindow = document.querySelector('.textAreaForConsole');
        this.projectQueue = this.vsProject.developerSettings.angularProjects.filter(function (angularProject) { return angularProject.buildEnabled === true; });
        this.buildOutput = this.vsProject.name + '>';
        setTimeout(function () {
            _this.projectQueue.forEach(function (project) { project.visualProject = _this.vsProject.name; });
            _this.buildOutput = '';
            _this.buildProjectLoop(success, error);
        }, 1000);
    };
    BuildConfig.prototype.buildProjectLoop = function (success, error) {
        var _this = this;
        this.nextAngularProject(function (buildVersion) {
            if (_this.projectQueue.length === 0) {
                success(buildVersion);
            }
            else {
                _this.buildProjectLoop(success, error);
            }
        }, function () {
            error();
        });
    };
    BuildConfig.prototype.nextAngularProject = function (success, error) {
        var angularProject = this.projectQueue.shift();
        if (angularProject.buildEnabled) {
            this.buildOutput += angularProject.name + '>';
            this.buildAngularProject(angularProject, function (buildVersion) {
                success(buildVersion);
            }, function (errorMessage) {
                error();
            });
        }
        else {
            success(null);
        }
    };
    // updateImports(visualProject: VisualProject, success: Function, error: Function) {
    //    this.httpPost("build", "updateImports", visualProject, () => {
    //        success();
    //    },
    //        errorMessage => {
    //            error(errorMessage);
    //        });
    // }
    // updateExports(visualProject: VisualProject, success: Function, error: Function) {
    //    this.httpPost("build", "updateExports", visualProject, () => {
    //        success();
    //    },
    //        errorMessage => {
    //            error(errorMessage);
    //        });
    // }
    // isImportsUpdated(vsProject: VisualProject): boolean {
    //    return false;
    // }
    // getIsExportsUpdated(vsProject: VisualProject, success: Function, error: Function): boolean {
    //    this.httpGet("build", "getIsExportLibrariesSame", vsProject.name, (allFilesSame: boolean) => {
    //        success(allFilesSame);
    //    },
    //        errorMessage => {
    //            error(errorMessage);
    //        });
    //    return false;
    // }
    BuildConfig.prototype.addProject = function (success, error, finale) {
        var _this = this;
        var vsp = new _shared_client_side_models_buildModels__WEBPACK_IMPORTED_MODULE_4__["VisualProject"]();
        vsp.name = this.vsProject.name;
        vsp.developerSettings.angularProjects = Array.from(this.vsProject.developerSettings.angularProjects);
        vsp.developerSettings.angularProjects.push(this.angularProject);
        this.post(vsp, _src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].api.addAngularProject, function (visualProject) {
            _this.vsProject = visualProject;
            success();
            finale();
        }, function (errorMessage) {
            error(errorMessage);
            finale();
        });
    };
    BuildConfig.prototype.removeProject = function (success, error) {
        var _this = this;
        var angularProjects = Array.from(this.vsProject.developerSettings.angularProjects);
        // move the AngularProject to the bottom
        var projectToMove = this.vsProject.developerSettings.angularProjects.splice(this.vsProject.developerSettings.angularProjects.indexOf(this.angularProject), 1)[0];
        this.vsProject.developerSettings.angularProjects.push(projectToMove);
        this.post(this.vsProject, _src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].api.removeAngularProject, function () {
            _this.vsProject.developerSettings.serveApp = 'desktop';
            _this.vsProject.developerSettings.angularProjects.pop();
            success();
        }, function (errorMessage) {
            _this.vsProject.developerSettings.angularProjects = angularProjects;
            error(errorMessage);
        });
    };
    BuildConfig.ctorParameters = function () { return [
        { type: _ngxs_store__WEBPACK_IMPORTED_MODULE_6__["Store"] },
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    BuildConfig = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ngxs_store__WEBPACK_IMPORTED_MODULE_6__["Store"], _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], BuildConfig);
    return BuildConfig;
}(_shared_enterprise_apiService__WEBPACK_IMPORTED_MODULE_3__["ApiService"]));



/***/ }),

/***/ "../../common/entityService.ts":
/*!************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/common/entityService.ts ***!
  \************************************************************************************/
/*! exports provided: BookInfo, EntityService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BookInfo", function() { return BookInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntityService", function() { return EntityService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "../../node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _shared_enterprise_apiService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/enterprise/apiService */ "../../shared/enterprise/apiService.ts");
/* harmony import */ var _src_environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../src/environments/environment */ "../../src/environments/environment.ts");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngxs/store */ "../../node_modules/@ngxs/store/fesm5/ngxs-store.js");





// ngxs

var BookInfo = /** @class */ (function () {
    function BookInfo() {
    }
    return BookInfo;
}());

// #endregion
var EntityService = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](EntityService, _super);
    function EntityService(store, http) {
        var _this = _super.call(this, http, store) || this;
        _this.store = store;
        _this.http = http;
        return _this;
    }
    EntityService.prototype.getAll = function (success, error) {
        this.get(_src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].api.getAll, function (library) {
            success(library);
        }, function (errorMessage) { error(errorMessage); });
    };
    EntityService.prototype.getAllLocally = function (success, error) {
        this.get(_src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].api.getAllLocally, function (library) {
            success(library);
        }, function (errorMessage) { error(errorMessage); });
    };
    EntityService.prototype.getFromId = function (success, error, fileName) {
        this.get(_src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].api.getContent, function (response) {
            success(response.content);
        }, error, new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpParams"]().set('fileName', fileName));
    };
    EntityService.prototype.getWithProgress = function (success, error, fileName, progressCallback) {
        this.get(_src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].api.getContent, function (response) {
            success(response.content);
        }, error, new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpParams"]().set('fileName', fileName), null, function (event) {
            if (progressCallback) {
                progressCallback(event);
            }
        });
    };
    EntityService.prototype.downloadFile = function (success, error, fileName) {
        this.download(_src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].api.download, function (response) {
            var fileBlob = new Blob([response.body], { type: 'text/plain' });
            success(fileBlob);
        }, error, new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpParams"]().set('fileName', fileName));
    };
    EntityService.prototype.samplePayload = function (blob, type, success, error) {
        var file = new File([blob], 'simple.txt', { type: type });
        var files = new Array();
        files.push(file);
        this.upload(files, _src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].api.samplePayload, function (response) {
            success('Successfully completed Upload Payload Sample!');
        }, error, null, null, function (event) {
        });
    };
    EntityService.prototype.downloadWithProgress = function (success, error, fileName, progressCallback) {
        var _this = this;
        this.download(_src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].api.download, function (response) {
            _this.saveFile(new Blob([response.body]), fileName);
            success();
        }, error, new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpParams"]().set('fileName', fileName), null, function (event) {
            if (progressCallback) {
                return progressCallback(event);
            }
        });
    };
    EntityService.prototype.postEntity = function (success, error) {
        this.post({ id: 123, name: 'A Bedtime Story', summary: 'BORING...' }, _src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].api.postEntity, function (response) {
            success('Successfully completed Post Entity!');
        }, error);
    };
    EntityService.prototype.postCollection = function (success, error) {
        this.post([{ id: 123, name: 'A Bedtime Story', summary: 'BORING...' },
            { id: 456, name: 'An Endless Story', summary: 'Endless...' },
            { id: 789, name: 'Happy Ever After', summary: 'Exciting...' }], _src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].api.postCollection, function (response) {
            success('Successfully completed Post Collection!');
        }, error);
    };
    EntityService.prototype.postCollectionWithProgess = function (success, error, progressCallback) {
        var collection = [{ id: 123, name: 'A Bedtime Story', summary: 'BORING...' },
            { id: 456, name: 'An Endless Story', summary: 'Endless...' },
            { id: 789, name: 'Happy Ever After', summary: 'Exciting...' }];
        this.post(collection, _src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].api.postCollection, function (response) {
            success('Successfully completed Post with Progress!');
        }, error, null, null, function (event) {
            if (progressCallback) {
                progressCallback(event);
            }
        });
    };
    EntityService.prototype.uploadFile = function (files, success, error, progressCallback) {
        this.upload(files, _src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].api.upload, function (response) {
            success('Successfully completed Upload Files(s)!');
        }, error, null, null, function (event) {
            if (progressCallback) {
                progressCallback(event);
            }
        });
    };
    EntityService.prototype.uploadFileWithProgess = function (files, success, error, progressCallback) {
        this.upload(files, _src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].api.upload, function () {
            success();
        }, error, null, null, function (event) {
            if (progressCallback) {
                return progressCallback(event);
            }
        });
    };
    EntityService.prototype.deleteEntity = function (success, error, id) {
        this.delete(_src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].api.deleteEntity, function (response) {
            success('Successfully deleted entity!');
        }, error, new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpParams"]().set('id', id));
    };
    EntityService.prototype.saveActionsQueue = function (success, error) {
        this.post({ fileName: 'actionsQueue003.json', actions: this.ngAction.actionsQueue }, _src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].api.saveActionsQueue, function (response) {
            success('Successfully saved the Actions Queue!');
        }, error);
    };
    EntityService.prototype.loadActionsQueue = function (success, error, fileName) {
        var _this = this;
        this.get(_src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].api.loadActionsQueue, function (actionsQueue) {
            _this.ngAction.replaceActionsQueue(actionsQueue);
            success('Successfully loaded the Actions Queue!');
        }, error, new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpParams"]().set('fileName', fileName));
    };
    EntityService.ctorParameters = function () { return [
        { type: _ngxs_store__WEBPACK_IMPORTED_MODULE_5__["Store"] },
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    EntityService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ngxs_store__WEBPACK_IMPORTED_MODULE_5__["Store"], _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], EntityService);
    return EntityService;
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

/***/ "../../features/development.component.ts":
/*!**********************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/features/development.component.ts ***!
  \**********************************************************************************************/
/*! exports provided: BuildDialogData, DevelopmentBuildDialogComponent, AddDialogData, DevelopmentAddDialogComponent, RemoveDialogData, DevelopmentRemoveDialogComponent, DevelopmentComponent, DevelopmentHelpDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BuildDialogData", function() { return BuildDialogData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DevelopmentBuildDialogComponent", function() { return DevelopmentBuildDialogComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddDialogData", function() { return AddDialogData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DevelopmentAddDialogComponent", function() { return DevelopmentAddDialogComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RemoveDialogData", function() { return RemoveDialogData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DevelopmentRemoveDialogComponent", function() { return DevelopmentRemoveDialogComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DevelopmentComponent", function() { return DevelopmentComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DevelopmentHelpDialogComponent", function() { return DevelopmentHelpDialogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "../../node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/dialog */ "../../node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var _common_appConfig__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/appConfig */ "../../common/appConfig.ts");
/* harmony import */ var _common_buildConfig__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/buildConfig */ "../../common/buildConfig.ts");
/* harmony import */ var _common_entityService__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../common/entityService */ "../../common/entityService.ts");
/* harmony import */ var _shared_client_side_models_buildModels__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/client-side-models/buildModels */ "../../shared/client-side-models/buildModels.ts");




// services




var BuildDialogData = /** @class */ (function () {
    function BuildDialogData() {
    }
    return BuildDialogData;
}());

var DevelopmentBuildDialogComponent = /** @class */ (function () {
    function DevelopmentBuildDialogComponent(data) {
        this.data = data;
        this.buildDialogData = data.buildDialogData;
    }
    DevelopmentBuildDialogComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"],] }] }
    ]; };
    DevelopmentBuildDialogComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            template: __webpack_require__(/*! raw-loader!./development.build.dialog.html */ "../../node_modules/raw-loader/index.js!../../features/development.build.dialog.html")
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object])
    ], DevelopmentBuildDialogComponent);
    return DevelopmentBuildDialogComponent;
}());

var AddDialogData = /** @class */ (function () {
    function AddDialogData() {
    }
    return AddDialogData;
}());

var DevelopmentAddDialogComponent = /** @class */ (function () {
    function DevelopmentAddDialogComponent(data) {
        this.data = data;
        this.showSpinner = false;
        this.ad = data.addDialogData;
    }
    DevelopmentAddDialogComponent.prototype.onClickAddAngularProject = function () {
        var _this = this;
        if (this.ad.bc.vsProject.developerSettings.angularProjects.find(function (project) { return project.name === _this.ad.projectName; })) {
            this.ad.ac.toastrError('A project with that name already exists! Please choose a unique project name.');
            return;
        }
        this.showSpinner = true;
        this.ad.bc.angularProject = new _shared_client_side_models_buildModels__WEBPACK_IMPORTED_MODULE_7__["AngularProject"]();
        this.ad.bc.angularProject.name = this.ad.projectName;
        this.ad.bc.addProject(function () {
            _this.ad.ac.toastrSuccess('Completed the add successfully!');
            _this.ad.matDialogRef.close();
        }, function (errorMessage) {
            _this.ad.ac.toastrError(errorMessage);
        }, function () {
            _this.showSpinner = false;
        });
    };
    DevelopmentAddDialogComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"],] }] }
    ]; };
    DevelopmentAddDialogComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            template: __webpack_require__(/*! raw-loader!./development.add.dialog.html */ "../../node_modules/raw-loader/index.js!../../features/development.add.dialog.html")
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object])
    ], DevelopmentAddDialogComponent);
    return DevelopmentAddDialogComponent;
}());

var RemoveDialogData = /** @class */ (function () {
    function RemoveDialogData() {
    }
    return RemoveDialogData;
}());

var DevelopmentRemoveDialogComponent = /** @class */ (function () {
    function DevelopmentRemoveDialogComponent(data) {
        this.data = data;
        this.removeDialogData = data.removeDialogData;
    }
    DevelopmentRemoveDialogComponent.prototype.onClickYes = function () {
        var _this = this;
        this.removeDialogData.bc.removeProject(function () {
            _this.removeDialogData.ac.toastrSuccess('Completed the remove successfully!');
            _this.removeDialogData.matDialogRef.close();
        }, function (errorMessage) {
            _this.removeDialogData.ac.toastrError(errorMessage);
        });
    };
    DevelopmentRemoveDialogComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"],] }] }
    ]; };
    DevelopmentRemoveDialogComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            template: __webpack_require__(/*! raw-loader!./development.remove.dialog.html */ "../../node_modules/raw-loader/index.js!../../features/development.remove.dialog.html")
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object])
    ], DevelopmentRemoveDialogComponent);
    return DevelopmentRemoveDialogComponent;
}());

var DevelopmentComponent = /** @class */ (function () {
    function DevelopmentComponent(bc, ac, dialog, es) {
        this.bc = bc;
        this.ac = ac;
        this.dialog = dialog;
        this.es = es;
        this.isViewVisible = false;
        this.selectedIndex = 1;
        this.savingChanges = false;
        this.buildDialogData = new BuildDialogData();
        this.addDialogData = new AddDialogData();
        this.removeDialogData = new RemoveDialogData();
    }
    DevelopmentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ac.waitUntilInitialized(function () {
            setTimeout(function () {
                _this.getBuildConfig();
            }, 0);
        });
    };
    DevelopmentComponent.prototype.onChangeTab = function (selectedIndex) {
        if (selectedIndex === 2) {
            this.getLogEntries();
        }
    };
    DevelopmentComponent.prototype.getBuildConfig = function () {
        var _this = this;
        this.bc.getBuildConfig(function () {
            _this.isViewVisible = true;
        }, function (errorMessage) {
            _this.isViewVisible = true;
        });
    };
    // project management
    DevelopmentComponent.prototype.onClickDebugRelease = function (vsProject) {
        vsProject.developerSettings.executeDist = true;
    };
    DevelopmentComponent.prototype.willExecuteProject = function (angularProject) {
        if (this.bc.vsProject.developerSettings.serveApp === angularProject.name && !this.bc.vsProject.developerSettings.executeDist) {
            return true;
        }
        else {
            return false;
        }
    };
    DevelopmentComponent.prototype.angularProjectSelected = function (vsProject, angularProject) {
        if (vsProject.developerSettings.serveApp === angularProject.name) {
            return true;
        }
        else {
            return false;
        }
    };
    DevelopmentComponent.prototype.onClickReleaseProject = function (angularProject) {
        this.bc.vsProject.developerSettings.serveApp = angularProject.name;
    };
    DevelopmentComponent.prototype.onClickDebugEnabled = function (angularProject) {
        this.bc.vsProject.developerSettings.executeDist = false;
        this.bc.vsProject.developerSettings.serveApp = angularProject.name;
    };
    DevelopmentComponent.prototype.saveChanges = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.savingChanges) {
                return;
            }
            _this.savingChanges = true;
            _this.bc.saveVisualProject(function () {
                _this.savingChanges = false;
            }, function (errorMessage) {
                _this.ac.toastrError(errorMessage);
                _this.savingChanges = false;
            });
        }, 0);
    };
    DevelopmentComponent.prototype.willExecuteRelease = function (vsProject) {
        if (vsProject.developerSettings.executeDist) {
            return 'checked';
        }
        else {
            return '';
        }
    };
    DevelopmentComponent.prototype.onClickBuild = function () {
        var _this = this;
        this.bc.buildOutput = '';
        this.buildDialogData.title = 'Building: Angular Project(s)';
        this.buildDialogData.bc = this.bc;
        this.buildDialogData.closeDisabled = true;
        this.matDialogRef = this.dialog.open(DevelopmentBuildDialogComponent, {
            width: '675px',
            disableClose: true,
            data: {
                buildDialogData: this.buildDialogData
            }
        });
        this.bc.buildAngularProjects(function (buildVersion) {
            _this.buildDialogData.closeDisabled = false;
            if (buildVersion) {
                _this.ac.appSettings.buildVersion = buildVersion;
                _this.buildDialogData.closeDisabled = false;
            }
            _this.ac.toastrSuccess('Successful build!');
        }, function () {
            _this.ac.toastrError('Error while building: ');
            _this.buildDialogData.closeDisabled = false;
        });
    };
    DevelopmentComponent.prototype.onClickAdd = function () {
        this.addDialogData.title = 'Adding: Angular Project';
        this.addDialogData.ac = this.ac;
        this.addDialogData.bc = this.bc;
        this.addDialogData.saveDisabled = false;
        this.addDialogData.projectName = '';
        this.addDialogData.matDialogRef = this.dialog.open(DevelopmentAddDialogComponent, {
            width: '400px',
            disableClose: true,
            data: {
                addDialogData: this.addDialogData,
            }
        });
    };
    DevelopmentComponent.prototype.onClickRemove = function (vsProject, angularProject) {
        this.bc.angularProject = angularProject;
        this.removeDialogData.title = 'Warning! Removing Project: ' + angularProject.name;
        this.removeDialogData.ac = this.ac;
        this.removeDialogData.bc = this.bc;
        this.removeDialogData.message = 'Are you sure that you want to remove the project: ' + angularProject.name + ', and all of its components?';
        this.removeDialogData.projectName = angularProject.name;
        this.removeDialogData.matDialogRef = this.dialog.open(DevelopmentRemoveDialogComponent, {
            width: '400px',
            disableClose: true,
            data: {
                removeDialogData: this.removeDialogData,
            }
        });
    };
    // State Management
    DevelopmentComponent.prototype.onClickSave = function () {
        var _this = this;
        this.es.saveActionsQueue(function (successMessage) {
            _this.ac.toastrInfo(successMessage, -1);
        }, function (errorMessage) {
            _this.ac.toastrError(errorMessage);
        });
    };
    DevelopmentComponent.prototype.onClickLoad = function () {
        var _this = this;
        this.es.loadActionsQueue(function (textMessage) {
            _this.ac.toastrInfo(textMessage, -1);
        }, function (errorMessage) {
            _this.ac.toastrError(errorMessage);
        }, 'actionsQueue003.json');
    };
    // Application Exceptions
    DevelopmentComponent.prototype.getLogEntries = function () {
        var _this = this;
        this.bc.getLogEntries(function () {
            _this.isViewVisible = true;
        }, function (errorMessage) {
            _this.isViewVisible = true;
        });
    };
    DevelopmentComponent.prototype.getEventTypeColor = function (entryType) {
        switch (entryType) {
            case 0: return 'yellow';
            case 1: return 'red';
            case 2: return 'orange';
            case 3: return 'yellow';
            case 4: return 'blue';
        }
        return 'orange';
    };
    DevelopmentComponent.prototype.getIconName = function (entryType) {
        switch (entryType) {
            case 0: return 'missing';
            case 1: return 'error';
            case 2: return 'warning';
            case 3: return 'missing';
            case 4: return 'error_outline';
        }
        return 'orange';
    };
    DevelopmentComponent.prototype.getEventTypeText = function (entryType) {
        switch (entryType) {
            case 0: return 'Missing';
            case 1: return 'Error';
            case 2: return 'Warning';
            case 3: return 'Missing';
            case 4: return 'Information';
        }
        return 'orange';
    };
    DevelopmentComponent.prototype.onClickThrowException = function () {
        var _this = this;
        this.bc.throwException(function () {
        }, function (errorMessage) {
            _this.getLogEntries();
            _this.ac.toastrError(errorMessage);
        });
    };
    DevelopmentComponent.prototype.onClickLogEntry = function () {
        var _this = this;
        this.bc.logEntry(function () {
            _this.getLogEntries();
        }, function (errorMessage) {
            _this.ac.toastrError(errorMessage);
        });
    };
    DevelopmentComponent.ctorParameters = function () { return [
        { type: _common_buildConfig__WEBPACK_IMPORTED_MODULE_5__["BuildConfig"] },
        { type: _common_appConfig__WEBPACK_IMPORTED_MODULE_4__["AppConfig"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] },
        { type: _common_entityService__WEBPACK_IMPORTED_MODULE_6__["EntityService"] }
    ]; };
    DevelopmentComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            template: __webpack_require__(/*! raw-loader!./development.component.html */ "../../node_modules/raw-loader/index.js!../../features/development.component.html")
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_common_buildConfig__WEBPACK_IMPORTED_MODULE_5__["BuildConfig"], _common_appConfig__WEBPACK_IMPORTED_MODULE_4__["AppConfig"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"], _common_entityService__WEBPACK_IMPORTED_MODULE_6__["EntityService"]])
    ], DevelopmentComponent);
    return DevelopmentComponent;
}());

var DevelopmentHelpDialogComponent = /** @class */ (function () {
    function DevelopmentHelpDialogComponent(data) {
        this.data = data;
        // data contains values passed by the router
    }
    DevelopmentHelpDialogComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"],] }] }
    ]; };
    DevelopmentHelpDialogComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            template: __webpack_require__(/*! raw-loader!./development.component.help.html */ "../../node_modules/raw-loader/index.js!../../features/development.component.help.html")
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object])
    ], DevelopmentHelpDialogComponent);
    return DevelopmentHelpDialogComponent;
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

/***/ "../../node_modules/raw-loader/index.js!../../features/development.add.dialog.html":
/*!******************************************************************************************************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/node_modules/raw-loader!C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/features/development.add.dialog.html ***!
  \******************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<h1 mat-dialog-title style=\"margin-bottom: 5px; cursor: default; \">{{ad.title}}</h1>\r\n<div mat-dialog-content style=\"padding-left: 40px; padding-top: 20px; \" >\r\n  <input [spellcheck]=\"false\" (keydown)=\"ad.bc.filterFileNameChar($event.key)\" style=\"width: 325px; font-size: 18px; \" type=\"text\" matInput placeholder=\"Enter Angular Project Name (6+ chars)\" [(ngModel)]=\"ad.projectName\">\r\n</div>\r\n\r\n<mat-dialog-actions style=\"float: right; \">\r\n  <mat-spinner *ngIf=\"showSpinner\" [diameter]=\"50\" style=\"margin-right: 150px; \" ></mat-spinner>\r\n  <button mat-fab [disabled]=\"ad.projectName.length < 6\" (click)=\"onClickAddAngularProject()\" style=\"min-width: 35px; top: 5px; \">Add</button>\r\n  <button mat-fab [mat-dialog-close]=\"true\" style=\"min-width: 35px; top: 5px; margin: 5px; \">Cancel</button>\r\n</mat-dialog-actions>\r\n"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!../../features/development.build.dialog.html":
/*!********************************************************************************************************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/node_modules/raw-loader!C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/features/development.build.dialog.html ***!
  \********************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<h1 mat-dialog-title style=\"margin-bottom: 5px; cursor: default; \">{{buildDialogData.title}}</h1>\r\n<div mat-dialog-content>\r\n  <div style=\"width: 600px; height: 350px; background-color: black; color: white; border-radius: 20px; margin-left: 10px; \">\r\n    <textarea [disabled]=\"true\" spellcheck=\"false\" class=\"textAreaForConsole\" style=\"width:95%; height: 90%; background-color: black; color: white; margin: 20px; border-width: 0; resize: none; overflow:no-display; \">{{buildDialogData.bc.buildOutput}}</textarea>\r\n  </div>\r\n\r\n</div>\r\n\r\n<mat-dialog-actions style=\"float: right; \">\r\n  <button mat-fab [disabled]=\"buildDialogData.closeDisabled\" [mat-dialog-close]=\"true\" style=\"min-width: 35px; top: 5px; margin: 10px; \">Close</button>\r\n</mat-dialog-actions>\r\n"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!../../features/development.component.help.html":
/*!**********************************************************************************************************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/node_modules/raw-loader!C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/features/development.component.help.html ***!
  \**********************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<base-help-dialog></base-help-dialog>\r\n\r\n  Here is where you will find help with the: {{data.subtitle}}\r\n"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!../../features/development.component.html":
/*!*****************************************************************************************************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/node_modules/raw-loader!C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/features/development.component.html ***!
  \*****************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<view-fader [isViewVisible]=\"isViewVisible\">\r\n\r\n  <mat-tab-group mat-align-tabs=\"center\" color=\"primary\" dynamicHeight [selectedIndex]=\"selectedIndex\" (selectedIndexChange)=\"onChangeTab($event)\">\r\n\r\n    <mat-tab label=\"State Management\">\r\n\r\n      <div class=\"flex-container\">\r\n        <div class=\"flex-item app-text-primary\">\r\n\r\n          <div class=\"development-action-title\" style=\"padding-top: 15px;\">Action Recordings</div>\r\n\r\n          <div class=\"development-feature-text\">\r\n            <div>\r\n              <button mat-fab (click)=\"onClickSave()\">Save</button>&nbsp;\r\n              <button mat-fab (click)=\"onClickLoad()\">Load</button>\r\n            </div>\r\n          </div>\r\n\r\n        </div>\r\n      </div>\r\n\r\n    </mat-tab>\r\n\r\n    <mat-tab label=\"Project Management\">\r\n\r\n      <div class=\"flex-container\">\r\n\r\n        <div class=\"flex-item app-text-primary\">\r\n          <div class=\"development-feature-title\">\r\n            <table style=\"width: 100%; \">\r\n              <tr>\r\n                <td style=\"width: 40%; text-align: left; \">{{bc.vsProject.name}}</td>\r\n                <td style=\"width: 30%; text-align: center;   font-size: 20px;\">Version: {{ac.appSettings.buildVersion}}</td>\r\n                <td style=\"width: 30%; text-align: right; \">\r\n                  <button (click)=\"onClickBuild()\" mat-fab color=\"accent\" title=\"Build Projects (enabled for build)\">Build</button>\r\n                </td>\r\n              </tr>\r\n            </table>\r\n          </div>\r\n\r\n          <div class=\"development-feature-git\">\r\n            <table style=\"width: 100%; \">\r\n              <tr>\r\n                <td style=\"width: 35%; \">Git Hooks:</td>\r\n                <td style=\"width: 30%; font-size: 20px; \">Pre-Commit</td>\r\n                <td style=\"width: 35%; font-size: 20px; \">Pre-Push</td>\r\n              </tr>\r\n            </table>\r\n\r\n            <table style=\"width: 100%; \">\r\n              <tr>\r\n                <td style=\"width: 39%; \"></td>\r\n                <td style=\"width: 30%; font-size: 20px; text-align: left; \">\r\n                  <mat-slide-toggle [(ngModel)]=\"bc.vsProject.developerSettings.buildHook\" (change)=\"saveChanges()\"></mat-slide-toggle>\r\n                </td>\r\n                <td style=\"width: 31%; font-size: 20px; text-align: left; \">\r\n                  <mat-slide-toggle [(ngModel)]=\"bc.vsProject.developerSettings.importHook\" (change)=\"saveChanges()\"></mat-slide-toggle>\r\n                </td>\r\n              </tr>\r\n            </table>\r\n          </div>\r\n\r\n          <div class=\"development-feature-projects\">\r\n            <table style=\"width: 100%; \">\r\n              <tr>\r\n                <td style=\"width: 38%; \">Startup Project:</td>\r\n                <td style=\"width: 15%; font-size: 20px; \">&nbsp;</td>\r\n                <td style=\"width: 15%; font-size: 20px; \">&nbsp;</td>\r\n                <td style=\"width: 15%; font-size: 20px; \">&nbsp;</td>\r\n                <td style=\"width: 17%; font-size: 20px; text-align: right; \">&nbsp;</td>\r\n              </tr>\r\n            </table>\r\n\r\n            <mat-radio-group name=\"startupProjects\">\r\n              <table style=\"border-radius: 10px; font-size: 20px; font-family: px-neuropol; width: 100%; height: 50px; margin-top: 20px; margin-bottom: 20px; \" [style.background-color]=\"willExecuteRelease(bc.vsProject) ? 'white' : '' \">\r\n                <tr>\r\n                  <td style=\"width: 250px; padding-left: 20px; \">\r\n                    <div title=\"Startup using an Angular Release Build\">\r\n                      <mat-radio-button (click)=\"onClickDebugRelease(bc.vsProject); saveChanges();\" name=\"startupProjects\" [checked]=\"bc.vsProject.developerSettings.executeDist\"></mat-radio-button>\r\n                      <div style=\"display:inline-block; vertical-align: top; margin-top: 2px; margin-left: 5px; font-family: px-neuropol; \">release</div>\r\n                    </div>\r\n                  </td>\r\n\r\n                  <mat-radio-group name=\"releaseProjects\">\r\n                    <td style=\"width: 200px; padding-top: 8px; \" *ngFor=\"let angularProject of bc.vsProject.developerSettings.angularProjects; let index_1 = index; \">\r\n\r\n                      <div *ngIf=\"bc.vsProject.developerSettings.executeDist\">\r\n                        <div title=\"Startup using the {{angularProject.name}} Release Build\">\r\n\r\n                          <mat-radio-button name=\"releaseProjects\" [value]=\"index_1\" (click)=\"onClickReleaseProject(angularProject);  saveChanges();\" [checked]=\"angularProjectSelected(bc.vsProject, angularProject)\"></mat-radio-button>\r\n                          <div style=\"display:inline-block; vertical-align: top; margin-top: 2px; margin-left: 5px; font-family: px-neuropol; \">{{angularProject.name}}</div>\r\n\r\n                        </div>\r\n                      </div>\r\n                    </td>\r\n                  </mat-radio-group>\r\n                </tr>\r\n              </table>\r\n\r\n\r\n              <table style=\"width: 100%; \">\r\n                <tr>\r\n                  <td style=\"width: 38%; \">&nbsp;</td>\r\n                  <td style=\"width: 15%; font-size: 20px; \">Build</td>\r\n                  <td style=\"width: 15%; font-size: 20px; \">Prod</td>\r\n                  <td style=\"width: 15%; font-size: 20px; \">PWA</td>\r\n                  <td style=\"width: 17%; font-size: 20px; text-align: right; \">Delete</td>\r\n                </tr>\r\n              </table>\r\n\r\n\r\n              <div *ngFor=\"let angularProject of bc.vsProject.developerSettings.angularProjects; let index_2 = index;\">\r\n                <div style=\"padding-bottom: 18px; \">\r\n                  <table style=\"border-radius: 10px; font-size: 20px; font-family: px-neuropol; width: 100%; height: 50px; \" [style.background-color]=\"willExecuteProject(angularProject) ? 'white' : '' \">\r\n                    <tr>\r\n                      <td style=\"width: 40%; padding-left: 20px; \">\r\n                        <div title=\"Startup the {{angularProject.name}} Angular Project\">\r\n                          <mat-radio-button (click)=\"onClickDebugEnabled(angularProject); saveChanges();\" name=\"startupProjects\" [value]=\"index_2\" [checked]=\"willExecuteProject(angularProject)\"></mat-radio-button>\r\n                          <div style=\"display:inline-block; vertical-align: top; margin-top: 2px; margin-left: 5px; font-family: px-neuropol; \" (click)=\"angularProject.showPanel = !angularProject.showPanel\">{{angularProject.name}}</div>\r\n                        </div>\r\n                      </td>\r\n                      <td style=\"width: 15%; \">\r\n                        <div title=\"Enable the {{angularProject.name}} Release Build\">\r\n                          <mat-checkbox [(ngModel)]=\"angularProject.buildEnabled\" (click)=\"saveChanges();\"></mat-checkbox>\r\n                        </div>\r\n                      </td>\r\n                      <td style=\"width: 15%; \">\r\n                        <div title=\"Enable the Production mode for the {{angularProject.name}} Release Build\">\r\n                          <mat-checkbox [disabled]=\"!angularProject.buildEnabled\" [(ngModel)]=\"angularProject.production\" (click)=\"saveChanges();\"></mat-checkbox>\r\n                        </div>\r\n                      </td>\r\n                      <td style=\"width: 15%; \">\r\n                        <div title=\"Enable to support PWA for the {{angularProject.name}} Release Build\">\r\n                          <mat-checkbox [disabled]=\"!angularProject.buildEnabled\" [(ngModel)]=\"angularProject.pwaSupport\" (click)=\"saveChanges();\"></mat-checkbox>\r\n                        </div>\r\n                      </td>\r\n                      <td style=\"width: 15%; text-align: right; padding-right: 20px; \">\r\n                        <mat-icon *ngIf=\"angularProject.name !== 'configure' && angularProject.name !== 'desktop'\" color=\"primary\" (click)=\"onClickRemove(vsProject, angularProject)\" style=\"cursor: pointer; margin-top: 0; \" title=\"Remove Angular Project: '{{angularProject.name}}'  from the {{bc.vsProject.name}} Visual Studio Project\">clear</mat-icon>\r\n                      </td>\r\n                    </tr>\r\n                  </table>\r\n                </div>\r\n              </div>\r\n\r\n            </mat-radio-group>\r\n            <button (click)=\"onClickAdd()\" mat-fab color=\"accent\" title=\"Add a New Project\" style=\"\">Add</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n    </mat-tab>\r\n\r\n    <mat-tab label=\"Event Log\">\r\n      <div class=\"flex-container\">\r\n        <div class=\"flex-item app-text-primary\">\r\n\r\n          <div class=\"development-exceptions-title\" style=\"padding-top: 15px;\">Generate & Log Events</div>\r\n\r\n          <div class=\"development-exceptions-text\">\r\n\r\n            <button style=\"margin-left: 5px; \" mat-fab (click)=\"onClickThrowException()\">Throw</button>\r\n            <input [spellcheck]=\"false\" style=\"width: 200px; font-size: 18px; margin-left: 10px; \" type=\"text\" matInput placeholder=\"Enter Exception\" [(ngModel)]=\"bc.eventProperties.exception\">\r\n\r\n            <br /><br />\r\n            <button style=\"margin-left: 5px; \" mat-fab (click)=\"onClickLogEntry()\">Enter</button>\r\n            <input [spellcheck]=\"false\" style=\"width: 200px; font-size: 18px; margin-left: 10px; \" type=\"text\" matInput placeholder=\"Enter Message\" [(ngModel)]=\"bc.eventProperties.message\">\r\n\r\n            <mat-radio-group style=\"padding-left: 50px;\" name=\"messageType\" [(ngModel)]=\"bc.eventProperties.entryType\">\r\n              <mat-radio-button name=\"messageType\" [value]=\"1\"></mat-radio-button>\r\n              <div style=\"display:inline-block; vertical-align: middle; margin-top: 5px; margin-left: 2px; font-family: px-neuropol; color: rgba(255, 87, 34, 1);\">Error</div>\r\n\r\n              <mat-radio-button name=\"messageType\" [value]=\"2\" style=\"margin-left: 20px; \"></mat-radio-button>\r\n              <div style=\"display:inline-block; vertical-align: middle; margin-top: 5px; margin-left: 2px; font-family: px-neuropol; color: rgba(255, 87, 34, 1);\">Warning</div>\r\n\r\n              <mat-radio-button name=\"messageType\" [value]=\"4\" style=\"margin-left: 20px; \"></mat-radio-button>\r\n              <div style=\"display:inline-block; vertical-align: middle; margin-top: 5px; margin-left: 2px; font-family: px-neuropol; color: rgba(255, 87, 34, 1);\">Information</div>\r\n\r\n            </mat-radio-group>\r\n\r\n          </div>\r\n\r\n        </div>\r\n\r\n        <div class=\"flex-item app-text-primary\">\r\n\r\n          <div class=\"development-exceptions-title\" style=\"padding-top: 15px;\">Application Event List</div>\r\n\r\n          <div class=\"development-event-list\">\r\n\r\n            <table style=\"color: #ff5722; font-family: Neuropol;\">\r\n              <tr>\r\n                <td style=\"width: 300px; padding-left: 20px; \">Type</td>\r\n                <td style=\"width: 300px; padding-left: 0; \">Date</td>\r\n                <td style=\"width: 300px; padding-left: 0; \">Time</td>\r\n              </tr>\r\n            </table>\r\n            <mat-accordion multi=\"true\">\r\n              <mat-expansion-panel *ngFor=\"let event of bc.eventLogEntries; \" style=\"background-color: whitesmoke; \">\r\n                <mat-expansion-panel-header>\r\n                  <mat-panel-title>\r\n                    <table style=\"color: #ff5722; font-family: Neuropol; width: 100%; \">\r\n                      <tr>\r\n                        <td style=\"width: 300px; \">\r\n                          <mat-icon [style.color]=\"getEventTypeColor(event.entryType)\" class=\"toolbar-icon-button\">{{getIconName(event.entryType)}}</mat-icon>\r\n                        </td>\r\n                        <td style=\"width: 300px; \">\r\n                          {{\r\nevent.timeGenerated.getMonth() + 1\r\n                          }}/{{event.timeGenerated.getDate()}}/{{event.timeGenerated.getYear()}}\r\n                        </td>\r\n                        <td style=\"width: 300px; \">{{event.timeGenerated.toLocaleTimeString()}}</td>\r\n                      </tr>\r\n                    </table>\r\n\r\n                  </mat-panel-title>\r\n                  <mat-panel-description>\r\n                  </mat-panel-description>\r\n                </mat-expansion-panel-header>\r\n\r\n                <div style=\"text-align: left; \">\r\n                  Entry Type: {{getEventTypeText(event.entryType)}}\r\n                  <br />\r\n                  <div *ngFor=\"let s of event.replacementStrings; let index = index; \">\r\n                    <div *ngIf=\"index > 0\">{{s}}</div>\r\n                    <br />\r\n                  </div>\r\n                </div>\r\n\r\n              </mat-expansion-panel>\r\n\r\n            </mat-accordion>\r\n\r\n          </div>\r\n\r\n        </div>\r\n      </div>\r\n    </mat-tab>\r\n\r\n  </mat-tab-group>\r\n\r\n</view-fader>\r\n\r\n"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!../../features/development.remove.dialog.html":
/*!*********************************************************************************************************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/node_modules/raw-loader!C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/features/development.remove.dialog.html ***!
  \*********************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title style=\"margin-bottom: 5px; cursor: default; \">{{removeDialogData.title}}</h1>\r\n<div style=\"font-family: Arial; font-size: 16px; \">\r\n  {{removeDialogData.message}}\r\n</div>\r\n<mat-dialog-actions style=\"float: right; \">\r\n  <button mat-fab (click)=\"onClickYes()\" style=\"min-width: 35px; top: 5px; \">Yes</button>\r\n  <button mat-fab [mat-dialog-close]=\"true\" style=\"min-width: 35px; top: 5px; margin: 10px; \">Cancel</button>\r\n</mat-dialog-actions>\r\n"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/app.component.html":
/*!*****************************************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularDotNet/wwwroot/node_modules/raw-loader!./src/app/app.component.html ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\r\n  <view-blinker *ngIf=\"showOpeningTitle\" [blinking]=\"true\" [visibleWhenNotBlinking]=\"false\" >\r\n    <br /><br />\r\n    <div class=\"text-primary\" style=\"text-align: center; width: 100%; font-family: px-neuropol; font-size: 54px; margin-top: 25%; \">{{appTitle}}</div>\r\n  </view-blinker>\r\n\r\n  <view-fader *ngIf=\"showMobileApiView\" [isViewVisible]=\"showMobileApiView\">\r\n    <br />\r\n    <router-outlet></router-outlet>\r\n  </view-fader>\r\n</div>\r\n"

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
        if (illegalCharacters.includes(key)) {
            return false;
        }
        else {
            return true;
        }
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
        this.appTitle = 'Angular.Net Configuration';
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
            _this.navigateForward();
        });
    };
    AppComponent.prototype.checkForUpdates = function () {
        var _this = this;
        setTimeout(function () {
            var versionNumber = _this.ac.getLocalStorage('versionNumber');
            if (versionNumber && versionNumber.vn !== _this.ac.appSettings.buildVersion && !_this.ac.appSettings.debug) {
                _this.ac.setLocalStorage('versionNumber', { vn: _this.ac.appSettings.buildVersion });
                setTimeout(function () {
                    _this.restartApp();
                }, 5000);
            }
            else {
                _this.ac.setLocalStorage('versionNumber', { vn: _this.ac.appSettings.buildVersion });
                setTimeout(function () {
                    if (navigator.onLine) {
                        _this.ac.isOnline = true;
                    }
                    else {
                        _this.ac.isOnline = false;
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
            _this.router.navigate(['/development']);
        }, 2000); // navigate away from splash view
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
            template: __webpack_require__(/*! raw-loader!./app.component.html */ "../../node_modules/raw-loader/index.js!./src/app/app.component.html"),
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
/* harmony import */ var _features_development_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../features/development.component */ "../../features/development.component.ts");
/* harmony import */ var _common_buildConfig__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../common/buildConfig */ "../../common/buildConfig.ts");
/* harmony import */ var _common_entityService__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../common/entityService */ "../../common/entityService.ts");
/* harmony import */ var _shared_ng2_animation_appAnimation_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../shared/ng2-animation/appAnimation.module */ "../../shared/ng2-animation/appAnimation.module.ts");
/* harmony import */ var _shared_ng2_apphelper_appHelper_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../shared/ng2-apphelper/appHelper.module */ "../../shared/ng2-apphelper/appHelper.module.ts");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ngxs/store */ "../../node_modules/@ngxs/store/fesm5/ngxs-store.js");
/* harmony import */ var _ngxs_devtools_plugin__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ngxs/devtools-plugin */ "../../node_modules/@ngxs/devtools-plugin/fesm5/ngxs-devtools-plugin.js");
/* harmony import */ var _ngxs_logger_plugin__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ngxs/logger-plugin */ "../../node_modules/@ngxs/logger-plugin/fesm5/ngxs-logger-plugin.js");
/* harmony import */ var _shared_modules_material_module__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../shared/modules/material.module */ "../../shared/modules/material.module.ts");
/* harmony import */ var _features_base_help_dialog__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../features/base.help.dialog */ "../../features/base.help.dialog.ts");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./app.routing.module */ "./src/app/app.routing.module.ts");







// features




// services


// ngxs






var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"], _features_development_component__WEBPACK_IMPORTED_MODULE_8__["DevelopmentComponent"], _features_development_component__WEBPACK_IMPORTED_MODULE_8__["DevelopmentHelpDialogComponent"], _features_development_component__WEBPACK_IMPORTED_MODULE_8__["DevelopmentBuildDialogComponent"], _features_development_component__WEBPACK_IMPORTED_MODULE_8__["DevelopmentAddDialogComponent"], _features_development_component__WEBPACK_IMPORTED_MODULE_8__["DevelopmentRemoveDialogComponent"], _features_base_help_dialog__WEBPACK_IMPORTED_MODULE_17__["BaseHelpDialogComponent"]],
            entryComponents: [_features_development_component__WEBPACK_IMPORTED_MODULE_8__["DevelopmentBuildDialogComponent"], _features_development_component__WEBPACK_IMPORTED_MODULE_8__["DevelopmentAddDialogComponent"], _features_development_component__WEBPACK_IMPORTED_MODULE_8__["DevelopmentRemoveDialogComponent"]],
            imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"],
                _shared_ng2_animation_appAnimation_module__WEBPACK_IMPORTED_MODULE_11__["AppAnimationModule"],
                _shared_ng2_apphelper_appHelper_module__WEBPACK_IMPORTED_MODULE_12__["AppHelperModule"].forRoot(),
                _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"].forRoot([]),
                _ngxs_store__WEBPACK_IMPORTED_MODULE_13__["NgxsModule"].forRoot([]),
                _app_routing_module__WEBPACK_IMPORTED_MODULE_18__["AppRoutingModule"],
                _ngxs_devtools_plugin__WEBPACK_IMPORTED_MODULE_14__["NgxsReduxDevtoolsPluginModule"].forRoot(),
                _ngxs_logger_plugin__WEBPACK_IMPORTED_MODULE_15__["NgxsLoggerPluginModule"].forRoot(), _shared_modules_material_module__WEBPACK_IMPORTED_MODULE_16__["MaterialModule"]
            ],
            providers: [_common_buildConfig__WEBPACK_IMPORTED_MODULE_9__["BuildConfig"], _common_entityService__WEBPACK_IMPORTED_MODULE_10__["EntityService"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/app.routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app.routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _features_development_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../features/development.component */ "../../features/development.component.ts");




var routes = [
    { path: '', component: _features_development_component__WEBPACK_IMPORTED_MODULE_3__["DevelopmentComponent"] },
    {
        path: 'development', component: _features_development_component__WEBPACK_IMPORTED_MODULE_3__["DevelopmentComponent"],
        data: { debugOnly: true, title: 'Developement', subtitle: 'Developement Utilities', show: true, helpTemplate: _features_development_component__WEBPACK_IMPORTED_MODULE_3__["DevelopmentHelpDialogComponent"] }
    },
    {
        path: 'restart', redirectTo: '', pathMatch: 'full',
        data: { debugOnly: false, title: 'Restart', subtitle: 'Restarting the Application...', show: true, helpTemplate: _features_development_component__WEBPACK_IMPORTED_MODULE_3__["DevelopmentHelpDialogComponent"] }
    },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



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
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! hammerjs */ "../../node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_3__);




Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\ProMatrix.2\Angular.Net.CLI\AngularDotNet\wwwroot\projects\configure\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map