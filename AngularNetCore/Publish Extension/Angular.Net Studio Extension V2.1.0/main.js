(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "../../common/apiService.ts":
/*!**********************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularNetCore/wwwroot/common/apiService.ts ***!
  \**********************************************************************************/
/*! exports provided: ApiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiService", function() { return ApiService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "../../node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _ngAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ngAction */ "../../common/ngAction.ts");



var ApiService = /** @class */ (function () {
    function ApiService(http, store) {
        this.http = http;
        this.store = store;
        this.serverError = 'Server could be busy or offline!';
        this.downloadTimeout = 45000;
        this.uploadTimeout = 45000;
        this.ngAction = _ngAction__WEBPACK_IMPORTED_MODULE_2__["NgAction"].getInstance(store);
    }
    //#region httpRequest
    ApiService.prototype.httpRequest = function (obj, requestType, responseType$, url, success, error, params$, headers$, progressCallback) {
        var _this = this;
        var reportProgress$ = (progressCallback !== undefined && progressCallback !== null);
        var request;
        if (obj) {
            request = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpRequest"](requestType, url, obj, { reportProgress: reportProgress$, headers: headers$, params: params$ });
        }
        else {
            request = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpRequest"](requestType, url, {
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
                case _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpEventType"].Sent:
                    break;
                case _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpEventType"].ResponseHeader:
                    break;
                case _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpEventType"].DownloadProgress:
                    if (requestType === 'Get') {
                        if (progressCallback(event)) {
                            clearTimeout(timerId);
                            httpSubscription.unsubscribe();
                        }
                    }
                    break;
                case _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpEventType"].UploadProgress:
                    if (requestType === 'Post') {
                        if (progressCallback(event)) {
                            clearTimeout(timerId);
                            httpSubscription.unsubscribe();
                        }
                    }
                    break;
                case _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpEventType"].Response:
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
    ApiService.prototype.filterProjectNameChar = function (charCode) {
        if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8)
            return true;
        else
            return false;
    };
    return ApiService;
}());



/***/ }),

/***/ "../../common/appConfig.ts":
/*!*********************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularNetCore/wwwroot/common/appConfig.ts ***!
  \*********************************************************************************/
/*! exports provided: AppConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppConfig", function() { return AppConfig; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "../../node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _apiService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./apiService */ "../../common/apiService.ts");
/* harmony import */ var ngx_modeling__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-modeling */ "../../node_modules/ngx-modeling/index.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! moment */ "../../node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material */ "../../node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _src_environments_environment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../src/environments/environment */ "../../src/environments/environment.ts");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngxs/store */ "../../node_modules/@ngxs/store/fesm5/ngxs-store.js");

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
        _this.appSettings = new ngx_modeling__WEBPACK_IMPORTED_MODULE_4__["AppSettings"]();
        _this.settingsAvailable = false;
        _this.analyticsData = new ngx_modeling__WEBPACK_IMPORTED_MODULE_4__["AnalyticsData"]();
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
        _this.tm = new ngx_modeling__WEBPACK_IMPORTED_MODULE_4__["TimingMetrics"]('getAppSettings');
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
            }, 0);
        }
        else {
            this.isSpinnerVisible = false;
            setTimeout(function () {
                _this.isSpinnerAvailable = false;
            }, 1000);
        }
    };
    AppConfig.prototype.updateAnalytics = function () {
        var totalResponseTime = 0;
        this.analyticsData.performances = this.analyticsData.performances.map(function (x) {
            x.dateString = moment__WEBPACK_IMPORTED_MODULE_5__(x.date).format('YYYY-MM-DD');
            x.timeString = moment__WEBPACK_IMPORTED_MODULE_5__(x.date).format('HH:mm:ss');
            totalResponseTime += x.responseTime;
            return x;
        });
        if (this.analyticsData.performances.length === 0) {
            this.analyticsData.averageResponseTime = 0;
        }
        else {
            this.analyticsData.averageResponseTime = Math.round(totalResponseTime / this.analyticsData.performances.length);
        }
        this.setLocalStorage('analyticsData', this.analyticsData);
    };
    AppConfig.prototype.clearResponseTime = function () {
        this.analyticsData.performances.length = 0;
        this.analyticsData.averageResponseTime = 0;
        this.setLocalStorage('analyticsData', this.analyticsData);
    };
    AppConfig.prototype.logResonseData = function (responseTime) {
        if (this.analyticsData.performances.length > 9) {
            this.analyticsData.performances.pop();
        }
        var performance = new ngx_modeling__WEBPACK_IMPORTED_MODULE_4__["Performance"]();
        performance.date = new Date();
        performance.responseTime = responseTime;
        this.analyticsData.performances.unshift(performance);
        this.setLocalStorage('analyticsData', this.analyticsData);
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
        this.analyticsData = this.getLocalStorage('analyticsData');
        if (!this.analyticsData) {
            this.analyticsData = new ngx_modeling__WEBPACK_IMPORTED_MODULE_4__["AnalyticsData"]();
        }
        this.get(_src_environments_environment__WEBPACK_IMPORTED_MODULE_8__["environment"].api.getSysInfo, function (appSettings) {
            _this.settingsAvailable = true;
            appSettings.apiVersions.angular = _angular_core__WEBPACK_IMPORTED_MODULE_1__["VERSION"].full;
            _this.setLocalStorage('appSettings', appSettings);
            try {
                _this.tm.setEndMarker();
                _this.logResonseData(_this.tm.measureInterval());
            }
            catch (e) { }
            _this.updateAnalytics();
            _this.appSettings = appSettings;
            _this.isInitialized = true;
            success();
        }, function (errorMessage) {
            _this.appSettings = _this.getLocalStorage('appSettings');
            if (!_this.appSettings) {
                _this.appSettings = new ngx_modeling__WEBPACK_IMPORTED_MODULE_4__["AppSettings"]();
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
        this.post(textMessage, _src_environments_environment__WEBPACK_IMPORTED_MODULE_8__["environment"].api.sendTextMessage, function () {
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
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_7__["ActivatedRoute"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSnackBar"] },
        { type: _ngxs_store__WEBPACK_IMPORTED_MODULE_9__["Store"] },
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    AppConfig = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_7__["ActivatedRoute"],
            _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSnackBar"],
            _ngxs_store__WEBPACK_IMPORTED_MODULE_9__["Store"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], AppConfig);
    return AppConfig;
}(_apiService__WEBPACK_IMPORTED_MODULE_3__["ApiService"]));



/***/ }),

/***/ "../../common/buildConfig.ts":
/*!***********************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularNetCore/wwwroot/common/buildConfig.ts ***!
  \***********************************************************************************/
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
/* harmony import */ var _apiService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./apiService */ "../../common/apiService.ts");
/* harmony import */ var ngx_modeling__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-modeling */ "../../node_modules/ngx-modeling/index.js");
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
        _this.config = new ngx_modeling__WEBPACK_IMPORTED_MODULE_4__["BuildConfiguration"]();
        _this.buildConfig = new ngx_modeling__WEBPACK_IMPORTED_MODULE_4__["BuildConfiguration"]();
        _this.vsProject = new ngx_modeling__WEBPACK_IMPORTED_MODULE_4__["VisualProject"]();
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
    BuildConfig.prototype.addProject = function (success, error, finale) {
        var _this = this;
        var vsp = new ngx_modeling__WEBPACK_IMPORTED_MODULE_4__["VisualProject"]();
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
}(_apiService__WEBPACK_IMPORTED_MODULE_3__["ApiService"]));



/***/ }),

/***/ "../../common/entityService.ts":
/*!*************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularNetCore/wwwroot/common/entityService.ts ***!
  \*************************************************************************************/
/*! exports provided: BookInfo, EntityService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BookInfo", function() { return BookInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntityService", function() { return EntityService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "../../node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _apiService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./apiService */ "../../common/apiService.ts");
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
}(_apiService__WEBPACK_IMPORTED_MODULE_3__["ApiService"]));



/***/ }),

/***/ "../../common/ngAction.ts":
/*!********************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularNetCore/wwwroot/common/ngAction.ts ***!
  \********************************************************************************/
/*! exports provided: Action, NgAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Action", function() { return Action; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgAction", function() { return NgAction; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
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
    return NgAction;
}());



/***/ }),

/***/ "../../features/base.help.dialog.ts":
/*!******************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularNetCore/wwwroot/features/base.help.dialog.ts ***!
  \******************************************************************************************/
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
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./base.help.dialog.html */ "../../node_modules/raw-loader/dist/cjs.js!../../features/base.help.dialog.html")).default
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object])
    ], BaseHelpDialogComponent);
    return BaseHelpDialogComponent;
}());



/***/ }),

/***/ "../../features/development.component.ts":
/*!***********************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularNetCore/wwwroot/features/development.component.ts ***!
  \***********************************************************************************************/
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
/* harmony import */ var ngx_modeling__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-modeling */ "../../node_modules/ngx-modeling/index.js");




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
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./development.build.dialog.html */ "../../node_modules/raw-loader/dist/cjs.js!../../features/development.build.dialog.html")).default
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
    DevelopmentAddDialogComponent.prototype.enterOnInput = function (charCode) {
        if (charCode === 13) {
            if (this.ad.projectName.length > 5) {
                this.onClickAddAngularProject();
            }
        }
    };
    DevelopmentAddDialogComponent.prototype.onClickAddAngularProject = function () {
        var _this = this;
        this.ad.projectName = this.ad.projectName.charAt(0).toLowerCase() + this.ad.projectName.slice(1);
        if (this.ad.bc.vsProject.developerSettings.angularProjects.find(function (project) { return project.name === _this.ad.projectName; })) {
            this.ad.ac.toastrError('A project with that name already exists! Please choose a unique project name.');
            return;
        }
        this.showSpinner = true;
        this.ad.bc.angularProject = new ngx_modeling__WEBPACK_IMPORTED_MODULE_7__["AngularProject"]();
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
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./development.add.dialog.html */ "../../node_modules/raw-loader/dist/cjs.js!../../features/development.add.dialog.html")).default
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
    DevelopmentRemoveDialogComponent.prototype.ngAfterViewInit = function () {
        // making the cancel button the default
        setTimeout(function () {
            var cancelButton = document.querySelector('.cancel-button');
            cancelButton.focus();
        }, 500);
    };
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
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./development.remove.dialog.html */ "../../node_modules/raw-loader/dist/cjs.js!../../features/development.remove.dialog.html")).default
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
        this.selectedIndex = 0;
        this.savingChanges = false;
        this.buildDialogData = new BuildDialogData();
        this.addDialogData = new AddDialogData();
        this.removeDialogData = new RemoveDialogData();
    }
    DevelopmentComponent.prototype.getBuildTypes = function () {
        return Object.keys(ngx_modeling__WEBPACK_IMPORTED_MODULE_7__["BuildTypes"]).filter(function (x) { return isNaN(Number(x)); });
    };
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
    // Metrics
    DevelopmentComponent.prototype.onClickClearResponseTime = function () {
        this.ac.clearResponseTime();
    };
    DevelopmentComponent.ctorParameters = function () { return [
        { type: _common_buildConfig__WEBPACK_IMPORTED_MODULE_5__["BuildConfig"] },
        { type: _common_appConfig__WEBPACK_IMPORTED_MODULE_4__["AppConfig"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] },
        { type: _common_entityService__WEBPACK_IMPORTED_MODULE_6__["EntityService"] }
    ]; };
    DevelopmentComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./development.component.html */ "../../node_modules/raw-loader/dist/cjs.js!../../features/development.component.html")).default
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
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./development.component.help.html */ "../../node_modules/raw-loader/dist/cjs.js!../../features/development.component.help.html")).default
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object])
    ], DevelopmentHelpDialogComponent);
    return DevelopmentHelpDialogComponent;
}());



/***/ }),

/***/ "../../features/mobileApis.component.actions.ts":
/*!******************************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularNetCore/wwwroot/features/mobileApis.component.actions.ts ***!
  \******************************************************************************************************/
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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");

var ChangeTabIndex = /** @class */ (function () {
    function ChangeTabIndex(name, title, payload, playback, delay) {
        this.name = name;
        this.title = title;
        this.payload = payload;
        this.playback = playback;
        this.delay = delay;
    }
    ChangeTabIndex.type = '[mobileApi] ChangeTabIndex';
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
    return UpdateMobileNumber;
}());

var MobileApiInit = /** @class */ (function () {
    function MobileApiInit(ngAction) {
        this.ngAction = ngAction;
    }
    MobileApiInit.type = '[mobileApi] MobileApiInit';
    return MobileApiInit;
}());



/***/ }),

/***/ "../../node_modules/moment/locale sync recursive ^\\.\\/.*$":
/*!******************************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularNetCore/wwwroot/node_modules/moment/locale sync ^\.\/.*$ ***!
  \******************************************************************************************************/
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

/***/ "../../node_modules/raw-loader/dist/cjs.js!../../features/base.help.dialog.html":
/*!**************************************************************************************************************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularNetCore/wwwroot/node_modules/raw-loader/dist/cjs.js!C:/ProMatrix.2/Angular.Net.CLI/AngularNetCore/wwwroot/features/base.help.dialog.html ***!
  \**************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<mat-dialog-actions style=\"float: right; \">\r\n  <button mat-button [mat-dialog-close]=\"true\" style=\"min-width: 35px; top: 5px; \">\r\n    <mat-icon style=\"cursor: pointer; margin-top: 0; \" title=\"Close Help\">clear</mat-icon>\r\n  </button>\r\n</mat-dialog-actions>\r\n<br />\r\n<h1 mat-dialog-title style=\"text-align: center; background-color: aliceblue; height: 35px; padding-top: 5px; \">\r\n  Help with the: {{data.subtitle}}\r\n</h1>\r\n");

/***/ }),

/***/ "../../node_modules/raw-loader/dist/cjs.js!../../features/development.add.dialog.html":
/*!********************************************************************************************************************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularNetCore/wwwroot/node_modules/raw-loader/dist/cjs.js!C:/ProMatrix.2/Angular.Net.CLI/AngularNetCore/wwwroot/features/development.add.dialog.html ***!
  \********************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n<h1 mat-dialog-title style=\"margin-bottom: 5px; cursor: default; \">{{ad.title}}</h1>\r\n<div mat-dialog-content style=\"padding-left: 40px; padding-top: 20px; \">\r\n  <input [spellcheck]=\"false\" (keydown)=\"enterOnInput($event.keyCode); ad.bc.filterProjectNameChar($event.keyCode)\" style=\"width: 325px; font-size: 18px; \" type=\"text\" matInput placeholder=\"Enter Angular Project Name (6+ chars)\" [(ngModel)]=\"ad.projectName\">\r\n</div>\r\n\r\n<mat-dialog-actions style=\"float: right; \">\r\n  <mat-spinner *ngIf=\"showSpinner\" [diameter]=\"50\" style=\"margin-right: 150px; \" ></mat-spinner>\r\n  <button mat-fab [disabled]=\"ad.projectName.length < 6\" (click)=\"onClickAddAngularProject()\" style=\"min-width: 35px; top: 5px; \">Add</button>\r\n  <button mat-fab [mat-dialog-close]=\"true\" style=\"min-width: 35px; top: 5px; margin: 5px; \">Cancel</button>\r\n</mat-dialog-actions>\r\n");

/***/ }),

/***/ "../../node_modules/raw-loader/dist/cjs.js!../../features/development.build.dialog.html":
/*!**********************************************************************************************************************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularNetCore/wwwroot/node_modules/raw-loader/dist/cjs.js!C:/ProMatrix.2/Angular.Net.CLI/AngularNetCore/wwwroot/features/development.build.dialog.html ***!
  \**********************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n<h1 mat-dialog-title style=\"margin-bottom: 5px; cursor: default; \">{{buildDialogData.title}}</h1>\r\n<div mat-dialog-content>\r\n  <div style=\"width: 600px; height: 350px; background-color: black; color: white; border-radius: 20px; margin-left: 10px; \">\r\n    <textarea [disabled]=\"true\" spellcheck=\"false\" class=\"textAreaForConsole\" style=\"width:95%; height: 90%; background-color: black; color: white; margin: 20px; border-width: 0; resize: none; overflow:no-display; \">{{buildDialogData.bc.buildOutput}}</textarea>\r\n  </div>\r\n\r\n</div>\r\n\r\n<mat-dialog-actions style=\"float: right; \">\r\n  <button mat-fab [disabled]=\"buildDialogData.closeDisabled\" [mat-dialog-close]=\"true\" style=\"min-width: 35px; top: 5px; margin: 10px; \">Close</button>\r\n</mat-dialog-actions>\r\n");

/***/ }),

/***/ "../../node_modules/raw-loader/dist/cjs.js!../../features/development.component.help.html":
/*!************************************************************************************************************************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularNetCore/wwwroot/node_modules/raw-loader/dist/cjs.js!C:/ProMatrix.2/Angular.Net.CLI/AngularNetCore/wwwroot/features/development.component.help.html ***!
  \************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<base-help-dialog></base-help-dialog>\r\n\r\n  Here is where you will find help with the: {{data.subtitle}}\r\n");

/***/ }),

/***/ "../../node_modules/raw-loader/dist/cjs.js!../../features/development.component.html":
/*!*******************************************************************************************************************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularNetCore/wwwroot/node_modules/raw-loader/dist/cjs.js!C:/ProMatrix.2/Angular.Net.CLI/AngularNetCore/wwwroot/features/development.component.html ***!
  \*******************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n<view-fader [isViewVisible]=\"isViewVisible\">\r\n\r\n  <mat-tab-group mat-align-tabs=\"center\" color=\"primary\" dynamicHeight [selectedIndex]=\"selectedIndex\" (selectedIndexChange)=\"onChangeTab($event)\">\r\n\r\n    <mat-tab label=\"Configure\">\r\n\r\n      <div class=\"flex-container\">\r\n\r\n        <div class=\"flex-item app-text-primary\">\r\n          <div class=\"development-feature-title\">\r\n            <table style=\"width: 100%; \">\r\n              <tr>\r\n                <td style=\"width: 40%; text-align: left; \">{{bc.vsProject.name}}</td>\r\n                <td *ngIf=\"ac.appSettings.buildVersion !== 'xx.xx.xx'\" style=\"width: 30%; text-align: center;   font-size: 20px;\">Version: {{ac.appSettings.buildVersion}}</td>\r\n                <td *ngIf=\"ac.appSettings.buildVersion === 'xx.xx.xx'\" style=\"width: 30%; text-align: center;   font-size: 20px;\">&nbsp;</td>\r\n\r\n                <td style=\"width: 30%; text-align: right; \">\r\n                  <button (click)=\"onClickBuild()\" mat-fab color=\"accent\" title=\"Build Projects (enabled for build)\">Build</button>\r\n                </td>\r\n              </tr>\r\n            </table>\r\n          </div>\r\n\r\n          <div class=\"development-feature-git\">\r\n            <table style=\"width: 100%; \">\r\n              <tr>\r\n                <td style=\"width: 35%; \">Git Hooks:</td>\r\n                <td style=\"width: 30%; font-size: 20px; \">Pre-Commit</td>\r\n                <td style=\"width: 35%; font-size: 20px; \">Pre-Push</td>\r\n              </tr>\r\n            </table>\r\n\r\n            <table style=\"width: 100%; \">\r\n              <tr>\r\n                <td style=\"width: 39%; \"></td>\r\n                <td style=\"width: 30%; font-size: 20px; text-align: left; \">\r\n                  <mat-slide-toggle [(ngModel)]=\"bc.vsProject.developerSettings.buildHook\" (change)=\"saveChanges()\"></mat-slide-toggle>\r\n                </td>\r\n                <td style=\"width: 31%; font-size: 20px; text-align: left; \">\r\n                  <mat-slide-toggle [(ngModel)]=\"bc.vsProject.developerSettings.importHook\" (change)=\"saveChanges()\"></mat-slide-toggle>\r\n                </td>\r\n              </tr>\r\n            </table>\r\n          </div>\r\n\r\n          <div class=\"development-feature-projects\">\r\n            <table style=\"width: 100%; \">\r\n              <tr>\r\n                <td style=\"width: 38%; \">Startup Project:</td>\r\n                <td style=\"width: 15%; font-size: 20px; \">&nbsp;</td>\r\n                <td style=\"width: 15%; font-size: 20px; \">&nbsp;</td>\r\n                <td style=\"width: 15%; font-size: 20px; \">&nbsp;</td>\r\n                <td style=\"width: 17%; font-size: 20px; text-align: right; \">&nbsp;</td>\r\n              </tr>\r\n            </table>\r\n\r\n            <mat-radio-group name=\"startupProjects\">\r\n              <table style=\"border-radius: 10px; font-size: 20px; font-family: px-neuropol; width: 100%; height: 50px; margin-top: 20px; margin-bottom: 20px; \" [style.background-color]=\"willExecuteRelease(bc.vsProject) ? 'white' : '' \">\r\n                <tr>\r\n                  <td style=\"width: 230px; padding-left: 20px; \">\r\n                    <div title=\"Startup from: dist/\">\r\n                      <mat-radio-button (click)=\"onClickDebugRelease(bc.vsProject); saveChanges();\" name=\"startupProjects\" [checked]=\"bc.vsProject.developerSettings.executeDist\"></mat-radio-button>\r\n                      <div style=\"display:inline-block; vertical-align: top; margin-top: 2px; margin-left: 5px; font-family: px-neuropol; \">release</div>\r\n                    </div>\r\n                  </td>\r\n\r\n                  <mat-radio-group name=\"releaseProjects\">\r\n                    <td style=\"width: 140px; padding-top: 8px; \" *ngFor=\"let angularProject of bc.vsProject.developerSettings.angularProjects; let index_1 = index; \">\r\n\r\n                      <div *ngIf=\"bc.vsProject.developerSettings.executeDist\">\r\n                        <div title=\"Startup from: dist/{{angularProject.name}}\">\r\n\r\n                          <mat-radio-button name=\"releaseProjects\" [value]=\"index_1\" (click)=\"onClickReleaseProject(angularProject);  saveChanges();\" [checked]=\"angularProjectSelected(bc.vsProject, angularProject)\"></mat-radio-button>\r\n                          <div style=\"display:inline-block; vertical-align: top; margin-top: 2px; margin-left: 5px; font-family: px-neuropol; \">{{angularProject.name}}</div>\r\n\r\n                        </div>\r\n                      </div>\r\n                    </td>\r\n                  </mat-radio-group>\r\n                </tr>\r\n              </table>\r\n\r\n              <table style=\"width: 100%; \">\r\n                <tr>\r\n                  <td style=\"width: 35%; \">&nbsp;</td>\r\n                  <td style=\"width: 15%; font-size: 20px; \">Build</td>\r\n                  <td style=\"width: 15%; font-size: 20px; \">Prod</td>\r\n                  <td style=\"width: 15%; font-size: 20px; \">Type</td>\r\n                  <td style=\"width: 20%; font-size: 20px; text-align: right; \">Delete</td>\r\n                </tr>\r\n              </table>\r\n\r\n              <div *ngFor=\"let angularProject of bc.vsProject.developerSettings.angularProjects; let index_2 = index;\">\r\n                <div style=\"padding-bottom: 18px; \">\r\n                  <table style=\"border-radius: 10px; font-size: 20px; font-family: px-neuropol; width: 100%; height: 50px; \" [style.background-color]=\"willExecuteProject(angularProject) ? 'white' : '' \">\r\n                    <tr>\r\n                      <td style=\"width: 37%; padding-left: 20px; \">\r\n                        <div title=\"Startup the {{angularProject.name}} Angular Project\">\r\n                          <mat-radio-button (click)=\"onClickDebugEnabled(angularProject); saveChanges();\" name=\"startupProjects\" [value]=\"index_2\" [checked]=\"willExecuteProject(angularProject)\"></mat-radio-button>\r\n                          <div style=\"display:inline-block; vertical-align: top; margin-top: 2px; margin-left: 5px; font-family: px-neuropol; \" (click)=\"angularProject.showPanel = !angularProject.showPanel\">{{angularProject.name}}</div>\r\n                        </div>\r\n                      </td>\r\n                      <td style=\"width: 15%; \">\r\n                        <div title=\"Enable the {{angularProject.name}} Release Build\">\r\n                          <mat-checkbox [(ngModel)]=\"angularProject.buildEnabled\" (click)=\"saveChanges();\"></mat-checkbox>\r\n                        </div>\r\n                      </td>\r\n                      <td style=\"width: 10%; \">\r\n                        <div title=\"Enable the Production mode for the {{angularProject.name}} Release Build\">\r\n                          <mat-checkbox [disabled]=\"!angularProject.buildEnabled\" [(ngModel)]=\"angularProject.production\" (click)=\"saveChanges();\"></mat-checkbox>\r\n                        </div>\r\n                      </td>\r\n                      <td style=\"width: 20%; \">\r\n                        <div class=\"build-type\" title=\"Select the Type of Release Build for: {{angularProject.name}}\">\r\n\r\n                          <mat-form-field class=\"development-build-type-select\">\r\n                            <mat-select [disabled]=\"!angularProject.buildEnabled\" [(ngModel)]=\"angularProject.buildType\" (selectionChange)=\"saveChanges();\">\r\n                              <mat-option *ngFor=\"let buildType of getBuildTypes(); let i = index;\" [value]=\"i\">\r\n                                {{buildType}}\r\n                              </mat-option>\r\n                            </mat-select>\r\n                          </mat-form-field>\r\n\r\n                        </div>\r\n                      </td>\r\n                      <td style=\"width: 18%; text-align: right; padding-right: 20px; \">\r\n                        <mat-icon *ngIf=\"angularProject.name !== 'configure' && angularProject.name !== 'desktop'\" color=\"primary\" (click)=\"onClickRemove(vsProject, angularProject)\" style=\"cursor: pointer; margin-top: 0; \" title=\"Remove Angular Project: '{{angularProject.name}}'  from the {{bc.vsProject.name}} Visual Studio Project\">clear</mat-icon>\r\n                      </td>\r\n                    </tr>\r\n                  </table>\r\n                </div>\r\n              </div>\r\n\r\n            </mat-radio-group>\r\n            <button (click)=\"onClickAdd()\" mat-fab color=\"accent\" title=\"Add a New Project\" style=\"\">Add</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n    </mat-tab>\r\n\r\n    <mat-tab *ngIf=\"ac.settingsAvailable\" label=\"State & Action\">\r\n\r\n      <div class=\"flex-container\">\r\n        <div class=\"flex-item app-text-primary\">\r\n\r\n          <div class=\"development-action-title\" style=\"padding-top: 15px;\">Action Recordings</div>\r\n\r\n          <div class=\"development-feature-text\">\r\n            <div>\r\n              <button mat-fab (click)=\"onClickSave()\">Save</button>&nbsp;\r\n              <button mat-fab (click)=\"onClickLoad()\">Load</button>\r\n            </div>\r\n          </div>\r\n\r\n        </div>\r\n      </div>\r\n\r\n    </mat-tab>\r\n\r\n    <mat-tab *ngIf=\"ac.settingsAvailable\" label=\"Events\">\r\n      <div class=\"flex-container\">\r\n        <div class=\"flex-item app-text-primary\">\r\n\r\n          <div class=\"development-exceptions-title\" style=\"padding-top: 15px;\">Generate & Log Events</div>\r\n\r\n          <div class=\"development-exceptions-text\">\r\n\r\n            <button style=\"margin-left: 5px; \" mat-fab (click)=\"onClickThrowException()\">Throw</button>\r\n            <input [spellcheck]=\"false\" style=\"width: 200px; font-size: 18px; margin-left: 10px; \" type=\"text\" matInput placeholder=\"Enter Exception\" [(ngModel)]=\"bc.eventProperties.exception\">\r\n\r\n            <br /><br />\r\n            <button style=\"margin-left: 5px; \" mat-fab (click)=\"onClickLogEntry()\">Enter</button>\r\n            <input [spellcheck]=\"false\" style=\"width: 200px; font-size: 18px; margin-left: 10px; \" type=\"text\" matInput placeholder=\"Enter Message\" [(ngModel)]=\"bc.eventProperties.message\">\r\n\r\n            <mat-radio-group style=\"padding-left: 50px;\" name=\"messageType\" [(ngModel)]=\"bc.eventProperties.entryType\">\r\n              <mat-radio-button name=\"messageType\" [value]=\"1\"></mat-radio-button>\r\n              <div style=\"display:inline-block; vertical-align: middle; margin-top: 5px; margin-left: 2px; font-family: px-neuropol; color: rgba(255, 87, 34, 1);\">Error</div>\r\n\r\n              <mat-radio-button name=\"messageType\" [value]=\"2\" style=\"margin-left: 20px; \"></mat-radio-button>\r\n              <div style=\"display:inline-block; vertical-align: middle; margin-top: 5px; margin-left: 2px; font-family: px-neuropol; color: rgba(255, 87, 34, 1);\">Warning</div>\r\n\r\n              <mat-radio-button name=\"messageType\" [value]=\"4\" style=\"margin-left: 20px; \"></mat-radio-button>\r\n              <div style=\"display:inline-block; vertical-align: middle; margin-top: 5px; margin-left: 2px; font-family: px-neuropol; color: rgba(255, 87, 34, 1);\">Information</div>\r\n\r\n            </mat-radio-group>\r\n\r\n          </div>\r\n\r\n        </div>\r\n\r\n        <div class=\"flex-item app-text-primary\">\r\n\r\n          <div class=\"development-exceptions-title\" style=\"padding-top: 15px;\">Application Event List</div>\r\n\r\n          <div class=\"development-event-list\">\r\n\r\n            <table style=\"color: #ff5722; font-family: Neuropol;\">\r\n              <tr>\r\n                <td style=\"width: 300px; padding-left: 20px; \">Type</td>\r\n                <td style=\"width: 300px; padding-left: 0; \">Date</td>\r\n                <td style=\"width: 300px; padding-left: 0; \">Time</td>\r\n              </tr>\r\n            </table>\r\n            <mat-accordion multi=\"true\">\r\n              <mat-expansion-panel *ngFor=\"let event of bc.eventLogEntries; \" style=\"background-color: whitesmoke; \">\r\n                <mat-expansion-panel-header>\r\n                  <mat-panel-title>\r\n                    <table style=\"color: #ff5722; font-family: Neuropol; width: 100%; \">\r\n                      <tr>\r\n                        <td style=\"width: 300px; \">\r\n                          <mat-icon [style.color]=\"getEventTypeColor(event.entryType)\" class=\"toolbar-icon-button\">{{getIconName(event.entryType)}}</mat-icon>\r\n                        </td>\r\n                        <td style=\"width: 300px; \">\r\n                          {{\r\nevent.timeGenerated.getMonth() + 1\r\n                          }}/{{event.timeGenerated.getDate()}}/{{event.timeGenerated.getYear()}}\r\n                        </td>\r\n                        <td style=\"width: 300px; \">{{event.timeGenerated.toLocaleTimeString()}}</td>\r\n                      </tr>\r\n                    </table>\r\n\r\n                  </mat-panel-title>\r\n                  <mat-panel-description>\r\n                  </mat-panel-description>\r\n                </mat-expansion-panel-header>\r\n\r\n                <div style=\"text-align: left; \">\r\n                  Entry Type: {{getEventTypeText(event.entryType)}}\r\n                  <br />\r\n                  <div *ngFor=\"let s of event.replacementStrings; let index = index; \">\r\n                    <div *ngIf=\"index > 0\">{{s}}</div>\r\n                    <br />\r\n                  </div>\r\n                </div>\r\n\r\n              </mat-expansion-panel>\r\n\r\n            </mat-accordion>\r\n\r\n          </div>\r\n\r\n        </div>\r\n      </div>\r\n    </mat-tab>\r\n\r\n    <mat-tab *ngIf=\"ac.settingsAvailable\" label=\"Metrics\">\r\n      <div class=\"flex-container\">\r\n        <div class=\"flex-item app-text-primary\">\r\n          <div class=\"development-exceptions-title\" style=\"padding-top: 15px;\">Performance by Reaponse Time</div>\r\n\r\n          <table class=\"analytics-feature-title\">\r\n            <tr>\r\n              <td style=\"width: 40%; padding-left: 30px;\">Get App Settings</td>\r\n              <td style=\"width: 40%; text-align: right; \">Average Time :</td>\r\n              <td style=\"width: 10%; font-family: Arial; \">{{ac.analyticsData.averageResponseTime}}ms</td>\r\n              <td style=\"width: 10%; text-align: right; padding-right: 5px; \"><button mat-mini-fab color=\"accent\" [disabled]=\"ac.analyticsData.performances.length === 0\" (click)=\"onClickClearResponseTime()\">Clear</button></td>\r\n            </tr>\r\n          </table>\r\n          <mat-card style=\"margin-top: 10px; \" *ngFor=\"let performance of ac.analyticsData.performances\">{{performance.dateString}}&nbsp;&nbsp;&nbsp;{{performance.timeString}}&nbsp;&nbsp;&nbsp;{{performance.responseTime}}ms</mat-card>\r\n\r\n        </div>\r\n\r\n      </div>\r\n    </mat-tab>\r\n\r\n  </mat-tab-group>\r\n\r\n</view-fader>\r\n\r\n");

/***/ }),

/***/ "../../node_modules/raw-loader/dist/cjs.js!../../features/development.remove.dialog.html":
/*!***********************************************************************************************************************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularNetCore/wwwroot/node_modules/raw-loader/dist/cjs.js!C:/ProMatrix.2/Angular.Net.CLI/AngularNetCore/wwwroot/features/development.remove.dialog.html ***!
  \***********************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1 mat-dialog-title style=\"margin-bottom: 5px; cursor: default; \">{{removeDialogData.title}}</h1>\r\n<div style=\"font-family: Arial; font-size: 16px; \">\r\n  {{removeDialogData.message}}\r\n</div>\r\n<mat-dialog-actions style=\"float: right; \">\r\n  <button mat-fab (click)=\"onClickYes()\" style=\"min-width: 35px; top: 5px; \" >Yes</button>\r\n  <button mat-fab class=\"cancel-button\" [mat-dialog-close]=\"true\" style=\"min-width: 35px; top: 5px; margin: 10px; \" >Cancel</button>\r\n</mat-dialog-actions>\r\n");

/***/ }),

/***/ "../../node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html":
/*!******************************************************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularNetCore/wwwroot/node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
  \******************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div>\r\n  <view-blinker *ngIf=\"showOpeningTitle\" [blinking]=\"true\" [visibleWhenNotBlinking]=\"false\" >\r\n    <br /><br />\r\n    <div class=\"text-primary\" style=\"text-align: center; width: 100%; font-family: px-neuropol; font-size: 54px; margin-top: 25%; \">{{appTitle}}</div>\r\n  </view-blinker>\r\n\r\n  <view-fader *ngIf=\"showMobileApiView\" [isViewVisible]=\"showMobileApiView\">\r\n    <br />\r\n    <router-outlet></router-outlet>\r\n  </view-fader>\r\n</div>\r\n");

/***/ }),

/***/ "../../node_modules/tslib/tslib.es6.js":
/*!*********************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularNetCore/wwwroot/node_modules/tslib/tslib.es6.js ***!
  \*********************************************************************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}


/***/ }),

/***/ "../../src/app/side-nav.component.actions.ts":
/*!***************************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularNetCore/wwwroot/src/app/side-nav.component.actions.ts ***!
  \***************************************************************************************************/
/*! exports provided: RequestAppSettings, ResponseAppSettings, NavigateTo, SideNavInit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestAppSettings", function() { return RequestAppSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResponseAppSettings", function() { return ResponseAppSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavigateTo", function() { return NavigateTo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SideNavInit", function() { return SideNavInit; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");

var RequestAppSettings = /** @class */ (function () {
    function RequestAppSettings(name, title, payload, playback, delay) {
        this.name = name;
        this.title = title;
        this.payload = payload;
        this.playback = playback;
        this.delay = delay;
    }
    RequestAppSettings.type = '[side-nav] Request AppSettings';
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
    return NavigateTo;
}());

var SideNavInit = /** @class */ (function () {
    // remove circular reference by using ngAction: any
    function SideNavInit(ngAction) {
        this.ngAction = ngAction;
    }
    SideNavInit.type = '[side-nav] SideNavInit';
    return SideNavInit;
}());



/***/ }),

/***/ "../../src/environments/environment.ts":
/*!*********************************************************************************************!*\
  !*** C:/ProMatrix.2/Angular.Net.CLI/AngularNetCore/wwwroot/src/environments/environment.ts ***!
  \*********************************************************************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");

// this will work whenever the frontend and backend are served from one server
var indexController = 'http://localhost:1999/index';
var environment = {
    production: false,
    api: {
        // App Settings
        getSysInfo: location.origin + '/api/sysInfo',
        sendTextMessage: location.origin + '/api/sendTextMessage',
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
        // Developer's Settings
        getBuildConfig: indexController + '/getConfig',
        saveVisualProject: indexController + '/saveVisualProject',
        buildAngularProject: indexController + '/buildAngularProject',
        addAngularProject: indexController + '/addAngularProject',
        removeAngularProject: indexController + '/removeAngularProject',
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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */");

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
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./app.component.html */ "../../node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html")).default,
            providers: [_common_appConfig__WEBPACK_IMPORTED_MODULE_3__["AppConfig"]],
            styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")).default]
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
/* harmony import */ var ngx_motion__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngx-motion */ "../../node_modules/ngx-motion/fesm5/ngx-motion.js");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ngxs/store */ "../../node_modules/@ngxs/store/fesm5/ngxs-store.js");
/* harmony import */ var _ngxs_devtools_plugin__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ngxs/devtools-plugin */ "../../node_modules/@ngxs/devtools-plugin/fesm5/ngxs-devtools-plugin.js");
/* harmony import */ var _ngxs_logger_plugin__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ngxs/logger-plugin */ "../../node_modules/@ngxs/logger-plugin/fesm5/ngxs-logger-plugin.js");
/* harmony import */ var _features_base_help_dialog__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../features/base.help.dialog */ "../../features/base.help.dialog.ts");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./app.routing.module */ "./src/app/app.routing.module.ts");







// features




// services


// ngxs






var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"], _features_development_component__WEBPACK_IMPORTED_MODULE_8__["DevelopmentComponent"], _features_development_component__WEBPACK_IMPORTED_MODULE_8__["DevelopmentHelpDialogComponent"], _features_development_component__WEBPACK_IMPORTED_MODULE_8__["DevelopmentBuildDialogComponent"], _features_development_component__WEBPACK_IMPORTED_MODULE_8__["DevelopmentAddDialogComponent"], _features_development_component__WEBPACK_IMPORTED_MODULE_8__["DevelopmentRemoveDialogComponent"], _features_base_help_dialog__WEBPACK_IMPORTED_MODULE_15__["BaseHelpDialogComponent"]],
            entryComponents: [_features_development_component__WEBPACK_IMPORTED_MODULE_8__["DevelopmentBuildDialogComponent"], _features_development_component__WEBPACK_IMPORTED_MODULE_8__["DevelopmentAddDialogComponent"], _features_development_component__WEBPACK_IMPORTED_MODULE_8__["DevelopmentRemoveDialogComponent"]],
            imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"],
                ngx_motion__WEBPACK_IMPORTED_MODULE_11__["AppAnimationModule"],
                ngx_motion__WEBPACK_IMPORTED_MODULE_11__["AppHelperModule"].forRoot(),
                _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"].forRoot([]),
                _ngxs_store__WEBPACK_IMPORTED_MODULE_12__["NgxsModule"].forRoot([]),
                _app_routing_module__WEBPACK_IMPORTED_MODULE_16__["AppRoutingModule"],
                _ngxs_devtools_plugin__WEBPACK_IMPORTED_MODULE_13__["NgxsReduxDevtoolsPluginModule"].forRoot(),
                _ngxs_logger_plugin__WEBPACK_IMPORTED_MODULE_14__["NgxsLoggerPluginModule"].forRoot(), ngx_motion__WEBPACK_IMPORTED_MODULE_11__["MaterialModule"]
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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "../../node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! hammerjs */ "../../node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_4__);





Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\ProMatrix.2\Angular.Net.CLI\AngularNetCore\wwwroot\projects\configure\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map