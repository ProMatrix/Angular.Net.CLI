(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./common/apiService.ts":
/*!******************************!*\
  !*** ./common/apiService.ts ***!
  \******************************/
/*! exports provided: ApiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiService", function() { return ApiService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var _ngAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ngAction */ "./common/ngAction.ts");


class ApiService {
    constructor(http, store) {
        this.http = http;
        this.store = store;
        this.serverError = 'Server could be busy or offline!';
        this.downloadTimeout = 45000;
        this.uploadTimeout = 45000;
        this.ngAction = _ngAction__WEBPACK_IMPORTED_MODULE_1__["NgAction"].getInstance(store);
    }
    //#region httpRequest
    httpRequest(obj, requestType, responseType$, url, success, error, params$, headers$, progressCallback) {
        const reportProgress$ = (progressCallback !== undefined && progressCallback !== null);
        let request;
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
        let timerId = null;
        const httpSubscription = this.http.request(request).subscribe((event) => {
            if (timerId) {
                clearTimeout(timerId);
            }
            timerId = setTimeout(() => {
                clearTimeout(timerId);
                timerId = null;
                httpSubscription.unsubscribe();
                error(this.serverError);
            }, this.downloadTimeout);
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
        }, (errorResponse) => {
            clearTimeout(timerId);
            httpSubscription.unsubscribe();
            if (errorResponse.error.ExceptionMessage) {
                error(errorResponse.error.ExceptionMessage);
            }
            else {
                error(errorResponse.error);
            }
        });
    }
    //#endregion
    //#region http get
    get(url, success, error, params, headers, progressCallback) {
        this.httpRequest(null, 'Get', 'json', url, success, error, params, headers, progressCallback);
    }
    download(url, success, error, params, headers, progressCallback) {
        this.httpRequest(null, 'Get', 'blob', url, success, error, params, headers, progressCallback);
    }
    //#endregion
    //#region http post
    post(object$, url, success, error, params, headers, progressCallback) {
        this.httpRequest(object$, 'Post', 'json', url, success, error, params, headers, progressCallback);
    }
    upload(files, url, success, error, params, headers, progressCallback) {
        const formData = new FormData();
        for (const file of files) {
            formData.append(file.name, file);
        }
        this.post(formData, url, success, error, params, headers, progressCallback);
    }
    //#endregion
    //#region http delete
    delete(url, success, error, params, headers, progressCallback) {
        this.httpRequest(null, 'Delete', 'json', url, success, error, params, headers, progressCallback);
    }
    //#endregion
    //#region save file
    saveFile(blob, filename) {
        if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, filename);
        }
        else {
            const a = document.createElement('a');
            document.body.appendChild(a);
            const url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = filename;
            a.click();
            setTimeout(() => {
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            }, 0);
        }
    }
    handleError(customResponse, caught) {
        // do something to capture the error for reporting purposes
        throw customResponse.error;
    }
    //#endregion
    setLocalStorage(name, anyObject) {
        if (anyObject instanceof Array) {
            anyObject = { array: anyObject };
        }
        if (typeof (anyObject) === 'object') {
            const stringVal = JSON.stringify(anyObject, null, 2);
            if (stringVal) {
                localStorage.setItem(name, stringVal);
            }
        }
    }
    getLocalStorage(name) {
        const value = localStorage.getItem(name);
        if (!value) {
            return null;
        }
        if (value.substring(0, 1) === '{') {
            const obj = JSON.parse(value);
            if ('array' in obj) {
                return obj.array;
            }
            return obj;
        }
        return null;
    }
    filterFileNameChar(key) {
        const illegalCharacters = ' \ / : * ? " < > | ';
        if (illegalCharacters.includes(key)) {
            return false;
        }
        else {
            return true;
        }
    }
    filterProjectNameChar(charCode) {
        if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8)
            return true;
        else
            return false;
    }
}


/***/ }),

/***/ "./common/appConfig.ts":
/*!*****************************!*\
  !*** ./common/appConfig.ts ***!
  \*****************************/
/*! exports provided: AppConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppConfig", function() { return AppConfig; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var _apiService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./apiService */ "./common/apiService.ts");
/* harmony import */ var ngx_modeling__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-modeling */ "./node_modules/ngx-modeling/index.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/snack-bar.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _src_environments_environment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngxs/store */ "./node_modules/@ngxs/store/__ivy_ngcc__/fesm2015/ngxs-store.js");
// #region Imports








// ngxs






// #endregion
class AppConfig extends _apiService__WEBPACK_IMPORTED_MODULE_2__["ApiService"] {
    constructor(route, snackBar, store, http) {
        super(http, store);
        this.route = route;
        this.snackBar = snackBar;
        this.store = store;
        this.http = http;
        this.appSettings = new ngx_modeling__WEBPACK_IMPORTED_MODULE_3__["AppSettings"]();
        this.settingsAvailable = false;
        this.analyticsData = new ngx_modeling__WEBPACK_IMPORTED_MODULE_3__["AnalyticsData"]();
        this.isPhoneSize = false;
        this.isLandscapeView = false;
        this.isInitialized = false;
        this.isSpinnerAvailable = false;
        this.isSpinnerVisible = false;
        this.isStandAlone = false;
        this.isOnline = true;
        this.screenWidth = 0;
        this.screenHeight = 0;
        this.smallWidthBreakpoint = 720;
        this.headerHeight = 200;
        this.sideNavWidth = 400;
        this.mapControlsHeight = 275;
        this.mapControlsWidth = 300;
        this.mediaQueryBreak = 1280;
        this.tm = new ngx_modeling__WEBPACK_IMPORTED_MODULE_3__["TimingMetrics"]('getAppSettings');
    }
    getRouteData() {
        let currentRoute = this.route.root;
        while (currentRoute.children[0] !== undefined) {
            currentRoute = currentRoute.children[0];
        }
        return currentRoute.snapshot.data;
    }
    getHelpFileHtml(helpFile, success) {
        this.http.get(helpFile, { responseType: 'text' }).subscribe(html => {
            success(html);
        });
    }
    showSpinner(show) {
        if (show) {
            this.isSpinnerAvailable = true;
            setTimeout(() => {
                this.isSpinnerVisible = true;
            }, 0);
        }
        else {
            this.isSpinnerVisible = false;
            setTimeout(() => {
                this.isSpinnerAvailable = false;
            }, 1000);
        }
    }
    updateAnalytics() {
        let totalResponseTime = 0;
        this.analyticsData.performances = this.analyticsData.performances.map(x => {
            x.dateString = moment__WEBPACK_IMPORTED_MODULE_4__(x.date).format('YYYY-MM-DD');
            x.timeString = moment__WEBPACK_IMPORTED_MODULE_4__(x.date).format('HH:mm:ss');
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
    }
    clearResponseTime() {
        this.analyticsData.performances.length = 0;
        this.analyticsData.averageResponseTime = 0;
        this.setLocalStorage('analyticsData', this.analyticsData);
    }
    logResonseData(responseTime) {
        if (this.analyticsData.performances.length > 9) {
            this.analyticsData.performances.pop();
        }
        const performance = new ngx_modeling__WEBPACK_IMPORTED_MODULE_3__["Performance"]();
        performance.date = new Date();
        performance.responseTime = responseTime;
        this.analyticsData.performances.unshift(performance);
        this.setLocalStorage('analyticsData', this.analyticsData);
    }
    waitUntilInitialized(callback) {
        const intervalTimer = setInterval(() => {
            if (this.isInitialized) {
                clearInterval(intervalTimer);
                callback();
            }
        }, 1000);
    }
    getAppSettings(success, error) {
        this.isStandAlone = window.matchMedia('(display-mode: standalone)').matches;
        try {
            this.tm.setStartMarker();
        }
        catch (e) { }
        this.analyticsData = this.getLocalStorage('analyticsData');
        if (!this.analyticsData) {
            this.analyticsData = new ngx_modeling__WEBPACK_IMPORTED_MODULE_3__["AnalyticsData"]();
        }
        this.get(_src_environments_environment__WEBPACK_IMPORTED_MODULE_7__["environment"].api.getSysInfo, (appSettings) => {
            this.settingsAvailable = true;
            appSettings.apiVersions.angular = _angular_core__WEBPACK_IMPORTED_MODULE_0__["VERSION"].full;
            this.setLocalStorage('appSettings', appSettings);
            try {
                this.tm.setEndMarker();
                this.logResonseData(this.tm.measureInterval());
            }
            catch (e) { }
            this.updateAnalytics();
            this.appSettings = appSettings;
            this.isInitialized = true;
            success();
        }, errorMessage => {
            this.appSettings = this.getLocalStorage('appSettings');
            if (!this.appSettings) {
                this.appSettings = new ngx_modeling__WEBPACK_IMPORTED_MODULE_3__["AppSettings"]();
                this.appSettings.debug = false;
                this.appSettings.testing = false;
                this.appSettings.buildVersion = 'xx.xx.xx';
                this.appSettings.splashTime = 5000;
            }
            this.isInitialized = true;
            error(errorMessage);
        });
    }
    sendTextMessage(textMessage, success, error) {
        this.post(textMessage, _src_environments_environment__WEBPACK_IMPORTED_MODULE_7__["environment"].api.sendTextMessage, () => {
            success();
        }, errorMessage => {
            error(errorMessage);
            // this error is generated from the service worker, because of a post
        });
    }
    onResizeApp() {
        if (screen.availWidth <= 767) {
            this.isPhoneSize = true;
        }
        else {
            this.isPhoneSize = false;
        }
        this.onOrientationChange();
        this.screenWidth = this.getScreenWidth();
        this.screenHeight = this.getScreenHeight();
    }
    onOrientationChange() {
        if (screen.availWidth > screen.availHeight) {
            this.isLandscapeView = true;
        }
        else {
            this.isLandscapeView = false;
        }
    }
    getScreenWidth() {
        if (this.isPhoneSize) {
            return screen.availWidth;
        }
        else {
            return document.body.clientWidth;
        }
    }
    getScreenHeight() {
        if (this.isPhoneSize) {
            return screen.availHeight;
        }
        else {
            return document.body.clientHeight;
        }
    }
    toastrSuccess(message, duration$) {
        if (!duration$) {
            duration$ = 3000;
        }
        this.snackBar.open(message, 'X', {
            duration: duration$,
            panelClass: ['snackbar-success']
        });
    }
    toastrError(message, duration$) {
        if (!duration$) {
            duration$ = -1;
        }
        this.snackBar.open(message, 'X', {
            duration: duration$,
            panelClass: ['snackbar-error']
        });
        setTimeout(() => {
            const toastr = document.querySelector('.mat-snack-bar-container');
            toastr.style.maxWidth = '100%';
        }, 0);
    }
    toastrWarning(message, duration$) {
        if (!duration$) {
            duration$ = 3000;
        }
        this.snackBar.open(message, 'X', {
            duration: duration$,
            panelClass: ['snackbar-warning']
        });
    }
    toastrInfo(message, duration$) {
        if (!duration$) {
            duration$ = 3000;
        }
        this.snackBar.open(message, 'X', {
            duration: duration$,
            panelClass: ['snackbar-info']
        });
    }
}
AppConfig.ɵfac = function AppConfig_Factory(t) { return new (t || AppConfig)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__["MatSnackBar"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_ngxs_store__WEBPACK_IMPORTED_MODULE_8__["Store"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); };
AppConfig.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: AppConfig, factory: AppConfig.ɵfac });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppConfig, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"] }, { type: _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__["MatSnackBar"] }, { type: _ngxs_store__WEBPACK_IMPORTED_MODULE_8__["Store"] }, { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "./common/buildConfig.ts":
/*!*******************************!*\
  !*** ./common/buildConfig.ts ***!
  \*******************************/
/*! exports provided: EventProperties, EventLogEntry, BuildConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventProperties", function() { return EventProperties; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventLogEntry", function() { return EventLogEntry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BuildConfig", function() { return BuildConfig; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var _apiService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./apiService */ "./common/apiService.ts");
/* harmony import */ var ngx_modeling__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-modeling */ "./node_modules/ngx-modeling/index.js");
/* harmony import */ var _src_environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngxs/store */ "./node_modules/@ngxs/store/__ivy_ngcc__/fesm2015/ngxs-store.js");









class EventProperties {
}
class EventLogEntry {
}
class BuildConfig extends _apiService__WEBPACK_IMPORTED_MODULE_2__["ApiService"] {
    constructor(store, http) {
        super(http, store);
        this.store = store;
        this.http = http;
        this.buildOutput = '';
        this.config = new ngx_modeling__WEBPACK_IMPORTED_MODULE_3__["BuildConfiguration"]();
        this.buildConfig = new ngx_modeling__WEBPACK_IMPORTED_MODULE_3__["BuildConfiguration"]();
        this.vsProject = new ngx_modeling__WEBPACK_IMPORTED_MODULE_3__["VisualProject"]();
        this.eventLogEntries = new Array();
        this.eventProperties = { exception: '', message: '', entryType: 1 };
    }
    throwException(success, error) {
        this.post(this.eventProperties, _src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].api.throwException, (response) => {
            success();
        }, () => {
            error('Error: Successfully generated an Application Exception!');
        });
    }
    logEntry(success, error) {
        this.post(this.eventProperties, _src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].api.postLogEntry, (response) => {
            success();
        }, () => {
            error('Error: Successfully created a log entry!');
        });
    }
    getLogEntries(success, error) {
        this.get(_src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].api.getLogEntries, (eventLogEntries) => {
            this.eventLogEntries = eventLogEntries;
            this.eventLogEntries.forEach(entry => {
                entry.timeGenerated = new Date(entry.timeGenerated);
                entry.timeWritten = new Date(entry.timeWritten);
                entry.replacementStrings[1] = entry.replacementStrings[1].replace('\n', '<br />');
            });
            success();
        }, (errorMessage) => { error(errorMessage); });
    }
    getBuildConfig(success, error) {
        this.get(_src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].api.getBuildConfig, (buildConfig) => {
            this.buildConfig = buildConfig;
            this.vsProject = buildConfig.visualProjects[0];
            success();
        }, (errorMessage) => { error(errorMessage); });
    }
    saveVisualProject(success, error) {
        this.post(this.vsProject, _src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].api.saveVisualProject, (response) => {
            success();
        }, () => {
            error('Error: Problems saving changes! Could be that the server is not available.');
        });
    }
    buildAngularProject(angularProject, success, error) {
        this.angularProject = angularProject;
        setTimeout(() => {
            this.post(angularProject, _src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].api.buildAngularProject, (buildResponse) => {
                switch (buildResponse.payloadType) {
                    case 'processing':
                        this.buildAngularProject(angularProject, success, error);
                        this.buildOutput += buildResponse.consoleText;
                        break;
                    case 'completed':
                        this.buildOutput += buildResponse.consoleText;
                        success(buildResponse.versionNo);
                        break;
                    case 'errored':
                        this.buildOutput += buildResponse.consoleText;
                        error('Error while building: ' + angularProject.name);
                        break;
                }
                setTimeout(() => {
                    this.consoleWindow.scrollTop = this.consoleWindow.scrollHeight;
                }, 0);
            }, errorMessage => {
                error(errorMessage);
            });
        }, 1000);
    }
    buildAngularProjects(success, error) {
        this.consoleWindow = document.querySelector('.textAreaForConsole');
        this.projectQueue = this.vsProject.developerSettings.angularProjects.filter((angularProject) => angularProject.buildEnabled === true);
        this.buildOutput = this.vsProject.name + '>';
        setTimeout(() => {
            this.projectQueue.forEach((project) => { project.visualProject = this.vsProject.name; });
            this.buildOutput = '';
            this.buildProjectLoop(success, error);
        }, 1000);
    }
    buildProjectLoop(success, error) {
        this.nextAngularProject((buildVersion) => {
            if (this.projectQueue.length === 0) {
                success(buildVersion);
            }
            else {
                this.buildProjectLoop(success, error);
            }
        }, () => {
            error();
        });
    }
    nextAngularProject(success, error) {
        const angularProject = this.projectQueue.shift();
        if (angularProject.buildEnabled) {
            this.buildOutput += angularProject.name + '>';
            this.buildAngularProject(angularProject, (buildVersion) => {
                success(buildVersion);
            }, (errorMessage) => {
                error();
            });
        }
        else {
            success(null);
        }
    }
    addProject(success, error, finale) {
        const vsp = new ngx_modeling__WEBPACK_IMPORTED_MODULE_3__["VisualProject"]();
        vsp.name = this.vsProject.name;
        vsp.developerSettings.angularProjects = Array.from(this.vsProject.developerSettings.angularProjects);
        vsp.developerSettings.angularProjects.push(this.angularProject);
        this.post(vsp, _src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].api.addAngularProject, (visualProject) => {
            this.vsProject = visualProject;
            success();
            finale();
        }, errorMessage => {
            error(errorMessage);
            finale();
        });
    }
    removeProject(success, error) {
        const angularProjects = Array.from(this.vsProject.developerSettings.angularProjects);
        // move the AngularProject to the bottom
        const projectToMove = this.vsProject.developerSettings.angularProjects.splice(this.vsProject.developerSettings.angularProjects.indexOf(this.angularProject), 1)[0];
        this.vsProject.developerSettings.angularProjects.push(projectToMove);
        this.post(this.vsProject, _src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].api.removeAngularProject, () => {
            this.vsProject.developerSettings.serveApp = 'desktop';
            this.vsProject.developerSettings.angularProjects.pop();
            success();
        }, errorMessage => {
            this.vsProject.developerSettings.angularProjects = angularProjects;
            error(errorMessage);
        });
    }
}
BuildConfig.ɵfac = function BuildConfig_Factory(t) { return new (t || BuildConfig)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_ngxs_store__WEBPACK_IMPORTED_MODULE_5__["Store"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); };
BuildConfig.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: BuildConfig, factory: BuildConfig.ɵfac });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](BuildConfig, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"]
    }], function () { return [{ type: _ngxs_store__WEBPACK_IMPORTED_MODULE_5__["Store"] }, { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "./common/entityService.ts":
/*!*********************************!*\
  !*** ./common/entityService.ts ***!
  \*********************************/
/*! exports provided: BookInfo, EntityService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BookInfo", function() { return BookInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntityService", function() { return EntityService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var _apiService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./apiService */ "./common/apiService.ts");
/* harmony import */ var _src_environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngxs/store */ "./node_modules/@ngxs/store/__ivy_ngcc__/fesm2015/ngxs-store.js");




// ngxs




class BookInfo {
}
// #endregion
class EntityService extends _apiService__WEBPACK_IMPORTED_MODULE_2__["ApiService"] {
    constructor(store, http) {
        super(http, store);
        this.store = store;
        this.http = http;
    }
    getAll(success, error) {
        this.get(_src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].api.getAll, (library) => {
            success(library);
        }, (errorMessage) => { error(errorMessage); });
    }
    getAllLocally(success, error) {
        this.get(_src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].api.getAllLocally, (library) => {
            success(library);
        }, (errorMessage) => { error(errorMessage); });
    }
    getFromId(success, error, fileName) {
        this.get(_src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].api.getContent, (response) => {
            success(response.content);
        }, error, new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]().set('fileName', fileName));
    }
    getWithProgress(success, error, fileName, progressCallback) {
        this.get(_src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].api.getContent, (response) => {
            success(response.content);
        }, error, new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]().set('fileName', fileName), null, (event) => {
            if (progressCallback) {
                progressCallback(event);
            }
        });
    }
    downloadFile(success, error, fileName) {
        this.download(_src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].api.download, (response) => {
            const fileBlob = new Blob([response.body], { type: 'text/plain' });
            success(fileBlob);
        }, error, new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]().set('fileName', fileName));
    }
    samplePayload(blob, type, success, error) {
        const file = new File([blob], 'simple.txt', { type });
        const files = new Array();
        files.push(file);
        this.upload(files, _src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].api.samplePayload, (response) => {
            success('Successfully completed Upload Payload Sample!');
        }, error, null, null, (event) => {
        });
    }
    downloadWithProgress(success, error, fileName, progressCallback) {
        this.download(_src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].api.download, (response) => {
            this.saveFile(new Blob([response.body]), fileName);
            success();
        }, error, new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]().set('fileName', fileName), null, (event) => {
            if (progressCallback) {
                return progressCallback(event);
            }
        });
    }
    postEntity(success, error) {
        this.post({ id: 123, name: 'A Bedtime Story', summary: 'BORING...' }, _src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].api.postEntity, (response) => {
            success('Successfully completed Post Entity!');
        }, error);
    }
    postCollection(success, error) {
        this.post([{ id: 123, name: 'A Bedtime Story', summary: 'BORING...' },
            { id: 456, name: 'An Endless Story', summary: 'Endless...' },
            { id: 789, name: 'Happy Ever After', summary: 'Exciting...' }], _src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].api.postCollection, (response) => {
            success('Successfully completed Post Collection!');
        }, error);
    }
    postCollectionWithProgess(success, error, progressCallback) {
        const collection = [{ id: 123, name: 'A Bedtime Story', summary: 'BORING...' },
            { id: 456, name: 'An Endless Story', summary: 'Endless...' },
            { id: 789, name: 'Happy Ever After', summary: 'Exciting...' }];
        this.post(collection, _src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].api.postCollection, (response) => {
            success('Successfully completed Post with Progress!');
        }, error, null, null, (event) => {
            if (progressCallback) {
                progressCallback(event);
            }
        });
    }
    uploadFile(files, success, error, progressCallback) {
        this.upload(files, _src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].api.upload, (response) => {
            success('Successfully completed Upload Files(s)!');
        }, error, null, null, (event) => {
            if (progressCallback) {
                progressCallback(event);
            }
        });
    }
    uploadFileWithProgess(files, success, error, progressCallback) {
        this.upload(files, _src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].api.upload, () => {
            success();
        }, error, null, null, (event) => {
            if (progressCallback) {
                return progressCallback(event);
            }
        });
    }
    deleteEntity(success, error, id) {
        this.delete(_src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].api.deleteEntity, (response) => {
            success('Successfully deleted entity!');
        }, error, new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]().set('id', id));
    }
    saveActionsQueue(success, error) {
        this.post({ fileName: 'actionsQueue003.json', actions: this.ngAction.actionsQueue }, _src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].api.saveActionsQueue, (response) => {
            success('Successfully saved the Actions Queue!');
        }, error);
    }
    loadActionsQueue(success, error, fileName) {
        this.get(_src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].api.loadActionsQueue, (actionsQueue) => {
            this.ngAction.replaceActionsQueue(actionsQueue);
            success('Successfully loaded the Actions Queue!');
        }, error, new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]().set('fileName', fileName));
    }
}
EntityService.ɵfac = function EntityService_Factory(t) { return new (t || EntityService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_ngxs_store__WEBPACK_IMPORTED_MODULE_4__["Store"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); };
EntityService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: EntityService, factory: EntityService.ɵfac });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](EntityService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"]
    }], function () { return [{ type: _ngxs_store__WEBPACK_IMPORTED_MODULE_4__["Store"] }, { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "./common/messagePump.ts":
/*!*******************************!*\
  !*** ./common/messagePump.ts ***!
  \*******************************/
/*! exports provided: MessagePump */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessagePump", function() { return MessagePump; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var _apiService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./apiService */ "./common/apiService.ts");
/* harmony import */ var _src_environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngxs/store */ "./node_modules/@ngxs/store/__ivy_ngcc__/fesm2015/ngxs-store.js");




// ngxs




class MessagePump extends _apiService__WEBPACK_IMPORTED_MODULE_2__["ApiService"] {
    constructor(store, http) {
        super(http, store);
        this.store = store;
        this.http = http;
        this.channelForSubscriptions = Array();
        this.allRegisteredChannels = Array();
        this.transmitMessageQueue = Array();
        this.receiveMessageQueue = Array();
        this.channelsToUnregister = Array();
        this.channelRegistered = false;
        this.channelUnregistrationInProcess = false;
        this.setToAutoRegister = false;
        this.channelRegistration = {
            id: new Date().getTime(),
            name: '',
            subscriptions: []
        };
        const cachedMessages = this.getLocalStorage('transmitMessageQueue');
        if (cachedMessages) {
            this.transmitMessageQueue = cachedMessages;
        }
    }
    register(success, error) {
        if (this.channelRegistered) {
            error('This channel is already unregistered!');
        }
        this.onUpdateSubscriptions(success, error);
    }
    setToOffline() {
        this.channelForSubscriptions.length = 0;
        this.channelRegistration.subscriptions.length = 0;
        this.allRegisteredChannels.length = 0;
        if (this.channelRegistered) {
            this.setToAutoRegister = true;
        }
        this.channelRegistered = false;
    }
    unregister(success, error) {
        if (!this.channelRegistered) {
            error('This channel is already unregistered!');
            return;
        }
        this.channelUnregistrationInProcess = true;
        this.post(this.channelRegistration, _src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].api.executeChannelUnregistration, (getAllChannels) => {
            this.channelForSubscriptions.length = 0;
            this.channelRegistration.subscriptions.length = 0;
            this.allRegisteredChannels = Array.from(getAllChannels.channels);
            success();
        }, errorMessage => {
            error(errorMessage);
        });
    }
    onUpdateSubscriptions(success, error) {
        this.channelRegistration.id = this.channelRegistration.id;
        this.post(this.channelRegistration, _src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].api.executeChannelRegistration, (getAllChannels) => {
            this.channelForSubscriptions = getAllChannels.channels;
            this.allRegisteredChannels = Array.from(getAllChannels.channels);
            this.channelRegistered = true;
            success();
        }, errorMessage => {
            error(errorMessage);
        });
    }
    synchronize(messageReceivedCallback, success, error) {
        this.get(_src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].api.getChannelData, (obj) => {
            if (!this.channelRegistered) {
                return;
            }
            switch (obj.type) {
                case 'ChannelSync':
                    const channelSync = obj;
                    if (channelSync.cancel) {
                        // channel was unregistered
                        this.channelForSubscriptions.length = 0;
                        this.channelRegistered = false;
                        this.channelUnregistrationInProcess = false;
                        success();
                    }
                    else {
                        this.synchronize(messageReceivedCallback, success, error);
                    }
                    break;
                case 'GetAllChannels':
                    const getAllChannels = obj;
                    this.channelForSubscriptions = getAllChannels.channels;
                    this.allRegisteredChannels = Array.from(getAllChannels.channels);
                    this.synchronize(messageReceivedCallback, success, error);
                    break;
                case 'ChannelMessage':
                    const channelMessage = obj;
                    const sendersName = this.channelForSubscriptions.filter(a => (a.name === channelMessage.sendersName))[0].name;
                    this.receiveMessageQueue.push(channelMessage);
                    messageReceivedCallback();
                    this.synchronize(messageReceivedCallback, success, error);
                    break;
            }
        }, errorMessage => {
            // most likely a 502 network timeout
            if (navigator.onLine) {
                this.synchronize(messageReceivedCallback, success, error);
            }
        }, new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]().set('id', this.channelRegistration.id.toString()));
    }
    getAllRegisteredChannels(success, error) {
        this.get(_src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].api.getRegisteredChannels, (getAllChannels) => {
            this.allRegisteredChannels = getAllChannels.channels;
            success();
        }, errorMessage => {
            error(errorMessage);
        });
    }
    queueChannelMessage(success, error, offlineCondition) {
        this.sendChannelMessage(success, error, offlineCondition);
    }
    sendChannelMessage(success, error, offlineCondition) {
        if (this.transmitMessageQueue.length === 0) {
            return;
        }
        if (!navigator.onLine) {
            this.setLocalStorage('transmitMessageQueue', this.transmitMessageQueue);
            offlineCondition();
            return;
        }
        const nextMessage = this.transmitMessageQueue.shift();
        this.post(nextMessage, _src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].api.sendChannelMessage, (wasSuccessful) => {
            if (wasSuccessful) {
                if (this.transmitMessageQueue.length > 0) {
                    this.sendChannelMessage(success, error, null);
                }
                else {
                    this.setLocalStorage('transmitMessageQueue', null);
                    success();
                }
            }
            else {
                error('Channel message Error!');
            }
        }, errorMessage => {
            error(errorMessage);
        });
    }
    getOrderedChannelForSubscriptions() {
        return this.channelForSubscriptions.sort((a, b) => {
            const textA = a.name.toUpperCase();
            const textB = b.name.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
    }
    getChanneNamesForSubscriptions() {
        return this.channelForSubscriptions.map(a => a.name);
    }
    getOrderedAllRegisteredChannels() {
        return this.allRegisteredChannels.sort((a, b) => {
            const textA = a.name.toUpperCase();
            const textB = b.name.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
    }
}
MessagePump.ɵfac = function MessagePump_Factory(t) { return new (t || MessagePump)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_ngxs_store__WEBPACK_IMPORTED_MODULE_4__["Store"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); };
MessagePump.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: MessagePump, factory: MessagePump.ɵfac });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MessagePump, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"]
    }], function () { return [{ type: _ngxs_store__WEBPACK_IMPORTED_MODULE_4__["Store"] }, { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "./common/ngAction.ts":
/*!****************************!*\
  !*** ./common/ngAction.ts ***!
  \****************************/
/*! exports provided: Action, NgAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Action", function() { return Action; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgAction", function() { return NgAction; });
/* harmony import */ var _src_app_side_nav_component_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/app/side-nav.component.actions */ "./src/app/side-nav.component.actions.ts");
/* harmony import */ var _features_mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../features/mobileApis.component.actions */ "./features/mobileApis.component.actions.ts");


class Action {
}
class NgAction {
    constructor(store) {
        this.store = store;
        this.actionsQueue = new Array(); // fills as new actions are dispatched
        this.currentIndex = -1;
        this.recording = false;
        this.dispatching = false;
        this.lastTicks = 0;
        this.continuation = false;
        NgAction.store = store;
    }
    static getInstance(store) {
        if (!NgAction.instance) {
            NgAction.instance = new NgAction(store);
        }
        return NgAction.instance;
    }
    startRecording() {
        this.recording = true;
        this.lastTicks = 0;
    }
    stopRecording() {
        this.recording = false;
    }
    isRecording() {
        return this.recording;
    }
    isDispatching() {
        return this.dispatching;
    }
    appendToQueue(action) {
        if (this.recording) {
            const currentTicks = new Date().getTime();
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
    }
    clearQueue() {
        this.actionsQueue.length = 0;
        this.currentIndex = -1;
    }
    getLatestIndex() {
        return this.currentIndex;
    }
    setLatestIndex(index) {
        this.currentIndex = index;
    }
    singleAction(index) {
        this.recording = false;
        this.dispatching = false;
        this.store.dispatch(this.actionsQueue[index]);
        this.currentIndex = index;
    }
    playback() {
        this.dispatching = true;
        this.recording = false;
        let playbackDelay;
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
        setTimeout(() => { this.playbackDelayed(); }, playbackDelay);
    }
    playbackDelayed() {
        this.store.dispatch({ type: '@@INIT' });
        this.store.dispatch({ type: '@@UPDATE_STATE' });
        let delay = 0;
        if (this.currentIndex === -1) {
            this.currentIndex = 0;
        }
        for (let i = this.currentIndex; i < this.actionsQueue.length; i++) {
            const action = this.actionsQueue[i];
            if (action.playback) {
                if (this.continuation) {
                    this.continuation = false;
                }
                else {
                    delay += action.delay;
                }
                setTimeout(() => {
                    this.currentIndex = i;
                    this.store.dispatch(action);
                    if (i === this.actionsQueue.length - 1) {
                        this.dispatching = false;
                    }
                }, delay);
            }
        }
    }
    replaceActionsQueue(actionsQueue) {
        const newActionsArray = new Array();
        actionsQueue.forEach(action => {
            newActionsArray.push(this.createNewAction(action));
        });
        this.actionsQueue = newActionsArray;
        this.setLatestIndex(this.actionsQueue.length - 1);
    }
    createNewAction(action) {
        switch (action.name) {
            case 'NavigateTo':
                return new _src_app_side_nav_component_actions__WEBPACK_IMPORTED_MODULE_0__["NavigateTo"](action.name, action.title, action.payload, action.playback, action.delay - 0);
            case 'ChangeTab':
                return new _features_mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_1__["ChangeTabIndex"](action.name, action.title, action.payload, action.playback, action.delay - 0);
            case 'SpellChecking':
                return new _features_mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_1__["ToggleSpellChecking"](action.name, action.title, action.payload, action.playback, action.delay - 0);
            case 'UpdateMessage':
                return new _features_mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_1__["UpdateTextMessage"](action.name, action.title, action.payload, action.playback, action.delay - 0);
            case 'ClearMessage':
                return new _features_mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_1__["ClearTextMessage"](action.name, action.title, action.payload, action.playback, action.delay - 0);
            default:
                throw new Error('Action type not found!');
        }
    }
}


/***/ }),

/***/ "./features/alreadyReady.component.ts":
/*!********************************************!*\
  !*** ./features/alreadyReady.component.ts ***!
  \********************************************/
/*! exports provided: AlreadyReadyComponent, AlreadyReadyHelpDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlreadyReadyComponent", function() { return AlreadyReadyComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlreadyReadyHelpDialogComponent", function() { return AlreadyReadyHelpDialogComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/dialog.js");
/* harmony import */ var _common_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/appConfig */ "./common/appConfig.ts");
/* harmony import */ var ngx_modeling__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-modeling */ "./node_modules/ngx-modeling/index.js");
/* harmony import */ var ngx_motion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-motion */ "./node_modules/ngx-motion/__ivy_ngcc__/fesm2015/ngx-motion.js");
/* harmony import */ var _base_help_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./base.help.dialog */ "./features/base.help.dialog.ts");


// services






class AlreadyReadyComponent {
    constructor(ac) {
        this.ac = ac;
        this.isViewVisible = false;
        this.timerId = null;
        this.snapshotTaken = false;
        this.tm = new ngx_modeling__WEBPACK_IMPORTED_MODULE_3__["TimingMetrics"]('AlreadyReady');
    }
    ngOnInit() {
        this.tm.setStartMarker();
        this.ac.waitUntilInitialized(() => {
            setTimeout(() => {
                const x = new ngx_modeling__WEBPACK_IMPORTED_MODULE_3__["TextMessage"]();
                x.message = 'GREAT!';
                this.isViewVisible = true;
            }, 0);
        });
    }
    ngAfterViewChecked() {
        if (this.isViewVisible) {
            this.tm.setEndMarker();
            this.tm.measureInterval();
        }
    }
}
AlreadyReadyComponent.ɵfac = function AlreadyReadyComponent_Factory(t) { return new (t || AlreadyReadyComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_common_appConfig__WEBPACK_IMPORTED_MODULE_2__["AppConfig"])); };
AlreadyReadyComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AlreadyReadyComponent, selectors: [["ng-component"]], decls: 8, vars: 1, consts: [[3, "isViewVisible"], [1, "flex-container"], [1, "flex-item", "app-text-primary"], [1, "already-feature-title", 2, "font-family", "px-neuropol"], [1, "already-feature-text"]], template: function AlreadyReadyComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "view-fader", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Add New Feature Here");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, " The Angular.Net Studio comes with the scaffolding for you to immediately begin implementing your own custom feature. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("isViewVisible", ctx.isViewVisible);
    } }, directives: [ngx_motion__WEBPACK_IMPORTED_MODULE_4__["ɵa"]], encapsulation: 2 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AlreadyReadyComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                // #region template
                templateUrl: './alreadyReady.component.html'
                // #endregion
            }]
    }], function () { return [{ type: _common_appConfig__WEBPACK_IMPORTED_MODULE_2__["AppConfig"] }]; }, null); })();
class AlreadyReadyHelpDialogComponent {
    constructor(data) {
        this.data = data;
        // data contains values passed by the router
    }
}
AlreadyReadyHelpDialogComponent.ɵfac = function AlreadyReadyHelpDialogComponent_Factory(t) { return new (t || AlreadyReadyHelpDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])); };
AlreadyReadyHelpDialogComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AlreadyReadyHelpDialogComponent, selectors: [["ng-component"]], decls: 2, vars: 1, template: function AlreadyReadyHelpDialogComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "base-help-dialog");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" Here is where you will find help with the: ", ctx.data.subtitle, "\n");
    } }, directives: [_base_help_dialog__WEBPACK_IMPORTED_MODULE_5__["BaseHelpDialogComponent"]], encapsulation: 2 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AlreadyReadyHelpDialogComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                templateUrl: './alreadyReady.component.help.html'
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"]]
            }] }]; }, null); })();


/***/ }),

/***/ "./features/base.help.dialog.ts":
/*!**************************************!*\
  !*** ./features/base.help.dialog.ts ***!
  \**************************************/
/*! exports provided: BaseHelpDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseHelpDialogComponent", function() { return BaseHelpDialogComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/dialog.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/button.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/icon.js");






class BaseHelpDialogComponent {
    constructor(data) {
        this.data = data;
        // data contains values passed by the router
    }
}
BaseHelpDialogComponent.ɵfac = function BaseHelpDialogComponent_Factory(t) { return new (t || BaseHelpDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])); };
BaseHelpDialogComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: BaseHelpDialogComponent, selectors: [["base-help-dialog"]], decls: 7, vars: 2, consts: [[2, "float", "right"], ["mat-button", "", 2, "min-width", "35px", "top", "5px", 3, "mat-dialog-close"], ["title", "Close Help", 2, "cursor", "pointer", "margin-top", "0"], ["mat-dialog-title", "", 2, "text-align", "center", "background-color", "aliceblue", "height", "35px", "padding-top", "5px"]], template: function BaseHelpDialogComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-dialog-actions", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-icon", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "clear");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "h1", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("mat-dialog-close", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" Help with the: ", ctx.data.subtitle, "\n");
    } }, directives: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogActions"], _angular_material_button__WEBPACK_IMPORTED_MODULE_2__["MatButton"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogClose"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__["MatIcon"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogTitle"]], encapsulation: 2 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](BaseHelpDialogComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'base-help-dialog',
                templateUrl: './base.help.dialog.html'
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"]]
            }] }]; }, null); })();


/***/ }),

/***/ "./features/development.component.ts":
/*!*******************************************!*\
  !*** ./features/development.component.ts ***!
  \*******************************************/
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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/dialog.js");
/* harmony import */ var _common_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/appConfig */ "./common/appConfig.ts");
/* harmony import */ var _common_buildConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/buildConfig */ "./common/buildConfig.ts");
/* harmony import */ var _common_entityService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/entityService */ "./common/entityService.ts");
/* harmony import */ var ngx_modeling__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-modeling */ "./node_modules/ngx-modeling/index.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/button.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/input.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/progress-spinner */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/progress-spinner.js");
/* harmony import */ var ngx_motion__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngx-motion */ "./node_modules/ngx-motion/__ivy_ngcc__/fesm2015/ngx-motion.js");
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/tabs */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/tabs.js");
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/slide-toggle */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/slide-toggle.js");
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/radio */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/radio.js");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/checkbox */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/checkbox.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/form-field.js");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/select */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/select.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/icon.js");
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/expansion */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/expansion.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/card.js");
/* harmony import */ var _base_help_dialog__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./base.help.dialog */ "./features/base.help.dialog.ts");



// services


























function DevelopmentAddDialogComponent_mat_spinner_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-spinner", 7);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("diameter", 50);
} }
function DevelopmentComponent_td_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Version: ", ctx_r1.ac.appSettings.buildVersion, "");
} }
function DevelopmentComponent_td_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "\u00A0");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function DevelopmentComponent_td_53_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-radio-button", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DevelopmentComponent_td_53_div_1_Template_mat_radio_button_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r13); const angularProject_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit; const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); ctx_r11.onClickReleaseProject(angularProject_r8); return ctx_r11.saveChanges(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const angularProject_r8 = ctx_r14.$implicit;
    const index_1_r9 = ctx_r14.index;
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate1"]("title", "Startup from: dist/", angularProject_r8.name, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", index_1_r9)("checked", ctx_r10.angularProjectSelected(ctx_r10.bc.vsProject, angularProject_r8));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](angularProject_r8.name);
} }
function DevelopmentComponent_td_53_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, DevelopmentComponent_td_53_div_1_Template, 5, 4, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r3.bc.vsProject.developerSettings.executeDist);
} }
function DevelopmentComponent_div_66_mat_option_19_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-option", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const buildType_r19 = ctx.$implicit;
    const i_r20 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", i_r20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", buildType_r19, " ");
} }
function DevelopmentComponent_div_66_mat_icon_21_Template(rf, ctx) { if (rf & 1) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-icon", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DevelopmentComponent_div_66_mat_icon_21_Template_mat_icon_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r22); const angularProject_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit; const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r21.onClickRemove(ctx_r21.vsProject, angularProject_r15); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "clear");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const angularProject_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate2"]("title", "Remove Angular Project: '", angularProject_r15.name, "'  from the ", ctx_r18.bc.vsProject.name, " Visual Studio Project");
} }
function DevelopmentComponent_div_66_Template(rf, ctx) { if (rf & 1) {
    const _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "table", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "td", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "mat-radio-button", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DevelopmentComponent_div_66_Template_mat_radio_button_click_6_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r26); const angularProject_r15 = ctx.$implicit; const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); ctx_r25.onClickDebugEnabled(angularProject_r15); return ctx_r25.saveChanges(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DevelopmentComponent_div_66_Template_div_click_7_listener() { const angularProject_r15 = ctx.$implicit; return angularProject_r15.showPanel = !angularProject_r15.showPanel; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "td", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "mat-checkbox", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function DevelopmentComponent_div_66_Template_mat_checkbox_ngModelChange_11_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r26); const angularProject_r15 = ctx.$implicit; return angularProject_r15.buildEnabled = $event; })("click", function DevelopmentComponent_div_66_Template_mat_checkbox_click_11_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r26); const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r29.saveChanges(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "td", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "mat-checkbox", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function DevelopmentComponent_div_66_Template_mat_checkbox_ngModelChange_14_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r26); const angularProject_r15 = ctx.$implicit; return angularProject_r15.production = $event; })("click", function DevelopmentComponent_div_66_Template_mat_checkbox_click_14_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r26); const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r31.saveChanges(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "td", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "mat-form-field", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "mat-select", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function DevelopmentComponent_div_66_Template_mat_select_ngModelChange_18_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r26); const angularProject_r15 = ctx.$implicit; return angularProject_r15.buildType = $event; })("selectionChange", function DevelopmentComponent_div_66_Template_mat_select_selectionChange_18_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r26); const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r33.saveChanges(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](19, DevelopmentComponent_div_66_mat_option_19_Template, 2, 2, "mat-option", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "td", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](21, DevelopmentComponent_div_66_mat_icon_21_Template, 2, 2, "mat-icon", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const angularProject_r15 = ctx.$implicit;
    const index_2_r16 = ctx.index;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("background-color", ctx_r4.willExecuteProject(angularProject_r15) ? "white" : "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate1"]("title", "Startup the ", angularProject_r15.name, " Angular Project");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", index_2_r16)("checked", ctx_r4.willExecuteProject(angularProject_r15));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](angularProject_r15.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate1"]("title", "Enable the ", angularProject_r15.name, " Release Build");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", angularProject_r15.buildEnabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate1"]("title", "Enable the Production mode for the ", angularProject_r15.name, " Release Build");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", !angularProject_r15.buildEnabled)("ngModel", angularProject_r15.production);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate1"]("title", "Select the Type of Release Build for: ", angularProject_r15.name, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", !angularProject_r15.buildEnabled)("ngModel", angularProject_r15.buildType);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r4.getBuildTypes());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", angularProject_r15.name !== "configure" && angularProject_r15.name !== "desktop");
} }
function DevelopmentComponent_mat_tab_69_Template(rf, ctx) { if (rf & 1) {
    const _r35 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-tab", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Action Recordings");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "button", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DevelopmentComponent_mat_tab_69_Template_button_click_7_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r35); const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r34.onClickSave(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Save");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "\u00A0 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "button", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DevelopmentComponent_mat_tab_69_Template_button_click_10_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r35); const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r36.onClickLoad(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Load");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function DevelopmentComponent_mat_tab_70_mat_expansion_panel_37_div_16_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const s_r40 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](s_r40);
} }
function DevelopmentComponent_mat_tab_70_mat_expansion_panel_37_div_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, DevelopmentComponent_mat_tab_70_mat_expansion_panel_37_div_16_div_1_Template, 2, 1, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const index_r41 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", index_r41 > 0);
} }
function DevelopmentComponent_mat_tab_70_mat_expansion_panel_37_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-expansion-panel", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-expansion-panel-header");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-panel-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "table", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "td", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "mat-icon", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "td", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "td", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "mat-panel-description");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](16, DevelopmentComponent_mat_tab_70_mat_expansion_panel_37_div_16_Template, 3, 1, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const event_r38 = ctx.$implicit;
    const ctx_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("color", ctx_r37.getEventTypeColor(event_r38.entryType));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r37.getIconName(event_r38.entryType));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate3"](" ", event_r38.timeGenerated.getMonth() + 1, "/", event_r38.timeGenerated.getDate(), "/", event_r38.timeGenerated.getYear(), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](event_r38.timeGenerated.toLocaleTimeString());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" Entry Type: ", ctx_r37.getEventTypeText(event_r38.entryType), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", event_r38.replacementStrings);
} }
function DevelopmentComponent_mat_tab_70_Template(rf, ctx) { if (rf & 1) {
    const _r45 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-tab", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Generate & Log Events");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "button", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DevelopmentComponent_mat_tab_70_Template_button_click_6_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r45); const ctx_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r44.onClickThrowException(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Throw");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "input", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function DevelopmentComponent_mat_tab_70_Template_input_ngModelChange_8_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r45); const ctx_r46 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r46.bc.eventProperties.exception = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "button", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DevelopmentComponent_mat_tab_70_Template_button_click_11_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r45); const ctx_r47 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r47.onClickLogEntry(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "Enter");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "input", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function DevelopmentComponent_mat_tab_70_Template_input_ngModelChange_13_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r45); const ctx_r48 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r48.bc.eventProperties.message = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "mat-radio-group", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function DevelopmentComponent_mat_tab_70_Template_mat_radio_group_ngModelChange_14_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r45); const ctx_r49 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r49.bc.eventProperties.entryType = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "mat-radio-button", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "Error");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "mat-radio-button", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "Warning");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](21, "mat-radio-button", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "Information");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, "Application Event List");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "div", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "table", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "td", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, "Type");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "td", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, "Date");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "td", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35, "Time");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "mat-accordion", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](37, DevelopmentComponent_mat_tab_70_mat_expansion_panel_37_Template, 17, 9, "mat-expansion-panel", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("spellcheck", false)("ngModel", ctx_r6.bc.eventProperties.exception);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("spellcheck", false)("ngModel", ctx_r6.bc.eventProperties.message);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r6.bc.eventProperties.entryType);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r6.bc.eventLogEntries);
} }
function DevelopmentComponent_mat_tab_71_mat_card_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-card", 93);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const performance_r51 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate3"]("", performance_r51.dateString, "\u00A0\u00A0\u00A0", performance_r51.timeString, "\u00A0\u00A0\u00A0", performance_r51.responseTime, "ms");
} }
function DevelopmentComponent_mat_tab_71_Template(rf, ctx) { if (rf & 1) {
    const _r53 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-tab", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Performance by Reaponse Time");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "table", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "td", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Get App Settings");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "td", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Average Time :");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "td", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "td", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "button", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DevelopmentComponent_mat_tab_71_Template_button_click_14_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r53); const ctx_r52 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r52.onClickClearResponseTime(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Clear");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](16, DevelopmentComponent_mat_tab_71_mat_card_16_Template, 2, 3, "mat-card", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx_r7.ac.analyticsData.averageResponseTime, "ms");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx_r7.ac.analyticsData.performances.length === 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r7.ac.analyticsData.performances);
} }
class BuildDialogData {
}
class DevelopmentBuildDialogComponent {
    constructor(data) {
        this.data = data;
        this.buildDialogData = data.buildDialogData;
    }
}
DevelopmentBuildDialogComponent.ɵfac = function DevelopmentBuildDialogComponent_Factory(t) { return new (t || DevelopmentBuildDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])); };
DevelopmentBuildDialogComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DevelopmentBuildDialogComponent, selectors: [["ng-component"]], decls: 9, vars: 5, consts: [["mat-dialog-title", "", 2, "margin-bottom", "5px", "cursor", "default"], ["mat-dialog-content", ""], [2, "width", "600px", "height", "350px", "background-color", "black", "color", "white", "border-radius", "20px", "margin-left", "10px"], ["spellcheck", "false", 1, "textAreaForConsole", 2, "width", "95%", "height", "90%", "background-color", "black", "color", "white", "margin", "20px", "border-width", "0", "resize", "none", "overflow", "no-display", 3, "disabled"], [2, "float", "right"], ["mat-fab", "", 2, "min-width", "35px", "top", "5px", "margin", "10px", 3, "disabled", "mat-dialog-close"]], template: function DevelopmentBuildDialogComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h1", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "textarea", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "mat-dialog-actions", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Close");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.buildDialogData.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.buildDialogData.bc.buildOutput);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx.buildDialogData.closeDisabled)("mat-dialog-close", true);
    } }, directives: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogTitle"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogContent"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogActions"], _angular_material_button__WEBPACK_IMPORTED_MODULE_6__["MatButton"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogClose"]], encapsulation: 2 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DevelopmentBuildDialogComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                templateUrl: './development.build.dialog.html'
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"]]
            }] }]; }, null); })();
class AddDialogData {
}
class DevelopmentAddDialogComponent {
    constructor(data) {
        this.data = data;
        this.showSpinner = false;
        this.ad = data.addDialogData;
    }
    enterOnInput(charCode) {
        if (charCode === 13) {
            if (this.ad.projectName.length > 5) {
                this.onClickAddAngularProject();
            }
        }
    }
    onClickAddAngularProject() {
        this.ad.projectName = this.ad.projectName.charAt(0).toLowerCase() + this.ad.projectName.slice(1);
        if (this.ad.bc.vsProject.developerSettings.angularProjects.find(project => project.name === this.ad.projectName)) {
            this.ad.ac.toastrError('A project with that name already exists! Please choose a unique project name.');
            return;
        }
        this.showSpinner = true;
        this.ad.bc.angularProject = new ngx_modeling__WEBPACK_IMPORTED_MODULE_5__["AngularProject"]();
        this.ad.bc.angularProject.name = this.ad.projectName;
        this.ad.bc.addProject(() => {
            this.ad.ac.toastrSuccess('Completed the add successfully!');
            this.ad.matDialogRef.close();
        }, (errorMessage) => {
            this.ad.ac.toastrError(errorMessage);
        }, () => {
            this.showSpinner = false;
        });
    }
}
DevelopmentAddDialogComponent.ɵfac = function DevelopmentAddDialogComponent_Factory(t) { return new (t || DevelopmentAddDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])); };
DevelopmentAddDialogComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DevelopmentAddDialogComponent, selectors: [["ng-component"]], decls: 10, vars: 6, consts: [["mat-dialog-title", "", 2, "margin-bottom", "5px", "cursor", "default"], ["mat-dialog-content", "", 2, "padding-left", "40px", "padding-top", "20px"], ["type", "text", "matInput", "", "placeholder", "Enter Angular Project Name (6+ chars)", 2, "width", "325px", "font-size", "18px", 3, "spellcheck", "ngModel", "keydown", "ngModelChange"], [2, "float", "right"], ["style", "margin-right: 150px; ", 3, "diameter", 4, "ngIf"], ["mat-fab", "", 2, "min-width", "35px", "top", "5px", 3, "disabled", "click"], ["mat-fab", "", 2, "min-width", "35px", "top", "5px", "margin", "5px", 3, "mat-dialog-close"], [2, "margin-right", "150px", 3, "diameter"]], template: function DevelopmentAddDialogComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h1", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("keydown", function DevelopmentAddDialogComponent_Template_input_keydown_3_listener($event) { ctx.enterOnInput($event.keyCode); return ctx.ad.bc.filterProjectNameChar($event.keyCode); })("ngModelChange", function DevelopmentAddDialogComponent_Template_input_ngModelChange_3_listener($event) { return ctx.ad.projectName = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-dialog-actions", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, DevelopmentAddDialogComponent_mat_spinner_5_Template, 1, 1, "mat-spinner", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DevelopmentAddDialogComponent_Template_button_click_6_listener() { return ctx.onClickAddAngularProject(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Add");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Cancel");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.ad.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("spellcheck", false)("ngModel", ctx.ad.projectName);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.showSpinner);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx.ad.projectName.length < 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("mat-dialog-close", true);
    } }, directives: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogTitle"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogContent"], _angular_material_input__WEBPACK_IMPORTED_MODULE_7__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgModel"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogActions"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgIf"], _angular_material_button__WEBPACK_IMPORTED_MODULE_6__["MatButton"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogClose"], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_10__["MatSpinner"]], encapsulation: 2 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DevelopmentAddDialogComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                templateUrl: './development.add.dialog.html'
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"]]
            }] }]; }, null); })();
class RemoveDialogData {
}
class DevelopmentRemoveDialogComponent {
    constructor(data) {
        this.data = data;
        this.removeDialogData = data.removeDialogData;
    }
    ngAfterViewInit() {
        // making the cancel button the default
        setTimeout(() => {
            const cancelButton = document.querySelector('.cancel-button');
            cancelButton.focus();
        }, 500);
    }
    onClickYes() {
        this.removeDialogData.bc.removeProject(() => {
            this.removeDialogData.ac.toastrSuccess('Completed the remove successfully!');
            this.removeDialogData.matDialogRef.close();
        }, (errorMessage) => {
            this.removeDialogData.ac.toastrError(errorMessage);
        });
    }
}
DevelopmentRemoveDialogComponent.ɵfac = function DevelopmentRemoveDialogComponent_Factory(t) { return new (t || DevelopmentRemoveDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])); };
DevelopmentRemoveDialogComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DevelopmentRemoveDialogComponent, selectors: [["ng-component"]], decls: 9, vars: 3, consts: [["mat-dialog-title", "", 2, "margin-bottom", "5px", "cursor", "default"], [2, "font-family", "Arial", "font-size", "16px"], [2, "float", "right"], ["mat-fab", "", 2, "min-width", "35px", "top", "5px", 3, "click"], ["mat-fab", "", 1, "cancel-button", 2, "min-width", "35px", "top", "5px", "margin", "10px", 3, "mat-dialog-close"]], template: function DevelopmentRemoveDialogComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h1", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-dialog-actions", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DevelopmentRemoveDialogComponent_Template_button_click_5_listener() { return ctx.onClickYes(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Yes");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Cancel");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.removeDialogData.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.removeDialogData.message, "\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("mat-dialog-close", true);
    } }, directives: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogTitle"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogActions"], _angular_material_button__WEBPACK_IMPORTED_MODULE_6__["MatButton"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogClose"]], encapsulation: 2 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DevelopmentRemoveDialogComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                templateUrl: './development.remove.dialog.html'
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"]]
            }] }]; }, null); })();
class DevelopmentComponent {
    constructor(bc, ac, dialog, es) {
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
    getBuildTypes() {
        return Object.keys(ngx_modeling__WEBPACK_IMPORTED_MODULE_5__["BuildTypes"]).filter(x => isNaN(Number(x)));
    }
    ngOnInit() {
        this.ac.waitUntilInitialized(() => {
            setTimeout(() => {
                this.getBuildConfig();
            }, 0);
        });
    }
    onChangeTab(selectedIndex) {
        if (selectedIndex === 2) {
            this.getLogEntries();
        }
    }
    getBuildConfig() {
        this.bc.getBuildConfig(() => {
            this.isViewVisible = true;
        }, (errorMessage) => {
            this.isViewVisible = true;
        });
    }
    // project management
    onClickDebugRelease(vsProject) {
        vsProject.developerSettings.executeDist = true;
    }
    willExecuteProject(angularProject) {
        if (this.bc.vsProject.developerSettings.serveApp === angularProject.name && !this.bc.vsProject.developerSettings.executeDist) {
            return true;
        }
        else {
            return false;
        }
    }
    angularProjectSelected(vsProject, angularProject) {
        if (vsProject.developerSettings.serveApp === angularProject.name) {
            return true;
        }
        else {
            return false;
        }
    }
    onClickReleaseProject(angularProject) {
        this.bc.vsProject.developerSettings.serveApp = angularProject.name;
    }
    onClickDebugEnabled(angularProject) {
        this.bc.vsProject.developerSettings.executeDist = false;
        this.bc.vsProject.developerSettings.serveApp = angularProject.name;
    }
    saveChanges() {
        setTimeout(() => {
            if (this.savingChanges) {
                return;
            }
            this.savingChanges = true;
            this.bc.saveVisualProject(() => {
                this.savingChanges = false;
            }, (errorMessage) => {
                this.ac.toastrError(errorMessage);
                this.savingChanges = false;
            });
        }, 0);
    }
    willExecuteRelease(vsProject) {
        if (vsProject.developerSettings.executeDist) {
            return 'checked';
        }
        else {
            return '';
        }
    }
    onClickBuild() {
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
        this.bc.buildAngularProjects((buildVersion) => {
            this.buildDialogData.closeDisabled = false;
            if (buildVersion) {
                this.buildDialogData.closeDisabled = false;
            }
            this.ac.toastrSuccess('Successful build!');
        }, () => {
            this.ac.toastrError('Error while building: ');
            this.buildDialogData.closeDisabled = false;
        });
    }
    onClickAdd() {
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
    }
    onClickRemove(vsProject, angularProject) {
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
    }
    // State Management
    onClickSave() {
        this.es.saveActionsQueue(successMessage => {
            this.ac.toastrInfo(successMessage, -1);
        }, (errorMessage) => {
            this.ac.toastrError(errorMessage);
        });
    }
    onClickLoad() {
        this.es.loadActionsQueue((textMessage) => {
            this.ac.toastrInfo(textMessage, -1);
        }, (errorMessage) => {
            this.ac.toastrError(errorMessage);
        }, 'actionsQueue003.json');
    }
    // Application Exceptions
    getLogEntries() {
        this.bc.getLogEntries(() => {
            this.isViewVisible = true;
        }, (errorMessage) => {
            this.isViewVisible = true;
        });
    }
    getEventTypeColor(entryType) {
        switch (entryType) {
            case 0: return 'yellow';
            case 1: return 'red';
            case 2: return 'orange';
            case 3: return 'yellow';
            case 4: return 'blue';
        }
        return 'orange';
    }
    getIconName(entryType) {
        switch (entryType) {
            case 0: return 'missing';
            case 1: return 'error';
            case 2: return 'warning';
            case 3: return 'missing';
            case 4: return 'error_outline';
        }
        return 'orange';
    }
    getEventTypeText(entryType) {
        switch (entryType) {
            case 0: return 'Missing';
            case 1: return 'Error';
            case 2: return 'Warning';
            case 3: return 'Missing';
            case 4: return 'Information';
        }
        return 'orange';
    }
    onClickThrowException() {
        this.bc.throwException(() => {
        }, (errorMessage) => {
            this.getLogEntries();
            this.ac.toastrError(errorMessage);
        });
    }
    onClickLogEntry() {
        this.bc.logEntry(() => {
            this.getLogEntries();
        }, (errorMessage) => {
            this.ac.toastrError(errorMessage);
        });
    }
    // Metrics
    onClickClearResponseTime() {
        this.ac.clearResponseTime();
    }
}
DevelopmentComponent.ɵfac = function DevelopmentComponent_Factory(t) { return new (t || DevelopmentComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_common_buildConfig__WEBPACK_IMPORTED_MODULE_3__["BuildConfig"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_common_appConfig__WEBPACK_IMPORTED_MODULE_2__["AppConfig"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialog"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_common_entityService__WEBPACK_IMPORTED_MODULE_4__["EntityService"])); };
DevelopmentComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DevelopmentComponent, selectors: [["ng-component"]], decls: 72, vars: 15, consts: [[3, "isViewVisible"], ["mat-align-tabs", "center", "color", "primary", "dynamicHeight", "", 3, "selectedIndex", "selectedIndexChange"], ["label", "Configure"], [1, "flex-container"], [1, "flex-item", "app-text-primary"], [1, "development-feature-title"], [2, "width", "100%"], [2, "width", "40%", "text-align", "left"], ["style", "width: 30%; text-align: center;   font-size: 20px;", 4, "ngIf"], [2, "width", "30%", "text-align", "right"], ["mat-fab", "", "color", "accent", "title", "Build Projects (enabled for build)", 3, "click"], [1, "development-feature-git"], [2, "width", "35%"], [2, "width", "30%", "font-size", "20px"], [2, "width", "35%", "font-size", "20px"], [2, "width", "39%"], [2, "width", "30%", "font-size", "20px", "text-align", "left"], [3, "ngModel", "ngModelChange", "change"], [2, "width", "31%", "font-size", "20px", "text-align", "left"], [1, "development-feature-projects"], [2, "width", "38%"], [2, "width", "15%", "font-size", "20px"], [2, "width", "17%", "font-size", "20px", "text-align", "right"], ["name", "startupProjects"], [2, "border-radius", "10px", "font-size", "20px", "font-family", "px-neuropol", "width", "100%", "height", "50px", "margin-top", "20px", "margin-bottom", "20px"], [2, "width", "230px", "padding-left", "20px"], ["title", "Startup from: dist/"], ["name", "startupProjects", 3, "checked", "click"], [2, "display", "inline-block", "vertical-align", "top", "margin-top", "2px", "margin-left", "5px", "font-family", "px-neuropol"], ["name", "releaseProjects"], ["style", "width: 140px; padding-top: 8px; ", 4, "ngFor", "ngForOf"], [2, "width", "20%", "font-size", "20px", "text-align", "right"], [4, "ngFor", "ngForOf"], ["mat-fab", "", "color", "accent", "title", "Add a New Project", 3, "click"], ["label", "State & Action", 4, "ngIf"], ["label", "Events", 4, "ngIf"], ["label", "Metrics", 4, "ngIf"], [2, "width", "30%", "text-align", "center", "font-size", "20px"], [2, "width", "140px", "padding-top", "8px"], [4, "ngIf"], [3, "title"], ["name", "releaseProjects", 3, "value", "checked", "click"], [2, "padding-bottom", "18px"], [2, "border-radius", "10px", "font-size", "20px", "font-family", "px-neuropol", "width", "100%", "height", "50px"], [2, "width", "37%", "padding-left", "20px"], ["name", "startupProjects", 3, "value", "checked", "click"], [2, "display", "inline-block", "vertical-align", "top", "margin-top", "2px", "margin-left", "5px", "font-family", "px-neuropol", 3, "click"], [2, "width", "15%"], [3, "ngModel", "ngModelChange", "click"], [2, "width", "10%"], [3, "disabled", "ngModel", "ngModelChange", "click"], [2, "width", "20%"], [1, "build-type", 3, "title"], [1, "development-build-type-select"], [3, "disabled", "ngModel", "ngModelChange", "selectionChange"], [3, "value", 4, "ngFor", "ngForOf"], [2, "width", "18%", "text-align", "right", "padding-right", "20px"], ["color", "primary", "style", "cursor: pointer; margin-top: 0; ", 3, "title", "click", 4, "ngIf"], [3, "value"], ["color", "primary", 2, "cursor", "pointer", "margin-top", "0", 3, "title", "click"], ["label", "State & Action"], [1, "development-action-title", 2, "padding-top", "15px"], [1, "development-feature-text"], ["mat-fab", "", 3, "click"], ["label", "Events"], [1, "development-exceptions-title", 2, "padding-top", "15px"], [1, "development-exceptions-text"], ["mat-fab", "", 2, "margin-left", "5px", 3, "click"], ["type", "text", "matInput", "", "placeholder", "Enter Exception", 2, "width", "200px", "font-size", "18px", "margin-left", "10px", 3, "spellcheck", "ngModel", "ngModelChange"], ["type", "text", "matInput", "", "placeholder", "Enter Message", 2, "width", "200px", "font-size", "18px", "margin-left", "10px", 3, "spellcheck", "ngModel", "ngModelChange"], ["name", "messageType", 2, "padding-left", "50px", 3, "ngModel", "ngModelChange"], ["name", "messageType", 3, "value"], [2, "display", "inline-block", "vertical-align", "middle", "margin-top", "5px", "margin-left", "2px", "font-family", "px-neuropol", "color", "rgba(255, 87, 34, 1)"], ["name", "messageType", 2, "margin-left", "20px", 3, "value"], [1, "development-event-list"], [2, "color", "#ff5722", "font-family", "Neuropol"], [2, "width", "300px", "padding-left", "20px"], [2, "width", "300px", "padding-left", "0"], ["multi", "true"], ["style", "background-color: whitesmoke; ", 4, "ngFor", "ngForOf"], [2, "background-color", "whitesmoke"], [2, "color", "#ff5722", "font-family", "Neuropol", "width", "100%"], [2, "width", "300px"], [1, "toolbar-icon-button"], [2, "text-align", "left"], ["label", "Metrics"], [1, "analytics-feature-title"], [2, "width", "40%", "padding-left", "30px"], [2, "width", "40%", "text-align", "right"], [2, "width", "10%", "font-family", "Arial"], [2, "width", "10%", "text-align", "right", "padding-right", "5px"], ["mat-mini-fab", "", "color", "accent", 3, "disabled", "click"], ["style", "margin-top: 10px; ", 4, "ngFor", "ngForOf"], [2, "margin-top", "10px"]], template: function DevelopmentComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "view-fader", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-tab-group", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("selectedIndexChange", function DevelopmentComponent_Template_mat_tab_group_selectedIndexChange_1_listener($event) { return ctx.onChangeTab($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-tab", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "table", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "td", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, DevelopmentComponent_td_10_Template, 2, 1, "td", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, DevelopmentComponent_td_11_Template, 2, 0, "td", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "td", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DevelopmentComponent_Template_button_click_13_listener() { return ctx.onClickBuild(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Build");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "table", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "td", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "Git Hooks:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "td", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "Pre-Commit");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "td", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "Pre-Push");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "table", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](26, "td", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "td", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "mat-slide-toggle", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function DevelopmentComponent_Template_mat_slide_toggle_ngModelChange_28_listener($event) { return ctx.bc.vsProject.developerSettings.buildHook = $event; })("change", function DevelopmentComponent_Template_mat_slide_toggle_change_28_listener() { return ctx.saveChanges(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "td", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "mat-slide-toggle", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function DevelopmentComponent_Template_mat_slide_toggle_ngModelChange_30_listener($event) { return ctx.bc.vsProject.developerSettings.importHook = $event; })("change", function DevelopmentComponent_Template_mat_slide_toggle_change_30_listener() { return ctx.saveChanges(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "table", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "td", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35, "Startup Project:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "td", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](37, "\u00A0");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "td", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](39, "\u00A0");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "td", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](41, "\u00A0");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "td", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](43, "\u00A0");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "mat-radio-group", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "table", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "td", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "mat-radio-button", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DevelopmentComponent_Template_mat_radio_button_click_49_listener() { ctx.onClickDebugRelease(ctx.bc.vsProject); return ctx.saveChanges(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](51, "release");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "mat-radio-group", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](53, DevelopmentComponent_td_53_Template, 2, 1, "td", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "table", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "td", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](57, "\u00A0");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "td", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](59, "Build");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "td", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](61, "Prod");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "td", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](63, "Type");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "td", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](65, "Delete");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](66, DevelopmentComponent_div_66_Template, 22, 16, "div", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](67, "button", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DevelopmentComponent_Template_button_click_67_listener() { return ctx.onClickAdd(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](68, "Add");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](69, DevelopmentComponent_mat_tab_69_Template, 12, 0, "mat-tab", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](70, DevelopmentComponent_mat_tab_70_Template, 38, 9, "mat-tab", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](71, DevelopmentComponent_mat_tab_71_Template, 17, 3, "mat-tab", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("isViewVisible", ctx.isViewVisible);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("selectedIndex", ctx.selectedIndex);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.bc.vsProject.name);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.ac.appSettings.buildVersion !== "xx.xx.xx");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.ac.appSettings.buildVersion === "xx.xx.xx");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.bc.vsProject.developerSettings.buildHook);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.bc.vsProject.developerSettings.importHook);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("background-color", ctx.willExecuteRelease(ctx.bc.vsProject) ? "white" : "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("checked", ctx.bc.vsProject.developerSettings.executeDist);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.bc.vsProject.developerSettings.angularProjects);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.bc.vsProject.developerSettings.angularProjects);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.ac.settingsAvailable);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.ac.settingsAvailable);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.ac.settingsAvailable);
    } }, directives: [ngx_motion__WEBPACK_IMPORTED_MODULE_11__["ɵa"], _angular_material_tabs__WEBPACK_IMPORTED_MODULE_12__["MatTabGroup"], _angular_material_tabs__WEBPACK_IMPORTED_MODULE_12__["MatTab"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgIf"], _angular_material_button__WEBPACK_IMPORTED_MODULE_6__["MatButton"], _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_13__["MatSlideToggle"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgModel"], _angular_material_radio__WEBPACK_IMPORTED_MODULE_14__["MatRadioGroup"], _angular_material_radio__WEBPACK_IMPORTED_MODULE_14__["MatRadioButton"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgForOf"], _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_15__["MatCheckbox"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_16__["MatFormField"], _angular_material_select__WEBPACK_IMPORTED_MODULE_17__["MatSelect"], _angular_material_core__WEBPACK_IMPORTED_MODULE_18__["MatOption"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_19__["MatIcon"], _angular_material_input__WEBPACK_IMPORTED_MODULE_7__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["DefaultValueAccessor"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_20__["MatAccordion"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_20__["MatExpansionPanel"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_20__["MatExpansionPanelHeader"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_20__["MatExpansionPanelTitle"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_20__["MatExpansionPanelDescription"], _angular_material_card__WEBPACK_IMPORTED_MODULE_21__["MatCard"]], encapsulation: 2 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DevelopmentComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                templateUrl: './development.component.html'
            }]
    }], function () { return [{ type: _common_buildConfig__WEBPACK_IMPORTED_MODULE_3__["BuildConfig"] }, { type: _common_appConfig__WEBPACK_IMPORTED_MODULE_2__["AppConfig"] }, { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialog"] }, { type: _common_entityService__WEBPACK_IMPORTED_MODULE_4__["EntityService"] }]; }, null); })();
class DevelopmentHelpDialogComponent {
    constructor(data) {
        this.data = data;
        // data contains values passed by the router
    }
}
DevelopmentHelpDialogComponent.ɵfac = function DevelopmentHelpDialogComponent_Factory(t) { return new (t || DevelopmentHelpDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])); };
DevelopmentHelpDialogComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DevelopmentHelpDialogComponent, selectors: [["ng-component"]], decls: 2, vars: 1, template: function DevelopmentHelpDialogComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "base-help-dialog");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" Here is where you will find help with the: ", ctx.data.subtitle, "\n");
    } }, directives: [_base_help_dialog__WEBPACK_IMPORTED_MODULE_22__["BaseHelpDialogComponent"]], encapsulation: 2 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DevelopmentHelpDialogComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                templateUrl: './development.component.help.html'
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"]]
            }] }]; }, null); })();


/***/ }),

/***/ "./features/features.component.ts":
/*!****************************************!*\
  !*** ./features/features.component.ts ***!
  \****************************************/
/*! exports provided: FeaturesComponent, FeaturesHelpDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeaturesComponent", function() { return FeaturesComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeaturesHelpDialogComponent", function() { return FeaturesHelpDialogComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/dialog.js");
/* harmony import */ var _common_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/appConfig */ "./common/appConfig.ts");
/* harmony import */ var ngx_motion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-motion */ "./node_modules/ngx-motion/__ivy_ngcc__/fesm2015/ngx-motion.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/card.js");
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/expansion */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/expansion.js");
/* harmony import */ var _base_help_dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./base.help.dialog */ "./features/base.help.dialog.ts");


// services







class FeaturesComponent {
    constructor(ac) {
        this.ac = ac;
        this.isViewVisible = true;
        this.dependencies = Array();
    }
    ngOnInit() {
        this.ac.waitUntilInitialized(() => {
            this.isViewVisible = true;
        });
    }
}
FeaturesComponent.ɵfac = function FeaturesComponent_Factory(t) { return new (t || FeaturesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_common_appConfig__WEBPACK_IMPORTED_MODULE_2__["AppConfig"])); };
FeaturesComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: FeaturesComponent, selectors: [["ng-component"]], decls: 313, vars: 11, consts: [[3, "isViewVisible"], [2, "margin-top", "10px", "text-align", "center", "font-family", "px-neuropol", "font-size", "24px"], ["multi", "true"], [2, "width", "200px", "text-align", "right", "font-family", "px-neuropol", "color", "orangered"], [2, "width", "20px"], [2, "width", "200px", "font-family", "px-neuropol", "color", "orangered"], [2, "text-align", "right", "font-family", "px-neuropol", "color", "orangered"], [2, "font-family", "px-neuropol", "color", "orangered"], [2, "text-align", "right", "color", "darkgreen"], [2, "color", "darkgreen"], ["href", "https://nodejs.org/en", "target", "_blank"], ["href", "http://blog.npmjs.org/post/85484771375/how-to-install-npm", "target", "_blank"]], template: function FeaturesComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "view-fader", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-card", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Features upon Features");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-accordion", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-expansion-panel");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "mat-expansion-panel-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "mat-panel-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, " Overview ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "mat-panel-description");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, " This document details the features of the Angular.Net Studio used in the course titled \"Angular and ASP.Net Core Integration\". By using the techniques described in the course, you are already further ahead of where you would be by starting from scratch. In fact, in terms of a projects lifecycle, the techniques used in the AngularNetCore Starter App will put you months ahead of schedule. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, " Unlike many developer, I spend much time analyzing the workflow and looking for shortcuts to developing an application. The key is automation. Some upfront time, researching and analyzing the workflow, will save you months of development time later, with all your projects. And that is what I can share with you. I've spent months, not only looking for shortcuts to make the development quicker, but also to enhance the performance, and make the application easier to maintain. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, " As a Microsoft developer, you have become used to not having the need to drop down to the command line to perform an operation. By automating the development process, you will become less fatigued, and be able to spend your attention doing development. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](16, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, " The target audience for the course, is the ASP.Net Core Developer that would like to use Angular, as the front-end technology. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](19, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "table");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "td", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, "ASP.Net Core:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "td", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, "\u00A0");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "td", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "td", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, "Angular:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, "\u00A0");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "td", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "td", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, "TypeScript:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40, "\u00A0");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "td", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "td", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](45, "NodeJs:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](47, "\u00A0");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "td", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](49);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "td", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](52, "V8 Engine:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](54, "\u00A0");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "td", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](56);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "td", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](59, "RxJs:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](61, "\u00A0");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "td", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](63);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "td", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](66, "Moment:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](67, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](68, "\u00A0");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](69, "td", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](70);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](71, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](72, "td", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](73, "CoreJs:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](74, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](75, "\u00A0");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](76, "td", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](77);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](78, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](79, "td", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](80, "ZoneJs:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](81, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](82, "\u00A0");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](83, "td", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](84);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](85, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](86, "td", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](87, "GoogleMaps:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](88, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](89, "\u00A0");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](90, "td", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](91);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](92, "mat-expansion-panel");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](93, "mat-expansion-panel-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](94, "mat-panel-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](95, " New Features ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](96, "mat-panel-description");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](97, " The Angular.Net Studio has many new features! This version embraces the Angular CLI and the Dotnet CLI, which is the main difference from previous versions. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](98, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](99, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](100, " You can also configure your Angular projects build types, build for production, and PWA support directly from within the Angular.Net Studio Application or by using the Angular.Net Studio Browser Extension. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](101, "mat-expansion-panel");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](102, "mat-expansion-panel-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](103, "mat-panel-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](104, " Prerequisites and References ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](105, "mat-panel-description");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](106, " In order to use the Angular.Net Studio you will need to download and install NodeJS. By installing NodeJS you will automatically install NPM, the Node Package Manage. Here are some links: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](107, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](108, "a", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](109, "NodeJs");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](110, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](111, "a", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](112, "How to Install");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](113, "mat-expansion-panel");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](114, "mat-expansion-panel-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](115, "mat-panel-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](116, " Compatibility ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](117, "mat-panel-description");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](118, " The most compatible web applications will perform with all modern browsers. To ensure that, the feature-set supports all browsers that support ECMAScript 5 (ES5). ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](119, "mat-expansion-panel");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](120, "mat-expansion-panel-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](121, "mat-panel-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](122, " Project Template ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](123, "mat-panel-description");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](124, " When creating an ASP.Net Core project, you are given 2 choices. The project template I have chosen is the ASP.Net Core Web Application with the .Net Core. This project template has the benefit of running on Linux, macOS as well as Windows using .Net Core. Then you have 2 more choses for what type of middleware, WebAPI or MVC. Since we have no need for MVC we will chose the WebAPI. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](125, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](126, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](127, " By the way, since many Microsoft developer are coming from a background of MVC, you should know that Angular and MVC are mutually exclusive. Soon you will understand the full benefits of allowing the Angular framework to handle the UI. Not only is it faster and easier to maintain, but it also embraces the web technologies. Sorry to say it, but you are going to have to understand web technologies to be a good, modern web developer. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](128, "mat-expansion-panel");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](129, "mat-expansion-panel-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](130, "mat-panel-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](131, " 3rd Party Libraries ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](132, "mat-panel-description");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](133, " There are some 3rd party libraries already integrated into the Angular.Net Studio, but easy to remove if there is no need for them. Also, there is no need for SignalR, or jQuery or any other dependency libraries. Each library is self-contained. Following is a list of integrated libraries: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](134, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](135, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](136, " Angular Material ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](137, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](138, " rxjs ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](139, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](140, " moment ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](141, "mat-expansion-panel");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](142, "mat-expansion-panel-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](143, "mat-panel-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](144, " Abstracting Debug from Release ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](145, "mat-panel-description");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](146, " As an ASP.Net Core developer, you may not understand the significant difference between running the application in the Debug mode, verses the Release mode, in terms of JavaScript performance. Well, guess what? There is a big difference! Once you realize that the sooner you will be productive. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](147, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](148, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](149, " Visual Studio and ASP.Net Core make it easy to determine the development configuration mode that you are in and allow you to configure the outputting results according to the configuration mode. This is all handled in the Startup.cs file. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](150, "mat-expansion-panel");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](151, "mat-expansion-panel-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](152, "mat-panel-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](153, " Using NodeJS to do the Heavy Lifting ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](154, "mat-panel-description");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](155, " I would have never guessed that I was going to need NodeJS and Gulp to be an efficient application developer. Now I truly can't live without those 2 technologies. In case you didn't know, NPM is a repository for storing Node packages and comes with NodeJS. And Gulp is a JavaScript task runner that lets you automate tasks. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](156, "mat-expansion-panel");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](157, "mat-expansion-panel-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](158, "mat-panel-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](159, " Automation to Streamline the Workflow ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](160, "mat-panel-description");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](161, " By using Gulp and the Task Runner Explorer, we can bind to these events: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](162, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](163, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](164, " 1) Before Build ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](165, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](166, " 2) After Build ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](167, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](168, " 3) Clean ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](169, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](170, " 4) Project Opens ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](171, "mat-expansion-panel");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](172, "mat-expansion-panel-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](173, "mat-panel-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](174, " Creating a Release Build ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](175, "mat-panel-description");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](176, " The Angular.Net Studio has many features that can make your application perform faster and make it easier to maintain. Creating a Release (Production) build does many things in one process. Some are performed by the Angular-CLI, and others are performed by a build hook. Following is a list of all the benefits of creating a release bundle using the routines provided by the AngularNetCore Starter App Release Build. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](177, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](178, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](179, " \u00A0\u00A01) Separates the framework from the application ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](180, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](181, " \u00A0\u00A02) Concatenate and bundle the framework with the 3rd party libraries ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](182, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](183, " \u00A0\u00A03) Minify the framework bundle ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](184, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](185, " \u00A0\u00A04) Embedding the images, fonts, and icons into the html ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](186, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](187, " \u00A0\u00A05) Squash the html and css into the components ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](188, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](189, " \u00A0\u00A06) Concatenate and bundle the application ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](190, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](191, " \u00A0\u00A07) Minify the application bundle ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](192, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](193, " \u00A0\u00A08) Enabling the production mode ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](194, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](195, " \u00A0\u00A09) Creating an application manifest ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](196, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](197, " 10) Adding Cache-Busting logic ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](198, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](199, " 11) Bumping up the application version number ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](200, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](201, " 12) Adding the Service Worker logic for offline performance ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](202, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](203, " 14) Updating the index.html with new versions ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](204, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](205, "mat-expansion-panel");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](206, "mat-expansion-panel-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](207, "mat-panel-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](208, " Creating the Application Manifest ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](209, "mat-panel-description");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](210, " I've given a lot of attention to the web technologies that enable applications to work off-line. This is like having a web app that performs like a desktop app. The Angular.Net Studio can perform most function while being complete disconnected from the Internet. This is currently implemented in the release build process and can be completely automated. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](211, "mat-expansion-panel");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](212, "mat-expansion-panel-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](213, "mat-panel-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](214, " Debugging NodeJS Tasks ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](215, "mat-panel-description");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](216, " Developing and debugging NodeJS tasks can be an interesting challenge. Most developers will struggle with this for months.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](217, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](218, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](219, " When I create gulp tasks I want to be able to:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](220, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](221, " 1)\tSet breakpoints");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](222, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](223, " 2)\tStep into my Node task");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](224, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](225, " 3)\tDo searches for references");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](226, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](227, " 4)\tGo to definitions");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](228, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](229, " 5)\tHave full Intellisense");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](230, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](231, " 6)\tBuild with TypeScript classes");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](232, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](233, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](234, " The ProjectDebug Visual Studio project allow you to do all of these things while debugging your Node tasks. All you need to do is start the project (ProjectDebug), then set a break point in the tasklist.js files execute method, then double-click on one of the task in the Task Runner Explorer. Make sure that you select the ProjectDebug in the Task Runner Explorer before double-clicking the task. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](235, "mat-expansion-panel");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](236, "mat-expansion-panel-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](237, "mat-panel-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](238, " Automatically Versioning the Application ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](239, "mat-panel-description");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](240, " By using NodeJS, it possible bump up the version number. This can be automated by binding it a build event. During the course I will demonstrate the binding, and the technique for incrementing the version number using NodeJS. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](241, "mat-expansion-panel");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](242, "mat-expansion-panel-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](243, "mat-panel-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](244, " Exception Handling ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](245, "mat-panel-description");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](246, " ASP.Net Core applications need a different method for returning exception data back to the Angular service. The Angular.Net Studio implements a technique to return useful exception information back to the client. ASP .Net Core has methods for returning exception Information, that can used for showing the exception information. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](247, "mat-expansion-panel");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](248, "mat-expansion-panel-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](249, "mat-panel-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](250, " Passing Parameters to the Server ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](251, "mat-panel-description");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](252, " ASP.Net Core applications use a different method for abstracting the application parameter. These type of parameter, such as connection string, used to be stored in the web.config. Now they are stored in the appsettings.json. This is also a good place to store the application version number. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](253, "mat-expansion-panel");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](254, "mat-expansion-panel-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](255, "mat-panel-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](256, " Saving and Displaying Performance Analytics ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](257, "mat-panel-description");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](258, " The Angular.Net Studio displays performance analytics obtained from Performance Markers that are inserted into the code. During the course we are going to use Chrome Dev Tools to display and analyze timing information. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](259, "mat-expansion-panel");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](260, "mat-expansion-panel-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](261, "mat-panel-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](262, " Saving the Navigation to the Last Feature ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](263, "mat-panel-description");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](264, " This may not seem like a big deal, but sometimes it is best to pick-up where you left off using an application. So by saving the last feature that was used before exiting, it's possible to return to that feature when the application is launched again. I don't intend on explaining this feature in the course, but you can see by examining the source that the technology used is Local Storage. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](265, "mat-expansion-panel");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](266, "mat-expansion-panel-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](267, "mat-panel-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](268, " Publishing to Server Solution ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](269, "mat-panel-description");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](270, " The Angular.Net Studio comes with a separate Solution for publishing to the server. The idea is that it is not necessary to publish unbundled script files to the server. This alternate Solution only includes the folders that are necessary for the server to deliver the application. With this Solution, the time it takes to publish to the server is reduced to 5 percent. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](271, "mat-expansion-panel");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](272, "mat-expansion-panel-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](273, "mat-panel-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](274, " Full-Features and Mobile Versions ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](275, "mat-panel-description");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](276, " By having different Application Build Configurations, it is possible to create a full-feature version, and a mobile version of the application. By using the same codebase, you will have the ability to reuse code for 2 different Angular projects. But it doesn't stop there! You can have as many Angular builds as necessary in one Visual Studio project. This is a great way to break up a large-scale Angular project into small projects. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](277, "mat-expansion-panel");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](278, "mat-expansion-panel-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](279, "mat-panel-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](280, " Real-Time Messaging ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](281, "mat-panel-description");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](282, " Many developers struggle with the concept of real-time data, and how to accomplish this feat with a web application. Here is a scenario. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](283, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](284, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](285, " Let's say that you need to be notified when an event happens within the system. Maybe another user, within the system, makes a change to the database. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](286, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](287, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](288, " The Angular.Net Studio comes with a solution to that problem, and is demonstrated in the Notification feature. This feature allows you to send messages to other users. The users that want to receive your messages will simply subscribe to your channel. Then, they will receive the notifications in real-time. What this means is that it is not necessary to refresh the browser to receive the latest notification. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](289, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](290, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](291, " The important point to make is that the notification is not limited to text. The notification can be simple text, an object, or a complex collection of objects. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](292, "mat-expansion-panel");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](293, "mat-expansion-panel-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](294, "mat-panel-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](295, " Voice Activated Commands ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](296, "mat-panel-description");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](297, " Now, here is the feature that puts it all together. With the aid of some of the most modern web technologies, it is possible to activate features of the application, by simply using your voice. This opens up so many, many, new possibilities. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](298, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](299, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](300, " The Notification component, has implemented voice activated commands. What this means is just by using your voice, it is possible to emulate or replace mouse, and keyboard commands. Look Mom! No hands! ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](301, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](302, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](303, " Hopefully you will understand the implications, and possibilities. In one of my \"follow-up\" courses, I plan to demonstrate a fully functional voice activates help system. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](304, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](305, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](306, " Imagine this: Computer... tell me about... ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](307, "mat-expansion-panel");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](308, "mat-expansion-panel-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](309, "mat-panel-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](310, " Already Ready ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](311, "mat-panel-description");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](312, " The Angular.Net Studio comes with the scaffolding for you to immediately begin implementing your own custom feature. The feature is titled \"Already Ready\". ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("isViewVisible", ctx.isViewVisible);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.ac.appSettings.aspNetCoreVersion);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.ac.appSettings.apiVersions.angular);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.ac.appSettings.apiVersions.typeScript);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.ac.appSettings.apiVersions.nodeJs);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.ac.appSettings.apiVersions.v8Engine);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.ac.appSettings.apiVersions.rxJs);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.ac.appSettings.apiVersions.moment);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.ac.appSettings.apiVersions.coreJs);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.ac.appSettings.apiVersions.zoneJs);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.ac.appSettings.apiVersions.googleMaps);
    } }, directives: [ngx_motion__WEBPACK_IMPORTED_MODULE_3__["ɵa"], _angular_material_card__WEBPACK_IMPORTED_MODULE_4__["MatCard"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_5__["MatAccordion"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_5__["MatExpansionPanel"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_5__["MatExpansionPanelHeader"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_5__["MatExpansionPanelTitle"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_5__["MatExpansionPanelDescription"]], encapsulation: 2 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FeaturesComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                // #region template
                templateUrl: './features.component.html'
                // #endregion
            }]
    }], function () { return [{ type: _common_appConfig__WEBPACK_IMPORTED_MODULE_2__["AppConfig"] }]; }, null); })();
class FeaturesHelpDialogComponent {
    constructor(data) {
        this.data = data;
        // data contains values passed by the router
    }
}
FeaturesHelpDialogComponent.ɵfac = function FeaturesHelpDialogComponent_Factory(t) { return new (t || FeaturesHelpDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])); };
FeaturesHelpDialogComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: FeaturesHelpDialogComponent, selectors: [["ng-component"]], decls: 2, vars: 1, template: function FeaturesHelpDialogComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "base-help-dialog");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" Here is where you will find help with the: ", ctx.data.subtitle, "\n");
    } }, directives: [_base_help_dialog__WEBPACK_IMPORTED_MODULE_6__["BaseHelpDialogComponent"]], encapsulation: 2 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FeaturesHelpDialogComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                templateUrl: './features.component.help.html'
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"]]
            }] }]; }, null); })();


/***/ }),

/***/ "./features/file.transfer.dialog.component.ts":
/*!****************************************************!*\
  !*** ./features/file.transfer.dialog.component.ts ***!
  \****************************************************/
/*! exports provided: FileTransferData, FileTransferDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileTransferData", function() { return FileTransferData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileTransferDialogComponent", function() { return FileTransferDialogComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/dialog.js");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/progress-bar */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/progress-bar.js");





class FileTransferData {
    constructor() {
        this.bytesTransfered = 0;
        this.totalBytes = 0;
        this.percentComplete = 0;
        this.cancel = false;
    }
}
class FileTransferDialogComponent {
    constructor(data, dialogRef) {
        this.data = data;
        this.dialogRef = dialogRef;
    }
    cancel(data) {
        data.cancel = true;
        this.dialogRef.close();
    }
}
FileTransferDialogComponent.ɵfac = function FileTransferDialogComponent_Factory(t) { return new (t || FileTransferDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"])); };
FileTransferDialogComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: FileTransferDialogComponent, selectors: [["ng-component"]], decls: 16, vars: 7, consts: [["mat-dialog-title", ""], ["mat-dialog-content", ""], [2, "display", "inline-block"], [2, "display", "inline-block", "float", "right"], [1, "example-margin", 2, "margin-top", "15px", "left", "-10px", 3, "color", "mode", "value"], [2, "float", "right"], ["color", "primary", 1, "mat-flat-button", 2, "background", "rgba(0, 74, 123, 1)", "color", "white", 3, "click"]], template: function FileTransferDialogComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h1", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "mat-progress-bar", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "mat-dialog-actions", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function FileTransferDialogComponent_Template_button_click_14_listener() { return ctx.cancel(ctx.data); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Cancel");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.data.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Transfered: ", ctx.data.bytesTransfered, " kb");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Total: ", ctx.data.totalBytes, " kb");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", "blue")("mode", "determinate")("value", ctx.data.percentComplete);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.data.description, " ");
    } }, directives: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogTitle"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogContent"], _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_2__["MatProgressBar"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogActions"]], styles: [".example-h2[_ngcontent-%COMP%] {\n    margin: 10px;\n  }\n\n  .example-section[_ngcontent-%COMP%] {\n    display: flex;\n    align-content: center;\n    align-items: center;\n    height: 60px;\n  }\n\n  .example-margin[_ngcontent-%COMP%] {\n    margin: 0 10px;\n  }"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FileTransferDialogComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                templateUrl: './file.transfer.dialog.component.html',
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"]]
            }] }, { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"] }]; }, null); })();


/***/ }),

/***/ "./features/httpDemo.component.actions.ts":
/*!************************************************!*\
  !*** ./features/httpDemo.component.actions.ts ***!
  \************************************************/
/*! exports provided: RequestHttpDownload, ResponseHttpDownload */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestHttpDownload", function() { return RequestHttpDownload; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResponseHttpDownload", function() { return ResponseHttpDownload; });
class RequestHttpDownload {
    constructor(payload) {
        this.payload = payload;
    }
}
RequestHttpDownload.type = '[httpDemo] Request Http Download';
class ResponseHttpDownload {
    constructor(payload, samplePayload) {
        this.payload = payload;
        this.samplePayload = samplePayload;
    }
}
ResponseHttpDownload.type = '[httpDemo] Response Http Download';


/***/ }),

/***/ "./features/httpDemo.component.state.ts":
/*!**********************************************!*\
  !*** ./features/httpDemo.component.state.ts ***!
  \**********************************************/
/*! exports provided: HttpDemoStateModel, HttpDemoState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpDemoStateModel", function() { return HttpDemoStateModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpDemoState", function() { return HttpDemoState; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngxs/store */ "./node_modules/@ngxs/store/__ivy_ngcc__/fesm2015/ngxs-store.js");
/* harmony import */ var _httpDemo_component_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./httpDemo.component.actions */ "./features/httpDemo.component.actions.ts");
/* harmony import */ var _common_entityService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/entityService */ "./common/entityService.ts");







class HttpDemoStateModel {
    constructor() {
        this.requestHttpDownload = false;
    }
}
let HttpDemoState = class HttpDemoState {
    constructor(es) {
        this.es = es;
    }
    action01({ patchState }, { payload }) {
        patchState({ requestHttpDownload: payload });
    }
    action02({ patchState }, { payload, samplePayload }) {
        if (samplePayload) {
            this.es.samplePayload(payload, 'text/plain', (successMessage) => {
                patchState({ blob: payload });
            }, (errorMessage) => {
                alert(errorMessage);
            });
        }
        else {
            patchState({ blob: payload });
        }
    }
};
HttpDemoState.ɵfac = function HttpDemoState_Factory(t) { return new (t || HttpDemoState)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_common_entityService__WEBPACK_IMPORTED_MODULE_4__["EntityService"])); };
HttpDemoState.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: HttpDemoState, factory: HttpDemoState.ɵfac });
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_2__["Action"])(_httpDemo_component_actions__WEBPACK_IMPORTED_MODULE_3__["RequestHttpDownload"]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object, _httpDemo_component_actions__WEBPACK_IMPORTED_MODULE_3__["RequestHttpDownload"]]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
], HttpDemoState.prototype, "action01", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_2__["Action"])(_httpDemo_component_actions__WEBPACK_IMPORTED_MODULE_3__["ResponseHttpDownload"]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object, _httpDemo_component_actions__WEBPACK_IMPORTED_MODULE_3__["ResponseHttpDownload"]]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
], HttpDemoState.prototype, "action02", null);
HttpDemoState = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_2__["State"])({
        name: 'httpDemo',
        defaults: new HttpDemoStateModel()
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_common_entityService__WEBPACK_IMPORTED_MODULE_4__["EntityService"]])
], HttpDemoState);

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](HttpDemoState, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"]
    }], function () { return [{ type: _common_entityService__WEBPACK_IMPORTED_MODULE_4__["EntityService"] }]; }, { action01: [], action02: [] }); })();


/***/ }),

/***/ "./features/httpDemo.component.ts":
/*!****************************************!*\
  !*** ./features/httpDemo.component.ts ***!
  \****************************************/
/*! exports provided: HttpDemoComponent, HttpDemoHelpDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpDemoComponent", function() { return HttpDemoComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpDemoHelpDialogComponent", function() { return HttpDemoHelpDialogComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/dialog.js");
/* harmony import */ var _file_transfer_dialog_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./file.transfer.dialog.component */ "./features/file.transfer.dialog.component.ts");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngxs/store */ "./node_modules/@ngxs/store/__ivy_ngcc__/fesm2015/ngxs-store.js");
/* harmony import */ var _common_appConfig__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/appConfig */ "./common/appConfig.ts");
/* harmony import */ var _common_entityService__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/entityService */ "./common/entityService.ts");
/* harmony import */ var _httpDemo_component_state__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./httpDemo.component.state */ "./features/httpDemo.component.state.ts");
/* harmony import */ var _httpDemo_component_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./httpDemo.component.actions */ "./features/httpDemo.component.actions.ts");
/* harmony import */ var ngx_motion__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-motion */ "./node_modules/ngx-motion/__ivy_ngcc__/fesm2015/ngx-motion.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/button.js");
/* harmony import */ var _base_help_dialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./base.help.dialog */ "./features/base.help.dialog.ts");




// ngxs

// services












class HttpDemoComponent {
    constructor(store, ac, es, dialog) {
        this.store = store;
        this.ac = ac;
        this.es = es;
        this.dialog = dialog;
        this.isViewVisible = false;
        this.httpDemoState = new _httpDemo_component_state__WEBPACK_IMPORTED_MODULE_6__["HttpDemoStateModel"]();
        this.stateChanges();
    }
    stateChanges() {
        this.store.subscribe(state => {
            if (state.sideNav) {
                const httpDemoState = state.httpDemo;
                this.httpDemoState = httpDemoState;
                // RequestHttpDownload
                if (httpDemoState.requestHttpDownload) {
                    this.downloadTextFile();
                }
                // ResponseHttpDownload - patchState only
            }
        });
    }
    ngOnInit() {
        this.ac.waitUntilInitialized(() => {
            setTimeout(() => {
                this.isViewVisible = true;
            }, 0);
        });
    }
    //#region Http Get
    getAll() {
        this.es.getAll((library) => {
            this.ac.toastrInfo('Successfully completed GetAll!', -1);
        }, (errorMessage) => {
            this.ac.toastrError(errorMessage);
        });
    }
    getFromId() {
        this.es.getFromId((textMessage) => {
            this.ac.toastrInfo(textMessage, -1);
        }, (errorMessage) => {
            this.ac.toastrError(errorMessage);
        }, 'tsserver.txt');
    }
    getWithProgress() {
        this.es.getWithProgress((successMessage) => {
            this.ac.toastrInfo(successMessage, -1);
        }, (errorMessage) => {
            this.ac.toastrError(errorMessage);
        }, 'tsserver.txt', event => {
            if (event.loaded < 1024) {
                console.log(`Get in progress! ${event.loaded} bytes loaded`);
            }
            else {
                const kbDownloaded = Math.round(event.loaded / 1024);
                console.log(`Get in progress! ${kbDownloaded}Kb loaded`);
            }
        });
    }
    onClickDownloadTextFile() {
        this.store.dispatch(new _httpDemo_component_actions__WEBPACK_IMPORTED_MODULE_7__["RequestHttpDownload"](true));
        this.store.dispatch(new _httpDemo_component_actions__WEBPACK_IMPORTED_MODULE_7__["RequestHttpDownload"](false));
    }
    downloadTextFile() {
        const fileName = 'simple.txt';
        this.es.downloadFile((fileBlob) => {
            this.es.saveFile(fileBlob, fileName);
            // this.store.dispatch(new ResponseHttpDownload(fileBlob, true));
            this.ac.toastrInfo('Successfully downloaded: ' + fileName, -1);
        }, (errorMessage) => {
            this.ac.toastrError(errorMessage);
        }, fileName);
    }
    downloadPdfFile() {
        const fileName = 'proASPNetCoreMVC.pdf';
        this.es.downloadFile((fileBlob) => {
            this.es.saveFile(fileBlob, fileName);
            this.ac.toastrInfo('Successfully downloaded: ' + fileName, -1);
        }, (errorMessage) => {
            this.ac.toastrError(errorMessage);
        }, fileName);
    }
    downloadPdfWithProgress() {
        const dialogConfig = { width: '450px', disableClose: true };
        dialogConfig.data = {
            id: 1,
            title: 'Download: ProASPNetCoreMVC.pdf',
            description: 'Download Progress (click Cancel to discontinue)',
            bytesTransfered: 0,
            totalBytes: 0,
            cancel: false
        };
        const matDialogRef = this.dialog.open(_file_transfer_dialog_component__WEBPACK_IMPORTED_MODULE_2__["FileTransferDialogComponent"], dialogConfig);
        this.es.downloadWithProgress(() => {
            setTimeout(() => { matDialogRef.close(); }, 1000);
        }, (errorMessage) => {
            if (!dialogConfig.data.cancel) {
                matDialogRef.close();
                setTimeout(() => {
                    this.ac.toastrError(errorMessage);
                }, 500);
                return true;
            }
        }, 'ProASPNetCoreMVC.pdf', (event) => {
            dialogConfig.data.bytesTransfered = Math.round(event.loaded / 1000);
            dialogConfig.data.totalBytes = Math.round(event.total / 1000);
            dialogConfig.data.percentComplete = 100 / (event.total / event.loaded);
            if (dialogConfig.data.cancel) {
                matDialogRef.close();
                return true;
            }
        });
    }
    downloadJson() {
        this.es.getAll((library) => {
            const stringVal = JSON.stringify(library, null, 2);
            const fileBlob = new Blob([stringVal], { type: 'text/plain' });
            // manually move this file to the assests folder to be used with getJson
            this.es.saveFile(fileBlob, 'library.json');
            this.ac.toastrInfo('Successfully completed saving Json!', -1);
        }, (errorMessage) => {
            this.ac.toastrError(errorMessage);
        });
    }
    getJson() {
        this.es.getAllLocally((library) => {
            this.ac.toastrInfo('Successfully completed locally getting Json!', -1);
        }, (errorMessage) => {
            this.ac.toastrError(errorMessage);
        });
    }
    //#endregion
    //#region Http Post
    postEntity() {
        this.es.postEntity(successMessage => {
            this.ac.toastrInfo(successMessage, -1);
        }, (errorMessage) => {
            this.ac.toastrError(errorMessage);
        });
    }
    postCollection() {
        this.es.postCollection(successMessage => {
            this.ac.toastrInfo(successMessage, -1);
        }, (errorMessage) => {
            this.ac.toastrError(errorMessage);
        });
    }
    postCollectionWithProgess() {
        this.es.postCollectionWithProgess(successMessage => {
            this.ac.toastrInfo(successMessage, -1);
        }, (errorMessage) => {
            this.ac.toastrError(errorMessage);
        }, (event) => {
            if (event.loaded < 1024) {
                console.log(`Post in progress! ${event.loaded} bytes loaded`);
            }
            else {
                const kbUploaded = Math.round(event.loaded / 1024);
                console.log(`Post in progress! ${kbUploaded}Kb loaded`);
            }
        });
    }
    uploadFiles(element, files) {
        this.es.uploadFile(files, (successMessage) => {
            element.value = null;
            this.ac.toastrInfo(successMessage, -1);
        }, (errorMessage) => {
            element.value = null;
            this.ac.toastrError(errorMessage);
        }, (event) => {
            if (event.loaded < 1024) {
                console.log(`Post in progress! ${event.loaded} bytes loaded`);
            }
            else {
                const kbUploaded = Math.round(event.loaded / 1024);
                console.log(`Post in progress! ${kbUploaded}Kb loaded`);
            }
        });
    }
    uploadWithProgress(element, files) {
        const dialogConfig = { width: '450px', disableClose: true };
        dialogConfig.data = {
            id: 1,
            title: 'Upload: Choose any file to upload',
            description: 'Upload Progress (click Cancel to discontinue)',
            bytesTransfered: 0,
            totalBytes: 0,
            cancel: false
        };
        const matDialogRef = this.dialog.open(_file_transfer_dialog_component__WEBPACK_IMPORTED_MODULE_2__["FileTransferDialogComponent"], dialogConfig);
        this.es.uploadFileWithProgess(files, () => {
            setTimeout(() => {
                matDialogRef.close();
                element.value = null;
            }, 1000);
        }, (errorMessage) => {
            element.value = null;
            if (!dialogConfig.data.cancel) {
                matDialogRef.close();
                setTimeout(() => {
                    this.ac.toastrError(errorMessage);
                }, 500);
                return true;
            }
        }, (event) => {
            dialogConfig.data.bytesTransfered = Math.round(event.loaded / 1000);
            dialogConfig.data.totalBytes = Math.round(event.total / 1000);
            dialogConfig.data.percentComplete = 100 / (event.total / event.loaded);
            if (dialogConfig.data.cancel) {
                matDialogRef.close();
                element.value = null;
                return true;
            }
        });
    }
    //#endregion
    //#region Http Delete
    deleteEntity() {
        this.es.deleteEntity(successMessage => {
            this.ac.toastrInfo(successMessage, -1);
        }, (errorMessage) => {
            this.ac.toastrError(errorMessage);
        }, '1492');
    }
}
HttpDemoComponent.ɵfac = function HttpDemoComponent_Factory(t) { return new (t || HttpDemoComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ngxs_store__WEBPACK_IMPORTED_MODULE_3__["Store"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_common_appConfig__WEBPACK_IMPORTED_MODULE_4__["AppConfig"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_common_entityService__WEBPACK_IMPORTED_MODULE_5__["EntityService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialog"])); };
HttpDemoComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HttpDemoComponent, selectors: [["ng-component"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_common_entityService__WEBPACK_IMPORTED_MODULE_5__["EntityService"]]
        // #endregion
        )], decls: 75, vars: 1, consts: [[3, "isViewVisible"], [1, "flex-container"], [1, "flex-item", "app-text-primary"], [1, "http-feature-title", 2, "font-family", "px-neuropol"], [1, "http-get-text"], ["mat-button", "", 1, "panel-button-left", 3, "click"], ["mat-button", "", 1, "panel-button-right", 3, "click"], ["mat-button", "", "title", "Save an object or collection as a .json file", 1, "panel-button-right", 3, "click"], ["mat-button", "", "title", "Load an object or collection from a .json file", 1, "panel-button-right", 3, "click"], [1, "http-post-text"], ["id", "my_input", "type", "file", "multiple", "", 2, "display", "none", 3, "change"], ["file1", ""], ["type", "file", "multiple", "", 2, "display", "none", 3, "change"], ["file2", ""], [1, "http-delete-text"], [2, "width", "100%"], ["mat-button", "", 2, "width", "100%", 3, "click"]], template: function HttpDemoComponent_Template(rf, ctx) { if (rf & 1) {
        const _r56 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "view-fader", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "HTTP Get Service");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "table");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HttpDemoComponent_Template_button_click_10_listener() { return ctx.getAll(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Get All");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HttpDemoComponent_Template_button_click_13_listener() { return ctx.getFromId(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Get From Id");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HttpDemoComponent_Template_button_click_17_listener() { return ctx.getWithProgress(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "Get with Progress");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HttpDemoComponent_Template_button_click_20_listener() { return ctx.onClickDownloadTextFile(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "Download Text File");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HttpDemoComponent_Template_button_click_24_listener() { return ctx.downloadPdfFile(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, "Download PDF File");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HttpDemoComponent_Template_button_click_27_listener() { return ctx.downloadJson(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, "Download Json");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HttpDemoComponent_Template_button_click_31_listener() { return ctx.downloadPdfWithProgress(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32, "Download / Progress Dialog");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HttpDemoComponent_Template_button_click_34_listener() { return ctx.getJson(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35, "Get Json from Url");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, "HTTP Post Service");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "table");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HttpDemoComponent_Template_button_click_44_listener() { return ctx.postEntity(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](45, "Post Entity");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HttpDemoComponent_Template_button_click_47_listener() { return ctx.postCollection(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](48, "Post Collection");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HttpDemoComponent_Template_button_click_51_listener() { return ctx.postCollectionWithProgess(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](52, "Post with Progress");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "input", 10, 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function HttpDemoComponent_Template_input_change_54_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r56); const _r54 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](55); return ctx.uploadFiles($event.target, _r54.files); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HttpDemoComponent_Template_button_click_56_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r56); const _r54 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](55); return _r54.click(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](57, "Upload File(s)");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "input", 12, 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function HttpDemoComponent_Template_input_change_60_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r56); const _r55 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](61); return ctx.uploadWithProgress($event.target, _r55.files); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HttpDemoComponent_Template_button_click_62_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r56); const _r55 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](61); return _r55.click(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](63, "Upload / Progress Dialog");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](64, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](67, "HTTP Delete Service");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](69, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](70, "table", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](71, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](72, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](73, "button", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HttpDemoComponent_Template_button_click_73_listener() { return ctx.deleteEntity(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](74, "Delete Entity");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("isViewVisible", ctx.isViewVisible);
    } }, directives: [ngx_motion__WEBPACK_IMPORTED_MODULE_8__["ɵa"], _angular_material_button__WEBPACK_IMPORTED_MODULE_9__["MatButton"]], encapsulation: 2 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HttpDemoComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                // #region template
                templateUrl: './httpDemo.component.html',
                providers: [_common_entityService__WEBPACK_IMPORTED_MODULE_5__["EntityService"]]
                // #endregion
            }]
    }], function () { return [{ type: _ngxs_store__WEBPACK_IMPORTED_MODULE_3__["Store"] }, { type: _common_appConfig__WEBPACK_IMPORTED_MODULE_4__["AppConfig"] }, { type: _common_entityService__WEBPACK_IMPORTED_MODULE_5__["EntityService"] }, { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialog"] }]; }, null); })();
class HttpDemoHelpDialogComponent {
    constructor(data) {
        this.data = data;
        // data contains values passed by the router
    }
}
HttpDemoHelpDialogComponent.ɵfac = function HttpDemoHelpDialogComponent_Factory(t) { return new (t || HttpDemoHelpDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])); };
HttpDemoHelpDialogComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HttpDemoHelpDialogComponent, selectors: [["ng-component"]], decls: 2, vars: 1, template: function HttpDemoHelpDialogComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "base-help-dialog");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" Here is where you will find help with the: ", ctx.data.subtitle, "\n");
    } }, directives: [_base_help_dialog__WEBPACK_IMPORTED_MODULE_10__["BaseHelpDialogComponent"]], encapsulation: 2 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HttpDemoHelpDialogComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                templateUrl: './httpDemo.component.help.html'
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"]]
            }] }]; }, null); })();


/***/ }),

/***/ "./features/mobileApis.component.actions.ts":
/*!**************************************************!*\
  !*** ./features/mobileApis.component.actions.ts ***!
  \**************************************************/
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
class ChangeTabIndex {
    constructor(name, title, payload, playback, delay) {
        this.name = name;
        this.title = title;
        this.payload = payload;
        this.playback = playback;
        this.delay = delay;
    }
}
ChangeTabIndex.type = '[mobileApi] ChangeTabIndex';
class ToggleSpellChecking {
    constructor(name, title, payload, playback, delay) {
        this.name = name;
        this.title = title;
        this.payload = payload;
        this.playback = playback;
        this.delay = delay;
    }
}
ToggleSpellChecking.type = '[mobileApi] ToggleSpellChecking';
class UpdateTextMessage {
    constructor(name, title, payload, playback, delay) {
        this.name = name;
        this.title = title;
        this.payload = payload;
        this.playback = playback;
        this.delay = delay;
    }
}
UpdateTextMessage.type = '[mobileApi] UpdateTextMessage';
class ClearTextMessage {
    constructor(name, title, payload, playback, delay) {
        this.name = name;
        this.title = title;
        this.payload = payload;
        this.playback = playback;
        this.delay = delay;
    }
}
ClearTextMessage.type = '[mobileApi] ClearTextMessage';
class ChangeMobileCarrier {
    constructor(name, title, payload, playback, delay) {
        this.name = name;
        this.title = title;
        this.payload = payload;
        this.playback = playback;
        this.delay = delay;
    }
}
ChangeMobileCarrier.type = '[mobileApi] ChangeMobileCarrier';
class UpdateMobileNumber {
    constructor(name, title, payload, playback, delay) {
        this.name = name;
        this.title = title;
        this.payload = payload;
        this.playback = playback;
        this.delay = delay;
    }
}
UpdateMobileNumber.type = '[mobileApi] UpdateMobileNumber';
class MobileApiInit {
    constructor(ngAction) {
        this.ngAction = ngAction;
    }
}
MobileApiInit.type = '[mobileApi] MobileApiInit';


/***/ }),

/***/ "./features/mobileApis.component.state.ts":
/*!************************************************!*\
  !*** ./features/mobileApis.component.state.ts ***!
  \************************************************/
/*! exports provided: $MobileApisStateModel, MobileApisStateModel, MobileApisState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "$MobileApisStateModel", function() { return $MobileApisStateModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MobileApisStateModel", function() { return MobileApisStateModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MobileApisState", function() { return MobileApisState; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngxs/store */ "./node_modules/@ngxs/store/__ivy_ngcc__/fesm2015/ngxs-store.js");
/* harmony import */ var _mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mobileApis.component.actions */ "./features/mobileApis.component.actions.ts");



class $MobileApisStateModel {
    constructor() {
        this.selectedIndex = 0;
        this.spellCheckingEnabled = false;
        this.clearTextMessage = false;
        this.textMessage = '';
        this.mobileCarrier = '';
        this.mobileNumber = '';
    }
}
class MobileApisStateModel {
    constructor() {
        this.selectedIndex = 0;
        this.spellCheckingEnabled = false;
        this.clearTextMessage = false;
        this.textMessage = '';
        this.mobileCarrier = '';
        this.mobileNumber = '';
        this.previousState = new $MobileApisStateModel();
    }
}
let MobileApisState = class MobileApisState {
    action01({ patchState }, { name, title, payload, playback, delay }) {
        patchState({ selectedIndex: payload });
        this.ngAction.appendToQueue(new _mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_2__["ChangeTabIndex"](name, title, payload, playback, delay));
    }
    action02({ patchState }, { name, title, payload, playback, delay }) {
        patchState({ spellCheckingEnabled: payload });
        this.ngAction.appendToQueue(new _mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_2__["ToggleSpellChecking"](name, title, payload, playback, delay));
    }
    action03({ patchState }, { name, title, payload, playback, delay }) {
        patchState({ clearTextMessage: payload });
        this.ngAction.appendToQueue(new _mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_2__["ClearTextMessage"](name, title, payload, playback, delay));
    }
    action04({ patchState }, { name, title, payload, playback, delay }) {
        patchState({ textMessage: payload });
        this.ngAction.appendToQueue(new _mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_2__["UpdateTextMessage"](name, title, payload, playback, delay));
    }
    action05({ patchState }, { name, title, payload, playback, delay }) {
        patchState({ mobileCarrier: payload });
        this.ngAction.appendToQueue(new _mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_2__["ChangeMobileCarrier"](name, title, payload, playback, delay));
    }
    action06({ patchState }, { name, title, payload, playback, delay }) {
        patchState({ mobileNumber: payload });
        this.ngAction.appendToQueue(new _mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_2__["UpdateMobileNumber"](name, title, payload, playback, delay));
    }
    action07({ patchState }, { ngAction }) {
        patchState({ selectedIndex: 0 });
        patchState({ spellCheckingEnabled: false });
        patchState({ clearTextMessage: false });
        patchState({ textMessage: '' });
        patchState({ mobileCarrier: '' });
        patchState({ mobileNumber: null });
        patchState({ previousState: new $MobileApisStateModel() });
        this.ngAction = ngAction;
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Action"])(_mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_2__["ChangeTabIndex"]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object, _mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_2__["ChangeTabIndex"]]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
], MobileApisState.prototype, "action01", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Action"])(_mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_2__["ToggleSpellChecking"]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object, _mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_2__["ToggleSpellChecking"]]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
], MobileApisState.prototype, "action02", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Action"])(_mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_2__["ClearTextMessage"]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object, _mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_2__["ClearTextMessage"]]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
], MobileApisState.prototype, "action03", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Action"])(_mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_2__["UpdateTextMessage"]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object, _mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_2__["UpdateTextMessage"]]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
], MobileApisState.prototype, "action04", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Action"])(_mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_2__["ChangeMobileCarrier"]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object, _mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_2__["ChangeMobileCarrier"]]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
], MobileApisState.prototype, "action05", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Action"])(_mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_2__["UpdateMobileNumber"]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object, _mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_2__["UpdateMobileNumber"]]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
], MobileApisState.prototype, "action06", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Action"])(_mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_2__["MobileApiInit"]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object, _mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_2__["MobileApiInit"]]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
], MobileApisState.prototype, "action07", null);
MobileApisState = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["State"])({
        name: 'mobileApis',
        defaults: new MobileApisStateModel()
    })
], MobileApisState);



/***/ }),

/***/ "./features/mobileApis.component.ts":
/*!******************************************!*\
  !*** ./features/mobileApis.component.ts ***!
  \******************************************/
/*! exports provided: MobileApisComponent, MobileApisHelpDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MobileApisComponent", function() { return MobileApisComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MobileApisHelpDialogComponent", function() { return MobileApisHelpDialogComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/dialog.js");
/* harmony import */ var _common_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/appConfig */ "./common/appConfig.ts");
/* harmony import */ var ngx_motion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-motion */ "./node_modules/ngx-motion/__ivy_ngcc__/fesm2015/ngx-motion.js");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngxs/store */ "./node_modules/@ngxs/store/__ivy_ngcc__/fesm2015/ngxs-store.js");
/* harmony import */ var _mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mobileApis.component.actions */ "./features/mobileApis.component.actions.ts");
/* harmony import */ var _mobileApis_component_state__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mobileApis.component.state */ "./features/mobileApis.component.state.ts");
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/tabs */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/tabs.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/form-field.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/input.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/button.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/icon.js");
/* harmony import */ var _base_help_dialog__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./base.help.dialog */ "./features/base.help.dialog.ts");
// #region Imports


// services


// ngxs















function MobileApisComponent_div_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r57 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("\u00A0\u00A0", ctx_r57.latitude, "");
} }
function MobileApisComponent_div_19_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "\u00A0\u00A000.00000");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function MobileApisComponent_div_20_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r59 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx_r59.longitude, "\u00A0\u00A0\u00A0");
} }
function MobileApisComponent_div_21_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "00.00000\u00A0\u00A0\u00A0");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function MobileApisComponent_textarea_42_Template(rf, ctx) { if (rf & 1) {
    const _r68 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "textarea", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function MobileApisComponent_textarea_42_Template_textarea_change_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r68); const ctx_r67 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r67.onChangeTextMessage($event.target.value); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r61 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("spellcheck", ctx_r61.mobileApisState.spellCheckingEnabled)("rows", ctx_r61.getRowCount())("ngModel", ctx_r61.mobileApisState.textMessage);
} }
function MobileApisComponent_mat_icon_44_Template(rf, ctx) { if (rf & 1) {
    const _r70 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-icon", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MobileApisComponent_mat_icon_44_Template_mat_icon_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r70); const ctx_r69 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r69.onClickSpellCheck(true); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "check_circle_outline");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function MobileApisComponent_mat_icon_45_Template(rf, ctx) { if (rf & 1) {
    const _r72 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-icon", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MobileApisComponent_mat_icon_45_Template_mat_icon_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r72); const ctx_r71 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r71.onClickSpellCheck(false); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "check_circle");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function MobileApisComponent_mat_icon_46_Template(rf, ctx) { if (rf & 1) {
    const _r74 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-icon", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MobileApisComponent_mat_icon_46_Template_mat_icon_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r74); const ctx_r73 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r73.onClickClearTextMessage(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "clear");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function MobileApisComponent_mat_icon_47_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-icon", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "block");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function MobileApisComponent_textarea_61_Template(rf, ctx) { if (rf & 1) {
    const _r76 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "textarea", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("keyup", function MobileApisComponent_textarea_61_Template_textarea_keyup_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r76); const ctx_r75 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r75.onChangeTextMessage($event.target.value); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r66 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("spellcheck", ctx_r66.mobileApisState.spellCheckingEnabled)("rows", ctx_r66.getRowCount())("ngModel", ctx_r66.mobileApisState.textMessage);
} }
// #endregions
// #region Constructor
class MobileApisComponent {
    constructor(store, ac, cd, as) {
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
        this.mobileApisState = new _mobileApis_component_state__WEBPACK_IMPORTED_MODULE_6__["MobileApisStateModel"]();
        this.successfulMessageSent = "";
        this.store.dispatch(new _mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_5__["MobileApiInit"](this.ac.ngAction));
        this.stateChanges();
    }
    stateChanges() {
        this.store.subscribe(state => {
            if (state.mobileApis) {
                const mobileApisState = state.mobileApis;
                mobileApisState.previousState = this.mobileApisState;
                this.mobileApisState = mobileApisState;
                if (mobileApisState.selectedIndex !== mobileApisState.previousState.selectedIndex) {
                    this.updateTabIndex(mobileApisState.selectedIndex);
                }
                if (mobileApisState.spellCheckingEnabled !== mobileApisState.previousState.spellCheckingEnabled) {
                    this.spellCheck();
                }
                if (mobileApisState.clearTextMessage !== mobileApisState.previousState.clearTextMessage) {
                    setTimeout(() => {
                        this.clearTextMessage();
                    }, 500); // Adding motion
                }
            }
        });
    }
    ngOnInit() {
        this.ac.waitUntilInitialized(() => {
            this.isViewVisible = true;
            this.updateCellCarriers();
            setTimeout(() => {
                this.showToggleGroup = true;
                this.initGoogleMaps();
            }, 0);
        });
    }
    // #endregion
    onChangeTab(selectedIndex) {
        if (!this.ac.ngAction.isDispatching()) {
            this.store.dispatch(new _mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_5__["ChangeTabIndex"]('ChangeTab', 'Click Tab', selectedIndex, true, -1));
        }
    }
    updateTabIndex(selectedIndex) {
        this.selectedIndex = selectedIndex;
    }
    //#region Speech To Text:
    onClickSpeechToText() {
        if (!this.s2T.featureIsAvailable) {
            this.unavailableFeature('Speech to Text');
            return;
        }
        this.s2T.owner = this;
        this.s2T.onRestartCallback = () => {
            // Don't do anything for now
        };
        this.s2T.onResultsCallback = (speech) => {
            this.store.dispatch(new _mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_5__["UpdateTextMessage"]('UpdateMessage', 'Enter Message', this.mobileApisState.textMessage + speech, true, -1));
            this.cd.detectChanges();
        };
        this.s2T.isClosable = true;
        this.s2T.positionTop = -75;
        this.showSpeechToText = false;
        this.store.dispatch(new _mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_5__["UpdateTextMessage"]('UpdateMessage', 'Enter Message', '', true, -1));
        setTimeout(() => {
            this.showSpeechToText = true;
        }, 0);
    }
    onChangeTextMessage(text) {
        this.store.dispatch(new _mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_5__["UpdateTextMessage"]('UpdateMessage', 'Enter Message', text, true, -1));
    }
    unavailableFeature(feature) {
        this.ac.toastrInfo(feature + ' is unavailable with this browser...');
        setTimeout(() => {
            this.ac.toastrInfo('Upgrade to Google Chrome!');
        }, 5000);
    }
    onClickTextToSpeech() {
        if (!this.t2S.featureIsAvailable) {
            this.unavailableFeature('Text to Speech');
            return;
        }
        this.t2S.textToSpeak = this.mobileApisState.textMessage;
        this.t2S.isClosable = true;
        this.t2S.positionTop = -75;
        this.t2S.owner = this;
        this.showTextToSpeech = false;
        setTimeout(() => {
            this.showTextToSpeech = true;
        }, 0);
    }
    onClickClearTextMessage() {
        this.store.dispatch(new _mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_5__["ClearTextMessage"]('ClearMessage', 'Clear Message', true, true, -1));
    }
    clearTextMessage() {
        this.mobileApisState.textMessage = '';
        this.mobileApisState.clearTextMessage = false;
    }
    onClickSpellCheck(spellCheck) {
        this.store.dispatch(new _mobileApis_component_actions__WEBPACK_IMPORTED_MODULE_5__["ToggleSpellChecking"]('SpellChecking', 'SpellChecking', spellCheck, true, -1));
    }
    spellCheck() {
        if (this.mobileApisState.spellCheckingEnabled) {
            const textArea = document.querySelector('.textAreaNgModel');
            if (this.mobileApisState.spellCheckingEnabled) {
                this.as.spellChecker(textArea);
            }
            else {
                textArea.focus();
            }
        }
        else {
            setTimeout(() => {
                this.showTextArea = false;
                setTimeout(() => {
                    this.showTextArea = true;
                });
            });
        }
    }
    getRowCount() {
        try {
            const count = document.querySelector('.textAreaNgModel').value.split('\n').length;
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
    }
    // #endregion
    //#region Text Messaging:
    updateCellCarriers() {
        this.cellCarriers = new Array();
        this.ac.appSettings.cellCarriers.split(';').forEach(cellCarrier => {
            this.cellCarriers.push({ name: cellCarrier.split(':')[0], smsProfile: cellCarrier.split(':')[1] });
        });
    }
    onChangeCarrier(carrier) {
        // this.store.dispatch(new ChangeMobileCarrier(carrier));
        this.shouldSendBeDisabled();
    }
    onKeyDown(event) {
        const mobileNumber = event.target.value;
        if (event.key === 'Backspace' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            return true;
        }
        if (mobileNumber.length === this.mobileNumberMaxLength) {
            return false;
        }
        else {
            return true;
        }
    }
    onKeyUp(mobileNumber) {
        this.mobileNumber = mobileNumber;
        if (mobileNumber.toString().length === this.mobileNumberMaxLength) {
            this.mobileApisState.mobileNumber = mobileNumber.toString();
            // this.store.dispatch(new UpdateMobileNumber(mobileNumber));
        }
    }
    shouldSendBeDisabled() {
        if (!this.mobileNumber) {
            return true;
        }
        if (this.mobileNumber.toString().length < this.mobileNumberMaxLength) {
            return true;
        }
        if (this.mobileApisState.textMessage.trim().length === 0) {
            return true;
        }
        if (this.successfulMessageSent === this.mobileApisState.textMessage) {
            return true;
        }
        return false;
    }
    onClickSend() {
        this.ac.showSpinner(true);
        this.ac.sendTextMessage({
            message: this.mobileApisState.textMessage,
            cellCarrierName: "",
            mobileNumber: parseInt(this.mobileApisState.mobileNumber)
        }, () => {
            this.successfulMessageSent = this.mobileApisState.textMessage;
            this.ac.showSpinner(false);
            this.playAscending(0.01);
            this.ac.toastrSuccess(`Success: Your text message has been sent to: ${this.mobileApisState.mobileNumber}`);
        }, (errorMessage) => {
            this.ac.showSpinner(false);
            this.ac.toastrError(`Error: ${errorMessage}`);
        });
    }
    playAscending(volume) {
        setTimeout(() => {
            this.play4Ths(volume);
            setTimeout(() => {
                this.play4Ths(volume / 2);
                setTimeout(() => {
                    this.play4Ths(volume / 4);
                    setTimeout(() => {
                        this.play4Ths(volume / 8);
                    }, 500);
                }, 500);
            }, 500);
        }, 500);
    }
    play4Ths(volume) {
        setTimeout(() => {
            this.as.beep(1500, 523.25, volume, 'sine', null);
            setTimeout(() => {
                this.as.beep(1500, 698.46, volume, 'sine', null);
                setTimeout(() => {
                    this.as.beep(1500, 932.33, volume, 'sine', null);
                    setTimeout(() => {
                        this.as.beep(1500, 1244.51, volume, 'sine', null);
                    }, 250);
                }, 250);
            }, 250);
        }, 250);
    }
    // #endregion
    //#region GoogleMaps:
    initGoogleMaps() {
        setTimeout(() => {
            this.gm.owner = this;
            this.gm.updateCoordinatesCallback = 'updateCoordinatesCallback';
            this.gm.updateAddressCallback = 'updateAddressCallback';
            this.gm.googleMapKey = this.ac.appSettings.googleMapKey;
            this.gm.initialize();
        });
    }
    updateAddressCallback(address, zipcode) {
        this.address = address;
        this.zipcode = zipcode;
    }
    updateCoordinatesCallback(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.gm.lookupAddress();
    }
    shouldUpdateByAddressBeDisabled() {
        return this.address.trim().length === 0 || this.zipcode.toString().trim().length < 5;
    }
    calcGmTextWidth() {
        if (this.ac.isPhoneSize) {
            if (this.ac.isLandscapeView) {
                return this.ac.screenWidth / 3;
            }
            else {
                return this.ac.screenWidth - 70;
            }
        }
        return 270;
    }
    getGmTextWidth() {
        return this.calcGmTextWidth();
    }
    getMapWidth() {
        if (document.documentElement.clientWidth <= this.ac.smallWidthBreakpoint) {
            return document.documentElement.clientWidth;
        }
        if (document.documentElement.clientWidth <= this.ac.mediaQueryBreak) {
            return document.documentElement.clientWidth - (this.ac.sideNavWidth);
        }
        return document.documentElement.clientWidth - (this.ac.sideNavWidth + this.ac.mapControlsWidth);
    }
    getMapHeight() {
        if (document.documentElement.clientWidth <= this.ac.mediaQueryBreak) {
            return document.documentElement.clientHeight - (this.ac.headerHeight + this.ac.mapControlsHeight);
        }
        return document.documentElement.clientHeight - this.ac.headerHeight;
    }
}
MobileApisComponent.ɵfac = function MobileApisComponent_Factory(t) { return new (t || MobileApisComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ngxs_store__WEBPACK_IMPORTED_MODULE_4__["Store"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_common_appConfig__WEBPACK_IMPORTED_MODULE_2__["AppConfig"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ngx_motion__WEBPACK_IMPORTED_MODULE_3__["AppServices"])); };
MobileApisComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: MobileApisComponent, selectors: [["ng-component"]], viewQuery: function MobileApisComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstaticViewQuery"](ngx_motion__WEBPACK_IMPORTED_MODULE_3__["SpeechToTextComponent"], true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstaticViewQuery"](ngx_motion__WEBPACK_IMPORTED_MODULE_3__["TextToSpeechComponent"], true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstaticViewQuery"](ngx_motion__WEBPACK_IMPORTED_MODULE_3__["GoogleMapsComponent"], true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.s2T = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.t2S = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.gm = _t.first);
    } }, decls: 69, vars: 25, consts: [[3, "isVisible"], [3, "isViewVisible"], ["mat-align-tabs", "center", "color", "primary", "dynamicHeight", "", 3, "selectedIndex", "selectedIndexChange"], ["label", "Map"], [1, "flex-container"], [1, "flex-item", "map-controls"], ["matInput", "", "placeholder", "Address", 3, "ngModel", "ngModelChange"], ["matInput", "", "placeholder", "Zip Code", 3, "ngModel", "ngModelChange"], [2, "float", "left", "margin-top", "10px"], [2, "float", "right", "margin-top", "10px"], [2, "margin-top", "10px"], ["style", "float: left; ", 4, "ngIf"], ["style", "float: right; ", 4, "ngIf"], ["mat-flat-button", "", "color", "primary", "title", "Find Me on Google Maps", 2, "float", "left", 3, "click"], ["mat-flat-button", "", "color", "primary", "title", "Use Address to Google Maps", 2, "float", "right", 3, "disabled", "click"], ["heightPercent", "100", 1, "flex-item", "map-view", 2, "border-radius", "10px", "display", "block", 3, "isVisible"], ["label", "Speech"], [1, "flex-item"], [1, "s2t-text"], ["color", "primary", "title", "Convert Text to Speech", 1, "toolbar-icon-button", 2, "float", "left", "cursor", "pointer", "margin-bottom", "15px", "font-size", "40px", 3, "click"], ["color", "primary", "title", "Convert Speech to Text", 1, "toolbar-icon-button", 2, "float", "right", "cursor", "pointer", "margin-bottom", "15px", "font-size", "40px", 3, "click"], [1, "send-sms", 2, "height", "170px", "margin-left", "10px"], ["appearance", "fill"], ["matInput", "", "style", "font-size: 110%; ", "class", "form-control textAreaNgModel", 3, "spellcheck", "rows", "ngModel", "change", 4, "ngIf"], ["color", "primary", "class", "toolbar-icon-button", "style", "float:left; cursor: pointer; margin-top: 0; font-size: 40px; ", "title", "Spell Checking: Off", 3, "click", 4, "ngIf"], ["color", "primary", "class", "toolbar-icon-button", "style", "float:left; cursor: pointer; margin-top: 0; font-size: 40px; ", "title", "Spell Checking: On", 3, "click", 4, "ngIf"], ["color", "primary", "class", "toolbar-icon-button", "style", "float:right; cursor: pointer; margin-top: 0; font-size: 40px; ", "title", "Clear Text", 3, "click", 4, "ngIf"], ["color", "primary", "class", "toolbar-icon-button", "style", "float:right; cursor: default; margin-top: 0; font-size: 40px; ", "title", "Clearing Text", 4, "ngIf"], [1, "app-text-primary", 2, "float", "left", "margin-left", "5px", "margin-top", "7px", "font-size", "16px"], [2, "font-weight", "bold"], ["label", "SMS"], [1, "send-sms", 2, "width", "285px", "margin-left", "10px"], ["matInput", "", "class", "form-control textAreaNgModel", 3, "spellcheck", "rows", "ngModel", "keyup", 4, "ngIf"], ["min", "0", "max", "9999999999", "type", "number", "matInput", "", "placeholder", "* Cell Number", 3, "ngModel", "keyup", "keydown"], ["mat-flat-button", "", "color", "primary", 2, "float", "right", 3, "disabled", "click"], [2, "float", "left"], [2, "float", "right"], ["matInput", "", 1, "form-control", "textAreaNgModel", 2, "font-size", "110%", 3, "spellcheck", "rows", "ngModel", "change"], ["color", "primary", "title", "Spell Checking: Off", 1, "toolbar-icon-button", 2, "float", "left", "cursor", "pointer", "margin-top", "0", "font-size", "40px", 3, "click"], ["color", "primary", "title", "Spell Checking: On", 1, "toolbar-icon-button", 2, "float", "left", "cursor", "pointer", "margin-top", "0", "font-size", "40px", 3, "click"], ["color", "primary", "title", "Clear Text", 1, "toolbar-icon-button", 2, "float", "right", "cursor", "pointer", "margin-top", "0", "font-size", "40px", 3, "click"], ["color", "primary", "title", "Clearing Text", 1, "toolbar-icon-button", 2, "float", "right", "cursor", "default", "margin-top", "0", "font-size", "40px"], ["matInput", "", 1, "form-control", "textAreaNgModel", 3, "spellcheck", "rows", "ngModel", "keyup"]], template: function MobileApisComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "speech-to-text", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "text-to-speech", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "view-fader", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-tab-group", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("selectedIndexChange", function MobileApisComponent_Template_mat_tab_group_selectedIndexChange_3_listener($event) { return ctx.onChangeTab($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-tab", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "input", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function MobileApisComponent_Template_input_ngModelChange_8_listener($event) { return ctx.address = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "input", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function MobileApisComponent_Template_input_ngModelChange_10_listener($event) { return ctx.zipcode = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "\u00A0\u00A0Latitude");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Longitude\u00A0\u00A0");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](16, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](18, MobileApisComponent_div_18_Template, 2, 1, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](19, MobileApisComponent_div_19_Template, 2, 0, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](20, MobileApisComponent_div_20_Template, 2, 1, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](21, MobileApisComponent_div_21_Template, 2, 0, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](22, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](23, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "button", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MobileApisComponent_Template_button_click_24_listener() { return ctx.gm.findMe(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, "Find Me");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "button", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MobileApisComponent_Template_button_click_26_listener() { return ctx.gm.useAddress(ctx.address, ctx.zipcode); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "Use Address");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](28, "google-maps", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "mat-tab", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "mat-icon", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MobileApisComponent_Template_mat_icon_click_34_listener() { return ctx.onClickTextToSpeech(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35, "volume_up");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "mat-icon", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MobileApisComponent_Template_mat_icon_click_36_listener() { return ctx.onClickSpeechToText(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](37, "mic");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "mat-form-field", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](41, "Enter Message Here");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](42, MobileApisComponent_textarea_42_Template, 1, 3, "textarea", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](44, MobileApisComponent_mat_icon_44_Template, 2, 0, "mat-icon", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](45, MobileApisComponent_mat_icon_45_Template, 2, 0, "mat-icon", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](46, MobileApisComponent_mat_icon_46_Template, 2, 0, "mat-icon", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](47, MobileApisComponent_mat_icon_47_Template, 2, 0, "mat-icon", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "span", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](49, " Spell Checking: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "span", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](51);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "mat-tab", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "div", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](56, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](57, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "mat-form-field", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](60, "* Enter Message Here");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](61, MobileApisComponent_textarea_61_Template, 1, 3, "textarea", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](62, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](63, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "input", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("keyup", function MobileApisComponent_Template_input_keyup_64_listener($event) { return ctx.onKeyUp($event.target.value); })("keydown", function MobileApisComponent_Template_input_keydown_64_listener($event) { return ctx.onKeyDown($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](65, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](66, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](67, "button", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MobileApisComponent_Template_button_click_67_listener() { return ctx.onClickSend(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](68, "Send");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("isVisible", ctx.showSpeechToText);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("isVisible", ctx.showTextToSpeech);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("isViewVisible", ctx.isViewVisible);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("selectedIndex", ctx.selectedIndex);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.address);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.zipcode);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.latitude !== 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.latitude === 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.longitude !== 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.longitude === 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx.shouldUpdateByAddressBeDisabled());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("width", ctx.getMapWidth(), "px")("height", ctx.getMapHeight(), "px");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("isVisible", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.showTextArea);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.mobileApisState.spellCheckingEnabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.mobileApisState.spellCheckingEnabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.mobileApisState.clearTextMessage);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.mobileApisState.clearTextMessage);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.mobileApisState.spellCheckingEnabled ? "On" : "Off");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.showTextArea);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.mobileNumber);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx.shouldSendBeDisabled());
    } }, directives: [ngx_motion__WEBPACK_IMPORTED_MODULE_3__["SpeechToTextComponent"], ngx_motion__WEBPACK_IMPORTED_MODULE_3__["TextToSpeechComponent"], ngx_motion__WEBPACK_IMPORTED_MODULE_3__["ɵa"], _angular_material_tabs__WEBPACK_IMPORTED_MODULE_7__["MatTabGroup"], _angular_material_tabs__WEBPACK_IMPORTED_MODULE_7__["MatTab"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__["MatFormField"], _angular_material_input__WEBPACK_IMPORTED_MODULE_9__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_10__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_10__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_10__["NgModel"], _angular_common__WEBPACK_IMPORTED_MODULE_11__["NgIf"], _angular_material_button__WEBPACK_IMPORTED_MODULE_12__["MatButton"], ngx_motion__WEBPACK_IMPORTED_MODULE_3__["GoogleMapsComponent"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__["MatIcon"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__["MatLabel"], _angular_forms__WEBPACK_IMPORTED_MODULE_10__["NumberValueAccessor"]], encapsulation: 2 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MobileApisComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                // #region template
                templateUrl: 'mobileApis.component.html'
                // #endregion
            }]
    }], function () { return [{ type: _ngxs_store__WEBPACK_IMPORTED_MODULE_4__["Store"] }, { type: _common_appConfig__WEBPACK_IMPORTED_MODULE_2__["AppConfig"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"] }, { type: ngx_motion__WEBPACK_IMPORTED_MODULE_3__["AppServices"] }]; }, { s2T: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: [ngx_motion__WEBPACK_IMPORTED_MODULE_3__["SpeechToTextComponent"], { static: true }]
        }], t2S: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: [ngx_motion__WEBPACK_IMPORTED_MODULE_3__["TextToSpeechComponent"], { static: true }]
        }], gm: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: [ngx_motion__WEBPACK_IMPORTED_MODULE_3__["GoogleMapsComponent"], { static: true }]
        }] }); })();
class MobileApisHelpDialogComponent {
    constructor(data) {
        this.data = data;
    }
}
MobileApisHelpDialogComponent.ɵfac = function MobileApisHelpDialogComponent_Factory(t) { return new (t || MobileApisHelpDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])); };
MobileApisHelpDialogComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: MobileApisHelpDialogComponent, selectors: [["ng-component"]], decls: 2, vars: 1, template: function MobileApisHelpDialogComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "base-help-dialog");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" Here is where you will find help with the: ", ctx.data.subtitle, "\n");
    } }, directives: [_base_help_dialog__WEBPACK_IMPORTED_MODULE_14__["BaseHelpDialogComponent"]], encapsulation: 2 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MobileApisHelpDialogComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                templateUrl: './mobileApis.component.help.html'
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"]]
            }] }]; }, null); })();


/***/ }),

/***/ "./features/mobileApis.module.ts":
/*!***************************************!*\
  !*** ./features/mobileApis.module.ts ***!
  \***************************************/
/*! exports provided: MobileApisModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MobileApisModule", function() { return MobileApisModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var ngx_motion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-motion */ "./node_modules/ngx-motion/__ivy_ngcc__/fesm2015/ngx-motion.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _mobileApis_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mobileApis.component */ "./features/mobileApis.component.ts");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngxs/store */ "./node_modules/@ngxs/store/__ivy_ngcc__/fesm2015/ngxs-store.js");
/* harmony import */ var _mobileApis_component_state__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mobileApis.component.state */ "./features/mobileApis.component.state.ts");












class MobileApisModule {
}
MobileApisModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: MobileApisModule });
MobileApisModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function MobileApisModule_Factory(t) { return new (t || MobileApisModule)(); }, imports: [[
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"],
            ngx_motion__WEBPACK_IMPORTED_MODULE_2__["AppAnimationModule"],
            ngx_motion__WEBPACK_IMPORTED_MODULE_2__["MobileTechModule"],
            ngx_motion__WEBPACK_IMPORTED_MODULE_2__["MaterialModule"],
            ngx_motion__WEBPACK_IMPORTED_MODULE_2__["AppHelperModule"].forRoot(),
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild([
                {
                    path: 'mobileApis',
                    component: _mobileApis_component__WEBPACK_IMPORTED_MODULE_4__["MobileApisComponent"],
                    data: { debugOnly: false, title: 'Mobile Apis', subtitle: 'Mobile API features', show: true, helpTemplate: _mobileApis_component__WEBPACK_IMPORTED_MODULE_4__["MobileApisHelpDialogComponent"] }
                },
            ]),
            _ngxs_store__WEBPACK_IMPORTED_MODULE_5__["NgxsModule"].forFeature([
                _mobileApis_component_state__WEBPACK_IMPORTED_MODULE_6__["MobileApisState"]
            ])
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](MobileApisModule, { declarations: [_mobileApis_component__WEBPACK_IMPORTED_MODULE_4__["MobileApisComponent"]], imports: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"],
        ngx_motion__WEBPACK_IMPORTED_MODULE_2__["AppAnimationModule"],
        ngx_motion__WEBPACK_IMPORTED_MODULE_2__["MobileTechModule"],
        ngx_motion__WEBPACK_IMPORTED_MODULE_2__["MaterialModule"], ngx_motion__WEBPACK_IMPORTED_MODULE_2__["AppHelperModule"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"], _ngxs_store__WEBPACK_IMPORTED_MODULE_5__["ɵbb"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MobileApisModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [
                    _mobileApis_component__WEBPACK_IMPORTED_MODULE_4__["MobileApisComponent"],
                ],
                imports: [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"],
                    ngx_motion__WEBPACK_IMPORTED_MODULE_2__["AppAnimationModule"],
                    ngx_motion__WEBPACK_IMPORTED_MODULE_2__["MobileTechModule"],
                    ngx_motion__WEBPACK_IMPORTED_MODULE_2__["MaterialModule"],
                    ngx_motion__WEBPACK_IMPORTED_MODULE_2__["AppHelperModule"].forRoot(),
                    _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild([
                        {
                            path: 'mobileApis',
                            component: _mobileApis_component__WEBPACK_IMPORTED_MODULE_4__["MobileApisComponent"],
                            data: { debugOnly: false, title: 'Mobile Apis', subtitle: 'Mobile API features', show: true, helpTemplate: _mobileApis_component__WEBPACK_IMPORTED_MODULE_4__["MobileApisHelpDialogComponent"] }
                        },
                    ]),
                    _ngxs_store__WEBPACK_IMPORTED_MODULE_5__["NgxsModule"].forFeature([
                        _mobileApis_component_state__WEBPACK_IMPORTED_MODULE_6__["MobileApisState"]
                    ])
                ]
            }]
    }], null, null); })();


/***/ }),

/***/ "./features/notification.component.ts":
/*!********************************************!*\
  !*** ./features/notification.component.ts ***!
  \********************************************/
/*! exports provided: NotificationComponent, NotificationHelpDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationComponent", function() { return NotificationComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationHelpDialogComponent", function() { return NotificationHelpDialogComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/dialog.js");
/* harmony import */ var _common_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/appConfig */ "./common/appConfig.ts");
/* harmony import */ var _common_messagePump__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/messagePump */ "./common/messagePump.ts");
/* harmony import */ var ngx_motion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-motion */ "./node_modules/ngx-motion/__ivy_ngcc__/fesm2015/ngx-motion.js");
/* harmony import */ var ngx_modeling__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-modeling */ "./node_modules/ngx-modeling/index.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/form-field.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/input.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/icon.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/button.js");
/* harmony import */ var _base_help_dialog__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./base.help.dialog */ "./features/base.help.dialog.ts");
//#region Imports


// services



// models












function NotificationComponent_button_11_Template(rf, ctx) { if (rf & 1) {
    const _r85 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NotificationComponent_button_11_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r85); const ctx_r84 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r84.onClickRegister(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Register");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r77 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx_r77.shouldRegistrationBeDisabled());
} }
function NotificationComponent_button_12_Template(rf, ctx) { if (rf & 1) {
    const _r87 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NotificationComponent_button_12_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r87); const ctx_r86 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r86.onClickUnregister(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Unregister");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r78 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx_r78.shouldUnregistrationBeDisabled());
} }
function NotificationComponent_option_19_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "option", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const channel_r88 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", channel_r88.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](channel_r88.name);
} }
function NotificationComponent_textarea_32_Template(rf, ctx) { if (rf & 1) {
    const _r90 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "textarea", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function NotificationComponent_textarea_32_Template_textarea_ngModelChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r90); const ctx_r89 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r89.textToSend = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r80 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("spellcheck", ctx_r80.spellCheck)("rows", ctx_r80.getRowCount())("ngModel", ctx_r80.textToSend);
} }
function NotificationComponent_mat_icon_33_Template(rf, ctx) { if (rf & 1) {
    const _r92 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-icon", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NotificationComponent_mat_icon_33_Template_mat_icon_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r92); const ctx_r91 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r91.onClickSpellCheck(true, ctx_r91.textAreaElement); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "check_circle_outline");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function NotificationComponent_mat_icon_34_Template(rf, ctx) { if (rf & 1) {
    const _r94 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-icon", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NotificationComponent_mat_icon_34_Template_mat_icon_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r94); const ctx_r93 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r93.onClickSpellCheck(false, ctx_r93.textAreaElement); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "check_circle");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function NotificationComponent_option_48_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "option", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const channel_r95 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", channel_r95.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](channel_r95.name);
} }
//#endregion
class NotificationComponent {
    constructor(ac, xcvr, cd, as) {
        this.ac = ac;
        this.xcvr = xcvr;
        this.cd = cd;
        this.as = as;
        this.isViewVisible = true;
        this.textToSend = '';
        this.textReceived = '';
        this.showTextArea = true;
        this.speechRecognitionOn = false;
        this.speechRecognitionPaused = false;
        this.showSpeechToText = false;
        this.showTextToSpeech = false;
        this.spellCheck = false;
        this.textAreaMinRowCount = 3;
        this.showModalDialog = false;
        window.ononline = () => {
            this.onlineCallback();
        };
        window.onoffline = () => {
            this.offlineCallback();
        };
    }
    onlineCallback() {
        if (this.xcvr.setToAutoRegister) {
            this.onClickRegister();
        }
    }
    offlineCallback() {
        this.xcvr.setToOffline();
    }
    ngOnInit() {
        this.ac.waitUntilInitialized(() => {
            this.xcvr.getAllRegisteredChannels(() => { }, (errorMessage) => {
                this.ac.toastrError(`Error: ${errorMessage}`);
            });
            this.isViewVisible = true;
            window.onbeforeunload = () => {
                if (this.xcvr.channelRegistered) {
                    this.onClickUnregister();
                }
            };
        });
    }
    //#endregion
    //#region S2T & T2S:
    unavailableFeature(feature) {
        this.ac.toastrInfo(`${feature} ' is unavailable with this browser...`);
        setTimeout(() => {
            this.ac.toastrInfo('Upgrade to Google Chrome!');
        }, 5000);
    }
    onClickSpeechToText() {
        if (!this.s2T.featureIsAvailable) {
            this.unavailableFeature('Speech to Text');
            return;
        }
        this.s2T.owner = this;
        this.s2T.onRestartCallback = () => {
            // Don't do anything for now
        };
        this.s2T.onResultsCallback = (speech) => {
            if (!this.voiceActivation(speech)) {
                if (this.xcvr.channelRegistered) {
                    this.textToSend += speech + '\n';
                    this.cd.detectChanges();
                }
                else {
                    this.audioResponses(`can't compose message`);
                }
            }
        };
        this.s2T.isClosable = true;
        this.s2T.positionTop = -75;
        this.showSpeechToText = false;
        this.textToSend = '';
        setTimeout(() => {
            this.showSpeechToText = true;
        });
    }
    voiceActivation(command) {
        switch (command.toLowerCase().trim()) {
            case 'computer register channel':
                if (this.shouldRegistrationBeDisabled()) {
                    this.audioResponses(`can't register channel`);
                }
                else {
                    this.onClickRegister();
                }
                return true;
            case 'computer unregister channel':
                if (this.shouldUnregistrationBeDisabled()) {
                    this.audioResponses(`can't unregister channel`);
                }
                else {
                    this.onClickUnregister();
                }
                return true;
            case 'computer check spelling':
                this.onClickSpellCheck(true);
                return true;
            case 'computer send message':
                if (this.shouldSendBeDisabled()) {
                    this.audioResponses(`can't send message`);
                }
                else {
                    this.onClickSendMessage();
                }
                return true;
            case 'computer clear text':
                this.onClickClearText();
                return true;
            default:
                break;
        }
        // partial matches
        if (command.toLowerCase().trim().indexOf('computer register channel') !== -1) {
            this.voiceRegisterChannel(command);
            return true;
        }
        if (command.toLowerCase().trim().indexOf('computer subscribe to channel') !== -1) {
            this.voiceSubscribeToChannel(command);
            return true;
        }
    }
    voiceRegisterChannel(command) {
        // protocol: 'computer register channel A'
        const commandParts = command.split(' ');
        if (commandParts.length < 4) {
            this.audioResponses('what do you want');
            return;
        }
        this.xcvr.channelRegistration.name = this.getChannelNameFromCommand(command, 3);
        this.onClickRegister();
    }
    getChannelNameFromCommand(command, index) {
        const commandParts = command.split(' ');
        let channelName = '';
        for (let i = index; i < commandParts.length; i++) {
            channelName += commandParts[i] + ' ';
        }
        return channelName.trim().toUpperCase();
    }
    voiceSubscribeToChannel(command) {
        // protocol: 'computer subscribe to channel A'
        const commandParts = command.split(' ');
        if (commandParts.length < 5) {
            this.audioResponses('what do you want');
            return;
        }
        const channelName = this.getChannelNameFromCommand(command, 4);
        // is channel already subscribed to?
        const already = this.xcvr.channelRegistration.subscriptions.filter(i => (i === channelName));
        if (already.length > 0) {
            this.audioResponses('channel already subscribed', channelName);
            return;
        }
        const available = this.xcvr.getChanneNamesForSubscriptions().filter(i => (i === channelName));
        if (available.length !== 1) {
            this.audioResponses('channel not available', channelName);
            return;
        }
        this.xcvr.channelRegistration.subscriptions.push(channelName);
        this.onUpdateSubscriptions();
    }
    audioResponses(response, value) {
        let audioResponse = '';
        switch (response) {
            case `can't register channel`:
                this.s2T.onClickPause();
                audioResponse = `Sorry! It's not possible to register the channel at this time!`;
                break;
            case `can't unregister channel`:
                this.s2T.onClickPause();
                audioResponse = `Sorry! It's not possible to unregister the channel at this time!`;
                break;
            case `can't compose message`:
                this.s2T.onClickPause();
                audioResponse = `Sorry! It's not possible to compose a message until after channel registration!`;
                break;
            case `what do you want`:
                this.s2T.onClickPause();
                audioResponse = `Sorry! I really don't know what you expect me to do. Please repeat!`;
                break;
            case `channel already subscribed`:
                this.s2T.onClickPause();
                audioResponse = 'Sorry! You are already subscribed to channel: ' + value;
                break;
            case `channel not available`:
                this.s2T.onClickPause();
                audioResponse = 'Sorry! Channel ' + value + ' is not available for supscription!';
                break;
            case `can't send message`:
                this.s2T.onClickPause();
                audioResponse = 'Sorry! To send a message, you must have a registered channel, and a message to send!';
                break;
            default:
                break;
        }
        this.textToSpeech(audioResponse);
        this.ac.toastrError(audioResponse);
    }
    onClickTextToSpeech() {
        this.textToSpeech(this.textToSend);
    }
    textToSpeech(speech) {
        if (!this.t2S.featureIsAvailable) {
            this.unavailableFeature('Text to Speech');
            return;
        }
        this.t2S.textToSpeak = speech;
        this.t2S.isClosable = true;
        this.t2S.positionTop = -75;
        this.t2S.owner = this;
        setTimeout(() => {
            this.t2S.setupT2S();
            this.t2S.Start();
        });
    }
    onClickClearText() {
        this.textToSend = '';
    }
    onClickSpellCheck(spellCheck) {
        this.spellCheck = spellCheck;
        if (this.spellCheck) {
            setTimeout(() => {
                const textArea = document.querySelector('.text-to-send');
                if (this.spellCheck) {
                    this.as.spellChecker(textArea);
                }
                else {
                    textArea.focus();
                }
            });
        }
        else {
            setTimeout(() => {
                this.showTextArea = false;
                setTimeout(() => {
                    this.showTextArea = true;
                });
            });
        }
    }
    getRowCount() {
        const count = document.querySelector('.text-to-send').value.split('\n').length;
        if (count > this.textAreaMinRowCount) {
            return count;
        }
        else {
            return this.textAreaMinRowCount;
        }
    }
    // #endregion
    //#region Message Control
    updateMessagesReceived() {
        this.textReceived = '';
        this.xcvr.receiveMessageQueue.forEach((receiveMessage) => {
            if (this.t2S.featureIsAvailable) {
                this.textToSpeech('channel ' + receiveMessage.sendersName + ' sends, ' + receiveMessage.message.toString());
            }
            const sendersName = this.xcvr.channelForSubscriptions.filter(a => (a.name === receiveMessage.sendersName))[0].name;
            this.textReceived += sendersName + '> ' + receiveMessage.message.toString() + '\n';
        });
    }
    onClickSendMessage() {
        // queue message before sending
        this.xcvr.transmitMessageQueue.push(this.getMessageObj(this.textToSend));
        if (this.s2T.featureIsAvailable) {
            this.s2T.onClickPause();
        }
        this.xcvr.queueChannelMessage(() => {
            this.ac.toastrSuccess('Message sent successfully!');
        }, (errorMessage) => {
            this.ac.toastrError(`Error: ${errorMessage}`);
        }, () => {
            this.ac.toastrInfo('Offline: Message is cached for sending when back online');
        });
    }
    getMessageObj(message) {
        const channelMessage = new ngx_modeling__WEBPACK_IMPORTED_MODULE_5__["ChannelMessage"]();
        channelMessage.type = 'ChannelMessage';
        channelMessage.syncAction = 'dispatchMessage';
        channelMessage.sendersName = this.xcvr.channelRegistration.name;
        channelMessage.message = message;
        // channelMessage.message = new Date(); //cool! because on the server, this looks like a DateTime in UTC
        return channelMessage;
    }
    synchronize() {
        this.xcvr.synchronize(() => {
            // messageReceivedCallback
            this.updateMessagesReceived();
        }, () => {
            this.ac.toastrSuccess(`You successfully unregistered channel: ${this.xcvr.channelRegistration.name}`);
        }, (errorMessage) => {
            this.ac.toastrError(`Error: ${errorMessage}`);
        });
    }
    //#endregion
    //#region Registration
    onClickRegister() {
        this.xcvr.channelRegistration.name = this.xcvr.channelRegistration.name.toUpperCase();
        this.xcvr.register(() => {
            this.ac.toastrSuccess(`You successfully registered channel: ${this.xcvr.channelRegistration.name}`);
            this.xcvr.setToAutoRegister = false;
            if (this.xcvr.transmitMessageQueue.length > 0) {
                this.xcvr.sendChannelMessage(() => {
                    this.synchronize();
                }, (errorMessage) => { }, () => { });
            }
            else {
                this.synchronize();
            }
        }, (errorMessage) => {
            this.ac.toastrError(`Error: ${errorMessage}`);
        });
    }
    onClickUnregister() {
        this.xcvr.unregister(() => {
            // no message
        }, (errorMessage) => {
            this.ac.toastrError(`Error: ${errorMessage}`);
        });
        this.as.sleep(500);
    }
    onUpdateSubscriptions() {
        this.xcvr.onUpdateSubscriptions(() => {
            this.ac.toastrSuccess('Update to subscription was successfully!');
        }, (errorMessage) => {
            this.ac.toastrError(`Error: ${errorMessage}`);
        });
    }
    //#endregion
    //#region Button Control
    shouldRegistrationBeDisabled() {
        if (this.xcvr.channelRegistration.name.trim().length === 0 || this.xcvr.channelRegistered || !navigator.onLine) {
            return true;
        }
        return false;
    }
    shouldNamedUnregistrationBeDisabled() {
        if (this.xcvr.channelsToUnregister.length === 0) {
            return true;
        }
        return false;
    }
    shouldUnregistrationBeDisabled() {
        if (!this.xcvr.channelRegistered || this.xcvr.channelUnregistrationInProcess) {
            return true;
        }
        return false;
    }
    shouldSendBeDisabled() {
        if (this.textToSend.trim().length === 0) {
            return true;
        }
        if (!this.xcvr.channelRegistered && navigator.onLine) {
            return true;
        }
        return false;
    }
    //#endregion
    //#region Help System
    onClickHelp() {
        this.md.modalDialogTitle = 'Help on Notification';
        this.md.showOkButton = true;
        this.md.isClosable = true;
        this.md.desiredWidth = 750;
        this.md.desiredHeight = 425;
        this.showModalDialog = false;
        setTimeout(() => {
            this.showModalDialog = true;
        });
        this.md.dialogButtonCallback = (buttonClicked) => {
            if (buttonClicked === 'ok') {
                this.md.closeDialog();
            }
        };
    }
}
NotificationComponent.ɵfac = function NotificationComponent_Factory(t) { return new (t || NotificationComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_common_appConfig__WEBPACK_IMPORTED_MODULE_2__["AppConfig"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_common_messagePump__WEBPACK_IMPORTED_MODULE_3__["MessagePump"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ngx_motion__WEBPACK_IMPORTED_MODULE_4__["AppServices"])); };
NotificationComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: NotificationComponent, selectors: [["ng-component"]], viewQuery: function NotificationComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstaticViewQuery"](ngx_motion__WEBPACK_IMPORTED_MODULE_4__["SpeechToTextComponent"], true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstaticViewQuery"](ngx_motion__WEBPACK_IMPORTED_MODULE_4__["TextToSpeechComponent"], true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstaticViewQuery"](ngx_motion__WEBPACK_IMPORTED_MODULE_4__["ModalDialogComponent"], true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.s2T = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.t2S = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.md = _t.first);
    } }, decls: 55, vars: 21, consts: [[3, "isVisible"], [3, "isViewVisible"], [1, "flex-container"], [1, "flex-item"], [1, "notification-feature-subtitle"], [1, "notification-feature-registration"], [1, "notification-channel", 2, "margin", "5px"], ["matInput", "", "placeholder", "* Channel Name", "type", "text", 1, "registration-controls", 2, "text-transform", "uppercase", 3, "disabled", "ngModel", "spellcheck", "ngModelChange"], ["mat-fab", "", "color", "accent", "class", "registration-button", "title", "Register Channel", 3, "disabled", "click", 4, "ngIf"], ["mat-fab", "", "color", "accent", "class", "registration-button", "title", "Unregister Channel", 3, "disabled", "click", 4, "ngIf"], [2, "height", "50px", "width", "100%"], [1, "notification-feature-registration", 2, "margin", "5px"], ["size", "5", 1, "registered-channels-list", 3, "ngModel", "disabled", "ngModelChange"], [3, "value", 4, "ngFor", "ngForOf"], [1, "notification-feature-transceiver"], ["color", "primary", "title", "Convert Text to Speech", 1, "toolbar-icon-button", 2, "float", "left", "cursor", "pointer", "margin-bottom", "15px", "font-size", "40px", 3, "click"], [1, "app-text-accent", 2, "margin-left", "60px", "margin-top", "15px", "display", "inline-block"], ["color", "primary", "title", "Convert Speech to Text", 1, "toolbar-icon-button", 2, "float", "right", "cursor", "pointer", "margin-bottom", "15px", "font-size", "40px", 3, "click"], ["class", "text-to-send", "type", "text", 3, "spellcheck", "rows", "ngModel", "ngModelChange", 4, "ngIf"], ["color", "primary", "class", "toolbar-icon-button", "style", "float:left; cursor: pointer; margin-top: 0; font-size: 40px; ", "title", "Spell Checking: Off", 3, "click", 4, "ngIf"], ["color", "primary", "class", "toolbar-icon-button", "style", "float:left; cursor: pointer; margin-top: 0; font-size: 40px; ", "title", "Spell Checking: On", 3, "click", 4, "ngIf"], [1, "app-text-primary", 2, "float", "left", "margin-left", "5px", "margin-top", "10px"], [2, "font-weight", "bold"], ["color", "primary", "title", "Clear Text", 1, "toolbar-icon-button", 2, "cursor", "pointer", "margin-top", "0", "font-size", "40px", "margin-left", "40px", 3, "click"], ["mat-fab", "", "color", "accent", "title", "Transmit Message", 1, "send-button", 3, "disabled", "click"], [1, "app-text-accent", 2, "text-align", "center"], ["multiple", "multiple", "size", "3", 1, "registered-channels-list", 3, "ngModel", "ngModelChange", "change"], ["type", "text", 1, "text-to-send", 3, "disabled", "rows"], ["mat-fab", "", "color", "accent", "title", "Register Channel", 1, "registration-button", 3, "disabled", "click"], ["mat-fab", "", "color", "accent", "title", "Unregister Channel", 1, "registration-button", 3, "disabled", "click"], [3, "value"], ["type", "text", 1, "text-to-send", 3, "spellcheck", "rows", "ngModel", "ngModelChange"], ["color", "primary", "title", "Spell Checking: Off", 1, "toolbar-icon-button", 2, "float", "left", "cursor", "pointer", "margin-top", "0", "font-size", "40px", 3, "click"], ["color", "primary", "title", "Spell Checking: On", 1, "toolbar-icon-button", 2, "float", "left", "cursor", "pointer", "margin-top", "0", "font-size", "40px", 3, "click"]], template: function NotificationComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "speech-to-text", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "text-to-speech", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "view-fader", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Registration");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "input", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function NotificationComponent_Template_input_ngModelChange_10_listener($event) { return ctx.xcvr.channelRegistration.name = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, NotificationComponent_button_11_Template, 2, 1, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, NotificationComponent_button_12_Template, 2, 1, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "Registered Channels");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "select", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function NotificationComponent_Template_select_ngModelChange_18_listener($event) { return ctx.xcvr.channelsToUnregister = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](19, NotificationComponent_option_19_Template, 2, 2, "option", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "Transceiver");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "mat-icon", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NotificationComponent_Template_mat_icon_click_26_listener() { return ctx.onClickTextToSpeech(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "volume_up");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29, "Transmit Message(s)");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "mat-icon", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NotificationComponent_Template_mat_icon_click_30_listener() { return ctx.onClickSpeechToText(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, "mic");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](32, NotificationComponent_textarea_32_Template, 1, 3, "textarea", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](33, NotificationComponent_mat_icon_33_Template, 2, 0, "mat-icon", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](34, NotificationComponent_mat_icon_34_Template, 2, 0, "mat-icon", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "span", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](36, " Spell Checking: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "span", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "mat-icon", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NotificationComponent_Template_mat_icon_click_39_listener() { return ctx.onClickClearText(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40, "clear");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "button", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NotificationComponent_Template_button_click_41_listener() { return ctx.onClickSendMessage(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](42, "Send");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](43, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](44, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "div", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](46, "Receiving Subscription(s)");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "select", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function NotificationComponent_Template_select_ngModelChange_47_listener($event) { return ctx.xcvr.channelRegistration.subscriptions = $event; })("change", function NotificationComponent_Template_select_change_47_listener() { return ctx.onUpdateSubscriptions(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](48, NotificationComponent_option_48_Template, 2, 2, "option", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](49, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](50, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "div", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](52, "Received Message(s)");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "textarea", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](54);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("isVisible", ctx.showSpeechToText);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("isVisible", ctx.showTextToSpeech);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("isViewVisible", ctx.isViewVisible);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx.xcvr.channelRegistered)("ngModel", ctx.xcvr.channelRegistration.name)("spellcheck", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.xcvr.channelRegistered);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.xcvr.channelRegistered);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.xcvr.channelsToUnregister)("disabled", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.xcvr.getOrderedAllRegisteredChannels());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.showTextArea);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.spellCheck);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.spellCheck);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.spellCheck ? "On" : "Off");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx.shouldSendBeDisabled());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.xcvr.channelRegistration.subscriptions);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.xcvr.getOrderedChannelForSubscriptions());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", true)("rows", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.textReceived);
    } }, directives: [ngx_motion__WEBPACK_IMPORTED_MODULE_4__["SpeechToTextComponent"], ngx_motion__WEBPACK_IMPORTED_MODULE_4__["TextToSpeechComponent"], ngx_motion__WEBPACK_IMPORTED_MODULE_4__["ɵa"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatFormField"], _angular_material_input__WEBPACK_IMPORTED_MODULE_7__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgModel"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgIf"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["SelectControlValueAccessor"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgForOf"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__["MatIcon"], _angular_material_button__WEBPACK_IMPORTED_MODULE_11__["MatButton"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["SelectMultipleControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgSelectOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ɵangular_packages_forms_forms_x"]], encapsulation: 2 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NotificationComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                // #region template
                templateUrl: './notification.component.html'
                // #endregion
            }]
    }], function () { return [{ type: _common_appConfig__WEBPACK_IMPORTED_MODULE_2__["AppConfig"] }, { type: _common_messagePump__WEBPACK_IMPORTED_MODULE_3__["MessagePump"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"] }, { type: ngx_motion__WEBPACK_IMPORTED_MODULE_4__["AppServices"] }]; }, { s2T: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: [ngx_motion__WEBPACK_IMPORTED_MODULE_4__["SpeechToTextComponent"], { static: true }]
        }], t2S: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: [ngx_motion__WEBPACK_IMPORTED_MODULE_4__["TextToSpeechComponent"], { static: true }]
        }], md: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: [ngx_motion__WEBPACK_IMPORTED_MODULE_4__["ModalDialogComponent"], { static: true }]
        }] }); })();
class NotificationHelpDialogComponent {
    constructor(data) {
        this.data = data;
        // data contains values passed by the router
    }
}
NotificationHelpDialogComponent.ɵfac = function NotificationHelpDialogComponent_Factory(t) { return new (t || NotificationHelpDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])); };
NotificationHelpDialogComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: NotificationHelpDialogComponent, selectors: [["ng-component"]], decls: 57, vars: 0, consts: [[2, "margin", "10px", "height", "450px", "overflow-y", "scroll"], [2, "text-align", "center", "font-weight", "bold"]], template: function NotificationHelpDialogComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "base-help-dialog");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, " OVERVIEW ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, " The Notification feature is a type of messaging system. The system will send and receive notifications, but is not limited to text. It is also possible to send and receive objects and collection. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, " Steps to Send a Notification ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, " 1)\tRegister the channel by entering the channel name in the \"Channel Name\" textbox. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, " \u00A0\u00A0\u00A0\u00A0The channel name can be any name you choose ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, " 2)\tClick the \"Register\" button ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, " 3)\tEnter text in the \"Transmit Message(s)\" textbox ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](16, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, " 4)\tClick the send button ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, " Steps to Receive a Notification ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, " 1)\tRegister the channel, as you did in step 1 above ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](22, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, " 2)\tFrom the \"Receiving Subscription(s)\" list box, select which channel(s) that you want ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](24, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, " \u00A0\u00A0\u00A0\u00A0to receive notifications from. This can be your own channel ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](26, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, " 3)\tNow when the channels that you have subscribed to send notifications, you will see the channel name along with the message, in the \"Received Message(s)\" textbox ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](28, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, " Composing a Text Message ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32, " You can enter text without the keyboard by using the \"Speech to Text\" converter. To the right of the \"Transmit Message(s)\" textbox is a microphone icon. Click this icon and begin speaking. Your speech will be converted to text. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](33, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35, " Voice Activated Commands ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](37, " You can activate commands without the keyboard or mouse by using the \"Speech to Text\" converter. Click the microphone and begin speaking. Your voice commands will initiate the notification commands. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](38, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](39, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40, " Here is an example registering a channel named \"Jupiter Station\". ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](41, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](42, " 1)\tClick on the microphone icon ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](43, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](44, " 2)\tSpeak: Computer, register channel \"Jupiter Station\" ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](45, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](47, " Other Voice Activate Commands ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](49, " Computer, subscribe to channel \"Jupiter Station\" ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](50, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](51, " Computer, unregister channel ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](52, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](53, " Computer, send message ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](54, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](55, " Computer, clear text ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](56, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_base_help_dialog__WEBPACK_IMPORTED_MODULE_12__["BaseHelpDialogComponent"]], encapsulation: 2 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NotificationHelpDialogComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                templateUrl: './notification.component.help.html'
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"]]
            }] }]; }, null); })();


/***/ }),

/***/ "./features/notification.module.ts":
/*!*****************************************!*\
  !*** ./features/notification.module.ts ***!
  \*****************************************/
/*! exports provided: NotificationModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationModule", function() { return NotificationModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _notification_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./notification.component */ "./features/notification.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var ngx_motion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-motion */ "./node_modules/ngx-motion/__ivy_ngcc__/fesm2015/ngx-motion.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");








class NotificationModule {
}
NotificationModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: NotificationModule });
NotificationModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function NotificationModule_Factory(t) { return new (t || NotificationModule)(); }, imports: [[
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
            ngx_motion__WEBPACK_IMPORTED_MODULE_3__["AppAnimationModule"],
            ngx_motion__WEBPACK_IMPORTED_MODULE_3__["MobileTechModule"],
            ngx_motion__WEBPACK_IMPORTED_MODULE_3__["MaterialModule"],
            ngx_motion__WEBPACK_IMPORTED_MODULE_3__["AppHelperModule"].forRoot(),
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild([
                {
                    path: 'notification',
                    component: _notification_component__WEBPACK_IMPORTED_MODULE_1__["NotificationComponent"],
                    data: { debugOnly: false, title: 'Notification', subtitle: 'Notification System', show: true, helpTemplate: _notification_component__WEBPACK_IMPORTED_MODULE_1__["NotificationHelpDialogComponent"] }
                },
            ])
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](NotificationModule, { declarations: [_notification_component__WEBPACK_IMPORTED_MODULE_1__["NotificationComponent"]], imports: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
        ngx_motion__WEBPACK_IMPORTED_MODULE_3__["AppAnimationModule"],
        ngx_motion__WEBPACK_IMPORTED_MODULE_3__["MobileTechModule"],
        ngx_motion__WEBPACK_IMPORTED_MODULE_3__["MaterialModule"], ngx_motion__WEBPACK_IMPORTED_MODULE_3__["AppHelperModule"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NotificationModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [
                    _notification_component__WEBPACK_IMPORTED_MODULE_1__["NotificationComponent"]
                ],
                imports: [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                    ngx_motion__WEBPACK_IMPORTED_MODULE_3__["AppAnimationModule"],
                    ngx_motion__WEBPACK_IMPORTED_MODULE_3__["MobileTechModule"],
                    ngx_motion__WEBPACK_IMPORTED_MODULE_3__["MaterialModule"],
                    ngx_motion__WEBPACK_IMPORTED_MODULE_3__["AppHelperModule"].forRoot(),
                    _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild([
                        {
                            path: 'notification',
                            component: _notification_component__WEBPACK_IMPORTED_MODULE_1__["NotificationComponent"],
                            data: { debugOnly: false, title: 'Notification', subtitle: 'Notification System', show: true, helpTemplate: _notification_component__WEBPACK_IMPORTED_MODULE_1__["NotificationHelpDialogComponent"] }
                        },
                    ])
                ]
            }]
    }], null, null); })();


/***/ }),

/***/ "./features/settings.component.ts":
/*!****************************************!*\
  !*** ./features/settings.component.ts ***!
  \****************************************/
/*! exports provided: SettingsComponent, SettingsHelpDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsComponent", function() { return SettingsComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsHelpDialogComponent", function() { return SettingsHelpDialogComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/dialog.js");
/* harmony import */ var _common_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/appConfig */ "./common/appConfig.ts");
/* harmony import */ var ngx_motion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-motion */ "./node_modules/ngx-motion/__ivy_ngcc__/fesm2015/ngx-motion.js");
/* harmony import */ var _base_help_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./base.help.dialog */ "./features/base.help.dialog.ts");


// services





class SettingsComponent {
    constructor(ac) {
        this.ac = ac;
        this.isViewVisible = true;
        this.dependencies = Array();
    }
    ngOnInit() {
        this.ac.waitUntilInitialized(() => {
            this.isViewVisible = true;
        });
    }
}
SettingsComponent.ɵfac = function SettingsComponent_Factory(t) { return new (t || SettingsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_common_appConfig__WEBPACK_IMPORTED_MODULE_2__["AppConfig"])); };
SettingsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SettingsComponent, selectors: [["ng-component"]], decls: 92, vars: 17, consts: [[3, "isViewVisible"], [1, "flex-container"], [1, "flex-item", "settings-feature-text", "app-text-primary", 2, "height", "475px"], [1, "settings-feature-title"], [2, "width", "170px", "text-align", "right", "color", "darkgreen"], [2, "width", "20px"], [2, "width", "20px", "color", "darkgreen"], [2, "width", "170px", "text-align", "right", "color", "orangered"], [2, "width", "20px", "color", "orangered"], [2, "width", "170px", "text-align", "right"], [1, "flex-item", "settings-feature-text", "app-text-primary", 2, "height", "200px"], [2, "margin-left", "100px"]], template: function SettingsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "view-fader", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "table");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "td", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "ASP.Net Core:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "td", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "\u00A0");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "td", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "td", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "Angular:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "td", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "\u00A0");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "td", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "td", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, "TypeScript:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "td", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, "\u00A0");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "td", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "td", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, "NodeJs:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "td", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, "\u00A0");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "td", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "td", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, "V8 Engine:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "td", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40, "\u00A0");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "td", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "td", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](45, "RxJs:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "td", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](47, "\u00A0");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "td", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](49);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "td", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](52, "Moment:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "td", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](54, "\u00A0");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "td", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](56);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "td", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](59, "CoreJs:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "td", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](61, "\u00A0");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "td", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](63);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "td", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](66, "ZoneJs:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](67, "td", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](68, "\u00A0");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](69, "td", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](70);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](71, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](72, "td", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](73, "GoogleMaps:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](74, "td", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](75, "\u00A0");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](76, "td", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](77);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](78, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](79, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](80, "Settings");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](81, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](82, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](83);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](84, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](85);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](86, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](87);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](88, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](89);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](90, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](91);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("isViewVisible", ctx.isViewVisible);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Project Version: ", ctx.ac.appSettings.buildVersion, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.ac.appSettings.aspNetCoreVersion);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.ac.appSettings.apiVersions.angular);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.ac.appSettings.apiVersions.typeScript);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.ac.appSettings.apiVersions.nodeJs);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.ac.appSettings.apiVersions.v8Engine);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.ac.appSettings.apiVersions.rxJs);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.ac.appSettings.apiVersions.moment);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.ac.appSettings.apiVersions.coreJs);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.ac.appSettings.apiVersions.zoneJs);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.ac.appSettings.apiVersions.googleMaps);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Debug=", ctx.ac.appSettings.debug, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Testing=", ctx.ac.appSettings.testing, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Splash Time=", ctx.ac.appSettings.splashTime, "ms");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Online Status=", ctx.ac.isOnline, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Standalone=", ctx.ac.isStandAlone, "");
    } }, directives: [ngx_motion__WEBPACK_IMPORTED_MODULE_3__["ɵa"]], encapsulation: 2 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SettingsComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                // #region template
                templateUrl: './settings.component.html'
                // #endregion
            }]
    }], function () { return [{ type: _common_appConfig__WEBPACK_IMPORTED_MODULE_2__["AppConfig"] }]; }, null); })();
class SettingsHelpDialogComponent {
    constructor(data) {
        this.data = data;
        // data contains values passed by the router
    }
}
SettingsHelpDialogComponent.ɵfac = function SettingsHelpDialogComponent_Factory(t) { return new (t || SettingsHelpDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])); };
SettingsHelpDialogComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SettingsHelpDialogComponent, selectors: [["ng-component"]], decls: 2, vars: 1, template: function SettingsHelpDialogComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "base-help-dialog");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" Here is where you will find help with the: ", ctx.data.subtitle, "\n");
    } }, directives: [_base_help_dialog__WEBPACK_IMPORTED_MODULE_4__["BaseHelpDialogComponent"]], encapsulation: 2 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SettingsHelpDialogComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                templateUrl: './settings.component.help.html'
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"]]
            }] }]; }, null); })();


/***/ }),

/***/ "./features/splash.component.ts":
/*!**************************************!*\
  !*** ./features/splash.component.ts ***!
  \**************************************/
/*! exports provided: SplashComponent, SplashHelpDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SplashComponent", function() { return SplashComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SplashHelpDialogComponent", function() { return SplashHelpDialogComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/dialog.js");
/* harmony import */ var _common_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/appConfig */ "./common/appConfig.ts");
/* harmony import */ var ngx_motion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-motion */ "./node_modules/ngx-motion/__ivy_ngcc__/fesm2015/ngx-motion.js");
/* harmony import */ var _base_help_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./base.help.dialog */ "./features/base.help.dialog.ts");


// services





class SplashComponent {
    constructor(ac) {
        this.ac = ac;
        this.isViewVisible = true;
        this.image0Visible = false;
        this.image1Visible = false;
        this.image2Visible = false;
        this.image3Visible = false;
        this.image4Visible = false;
        this.image5Visible = false;
        this.image6Visible = false;
        this.sequence = 0;
    }
    ngOnInit() {
        this.ac.waitUntilInitialized(() => {
            this.isViewVisible = true;
            this.switchImages();
        });
    }
    switchImages() {
        setInterval(() => {
            if (this.sequence === 7) {
                this.sequence = 0;
            }
            this.image0Visible = false;
            this.image1Visible = false;
            this.image2Visible = false;
            this.image3Visible = false;
            this.image4Visible = false;
            this.image5Visible = false;
            this.image6Visible = false;
            switch (this.sequence) {
                case 0:
                    this.image0Visible = true;
                    break;
                case 1:
                    this.image1Visible = true;
                    break;
                case 2:
                    this.image2Visible = true;
                    break;
                case 3:
                    this.image3Visible = true;
                    break;
                case 4:
                    this.image4Visible = true;
                    break;
                case 5:
                    this.image5Visible = true;
                    break;
                case 6:
                    this.image6Visible = true;
                    break;
            }
            this.sequence++;
        }, 2000);
    }
}
SplashComponent.ɵfac = function SplashComponent_Factory(t) { return new (t || SplashComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_common_appConfig__WEBPACK_IMPORTED_MODULE_2__["AppConfig"])); };
SplashComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SplashComponent, selectors: [["ng-component"]], decls: 17, vars: 8, consts: [[3, "isViewVisible"], [1, "splash-feature-title", 2, "font-family", "px-neuropol"], [1, "expand-visible", 3, "isVisible"], ["alt", "", "src", "data:image/png;base64,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", 1, "splash-feature-image"], ["alt", "", "src", "data:image/png;base64,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", 1, "splash-feature-image"], ["alt", "", "src", "data:image/png;base64,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", 1, "splash-feature-image"], ["alt", "", "src", "data:image/png;base64,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", 1, "splash-feature-image"], ["alt", "", "src", "data:image/png;base64,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", 1, "splash-feature-image"], ["alt", "", "src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAMAAABOo35HAAAAO3RFWHRDb3B5cmlnaHQAwqkgdGgxMzQxIC0gaHR0cDovL3d3dy5yZWRidWJibGUuY29tL3Blb3BsZS90aDEzNGhB9R0AAAs/dEVYdFhNTDpjb20uYWRvYmUueG1wADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuMS4yIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj4KICAgICAgICAgPGRjOnJpZ2h0cz4KICAgICAgICAgICAgPHJkZjpBbHQ+CiAgICAgICAgICAgICAgIDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+wqkgdGgxMzQxIC0gaHR0cDovL3d3dy5yZWRidWJibGUuY29tL3Blb3BsZS90aDEzNDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpBbHQ+CiAgICAgICAgIDwvZGM6cmlnaHRzPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43Mi8xPC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj43Mi8xPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpSZXNvbHV0aW9uVW5pdD4yPC90aWZmOlJlc29sdXRpb25Vbml0PgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+5FsTHAAAAAd0SU1FB+ECGg4mJKHrzOMAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAEZ0FNQQAAsY8L/GEFAAAC91BMVEX+/v7x+eTj8dTu+Oj6/PTV6cS00pKcyGKKvTOMvTuGvjOZxFOqynvK3bLz+uzj7diGwSyJvSuQxTWOxT2QxUGNyDyJwi2IwRyZvlbL3rj2+vLs9OLB1pyMvEOHyCaOyECQxT6kynTc69HG27OUwlGFwRuOxEKRyD2GxTGz0Yrp8tzc6sugxmOGwBTI2aXy9uuwzYOLxDOJvRyWwVzO4rn3/PjB2puRvESSyjWNyDXg68zS47uJvSO0z5Oly4GNyC/J3a3l8duJwSOFvCKYvlvE26mQvTqOwkmQxizU5MC81Zvw9eTj8MypyXSTykPK4K2605Sixmna6cT49/CFwSPj7dTZ5cObw2Pt+OWrzIKHxTyWvljR5LWkxnPa5svX6MijyWySvUvD2qSaw1uTwkuox3nf6tiGvCq41Y6205rD1qqnyoidxWru+t+ly3mFvRSy0ITZ6L/A2ZaxzonM4bOLu0qKvhShymTo79euzoiv0YuGwQDt9Oi92ZuDvB36+u7f59KbylrR37KJwBO72pTw+N6lxXqEwAieyGzA1KO91qGCugmw0n+ZxUuZy0p2mUJ3oECWykmby1KWyVN8nEtIVjU6NTQ7NTpMXDZ9oUuZzEV7nENUZTWOtVNTZDk1OTJERTxISDxAQzVZbTqMs0yHqFRBPUE1NDRUaDaOuFJmgkE6OjRIRj1FSDyTvFJhfD1GRkE2NziQtUtykkJBPDtCSi1tiUFDSjQ8OTo8Qy1rhEOY0EdNYC9NYTeEqElLVjp1kUqYzD2Js0ZSZS9eeDJccTyQtlJqhTw5Jzw9Lj5GWDRANkI1Ny09OkI8QjNWaTp2mUk+SzNxizw2OTnp8dRRXDg0LDRFUDhMXDlthUq32JLy9/RFUjRxjUcyLDx4lkaHt0dXcDs8QzmOs1lZazZ2lT/B4KVjeEOhz1h6k1KHsEl7oj6RrlorJimaumUwJzaRsV1wf0x7o0FcbUSg0VVgaUJcdkB6lUuBn1Wq0nlacTJGVCyu0YWvqMhrAAAAAXRSTlMAQObYZgAAHx5JREFUeNrtXXt8VMW9D7DohkDM7szZIKjnQMOMJChsIMImW8FNYXnoAWEBeaiExIt4KVYRq9aC9OGt1qzdAImE1zkRgpBdOGAkK2gQW+BaAYuA1Yq1Untt0dv22tb29vaPO3M2j33vnn2d3c1+5ZMPkj07c77z/f3mNzO/mcnLS1to5D85hMO8ygmzV04ZWJojKhIqht9Sa6geVVy8In/w3Aq1a5PeKJy9v8jIsCwE2FSkG3chp66QqJh7Z7kJQsgRAI7DhrXPzFK7TmkIWUEX/qWbziHOC+D746uG5dx8IO56Nt8ySY+gN1kQTreNKKvI0eWLwtl1N5msxAT1nA9YYNCOvk3t2qUX5t5pZlkAAeB8lMUx5P+BJX/qWLUrqDpk26LhwWNrphl9SeqxQ/oDg+raqlyEKr/+XQ8jA8MGJ8vTL2Ju8opbKzUeZvsyhlUtrCZuPTRXVF1Az90waOWTatdVZWjKRtxkRFw4rugvSdAFmWLr1EK166sWTfTHbWu0BiBbGuDCgYoLQ1P11VV91hDHTp1o4BQAwsmDxl0j09zXfL3m3qvL2bD25w+MAHODbmYfdF3XLLIshkCvgCuOITErBLqC2f3Urnxq0W+m1gCpYSlRFg1QyR9Qvaysr5ghec/1Q2osQAlLfpwZtWseI1/UFxjTLPh2kR7GQxZnskx7OPsnb4gYbn9uhVGR8QUCIB7YCujkTXaj38P5BsyhOHRFpQUwB03rlo1U+22SBhpOzntkSTHDcXEKq4sxbLj+qlIq1qz0XRVPjTAbGZAQqmTXBR7lHhibl5Xj69LRBoOJRWyCuKJ0IZOtdkZF9kmr3y3TbAhBHoD4/JUPGM5qLF+dba5rWNVCHZDnPRMJYtF6iAzaX2VNGEGXGypXj4o3XAhtiwAX1Q35MFsG16W/0hkRkySuqJ/HJvOyh7LCy88bAm1WjlM2ClRKGDToFvVX+03jhmbBqnWA0wPEJdCv+zMFMWKwbtozGTwbUUEMo/K+cmMSFeXDGRg1dAidd85Qe5w1UzsqqebnQxbHTC5fNpJSlYGufljVfjPDovhpiJYthNjpuqsycfmahAvrTCmTlQxM14BGWZdnXNR14Vu6yXK4kFK6SGnQZK6dQCdvMsEW5WX2Hz6DbCTATuAwUAGsxkfvG5kJVHn4mlDwICC9U2pF1QOAWIPtqiczQloVc0eYjQgmL66KBIjIYN0GMyHzpv8anQEmcmZBubLoaAGiFbUz0lhbdMqycGpNEZPaPjAUZdC47rn5csXSM0rVTFg4imHUVJUP8CDtnHQNIzTz79YRb4HUNcJuUHVjYCuZkpZrQMNH04wYyKU6tAoNhDDHlN85MK1cF/UJhVNKFGXEpIwwxqAddyGt1oA0M8aUT04Lvx4AyGHL9dcNyEubkP7C49VG3mpKB1flD0yMkTUVF1ybJkmDY2fqboCIm5Y2vsobgIW0XovNyx5SmyeC9Y8srAZYbU5CAnp+AM6o7t4DOV1x4J3yVGg6isqPtUm2mptneRab1CHrtnHmG1H6EyWTxQJT8cIJqkVdA5ZrDVbWpDYNUZIFEQuM5fc9pUqnWFFVW86SsC9188bxAWA9CW4M+XOGp9QQ5QDvqbur02cUqISzG2qmfJhat1U6R2vBNKVM7XdXDkZvXjUwhRMR/abWFDOIS9+AISwAMJrHXZMiqjRVtcUmOSc9nixaNQGhZdDMZC9fy5ZeeV/cCbTqAwJLyezCJHp62a8PWDnNwCjaF5GuALZVZXnJ7BgLr91fPAklMckjpTAOWtM/edJ66EffIX49E7vAIAAk6tLl35L4eWeZ//7/WmGkCew4O3RFV4E4rCuZnYQR0KzvTrPEmeufhkBosu7pkYmNujSaa0t0TNIyHdUDGTAyFuPXSxNJ1txlNj1OdK5xOoCMQSBGlrrl30xUv1j6hHax2m+VHEAkR0EMMCdo+XrszfkWFTMXUsSasXpwJdFWfN5Ls7TWpmeznCoChinSzonPdWkql5UbQaL2caUxEKQDRuuUODJvSu/PvxFiPlOm9+IBgCTsMt206t6YXFcFzYix9AVVeeB5S6P28du6Xl+RBZaN103qI0R5w5C/XPFshObaQUWYzZCVmwQCImbdIqVTXVPKjQjS3YFq1z7FIO8LigYXKjLDe3QMpudNqJVEqxrokUqTbE8oMEPNrG9k/mRoHGCrJygQ1teK0zN/KDWA8IYfRT9voxmRlolpKSOLMxkqoyZrFpfGeTHJB8DIsDxqskau6GudoC8gZ1gTNVkzzGpXV20YRisgS50tSukDBWQtqO7DfaFSsmaY+zRZUBlZfVtZObKSR1bODHPKypGlOlk5M8wpK0eW6mTlzDCnrBxZqpOVM8OcsnJkqU5WzgyzUVmQS8JJEtlHlmfzs17PcXouwXmJ2WeG9Ex4ni/hGYgSvSCclcqCb752YjuPmUhXHOXIIuA/f+/ts0dONjAJXhHOPjMk7+T40u0Sz7s+KrETkwSJc/TZpywIAP9lk+hyCU3HtjbwANDt9Qn66iwki6VkCS5BFHbu2F3PAxaxicm9yz4zlJXldrpckkt0CW0nDjVjABKTV529yiJMEbqk9leP7HckKE8xG8nq8lnkD1GXILjP7caJ2QqSjWbY5bO6IZ75J8yZYSiyunxWD4RjNQn66iwky09ZkvC+NTEH42SjGXb5rF5lvWBNzLCnDyjL1ZojKzRZAT7rfXXIyggzzClLAVk5n6WArABlvT4xMYcpZKMZ+vusnBmGIStdlJURZPn7LLWUlRFmmFOWArJyPksBWemirIwww3TxWTllZRtZ6eKzMsIMWX8zzFJlJeDru3yWICpUVhRFJ5wsiI/zMZ7oQ76bNRmMMbEGPecaylfWAMfnRFmCImVBDHDXAY8wXCGJMkN6JwRp1frOLw/ZGU+1Fb0ueZ411/5rmc7IIqUn40HyNMvxdjs9ygQRn+WK2mdBeo4RXszbr/9NPR++1AQqi1ST4e27Pn3rrY6XS3hWWQoLBog1WfKX98ubN+NqG0saWsHTEBJZcPyGL1/8Z6eD0MVv9SUrrLIIuYgBR/cfeeXyV2uP8iisHBJGFgSM49CRtlZRlA5e3FRwnFH0vrxpuu4Jz6lLs5Zfb+F4BUwjgAFLmsn9duvOE7vsGH/eFnWcRYgGer5+66WDktPdcrigWZ9cM+y6aAQ3D33jXJNIqimJLe5PrzSw0Zmi/BneuOLuuZo8jefajdLRWoMCQ0QYOPafamt1kcJbWo4M/Wvn+eh7QwiOF3S+1CQ5XYIovXVpS0PoZopfWVA+FwMCvmHLaweJVyWFCoSu1rYDdXZqTNSJhKOKdPUsAN8v+N76nmI0eRVlT1cbqTKZSMbMIg7om0t+d66RhlakZKnx//7wWXtUPguygLg6+6GvDraLcnKESxQOvnOFWDIX9LSP+MmiaReI4Zu3nzjtdPY2qCi5L79R10yoCH88LuEaQu3iZ/3PICycML6Yg8gaSVUMY+XtnRebejo/ySW1+XAVSlnA08Ylhy+3d3R/1CkJLTv3TWxmUDDfFb8ZYlKiiS858mqrJDdOD1tOqfHYP4i4wiVHIY502EbzuPl+BdGTlwY8O83CMGGzFOSc5OZdX5Fm8lquFySXKxplQWK/9T+51CZ4PUzYEt0dLxccxzBQWwkwQw476p8/1yZJshl0FyoSB+IUGv+5a0P4yAVzg+4cOKyboF6y6OXA/b+VbwiTAEPvM+Cbaw6fbRFIy3g1kyD4khWgLM93Amzf9dLbtI17Pu/hTWq72FlwHPh+Om6yAD3ejVjB+wcFOnKVxJ4hGekSie9ySu1n95U0U78FYECiNQnLWGCZOHt9yPI0c+826wEj39/ozxPk9Fz+0bqPL7kFHy1JrojKovlaxPjtNQd2too+H6Vxv+B0utrPn1hr5xhaacyBGMnyMUN6ISzLNJ/8rLHF6QoFqanj4/qjtGP0VzUJrZBB//XhYUssnE0PuobIv48gREOWNNM7jS2SKwIClEXsD0De8XKLW3SJIR5qbztVZycfAzBmsnyURUJuhvjHV5skMXRNJUloOtZpdwC9/y0giLnRPDjycVTDf6A1kojTr5sgmgRHT37W1i4JrkjwVxaNeJv5zs2NNFwIXfGDv9xU72AAgvpEkEWMfuOWDneklhVFofHEXge9ZcpXWY+umjEvUonUdc1fpJuu97MkaLIXvNvipjkyYiS6ApSFiLP6pNEpnKMZb0Loaje9c6We14NYfZaXGZIAyU6DOSrk0FZIfkv6clf72VNDSc/mY8TWqfPyorvmUzNw1XTk876A37jlEmkm4svFjkjiCvBZzfv3yZIUXGLYB50kWNxu7y04DmUhvOt0e/jSXDKPAu2g9rxYwPQ4HpYeWvxU1MWSMGLZZNa7zvyhT/YIrrCtFEJZ9OE3O9yyoiLZBLFS9yu7j8fvs4jn4w+0R1NXT7lS29peD08Gysb/XR91sQSzi7w1jes/aYq6aF9lEc9pP3FG6ojyWan1pyXxmyGpMU9GFZHda3ep7r3Y62HO8IQSrvKWVmOv98XWzU4xojBCKmub4B+Khan3sZqei0xiVxZkHFRZAYWKwW3Def633rEDNKxRdJjs0ge9zRCv3dwihXA4gRT6+yz+nRbBqwMXu34E/zrnRWtPI8fus1juqK8Zyk1NQuC2drdAB4l+Sm/b7kvW40FLmHVNcH+/dJ0XWYBbe8xXGvJ+CpezvVWSAkY7fr0h4Bw7BMGrkWU3LzkFt1tySpJf84utr1sTEJQy/j7LSbtb0X3xH7sOt7TTmQffBidkebdvUTCySAg6eaVnSO3HWdU6L5/FcWs3kwKcva9L31gUDn724k5BDFCXr7IAdLzkzbST0Ox0ijt/vvXvr5whDe5nKtL7MZNV7U2Wn7LoCPZMx8cFPN986MROQfJte6c/WYE+S1N25ygWFefPDHKZUiBZ3tYuD+je2nbF3rBlM9GHn7b8lAUd21p9DUJytp/9qOSoY8mps+2i5PswTXVOBFm8vxm27zxVY6fjRYd99+uNvk3kr6wAM9RcWKMF8r1QxqunfKiILOq+ms4939CM0PH6j151hx0b+ivLJUotpz/b68DIhO27Pz0o+Pou6QUrEyNZ5jDKcrZ+usvO08us6WxA7d9f8alzJGUVztxgoA6FuCZgXPHchYhkebMltr96agmNHsnQ137ywOkWn8A8vLJc0uVtV+pZhq+vtS/m6ztf6HkpeXau9fW6hJihr7JE57ECR++0O/jrJp9Vg0jKqvyx92/X3a+ILOEv249yoHvi5a+dFwUpZAJugLLcRzbwerzhj3/7259/D5njG75ql/2vk0hOEtvPdjqS4bPcH9i9uMLM3rPeVYqkrHvM3kNl4xpFZDUdOmrsmXZCZBjm4wMiKKttF2+qW/jB5bdb3P8ztGDx0S/30FktWZvtjX/ZzgMUY+gQpjcU2081917zS4bNv7nsXeOIytJ5Rdlc0WhFZLnfxKh7ugwDhD9v9I4AwitLauvE/B9d54UOEji3fIHhpjbPZITobNrReZRHvatUiVOW2HTK3jvrBFj2+suCV4cVSVmVK2DMZEk7r/A9y5QQYX5ro4+DD98bNr6J+S8aSZdI+ok9u2Hz1tNOOsgW3R0fO3i69OtdcKJ8lvuwvZcNANjftKRKWVLbm71fDCHgP2+UvHQXwWeRh/Gf3Z44vmm3g9vUKJKuqbXtiNWOOZ91i8T1hoSs5t46IQ77khVJWWXm3nkjgOMhCwAHIctL1eGVRR4mymoSOujW18bd2LHVLXUIb710ZSP2Xz1IqLK8yAL+ZEVUVnkvWRgYlPmsQLKEqJUlk/XHP0lOl1MS/7Sbb36+UWq8uKUhyMXhCfRZ8SnrKR3bXSEO4mpFoQN9X39lhcyiCfBZ9OElnzW1EmW99+J2Hn/+3y3vbvT0gSAussxJU5bmGa2FowvMJIIA08dUKiHL5b6CZefi6RKJz2ryCR3CKcspHTyEGTjmi4tvvX3si6tJUFXXuba5exEdxENW8pSVVzF3NbJiDuuRceLyAYoG0uLB3cRqOIDoMhCD4O8/CpNF46+sjvYPah2ItY/5wxurGuTkMD5UCk/a+CxK19KNNmA1PbomyHWCYclyujo+qLNDmqIA9fzRms8u+yzbBChrm5eyBFE8s7mzAZtYh4PTdx3FEmJhN3m9IRNEWV6VCJiioVIq/a+NttX30L/5TwxGGBtKZy5tIuNoCLC9/nCHW/CZlRLCO/gOsbXtxK4NpHbYs0s/5CJ48pQVJM7yLjjY5B9hqHLBsKDLPeGnaCRRlN7b0Wnn+YZNxxrlNXjfgbRXwYCtf8nHwdNBYHvbvv12eRk4XKJTsnwWy8HwPivETGkoVK3zyS/xI0teiGk9/bMlv/10T+CCU1gz7BKfq7HjdwXNNBk2zAlliewNT9nDKEtsOdn7uuRvCi6w8VdWN1m+01aiUzrTcfmyM3AFwHePNCFrhz9Z8qy0+/0tdp4Ldxth6npD4WSvskBCyPJ5X4mE3aJIM4YCyXqhxq83DLK2I0iitOeTQ3YMkkOW30xpeGU5W076mqGypbAZEcyQ5r84BSHoCg0hy1tZbK+yuj8uybPLotjuPlziYBNFlncWjZeynNRJ/nrrca8VGGSqe91NUya7l6za93o7eKD/dkW0l3bSnnFqsXeLY+vPW5yS//KVFLguJ8lH97xQB7wny+wn5IlnSejw+7zTJbk7Pi5w0PtmcZDkztiVBbleZZFWbW87UuBdJcTwu37aJDjFDrnhJF+yWADyZxeSb9REw5cmb2Bz73fTaxntH/2aJrBFTB6g1iW89wuH9ysD/tCl85Lk6hCCrNKKwp7Xac4PICOJBGb+9ZBFNdzqPvFmA8DeukP4eMGmS009K3HEZ/X+EmCAy58eGWWxw1fme91BSYMhUL91c1PAMk4giA87eGyL3btipHBHyeFz7uDpJKQJWg+e2GufxAS5HDRmMwQc5Pd5ksFEoel9EgNj6DVQl0ehbHPNB3StpSPADAEZ7nIG3a+GR7Eq/eGQumJg1XtVmmiMPV53+GybGCENhgj+3LsFdh+N0JpB+8kTba0hmKau68h+OxM45IldWYj6LJF0Qs72jl+UOBbLAYoXWTRlDrDNaw80torEbzlb9nolmMsegeVsNTcXRjLBe1fpTBzwD6vJCLB514E9ghAqj0ai+eXC+QM1jkkAcd4Ti/L2BtzQ+Y4nET3Ay9EY1/3L5x0JJAtDU/OBVmqB548MbQ69mcLa0LmjUZAkuTcM+JTJPGZGRSg/X0H+/cLjRi0O8eU0pfs9Ei8EcevycoPQtGN3AxMiCR856jf9skkSg6bTEGM8vTbu+SzvZDYTv6/NJRw8scvBhclWByZHwfNCEwn6Th4PkurMGnXPzQ957/esh6fZiA2FCKoRf7zgF+eagloT8f5vn9tqd5hCkUWHPSXvnj3TnRbiTbXT2dp4oF4fL1leZmhlHaf+862fdzZjlkYMIaUFAOatp1rePn2SD+QU4GmcAT37ZNDSCieMX9E9DxAMLLEve82RtjNBndXZw3XNLAtCblmAiMGOmgPuVtHP7xFVnn5ntz2hOywgxG/+9OV6frHc7iG5opnuHLTv+tmBkklBlEW6Nsits84OtERN2bJRRnnHAQShvpqy3XzoRJv3eFBOeZIOHjhp9+Swhjh2E3J6iCC2d+7oSu8We6hqfG1Tw3GE4vZZvjsseP5odNsoSczSzMOQhHKgetlcr+RSTddeJxzFd0OaXvpak1OQB3g0OZr0zu7XOzfyUe1eBXzD1mONgkiGSZ69P6K7442C4zDEx+PJVuai33Iq73gK+Ts4edATj3kiepmywgcmGgCOYkMs3QEH+ZKXW9qdlCfq26XWV7YWOKK9HJw8XXe4w+0UyLi8w+k51pRdnASyoj2cPqp626zLf9jl6ddXLdQRzxzVYzS+JRH93n1tgtNJukZXa9u+Grv8r9EBsmzD/gM7SdTllFoPHjjkIENpqA/+0Tg3OsEoD5cFEagljs80augEOSn3oTvMJoQ5GGVTIBqDYfv2HTvJQLql8cVddgaxOErJA3mjFm7YvW1nS+uel3ZvJCTDUJtw02P3PY05IQeNltVzx5bOud4AGS5a1cobPehJ5vzGTZsbm17YUt+8GHB6pOBxUhRDXNe2bVsK6N45utUwncnqrgtjmFYPLKZYjqwgD9tLnv9JrSOWIxwI29MaYJ0jQsnpdQgG3ZETcwmQYXisZxRv+5dZAPIeUxTpY+mjLJowiPSAi/GeDnrBB0VshdMdwPoI1zikE1kkDNBDGgvE9LAnkEFR94J+j1NRsYlVVgacRZNEpJOy0h45spJHVs4Mc8rKkaU6WTkzzCkrR5bqZOXMMKesHFmqk5Uzw5yycmSpTlbODHPKypGlOlk5M8wpK0eW6mTlzDCnrBxZqpOVM8OcsnJkJYEsmDPDZJHVx5WVM0MFZClT1ro+TRaAUMGe0tt1OP4iMxcAKdmAO7bEqHaFVQVkyodETZZmkaEv2yHEwDA/arLyBhZBEH3WdNYBa5+Lblu3jPWri6LdJpBtoDuVGXPkmxG88JjVGFuCbOYDcODHX1MgLIK5+X2TLZpEve7ZiihPV5BRkZdXNt4CMIeU7AjLdMjvCSave0aRrGTMuj/fQC8NiXYvUeYDMACCB390j3KuiLxGrjbrOT2EfcUcSchQXHLt2Fi4IlY7b8HC/+gzuiLuyjJt5V3KXLs3W3ljpwKDHobZ7Z0FgF0/jdpbR3a/d4woHa29EXM4iyNUKB+SYLItnBEHTd2ua+6yUYuV3jSbUYCIZYsmTp0XP1cE86pqbYm5zjo9AUwG7Zwn4+epC2OvA9Ug1i1+6Q5otDxdmRBVdaP0qnwj63/9YEbD0/aABUULq4YlkiqKh8bYwESYRfoCCEGAbNN+8MNEU0Uwb0hdMYRM1nSLALGM4fujhyfUArtAxovD79daojuzIgNA2n2yeUSZfBxHMvjKy5u/SGvMhuEPPTCNKV7yvYQ7K199Ld1QziAukweMUN74Dwz5350VPx/hoKEjoDoLAzLcGhFTNK6/olmrWDH8Kq0BxHyyguqgp9AU1S5IPk95niP6nhqsM2QsWfSkpdnzUqGqLqyvqh1l8pxHkUnei97qgIq0K5PsrALQb6rVlmnTqBCyYLJt0TUppoqidDSxRS7Gc07UAca6hQtS4tf9oMnTlI3QGTmQOeNFqJu4nM4aK7klNoGEPVKwjqHaiuLYPjVBqwihUTv6NlVo6saT351ogxCl93QXiXOA1fTgsrLU258f+j+uK4rylEO1AAE76TvjEz8RoxiavIp7lpXr43+jJHIFGUPN1AF5UR5Ln0RQZznskaE2LpqjWVNOE6DhOjbk09NR1XLsARg+U2uBCHCYjf8NEwkWAxaY08BZ+UAzf9EKOnmTXvKiR4GbSx6JdBh96lGxYEz1pMXppCzadgbtzH55yZrdi5kqUp+xN0+0dVVTbZ66jvrW6xbNl6lKE2/lg9KrtAYGQKTn1I4lGFI+Q8Y26SUpX2jKBpcv5lh6O53awkJFE6emn7Pyo2vGwmKTSe3JLjq2mTNcbS4iUUVd1wM1OkbNwSLEnPHB1QqSs1Vl7LHHzUYVpwUxs2IVzYhJR68ejK6ybxcbYz08OR5NQchCWGS8Lt2dlS8KJ4y3mVLvuEy81WAYne7Oyhe0w+533VpLqgMuaDU8ekdiM2JSxdfta3RdG6ZSxBkEhvGPqD8REyMeWniTyZoCNw+pf4TAgh7OLAv0xbApJTYFV5jEDIAAY9R+q3+GdIChMPwq7XSUZLIQPY//wVUDM89Z+YLUv3K1LY4rK6IAsUDG8o0h8+TSMlxbZAS0qthI72FI+KKZPH8GAGfJn/lNtd8yYej3QJ2FQSgZUxGYsxp1/56B4UIYlK7UTk98hiVdEGeqx8zI2HAhKMgAu/KOFZMTboaYM5R4JmKySlokjFg6vprRe24Iit8e6ddgMH3F/anOiEkVZt2CigBdBKqLf2qQARBqy+/7N7XfKYm4bZz5RoZFKP5+EXEmW21VpgcKoaGhN7vfu8xsnJSIbtFSs1xeZFb7rZKKwqVLLCYYr9syDhpdmpf1XBHMmpNvQByMfRAEJ9909z1ZT1M3+i8atZjlYpl2RogBaNSSpfPUfoUUQrNgoS22NQ3MFGmvu0vt+qcOchc2b7bVJm8mVua7oLF63Py8zB8vK8XwOfk3IspXNDdBU5OFgGV0d87tazx14fY7ioyYAdHYIwQIQn7U0Nn9+p6qPNBUzBivI3KJhiyWMVm0M7N1bBMVKsZOnVZujcJtIThdd+s12R9WhYb86reN1lo4EOagDbrjDTPV36jqw0z1QFN5602TAQLBklLpdDSEcJJ54pTMWmROHjRV480mHHSeXv43w6Cvl/aBkU0UoIk3eQNumWgINryGRFumQSMq83JcdUGmof84g7FreA29ZAVB+fgJw/LU2JyUztCUjblJLzt6jDyUkf/YYnRzTAdaZT0Kv1YySg8RBHpMt6xDgG/UeSZicgiC4dddf4OehdCT2qXXjRipydlfUMi8XDO4SEeMETB6Q/HQa4flqAqPgVddrc3PH1QweEgusooC/foTDMhpKoe+g/8HTh2AHdLw7lIAAAAASUVORK5CYII=", 1, "splash-feature-image"], ["alt", "", "src", "data:image/png;base64,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", 1, "splash-feature-image"]], template: function SplashComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "view-fader", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Blend of Technologies");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "expand-visible", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "img", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "expand-visible", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "img", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "expand-visible", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "img", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "expand-visible", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "img", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "expand-visible", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "img", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "expand-visible", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "img", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "expand-visible", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](16, "img", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("isViewVisible", ctx.isViewVisible);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("isVisible", ctx.image0Visible);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("isVisible", ctx.image1Visible);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("isVisible", ctx.image2Visible);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("isVisible", ctx.image3Visible);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("isVisible", ctx.image4Visible);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("isVisible", ctx.image5Visible);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("isVisible", ctx.image6Visible);
    } }, directives: [ngx_motion__WEBPACK_IMPORTED_MODULE_3__["ɵa"], ngx_motion__WEBPACK_IMPORTED_MODULE_3__["ɵc"]], encapsulation: 2 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SplashComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                // #region template
                templateUrl: './splash.component.html'
                // #endregion
            }]
    }], function () { return [{ type: _common_appConfig__WEBPACK_IMPORTED_MODULE_2__["AppConfig"] }]; }, null); })();
class SplashHelpDialogComponent {
    constructor(data) {
        this.data = data;
        // data contains values passed by the router
    }
}
SplashHelpDialogComponent.ɵfac = function SplashHelpDialogComponent_Factory(t) { return new (t || SplashHelpDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])); };
SplashHelpDialogComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SplashHelpDialogComponent, selectors: [["ng-component"]], decls: 2, vars: 1, template: function SplashHelpDialogComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "base-help-dialog");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" Here is where you will find help with the: ", ctx.data.subtitle, "\n");
    } }, directives: [_base_help_dialog__WEBPACK_IMPORTED_MODULE_4__["BaseHelpDialogComponent"]], encapsulation: 2 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SplashHelpDialogComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                templateUrl: './splash.component.help.html'
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"]]
            }] }]; }, null); })();


/***/ }),

/***/ "./node_modules/moment/locale sync recursive ^\\.\\/.*$":
/*!**************************************************!*\
  !*** ./node_modules/moment/locale sync ^\.\/.*$ ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "./node_modules/moment/locale/af.js",
	"./af.js": "./node_modules/moment/locale/af.js",
	"./ar": "./node_modules/moment/locale/ar.js",
	"./ar-dz": "./node_modules/moment/locale/ar-dz.js",
	"./ar-dz.js": "./node_modules/moment/locale/ar-dz.js",
	"./ar-kw": "./node_modules/moment/locale/ar-kw.js",
	"./ar-kw.js": "./node_modules/moment/locale/ar-kw.js",
	"./ar-ly": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ly.js": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ma": "./node_modules/moment/locale/ar-ma.js",
	"./ar-ma.js": "./node_modules/moment/locale/ar-ma.js",
	"./ar-sa": "./node_modules/moment/locale/ar-sa.js",
	"./ar-sa.js": "./node_modules/moment/locale/ar-sa.js",
	"./ar-tn": "./node_modules/moment/locale/ar-tn.js",
	"./ar-tn.js": "./node_modules/moment/locale/ar-tn.js",
	"./ar.js": "./node_modules/moment/locale/ar.js",
	"./az": "./node_modules/moment/locale/az.js",
	"./az.js": "./node_modules/moment/locale/az.js",
	"./be": "./node_modules/moment/locale/be.js",
	"./be.js": "./node_modules/moment/locale/be.js",
	"./bg": "./node_modules/moment/locale/bg.js",
	"./bg.js": "./node_modules/moment/locale/bg.js",
	"./bm": "./node_modules/moment/locale/bm.js",
	"./bm.js": "./node_modules/moment/locale/bm.js",
	"./bn": "./node_modules/moment/locale/bn.js",
	"./bn.js": "./node_modules/moment/locale/bn.js",
	"./bo": "./node_modules/moment/locale/bo.js",
	"./bo.js": "./node_modules/moment/locale/bo.js",
	"./br": "./node_modules/moment/locale/br.js",
	"./br.js": "./node_modules/moment/locale/br.js",
	"./bs": "./node_modules/moment/locale/bs.js",
	"./bs.js": "./node_modules/moment/locale/bs.js",
	"./ca": "./node_modules/moment/locale/ca.js",
	"./ca.js": "./node_modules/moment/locale/ca.js",
	"./cs": "./node_modules/moment/locale/cs.js",
	"./cs.js": "./node_modules/moment/locale/cs.js",
	"./cv": "./node_modules/moment/locale/cv.js",
	"./cv.js": "./node_modules/moment/locale/cv.js",
	"./cy": "./node_modules/moment/locale/cy.js",
	"./cy.js": "./node_modules/moment/locale/cy.js",
	"./da": "./node_modules/moment/locale/da.js",
	"./da.js": "./node_modules/moment/locale/da.js",
	"./de": "./node_modules/moment/locale/de.js",
	"./de-at": "./node_modules/moment/locale/de-at.js",
	"./de-at.js": "./node_modules/moment/locale/de-at.js",
	"./de-ch": "./node_modules/moment/locale/de-ch.js",
	"./de-ch.js": "./node_modules/moment/locale/de-ch.js",
	"./de.js": "./node_modules/moment/locale/de.js",
	"./dv": "./node_modules/moment/locale/dv.js",
	"./dv.js": "./node_modules/moment/locale/dv.js",
	"./el": "./node_modules/moment/locale/el.js",
	"./el.js": "./node_modules/moment/locale/el.js",
	"./en-SG": "./node_modules/moment/locale/en-SG.js",
	"./en-SG.js": "./node_modules/moment/locale/en-SG.js",
	"./en-au": "./node_modules/moment/locale/en-au.js",
	"./en-au.js": "./node_modules/moment/locale/en-au.js",
	"./en-ca": "./node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "./node_modules/moment/locale/en-ca.js",
	"./en-gb": "./node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "./node_modules/moment/locale/en-gb.js",
	"./en-ie": "./node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "./node_modules/moment/locale/en-ie.js",
	"./en-il": "./node_modules/moment/locale/en-il.js",
	"./en-il.js": "./node_modules/moment/locale/en-il.js",
	"./en-nz": "./node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "./node_modules/moment/locale/en-nz.js",
	"./eo": "./node_modules/moment/locale/eo.js",
	"./eo.js": "./node_modules/moment/locale/eo.js",
	"./es": "./node_modules/moment/locale/es.js",
	"./es-do": "./node_modules/moment/locale/es-do.js",
	"./es-do.js": "./node_modules/moment/locale/es-do.js",
	"./es-us": "./node_modules/moment/locale/es-us.js",
	"./es-us.js": "./node_modules/moment/locale/es-us.js",
	"./es.js": "./node_modules/moment/locale/es.js",
	"./et": "./node_modules/moment/locale/et.js",
	"./et.js": "./node_modules/moment/locale/et.js",
	"./eu": "./node_modules/moment/locale/eu.js",
	"./eu.js": "./node_modules/moment/locale/eu.js",
	"./fa": "./node_modules/moment/locale/fa.js",
	"./fa.js": "./node_modules/moment/locale/fa.js",
	"./fi": "./node_modules/moment/locale/fi.js",
	"./fi.js": "./node_modules/moment/locale/fi.js",
	"./fo": "./node_modules/moment/locale/fo.js",
	"./fo.js": "./node_modules/moment/locale/fo.js",
	"./fr": "./node_modules/moment/locale/fr.js",
	"./fr-ca": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ca.js": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ch": "./node_modules/moment/locale/fr-ch.js",
	"./fr-ch.js": "./node_modules/moment/locale/fr-ch.js",
	"./fr.js": "./node_modules/moment/locale/fr.js",
	"./fy": "./node_modules/moment/locale/fy.js",
	"./fy.js": "./node_modules/moment/locale/fy.js",
	"./ga": "./node_modules/moment/locale/ga.js",
	"./ga.js": "./node_modules/moment/locale/ga.js",
	"./gd": "./node_modules/moment/locale/gd.js",
	"./gd.js": "./node_modules/moment/locale/gd.js",
	"./gl": "./node_modules/moment/locale/gl.js",
	"./gl.js": "./node_modules/moment/locale/gl.js",
	"./gom-latn": "./node_modules/moment/locale/gom-latn.js",
	"./gom-latn.js": "./node_modules/moment/locale/gom-latn.js",
	"./gu": "./node_modules/moment/locale/gu.js",
	"./gu.js": "./node_modules/moment/locale/gu.js",
	"./he": "./node_modules/moment/locale/he.js",
	"./he.js": "./node_modules/moment/locale/he.js",
	"./hi": "./node_modules/moment/locale/hi.js",
	"./hi.js": "./node_modules/moment/locale/hi.js",
	"./hr": "./node_modules/moment/locale/hr.js",
	"./hr.js": "./node_modules/moment/locale/hr.js",
	"./hu": "./node_modules/moment/locale/hu.js",
	"./hu.js": "./node_modules/moment/locale/hu.js",
	"./hy-am": "./node_modules/moment/locale/hy-am.js",
	"./hy-am.js": "./node_modules/moment/locale/hy-am.js",
	"./id": "./node_modules/moment/locale/id.js",
	"./id.js": "./node_modules/moment/locale/id.js",
	"./is": "./node_modules/moment/locale/is.js",
	"./is.js": "./node_modules/moment/locale/is.js",
	"./it": "./node_modules/moment/locale/it.js",
	"./it-ch": "./node_modules/moment/locale/it-ch.js",
	"./it-ch.js": "./node_modules/moment/locale/it-ch.js",
	"./it.js": "./node_modules/moment/locale/it.js",
	"./ja": "./node_modules/moment/locale/ja.js",
	"./ja.js": "./node_modules/moment/locale/ja.js",
	"./jv": "./node_modules/moment/locale/jv.js",
	"./jv.js": "./node_modules/moment/locale/jv.js",
	"./ka": "./node_modules/moment/locale/ka.js",
	"./ka.js": "./node_modules/moment/locale/ka.js",
	"./kk": "./node_modules/moment/locale/kk.js",
	"./kk.js": "./node_modules/moment/locale/kk.js",
	"./km": "./node_modules/moment/locale/km.js",
	"./km.js": "./node_modules/moment/locale/km.js",
	"./kn": "./node_modules/moment/locale/kn.js",
	"./kn.js": "./node_modules/moment/locale/kn.js",
	"./ko": "./node_modules/moment/locale/ko.js",
	"./ko.js": "./node_modules/moment/locale/ko.js",
	"./ku": "./node_modules/moment/locale/ku.js",
	"./ku.js": "./node_modules/moment/locale/ku.js",
	"./ky": "./node_modules/moment/locale/ky.js",
	"./ky.js": "./node_modules/moment/locale/ky.js",
	"./lb": "./node_modules/moment/locale/lb.js",
	"./lb.js": "./node_modules/moment/locale/lb.js",
	"./lo": "./node_modules/moment/locale/lo.js",
	"./lo.js": "./node_modules/moment/locale/lo.js",
	"./lt": "./node_modules/moment/locale/lt.js",
	"./lt.js": "./node_modules/moment/locale/lt.js",
	"./lv": "./node_modules/moment/locale/lv.js",
	"./lv.js": "./node_modules/moment/locale/lv.js",
	"./me": "./node_modules/moment/locale/me.js",
	"./me.js": "./node_modules/moment/locale/me.js",
	"./mi": "./node_modules/moment/locale/mi.js",
	"./mi.js": "./node_modules/moment/locale/mi.js",
	"./mk": "./node_modules/moment/locale/mk.js",
	"./mk.js": "./node_modules/moment/locale/mk.js",
	"./ml": "./node_modules/moment/locale/ml.js",
	"./ml.js": "./node_modules/moment/locale/ml.js",
	"./mn": "./node_modules/moment/locale/mn.js",
	"./mn.js": "./node_modules/moment/locale/mn.js",
	"./mr": "./node_modules/moment/locale/mr.js",
	"./mr.js": "./node_modules/moment/locale/mr.js",
	"./ms": "./node_modules/moment/locale/ms.js",
	"./ms-my": "./node_modules/moment/locale/ms-my.js",
	"./ms-my.js": "./node_modules/moment/locale/ms-my.js",
	"./ms.js": "./node_modules/moment/locale/ms.js",
	"./mt": "./node_modules/moment/locale/mt.js",
	"./mt.js": "./node_modules/moment/locale/mt.js",
	"./my": "./node_modules/moment/locale/my.js",
	"./my.js": "./node_modules/moment/locale/my.js",
	"./nb": "./node_modules/moment/locale/nb.js",
	"./nb.js": "./node_modules/moment/locale/nb.js",
	"./ne": "./node_modules/moment/locale/ne.js",
	"./ne.js": "./node_modules/moment/locale/ne.js",
	"./nl": "./node_modules/moment/locale/nl.js",
	"./nl-be": "./node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "./node_modules/moment/locale/nl-be.js",
	"./nl.js": "./node_modules/moment/locale/nl.js",
	"./nn": "./node_modules/moment/locale/nn.js",
	"./nn.js": "./node_modules/moment/locale/nn.js",
	"./pa-in": "./node_modules/moment/locale/pa-in.js",
	"./pa-in.js": "./node_modules/moment/locale/pa-in.js",
	"./pl": "./node_modules/moment/locale/pl.js",
	"./pl.js": "./node_modules/moment/locale/pl.js",
	"./pt": "./node_modules/moment/locale/pt.js",
	"./pt-br": "./node_modules/moment/locale/pt-br.js",
	"./pt-br.js": "./node_modules/moment/locale/pt-br.js",
	"./pt.js": "./node_modules/moment/locale/pt.js",
	"./ro": "./node_modules/moment/locale/ro.js",
	"./ro.js": "./node_modules/moment/locale/ro.js",
	"./ru": "./node_modules/moment/locale/ru.js",
	"./ru.js": "./node_modules/moment/locale/ru.js",
	"./sd": "./node_modules/moment/locale/sd.js",
	"./sd.js": "./node_modules/moment/locale/sd.js",
	"./se": "./node_modules/moment/locale/se.js",
	"./se.js": "./node_modules/moment/locale/se.js",
	"./si": "./node_modules/moment/locale/si.js",
	"./si.js": "./node_modules/moment/locale/si.js",
	"./sk": "./node_modules/moment/locale/sk.js",
	"./sk.js": "./node_modules/moment/locale/sk.js",
	"./sl": "./node_modules/moment/locale/sl.js",
	"./sl.js": "./node_modules/moment/locale/sl.js",
	"./sq": "./node_modules/moment/locale/sq.js",
	"./sq.js": "./node_modules/moment/locale/sq.js",
	"./sr": "./node_modules/moment/locale/sr.js",
	"./sr-cyrl": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr.js": "./node_modules/moment/locale/sr.js",
	"./ss": "./node_modules/moment/locale/ss.js",
	"./ss.js": "./node_modules/moment/locale/ss.js",
	"./sv": "./node_modules/moment/locale/sv.js",
	"./sv.js": "./node_modules/moment/locale/sv.js",
	"./sw": "./node_modules/moment/locale/sw.js",
	"./sw.js": "./node_modules/moment/locale/sw.js",
	"./ta": "./node_modules/moment/locale/ta.js",
	"./ta.js": "./node_modules/moment/locale/ta.js",
	"./te": "./node_modules/moment/locale/te.js",
	"./te.js": "./node_modules/moment/locale/te.js",
	"./tet": "./node_modules/moment/locale/tet.js",
	"./tet.js": "./node_modules/moment/locale/tet.js",
	"./tg": "./node_modules/moment/locale/tg.js",
	"./tg.js": "./node_modules/moment/locale/tg.js",
	"./th": "./node_modules/moment/locale/th.js",
	"./th.js": "./node_modules/moment/locale/th.js",
	"./tl-ph": "./node_modules/moment/locale/tl-ph.js",
	"./tl-ph.js": "./node_modules/moment/locale/tl-ph.js",
	"./tlh": "./node_modules/moment/locale/tlh.js",
	"./tlh.js": "./node_modules/moment/locale/tlh.js",
	"./tr": "./node_modules/moment/locale/tr.js",
	"./tr.js": "./node_modules/moment/locale/tr.js",
	"./tzl": "./node_modules/moment/locale/tzl.js",
	"./tzl.js": "./node_modules/moment/locale/tzl.js",
	"./tzm": "./node_modules/moment/locale/tzm.js",
	"./tzm-latn": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm-latn.js": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm.js": "./node_modules/moment/locale/tzm.js",
	"./ug-cn": "./node_modules/moment/locale/ug-cn.js",
	"./ug-cn.js": "./node_modules/moment/locale/ug-cn.js",
	"./uk": "./node_modules/moment/locale/uk.js",
	"./uk.js": "./node_modules/moment/locale/uk.js",
	"./ur": "./node_modules/moment/locale/ur.js",
	"./ur.js": "./node_modules/moment/locale/ur.js",
	"./uz": "./node_modules/moment/locale/uz.js",
	"./uz-latn": "./node_modules/moment/locale/uz-latn.js",
	"./uz-latn.js": "./node_modules/moment/locale/uz-latn.js",
	"./uz.js": "./node_modules/moment/locale/uz.js",
	"./vi": "./node_modules/moment/locale/vi.js",
	"./vi.js": "./node_modules/moment/locale/vi.js",
	"./x-pseudo": "./node_modules/moment/locale/x-pseudo.js",
	"./x-pseudo.js": "./node_modules/moment/locale/x-pseudo.js",
	"./yo": "./node_modules/moment/locale/yo.js",
	"./yo.js": "./node_modules/moment/locale/yo.js",
	"./zh-cn": "./node_modules/moment/locale/zh-cn.js",
	"./zh-cn.js": "./node_modules/moment/locale/zh-cn.js",
	"./zh-hk": "./node_modules/moment/locale/zh-hk.js",
	"./zh-hk.js": "./node_modules/moment/locale/zh-hk.js",
	"./zh-tw": "./node_modules/moment/locale/zh-tw.js",
	"./zh-tw.js": "./node_modules/moment/locale/zh-tw.js"
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
webpackContext.id = "./node_modules/moment/locale sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
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
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _side_nav_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./side-nav.component */ "./src/app/side-nav.component.ts");
/* harmony import */ var _toolbar_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./toolbar.component */ "./src/app/toolbar.component.ts");
/* harmony import */ var _content_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./content.component */ "./src/app/content.component.ts");





class AppComponent {
    constructor() {
    }
    ngOnInit() {
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([])], decls: 3, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-side-nav");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-toolbar");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "app-content");
    } }, directives: [_side_nav_component__WEBPACK_IMPORTED_MODULE_1__["SideNavComponent"], _toolbar_component__WEBPACK_IMPORTED_MODULE_2__["ToolbarComponent"], _content_component__WEBPACK_IMPORTED_MODULE_3__["ContentComponent"]], encapsulation: 2 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                providers: []
            }]
    }], function () { return []; }, null); })();


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
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/animations.js");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngxs/store */ "./node_modules/@ngxs/store/__ivy_ngcc__/fesm2015/ngxs-store.js");
/* harmony import */ var _ngxs_devtools_plugin__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngxs/devtools-plugin */ "./node_modules/@ngxs/devtools-plugin/__ivy_ngcc__/fesm2015/ngxs-devtools-plugin.js");
/* harmony import */ var _ngxs_logger_plugin__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngxs/logger-plugin */ "./node_modules/@ngxs/logger-plugin/__ivy_ngcc__/fesm2015/ngxs-logger-plugin.js");
/* harmony import */ var _side_nav_component_state__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./side-nav.component.state */ "./src/app/side-nav.component.state.ts");
/* harmony import */ var _features_httpDemo_component_state__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../features/httpDemo.component.state */ "./features/httpDemo.component.state.ts");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./app.routing.module */ "./src/app/app.routing.module.ts");
/* harmony import */ var ngx_motion__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngx-motion */ "./node_modules/ngx-motion/__ivy_ngcc__/fesm2015/ngx-motion.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _features_development_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../features/development.component */ "./features/development.component.ts");
/* harmony import */ var _features_alreadyReady_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../features/alreadyReady.component */ "./features/alreadyReady.component.ts");
/* harmony import */ var _features_httpDemo_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../features/httpDemo.component */ "./features/httpDemo.component.ts");
/* harmony import */ var _features_features_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../features/features.component */ "./features/features.component.ts");
/* harmony import */ var _features_settings_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../features/settings.component */ "./features/settings.component.ts");
/* harmony import */ var _features_splash_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../features/splash.component */ "./features/splash.component.ts");
/* harmony import */ var _features_file_transfer_dialog_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../features/file.transfer.dialog.component */ "./features/file.transfer.dialog.component.ts");
/* harmony import */ var _features_notification_module__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../features/notification.module */ "./features/notification.module.ts");
/* harmony import */ var _features_mobileApis_module__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../features/mobileApis.module */ "./features/mobileApis.module.ts");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/__ivy_ngcc__/esm2015/flex-layout.js");
/* harmony import */ var _toolbar_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./toolbar.component */ "./src/app/toolbar.component.ts");
/* harmony import */ var _content_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./content.component */ "./src/app/content.component.ts");
/* harmony import */ var _side_nav_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./side-nav.component */ "./src/app/side-nav.component.ts");
/* harmony import */ var _features_base_help_dialog__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../../features/base.help.dialog */ "./features/base.help.dialog.ts");
/* harmony import */ var _features_notification_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../../features/notification.component */ "./features/notification.component.ts");
/* harmony import */ var _features_mobileApis_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../../features/mobileApis.component */ "./features/mobileApis.component.ts");
/* harmony import */ var _common_entityService__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ../../common/entityService */ "./common/entityService.ts");





// ngxs







// features
























class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_12__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [_common_entityService__WEBPACK_IMPORTED_MODULE_29__["EntityService"]], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"].withServerTransition({ appId: 'ng-cli-universal' }),
            _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__["BrowserAnimationsModule"],
            ngx_motion__WEBPACK_IMPORTED_MODULE_11__["AppAnimationModule"],
            ngx_motion__WEBPACK_IMPORTED_MODULE_11__["MobileTechModule"],
            ngx_motion__WEBPACK_IMPORTED_MODULE_11__["AppHelperModule"].forRoot(),
            _ngxs_store__WEBPACK_IMPORTED_MODULE_5__["NgxsModule"].forRoot([
                _side_nav_component_state__WEBPACK_IMPORTED_MODULE_8__["SideNavState"], _features_httpDemo_component_state__WEBPACK_IMPORTED_MODULE_9__["HttpDemoState"]
            ]),
            _features_notification_module__WEBPACK_IMPORTED_MODULE_20__["NotificationModule"], _features_mobileApis_module__WEBPACK_IMPORTED_MODULE_21__["MobileApisModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_10__["AppRoutingModule"],
            ngx_motion__WEBPACK_IMPORTED_MODULE_11__["MaterialModule"], _angular_flex_layout__WEBPACK_IMPORTED_MODULE_22__["FlexLayoutModule"],
            _ngxs_devtools_plugin__WEBPACK_IMPORTED_MODULE_6__["NgxsReduxDevtoolsPluginModule"].forRoot(),
            _ngxs_logger_plugin__WEBPACK_IMPORTED_MODULE_7__["NgxsLoggerPluginModule"].forRoot()
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_12__["AppComponent"], _features_development_component__WEBPACK_IMPORTED_MODULE_13__["DevelopmentComponent"], _features_alreadyReady_component__WEBPACK_IMPORTED_MODULE_14__["AlreadyReadyComponent"], _content_component__WEBPACK_IMPORTED_MODULE_24__["ContentComponent"],
        _features_settings_component__WEBPACK_IMPORTED_MODULE_17__["SettingsComponent"], _features_splash_component__WEBPACK_IMPORTED_MODULE_18__["SplashComponent"], _toolbar_component__WEBPACK_IMPORTED_MODULE_23__["ToolbarComponent"], _features_base_help_dialog__WEBPACK_IMPORTED_MODULE_26__["BaseHelpDialogComponent"],
        _features_notification_component__WEBPACK_IMPORTED_MODULE_27__["NotificationHelpDialogComponent"], _features_mobileApis_component__WEBPACK_IMPORTED_MODULE_28__["MobileApisHelpDialogComponent"], _features_splash_component__WEBPACK_IMPORTED_MODULE_18__["SplashHelpDialogComponent"],
        _features_settings_component__WEBPACK_IMPORTED_MODULE_17__["SettingsHelpDialogComponent"], _features_features_component__WEBPACK_IMPORTED_MODULE_16__["FeaturesHelpDialogComponent"],
        _features_development_component__WEBPACK_IMPORTED_MODULE_13__["DevelopmentHelpDialogComponent"], _features_development_component__WEBPACK_IMPORTED_MODULE_13__["DevelopmentBuildDialogComponent"], _features_development_component__WEBPACK_IMPORTED_MODULE_13__["DevelopmentAddDialogComponent"], _features_development_component__WEBPACK_IMPORTED_MODULE_13__["DevelopmentRemoveDialogComponent"], _features_alreadyReady_component__WEBPACK_IMPORTED_MODULE_14__["AlreadyReadyHelpDialogComponent"], _features_httpDemo_component__WEBPACK_IMPORTED_MODULE_15__["HttpDemoComponent"], _features_httpDemo_component__WEBPACK_IMPORTED_MODULE_15__["HttpDemoHelpDialogComponent"],
        _toolbar_component__WEBPACK_IMPORTED_MODULE_23__["ApplicationAboutDialogComponent"], _features_features_component__WEBPACK_IMPORTED_MODULE_16__["FeaturesComponent"], _side_nav_component__WEBPACK_IMPORTED_MODULE_25__["SideNavComponent"], _features_file_transfer_dialog_component__WEBPACK_IMPORTED_MODULE_19__["FileTransferDialogComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__["BrowserAnimationsModule"],
        ngx_motion__WEBPACK_IMPORTED_MODULE_11__["AppAnimationModule"],
        ngx_motion__WEBPACK_IMPORTED_MODULE_11__["MobileTechModule"], ngx_motion__WEBPACK_IMPORTED_MODULE_11__["AppHelperModule"], _ngxs_store__WEBPACK_IMPORTED_MODULE_5__["ɵj"], _features_notification_module__WEBPACK_IMPORTED_MODULE_20__["NotificationModule"], _features_mobileApis_module__WEBPACK_IMPORTED_MODULE_21__["MobileApisModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_10__["AppRoutingModule"],
        ngx_motion__WEBPACK_IMPORTED_MODULE_11__["MaterialModule"], _angular_flex_layout__WEBPACK_IMPORTED_MODULE_22__["FlexLayoutModule"], _ngxs_devtools_plugin__WEBPACK_IMPORTED_MODULE_6__["NgxsReduxDevtoolsPluginModule"], _ngxs_logger_plugin__WEBPACK_IMPORTED_MODULE_7__["NgxsLoggerPluginModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_12__["AppComponent"], _features_development_component__WEBPACK_IMPORTED_MODULE_13__["DevelopmentComponent"], _features_alreadyReady_component__WEBPACK_IMPORTED_MODULE_14__["AlreadyReadyComponent"], _content_component__WEBPACK_IMPORTED_MODULE_24__["ContentComponent"],
                    _features_settings_component__WEBPACK_IMPORTED_MODULE_17__["SettingsComponent"], _features_splash_component__WEBPACK_IMPORTED_MODULE_18__["SplashComponent"], _toolbar_component__WEBPACK_IMPORTED_MODULE_23__["ToolbarComponent"], _features_base_help_dialog__WEBPACK_IMPORTED_MODULE_26__["BaseHelpDialogComponent"],
                    _features_notification_component__WEBPACK_IMPORTED_MODULE_27__["NotificationHelpDialogComponent"], _features_mobileApis_component__WEBPACK_IMPORTED_MODULE_28__["MobileApisHelpDialogComponent"], _features_splash_component__WEBPACK_IMPORTED_MODULE_18__["SplashHelpDialogComponent"],
                    _features_settings_component__WEBPACK_IMPORTED_MODULE_17__["SettingsHelpDialogComponent"], _features_features_component__WEBPACK_IMPORTED_MODULE_16__["FeaturesHelpDialogComponent"],
                    _features_development_component__WEBPACK_IMPORTED_MODULE_13__["DevelopmentHelpDialogComponent"], _features_development_component__WEBPACK_IMPORTED_MODULE_13__["DevelopmentBuildDialogComponent"], _features_development_component__WEBPACK_IMPORTED_MODULE_13__["DevelopmentAddDialogComponent"], _features_development_component__WEBPACK_IMPORTED_MODULE_13__["DevelopmentRemoveDialogComponent"], _features_alreadyReady_component__WEBPACK_IMPORTED_MODULE_14__["AlreadyReadyHelpDialogComponent"], _features_httpDemo_component__WEBPACK_IMPORTED_MODULE_15__["HttpDemoComponent"], _features_httpDemo_component__WEBPACK_IMPORTED_MODULE_15__["HttpDemoHelpDialogComponent"],
                    _toolbar_component__WEBPACK_IMPORTED_MODULE_23__["ApplicationAboutDialogComponent"], _features_features_component__WEBPACK_IMPORTED_MODULE_16__["FeaturesComponent"], _side_nav_component__WEBPACK_IMPORTED_MODULE_25__["SideNavComponent"], _features_file_transfer_dialog_component__WEBPACK_IMPORTED_MODULE_19__["FileTransferDialogComponent"]
                ],
                entryComponents: [_features_notification_component__WEBPACK_IMPORTED_MODULE_27__["NotificationHelpDialogComponent"], _features_mobileApis_component__WEBPACK_IMPORTED_MODULE_28__["MobileApisHelpDialogComponent"],
                    _toolbar_component__WEBPACK_IMPORTED_MODULE_23__["ApplicationAboutDialogComponent"], _features_file_transfer_dialog_component__WEBPACK_IMPORTED_MODULE_19__["FileTransferDialogComponent"], _features_development_component__WEBPACK_IMPORTED_MODULE_13__["DevelopmentBuildDialogComponent"], _features_development_component__WEBPACK_IMPORTED_MODULE_13__["DevelopmentAddDialogComponent"], _features_development_component__WEBPACK_IMPORTED_MODULE_13__["DevelopmentRemoveDialogComponent"]],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"].withServerTransition({ appId: 'ng-cli-universal' }),
                    _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                    _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__["BrowserAnimationsModule"],
                    ngx_motion__WEBPACK_IMPORTED_MODULE_11__["AppAnimationModule"],
                    ngx_motion__WEBPACK_IMPORTED_MODULE_11__["MobileTechModule"],
                    ngx_motion__WEBPACK_IMPORTED_MODULE_11__["AppHelperModule"].forRoot(),
                    _ngxs_store__WEBPACK_IMPORTED_MODULE_5__["NgxsModule"].forRoot([
                        _side_nav_component_state__WEBPACK_IMPORTED_MODULE_8__["SideNavState"], _features_httpDemo_component_state__WEBPACK_IMPORTED_MODULE_9__["HttpDemoState"]
                    ]),
                    _features_notification_module__WEBPACK_IMPORTED_MODULE_20__["NotificationModule"], _features_mobileApis_module__WEBPACK_IMPORTED_MODULE_21__["MobileApisModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_10__["AppRoutingModule"],
                    ngx_motion__WEBPACK_IMPORTED_MODULE_11__["MaterialModule"], _angular_flex_layout__WEBPACK_IMPORTED_MODULE_22__["FlexLayoutModule"],
                    _ngxs_devtools_plugin__WEBPACK_IMPORTED_MODULE_6__["NgxsReduxDevtoolsPluginModule"].forRoot(),
                    _ngxs_logger_plugin__WEBPACK_IMPORTED_MODULE_7__["NgxsLoggerPluginModule"].forRoot()
                ],
                providers: [_common_entityService__WEBPACK_IMPORTED_MODULE_29__["EntityService"]],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_12__["AppComponent"]]
            }]
    }], null, null); })();


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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _features_development_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../features/development.component */ "./features/development.component.ts");
/* harmony import */ var _features_alreadyReady_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../features/alreadyReady.component */ "./features/alreadyReady.component.ts");
/* harmony import */ var _features_httpDemo_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../features/httpDemo.component */ "./features/httpDemo.component.ts");
/* harmony import */ var _features_features_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../features/features.component */ "./features/features.component.ts");
/* harmony import */ var _features_settings_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../features/settings.component */ "./features/settings.component.ts");
/* harmony import */ var _features_splash_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../features/splash.component */ "./features/splash.component.ts");










const routes = [
    { path: '', component: _features_splash_component__WEBPACK_IMPORTED_MODULE_7__["SplashComponent"] },
    {
        path: 'splash', component: _features_splash_component__WEBPACK_IMPORTED_MODULE_7__["SplashComponent"],
        data: { debugOnly: false, title: 'Technologies', subtitle: 'Quick SPLASH', show: true, helpTemplate: _features_splash_component__WEBPACK_IMPORTED_MODULE_7__["SplashHelpDialogComponent"] }
    },
    {
        path: 'settings', component: _features_settings_component__WEBPACK_IMPORTED_MODULE_6__["SettingsComponent"],
        data: { debugOnly: false, title: 'Settings', subtitle: 'VERSIONS & SETTINGS', show: true, helpTemplate: _features_settings_component__WEBPACK_IMPORTED_MODULE_6__["SettingsHelpDialogComponent"] }
    },
    {
        path: 'features', component: _features_features_component__WEBPACK_IMPORTED_MODULE_5__["FeaturesComponent"],
        data: { debugOnly: false, title: 'Features', subtitle: 'More About this Application', show: true, helpTemplate: _features_features_component__WEBPACK_IMPORTED_MODULE_5__["FeaturesHelpDialogComponent"] }
    },
    {
        path: 'alreadyReady', component: _features_alreadyReady_component__WEBPACK_IMPORTED_MODULE_3__["AlreadyReadyComponent"],
        data: { debugOnly: false, title: 'Already Ready', subtitle: 'Feature Quick Start', show: true, helpTemplate: _features_alreadyReady_component__WEBPACK_IMPORTED_MODULE_3__["AlreadyReadyHelpDialogComponent"] }
    },
    {
        path: 'httpDemo', component: _features_httpDemo_component__WEBPACK_IMPORTED_MODULE_4__["HttpDemoComponent"],
        data: { debugOnly: false, title: 'Http Demo', subtitle: 'Features of the Http Service', show: true, helpTemplate: _features_httpDemo_component__WEBPACK_IMPORTED_MODULE_4__["HttpDemoHelpDialogComponent"] }
    },
    {
        path: 'development', component: _features_development_component__WEBPACK_IMPORTED_MODULE_2__["DevelopmentComponent"],
        data: { debugOnly: true, title: 'Developement', subtitle: 'Developement Utilities', show: true, helpTemplate: _features_development_component__WEBPACK_IMPORTED_MODULE_2__["DevelopmentHelpDialogComponent"] }
    },
    { path: '**', redirectTo: '/splash', pathMatch: 'full' },
    {
        path: 'restart', redirectTo: '', pathMatch: 'full',
        data: { debugOnly: false, title: 'Restart', subtitle: 'Restarting the Application...', show: true, helpTemplate: _features_splash_component__WEBPACK_IMPORTED_MODULE_7__["SplashHelpDialogComponent"] }
    },
];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
        _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/content.component.ts":
/*!**************************************!*\
  !*** ./src/app/content.component.ts ***!
  \**************************************/
/*! exports provided: ContentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentComponent", function() { return ContentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _toolbar_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toolbar.component */ "./src/app/toolbar.component.ts");



class ContentComponent {
    constructor() {
    }
    ngOnInit() {
    }
}
ContentComponent.ɵfac = function ContentComponent_Factory(t) { return new (t || ContentComponent)(); };
ContentComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ContentComponent, selectors: [["app-content"]], decls: 1, vars: 0, template: function ContentComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-toolbar");
    } }, directives: [_toolbar_component__WEBPACK_IMPORTED_MODULE_1__["ToolbarComponent"]], encapsulation: 2 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ContentComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-content',
                templateUrl: './content.component.html'
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/side-nav.component.actions.ts":
/*!***********************************************!*\
  !*** ./src/app/side-nav.component.actions.ts ***!
  \***********************************************/
/*! exports provided: RequestAppSettings, ResponseAppSettings, NavigateTo, SideNavInit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestAppSettings", function() { return RequestAppSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResponseAppSettings", function() { return ResponseAppSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavigateTo", function() { return NavigateTo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SideNavInit", function() { return SideNavInit; });
class RequestAppSettings {
    constructor(name, title, payload, playback, delay) {
        this.name = name;
        this.title = title;
        this.payload = payload;
        this.playback = playback;
        this.delay = delay;
    }
}
RequestAppSettings.type = '[side-nav] Request AppSettings';
class ResponseAppSettings {
    constructor(name, title, payload, playback, delay) {
        this.name = name;
        this.title = title;
        this.payload = payload;
        this.playback = playback;
        this.delay = delay;
    }
}
ResponseAppSettings.type = '[side-nav] Response AppSettings';
class NavigateTo {
    constructor(name, title, payload, playback, delay) {
        this.name = name;
        this.title = title;
        this.payload = payload;
        this.playback = playback;
        this.delay = delay;
    }
}
NavigateTo.type = '[side-nav] NavigateTo';
class SideNavInit {
    // remove circular reference by using ngAction: any
    constructor(ngAction) {
        this.ngAction = ngAction;
    }
}
SideNavInit.type = '[side-nav] SideNavInit';


/***/ }),

/***/ "./src/app/side-nav.component.state.ts":
/*!*********************************************!*\
  !*** ./src/app/side-nav.component.state.ts ***!
  \*********************************************/
/*! exports provided: $SideNavStateModel, SideNavStateModel, SideNavState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "$SideNavStateModel", function() { return $SideNavStateModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SideNavStateModel", function() { return SideNavStateModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SideNavState", function() { return SideNavState; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngxs/store */ "./node_modules/@ngxs/store/__ivy_ngcc__/fesm2015/ngxs-store.js");
/* harmony import */ var _side_nav_component_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./side-nav.component.actions */ "./src/app/side-nav.component.actions.ts");
/* harmony import */ var ngx_modeling__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-modeling */ "./node_modules/ngx-modeling/index.js");






class $SideNavStateModel {
    constructor() {
        this.requestAppSettings = false;
        this.responseAppSettings = new ngx_modeling__WEBPACK_IMPORTED_MODULE_4__["AppSettings"]();
        this.featureName = "";
    }
}
class SideNavStateModel {
    constructor() {
        this.requestAppSettings = false;
        this.responseAppSettings = new ngx_modeling__WEBPACK_IMPORTED_MODULE_4__["AppSettings"]();
        this.featureName = "";
        this.previousState = new $SideNavStateModel();
    }
}
SideNavStateModel.ɵfac = function SideNavStateModel_Factory(t) { return new (t || SideNavStateModel)(); };
SideNavStateModel.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: SideNavStateModel, factory: SideNavStateModel.ɵfac });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](SideNavStateModel, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"]
    }], null, null); })();
let SideNavState = class SideNavState {
    action01({ patchState }, { payload }) {
        patchState({ requestAppSettings: payload });
        // Don't record this state change
    }
    action02({ patchState }, { payload }) {
        patchState({ responseAppSettings: payload });
        // Don't record this state change
    }
    action03({ patchState }, { name, title, payload, playback, delay }) {
        patchState({ featureName: payload });
        this.ngAction.appendToQueue(new _side_nav_component_actions__WEBPACK_IMPORTED_MODULE_3__["NavigateTo"](name, title, payload, playback, delay));
    }
    action04({}, { ngAction }) {
        this.ngAction = ngAction;
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_2__["Action"])(_side_nav_component_actions__WEBPACK_IMPORTED_MODULE_3__["RequestAppSettings"]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object, _side_nav_component_actions__WEBPACK_IMPORTED_MODULE_3__["RequestAppSettings"]]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
], SideNavState.prototype, "action01", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_2__["Action"])(_side_nav_component_actions__WEBPACK_IMPORTED_MODULE_3__["ResponseAppSettings"]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object, _side_nav_component_actions__WEBPACK_IMPORTED_MODULE_3__["ResponseAppSettings"]]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
], SideNavState.prototype, "action02", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_2__["Action"])(_side_nav_component_actions__WEBPACK_IMPORTED_MODULE_3__["NavigateTo"]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object, _side_nav_component_actions__WEBPACK_IMPORTED_MODULE_3__["NavigateTo"]]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
], SideNavState.prototype, "action03", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_2__["Action"])(_side_nav_component_actions__WEBPACK_IMPORTED_MODULE_3__["SideNavInit"]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object, _side_nav_component_actions__WEBPACK_IMPORTED_MODULE_3__["SideNavInit"]]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
], SideNavState.prototype, "action04", null);
SideNavState = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_2__["State"])({
        name: 'sideNav',
        defaults: new SideNavStateModel()
    })
], SideNavState);



/***/ }),

/***/ "./src/app/side-nav.component.ts":
/*!***************************************!*\
  !*** ./src/app/side-nav.component.ts ***!
  \***************************************/
/*! exports provided: SideNavComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SideNavComponent", function() { return SideNavComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngxs/store */ "./node_modules/@ngxs/store/__ivy_ngcc__/fesm2015/ngxs-store.js");
/* harmony import */ var _common_appConfig__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../common/appConfig */ "./common/appConfig.ts");
/* harmony import */ var _common_buildConfig__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../common/buildConfig */ "./common/buildConfig.ts");
/* harmony import */ var _common_messagePump__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../common/messagePump */ "./common/messagePump.ts");
/* harmony import */ var ngx_motion__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-motion */ "./node_modules/ngx-motion/__ivy_ngcc__/fesm2015/ngx-motion.js");
/* harmony import */ var _side_nav_component_state__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./side-nav.component.state */ "./src/app/side-nav.component.state.ts");
/* harmony import */ var _side_nav_component_actions__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./side-nav.component.actions */ "./src/app/side-nav.component.actions.ts");
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/sidenav */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/sidenav.js");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/toolbar.js");
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/tabs */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/tabs.js");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/list */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/list.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/button.js");
/* harmony import */ var _toolbar_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./toolbar.component */ "./src/app/toolbar.component.ts");
/* harmony import */ var _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/flex-layout/extended */ "./node_modules/@angular/flex-layout/__ivy_ngcc__/esm2015/extended.js");




// ngxs

// services



















const _c0 = function (a0) { return { "app-side-selected-item": a0 }; };
function SideNavComponent_div_9_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r104 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-list-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "view-fader", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SideNavComponent_div_9_div_1_Template_view_fader_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r104); const feature_r100 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit; const ctx_r102 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r102.animateTo(feature_r100); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const feature_r100 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    const ctx_r101 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("isViewVisible", feature_r100.data.show)("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](3, _c0, ctx_r101.selectedFeature === feature_r100.path));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](feature_r100.data.title);
} }
function SideNavComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, SideNavComponent_div_9_div_1_Template, 4, 5, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const feature_r100 = ctx.$implicit;
    const ctx_r98 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", feature_r100.data && (ctx_r98.ac.appSettings.debug === true || !feature_r100.data.debugOnly));
} }
function SideNavComponent_div_22_Template(rf, ctx) { if (rf & 1) {
    const _r109 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-list-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "view-fader", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SideNavComponent_div_22_Template_view_fader_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r109); const index_r107 = ctx.index; const ctx_r108 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r108.ac.ngAction.singleAction(index_r107); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const action_r106 = ctx.$implicit;
    const index_r107 = ctx.index;
    const ctx_r99 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("isViewVisible", true)("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](3, _c0, ctx_r99.ac.ngAction.getLatestIndex() === index_r107));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](action_r106.name);
} }
class SideNavComponent {
    constructor(store, route, router, ac, as, zone, cdr) {
        this.store = store;
        this.route = route;
        this.router = router;
        this.ac = ac;
        this.as = as;
        this.zone = zone;
        this.cdr = cdr;
        this.subtitle = '';
        this.sideNavState = new _side_nav_component_state__WEBPACK_IMPORTED_MODULE_9__["SideNavStateModel"]();
        this.autoStartActionsRecording = false;
        this.mediaMatcher = matchMedia(`(max-width: ${this.ac.smallWidthBreakpoint}px)`);
        this.mediaMatcher.addEventListener('change', () => {
            this.mediaMatcher = matchMedia(`(max-width: ${this.ac.smallWidthBreakpoint}px)`);
        });
        this.store.dispatch(new _side_nav_component_actions__WEBPACK_IMPORTED_MODULE_10__["SideNavInit"](this.ac.ngAction));
        this.stateChanges();
        if (this.autoStartActionsRecording) {
            this.recordStateChanges();
        }
    }
    getVsCurrentConfiguration() {
        if (location.hostname !== 'localhost') {
            return '';
        }
        if (this.ac.appSettings.debug) {
            return 'Debug';
        }
        else {
            return 'Release';
        }
    }
    toggleRecord() {
        if (this.ac.ngAction.isRecording()) {
            this.ac.ngAction.stopRecording();
        }
        else {
            this.ac.ngAction.startRecording();
        }
    }
    recordingStatus() {
        if (this.ac.ngAction.isRecording()) {
            return 'Pause';
        }
        else {
            return 'Record';
        }
    }
    recordStateChanges() {
        this.ac.ngAction.startRecording();
    }
    onClickPlayback() {
        this.ac.ngAction.playback();
    }
    stateChanges() {
        this.store.subscribe(state => {
            if (state.sideNav) {
                const sideNavState = state.sideNav;
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
        this.router.events.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])(event => event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__["NavigationEnd"])).subscribe(event => {
            let currentRoute = this.route.root;
            while (currentRoute.children[0] !== undefined) {
                currentRoute = currentRoute.children[0];
            }
            this.subtitle = currentRoute.snapshot.data.subtitle;
        });
        this.date = new Date();
        this.theWeekOf = moment__WEBPACK_IMPORTED_MODULE_2__().startOf('week').format('ddd MMM D YYYY');
        this.appHref = window.location.origin;
        this.store.dispatch(new _side_nav_component_actions__WEBPACK_IMPORTED_MODULE_10__["RequestAppSettings"]('', 'RequestSettings', true, false, -1));
        this.store.dispatch(new _side_nav_component_actions__WEBPACK_IMPORTED_MODULE_10__["RequestAppSettings"]('', 'RequestSettings', false, false, -1));
    }
    getAppSettings() {
        this.sideNavState.requestAppSettings = false;
        this.ac.getAppSettings(() => {
            this.store.dispatch(new _side_nav_component_actions__WEBPACK_IMPORTED_MODULE_10__["ResponseAppSettings"]('', 'ResponseSettings', this.ac.appSettings, false, -1));
            this.checkForUpdates();
            this.navigateForward();
        }, (errorMessage) => {
            if (navigator.onLine) {
                this.ac.toastrError(errorMessage);
            }
            else {
                this.ac.toastrWarning('This App is Offline!');
            }
            this.navigateForward();
        });
    }
    restartApp() {
        window.location.href = this.appHref;
    }
    navigateForward() {
        setTimeout(() => {
            const navigateTo = this.ac.getLocalStorage('navigateTo');
            if (navigateTo) {
                if (navigateTo.feature === 'development' && this.ac.appSettings.debug === false) {
                    this.navigateTo('splash');
                    return;
                }
                this.navigateTo(navigateTo.feature);
            }
            else {
                this.navigateTo('splash');
            }
        }, this.ac.appSettings.splashTime); // navigate away from splash view
    }
    animateTo(feature) {
        feature.data.show = false;
        setTimeout(() => {
            feature.data.show = true;
        }, 500);
        this.navigateTo(feature.path);
    }
    navigateTo(featurePath) {
        const feature = this.router.config.find(obj => obj.path === featurePath);
        if (feature === undefined) {
            throw new Error('splash config object not found!');
        }
        this.store.dispatch(new _side_nav_component_actions__WEBPACK_IMPORTED_MODULE_10__["NavigateTo"]('NavigateTo', feature.data.title, featurePath, true, -1));
    }
    routerNavigate(featurePath) {
        if (featurePath === 'restart') {
            this.ac.toastrWarning('Restarting the application now...');
            setTimeout(() => {
                this.restartApp();
            }, 1000);
            return;
        }
        else {
            this.ac.setLocalStorage('navigateTo', { feature: featurePath });
            this.selectedFeature = featurePath;
            this.router.navigate([featurePath]);
        }
    }
    isScreenSmall() {
        return this.mediaMatcher.matches;
    }
    updateVersionAndRestart() {
        this.ac.setLocalStorage('buildVersion', { buildVersion: this.ac.appSettings.buildVersion });
        this.ac.toastrInfo('Updating to latest version: ' + this.ac.appSettings.buildVersion + ' Restarting the application...');
        setTimeout(() => {
            this.restartApp();
        }, 3000);
    }
    checkForUpdates() {
        if (this.ac.appSettings.debug) {
            return;
        }
        const buildVersion = this.ac.getLocalStorage('buildVersion');
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
    }
}
SideNavComponent.ɵfac = function SideNavComponent_Factory(t) { return new (t || SideNavComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ngxs_store__WEBPACK_IMPORTED_MODULE_4__["Store"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_common_appConfig__WEBPACK_IMPORTED_MODULE_5__["AppConfig"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ngx_motion__WEBPACK_IMPORTED_MODULE_8__["AppServices"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"])); };
SideNavComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SideNavComponent, selectors: [["app-side-nav"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_common_appConfig__WEBPACK_IMPORTED_MODULE_5__["AppConfig"], _common_buildConfig__WEBPACK_IMPORTED_MODULE_6__["BuildConfig"], ngx_motion__WEBPACK_IMPORTED_MODULE_8__["AppServices"], _common_messagePump__WEBPACK_IMPORTED_MODULE_7__["MessagePump"]])], decls: 26, vars: 10, consts: [[1, "app-sidenav-container", 2, "position", "fixed", "overflow", "hidden"], [1, "app-side-nav", 3, "opened", "mode"], ["drawer", ""], ["color", "primary"], [2, "font-family", "px-neuropol", "font-size", "32px", "text-align", "center", "width", "100%"], ["mat-align-tabs", "center", "color", "primary", "dynamicHeight", "", 2, "padding-top", "20px", 3, "selectedIndex"], ["label", "Nav"], ["role", "list", 1, "app-side-listgroup"], [4, "ngFor", "ngForOf"], ["label", "Action"], [2, "text-align", "center"], [1, "fa", "fa-volume-up", "fa-2x", 2, "color", "cornflowerblue", "float", "left", "margin-left", "20px"], [1, "btn-group", 2, "margin-right", "20px", "height", "65px"], ["mat-fab", "", "color", "accent", 2, "top", "-2px", 3, "disabled", "click"], ["mat-fab", "", "color", "accent", 2, "top", "-2px", "left", "5px", 3, "disabled", "click"], ["mat-fab", "", "color", "accent", 2, "top", "-2px", "left", "10px", 3, "disabled", "click"], ["role", "list", 1, "app-side-listgroup", 2, "margin-top", "0px"], [3, "toggleSidenav"], [1, "side-nav-content"], [4, "ngIf"], [1, "app-side-listitem", 3, "isViewVisible", "ngClass", "click"]], template: function SideNavComponent_Template(rf, ctx) { if (rf & 1) {
        const _r110 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-drawer-container", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-drawer", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-toolbar", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "mat-tab-group", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "mat-tab", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "mat-list", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, SideNavComponent_div_9_Template, 2, 1, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "mat-tab", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "i", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "button", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SideNavComponent_Template_button_click_15_listener() { return ctx.toggleRecord(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "button", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SideNavComponent_Template_button_click_17_listener() { return ctx.ac.ngAction.clearQueue(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "Clear");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "button", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SideNavComponent_Template_button_click_19_listener() { return ctx.onClickPlayback(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "Start");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "mat-list", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](22, SideNavComponent_div_22_Template, 5, 5, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "app-toolbar", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("toggleSidenav", function SideNavComponent_Template_app_toolbar_toggleSidenav_23_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r110); const _r97 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](2); return _r97.toggle(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](25, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("opened", !ctx.isScreenSmall())("mode", ctx.isScreenSmall() ? "over" : "side");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.getVsCurrentConfiguration());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("selectedIndex", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.router.config);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx.ac.ngAction.isDispatching());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.recordingStatus());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx.ac.ngAction.isRecording() || ctx.ac.ngAction.isDispatching());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx.ac.ngAction.isRecording() || ctx.ac.ngAction.isDispatching() || ctx.ac.ngAction.getLatestIndex() === 0 - 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.ac.ngAction.actionsQueue);
    } }, directives: [_angular_material_sidenav__WEBPACK_IMPORTED_MODULE_11__["MatDrawerContainer"], _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_11__["MatDrawer"], _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_12__["MatToolbar"], _angular_material_tabs__WEBPACK_IMPORTED_MODULE_13__["MatTabGroup"], _angular_material_tabs__WEBPACK_IMPORTED_MODULE_13__["MatTab"], _angular_material_list__WEBPACK_IMPORTED_MODULE_14__["MatList"], _angular_common__WEBPACK_IMPORTED_MODULE_15__["NgForOf"], _angular_material_button__WEBPACK_IMPORTED_MODULE_16__["MatButton"], _toolbar_component__WEBPACK_IMPORTED_MODULE_17__["ToolbarComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterOutlet"], _angular_common__WEBPACK_IMPORTED_MODULE_15__["NgIf"], _angular_material_list__WEBPACK_IMPORTED_MODULE_14__["MatListItem"], ngx_motion__WEBPACK_IMPORTED_MODULE_8__["ɵa"], _angular_common__WEBPACK_IMPORTED_MODULE_15__["NgClass"], _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_18__["DefaultClassDirective"]], encapsulation: 2 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SideNavComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-side-nav',
                templateUrl: './side-nav.component.html',
                providers: [_common_appConfig__WEBPACK_IMPORTED_MODULE_5__["AppConfig"], _common_buildConfig__WEBPACK_IMPORTED_MODULE_6__["BuildConfig"], ngx_motion__WEBPACK_IMPORTED_MODULE_8__["AppServices"], _common_messagePump__WEBPACK_IMPORTED_MODULE_7__["MessagePump"]]
            }]
    }], function () { return [{ type: _ngxs_store__WEBPACK_IMPORTED_MODULE_4__["Store"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] }, { type: _common_appConfig__WEBPACK_IMPORTED_MODULE_5__["AppConfig"] }, { type: ngx_motion__WEBPACK_IMPORTED_MODULE_8__["AppServices"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"] }]; }, null); })();


/***/ }),

/***/ "./src/app/toolbar.component.ts":
/*!**************************************!*\
  !*** ./src/app/toolbar.component.ts ***!
  \**************************************/
/*! exports provided: ApplicationAboutDialogComponent, ToolbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApplicationAboutDialogComponent", function() { return ApplicationAboutDialogComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolbarComponent", function() { return ToolbarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/dialog.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _common_appConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../common/appConfig */ "./common/appConfig.ts");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/toolbar.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/icon.js");
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/menu */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/menu.js");












class ApplicationAboutDialogComponent {
    constructor(data, ac) {
        this.data = data;
        this.ac = ac;
    }
}
ApplicationAboutDialogComponent.ɵfac = function ApplicationAboutDialogComponent_Factory(t) { return new (t || ApplicationAboutDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_common_appConfig__WEBPACK_IMPORTED_MODULE_3__["AppConfig"])); };
ApplicationAboutDialogComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ApplicationAboutDialogComponent, selectors: [["ng-component"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_common_appConfig__WEBPACK_IMPORTED_MODULE_3__["AppConfig"]])], decls: 7, vars: 1, consts: [["mat-dialog-title", ""], ["mat-dialog-content", ""], [2, "text-align", "center"]], template: function ApplicationAboutDialogComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h1", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "About: Angular.Net Studio");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Application Version: ", ctx.ac.appSettings.buildVersion, "");
    } }, directives: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogTitle"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogContent"]], encapsulation: 2 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ApplicationAboutDialogComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                templateUrl: './toolbar.component.help.html',
                providers: [_common_appConfig__WEBPACK_IMPORTED_MODULE_3__["AppConfig"]]
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"]]
            }] }, { type: _common_appConfig__WEBPACK_IMPORTED_MODULE_3__["AppConfig"] }]; }, null); })();
class ToolbarComponent {
    constructor(ac, dialog, route, router) {
        this.ac = ac;
        this.dialog = dialog;
        this.route = route;
        this.router = router;
        this.toggleSidenav = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    ngOnInit() {
        window.addEventListener('offline', (event) => {
            this.ac.toastrWarning('The application just went offline!');
            this.ac.isOnline = false;
        }, false);
        window.addEventListener('online', (event) => {
            this.ac.toastrSuccess('The application is back online!');
            this.ac.isOnline = true;
        }, false);
    }
    openAboutDialog() {
        const matDialogRef = this.dialog.open(ApplicationAboutDialogComponent, { width: '450px' });
    }
    getOnlineStatusIconName() {
        if (this.ac.isOnline) {
            return 'signal_wifi_4_bar';
        }
        else {
            return 'signal_wifi_offline';
        }
    }
    onClickHelp() {
        const data$ = this.ac.getRouteData();
        this.dialog.open(data$.helpTemplate, {
            width: '600px',
            height: '600px',
            data: data$
        });
    }
}
ToolbarComponent.ɵfac = function ToolbarComponent_Factory(t) { return new (t || ToolbarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_common_appConfig__WEBPACK_IMPORTED_MODULE_3__["AppConfig"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialog"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"])); };
ToolbarComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ToolbarComponent, selectors: [["app-toolbar"]], outputs: { toggleSidenav: "toggleSidenav" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_common_appConfig__WEBPACK_IMPORTED_MODULE_3__["AppConfig"]])], decls: 22, vars: 2, consts: [["color", "primary"], [2, "width", "100%"], [2, "width", "5%", "text-align", "left"], [1, "toolbar-icon-button", 3, "click"], ["title", "Application is Online", 1, "toolbar-icon"], [2, "text-align", "center", "width", "80%"], [2, "font-family", "px-neuropol", "font-size", "32px"], [2, "width", "5%", "text-align", "right"], [1, "toolbar-icon-button", 3, "matMenuTriggerFor"], ["menu", "matMenu"], ["mat-menu-item", "", 3, "click"]], template: function ToolbarComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-toolbar", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "table", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "td", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-icon", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ToolbarComponent_Template_mat_icon_click_4_listener() { return ctx.toggleSidenav.emit(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "menu");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "td", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "mat-icon", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "td", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Angular.Net Studio");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "td", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "mat-icon", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ToolbarComponent_Template_mat_icon_click_13_listener() { return ctx.onClickHelp(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "help");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "td", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "mat-icon", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "more_vert");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "mat-menu", null, 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ToolbarComponent_Template_button_click_20_listener() { return ctx.openAboutDialog(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "About");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r96 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.getOnlineStatusIconName());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matMenuTriggerFor", _r96);
    } }, directives: [_angular_material_toolbar__WEBPACK_IMPORTED_MODULE_4__["MatToolbar"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__["MatIcon"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_6__["MatMenuTrigger"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_6__["_MatMenu"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_6__["MatMenuItem"]], encapsulation: 2 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ToolbarComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-toolbar',
                templateUrl: './toolbar.component.html',
                providers: [_common_appConfig__WEBPACK_IMPORTED_MODULE_3__["AppConfig"]]
            }]
    }], function () { return [{ type: _common_appConfig__WEBPACK_IMPORTED_MODULE_3__["AppConfig"] }, { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialog"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }]; }, { toggleSidenav: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }] }); })();


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
// this will work whenever the frontend and backend are served from one server
const indexController = 'http://localhost:1999/index';
const environment = {
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

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");



Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_1__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\ProMatrix.2\Angular.Net.CLI\AngularNetCore\wwwroot\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map