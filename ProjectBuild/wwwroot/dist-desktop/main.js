(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./common/appConfig.ts":
/*!*****************************!*\
  !*** ./common/appConfig.ts ***!
  \*****************************/
/*! exports provided: AppConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppConfig", function() { return AppConfig; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _baseServices__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./baseServices */ "./common/baseServices.ts");
/* harmony import */ var _shared_client_side_models_buildModels__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/client-side-models/buildModels */ "./shared/client-side-models/buildModels.ts");
/* harmony import */ var _shared_client_side_models_analyticsData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/client-side-models/analyticsData */ "./shared/client-side-models/analyticsData.ts");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_6__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AppConfig = /** @class */ (function (_super) {
    __extends(AppConfig, _super);
    function AppConfig(http) {
        var _this = _super.call(this, http) || this;
        _this.http = http;
        _this.appSettings = new _shared_client_side_models_buildModels__WEBPACK_IMPORTED_MODULE_3__["AppSettings"]();
        _this.analyticsData = new _shared_client_side_models_analyticsData__WEBPACK_IMPORTED_MODULE_4__["AnalyticsData"]();
        _this.isPhoneSize = false;
        _this.isLandscapeView = false;
        _this.isInitialized = false;
        _this.isSpinnerAvailable = false;
        _this.isSpinnerVisible = false;
        _this.screenWidth = 0;
        _this.screenHeight = 0;
        return _this;
    }
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
        this.analyticsData = this.getLocalStorage("analyticsData");
        this.analyticsData.exceptions = lodash__WEBPACK_IMPORTED_MODULE_6__["map"](this.analyticsData.exceptions, function (a) {
            a.dateString = moment__WEBPACK_IMPORTED_MODULE_5__(a.date).format("YYYY-MM-DD");
            a.timeString = moment__WEBPACK_IMPORTED_MODULE_5__(a.date).format("HH:mm:ss");
            return a;
        });
        var totalResponseTime = 0;
        this.analyticsData.performances = lodash__WEBPACK_IMPORTED_MODULE_6__["map"](this.analyticsData.performances, function (a) {
            a.dateString = moment__WEBPACK_IMPORTED_MODULE_5__(a.date).format("YYYY-MM-DD");
            a.timeString = moment__WEBPACK_IMPORTED_MODULE_5__(a.date).format("HH:mm:ss");
            totalResponseTime += a.responseTime;
            return a;
        });
        if (this.analyticsData.performances.length === 0)
            this.analyticsData.averageResponseTime = 0;
        else
            this.analyticsData.averageResponseTime = Math.round(totalResponseTime / this.analyticsData.performances.length);
    };
    AppConfig.prototype.clearExceptions = function () {
        this.analyticsData.exceptions.length = 0;
        this.setLocalStorage("analyticsData", this.analyticsData);
    };
    AppConfig.prototype.clearResponseTime = function () {
        this.analyticsData.performances.length = 0;
        this.analyticsData.averageResponseTime = 0;
        this.setLocalStorage("analyticsData", this.analyticsData);
    };
    AppConfig.prototype.logResonseData = function (responseTime) {
        var analyticsData = this.getLocalStorage("analyticsData");
        if (analyticsData.performances.length > 9) {
            analyticsData.performances.pop();
        }
        var performance = new _shared_client_side_models_analyticsData__WEBPACK_IMPORTED_MODULE_4__["Performance"]();
        performance.date = new Date();
        performance.responseTime = responseTime;
        analyticsData.performances.unshift(performance);
        this.setLocalStorage("analyticsData", analyticsData);
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
        this.beginRequest = new Date().getTime();
        try {
            performance.mark("BEGIN REQUEST");
        }
        catch (e) { }
        this.httpGet("sysInfo", "", "", function (appSettings) {
            _this.logResonseData(new Date().getTime() - _this.beginRequest);
            _this.setLocalStorage("appSettings", appSettings);
            try {
                performance.mark("REQUEST ENDED");
            }
            catch (e) { }
            _this.appSettings = appSettings;
            _this.isInitialized = true;
            success();
        }, function (errorMessage) {
            _this.appSettings = _this.getLocalStorage("appSettings");
            if (!_this.appSettings) {
                _this.appSettings = new _shared_client_side_models_buildModels__WEBPACK_IMPORTED_MODULE_3__["AppSettings"]();
                _this.appSettings.debug = false;
                _this.appSettings.testing = false;
                _this.appSettings.projectVersionNo = "xx.xx.xx";
                _this.appSettings.splashTime = 5000;
            }
            _this.isInitialized = true;
            error(errorMessage);
        });
    };
    AppConfig.prototype.sendTextMessage = function (textMessage, success, error) {
        this.httpPost("comm", "post", textMessage, function () {
            success();
        }, function (errorMessage) {
            error(errorMessage);
            // this error is generated from the service worker, because of a post
        });
    };
    AppConfig.prototype.onResizeApp = function () {
        if (screen.availWidth <= 767)
            this.isPhoneSize = true;
        else
            this.isPhoneSize = false;
        this.onOrientationChange();
        this.screenWidth = this.getScreenWidth();
        this.screenHeight = this.getScreenHeight();
    };
    AppConfig.prototype.onOrientationChange = function () {
        if (screen.availWidth > screen.availHeight)
            this.isLandscapeView = true;
        else
            this.isLandscapeView = false;
    };
    AppConfig.prototype.getScreenWidth = function () {
        if (this.isPhoneSize)
            return screen.availWidth;
        else
            return document.body.clientWidth;
    };
    AppConfig.prototype.getScreenHeight = function () {
        if (this.isPhoneSize)
            return screen.availHeight;
        else
            return document.body.clientHeight;
    };
    AppConfig = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], AppConfig);
    return AppConfig;
}(_baseServices__WEBPACK_IMPORTED_MODULE_2__["BaseServices"]));



/***/ }),

/***/ "./common/baseServices.ts":
/*!********************************!*\
  !*** ./common/baseServices.ts ***!
  \********************************/
/*! exports provided: BaseServices */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseServices", function() { return BaseServices; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _shared_client_side_models_analyticsData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/client-side-models/analyticsData */ "./shared/client-side-models/analyticsData.ts");


var BaseServices = /** @class */ (function () {
    function BaseServices(http) {
        this.http = http;
        if (!this.getLocalStorage("analyticsData")) {
            var analyticsData = new _shared_client_side_models_analyticsData__WEBPACK_IMPORTED_MODULE_1__["AnalyticsData"]();
            analyticsData.exceptions = new Array();
            analyticsData.performances = new Array();
            this.setLocalStorage("analyticsData", analyticsData);
        }
    }
    BaseServices.prototype.httpGet = function (controller, action, value, success, error) {
        this.get(controller, action, value)
            .subscribe(function (obj) { success(obj); }, function (errorMessage) {
            error(errorMessage);
        });
    };
    BaseServices.prototype.get = function (controller, action, value) {
        var endPoint = "api/" + controller;
        if (action.length > 0)
            endPoint += "/" + action;
        if (value.length > 0)
            endPoint += "/" + value;
        endPoint = location.origin + "/" + endPoint;
        return this.http.get(endPoint).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) { return response; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["catchError"])(this.handleError));
    };
    BaseServices.prototype.httpPost = function (controller, action, object, success, error) {
        this.post(controller, action, object)
            .subscribe(function (obj) { success(obj); }, function (errorMessage) {
            error(errorMessage);
        });
    };
    BaseServices.prototype.post = function (controller, action, object) {
        var endPoint = "api/" + controller;
        endPoint = location.origin + "/" + endPoint;
        return this.http.post(endPoint + ("/" + action), object).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) { return response; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["catchError"])(this.handleError));
    };
    BaseServices.prototype.httpDelete = function (controller, success, error) {
        this.delete(controller)
            .subscribe(function (obj) { success(obj); }, function (errorMessage) {
            error(errorMessage);
        });
    };
    BaseServices.prototype.delete = function (controller) {
        var endPoint = "api/" + controller;
        endPoint = location.origin + "/" + endPoint;
        return this.http.delete(endPoint + ("api/" + controller)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) { return response; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["catchError"])(this.handleError));
    };
    BaseServices.prototype.handleError = function (customResponse, caught) {
        if (customResponse.status !== 0) {
            var analyticsData = JSON.parse(localStorage.getItem("analyticsData"));
            if (analyticsData.exceptions.length > 99) {
                analyticsData.exceptions.pop();
            }
            var exception = new _shared_client_side_models_analyticsData__WEBPACK_IMPORTED_MODULE_1__["Exception"]();
            exception.date = new Date();
            exception.errorMessage = customResponse.error;
            analyticsData.exceptions.unshift(exception);
            localStorage.setItem("analyticsData", JSON.stringify(analyticsData, null, 2));
        }
        throw customResponse.error;
    };
    BaseServices.prototype.setLocalStorage = function (name, anyObject) {
        if (anyObject instanceof Array) {
            anyObject = { array: anyObject };
        }
        if (typeof (anyObject) == "object") {
            var stringVal = JSON.stringify(anyObject, null, 2);
            if (stringVal)
                localStorage.setItem(name, stringVal);
        }
    };
    BaseServices.prototype.getLocalStorage = function (name) {
        var value = localStorage.getItem(name);
        if (!value)
            return null;
        if (value.substring(0, 1) === "{") {
            var obj = JSON.parse(value);
            if ("array" in obj)
                return obj.array;
            return obj;
        }
        return null;
    };
    return BaseServices;
}());



/***/ }),

/***/ "./common/buildConfig.ts":
/*!*******************************!*\
  !*** ./common/buildConfig.ts ***!
  \*******************************/
/*! exports provided: BuildConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BuildConfig", function() { return BuildConfig; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _baseServices__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./baseServices */ "./common/baseServices.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _shared_client_side_models_buildModels__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/client-side-models/buildModels */ "./shared/client-side-models/buildModels.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BuildConfig = /** @class */ (function (_super) {
    __extends(BuildConfig, _super);
    function BuildConfig(http) {
        var _this = _super.call(this, http) || this;
        _this.http = http;
        _this.buildOutput = "";
        _this.config = new _shared_client_side_models_buildModels__WEBPACK_IMPORTED_MODULE_4__["BuildConfiguration"]();
        return _this;
    }
    BuildConfig.prototype.getBuildConfig = function (success, error) {
        var _this = this;
        this.httpGet("build", "getConfig", "", function (config) {
            _this.config = config;
            success();
        }, function (errorMessage) {
            error(errorMessage);
        });
    };
    BuildConfig.prototype.buildAngularProject = function (angularProject, success, error) {
        var _this = this;
        this.angularProject = angularProject;
        this.httpPost("build", "buildAngularProject", angularProject, function (buildResponse) {
            _this.buildOutput += buildResponse.consoleWindow;
            var visualProject = lodash__WEBPACK_IMPORTED_MODULE_3__["filter"](_this.config.visualProjects, function (x) { return (x.name === _this.visualProject.name); })[0];
            visualProject.projectVersionNo = buildResponse.versionNo;
            success();
        }, function (errorMessage) {
            error(errorMessage);
        });
    };
    BuildConfig.prototype.buildAngularProjects = function (visualProject, success, error) {
        var _this = this;
        this.visualProject = visualProject;
        this.consoleWindow = document.querySelector(".textAreaForConsole");
        this.projectQueue = lodash__WEBPACK_IMPORTED_MODULE_3__["cloneDeep"](visualProject.developerSettings.angularProjects);
        this.buildOutput = visualProject.name + ">";
        setTimeout(function () {
            _this.projectQueue.forEach(function (project) { project.visualProject = visualProject.name; });
            _this.buildOutput = "";
            _this.buildProjectLoop(success, error);
        }, 1000);
    };
    BuildConfig.prototype.buildProjectLoop = function (success, error) {
        var _this = this;
        this.nextAngularProject(function () {
            setTimeout(function () {
                _this.consoleWindow.scrollTop = _this.consoleWindow.scrollHeight;
            }, 0);
            if (_this.projectQueue.length === 0)
                success();
            else
                _this.buildProjectLoop(success, error);
        }, function () {
            error();
        });
    };
    BuildConfig.prototype.nextAngularProject = function (success, error) {
        var _this = this;
        var angularProject = this.projectQueue.shift();
        if (angularProject.buildEnabled) {
            this.buildOutput += angularProject.name + ">";
            var intervalId_1 = setInterval(function () {
                _this.buildOutput += ".";
            }, 250);
            this.buildAngularProject(angularProject, function (build) {
                clearInterval(intervalId_1);
                success();
            }, function (errorMessage) {
                error(errorMessage);
            });
        }
        else
            success();
    };
    BuildConfig.prototype.saveVisualProject = function (visualProject, success, error) {
        this.httpPost("build", "saveVisualProject", visualProject, function () {
            success();
        }, function () {
            error("Error: Problems saving changes! Could be that the server is not available.");
        });
    };
    BuildConfig.prototype.updateImports = function (visualProject, success, error) {
        this.httpPost("build", "updateImports", visualProject, function () {
            success();
        }, function (errorMessage) {
            error(errorMessage);
        });
    };
    BuildConfig.prototype.updateExports = function (visualProject, success, error) {
        this.httpPost("build", "updateExports", visualProject, function () {
            success();
        }, function (errorMessage) {
            error(errorMessage);
        });
    };
    BuildConfig.prototype.isImportsUpdated = function (vsProject) {
        return false;
    };
    BuildConfig.prototype.getIsExportsUpdated = function (vsProject, success, error) {
        this.httpGet("build", "getIsExportLibrariesSame", vsProject.name, function (allFilesSame) {
            success(allFilesSame);
        }, function (errorMessage) {
            error(errorMessage);
        });
        return false;
    };
    BuildConfig.prototype.addProject = function (visualProject, success, error) {
        var _this = this;
        this.httpPost("build", "addProject", visualProject, function (visualProject) {
            _this.config.visualProjects = lodash__WEBPACK_IMPORTED_MODULE_3__["map"](_this.config.visualProjects, function (x) { return x.name === _this.visualProject.name ? visualProject : x; });
            success();
        }, function (errorMessage) {
            error(errorMessage);
        });
    };
    BuildConfig.prototype.removeProject = function (visualProject, success, error) {
        this.httpPost("build", "removeProject", visualProject, function () {
            visualProject.developerSettings.serveApp = "desktop";
            success();
        }, function (errorMessage) {
            error(errorMessage);
        });
    };
    BuildConfig.prototype.launchApp = function (visualProject, success, error) {
        this.httpPost("build", "launchApp", visualProject, function () {
            success();
        }, function (errorMessage) {
            error(errorMessage);
        });
    };
    BuildConfig = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], BuildConfig);
    return BuildConfig;
}(_baseServices__WEBPACK_IMPORTED_MODULE_2__["BaseServices"]));



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
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/moment/locale sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "./shared/client-side-models/analyticsData.ts":
/*!****************************************************!*\
  !*** ./shared/client-side-models/analyticsData.ts ***!
  \****************************************************/
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

/***/ "./shared/client-side-models/buildModels.ts":
/*!**************************************************!*\
  !*** ./shared/client-side-models/buildModels.ts ***!
  \**************************************************/
/*! exports provided: Dependency, TextMessage, CellCarrier, AppSettings, AngularProject, LaunchSettings, DeveloperSettings, VisualProject, BuildConfiguration, BuildResponse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Dependency", function() { return Dependency; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextMessage", function() { return TextMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CellCarrier", function() { return CellCarrier; });
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

var AppSettings = /** @class */ (function () {
    function AppSettings() {
        this.debug = false;
        this.testing = false;
        this.connectionString = "";
        this.projectVersionNo = "";
        this.splashTime = 0;
        this.googleMapKey = "";
        this.smtpReply = "";
        this.smtpHost = "";
        this.smtpPort = 0;
        this.smtpUn = "";
        this.smtpPw = "";
        this.cellCarriers = "";
        this.aspNetCoreVersion = "";
    }
    return AppSettings;
}());

var AngularProject = /** @class */ (function () {
    function AngularProject() {
        this.visualProject = "";
        this.name = "";
        this.buildEnabled = false;
        this.pwaSupport = false;
        this.production = false;
        this.distFolder = "";
        this.angularModule = "";
        this.angularRoot = "";
        this.angularProjectDir = "";
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
        this.machineName = "";
        this.buildHook = false;
        this.importHook = false;
        this.executeDist = false;
        this.serveApp = "";
        this.releaseApp = "";
        this.libraryExports = Array();
        this.angularProjects = Array();
    }
    return DeveloperSettings;
}());

var VisualProject = /** @class */ (function () {
    function VisualProject() {
        this.name = "";
        this.projectVersionNo = "";
        this.applicationUrl = "";
        this.workingDirectory = "";
        this.developerSettings = new DeveloperSettings();
        this.showPanel = false;
        this.showVersion = true;
    }
    return VisualProject;
}());

var BuildConfiguration = /** @class */ (function () {
    function BuildConfiguration() {
        this.machineName = "";
        this.visualProjects = Array();
        this.shared = Array();
    }
    return BuildConfiguration;
}());

var BuildResponse = /** @class */ (function () {
    function BuildResponse() {
        this.consoleWindow = "";
        this.versionNo = "";
    }
    return BuildResponse;
}());



/***/ }),

/***/ "./shared/ng2-animation/appAnimation.ts":
/*!**********************************************!*\
  !*** ./shared/ng2-animation/appAnimation.ts ***!
  \**********************************************/
/*! exports provided: AppAnimation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppAnimation", function() { return AppAnimation; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _expandVisible__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./expandVisible */ "./shared/ng2-animation/expandVisible.ts");
/* harmony import */ var _viewFader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./viewFader */ "./shared/ng2-animation/viewFader.ts");
/* harmony import */ var _viewBlinker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./viewBlinker */ "./shared/ng2-animation/viewBlinker.ts");
/* harmony import */ var _modalDialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modalDialog */ "./shared/ng2-animation/modalDialog.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var AppAnimation = /** @class */ (function () {
    function AppAnimation() {
    }
    AppAnimation = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]],
            declarations: [_viewFader__WEBPACK_IMPORTED_MODULE_4__["ViewFader"], _viewBlinker__WEBPACK_IMPORTED_MODULE_5__["ViewBlinker"], _expandVisible__WEBPACK_IMPORTED_MODULE_3__["ExpandVisible"], _modalDialog__WEBPACK_IMPORTED_MODULE_6__["ModalDialog"]],
            exports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _viewFader__WEBPACK_IMPORTED_MODULE_4__["ViewFader"],
                _viewBlinker__WEBPACK_IMPORTED_MODULE_5__["ViewBlinker"],
                _expandVisible__WEBPACK_IMPORTED_MODULE_3__["ExpandVisible"],
                _modalDialog__WEBPACK_IMPORTED_MODULE_6__["ModalDialog"]
            ]
        })
    ], AppAnimation);
    return AppAnimation;
}());



/***/ }),

/***/ "./shared/ng2-animation/expandVisible.ts":
/*!***********************************************!*\
  !*** ./shared/ng2-animation/expandVisible.ts ***!
  \***********************************************/
/*! exports provided: ExpandVisible */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExpandVisible", function() { return ExpandVisible; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm5/animations.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ExpandVisible = /** @class */ (function () {
    function ExpandVisible() {
        this.isVisible = false;
        this.visibility = "hidden";
        this.initalized = false;
    }
    ExpandVisible.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.initalized = true;
        }, 500);
    };
    ExpandVisible.prototype.ngOnChanges = function () {
        this.visibility = this.isVisible ? "shown" : "hidden";
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ExpandVisible.prototype, "isVisible", void 0);
    ExpandVisible = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "expand-visible",
            template: "\n    <div [@visibilityChanged]=\"visibility\" [style.visibility]=\"initalized ? 'visible' : 'hidden' \">\n      <ng-content></ng-content>    \n    </div>\n  ",
            animations: [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["trigger"])("visibilityChanged", [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["state"])("shown", Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ opacity: 1, height: "100%", width: "100%" })),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["state"])("hidden", Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ opacity: 0, height: "0", width: "0" })),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["transition"])("* => *", Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])(".5s"))
                ])
            ]
        })
    ], ExpandVisible);
    return ExpandVisible;
}());



/***/ }),

/***/ "./shared/ng2-animation/modalDialog.ts":
/*!*********************************************!*\
  !*** ./shared/ng2-animation/modalDialog.ts ***!
  \*********************************************/
/*! exports provided: ModalDialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalDialog", function() { return ModalDialog; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm5/animations.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ModalDialog = /** @class */ (function () {
    function ModalDialog() {
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
        this.visibleChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.initalized = false;
    }
    ModalDialog.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.initalized = true;
        }, 500);
    };
    ModalDialog.prototype.ngOnChanges = function () {
        if (!this.initalized)
            return;
        this.dialogWidth = this.desiredWidth;
        this.dialogHeight = this.desiredHeight;
    };
    ModalDialog.prototype.clickedOutsideOfDialog = function () {
        if (this.denyClosing)
            return;
        this.closeDialog();
    };
    ModalDialog.prototype.closeDialog = function () {
        this.isVisible = false;
        this.visibleChange.emit(this.isVisible);
    };
    ModalDialog.prototype.onbuttonClicked = function (buttonClicked) {
        try {
            this.dialogButtonCallback(buttonClicked);
        }
        catch (e) { /* the owner must not have a "dialogButtonClicked()" function */
            // I implemented it this way because using a callback does not preserve the "this" pointer
            this.closeDialog();
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ModalDialog.prototype, "isClosable", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], ModalDialog.prototype, "isVisible", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ModalDialog.prototype, "showOkButton", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ModalDialog.prototype, "showCancelButton", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ModalDialog.prototype, "showYesButton", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ModalDialog.prototype, "showNoButton", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ModalDialog.prototype, "okDisabled", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ModalDialog.prototype, "cancelDisabled", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ModalDialog.prototype, "yesDisabled", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ModalDialog.prototype, "noDisabled", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], ModalDialog.prototype, "modalDialogTitle", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ModalDialog.prototype, "desiredHeight", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ModalDialog.prototype, "desiredWidth", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ModalDialog.prototype, "dialogHeight", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ModalDialog.prototype, "dialogWidth", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], ModalDialog.prototype, "denyClosing", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], ModalDialog.prototype, "visibleChange", void 0);
    ModalDialog = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "modal-dialog",
            //#region template:
            template: "\n    <div [@modalDialogTrigger] *ngIf=\"isVisible\" class=\"modalDialog\" [style.height.px]=\"dialogHeight\" [style.width.px]=\"dialogWidth\">\n        <div class=\"dialogTitle\">\n            <p>{{modalDialogTitle}}</p>\n        </div>\n        <ng-content></ng-content>\n        <button *ngIf=\"isClosable\" (click)=\"closeDialog()\" aria-label=\"Close\" class=\"dialog__close-btn\">X</button>\n        <div class=\"dialogFooter\" >\n            <hr style=\"margin-left: 20px; margin-bottom: 10px; \" />\n            <button *ngIf=\"showCancelButton\" [disabled]=\"cancelDisabled\" class=\"btn btn-primary\" style=\"float: right; margin-left: 5px; margin-bottom: 10px; width: 75px;\" (click)=\"onbuttonClicked('cancel')\">Cancel</button>\n            <button *ngIf=\"showOkButton\" [disabled]=\"okDisabled\" class=\"btn btn-primary\" style=\"float: right; margin-left: 5px; margin-bottom: 10px; width: 75px;\" (click)=\"onbuttonClicked('ok')\">OK</button>\n            <button *ngIf=\"showNoButton\" [disabled]=\"noDisabled\" class=\"btn btn-primary\" style=\"float: right; margin-left: 5px; margin-bottom: 10px; width: 75px;\" (click)=\"onbuttonClicked('no')\">No</button>\n            <button *ngIf=\"showYesButton\" [disabled]=\"yesDisabled\" class=\"btn btn-primary\" style=\"float: right; margin-left: 5px; margin-bottom: 10px; width: 75px;\" (click)=\"onbuttonClicked('yes')\">Yes</button>\n        </div>\n    </div>\n    <div *ngIf=\"isVisible\" class=\"overlay\" (click)=\"clickedOutsideOfDialog()\"></div>\n    ",
            // #endregion
            //#region styles:
            styles: ["\n    .overlay {\n      position: fixed;\n      top: 0;\n      bottom: 0;\n      left: 0;\n      right: 0;\n      background-color: rgba(0, 0, 0, 0.5);\n      z-index: 999;\n    }\n    .modalDialog {\n      z-index: 1000;\n      position: fixed;\n      right: 0;\n      left: 0;\n      top: 20px;\n      margin-top: 100px;\n      margin-right: auto;\n      margin-left: auto;\n      background-color: #fff;\n      padding: 12px;\n      box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2), 0 13px 19px 2px rgba(0, 0, 0, 0.14), 0 5px 24px 4px rgba(0, 0, 0, 0.12);\n     -ms-border-radius: 5px !important;\n     border-radius: 5px !important;\n    }\n    @media (min-width: 768px) {\n      .modalDialog {\n        top: 40px;\n      }\n    }\n    .dialog__close-btn {\n      border: 0;\n      background: none;\n      color: #2d2d2d;\n      position: absolute;\n      top: 8px;\n      right: 8px;\n      font-size: 1.2em;\n      cursor: pointer;\n    }\n    .dialogTitle {\n      overflow:auto;\n        width: 90%;\n      max-width: 520px;\n        font-size: 16px;\n    }\n    .dialogFooter {\n      overflow:hidden;\n        width: 95%;\n        position: absolute;\n        bottom: 0;\n    }\n    "],
            // #endregion
            animations: [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["trigger"])("modalDialogTrigger", [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["transition"])("void => *", [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ transform: "scale3d(.3, .3, .3)" }),
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])(100)
                    ]),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["transition"])("* => void", [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])(100, Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ transform: "scale3d(.0, .0, .0)" }))
                    ])
                ])
            ]
        })
    ], ModalDialog);
    return ModalDialog;
}());



/***/ }),

/***/ "./shared/ng2-animation/viewBlinker.ts":
/*!*********************************************!*\
  !*** ./shared/ng2-animation/viewBlinker.ts ***!
  \*********************************************/
/*! exports provided: ViewBlinker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewBlinker", function() { return ViewBlinker; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm5/animations.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ViewBlinker = /** @class */ (function () {
    function ViewBlinker() {
        this.blinking = false;
        this.visibleWhenNotBlinking = false;
        this.visibility = "hidden";
        this.initalized = false;
    }
    ViewBlinker.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.initalized = true;
        }, 500);
    };
    ViewBlinker.prototype.startBlinking = function () {
        var _this = this;
        this.intervalId = setInterval(function () {
            if (!_this.blinking) {
                clearInterval(_this.intervalId);
                return;
            }
            if (_this.visibility === "shown")
                _this.visibility = "hidden";
            else
                _this.visibility = "shown";
        }, 750);
    };
    ViewBlinker.prototype.ngOnChanges = function () {
        if (this.blinking)
            this.startBlinking();
        this.visibility = this.visibleWhenNotBlinking ? "shown" : "hidden";
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ViewBlinker.prototype, "blinking", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ViewBlinker.prototype, "visibleWhenNotBlinking", void 0);
    ViewBlinker = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "view-blinker",
            template: "\n    <div [@visibilityChanged]=\"visibility\" [style.visibility]=\"initalized ? 'visible' : 'hidden' \">\n      <ng-content></ng-content>    \n    </div>\n  ",
            animations: [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["trigger"])("visibilityChanged", [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["state"])("shown", Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ opacity: 1 })),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["state"])("hidden", Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ opacity: 0 })),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["transition"])("* => *", Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])(".25s"))
                ])
            ]
        })
    ], ViewBlinker);
    return ViewBlinker;
}());



/***/ }),

/***/ "./shared/ng2-animation/viewFader.ts":
/*!*******************************************!*\
  !*** ./shared/ng2-animation/viewFader.ts ***!
  \*******************************************/
/*! exports provided: ViewFader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewFader", function() { return ViewFader; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm5/animations.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ViewFader = /** @class */ (function () {
    function ViewFader() {
        this.isViewVisible = false;
        this.visibility = "hidden";
        this.initalized = false;
    }
    ViewFader.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.initalized = true;
            if (_this.isViewVisible)
                _this.visibility = "shown";
            else
                _this.visibility = "hidden";
        }, 500);
    };
    ViewFader.prototype.ngOnChanges = function () {
        if (!this.initalized)
            return;
        this.visibility = this.isViewVisible ? "shown" : "hidden";
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ViewFader.prototype, "isViewVisible", void 0);
    ViewFader = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "view-fader",
            template: "\n    <div [@visibilityChanged]=\"visibility\" [style.visibility]=\"initalized ? 'visible' : 'hidden' \">\n      <ng-content></ng-content>    \n    </div>\n  ",
            animations: [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["trigger"])("visibilityChanged", [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["state"])("shown", Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ opacity: 1 })),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["state"])("hidden", Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ opacity: 0 })),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["transition"])("* => *", Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])(".5s"))
                ])
            ]
        }),
        __metadata("design:paramtypes", [])
    ], ViewFader);
    return ViewFader;
}());



/***/ }),

/***/ "./shared/ng2-apphelper/appHelper.ts":
/*!*******************************************!*\
  !*** ./shared/ng2-apphelper/appHelper.ts ***!
  \*******************************************/
/*! exports provided: AppHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppHelper", function() { return AppHelper; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _appServices__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./appServices */ "./shared/ng2-apphelper/appServices.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var AppHelper = /** @class */ (function () {
    function AppHelper() {
    }
    AppHelper_1 = AppHelper;
    AppHelper.forRoot = function () {
        return {
            ngModule: AppHelper_1,
            providers: [_appServices__WEBPACK_IMPORTED_MODULE_1__["AppServices"]]
        };
    };
    var AppHelper_1;
    AppHelper = AppHelper_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [],
            exports: []
        })
    ], AppHelper);
    return AppHelper;
}());



/***/ }),

/***/ "./shared/ng2-apphelper/appServices.ts":
/*!*********************************************!*\
  !*** ./shared/ng2-apphelper/appServices.ts ***!
  \*********************************************/
/*! exports provided: thisWindow, AppServices */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "thisWindow", function() { return thisWindow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppServices", function() { return AppServices; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var thisWindow = /** @class */ (function (_super) {
    __extends(thisWindow, _super);
    function thisWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return thisWindow;
}(Window));

var AppServices = /** @class */ (function () {
    function AppServices() {
    }
    //#region beep
    AppServices.prototype.beep = function (duration, frequency, volume, type, callback) {
        // type can be: sine, square, sawtooth, triangle or custom
        // frequency: 440 is 440Hz
        if (!this.audioCtx)
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext || window.audioContext);
        var oscillator = this.audioCtx.createOscillator();
        var gainNode = this.audioCtx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(this.audioCtx.destination);
        if (volume) {
            gainNode.gain.setValueAtTime(volume, this.audioCtx.currentTime);
        }
        ;
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
    ;
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
        var newLineArray = txtElement.value.split("\n");
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
                range.moveStart("character", newLines[index]);
                range.select();
            }
            if (index === newLines.length - 1)
                clearInterval(intervalId);
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
        if (doc.fullscreenElement || doc.webkitFullscreenElement || doc.mozFullScreenElement || doc.msFullscreenElement)
            return true;
        else
            return false;
    };
    AppServices = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], AppServices);
    return AppServices;
}());



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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _common_appConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/appConfig */ "./common/appConfig.ts");
/* harmony import */ var _common_buildConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/buildConfig */ "./common/buildConfig.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_ng2_apphelper_appServices__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/ng2-apphelper/appServices */ "./shared/ng2-apphelper/appServices.ts");
/* harmony import */ var _shared_client_side_models_buildModels__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/client-side-models/buildModels */ "./shared/client-side-models/buildModels.ts");
/* harmony import */ var _shared_ng2_animation_modalDialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/ng2-animation/modalDialog */ "./shared/ng2-animation/modalDialog.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_7__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// services







var AppComponent = /** @class */ (function () {
    function AppComponent(ac, bc, toastr, as) {
        this.ac = ac;
        this.bc = bc;
        this.toastr = toastr;
        this.appTitle = "Angular.Net Configuration Tool";
        this.showOpeningTitle = true;
        this.showBuildView = false;
        this.appLoaded = false;
        this.showModalDialog = false;
        this.showBuildDialog = false;
        this.showAddDialog = false;
        this.showRemoveDialog = false;
        this.savingChanges = false;
        this.isImportsUpdated = false;
        this.isExportsUpdated = false;
        this.newAngularProject = "";
        this.appHref = window.location.href;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.getBuildConfig();
    };
    AppComponent.prototype.getBuildConfig = function () {
        var _this = this;
        this.bc.getBuildConfig(function () {
            setTimeout(function () {
                _this.showOpeningTitle = false;
                setTimeout(function () {
                    _this.bc.buildOutput = "Angular.Net> ";
                    _this.showBuildView = true;
                }, 500);
            }, 500);
        }, function (errorMessage) {
            _this.toastr.error(errorMessage);
        });
    };
    AppComponent.prototype.onClickDebugRelease = function (vsProject) {
        vsProject.developerSettings.executeDist = !vsProject.developerSettings.executeDist;
    };
    AppComponent.prototype.willExecuteRelease = function (vsProject) {
        if (vsProject.developerSettings.executeDist)
            return "checked";
        else
            return "";
    };
    AppComponent.prototype.angularProjectSelected = function (vsProject, angularProject) {
        if (vsProject.developerSettings.serveApp === angularProject.name)
            return true;
        else
            return false;
    };
    AppComponent.prototype.willExecuteProject = function (vsProject, angularProject) {
        if (vsProject.developerSettings.serveApp === angularProject.name && !vsProject.developerSettings.executeDist)
            return true;
        else
            return false;
    };
    AppComponent.prototype.onClickDebugEnabled = function (vsProject, angularProject) {
        vsProject.developerSettings.executeDist = false;
        vsProject.developerSettings.serveApp = angularProject.name;
    };
    AppComponent.prototype.onClickReleaseProject = function (vsProject, angularProject) {
        vsProject.developerSettings.serveApp = angularProject.name;
    };
    AppComponent.prototype.isBuildDisabled = function (vsProject) {
        if (lodash__WEBPACK_IMPORTED_MODULE_7__["filter"](vsProject.developerSettings.angularProjects, function (x) { return (x.buildEnabled); }).length === 0)
            return true;
        else
            return false;
    };
    AppComponent.prototype.saveChanges = function (vsProject) {
        var _this = this;
        if (this.savingChanges)
            return;
        this.savingChanges = true;
        this.bc.saveVisualProject(vsProject, function () {
            _this.savingChanges = false;
        }, function (errorMessage) {
            _this.toastr.error(errorMessage);
            _this.savingChanges = false;
        });
    };
    AppComponent.prototype.isProjectNameValue = function () {
        var _this = this;
        this.md.okDisabled = true;
        if (this.newAngularProject.length > 2)
            this.md.okDisabled = false;
        if (lodash__WEBPACK_IMPORTED_MODULE_7__["find"](this.bc.visualProject.developerSettings.angularProjects, function (x) { return (x.name === _this.newAngularProject); }))
            this.md.okDisabled = true;
    };
    AppComponent.prototype.isKeyValid = function (key) {
        if (key === " ")
            return false;
        var rg1 = /^[^\\/:\*\?\]"<>.,0123456789;!@#$%^&'{}[\|]+$/; // forbidden characters
        if (rg1.test(key))
            return true;
        return false;
    };
    AppComponent.prototype.onClickRemove = function (vsProject, angularProject) {
        var _this = this;
        this.bc.visualProject = vsProject;
        this.bc.angularProject = angularProject;
        this.md.modalDialogTitle = "Removing an Angular Project";
        this.md.showCancelButton = false;
        this.md.isClosable = true;
        this.md.desiredWidth = 400;
        this.md.desiredHeight = 200;
        this.md.showYesButton = true;
        this.md.showNoButton = true;
        this.md.showOkButton = false;
        this.md.showCancelButton = false;
        this.showModalDialog = false;
        this.showBuildDialog = false;
        this.showAddDialog = false;
        this.showRemoveDialog = false;
        setTimeout(function () {
            _this.showModalDialog = true;
            _this.showRemoveDialog = true;
        }, 0);
        this.md.dialogButtonCallback = function (buttonClicked) {
            if (buttonClicked === "yes") {
                // move Angular project to the bottom
                lodash__WEBPACK_IMPORTED_MODULE_7__["remove"](vsProject.developerSettings.angularProjects, angularProject);
                vsProject.developerSettings.angularProjects.push(angularProject);
                _this.bc.removeProject(vsProject, function () {
                    _this.toastr.success("Completed the remove successfully!");
                    lodash__WEBPACK_IMPORTED_MODULE_7__["remove"](vsProject.developerSettings.angularProjects, angularProject);
                    _this.md.closeDialog();
                }, function (errorMessage) {
                    _this.toastr.error(errorMessage);
                });
            }
            else
                _this.md.closeDialog();
        };
    };
    AppComponent.prototype.onClickLanch = function (vsProject) {
        var _this = this;
        this.bc.launchApp(vsProject, function () {
            _this.toastr.success("Completed the launch successfully!");
        }, function (errorMessage) {
            _this.toastr.error(errorMessage);
        });
    };
    AppComponent.prototype.onClickAdd = function (vsProject) {
        var _this = this;
        this.bc.visualProject = vsProject;
        this.md.modalDialogTitle = "Adding an Angular Project to: " + vsProject.name;
        this.md.showCancelButton = false;
        this.md.isClosable = true;
        this.md.desiredWidth = 400;
        this.md.desiredHeight = 200;
        this.md.showOkButton = true;
        this.md.showCancelButton = true;
        this.md.showYesButton = false;
        this.md.showNoButton = false;
        this.md.okDisabled = true;
        this.showModalDialog = false;
        this.showBuildDialog = false;
        this.showAddDialog = false;
        this.showRemoveDialog = false;
        this.newAngularProject = "";
        setTimeout(function () {
            _this.showModalDialog = true;
            _this.showAddDialog = true;
            setTimeout(function () {
                var angularProjectName = document.querySelector(".angularProjectName");
                angularProjectName.focus();
            }, 0);
        }, 0);
        this.md.dialogButtonCallback = function (buttonClicked) {
            if (buttonClicked === "ok") {
                _this.md.closeDialog();
                var angularProject_1 = new _shared_client_side_models_buildModels__WEBPACK_IMPORTED_MODULE_5__["AngularProject"]();
                angularProject_1.name = _this.newAngularProject;
                var vsp = lodash__WEBPACK_IMPORTED_MODULE_7__["cloneDeep"](vsProject);
                vsp.developerSettings.angularProjects.push(angularProject_1);
                _this.ac.showSpinner(true);
                _this.bc.addProject(vsp, function () {
                    _this.ac.showSpinner(false);
                    vsProject.developerSettings.angularProjects.push(angularProject_1);
                    _this.toastr.success("Completed the add successfully!");
                }, function (errorMessage) {
                    _this.toastr.error(errorMessage);
                });
            }
            else
                _this.md.closeDialog();
        };
    };
    AppComponent.prototype.onClickBuild = function (visualProject) {
        var _this = this;
        this.md.modalDialogTitle = "Building: " + visualProject.name;
        this.md.showCancelButton = false;
        this.md.isClosable = false;
        this.md.showOkButton = false;
        this.md.showCancelButton = false;
        this.md.showYesButton = false;
        this.md.showNoButton = false;
        this.md.desiredWidth = 650;
        this.md.desiredHeight = 475;
        this.showModalDialog = false;
        this.showBuildDialog = false;
        this.showAddDialog = false;
        this.showRemoveDialog = false;
        this.md.denyClosing = true;
        setTimeout(function () {
            _this.showModalDialog = true;
            _this.showBuildDialog = true;
            setTimeout(function () {
                _this.bc.buildAngularProjects(visualProject, function () {
                    setTimeout(function () {
                        _this.md.closeDialog();
                        visualProject.showVersion = false;
                        _this.toastr.success("Completed the build successfully!");
                        setTimeout(function () {
                            visualProject.showVersion = true;
                        }, 1000);
                    }, 3000);
                }, function (errorMessage) {
                    _this.toastr.error(errorMessage);
                });
            }, 1000);
        }, 0);
        this.md.dialogButtonCallback = function (buttonClicked) {
            _this.md.closeDialog();
        };
    };
    AppComponent.prototype.isFolderExported = function (visualProject, folder) {
        var selected = "";
        if (lodash__WEBPACK_IMPORTED_MODULE_7__["find"](visualProject.developerSettings.libraryExports, function (x) { return (x === folder); }))
            return "selected";
    };
    AppComponent.prototype.onChangeLibraryExport = function (target, selectedLibraries, vsProjectName) {
        var _this = this;
        selectedLibraries.length = 0;
        var libraries = lodash__WEBPACK_IMPORTED_MODULE_7__["filter"](target.options, function (x) { return (x.selected); });
        var otherVsProjects = lodash__WEBPACK_IMPORTED_MODULE_7__["filter"](this.bc.config.visualProjects, function (x) { return (x.name !== vsProjectName); });
        libraries.forEach(function (library) {
            if (!_this.isExportedAlready(otherVsProjects, library.innerHTML)) {
                selectedLibraries.push(library.innerHTML);
            }
            else
                library.selected = false;
        });
    };
    AppComponent.prototype.isExportedAlready = function (otherVsProjects, library) {
        var _this = this;
        var alreadyExported = false;
        otherVsProjects.forEach(function (vsProject) {
            if (lodash__WEBPACK_IMPORTED_MODULE_7__["find"](vsProject.developerSettings.libraryExports, function (x) { return (x === library); })) {
                _this.toastr.error("Library: " + library + " is already exported by Project: " + vsProject.name, "", { tapToDismiss: true, closeButton: true });
                alreadyExported = true;
            }
        });
        return alreadyExported;
    };
    AppComponent.prototype.isProjectBuildProject = function (vsProject) {
        return vsProject.name === "ProjectBuild";
    };
    AppComponent.prototype.openVsProjectPanel = function (vsProject) {
        var _this = this;
        if (vsProject.showPanel) {
            this.bc.getIsExportsUpdated(vsProject, function (isExportsUpdated) { _this.isExportsUpdated = isExportsUpdated; }, function (errorMessage) {
                _this.toastr.error(errorMessage);
            });
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_shared_ng2_animation_modalDialog__WEBPACK_IMPORTED_MODULE_6__["ModalDialog"]),
        __metadata("design:type", _shared_ng2_animation_modalDialog__WEBPACK_IMPORTED_MODULE_6__["ModalDialog"])
    ], AppComponent.prototype, "md", void 0);
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-root",
            template: "\n<view-fader *ngIf=\"ac.isSpinnerAvailable\" [isViewVisible]=\"ac.isSpinnerVisible\" style=\"position: fixed; top: 45%; left: 45%; z-index: 500; font-size: 75px; color:#3379b7\">\n    <i class=\"fa fa-spinner fa-spin\"></i>\n</view-fader>\n\n<modal-dialog class=\"text-primary\" [isVisible]=\"showModalDialog\">\n    <div *ngIf=\"showBuildDialog\" style=\"text-align: center; \">\n        <div style=\"width: 600px; height: 350px; background-color: black; color: white; border-radius: 20px; margin: 10px; \">\n            <textarea [disabled]=\"true\" spellcheck=\"false\" class=\"textAreaForConsole\" style=\"width:95%; height: 90%; background-color: black; color: white; margin: 20px; border-width: 0; resize: none; overflow:no-display; \">{{bc.buildOutput}}</textarea>\n        </div>\n    </div>\n    <div *ngIf=\"showAddDialog\" style=\"text-align: center; \">\n        <label>Name: </label>&nbsp;\n        <input [spellcheck]=\"false\" [(ngModel)]=\"newAngularProject\" (keydown)=\"isKeyValid($event.key)\" (keyup)=\"isProjectNameValue()\" style=\"width: 22px; display:inline-block; margin-top: 10px; width: 200px; \" type=\"text\" class=\"form-control angularProjectName\" />\n    </div>\n\n    <div *ngIf=\"showRemoveDialog\" style=\"font-weight: bold; margin-left: 20px; \">\n        <label>Are you sure you want to delete<br /> Angular project: {{bc.angularProject.name}}<br /> from Visual project: {{bc.visualProject.name}}?</label>&nbsp;\n    </div>\n</modal-dialog>\n\n<view-blinker *ngIf=\"true\" [blinking]=\"showOpeningTitle\" [visibleWhenNotBlinking]=\"true\">\n    <br /><br />\n    <div class=\"text-primary\" style=\"text-align: center; width: 100%; font-family: px-neuropol; font-size: 40px; margin-top: -50px; \">{{appTitle}}: {{bc.config.machineName}}</div>\n</view-blinker>\n\n<view-fader [isViewVisible]=\"showBuildView\">\n    <br />\n    <h2 class=\"feature-title text-primary\" style=\"font-family: px-neuropol; margin-left: 40px; \">VISUAL STUDIO PROJECT(S):</h2>\n    <div class=\"feature-list card \" style=\"cursor: default;\">\n\n        <div *ngFor=\"let vsProject of bc.config.visualProjects\" class=\"feature-heading card-header\">\n            <div class=\"card-header\" style=\"padding-bottom: 18px; border-radius: 20px; \">\n                <table class=\"card-header\" style=\"font-size: 22px; font-family: px-neuropol; width: 100%; \">\n                    <tr>\n                        <td style=\"width: 40%; padding-left: 30px;\">\n                            <a href=\"javascript:void(0);\" (click)=\"vsProject.showPanel = !vsProject.showPanel; openVsProjectPanel(vsProject); \" style=\"font-weight:500; font-size: 26px; font-weight: 500; \">{{vsProject.name}}</a>\n                        </td>\n                        <td style=\"width: 25%\">\n                            <view-fader [isViewVisible]=\"vsProject.showVersion\">\n                                <span class=\"text-primary\"> Ver: {{vsProject.projectVersionNo}}</span>\n                            </view-fader>\n                        </td>\n                        <td style=\"width: 25%\"></td>\n                        <td style=\"width: 10%\">\n                            <button title=\"Build the {{vsProject.name}} Angular Projects that are Enabled\" [disabled]=\"isBuildDisabled(vsProject)\" (click)=\"onClickBuild(vsProject)\" class=\"btn btn-primary\" style=\"width: 90px; float: right; margin: 5px; font-family: Arial; \"><i class=\"fa fa-cubes\"></i>&nbsp;Build</button>\n                        </td>\n                    </tr>\n                </table>\n\n                <view-fader [isViewVisible]=\"vsProject.showPanel\" *ngIf=\"vsProject.showPanel\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                    <div class=\"card-header text-primary\" style=\"border-radius: 20px; \">\n                        <table style=\"font-size: 22px; font-family: px-neuropol; width: 100%; \">\n                            <tr>\n                                <td style=\"width: 35%; padding-left: 30px; \"></td>\n                                <td style=\"width: 35%; padding-left: 20px; \" title=\"Export Libraries from the {{vsProject.name}} Visual Studio Project\">\n                                    Export Libraries\n                                </td>\n                                <td style=\"width: 30%; padding-left: 28px; \">\n                                    <div *ngIf=\"!isProjectBuildProject(vsProject)\">\n                                        Git-Hooks\n                                    </div>\n                                </td>\n                            </tr>\n                            <tr style=\"height: 60px; \">\n                                <td></td>\n                                <td title=\"Export Libraries from the {{vsProject.name}} Visual Studio Project\">\n                                    <select [disabled]=\"isProjectBuildProject(vsProject)\" multiple class=\"form-control text-primary\" (change)=\"onChangeLibraryExport($event.target, vsProject.developerSettings.libraryExports, vsProject.name); saveChanges(vsProject); \" style=\"width: 260px; font-size: 18px; margin-bottom: 20px; \">\n                                        <option *ngFor=\"let folder of bc.config.shared\" [selected]=\"isFolderExported(vsProject, folder)\">{{folder}}</option>\n                                    </select>\n                                </td>\n                                <td>\n                                    <div *ngIf=\"!isProjectBuildProject(vsProject)\">\n                                        <div title=\"Integration with the Pre-Commit Git-Hook\">\n                                            <input [(ngModel)]=\"vsProject.developerSettings.buildHook\" (change)=\"saveChanges(vsProject)\" style=\"width: 22px; display:inline-block; margin-top: 10px; \" type=\"checkbox\" class=\"form-control\" />\n                                            <label class=\"text-primary\" style=\"display:inline-block; margin-top: 10px; vertical-align: top; margin-top: 13px; margin-left: 5px;\">Pre-Commit</label>\n                                        </div>\n                                        <div title=\"Integration with the Pre-Push Git-Hook\" style=\"margin-top: -20px; \">\n                                            <input [(ngModel)]=\"vsProject.developerSettings.importHook\" (change)=\"saveChanges(vsProject)\" style=\"width: 22px; display:inline-block; margin-top: 10px; \" type=\"checkbox\" class=\"form-control\" />\n                                            <label class=\"text-primary\" style=\"display:inline-block; margin-top: 10px; vertical-align: top; margin-top: 13px; margin-left: 5px;\">Pre-Push</label>\n                                        </div>\n                                    </div>\n                                </td>\n                            </tr>\n                        </table>\n\n                        <div class=\"feature-list card \">\n                            <div class=\"feature-title text-primary\" style=\"font-family: px-neuropol; padding-left: 75px; font-size: 26px; font-weight: 500; \">\n                                ANGULAR PROJECT(S)\n                                <button title=\"Add a New Angular Project to the {{vsProject.name}} Visual Studio Project\" (click)=\"onClickAdd(vsProject)\" class=\"btn btn-sm btn-primary\" style=\"width: 90px; float: right; margin: 5px; font-family: Arial; \"><i class=\"fa fa-plus\"></i>&nbsp;Add</button>\n                            </div>\n                            <div class=\"feature-heading card-header\">\n                                <div class=\"feature-title text-primary\" style=\"font-family: px-neuropol; padding-left: 60px; font-size: 26px; font-weight: 500; \">Startup Project:</div>\n\n                                <div class=\"card-header\" style=\"padding-bottom: 18px; \">\n                                    <table class=\"card-header text-primary\" style=\"font-size: 22px; font-family: px-neuropol; width: 100%; height: 50px; \" [style.background-color]=\"willExecuteRelease(vsProject) ? \'white\' : \'\' \">\n                                        <tr>\n                                            <td style=\"width: 35%; padding-left: 30px; \">\n                                                <div title=\"Debug using an Angular Release Build\">\n                                                    <input [checked]=\"vsProject.developerSettings.executeDist\" (click)=\"onClickDebugRelease(vsProject); saveChanges(vsProject)\" style=\"width: 22px; display:inline-block; margin-top: 10px; \" type=\"radio\" class=\"form-control\" />\n                                                    <div style=\"display:inline-block; margin-top: 10px; vertical-align: top; margin-top: 8px; margin-left: 5px; font-size: 26px; font-family: px-neuropol; font-weight: 500; \">release</div>\n                                                </div>\n                                            </td>\n                                            <td *ngFor=\"let angularProject of vsProject.developerSettings.angularProjects\">\n                                                <div *ngIf=\"vsProject.developerSettings.executeDist\">\n                                                    <div title=\"Debug using the {{angularProject.name}} Release Build\">\n                                                        <input [disabled]=\"!vsProject.developerSettings.executeDist\" (click)=\"onClickReleaseProject(vsProject, angularProject);  saveChanges(vsProject);\" [checked]=\"angularProjectSelected(vsProject, angularProject)\" style=\"width: 22px; display:inline-block; margin-top: 10px; \" type=\"radio\" class=\"form-control\" />\n                                                        <div style=\"display:inline-block; margin-top: 10px; vertical-align: top; margin-top: 10px; margin-left: 5px; font-size: 26px; font-family: px-neuropol; font-weight: 500; \">{{angularProject.name}}</div>\n                                                    </div>\n                                                </div>\n                                            </td>\n                                        </tr>\n                                    </table>\n                                </div>\n                            </div>\n\n                            <div *ngFor=\"let angularProject of vsProject.developerSettings.angularProjects\" class=\"feature-heading card-header\">\n                                <button title=\"Remove Angular Project {{angularProject.name}}  from the {{vsProject.name}} Visual Studio Project\" *ngIf=\"angularProject.name !== \'desktop\'\" (click)=\"onClickRemove(vsProject, angularProject)\" class=\"btn btn-sm btn-outline-primary\" style=\"font-size: 14px; font-weight: bold; width: 30px; float: right; margin: 5px; margin-right: 20px; font-family: Arial; \">X</button>\n                                <div class=\"card-header\" style=\"padding-bottom: 18px; \">\n                                    <table class=\"card-header text-primary\" style=\"font-size: 22px; font-family: px-neuropol; width: 100%; height: 50px; \" [style.background-color]=\"willExecuteProject(vsProject, angularProject) ? \'white\' : \'\' \">\n                                        <tr>\n                                            <td style=\"width: 35%; padding-left: 30px; \">\n                                                <div title=\"Debug the {{angularProject.name}} Angular Project\">\n                                                    <input (click)=\"onClickDebugEnabled(vsProject, angularProject);  saveChanges(vsProject);\" [checked]=\"willExecuteProject(vsProject, angularProject)\" style=\"width: 22px; display:inline-block; margin-top: 10px; \" type=\"radio\" class=\"form-control\" />\n                                                    <div style=\"display:inline-block; margin-top: 10px; vertical-align: top; margin-top: 10px; margin-left: 5px; font-size: 26px; font-family: px-neuropol; font-weight: 500; \" (click)=\"angularProject.showPanel = !angularProject.showPanel\">{{angularProject.name}}</div>\n                                                </div>\n                                            </td>\n                                            <td style=\"width: 20%\">\n                                                <div title=\"Enable the {{angularProject.name}} Release Build\">\n                                                    <input [(ngModel)]=\"angularProject.buildEnabled\" (change)=\"saveChanges(vsProject)\" style=\"width: 22px; display:inline-block; margin-top: 10px; \" type=\"checkbox\" class=\"form-control\" />\n                                                    <label class=\"text-primary\" style=\"display:inline-block; margin-top: 10px; vertical-align: top; margin-top: 13px; margin-left: 5px;\">Build</label>\n                                                </div>\n                                            </td>\n                                            <td style=\"width: 25%\">\n                                                <div title=\"Enable the Production mode for the {{angularProject.name}} Release Build\">\n                                                    <input [disabled]=\"!angularProject.buildEnabled\" [(ngModel)]=\"angularProject.production\" (change)=\"saveChanges(vsProject)\" style=\"width: 22px; display:inline-block; margin-top: 10px; \" type=\"checkbox\" class=\"form-control\" />\n                                                    <label class=\"text-primary\" style=\"display:inline-block; margin-top: 10px; vertical-align: top; margin-top: 13px; margin-left: 5px;\">Production</label>\n                                                </div>\n                                            </td>\n                                            <td style=\"width: 20%\">\n                                                <div title=\"Enable to support PWA for the {{angularProject.name}} Release Build\">\n                                                    <input [disabled]=\"!angularProject.buildEnabled\" [(ngModel)]=\"angularProject.pwaSupport\" (change)=\"saveChanges(vsProject)\" style=\"width: 22px; display:inline-block; margin-top: 10px; \" type=\"checkbox\" class=\"form-control\" />\n                                                    <label class=\"text-primary\" style=\"display:inline-block; margin-top: 10px; vertical-align: top; margin-top: 13px; margin-left: 5px;\">PWA</label>\n                                                </div>\n                                            </td>\n                                        </tr>\n                                    </table>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </view-fader>\n\n            </div>\n        </div>\n    </div>\n</view-fader>\n\n" /* this was squashed */,
            styles: ['\n' /* this was squashed */],
            providers: [_common_appConfig__WEBPACK_IMPORTED_MODULE_1__["AppConfig"], _common_buildConfig__WEBPACK_IMPORTED_MODULE_2__["BuildConfig"]]
        }),
        __metadata("design:paramtypes", [_common_appConfig__WEBPACK_IMPORTED_MODULE_1__["AppConfig"], _common_buildConfig__WEBPACK_IMPORTED_MODULE_2__["BuildConfig"], ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"], _shared_ng2_apphelper_appServices__WEBPACK_IMPORTED_MODULE_4__["AppServices"]])
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
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _shared_ng2_animation_appAnimation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/ng2-animation/appAnimation */ "./shared/ng2-animation/appAnimation.ts");
/* harmony import */ var _shared_ng2_apphelper_appHelper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/ng2-apphelper/appHelper */ "./shared/ng2-apphelper/appHelper.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






// services


// features
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]
            ],
            imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClientModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__["BrowserAnimationsModule"], ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrModule"].forRoot({
                    timeOut: 5000,
                    positionClass: "toast-bottom-right",
                    preventDuplicates: true,
                }), _shared_ng2_animation_appAnimation__WEBPACK_IMPORTED_MODULE_6__["AppAnimation"], _shared_ng2_apphelper_appHelper__WEBPACK_IMPORTED_MODULE_7__["AppHelper"].forRoot()],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]]
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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
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

module.exports = __webpack_require__(/*! C:\ProMatrix.2\Angular.Net.190406\ProjectBuild\wwwroot\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map