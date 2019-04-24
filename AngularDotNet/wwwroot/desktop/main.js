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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _baseServices__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./baseServices */ "./common/baseServices.ts");
/* harmony import */ var _shared_client_side_models_buildModels__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/client-side-models/buildModels */ "./shared/client-side-models/buildModels.ts");
/* harmony import */ var _shared_client_side_models_analyticsData__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/client-side-models/analyticsData */ "./shared/client-side-models/analyticsData.ts");
/* harmony import */ var _shared_client_side_models_apiVersions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/client-side-models/apiVersions */ "./shared/client-side-models/apiVersions.ts");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_8__);

// #region Imports








// #endregion
var AppConfig = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](AppConfig, _super);
    function AppConfig(http) {
        var _this = _super.call(this, http) || this;
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
        _this.apiVersions = new _shared_client_side_models_apiVersions__WEBPACK_IMPORTED_MODULE_6__["ApiVersions"]();
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
        this.analyticsData.exceptions = lodash__WEBPACK_IMPORTED_MODULE_8__["map"](this.analyticsData.exceptions, function (a) {
            a.dateString = moment__WEBPACK_IMPORTED_MODULE_7__(a.date).format("YYYY-MM-DD");
            a.timeString = moment__WEBPACK_IMPORTED_MODULE_7__(a.date).format("HH:mm:ss");
            return a;
        });
        var totalResponseTime = 0;
        this.analyticsData.performances = lodash__WEBPACK_IMPORTED_MODULE_8__["map"](this.analyticsData.performances, function (a) {
            a.dateString = moment__WEBPACK_IMPORTED_MODULE_7__(a.date).format("YYYY-MM-DD");
            a.timeString = moment__WEBPACK_IMPORTED_MODULE_7__(a.date).format("HH:mm:ss");
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
        var performance = new _shared_client_side_models_analyticsData__WEBPACK_IMPORTED_MODULE_5__["Performance"]();
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
        this.apiVersions.angular = _angular_core__WEBPACK_IMPORTED_MODULE_1__["VERSION"].full;
        this.isStandAlone = window.matchMedia("(display-mode: standalone)").matches;
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
                _this.appSettings = new _shared_client_side_models_buildModels__WEBPACK_IMPORTED_MODULE_4__["AppSettings"]();
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
    AppConfig = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], AppConfig);
    return AppConfig;
}(_baseServices__WEBPACK_IMPORTED_MODULE_3__["BaseServices"]));



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

/***/ "./common/messagePump.ts":
/*!*******************************!*\
  !*** ./common/messagePump.ts ***!
  \*******************************/
/*! exports provided: MessagePump */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessagePump", function() { return MessagePump; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _baseServices__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./baseServices */ "./common/baseServices.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);





var MessagePump = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](MessagePump, _super);
    function MessagePump(http) {
        var _this = _super.call(this, http) || this;
        _this.http = http;
        _this.channelForSubscriptions = Array();
        _this.allRegisteredChannels = Array();
        _this.transmitMessageQueue = Array();
        _this.receiveMessageQueue = Array();
        _this.channelsToUnregister = Array();
        _this.channelRegistered = false;
        _this.channelUnregistrationInProcess = false;
        _this.setToAutoRegister = false;
        _this.channelRegistration = {
            id: new Date().getTime(),
            name: "",
            subscriptions: []
        };
        var cachedMessages = _this.getLocalStorage("transmitMessageQueue");
        if (cachedMessages)
            _this.transmitMessageQueue = cachedMessages;
        return _this;
    }
    MessagePump.prototype.register = function (success, error) {
        if (this.channelRegistered)
            error("This channel is already unregistered!");
        this.onUpdateSubscriptions(success, error);
    };
    MessagePump.prototype.setToOffline = function () {
        this.channelForSubscriptions.length = 0;
        this.channelRegistration.subscriptions.length = 0;
        this.allRegisteredChannels.length = 0;
        if (this.channelRegistered)
            this.setToAutoRegister = true;
        this.channelRegistered = false;
    };
    MessagePump.prototype.unregister = function (success, error) {
        var _this = this;
        if (!this.channelRegistered) {
            error("This channel is already unregistered!");
            return;
        }
        this.channelUnregistrationInProcess = true;
        this.httpPost("messagePump", "unregistration", this.channelRegistration, function (getAllChannels) {
            _this.channelForSubscriptions.length = 0;
            _this.channelRegistration.subscriptions.length = 0;
            _this.allRegisteredChannels = lodash__WEBPACK_IMPORTED_MODULE_4__["cloneDeep"](getAllChannels.channels);
            success();
        }, function (errorMessage) {
            error(errorMessage);
        });
    };
    MessagePump.prototype.namedUnregister = function (name, success, error) {
        var _this = this;
        var namedChannels = lodash__WEBPACK_IMPORTED_MODULE_4__["filter"](this.channelForSubscriptions, function (a) { return (a.name === name); });
        if (namedChannels.length === 0) {
            error("Channel: " + name + " does not exist!");
            return;
        }
        this.httpPost("messagePump", "NamedUnregister", { name: name }, function (getAllChannels) {
            _this.channelForSubscriptions = getAllChannels.channels;
            lodash__WEBPACK_IMPORTED_MODULE_4__["pull"](_this.channelRegistration.subscriptions, name);
            _this.allRegisteredChannels = lodash__WEBPACK_IMPORTED_MODULE_4__["cloneDeep"](getAllChannels.channels);
            success();
        }, function (errorMessage) {
            error(errorMessage);
        });
    };
    MessagePump.prototype.onUpdateSubscriptions = function (success, error) {
        var _this = this;
        this.channelRegistration.id = this.channelRegistration.id;
        this.httpPost("messagePump", "registration", this.channelRegistration, function (getAllChannels) {
            _this.channelForSubscriptions = getAllChannels.channels;
            _this.allRegisteredChannels = lodash__WEBPACK_IMPORTED_MODULE_4__["cloneDeep"](getAllChannels.channels);
            _this.channelRegistered = true;
            success();
        }, function (errorMessage) {
            error(errorMessage);
        });
    };
    MessagePump.prototype.synchronize = function (messageReceivedCallback, success, error) {
        var _this = this;
        this.httpGet("messagePump", "", this.channelRegistration.id.toString(), function (obj) {
            if (!_this.channelRegistered)
                return;
            switch (obj.type) {
                case "ChannelSync":
                    {
                        var channelSync = obj;
                        if (channelSync.cancel) {
                            // channel was unregistered
                            _this.channelForSubscriptions.length = 0;
                            _this.channelRegistered = false;
                            _this.channelUnregistrationInProcess = false;
                            success();
                        }
                        else
                            _this.synchronize(messageReceivedCallback, success, error);
                        break;
                    }
                case "GetAllChannels":
                    {
                        var getAllChannels = obj;
                        _this.channelForSubscriptions = getAllChannels.channels;
                        _this.allRegisteredChannels = lodash__WEBPACK_IMPORTED_MODULE_4__["cloneDeep"](getAllChannels.channels);
                        _this.synchronize(messageReceivedCallback, success, error);
                        break;
                    }
                case "ChannelMessage":
                    {
                        var channelMessage_1 = obj;
                        var sendersName = lodash__WEBPACK_IMPORTED_MODULE_4__["filter"](_this.channelForSubscriptions, function (a) { return (a.name === channelMessage_1.sendersName); })[0].name;
                        _this.receiveMessageQueue.push(channelMessage_1);
                        messageReceivedCallback();
                        _this.synchronize(messageReceivedCallback, success, error);
                        break;
                    }
            }
        }, function (errorMessage) {
            // most likely a 502 network timeout
            if (navigator.onLine)
                _this.synchronize(messageReceivedCallback, success, error);
        });
    };
    MessagePump.prototype.getAllRegisteredChannels = function (success, error) {
        var _this = this;
        this.httpGet("messagePump", "getregisteredchannels", "", function (getAllChannels) {
            _this.allRegisteredChannels = getAllChannels.channels;
            success();
        }, function (errorMessage) {
            error(errorMessage);
        });
    };
    MessagePump.prototype.queueChannelMessage = function (success, error, offlineCondition) {
        this.sendChannelMessage(success, error, offlineCondition);
    };
    MessagePump.prototype.sendChannelMessage = function (success, error, offlineCondition) {
        var _this = this;
        if (this.transmitMessageQueue.length === 0) {
            return;
        }
        if (!navigator.onLine) {
            this.setLocalStorage("transmitMessageQueue", this.transmitMessageQueue);
            offlineCondition();
            return;
        }
        var nextMessage = this.transmitMessageQueue.shift();
        this.httpPost("messagePump", "sendChannelMessage", nextMessage, function (wasSuccessful) {
            if (wasSuccessful) {
                if (_this.transmitMessageQueue.length > 0)
                    _this.sendChannelMessage(success, error, null);
                else {
                    _this.setLocalStorage("transmitMessageQueue", null);
                    success();
                }
            }
            else
                error("Channel message Error!");
        }, function (errorMessage) {
            error(errorMessage);
        });
    };
    MessagePump.prototype.getOrderedChannelForSubscriptions = function () {
        return lodash__WEBPACK_IMPORTED_MODULE_4__["sortBy"](this.channelForSubscriptions, "name");
    };
    MessagePump.prototype.getOrderedChanneNameslForSubscriptions = function () {
        return lodash__WEBPACK_IMPORTED_MODULE_4__["map"](this.channelForSubscriptions, "name");
    };
    MessagePump.prototype.getOrderedAllRegisteredChannels = function () {
        return lodash__WEBPACK_IMPORTED_MODULE_4__["sortBy"](this.allRegisteredChannels, "name");
    };
    MessagePump = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], MessagePump);
    return MessagePump;
}(_baseServices__WEBPACK_IMPORTED_MODULE_3__["BaseServices"]));



/***/ }),

/***/ "./features/alreadyReady.ts":
/*!**********************************!*\
  !*** ./features/alreadyReady.ts ***!
  \**********************************/
/*! exports provided: AlreadyReady */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlreadyReady", function() { return AlreadyReady; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _common_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/appConfig */ "./common/appConfig.ts");


// services

var AlreadyReady = /** @class */ (function () {
    function AlreadyReady(ac) {
        this.ac = ac;
        this.isViewVisible = false;
    }
    AlreadyReady.prototype.ngOnInit = function () {
        var _this = this;
        this.ac.waitUntilInitialized(function () {
            _this.isViewVisible = true;
        });
    };
    AlreadyReady = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            // #region template
            template: "\n\n<view-fader [isViewVisible]=\"isViewVisible\">\n\n    <h2 class=\"feature-title\" style=\"font-family: px-neuropol; \">ALREADY READY</h2>\n    <h3 class=\"feature-subtitle\" style=\"font-family: px-neuropol; \">Add the New Feature Here</h3>\n    <div class=\"feature-text\">\n        <div style=\"margin: 5px; \">\n            The AngularDotNet Starter Application comes with the scaffolding for you to immediately begin implementing your own custom feature.\n        </div>\n    </div>\n</view-fader>\n\n" /* this was squashed */,
            styles: ["\n.feature-title {\n    color: #007aff;\n    background-color: #dfdfdf;\n    padding: 10px;\n    width: 400px;\n    height: 60px;\n    text-align: center;\n    border-radius: 25px;\n}\n\n.feature-subtitle {\n    margin-left: 25%;\n    color: #007aff;\n    background-color: #dfdfdf;\n    padding: 10px;\n    width: 600px;\n    height: 60px;\n    text-align: center;\n    border-radius: 25px;\n}\n\n.feature-text {\n    margin-left: 25%;\n    color: #007aff;\n    background-color: #dfdfdf;\n    padding: 10px;\n    width: 600px;\n    height: 150px;\n    text-align: justify;\n    border-radius: 25px;\n    font-size: 20px;\n}"]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_common_appConfig__WEBPACK_IMPORTED_MODULE_2__["AppConfig"]])
    ], AlreadyReady);
    return AlreadyReady;
}());



/***/ }),

/***/ "./features/analytics.ts":
/*!*******************************!*\
  !*** ./features/analytics.ts ***!
  \*******************************/
/*! exports provided: Analytics */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Analytics", function() { return Analytics; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _common_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/appConfig */ "./common/appConfig.ts");


// services

var Analytics = /** @class */ (function () {
    function Analytics(ac) {
        this.ac = ac;
        this.isViewVisible = false;
    }
    Analytics.prototype.ngOnInit = function () {
        var _this = this;
        this.ac.waitUntilInitialized(function () {
            _this.isViewVisible = true;
            _this.ac.updateAnalytics();
        });
    };
    Analytics.prototype.onClickClearErrors = function () {
        this.ac.clearExceptions();
    };
    Analytics.prototype.onClickClearResponseTime = function () {
        this.ac.clearResponseTime();
    };
    Analytics = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            // #region template
            template: "\n<view-fader [isViewVisible]=\"isViewVisible\">\n    <h2 class=\"feature-title\" style=\"font-family: px-neuropol; \">Analytics</h2>\n\n    <span class=\"text-primary\" style=\"font-size: 20px;\">\n        <span style=\"font-size: 34px; margin-left: 40%; font-family: px-neuropol; \">Exceptions</span>\n        <span style=\"float: right;\">\n            Errors Count: {{ac.analyticsData.exceptions.length}}\n            <button class=\"btn btn-primary\" [disabled]=\"ac.analyticsData.exceptions.length === 0\" style=\"width: 75px;\" (click)=\"onClickClearErrors()\">Clear</button>\n        </span>&nbsp;&nbsp;\n    </span>\n\n    <div style=\"height: 10px;\"></div>\n\n    <div class=\" text-primary\">\n        <div class=\"card \" *ngFor=\"let exception of ac.analyticsData.exceptions\">\n            <div class=\"card-header\">\n                <h4 class=\"card-header\">\n                    <span>{{exception.dateString}}&nbsp;&nbsp;&nbsp;{{exception.timeString}}&nbsp;&nbsp;&nbsp;{{exception.errorMessage}}</span>\n                </h4>\n            </div>\n\n        </div>\n    </div>\n\n    <span class=\"text-primary\" style=\"font-size: 20px;\">\n        <span style=\"font-size: 34px; margin-left: 40%; font-family: px-neuropol; \">Performance</span>\n        <span style=\"float: right;\">\n            Average Response Time: {{ac.analyticsData.averageResponseTime}}ms\n            <button class=\"btn btn-primary\" [disabled]=\"ac.analyticsData.performances.length === 0\" style=\"width: 75px;\" (click)=\"onClickClearResponseTime()\">Clear</button>\n        </span>&nbsp;&nbsp;\n    </span>\n    <div style=\"height: 10px;\"></div>\n\n    <div class=\" text-primary\">\n        <div class=\"card \" *ngFor=\"let performance of ac.analyticsData.performances\">\n            <div class=\"card-header\">\n                <h4 class=\"card-header\">\n                    <span>{{performance.dateString}}&nbsp;&nbsp;&nbsp;{{performance.timeString}}&nbsp;&nbsp;&nbsp;{{performance.responseTime}}ms</span>\n                </h4>\n            </div>\n\n        </div>\n    </div>\n\n</view-fader>\n" /* this was squashed */,
            styles: ["\n.feature-title {\n    color: #007aff;\n    background-color: #dfdfdf;\n    padding: 10px;\n    width: 250px;\n    height: 60px;\n    text-align: center;\n    border-radius: 25px;\n}\n"]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_common_appConfig__WEBPACK_IMPORTED_MODULE_2__["AppConfig"]])
    ], Analytics);
    return Analytics;
}());



/***/ }),

/***/ "./features/features.ts":
/*!******************************!*\
  !*** ./features/features.ts ***!
  \******************************/
/*! exports provided: Features */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Features", function() { return Features; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _common_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/appConfig */ "./common/appConfig.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");


// services


var Features = /** @class */ (function () {
    function Features(ac, toastr) {
        this.ac = ac;
        this.toastr = toastr;
        this.isViewVisible = false;
        this.dependencies = Array();
    }
    Features.prototype.ngOnInit = function () {
        var _this = this;
        this.ac.waitUntilInitialized(function () {
            _this.isViewVisible = true;
        });
    };
    Features = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            // #region template
            template: "\n<style>\n    h4 {\n        font-family: px-neuropol;\n    }\n</style>\n\n<view-fader [isViewVisible]=\"isViewVisible\">\n    <h2 class=\"feature-title\" style=\"font-family: px-neuropol; \">FEATURES</h2>\n\n    <div class=\"feature-list card \">\n\n        <div class=\"feature-heading card-header\">\n            <h4 class=\"card-header\" style=\"font-family: px-neuropol;\">\n                <a href=\"javascript:void(0);\" style=\"font-size: 22px;\" (click)=\"showOverview = !showOverview\">Overview</a>\n            </h4>\n            <view-fader [isViewVisible]=\"showOverview\" *ngIf=\"showOverview\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                This document details the features of the AngularDotNet Starter App used in the course titled \"Angular and ASP.Net Core Integration\". By using the techniques described in the course, you are already further ahead of where you would be by starting from scratch. In fact, in terms of a projects lifecycle, the techniques used in the AngularDotNet Starter App will put you months ahead of schedule.\n                <br /><br />\n                Unlike many developer, I spend much time analyzing the workflow and looking for shortcuts to developing an application. The key is automation. Some upfront time, researching and analyzing the workflow, will save you months of development time later, with all your projects. And that is what I can share with you. I\'ve spent months, not only looking for shortcuts to make the development quicker, but also to enhance the performance, and make the application easier to maintain.\n                <br /><br />\n                As a Microsoft developer, you have become used to not having the need to drop down to the command line to perform an operation. By automating the development process, you will become less fatigued, and be able to spend your attention doing development.\n                <br /><br />\n                The target audience for the course, is the ASP.Net Core Developer that would like to use Angular, as the front-end technology.\n                <br /><br />\n                <table>\n                    <tr>\n                        <td style=\"width: 170px; text-align: right; font-family: px-neuropol; color: orangered; \">ASP.Net Core:</td>\n                        <td style=\"width: 20px; \">&nbsp;</td>\n                        <td style=\"width: 20px; font-family: px-neuropol; color: orangered; \">{{ac.appSettings.aspNetCoreVersion}}</td>\n                    </tr>\n                    <tr>\n                        <td style=\"width: 170px; text-align: right; font-family: px-neuropol; color: orangered; \">Angular:</td>\n                        <td style=\"width: 20px; \">&nbsp;</td>\n                        <td style=\"width: 20px; font-family: px-neuropol; color: orangered; \">{{ac.apiVersions.angular}}</td>\n                    </tr>\n                    <tr>\n                        <td style=\"width: 170px; text-align: right; font-family: px-neuropol; color: orangered; \">TypeScript:</td>\n                        <td style=\"width: 20px; \">&nbsp;</td>\n                        <td style=\"width: 20px; font-family: px-neuropol; color: orangered; \">{{ac.apiVersions.typeScript}}</td>\n                    </tr>\n                    <tr>\n                        <td style=\"width: 170px; text-align: right;color: darkgreen\">NodeJs:</td>\n                        <td style=\"width: 20px; \">&nbsp;</td>\n                        <td style=\"width: 20px; color: darkgreen;\">{{ac.apiVersions.nodeJs}}</td>\n                    </tr>\n                    <tr>\n                        <td style=\"width: 170px; text-align: right; color: darkgreen;\">V8 Engine:</td>\n                        <td style=\"width: 20px; \">&nbsp;</td>\n                        <td style=\"width: 20px; color: darkgreen;\">{{ac.apiVersions.v8Engine}}</td>\n                    </tr>\n                    <tr>\n                        <td style=\"width: 170px; text-align: right; color: darkgreen;\">RxJs:</td>\n                        <td style=\"width: 20px; \">&nbsp;</td>\n                        <td style=\"width: 20px; color: darkgreen;\">{{ac.apiVersions.rxJs}}</td>\n                    </tr>\n                    <tr>\n                        <td style=\"width: 170px; text-align: right; color: darkgreen;\">Bootstrap:</td>\n                        <td style=\"width: 20px; \">&nbsp;</td>\n                        <td style=\"width: 20px; color: darkgreen;\">{{ac.apiVersions.bootstrap}}</td>\n                    </tr>\n                    <tr>\n                        <td style=\"width: 170px; text-align: right; color: darkgreen;\">Lodash:</td>\n                        <td style=\"width: 20px; \">&nbsp;</td>\n                        <td style=\"width: 20px; color: darkgreen;\">{{ac.apiVersions.lodash}}</td>\n                    </tr>\n                    <tr>\n                        <td style=\"width: 170px; text-align: right; color: darkgreen;\">Moment:</td>\n                        <td style=\"width: 20px; \">&nbsp;</td>\n                        <td style=\"width: 20px; color: darkgreen;\">{{ac.apiVersions.moment}}</td>\n                    </tr>\n                    <tr>\n                        <td style=\"width: 170px; text-align: right; color: darkgreen;\">ngxToastr:</td>\n                        <td style=\"width: 20px; \">&nbsp;</td>\n                        <td style=\"width: 20px; color: darkgreen;\">{{ac.apiVersions.ngxtoastr}}</td>\n                    </tr>\n                    <tr>\n                        <td style=\"width: 170px; text-align: right; color: darkgreen;\">FileSaver:</td>\n                        <td style=\"width: 20px; \">&nbsp;</td>\n                        <td style=\"width: 20px; color: darkgreen;\">{{ac.apiVersions.fileSaver}}</td>\n                    </tr>\n                    <tr>\n                        <td style=\"width: 170px; text-align: right; color: darkgreen;\">CoreJs:</td>\n                        <td style=\"width: 20px; \">&nbsp;</td>\n                        <td style=\"width: 20px; color: darkgreen;\">{{ac.apiVersions.coreJs}}</td>\n                    </tr>\n                    <tr>\n                        <td style=\"width: 170px; text-align: right; color: darkgreen;\">ZoneJs:</td>\n                        <td style=\"width: 20px; \">&nbsp;</td>\n                        <td style=\"width: 20px; color: darkgreen;\">{{ac.apiVersions.zoneJs}}</td>\n                    </tr>\n                    <tr>\n                        <td style=\"width: 170px; text-align: right; color: darkgreen;\">GoogleMaps:</td>\n                        <td style=\"width: 20px; \">&nbsp;</td>\n                        <td style=\"width: 20px; color: darkgreen;\">{{ac.apiVersions.googleMaps}}</td>\n                    </tr>\n\n                </table>\n            </view-fader>\n        </div>\n\n        <div class=\"feature-heading card-header\">\n            <h4 class=\"card-header\">\n                <a href=\"javascript:void(0);\" style=\"font-size: 22px;\" (click)=\"newFeatures = !newFeatures\">New Features</a>\n            </h4>\n            <view-fader [isViewVisible]=\"newFeatures\" *ngIf=\"newFeatures\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                The AngularDotNet Starter app has many new features! This version embraces the Angular CLI and the Dotnet CLI, which is the main difference from previous versions.\n                <br /><br />\n                The ProjectBuild Utility integrates the Angular CLI with the Dotnet CLI to give you a powerful development tool. With this utility you will not need to drop down to the command line to perform operations, but instead, you can manage your projects and initiate your build directly from within this utility.\n                <br /><br />\n                You can also configure your build for production and PWA support directly from within the ProjectBuild utility.\n                <br /><br />\n                The ProjectBuild Utility also gives you a mechanism for sharing your own custom libraries and models without relying on yet another repository, such as NPM. This is another huge time-saver.\n            </view-fader>\n        </div>\n\n        <div class=\"feature-heading card-header\">\n            <h4 class=\"card-header\">\n                <a href=\"javascript:void(0);\" style=\"font-size: 22px;\" (click)=\"prerequisites = !prerequisites\">Prerequisites and References</a>\n            </h4>\n            <view-fader [isViewVisible]=\"prerequisites\" *ngIf=\"prerequisites\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                In order to use the AngularDotNet Starter App you will need to download and install NodeJS. By installing NodeJS you will automatically install NPM, the Node Package Manage. Here are some links:\n                <br />\n                <a href=\"https://nodejs.org/en\" target=\"_blank\">NodeJs</a>\n                <br />\n                <a href=\"http://blog.npmjs.org/post/85484771375/how-to-install-npm\" target=\"_blank\">How to Install</a>\n            </view-fader>\n        </div>\n\n        <div class=\"feature-heading card-header\">\n            <h4 class=\"card-header\">\n                <a href=\"javascript:void(0);\" style=\"font-size: 22px;\" (click)=\"compatibility = !compatibility\">Compatibility</a>\n            </h4>\n            <view-fader [isViewVisible]=\"compatibility\" *ngIf=\"compatibility\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                The most compatible web applications will perform with all modern browsers. To ensure that, the feature-set supports all browsers that support ECMAScript 5 (ES5).\n            </view-fader>\n        </div>\n\n        <div class=\"feature-heading card-header\">\n            <h4 class=\"card-header\">\n                <a href=\"javascript:void(0);\" style=\"font-size: 22px;\" (click)=\"template = !template\">Project Template</a>\n            </h4>\n            <view-fader [isViewVisible]=\"template\" *ngIf=\"template\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                When creating an ASP.Net Core project, you are given 2 chooses. The project template I have chosen is the ASP.Net Core Web Application with the .Net Core. This project template has the benefit of running on Linux, macOS as well as Windows using .Net Core. Then you have 2 more choses for what type of middleware, WebAPI or MVC. Since we have no need for MVC we will chose the WebAPI.\n                <br /><br />\n                By the way, since many Microsoft developer are coming from a background of MVC, you should know that Angular and MVC are mutually exclusive. Soon you will understand the full benefits of allowing the Angular framework to handle the UI. Not only is it faster and easier to maintain, but it also embraces the web technologies. Sorry to say it, but you are going to have to understand web technologies to be a good, modern web developer.\n            </view-fader>\n        </div>\n\n        <div class=\"feature-heading card-header\">\n            <h4 class=\"card-header\">\n                <a href=\"javascript:void(0);\" style=\"font-size: 22px;\" (click)=\"libraries = !libraries\">3rd Party Libraries</a>\n            </h4>\n            <view-fader [isViewVisible]=\"libraries\" *ngIf=\"libraries\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                There are many 3rd party libraries already integrated into the AngularDotNet Starter App, but easy to remove if there is no need for them. Also, there is no need for SignalR, or jQuery or any other dependency libraries. Each library is self-contained.\n                Following is a list of integrated libraries:\n                <br /><br />\n                bootstrap 4\n                <br />\n                ngx-toastr\n                <br />\n                font-awesome\n                <br />\n                rxjs\n                <br />\n                lodash\n                <br />\n                moment\n                <br />\n                file-saver\n            </view-fader>\n        </div>\n\n        <div class=\"feature-heading card-header\">\n            <h4 class=\"card-header\">\n                <a href=\"javascript:void(0);\" style=\"font-size: 22px;\" (click)=\"abstracting = !abstracting\">Abstracting Debug from Release</a>\n            </h4>\n            <view-fader [isViewVisible]=\"abstracting\" *ngIf=\"abstracting\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                As an ASP.Net Core developer, you may not understand the significant difference between running the application in the Debug mode, verses the Release mode, in terms of JavaScript performance. Well, guess what? There is a big difference! Once you realize that the sooner you will be productive.\n                <br /><br />\n                Visual Studio and ASP.Net Core make it easy to determine the development configuration mode that you are in and allow you to configure the outputting results according to the configuration mode. This is all handled in the Startup.cs file.\n            </view-fader>\n        </div>\n\n        <div class=\"feature-heading card-header\">\n            <h4 class=\"card-header\">\n                <a href=\"javascript:void(0);\" style=\"font-size: 22px;\" (click)=\"gulp = !gulp\">Using NodeJS to do the Heavy Lifting</a>\n            </h4>\n            <view-fader [isViewVisible]=\"gulp\" *ngIf=\"gulp\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                I would have never guessed that I was going to need NodeJS and Gulp to be an efficient application developer. Now I truly can\'t live without those 2 technologies. In case you didn\'t know, NodeJS comes with NPM, which is a repository for storing Node packages. And Gulp is a JavaScript task runner that lets you automate tasks.\n                <br /><br />\n                Also, as another feature of the AngularDotNet Starter App, I have implemented the ProjectBuild project, which is an easier way to organize your build tasks. By placing your tasks in a different project, you can more easily develop your tasks using TypeScript. More on that later...\n            </view-fader>\n        </div>\n\n        <div class=\"feature-heading card-header\">\n            <h4 class=\"card-header\">\n                <a href=\"javascript:void(0);\" style=\"font-size: 22px;\" (click)=\"streamline = !streamline\">Automation to Streamline the Workflow</a>\n            </h4>\n            <view-fader [isViewVisible]=\"streamline\" *ngIf=\"streamline\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                By using Gulp and the Task Runner Explorer, we can bind to these events:\n                <br /><br />\n                1) Before Build\n                <br />\n                2) After Build\n                <br />\n                3) Clean\n                <br />\n                4) Project Opens\n            </view-fader>\n        </div>\n\n        <div class=\"feature-heading card-header\">\n            <h4 class=\"card-header\">\n                <a href=\"javascript:void(0);\" style=\"font-size: 22px;\" (click)=\"release = !release\">Creating a Release Build</a>\n            </h4>\n            <view-fader [isViewVisible]=\"release\" *ngIf=\"release\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                The AngularDotNet Starter App has many features that can make your application perform faster and make it easier to maintain. Creating a Release (Production) build does many things in one process. Some are performed by the Angular-CLI, and others are performed by a build hook. Following is a list of all the benefits of creating a release bundle using the routines provided by the AngularDotNet Starter App Release Build.\n                <br /><br />\n                &nbsp;&nbsp;1) Separates the framework from the application\n                <br />\n                &nbsp;&nbsp;2) Concatenate and bundle the framework with the 3rd party libraries\n                <br />\n                &nbsp;&nbsp;3) Minify the framework bundle\n                <br />\n                &nbsp;&nbsp;4) Embedding the images, fonts, and icons into the html\n                <br />\n                &nbsp;&nbsp;5) Squash the html and css into the components\n                <br />\n                &nbsp;&nbsp;6) Concatenate and bundle the application\n                <br />\n                &nbsp;&nbsp;7) Minify the application bundle\n                <br />\n                &nbsp;&nbsp;8) Enabling the production mode\n                <br />\n                &nbsp;&nbsp;9) Creating an application manifest\n                <br />\n                10) Adding Cache-Busting logic\n                <br />\n                11) Bumping up the application version number\n                <br />\n                12) Adding the Service Worker logic for offline performance\n                <br />\n                14) Updating the index.html with new versions\n                <br />\n            </view-fader>\n        </div>\n\n        <div class=\"feature-heading card-header\">\n            <h4 class=\"card-header\">\n                <a href=\"javascript:void(0);\" style=\"font-size: 22px;\" (click)=\"manifest = !manifest\">Creating the Application Manifest</a>\n            </h4>\n            <view-fader [isViewVisible]=\"manifest\" *ngIf=\"manifest\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                I\'ve given a lot of attention to the web technologies that enable applications to work off-line. This is like having a web app that performs like a desktop app. The AngularDotNet Starter App can perform most function while being complete disconnected from the Internet. This is currently implemented in the release build process and can be completely automated.\n            </view-fader>\n        </div>\n\n        <div class=\"feature-heading card-header\">\n            <h4 class=\"card-header\">\n                <a href=\"javascript:void(0);\" style=\"font-size: 22px;\" (click)=\"reusingGulpFiles = !reusingGulpFiles\">The ProjectBuild project</a>\n            </h4>\n            <view-fader [isViewVisible]=\"reusingGulpFiles\" *ngIf=\"reusingGulpFiles\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                As a proficient software developer, you are not going to want to start from scratch creating a new Release build process for your projects, every time you start a new project. In this course I will show you how to create a reusable Release Build Process that you can use on all your projects.\n            </view-fader>\n        </div>\n\n        <div class=\"feature-heading card-header\">\n            <h4 class=\"card-header\">\n                <a href=\"javascript:void(0);\" style=\"font-size: 22px;\" (click)=\"debuggingGulp = !debuggingGulp\">Debugging Gulp Files</a>\n            </h4>\n            <view-fader [isViewVisible]=\"debuggingGulp\" *ngIf=\"debuggingGulp\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                Developing and debugging Gulp files can be an interesting challenge. Most developers will struggle with this for months.<br /><br />\n                When I create gulp tasks I want to be able to:<br />\n                1)	Set breakpoints<br />\n                2)	Step into my gulp task<br />\n                3)	Do searches for references<br />\n                4)	Go to definitions<br />\n                5)	Have full Intellisense<br />\n                6)	Build with TypeScript classes<br /><br />\n                The ProjectBuild project allow you to do all of these things while debugging your Gulp tasks.\n                All you need to do is start the project (ProjectBuild), then set a break point in the tasklist.js files execute method, then double-click on one of the task in the Task Runner Explorer. Make sure that you select the ProjectBuild in the Task Runner Explorer before double-clicking the task.\n            </view-fader>\n        </div>\n\n        <div class=\"feature-heading card-header\">\n            <h4 class=\"card-header\">\n                <a href=\"javascript:void(0);\" style=\"font-size: 22px;\" (click)=\"versioning = !versioning\">Automatically Versioning the Application</a>\n            </h4>\n            <view-fader [isViewVisible]=\"versioning\" *ngIf=\"versioning\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                By using NodeJS, it possible bump up the version number. This can be automated by binding it a build event. During the course I will demonstrate the binding, and the technique for incrementing the version number using NodeJS.\n            </view-fader>\n        </div>\n\n        <div class=\"feature-heading card-header\">\n            <h4 class=\"card-header\">\n                <a href=\"javascript:void(0);\" style=\"font-size: 22px;\" (click)=\"exception = !exception\">Exception Handling</a>\n            </h4>\n            <view-fader [isViewVisible]=\"exception\" *ngIf=\"exception\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                ASP.Net Core applications need a different method for returning exception data back to the Angular service. The AngularDotNet Starter App implements a technique to return useful exception information back to the client, which is later stored on the client for analysis.\n            </view-fader>\n        </div>\n\n        <div class=\"feature-heading card-header\">\n            <h4 class=\"card-header\">\n                <a href=\"javascript:void(0);\" style=\"font-size: 22px;\" (click)=\"parameters = !parameters\">Passing Parameters to the Server</a>\n            </h4>\n            <view-fader [isViewVisible]=\"parameters\" *ngIf=\"parameters\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                ASP.Net Core applications use a different method for abstracting the application parameter. These type of parameter, such as connection string, used to be stored in the web.config. Now they are stored in the appsettings.json. This is also a good place to store the application version number.\n            </view-fader>\n        </div>\n\n        <div class=\"feature-heading card-header\">\n            <h4 class=\"card-header\">\n                <a href=\"javascript:void(0);\" style=\"font-size: 22px;\" (click)=\"switches = !switches\">Software Switches to Automate the Development Workflow</a>\n            </h4>\n            <view-fader [isViewVisible]=\"switches\" *ngIf=\"switches\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                Software switches can make development quicker by setting up your code in such a way to quickly return to an area in the application that you are currently implementing. This eliminate the need for repetitive keystroke and mouse clicks, just to get you to where you need to be in the application to continue working. I\'ll show you how in the course to make this possible and not running the risk that this test switches affect the production build.\n            </view-fader>\n        </div>\n\n        <div class=\"feature-heading card-header\">\n            <h4 class=\"card-header\">\n                <a href=\"javascript:void(0);\" style=\"font-size: 22px;\" (click)=\"ooTechniques = !ooTechniques\">Benefits using client-side OO Techniques</a>\n            </h4>\n            <view-fader [isViewVisible]=\"ooTechniques\" *ngIf=\"ooTechniques\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                Most ASP.Net developer understand the benefit of using object oriented techniques such as inheritance, and encapsulation, but don\'t understand how that is possible with JavaScript. With the advantage of TypeScript, and transpilers, this actually is pretty easy, and give huge benefits to the integrity and maintainability of the application. The AngularDotNet Starter App uses most of these object oriented techniques. Following is a list.\n                <br /><br />\n                1)	Strong data types\n                <br />\n                2)	Classes\n                <br />\n                3)	Modules\n                <br />\n                4)	Inheritance\n                <br />\n                5)	Accessibility (private/public)\n            </view-fader>\n        </div>\n\n        <div class=\"feature-heading card-header\">\n            <h4 class=\"card-header\">\n                <a href=\"javascript:void(0);\" style=\"font-size: 22px;\" (click)=\"performanceData = !performanceData\">Saving and Displaying Errors and Performance Data on the Client</a>\n            </h4>\n            <view-fader [isViewVisible]=\"performanceData\" *ngIf=\"performanceData\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                The AngularDotNet Starter App has a feature for displaying the errors that were generated on the server. This feature also displays performance data that is inserted into the code as Performance Markers. During the course we are going to use Microsoft Edge to display the Performance Markers, and show how to use the Performance feature of Microsoft Edge to store and analyze timing information.\n            </view-fader>\n        </div>\n\n        <div class=\"feature-heading card-header\">\n            <h4 class=\"card-header\">\n                <a href=\"javascript:void(0);\" style=\"font-size: 22px;\" (click)=\"lastFeature = !lastFeature\">Saving the Navigation to the Last Feature</a>\n            </h4>\n            <view-fader [isViewVisible]=\"lastFeature\" *ngIf=\"lastFeature\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                This may not seem like a big deal, but sometimes it is best to pick-up where you left off using an application. So by saving the last feature that was used before exiting, it\'s possible to return to that feature when the application is launched again. I don\'t intend on explaining this feature in the course, but you can see by examining the source that the technology used is Local Storage.\n            </view-fader>\n        </div>\n\n        <div class=\"feature-heading card-header\">\n            <h4 class=\"card-header\">\n                <a href=\"javascript:void(0);\" style=\"font-size: 22px;\" (click)=\"publishingSolution = !publishingSolution\">Publishing to Server Solution</a>\n            </h4>\n            <view-fader [isViewVisible]=\"publishingSolution\" *ngIf=\"publishingSolution\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                The AngularDotNet Starter Application comes with a separate Solution for publishing to the server. The idea is that it is not necessary to publish unbundled script files to the server. This alternate Solution only includes the folders that are necessary for the server to deliver the application. With this Solution, the time it takes to publish to the server is reduced to 5 percent.\n            </view-fader>\n        </div>\n\n        <div class=\"feature-heading card-header\">\n            <h4 class=\"card-header\">\n                <a href=\"javascript:void(0);\" style=\"font-size: 22px;\" (click)=\"fullAndMobile = !fullAndMobile\">Full-Features and Mobile Versions</a>\n            </h4>\n            <view-fader [isViewVisible]=\"fullAndMobile\" *ngIf=\"fullAndMobile\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                By having different Application Build Configurations, it is possible to create a full-feature version, and a mobile version of the application. By using the same codebase, you will have the ability to reuse code for 2 different Angular builds. But it doesn\'t stop there! You can have as many Angular builds as necessary in one Visual Studio project. This is a great way to breakup a large-scale Angular project into small projects.\n            </view-fader>\n        </div>\n\n        <div class=\"feature-heading card-header\">\n            <h4 class=\"card-header\">\n                <a href=\"javascript:void(0);\" style=\"font-size: 22px;\" (click)=\"messaging = !messaging\">Real-Time Messaging</a>\n            </h4>\n            <view-fader [isViewVisible]=\"messaging\" *ngIf=\"messaging\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                Many developers struggle with the concept of real-time data, and how to accomplish this feat with a web application. Here is a scenario.\n                <br /><br />\n                Let\'s say that you need to be notified when an event happens within the system. Maybe another user, within the system, makes a change to the database.\n                <br /><br />\n                The AngularDotNet Starter Application comes with a solution to that problem, and is demonstrated in the Notification feature. This feature allows you to send messages to other users. The users that want to receive your messages will simply subscribe to your channel. Then, they will receive the notifications in real-time. What this means is that it is not necessary to refresh the browser to receive the latest notification.\n                <br /><br />\n                The important point to make is that the notification is not limited to text. The notification can be simple text, an object, or a complex collection of objects.\n            </view-fader>\n        </div>\n\n        <div class=\"feature-heading card-header\">\n            <h4 class=\"card-header\">\n                <a href=\"javascript:void(0);\" style=\"font-size: 22px;\" (click)=\"voiceCommands = !voiceCommands\">Voice Activated Commands</a>\n            </h4>\n            <view-fader [isViewVisible]=\"voiceCommands\" *ngIf=\"voiceCommands\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                Now, here is the feature that puts it all together. With the aid of some of the most modern web technologies, it is possible to activate features of the application, by simply using your voice. This opens up so many, many, new possibilities.\n                <br /><br />\n                The Notification component, has implemented voice activated commands. What this means is just by using your voice, it is possible to emulate or replace mouse, and keyboard commands. Look Mom! No hands!\n                <br /><br />\n                Hopefully you will understand the implications, and possibilities. In one of my \"follow-up\" courses, I plan to demonstrate a fully functional voice activates help system.\n                <br /><br />\n                Imagine this: Computer... tell me about...\n            </view-fader>\n        </div>\n\n        <div class=\"feature-heading card-header\">\n            <h4 class=\"card-header\">\n                <a href=\"javascript:void(0);\" style=\"font-size: 22px;\" (click)=\"alreadyReady = !alreadyReady\">Already Ready</a>\n            </h4>\n            <view-fader [isViewVisible]=\"alreadyReady\" *ngIf=\"alreadyReady\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                The AngularDotNet Starter Application comes with the scaffolding for you to immediately begin implementing your own custom feature. The feature is titled \"Already Ready\".\n            </view-fader>\n        </div>\n\n    </div>\n\n</view-fader>\n" /* this was squashed */,
            styles: ["\n.feature-title {\n    color: #007aff;\n    background-color: #dfdfdf;\n    padding: 10px;\n    width: 250px;\n    height: 60px;\n    text-align: center;\n    border-radius: 25px;\n}\n\n.feature-list {\n    padding: 10px;\n    border-radius: 25px;\n}\n\n.feature-heading {\n    padding: 10px;\n    border-radius: 15px;\n}\n"]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_common_appConfig__WEBPACK_IMPORTED_MODULE_2__["AppConfig"], ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"]])
    ], Features);
    return Features;
}());



/***/ }),

/***/ "./features/mobileApis.ts":
/*!********************************!*\
  !*** ./features/mobileApis.ts ***!
  \********************************/
/*! exports provided: MobileApis */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MobileApis", function() { return MobileApis; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _common_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/appConfig */ "./common/appConfig.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_ng2_mobiletech_speechToText__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/ng2-mobiletech/speechToText */ "./shared/ng2-mobiletech/speechToText.ts");
/* harmony import */ var _shared_ng2_mobiletech_textToSpeech__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/ng2-mobiletech/textToSpeech */ "./shared/ng2-mobiletech/textToSpeech.ts");
/* harmony import */ var _shared_ng2_mobiletech_googleMaps__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/ng2-mobiletech/googleMaps */ "./shared/ng2-mobiletech/googleMaps.ts");
/* harmony import */ var _shared_ng2_apphelper_appServices__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/ng2-apphelper/appServices */ "./shared/ng2-apphelper/appServices.ts");

// #region Imports

// services






// #endregions
// #region Constructor
var MobileApis = /** @class */ (function () {
    function MobileApis(ac, toastr, cd, as) {
        this.ac = ac;
        this.toastr = toastr;
        this.cd = cd;
        this.as = as;
        this.isViewVisible = false;
        this.speechRecognitionOn = false;
        this.speechRecognitionPaused = false;
        this.textAreaNgModel = "";
        this.showSpeechToText = false;
        this.showTextToSpeech = false;
        this.spellCheck = false;
        this.latitude = 0;
        this.longitude = 0;
        this.address = "";
        this.zipcode = "";
        this.showTextArea = true;
        this.textAreaMinRowCount = 4;
        this.selectedFeature = "";
        this.phoneNumber = "";
        this.gmHeaderHeight = 80;
        this.gmTextHeight = 230;
    }
    MobileApis.prototype.ngOnInit = function () {
        var _this = this;
        this.ac.waitUntilInitialized(function () {
            _this.isViewVisible = true;
            setTimeout(function () {
                _this.selectedFeature = "speech2Text";
            }, 0);
        });
    };
    // #endregion
    //#region Speech To Text:
    MobileApis.prototype.onClickSpeechToText = function () {
        var _this = this;
        if (!this.s2T.featureIsAvailable) {
            this.unavailableFeature("Speech to Text");
            return;
        }
        this.s2T.owner = this;
        this.s2T.onRestartCallback = "onRestartS2TCallback";
        this.s2T.onResultsCallback = "onResultsS2TCallback";
        this.s2T.isClosable = true;
        this.s2T.positionTop = -75;
        this.showSpeechToText = false;
        this.textAreaNgModel = "";
        setTimeout(function () {
            _this.showSpeechToText = true;
        });
    };
    MobileApis.prototype.onRestartS2TCallback = function () {
        // in this case, don't clear the text on restart
    };
    MobileApis.prototype.onResultsS2TCallback = function (speech) {
        this.textAreaNgModel += speech;
        this.cd.detectChanges();
    };
    MobileApis.prototype.unavailableFeature = function (feature) {
        var _this = this;
        this.toastr.info(feature + " is unavailable with this browser...");
        setTimeout(function () {
            _this.toastr.info("Upgrade to Google Chrome!");
        }, 5000);
    };
    MobileApis.prototype.onClickTextToSpeech = function () {
        var _this = this;
        if (!this.t2S.featureIsAvailable) {
            this.unavailableFeature("Text to Speech");
            return;
        }
        this.t2S.textToSpeak = this.textAreaNgModel;
        this.t2S.isClosable = true;
        this.t2S.positionTop = -75;
        this.t2S.owner = this;
        this.t2S.onChangeCallback = "onT2SChangeCallback";
        this.showTextToSpeech = false;
        setTimeout(function () {
            _this.showTextToSpeech = true;
        });
    };
    MobileApis.prototype.onT2SChangeCallback = function () {
        // Speech completed, paused, or stopped
    };
    MobileApis.prototype.onClickClearText = function () {
        this.textAreaNgModel = "";
    };
    MobileApis.prototype.onClickSpellCheck = function (spellCheck) {
        var _this = this;
        this.spellCheck = spellCheck;
        if (this.spellCheck) {
            setTimeout(function () {
                var textArea = document.querySelector(".textAreaNgModel");
                if (_this.spellCheck)
                    _this.as.spellChecker(textArea);
                else
                    textArea.focus();
            });
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
    MobileApis.prototype.getRowCount = function () {
        var count = document.querySelector(".textAreaNgModel").value.split("\n").length;
        if (count > this.textAreaMinRowCount)
            return count;
        else
            return this.textAreaMinRowCount;
    };
    // #endregion
    //#region Text Messaging:
    MobileApis.prototype.getCellCarriers = function () {
        var cellCarriers = new Array();
        this.ac.appSettings.cellCarriers.split(";").forEach(function (cellCarrier) {
            cellCarriers.push({ name: cellCarrier.split(":")[0], smsProfile: cellCarrier.split(":")[1] });
        });
        return cellCarriers;
    };
    MobileApis.prototype.onClickTextMessaging = function () {
        this.selectedFeature = "textMessaging";
    };
    MobileApis.prototype.limitPhoneNoInput = function (phoneNumber) {
        if (phoneNumber.length > 10) {
            this.phoneNumber = phoneNumber.toString().substr(0, 10);
        }
    };
    MobileApis.prototype.shouldSendBeDisabled = function () {
        if (!this.cellCarrierName || this.phoneNumber.toString().length < 10)
            return true;
        return false;
    };
    MobileApis.prototype.onClickSend = function () {
        var _this = this;
        this.ac.showSpinner(true);
        this.ac.sendTextMessage({
            message: this.textAreaNgModel,
            cellCarrierName: this.cellCarrierName,
            phoneNumber: this.phoneNumber
        }, function () {
            _this.ac.showSpinner(false);
            _this.playAscending(0.01);
            _this.toastr.success("Success: Your text message has been sent to: " + _this.phoneNumber);
        }, function (errorMessage) {
            _this.ac.showSpinner(false);
            _this.toastr.error("Error: " + errorMessage);
        });
    };
    MobileApis.prototype.playAscending = function (volume) {
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
    MobileApis.prototype.play4Ths = function (volume) {
        var _this = this;
        setTimeout(function () {
            _this.as.beep(1500, 523.25, volume, "sine", null);
            setTimeout(function () {
                _this.as.beep(1500, 698.46, volume, "sine", null);
                setTimeout(function () {
                    _this.as.beep(1500, 932.33, volume, "sine", null);
                    setTimeout(function () {
                        _this.as.beep(1500, 1244.51, volume, "sine", null);
                    }, 250);
                }, 250);
            }, 250);
        }, 250);
    };
    // #endregion
    //#region GoogleMaps:
    MobileApis.prototype.onClickGoogleMaps = function () {
        var _this = this;
        this.selectedFeature = "googleMaps";
        setTimeout(function () {
            _this.gm.owner = _this;
            _this.gm.updateCoordinatesCallback = "updateCoordinatesCallback";
            _this.gm.updateAddressCallback = "updateAddressCallback";
            _this.gm.googleMapKey = _this.ac.appSettings.googleMapKey;
            _this.gm.initialize();
        });
    };
    MobileApis.prototype.updateAddressCallback = function (address, zipcode) {
        this.address = address;
        this.zipcode = zipcode;
    };
    MobileApis.prototype.updateCoordinatesCallback = function (latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.gm.lookupAddress();
    };
    MobileApis.prototype.shouldUpdateByAddressBeDisabled = function () {
        return this.address.trim().length === 0 || this.zipcode.toString().trim().length < 5;
    };
    MobileApis.prototype.calcGmTextWidth = function () {
        if (this.ac.isPhoneSize) {
            if (this.ac.isLandscapeView)
                return this.ac.screenWidth / 3;
            else
                return this.ac.screenWidth - 70;
        }
        return 270;
    };
    MobileApis.prototype.getGmTextWidth = function () {
        return this.calcGmTextWidth();
    };
    MobileApis.prototype.getGmMapWidth = function () {
        if (this.ac.isPhoneSize) {
            if (this.ac.isLandscapeView)
                return this.ac.screenWidth - (this.calcGmTextWidth() + 75);
            else
                return this.calcGmTextWidth();
        }
        return this.ac.screenWidth - 500;
    };
    MobileApis.prototype.getGmMapHeight = function () {
        if (this.ac.isPhoneSize) {
            if (this.ac.isLandscapeView)
                return this.ac.screenHeight - (this.gmHeaderHeight);
            else {
                return this.ac.screenHeight - (this.gmTextHeight + this.gmHeaderHeight);
            }
        }
        return screen.availHeight / 2;
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_shared_ng2_mobiletech_speechToText__WEBPACK_IMPORTED_MODULE_4__["SpeechToText"]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _shared_ng2_mobiletech_speechToText__WEBPACK_IMPORTED_MODULE_4__["SpeechToText"])
    ], MobileApis.prototype, "s2T", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_shared_ng2_mobiletech_textToSpeech__WEBPACK_IMPORTED_MODULE_5__["TextToSpeech"]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _shared_ng2_mobiletech_textToSpeech__WEBPACK_IMPORTED_MODULE_5__["TextToSpeech"])
    ], MobileApis.prototype, "t2S", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_shared_ng2_mobiletech_googleMaps__WEBPACK_IMPORTED_MODULE_6__["GoogleMaps"]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _shared_ng2_mobiletech_googleMaps__WEBPACK_IMPORTED_MODULE_6__["GoogleMaps"])
    ], MobileApis.prototype, "gm", void 0);
    MobileApis = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            // #region template
            selector: "mobileapis",
            template: "\n<speech-to-text [isVisible]=\"showSpeechToText\"></speech-to-text>\n<text-to-speech [isVisible]=\"showTextToSpeech\"></text-to-speech>\n\n<view-fader [isViewVisible]=\"isViewVisible\" style=\"font-size: 110%; \">\n\n    <div class=\"text-primary\">\n        <div align=\"center\">\n\n            <div class=\"btn-group\" style=\"width: 300px;  margin-left: 25px; \">\n                <button class=\"btn btn-primary feature-not-selected\" [ngClass]=\"{\'btn-outline-primary feature-selected\': selectedFeature === \'speech2Text\'}\" (click)=\"selectedFeature = \'speech2Text\'\">Speech to Text</button>\n                <button class=\"btn btn-primary feature-not-selected\" [ngClass]=\"{\'btn-outline-primary feature-selected\': selectedFeature === \'textMessaging\'}\" (click)=\"selectedFeature = \'textMessaging\'\">SMS/MMS</button>\n                <button class=\"btn btn-primary feature-not-selected\" [ngClass]=\"{\'btn-outline-primary feature-selected\': selectedFeature === \'googleMaps\'}\" (click)=\"onClickGoogleMaps()\">Map</button>\n            </div>\n\n            <view-fader *ngIf=\"selectedFeature === \'speech2Text\'\" [isViewVisible]=\"selectedFeature === \'speech2Text\'\">\n                <div class=\"s2t-text\" style=\"width: 285px;  margin-top: 20px; margin-left:10px; \">\n                    <span>\n                        <a href=\"javascript:void(0);\" (click)=\"onClickTextToSpeech()\" style=\"color: cornflowerblue; float:left; cursor: pointer; margin-bottom: 5px; \" title=\"Text-to-speech\"> <i class=\"fa fa-volume-up fa-2x\"></i></a>\n                        <a href=\"javascript:void(0);\" (click)=\"onClickSpeechToText()\" style=\"color: cornflowerblue; float:right; cursor: pointer; margin-bottom: 5px; \" title=\"Speech-to-text\"><i class=\"fa fa-microphone fa-2x\"></i></a>\n                    </span>\n                    <textarea style=\"font-size: 110%; height: 170px; color: #007aff; \" *ngIf=\"showTextArea\" [spellcheck]=\"spellCheck\" class=\"form-control textAreaNgModel\" [rows]=\"getRowCount()\" [(ngModel)]=\"textAreaNgModel\"></textarea>\n                    <span>\n                        <a *ngIf=\"!spellCheck\" href=\"javascript:void(0);\" (click)=\"onClickSpellCheck(true)\" style=\"color: red; float:left; cursor: pointer; margin-top: 5px; \" title=\"Spell Checking: Off\"><i class=\"fa fa-check fa-2x\"></i></a>\n                        <a *ngIf=\"spellCheck\" href=\"javascript:void(0);\" (click)=\"onClickSpellCheck(false)\" style=\"color: green; float:left; cursor: pointer; margin-top: 5px; \" title=\"Spell Checking: On\"><i class=\"fa fa-check fa-2x\"></i></a>\n                        <a href=\"javascript:void(0);\" (click)=\"onClickClearText()\" style=\"color: cornflowerblue; float:right; cursor: pointer; margin-top: 5px; \" title=\"Clear Text\"><i class=\"fa fa-recycle fa-2x\"></i></a>\n\n                        <span style=\"float: left; margin-left: 5px; margin-top: 7px; font-size: 16px; \">Spell Checking: <span style=\"font-weight: bold; \">{{ spellCheck ? \"On\" : \"Off\" }}</span></span>\n                    </span>\n                </div>\n            </view-fader>\n\n            <view-fader *ngIf=\"selectedFeature === \'textMessaging\'\" [isViewVisible]=\"selectedFeature === \'textMessaging\'\">\n                <br />\n                <div style=\"width: 285px; margin-left: 10px; \">\n                    <div>* Cellular Carrier</div>\n                    <select [(ngModel)]=\"cellCarrierName\" class=\"form-control text-primary\">\n                        <option *ngIf=\"!cellCarrier\" [value]=\"none\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<< Select a Cellular Carrier >></option>\n                        <option *ngFor=\"let cellCarrier of getCellCarriers()\" [value]=\"cellCarrier.name\">{{cellCarrier.name}}</option>\n                    </select>\n                    <br />\n                    <div style=\"margin-left: 10px;\">* Phone Number (Numbers Only)</div>\n                    <input min=\"0\" max=\"9999999999\" (keyup)=\"limitPhoneNoInput($event.target.value)\" [(ngModel)]=\"phoneNumber\" class=\"form-control\" type=\"number\" style=\"width: 100%; margin-right: 10px; color: #007aff; \" />\n                    <br />\n                    <button class=\"btn btn-primary\" [disabled]=\"shouldSendBeDisabled()\" style=\"width: 75px; float: right; \" (click)=\"onClickSend()\">Send</button>\n                </div>\n            </view-fader>\n\n            <view-fader *ngIf=\"selectedFeature === \'googleMaps\'\" [isViewVisible]=\"selectedFeature === \'googleMaps\'\">\n                <div style=\"margin-left: 10px; margin-top: 20px; width: 90%; \" class=\"row\">\n                    \n                    <div [style.min-width.px]=\"getGmTextWidth()\"  [style.min-height.px]=\"gmTextHeight\" >\n                        \n                        <div>&nbsp;&nbsp;Address</div>\n                        <input [(ngModel)]=\"address\" class=\"form-control\" type=\"text\" style=\"height: 28px; width: 100%; font-size: 18px; vertical-align: middle; color: #007aff; \" />\n                        <div style=\"margin-top: 10px; \">&nbsp;&nbsp;Zip Code</div>\n                        <input [(ngModel)]=\"zipcode\" class=\"form-control\" type=\"number\" min=\"0\" max=\"99999\" style=\"height: 28px; width: 100%; font-size: 18px; vertical-align: middle; color: #007aff; \" />\n                        <div style=\"float: left; margin-top: 10px; \">&nbsp;&nbsp;Latitude</div>\n                        <div style=\"float: right; margin-top: 10px; \">Longitude&nbsp;&nbsp;</div>\n                        <br />\n                        <div style=\"margin-top: 10px; \">\n                            <div *ngIf=\"latitude !== 0\" style=\"float: left; \">&nbsp;&nbsp;{{latitude}}</div>\n                            <div *ngIf=\"latitude === 0\" style=\"float: left; \">&nbsp;&nbsp;00.00000</div>\n\n                            <div *ngIf=\"longitude !== 0\" style=\"float: right; \">{{longitude}}&nbsp;&nbsp;&nbsp;</div>\n                            <div *ngIf=\"longitude === 0\" style=\"float: right; \">00.00000&nbsp;&nbsp;&nbsp;</div>\n                            <br />\n                            <button style=\"margin-top: 10px; float: left; \" (click)=\"gm.findMe()\" class=\"btn btn-sm  btn-primary\" title=\"Find Me on Google Maps\">Find Me</button>\n                            <button style=\"margin-left: 10px; margin-top: 10px; float: right;\" (click)=\"gm.useAddress(address, zipcode)\" [disabled]=\"shouldUpdateByAddressBeDisabled()\" class=\"btn btn-sm btn-primary\" title=\"Use Address to Google Maps\">Use Address</button>\n                        </div>\n\n                    </div>\n\n                    <div [style.min-width.px]=\"getGmMapWidth()\" [style.min-height.px]=\"getGmMapHeight()\" style=\"padding-left: 10px; \">\n                        <google-maps [widthPercent]=\"100\" [heightPercent]=\"95\" [isVisible]=\"true\" style=\"border-radius: 10px; \"></google-maps>\n                    </div>\n                </div>\n            </view-fader>\n\n        </div>\n    </div>\n</view-fader>\n" /* this was squashed */,
            styles: ["\n.feature-title {\n    color: #007aff;\n    background-color: #dfdfdf;\n    padding: 10px;\n    width: 200px;\n    height: 60px;\n    text-align: center;\n    border-radius: 25px;\n}\n\n.feature-list {\n    background-color: #dfdfdf;\n    padding: 10px;\n    border-radius: 25px;\n}\n\n.feature-heading {\n    padding: 10px;\n    border-radius: 15px;\n}\n\n.textAreaNgModel {\n}\n\n.s2t-text {\n    margin-top: 20px;\n}\n\n.feature-selected {\n    cursor: none;\n    background-color: white;\n}\n\n.feature-selected:hover {\n    cursor: default;\n    color: #007bff;\n    background-color: transparent;\n}\n\n.feature-not-selected {\n    cursor: pointer;\n}\n"]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_common_appConfig__WEBPACK_IMPORTED_MODULE_2__["AppConfig"], ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], _shared_ng2_apphelper_appServices__WEBPACK_IMPORTED_MODULE_7__["AppServices"]])
    ], MobileApis);
    return MobileApis;
}());



/***/ }),

/***/ "./features/notification.ts":
/*!**********************************!*\
  !*** ./features/notification.ts ***!
  \**********************************/
/*! exports provided: Notification */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Notification", function() { return Notification; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _common_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/appConfig */ "./common/appConfig.ts");
/* harmony import */ var _common_messagePump__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/messagePump */ "./common/messagePump.ts");
/* harmony import */ var _shared_ng2_apphelper_appServices__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/ng2-apphelper/appServices */ "./shared/ng2-apphelper/appServices.ts");
/* harmony import */ var _shared_ng2_mobiletech_speechToText__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/ng2-mobiletech/speechToText */ "./shared/ng2-mobiletech/speechToText.ts");
/* harmony import */ var _shared_ng2_mobiletech_textToSpeech__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/ng2-mobiletech/textToSpeech */ "./shared/ng2-mobiletech/textToSpeech.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_ng2_animation_modalDialog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../shared/ng2-animation/modalDialog */ "./shared/ng2-animation/modalDialog.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _shared_client_side_models_channelInfo__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../shared/client-side-models/channelInfo */ "./shared/client-side-models/channelInfo.ts");

//#region Imports

// services








// models

//#endregion
var Notification = /** @class */ (function () {
    function Notification(ac, toastr, xcvr, cd, as) {
        var _this = this;
        this.ac = ac;
        this.toastr = toastr;
        this.xcvr = xcvr;
        this.cd = cd;
        this.as = as;
        this.isViewVisible = false;
        this.textToSend = "";
        this.textReceived = "";
        this.showTextArea = true;
        this.speechRecognitionOn = false;
        this.speechRecognitionPaused = false;
        this.showSpeechToText = false;
        this.showTextToSpeech = false;
        this.spellCheck = false;
        this.textAreaMinRowCount = 3;
        this.showModalDialog = false;
        window.ononline = function () {
            _this.onlineCallback();
        };
        window.onoffline = function () {
            _this.offlineCallback();
        };
    }
    Notification.prototype.onlineCallback = function () {
        if (this.xcvr.setToAutoRegister) {
            this.onClickRegister();
        }
    };
    Notification.prototype.offlineCallback = function () {
        this.xcvr.setToOffline();
    };
    Notification.prototype.ngOnInit = function () {
        var _this = this;
        this.ac.waitUntilInitialized(function () {
            _this.xcvr.getAllRegisteredChannels(function () { }, function (errorMessage) {
                _this.toastr.error("Error: " + errorMessage);
            });
            _this.isViewVisible = true;
            window.onbeforeunload = function () {
                if (_this.xcvr.channelRegistered) {
                    _this.onClickUnregister();
                }
            };
        });
    };
    //#endregion
    //#region S2T & T2S:
    Notification.prototype.unavailableFeature = function (feature) {
        var _this = this;
        this.toastr.info(feature + " is unavailable with this browser...");
        setTimeout(function () {
            _this.toastr.info("Upgrade to Google Chrome!");
        }, 5000);
    };
    Notification.prototype.onClickSpeechToText = function () {
        var _this = this;
        if (!this.s2T.featureIsAvailable) {
            this.unavailableFeature("Speech to Text");
            return;
        }
        this.s2T.owner = this;
        this.s2T.onRestartCallback = "onRestartS2TCallback";
        this.s2T.onResultsCallback = "onResultsS2TCallback";
        this.s2T.isClosable = true;
        this.s2T.positionTop = -75;
        this.showSpeechToText = false;
        this.textToSend = "";
        setTimeout(function () {
            _this.showSpeechToText = true;
        });
    };
    Notification.prototype.onRestartS2TCallback = function () {
        // in this case, don't clear the text on restart
    };
    Notification.prototype.onResultsS2TCallback = function (speech) {
        if (!this.voiceActivation(speech)) {
            if (this.xcvr.channelRegistered) {
                this.textToSend += speech + "\n";
                this.cd.detectChanges();
            }
            else {
                this.audioResponses("can't compose message");
            }
        }
    };
    Notification.prototype.voiceActivation = function (command) {
        switch (command.toLowerCase().trim()) {
            case "computer register channel":
                if (this.shouldRegistrationBeDisabled()) {
                    this.audioResponses("can't register channel");
                }
                else
                    this.onClickRegister();
                return true;
            case "computer unregister channel":
                if (this.shouldUnregistrationBeDisabled())
                    this.audioResponses("can't unregister channel");
                else
                    this.onClickUnregister();
                return true;
            case "computer check spelling":
                this.onClickSpellCheck(true);
                return true;
            case "computer send message":
                if (this.shouldSendBeDisabled())
                    this.audioResponses("can't send message");
                else
                    this.onClickSendMessage();
                return true;
            case "computer clear text":
                this.onClickClearText();
                return true;
            default:
                break;
        }
        // partial matches
        if (command.toLowerCase().trim().indexOf("computer register channel") !== -1) {
            this.voiceRegisterChannel(command);
            return true;
        }
        if (command.toLowerCase().trim().indexOf("computer subscribe to channel") !== -1) {
            this.voiceSubscribeToChannel(command);
            return true;
        }
    };
    Notification.prototype.voiceRegisterChannel = function (command) {
        // protocol: "computer register channel A"
        var commandParts = command.split(" ");
        if (commandParts.length < 4) {
            this.audioResponses("what do you want");
            return;
        }
        this.xcvr.channelRegistration.name = this.getChannelNameFromCommand(command, 3);
        this.onClickRegister();
    };
    Notification.prototype.getChannelNameFromCommand = function (command, index) {
        var commandParts = command.split(" ");
        var channelName = "";
        for (var i = index; i < commandParts.length; i++) {
            channelName += commandParts[i] + " ";
        }
        return channelName.trim().toUpperCase();
    };
    Notification.prototype.voiceSubscribeToChannel = function (command) {
        // protocol: "computer subscribe to channel A"
        var commandParts = command.split(" ");
        if (commandParts.length < 5) {
            this.audioResponses("what do you want");
            return;
        }
        var channelName = this.getChannelNameFromCommand(command, 4);
        // is channel already subscribed to?
        var already = lodash__WEBPACK_IMPORTED_MODULE_9__["filter"](this.xcvr.channelRegistration.subscriptions, function (i) { return (i === channelName); });
        if (already.length > 0) {
            this.audioResponses("channel already subscribed", channelName);
            return;
        }
        var available = lodash__WEBPACK_IMPORTED_MODULE_9__["filter"](this.xcvr.getOrderedChanneNameslForSubscriptions(), function (i) { return (i === channelName); });
        if (available.length !== 1) {
            this.audioResponses("channel not available", channelName);
            return;
        }
        this.xcvr.channelRegistration.subscriptions.push(channelName);
        this.onUpdateSubscriptions();
    };
    Notification.prototype.audioResponses = function (response, value) {
        var audioResponse = "";
        switch (response) {
            case "can't register channel":
                this.s2T.onClickPause();
                audioResponse = "Sorry! It's not possible to register the channel at this time!";
                break;
            case "can't unregister channel":
                this.s2T.onClickPause();
                audioResponse = "Sorry! It's not possible to unregister the channel at this time!";
                break;
            case "can't compose message":
                this.s2T.onClickPause();
                audioResponse = "Sorry! It's not possible to compose a message until after channel registration!";
                break;
            case "what do you want":
                this.s2T.onClickPause();
                audioResponse = "Sorry! I really don't know what you expect me to do. Please repeat!";
                break;
            case "channel already subscribed":
                this.s2T.onClickPause();
                audioResponse = "Sorry! You are already subscribed to channel: " + value;
                break;
            case "channel not available":
                this.s2T.onClickPause();
                audioResponse = "Sorry! Channel " + value + " is not available for supscription!";
                break;
            case "can't send message":
                this.s2T.onClickPause();
                audioResponse = "Sorry! To send a message, you must have a registered channel, and a message to send!";
                break;
            default:
                break;
        }
        this.textToSpeech(audioResponse);
        this.toastr.error(audioResponse);
    };
    Notification.prototype.onClickTextToSpeech = function () {
        this.textToSpeech(this.textToSend);
    };
    Notification.prototype.textToSpeech = function (speech) {
        var _this = this;
        if (!this.t2S.featureIsAvailable) {
            this.unavailableFeature("Text to Speech");
            return;
        }
        this.t2S.textToSpeak = speech;
        this.t2S.isClosable = true;
        this.t2S.positionTop = -75;
        this.t2S.owner = this;
        this.t2S.onChangeCallback = "onT2SChangeCallback";
        setTimeout(function () {
            _this.t2S.setupT2S();
            _this.t2S.Start();
        });
    };
    Notification.prototype.onT2SChangeCallback = function () {
        // Speech completed, paused, or stopped
    };
    Notification.prototype.onClickClearText = function () {
        this.textToSend = "";
    };
    Notification.prototype.onClickSpellCheck = function (spellCheck) {
        var _this = this;
        this.spellCheck = spellCheck;
        if (this.spellCheck) {
            setTimeout(function () {
                var textArea = document.querySelector(".textToSend");
                if (_this.spellCheck)
                    _this.as.spellChecker(textArea);
                else
                    textArea.focus();
            });
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
    Notification.prototype.getRowCount = function () {
        var count = document.querySelector(".textToSend").value.split("\n").length;
        if (count > this.textAreaMinRowCount)
            return count;
        else
            return this.textAreaMinRowCount;
    };
    // #endregion
    //#region Message Control
    Notification.prototype.updateMessagesReceived = function () {
        var _this = this;
        this.textReceived = "";
        this.xcvr.receiveMessageQueue.forEach(function (receiveMessage) {
            if (_this.t2S.featureIsAvailable)
                _this.textToSpeech("channel " + receiveMessage.sendersName + " sends, " + receiveMessage.message.toString());
            var sendersName = lodash__WEBPACK_IMPORTED_MODULE_9__["filter"](_this.xcvr.channelForSubscriptions, function (a) { return (a.name === receiveMessage.sendersName); })[0].name;
            _this.textReceived += sendersName + "> " + receiveMessage.message.toString() + "\n";
        });
    };
    Notification.prototype.onClickSendMessage = function () {
        var _this = this;
        // queue message before sending
        this.xcvr.transmitMessageQueue.push(this.getMessageObj(this.textToSend));
        this.s2T.onClickPause();
        this.xcvr.queueChannelMessage(function () {
            _this.toastr.success("Message sent successfully!");
        }, function (errorMessage) {
            _this.toastr.error("Error: " + errorMessage);
        }, function () {
            _this.toastr.info("Offline: Message is cached for sending when back online");
        });
    };
    Notification.prototype.getMessageObj = function (message) {
        var channelMessage = new _shared_client_side_models_channelInfo__WEBPACK_IMPORTED_MODULE_10__["ChannelMessage"]();
        channelMessage.type = "ChannelMessage";
        channelMessage.syncAction = "dispatchMessage";
        channelMessage.sendersName = this.xcvr.channelRegistration.name;
        channelMessage.message = message;
        //channelMessage.message = new Date(); //cool! because on the server, this looks like a DateTime in UTC
        return channelMessage;
    };
    Notification.prototype.synchronize = function () {
        var _this = this;
        this.xcvr.synchronize(function () {
            // messageReceivedCallback
            _this.updateMessagesReceived();
        }, function () {
            _this.toastr.success("You successfully unregistered channel: " + _this.xcvr.channelRegistration.name);
        }, function (errorMessage) {
            _this.toastr.error("Error: " + errorMessage);
        });
    };
    //#endregion
    //#region Registration
    Notification.prototype.onClickRegister = function () {
        var _this = this;
        this.xcvr.channelRegistration.name = this.xcvr.channelRegistration.name.toUpperCase();
        this.xcvr.register(function () {
            _this.toastr.success("You successfully registered channel: " + _this.xcvr.channelRegistration.name);
            _this.xcvr.setToAutoRegister = false;
            if (_this.xcvr.transmitMessageQueue.length > 0) {
                _this.xcvr.sendChannelMessage(function () {
                    _this.synchronize();
                }, function (errorMessage) { }, function () { });
            }
            else
                _this.synchronize();
        }, function (errorMessage) {
            _this.toastr.error("Error: " + errorMessage);
        });
    };
    Notification.prototype.onClickUnregister = function () {
        var _this = this;
        this.xcvr.unregister(function () {
            // no message
        }, function (errorMessage) {
            _this.toastr.error("Error: " + errorMessage);
        });
        this.as.sleep(500);
    };
    Notification.prototype.onClickNamedUnregister = function () {
        var _this = this;
        var channelName = "";
        if (this.xcvr.channelsToUnregister.includes(this.xcvr.channelRegistration.name))
            channelName = this.xcvr.channelRegistration.name;
        else
            channelName = this.xcvr.channelsToUnregister[0];
        this.xcvr.namedUnregister(channelName, function () {
            lodash__WEBPACK_IMPORTED_MODULE_9__["pull"](_this.xcvr.channelsToUnregister, channelName);
            _this.toastr.success("You successfully unregistered channel: " + channelName);
            if (_this.xcvr.channelsToUnregister.length > 0)
                setTimeout(function () { _this.onClickNamedUnregister(); });
        }, function (errorMessage) {
            _this.toastr.error("Error: " + errorMessage);
        });
    };
    Notification.prototype.onUpdateSubscriptions = function () {
        var _this = this;
        this.xcvr.onUpdateSubscriptions(function () {
            _this.toastr.success("Update to subscription was successfully!");
        }, function (errorMessage) {
            _this.toastr.error("Error: " + errorMessage);
        });
    };
    //#endregion
    //#region Button Control
    Notification.prototype.shouldRegistrationBeDisabled = function () {
        if (this.xcvr.channelRegistration.name.trim().length === 0 || this.xcvr.channelRegistered || !navigator.onLine)
            return true;
        return false;
    };
    Notification.prototype.shouldNamedUnregistrationBeDisabled = function () {
        if (this.xcvr.channelsToUnregister.length === 0)
            return true;
        return false;
    };
    Notification.prototype.shouldUnregistrationBeDisabled = function () {
        if (!this.xcvr.channelRegistered || this.xcvr.channelUnregistrationInProcess)
            return true;
        return false;
    };
    Notification.prototype.shouldSendBeDisabled = function () {
        if (this.textToSend.trim().length === 0)
            return true;
        if (!this.xcvr.channelRegistered && navigator.onLine)
            return true;
        return false;
    };
    //#endregion
    //#region Help System
    Notification.prototype.onClickHelp = function () {
        var _this = this;
        this.md.modalDialogTitle = "Help on Notification";
        this.md.showOkButton = true;
        this.md.isClosable = true;
        this.md.desiredWidth = 750;
        this.md.desiredHeight = 425;
        this.showModalDialog = false;
        setTimeout(function () {
            _this.showModalDialog = true;
        });
        this.md.dialogButtonCallback = function (buttonClicked) {
            if (buttonClicked === "ok") {
                _this.md.closeDialog();
            }
        };
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_shared_ng2_mobiletech_speechToText__WEBPACK_IMPORTED_MODULE_5__["SpeechToText"]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _shared_ng2_mobiletech_speechToText__WEBPACK_IMPORTED_MODULE_5__["SpeechToText"])
    ], Notification.prototype, "s2T", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_shared_ng2_mobiletech_textToSpeech__WEBPACK_IMPORTED_MODULE_6__["TextToSpeech"]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _shared_ng2_mobiletech_textToSpeech__WEBPACK_IMPORTED_MODULE_6__["TextToSpeech"])
    ], Notification.prototype, "t2S", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_shared_ng2_animation_modalDialog__WEBPACK_IMPORTED_MODULE_8__["ModalDialog"]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _shared_ng2_animation_modalDialog__WEBPACK_IMPORTED_MODULE_8__["ModalDialog"])
    ], Notification.prototype, "md", void 0);
    Notification = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            // #region template
            template: "\n<speech-to-text [isVisible]=\"showSpeechToText\"></speech-to-text>\n<text-to-speech [isVisible]=\"showTextToSpeech\"></text-to-speech>\n\n<modal-dialog class=\"text-primary\" [isVisible]=\"showModalDialog\">\n    <div style=\"margin: 10px; height: 285px; overflow-y: scroll; \">\n\n        <div style=\"text-align: center; font-weight: bold; \">\n            OVERVIEW\n        </div>\n        <div>\n            The Notification feature is a type of messaging system. The system will send and receive notifications, but is not limited to text. It is also possible to send and receive objects and collection.\n        </div>\n        <div style=\"text-align: center; font-weight: bold; \">\n            Steps to Send a Notification\n        </div>\n        <div>\n            1)	Register the channel by entering the channel name in the \"Channel Name\" textbox.\n            <br />\n            &nbsp;&nbsp;&nbsp;&nbsp;The channel name can be any name you choose\n            <br />\n            2)	Click the \"Register\" button\n            <br />\n            3)	Enter text in the \"Transmit Message(s)\" textbox\n            <br />\n            4)	Click the send button\n        </div>\n        <div style=\"text-align: center; font-weight: bold; \">\n            Steps to Receive a Notification\n        </div>\n        <div>\n            1)	Register the channel, as you did in step 1 above\n            <br />\n            2)	From the \"Receiving Subscription(s)\" list box, select which channel(s) that you want\n            <br />\n            &nbsp;&nbsp;&nbsp;&nbsp;to receive notifications from. This can be your own channel\n            <br />\n            3)	Now when the channels that you have subscribed to send notifications, you will see the channel name along with the message, in the \"Received Message(s)\" textbox\n        </div>\n        <br />\n        <div style=\"text-align: center; font-weight: bold; \">\n            Composing a Text Message\n        </div>\n        <div>\n            You can enter text without the keyboard by using the \"Speech to Text\" converter.\n            To the right of the \"Transmit Message(s)\" textbox is a microphone icon. Click this icon and begin speaking. Your speech will be converted to text.\n        </div>\n        <br />\n        <div style=\"text-align: center; font-weight: bold; \">\n            Voice Activated Commands\n        </div>\n        <div>\n            You can activate commands without the keyboard or mouse by using the \"Speech to Text\" converter. Click the microphone and begin speaking. Your voice commands will initiate the notification commands.\n            <br /><br />\n            Here is an example registering a channel named \"Jupiter Station\".\n            <br />\n            1)	Click on the microphone icon\n            <br />\n            2)	Speak: Computer, register channel \"Jupiter Station\"\n        </div>\n        <br />\n        <div style=\"text-align: center; font-weight: bold; \">\n            Other Voice Activate Commands\n        </div>\n        <div>\n            Computer, subscribe to channel \"Jupiter Station\"\n            <br />\n            Computer, unregister channel\n            <br />\n            Computer, send message\n            <br />\n            Computer, clear text\n            <br />\n        </div>\n    </div>\n\n</modal-dialog>\n\n<view-fader [isViewVisible]=\"isViewVisible\">\n    <div class=\"row\">\n        <div class=\"col-5\">\n            <h4 class=\"feature-subtitle\">Registration</h4>\n            <div class=\"feature-registration\">\n                <div style=\"margin: 5px;\">\n                    <div style=\"margin-left: 10px;\">* Channel Name</div>\n                    <input [disabled]=\"xcvr.channelRegistered\" [(ngModel)]=\"xcvr.channelRegistration.name\" class=\"form-control\" type=\"text\" style=\"width: 100%; margin-right: 10px; color: #007aff; text-transform: uppercase;\" />\n                    <button *ngIf=\"!xcvr.channelRegistered\" [disabled]=\"shouldRegistrationBeDisabled()\" style=\"margin-top: 10px; float: right; \" (click)=\"onClickRegister()\" class=\"btn btn-primary\" title=\"Register Channel\">Register</button>\n                    <button *ngIf=\"xcvr.channelRegistered\" [disabled]=\"shouldUnregistrationBeDisabled()\" style=\"margin-top: 10px; float: right; \" (click)=\"onClickUnregister()\" class=\"btn btn-primary\" title=\"Unregister Channel\">Unregister</button>\n                    <div style=\"height: 50px; width: 100%; \"></div>\n                </div>\n            </div>\n            <br />\n            <h4 class=\"feature-subtitle\">Registered Channels</h4>\n            <div class=\"feature-registration\">\n                <div style=\"margin: 5px;\">\n                        <select [(ngModel)]=\"xcvr.channelsToUnregister\" [disabled]=\"true\" class=\"form-control text-primary\" size=\"5\">\n                        <option *ngFor=\"let channel of xcvr.getOrderedAllRegisteredChannels()\" [value]=\"channel.name\">{{channel.name}}</option>\n                    </select>\n                    <div style=\"height: 50px; width: 100%; \"></div>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-1\"></div>\n        <div class=\"col-5\">\n            <h4 class=\"feature-subtitle\">Transceiver</h4>\n\n            <div class=\"feature-transceiver\">\n                <div>\n                    <span>\n                        <a href=\"javascript:void(0);\" (click)=\"onClickTextToSpeech()\" style=\"color: cornflowerblue; float:left; cursor: pointer; font-size: 22px; \" title=\"Text-to-speech\"> <i class=\"fa fa-volume-up fa\"></i></a>\n                        <span style=\"margin-left: 70px; \">Transmit Message(s)</span>\n                        <a href=\"javascript:void(0);\" (click)=\"onClickSpeechToText()\" style=\"color: cornflowerblue; float:right; cursor: pointer; font-size: 24px; \" title=\"Speech-to-text\"><i class=\"fa fa-microphone fa\"></i></a>\n                    </span>\n                    <textarea *ngIf=\"showTextArea\" [spellcheck]=\"spellCheck\" [rows]=\"getRowCount()\" [(ngModel)]=\"textToSend\" class=\"form-control textToSend\" type=\"text\" style=\"width: 100%; margin-right: 10px; color: #007aff;\"></textarea>\n                    <a *ngIf=\"!spellCheck\" href=\"javascript:void(0);\" (click)=\"onClickSpellCheck(true)\" style=\"color: red; float:left; cursor: pointer; margin-top: 5px; \" title=\"Spell Checking: Off\"><i class=\"fa fa-check fa\"></i></a>\n                    <a *ngIf=\"spellCheck\" href=\"javascript:void(0);\" (click)=\"onClickSpellCheck(false)\" style=\"color: green; float:left; cursor: pointer; margin-top: 5px; \" title=\"Spell Checking: On\"><i class=\"fa fa-check fa\"></i></a>\n                    <span style=\"float: left; margin-left: 5px; margin-top: 7px; font-size: 16px; \">Spell Checking</span>\n                    <a href=\"javascript:void(0);\" (click)=\"onClickClearText()\" style=\"color: cornflowerblue; cursor: pointer; float: left; margin-top: 5px; margin-left: 50px; font-size: 22px; \" title=\"Clear Text\"><i class=\"fa fa-recycle fa\"></i></a>\n\n                    <button [disabled]=\"shouldSendBeDisabled()\" style=\"margin-top: 5px; float: right; \" (click)=\"onClickSendMessage()\" class=\"btn btn-primary\" title=\"Send Message\">Send</button>\n                    <br /><br />\n                    <div style=\"margin-left: 10px;\">Receiving Subscription(s)</div>\n                    <select [(ngModel)]=\"xcvr.channelRegistration.subscriptions\" multiple=\"multiple\" class=\"form-control text-primary\" size=\"3\" (change)=\"onUpdateSubscriptions()\">\n                        <option *ngFor=\"let channel of xcvr.getOrderedChannelForSubscriptions()\" [value]=\"channel.name\">{{channel.name}}</option>\n                    </select>\n                    <span>Received Message(s)</span>\n                    <textarea disabled=\"disabled\" [rows]=\"4\" class=\"form-control\" type=\"text\" style=\"width: 100%; margin-right: 10px; color: #007aff;\">{{textReceived}}</textarea>\n                </div>\n            </div>\n        </div>\n        <div (click)=\"onClickHelp()\" style=\"width: 36px; height: 36px; \">\n            <i  style=\"color: cornflowerblue; cursor: pointer; font-size: 36px; \" title=\"Help on Notification\" class=\"fa fa-question-circle fa\"></i>\n        </div>\n        <div class=\"col-1\"></div>\n    </div>\n</view-fader>\n\n" /* this was squashed */,
            styles: ["\n.feature-title {\n    color: #007aff;\n    background-color: #dfdfdf;\n    padding: 10px;\n    width: 300px;\n    height: 60px;\n    text-align: center;\n    border-radius: 25px;\n}\n\n.feature-subtitle {\n    color: #007aff;\n    background-color: #dfdfdf;\n    font-family: px-neuropol;\n    padding: 10px;\n    width: 400px;\n    height: 60px;\n    text-align: center;\n    border-radius: 25px;\n}\n\n.feature-registration {\n    color: #007aff;\n    background-color: #dfdfdf;\n    padding: 10px;\n    width: 400px;\n    text-align: justify;\n    border-radius: 25px;\n    font-size: 20px;\n}\n\n.feature-transceiver {\n    color: #007aff;\n    background-color: #dfdfdf;\n    padding: 10px;\n    width: 400px;\n    text-align: justify;\n    border-radius: 25px;\n    font-size: 20px;\n}"]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_common_appConfig__WEBPACK_IMPORTED_MODULE_2__["AppConfig"], ngx_toastr__WEBPACK_IMPORTED_MODULE_7__["ToastrService"], _common_messagePump__WEBPACK_IMPORTED_MODULE_3__["MessagePump"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], _shared_ng2_apphelper_appServices__WEBPACK_IMPORTED_MODULE_4__["AppServices"]])
    ], Notification);
    return Notification;
}());



/***/ }),

/***/ "./features/settings.ts":
/*!******************************!*\
  !*** ./features/settings.ts ***!
  \******************************/
/*! exports provided: Settings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Settings", function() { return Settings; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _common_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/appConfig */ "./common/appConfig.ts");


// services

var Settings = /** @class */ (function () {
    function Settings(ac) {
        this.ac = ac;
        this.isViewVisible = false;
        this.dependencies = Array();
    }
    Settings.prototype.ngOnInit = function () {
        var _this = this;
        this.ac.waitUntilInitialized(function () {
            _this.isViewVisible = true;
        });
    };
    Settings = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            // #region template
            template: "\n\n<view-fader [isViewVisible]=\"isViewVisible\">\n\n    <h2 class=\"feature-title\" style=\"font-family: px-neuropol; \">VERSIONS & SETTINGS</h2>\n\n    <br />\n\n    <div class=\"row\">\n\n        <div class=\"feature-text col-5 offset-1\" style=\"height: 600px; \">\n            <div class=\"feature-subtitle\" style=\"font-family: px-neuropol; \">\n                <h3>Versions for AngularDotNet</h3>\n                <h4 style=\"font-family: px-neuropol; \">Application: {{ac.apiVersions.application}}</h4>\n            </div>\n            <table style=\"margin-left: 100px; \">\n                <tr>\n                    <td style=\"width: 170px; text-align: right; color:darkgreen;\">ASP.Net Core:</td>\n                    <td style=\"width: 20px; \">&nbsp;</td>\n                    <td style=\"width: 20px; color:darkgreen;\">{{ac.appSettings.aspNetCoreVersion}}</td>\n                </tr>\n                <tr>\n                    <td style=\"width: 170px; text-align: right; color: orangered;\">Angular:</td>\n                    <td style=\"width: 20px; \">&nbsp;</td>\n                    <td style=\"width: 20px; color: orangered;\">{{ac.apiVersions.angular}}</td>\n                </tr>\n                <tr>\n                    <td style=\"width: 170px; text-align: right; color: orangered;\">TypeScript:</td>\n                    <td style=\"width: 20px; \">&nbsp;</td>\n                    <td style=\"width: 20px; color: orangered;\">{{ac.apiVersions.typeScript}}</td>\n                </tr>\n                <tr>\n                    <td style=\"width: 170px; text-align: right; color: orangered;\">NodeJs:</td>\n                    <td style=\"width: 20px; \">&nbsp;</td>\n                    <td style=\"width: 20px; color: orangered;\">{{ac.apiVersions.nodeJs}}</td>\n                </tr>\n                <tr>\n                    <td style=\"width: 170px; text-align: right; color: orangered;\">V8 Engine:</td>\n                    <td style=\"width: 20px; \">&nbsp;</td>\n                    <td style=\"width: 20px; color: orangered;\">{{ac.apiVersions.v8Engine}}</td>\n                </tr>\n                <tr>\n                    <td style=\"width: 170px; text-align: right; color: orangered;\">Webpack CLI:</td>\n                    <td style=\"width: 20px; \">&nbsp;</td>\n                    <td style=\"width: 20px; color: orangered;\">{{ac.apiVersions.webpackCLI}}</td>\n                </tr>\n                <tr>\n                    <td style=\"width: 170px; text-align: right; \">RxJs:</td>\n                    <td style=\"width: 20px; \">&nbsp;</td>\n                    <td style=\"width: 20px; \">{{ac.apiVersions.rxJs}}</td>\n                </tr>\n                <tr>\n                    <td style=\"width: 170px; text-align: right; \">Bootstrap:</td>\n                    <td style=\"width: 20px; \">&nbsp;</td>\n                    <td style=\"width: 20px; \">{{ac.apiVersions.bootstrap}}</td>\n                </tr>\n                <tr>\n                    <td style=\"width: 170px; text-align: right; \">Lodash:</td>\n                    <td style=\"width: 20px; \">&nbsp;</td>\n                    <td style=\"width: 20px; \">{{ac.apiVersions.lodash}}</td>\n                </tr>\n                <tr>\n                    <td style=\"width: 170px; text-align: right; \">Moment:</td>\n                    <td style=\"width: 20px; \">&nbsp;</td>\n                    <td style=\"width: 20px; \">{{ac.apiVersions.moment}}</td>\n                </tr>\n                <tr>\n                    <td style=\"width: 170px; text-align: right; \">ngxToastr:</td>\n                    <td style=\"width: 20px; \">&nbsp;</td>\n                    <td style=\"width: 20px; \">{{ac.apiVersions.ngxtoastr}}</td>\n                </tr>\n                <tr>\n                    <td style=\"width: 170px; text-align: right; \">FileSaver:</td>\n                    <td style=\"width: 20px; \">&nbsp;</td>\n                    <td style=\"width: 20px; \">{{ac.apiVersions.fileSaver}}</td>\n                </tr>\n                <tr>\n                    <td style=\"width: 170px; text-align: right; \">CoreJs:</td>\n                    <td style=\"width: 20px; \">&nbsp;</td>\n                    <td style=\"width: 20px; \">{{ac.apiVersions.coreJs}}</td>\n                </tr>\n                <tr>\n                    <td style=\"width: 170px; text-align: right; \">ZoneJs:</td>\n                    <td style=\"width: 20px; \">&nbsp;</td>\n                    <td style=\"width: 20px; \">{{ac.apiVersions.zoneJs}}</td>\n                </tr>\n                <tr>\n                    <td style=\"width: 170px; text-align: right; \">GoogleMaps:</td>\n                    <td style=\"width: 20px; \">&nbsp;</td>\n                    <td style=\"width: 20px; \">{{ac.apiVersions.googleMaps}}</td>\n                </tr>\n            </table>\n        </div>\n\n        <div class=\"feature-text col-5 offset-1\">\n            <h3 class=\"feature-subtitle\" style=\"font-family: px-neuropol; \">Settings for AngularDotNet</h3>\n            <div style=\"margin-left: 170px; \">\n                <div>Debug={{ac.appSettings.debug}}</div>\n                <div>Testing={{ac.appSettings.testing}}</div>\n                <div>Splash Time={{ac.appSettings.splashTime}}ms</div>\n                <div>Online Status={{ac.isOnline}}</div>\n                <div>Standalone={{ac.isStandAlone}}</div>\n            </div>\n        </div>\n\n    </div>\n\n</view-fader>\n\n" /* this was squashed */,
            styles: ["\n.feature-title {\n    color: #007aff;\n    background-color: #dfdfdf;\n    padding: 10px;\n    width: 500px;\n    height: 60px;\n    text-align: center;\n    border-radius: 25px;\n}\n\n.feature-subtitle {\n    margin-left: 40px;\n    color: #007aff;\n    background-color:ghostwhite;\n    padding: 10px;\n    width: 425px;\n    text-align: center;\n    border-radius: 25px;\n}\n\n.feature-text {\n    color: #007aff;\n    background-color: #dfdfdf;\n    padding: 10px;\n    max-width: 525px;\n    height: 300px;\n    text-align: justify;\n    border-radius: 25px;\n    font-size: 20px;\n}\n\n"]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_common_appConfig__WEBPACK_IMPORTED_MODULE_2__["AppConfig"]])
    ], Settings);
    return Settings;
}());



/***/ }),

/***/ "./features/splash.ts":
/*!****************************!*\
  !*** ./features/splash.ts ***!
  \****************************/
/*! exports provided: Splash */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Splash", function() { return Splash; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _common_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/appConfig */ "./common/appConfig.ts");


// services

var Splash = /** @class */ (function () {
    function Splash(ac) {
        this.ac = ac;
        this.isViewVisible = false;
        this.image0Visible = false;
        this.image1Visible = false;
        this.image2Visible = false;
        this.image3Visible = false;
        this.image4Visible = false;
        this.image5Visible = false;
        this.image6Visible = false;
        this.image7Visible = false;
        this.sequence = 0;
    }
    Splash.prototype.ngOnInit = function () {
        var _this = this;
        this.ac.waitUntilInitialized(function () {
            _this.isViewVisible = true;
            _this.switchImages();
        });
    };
    Splash.prototype.switchImages = function () {
        var _this = this;
        setInterval(function () {
            if (_this.sequence === 8)
                _this.sequence = 0;
            _this.image0Visible = false;
            _this.image1Visible = false;
            _this.image2Visible = false;
            _this.image3Visible = false;
            _this.image4Visible = false;
            _this.image5Visible = false;
            _this.image6Visible = false;
            _this.image7Visible = false;
            switch (_this.sequence) {
                case 0:
                    _this.image0Visible = true;
                    break;
                case 1:
                    _this.image1Visible = true;
                    break;
                case 2:
                    _this.image2Visible = true;
                    break;
                case 3:
                    _this.image3Visible = true;
                    break;
                case 4:
                    _this.image4Visible = true;
                    break;
                case 5:
                    _this.image5Visible = true;
                    break;
                case 6:
                    _this.image6Visible = true;
                    break;
                case 7:
                    _this.image7Visible = true;
                    break;
            }
            _this.sequence++;
        }, 2000);
    };
    Splash = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            // #region template
            template: "\n\n<view-fader [isViewVisible]=\"isViewVisible\">\n  <h2 class=\"feature-title\" style=\"font-family: px-neuropol; \">Technology Stack</h2>\n</view-fader>\n\n<expand-visible [isVisible]=\"image0Visible\" class=\"expand-visible\">\n  <img alt=\"\" src=\"data:image/png;base64,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\" class=\"feature-image\" />\n</expand-visible>\n\n<expand-visible [isVisible]=\"image1Visible\" class=\"expand-visible\">\n  <img alt=\"\" src=\"data:image/png;base64,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\" class=\"feature-image\" />\n</expand-visible>\n\n<expand-visible [isVisible]=\"image2Visible\" class=\"expand-visible\">\n  <img alt=\"\" src=\"data:image/png;base64,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\" class=\"feature-image\" />\n</expand-visible>\n\n<expand-visible [isVisible]=\"image3Visible\" class=\"expand-visible\">\n  <img alt=\"\" src=\"data:image/png;base64,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\" class=\"feature-image\" />\n</expand-visible>\n\n<expand-visible [isVisible]=\"image4Visible\" class=\"expand-visible\">\n  <img alt=\"\" src=\"data:image/png;base64,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\" class=\"feature-image\" />\n</expand-visible>\n\n<expand-visible [isVisible]=\"image5Visible\" class=\"expand-visible\">\n  <img alt=\"\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAMAAABOo35HAAAAO3RFWHRDb3B5cmlnaHQAwqkgdGgxMzQxIC0gaHR0cDovL3d3dy5yZWRidWJibGUuY29tL3Blb3BsZS90aDEzNGhB9R0AAAs/dEVYdFhNTDpjb20uYWRvYmUueG1wADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuMS4yIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj4KICAgICAgICAgPGRjOnJpZ2h0cz4KICAgICAgICAgICAgPHJkZjpBbHQ+CiAgICAgICAgICAgICAgIDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+wqkgdGgxMzQxIC0gaHR0cDovL3d3dy5yZWRidWJibGUuY29tL3Blb3BsZS90aDEzNDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpBbHQ+CiAgICAgICAgIDwvZGM6cmlnaHRzPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43Mi8xPC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj43Mi8xPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpSZXNvbHV0aW9uVW5pdD4yPC90aWZmOlJlc29sdXRpb25Vbml0PgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+5FsTHAAAAAd0SU1FB+ECGg4mJKHrzOMAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAEZ0FNQQAAsY8L/GEFAAAC91BMVEX+/v7x+eTj8dTu+Oj6/PTV6cS00pKcyGKKvTOMvTuGvjOZxFOqynvK3bLz+uzj7diGwSyJvSuQxTWOxT2QxUGNyDyJwi2IwRyZvlbL3rj2+vLs9OLB1pyMvEOHyCaOyECQxT6kynTc69HG27OUwlGFwRuOxEKRyD2GxTGz0Yrp8tzc6sugxmOGwBTI2aXy9uuwzYOLxDOJvRyWwVzO4rn3/PjB2puRvESSyjWNyDXg68zS47uJvSO0z5Oly4GNyC/J3a3l8duJwSOFvCKYvlvE26mQvTqOwkmQxizU5MC81Zvw9eTj8MypyXSTykPK4K2605Sixmna6cT49/CFwSPj7dTZ5cObw2Pt+OWrzIKHxTyWvljR5LWkxnPa5svX6MijyWySvUvD2qSaw1uTwkuox3nf6tiGvCq41Y6205rD1qqnyoidxWru+t+ly3mFvRSy0ITZ6L/A2ZaxzonM4bOLu0qKvhShymTo79euzoiv0YuGwQDt9Oi92ZuDvB36+u7f59KbylrR37KJwBO72pTw+N6lxXqEwAieyGzA1KO91qGCugmw0n+ZxUuZy0p2mUJ3oECWykmby1KWyVN8nEtIVjU6NTQ7NTpMXDZ9oUuZzEV7nENUZTWOtVNTZDk1OTJERTxISDxAQzVZbTqMs0yHqFRBPUE1NDRUaDaOuFJmgkE6OjRIRj1FSDyTvFJhfD1GRkE2NziQtUtykkJB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\" class=\"feature-image\" />\n</expand-visible>\n\n<expand-visible [isVisible]=\"image6Visible\" class=\"expand-visible\">\n  <img alt=\"\" src=\"data:image/png;base64,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\" class=\"feature-image\" />\n</expand-visible>\n\n<expand-visible [isVisible]=\"image7Visible\" class=\"expand-visible\">\n  <img alt=\"\" src=\"data:image/png;base64,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\" class=\"feature-image\" />\n</expand-visible>\n" /* this was squashed */,
            styles: ["\n.feature-title {\n    color: #007aff;\n    background-color: #dfdfdf;\n    padding: 10px;\n    width: 400px;\n    height: 60px;\n    text-align: center;\n    border-radius: 25px;\n}\n\n.feature-image {\n    margin-top: 100px;\n    width: 100%;\n    height: 100%;\n}\n\n.expand-visible {\n    position: absolute;\n    top: 100px;\n    left: 100px;\n}"]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_common_appConfig__WEBPACK_IMPORTED_MODULE_2__["AppConfig"]])
    ], Splash);
    return Splash;
}());



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

/***/ "./shared/client-side-models/apiVersions.ts":
/*!**************************************************!*\
  !*** ./shared/client-side-models/apiVersions.ts ***!
  \**************************************************/
/*! exports provided: ApiVersions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiVersions", function() { return ApiVersions; });
var ApiVersions = /** @class */ (function () {
    function ApiVersions() {
        this.application = "5.0.37";
        this.typeScript = "3.2.2";
        this.webpackCLI = "";
        this.nodeJs = "8.12.0";
        this.v8Engine = "6.2.414.66";
        this.angular = "";
        this.rxJs = "6.4.0";
        this.bootstrap = "4.1.3";
        this.lodash = "4.17.11";
        this.moment = "2.22.2";
        this.ngxtoastr = "9.1.2";
        this.fileSaver = "2.0.0";
        this.coreJs = "2.6.4";
        this.zoneJs = "0.8.29";
        this.googleMaps = "3.2.0";
    }
    return ApiVersions;
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

/***/ "./shared/client-side-models/channelInfo.ts":
/*!**************************************************!*\
  !*** ./shared/client-side-models/channelInfo.ts ***!
  \**************************************************/
/*! exports provided: ChannelRegistration, ChannelMessage, ChannelSync, GetAllChannels */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChannelRegistration", function() { return ChannelRegistration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChannelMessage", function() { return ChannelMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChannelSync", function() { return ChannelSync; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GetAllChannels", function() { return GetAllChannels; });
var ChannelRegistration = /** @class */ (function () {
    function ChannelRegistration() {
        this.id = 0;
        this.name = "";
        this.subscriptions = Array();
    }
    return ChannelRegistration;
}());

var ChannelMessage = /** @class */ (function () {
    function ChannelMessage() {
        this.message = new Object();
        this.syncAction = "";
        this.type = "ChannelMessage";
        this.sendersName = "";
    }
    return ChannelMessage;
}());

var ChannelSync = /** @class */ (function () {
    function ChannelSync() {
        this.cancel = false;
        this.type = "ChannelSync";
    }
    return ChannelSync;
}());

var GetAllChannels = /** @class */ (function () {
    function GetAllChannels() {
        this.channels = Array();
        this.type = "GetAllChannels";
    }
    return GetAllChannels;
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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _expandVisible__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./expandVisible */ "./shared/ng2-animation/expandVisible.ts");
/* harmony import */ var _viewFader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./viewFader */ "./shared/ng2-animation/viewFader.ts");
/* harmony import */ var _viewBlinker__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./viewBlinker */ "./shared/ng2-animation/viewBlinker.ts");
/* harmony import */ var _modalDialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modalDialog */ "./shared/ng2-animation/modalDialog.ts");








var AppAnimation = /** @class */ (function () {
    function AppAnimation() {
    }
    AppAnimation = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]],
            declarations: [_viewFader__WEBPACK_IMPORTED_MODULE_5__["ViewFader"], _viewBlinker__WEBPACK_IMPORTED_MODULE_6__["ViewBlinker"], _expandVisible__WEBPACK_IMPORTED_MODULE_4__["ExpandVisible"], _modalDialog__WEBPACK_IMPORTED_MODULE_7__["ModalDialog"]],
            exports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _viewFader__WEBPACK_IMPORTED_MODULE_5__["ViewFader"],
                _viewBlinker__WEBPACK_IMPORTED_MODULE_6__["ViewBlinker"],
                _expandVisible__WEBPACK_IMPORTED_MODULE_4__["ExpandVisible"],
                _modalDialog__WEBPACK_IMPORTED_MODULE_7__["ModalDialog"]
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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm5/animations.js");



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
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ExpandVisible.prototype, "isVisible", void 0);
    ExpandVisible = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "expand-visible",
            template: "\n    <div [@visibilityChanged]=\"visibility\" [style.visibility]=\"initalized ? 'visible' : 'hidden' \">\n      <ng-content></ng-content>    \n    </div>\n  ",
            animations: [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["trigger"])("visibilityChanged", [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["state"])("shown", Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ opacity: 1, height: "100%", width: "100%" })),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["state"])("hidden", Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ opacity: 0, height: "0", width: "0" })),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])("* => *", Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])(".5s"))
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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm5/animations.js");



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
        this.visibleChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
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
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ModalDialog.prototype, "isClosable", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], ModalDialog.prototype, "isVisible", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ModalDialog.prototype, "showOkButton", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ModalDialog.prototype, "showCancelButton", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ModalDialog.prototype, "showYesButton", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ModalDialog.prototype, "showNoButton", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ModalDialog.prototype, "okDisabled", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ModalDialog.prototype, "cancelDisabled", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ModalDialog.prototype, "yesDisabled", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ModalDialog.prototype, "noDisabled", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], ModalDialog.prototype, "modalDialogTitle", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ModalDialog.prototype, "desiredHeight", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ModalDialog.prototype, "desiredWidth", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ModalDialog.prototype, "dialogHeight", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ModalDialog.prototype, "dialogWidth", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], ModalDialog.prototype, "denyClosing", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ModalDialog.prototype, "visibleChange", void 0);
    ModalDialog = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "modal-dialog",
            //#region template:
            template: "\n    <div [@modalDialogTrigger] *ngIf=\"isVisible\" class=\"modalDialog\" [style.height.px]=\"dialogHeight\" [style.width.px]=\"dialogWidth\">\n        <div class=\"dialogTitle\">\n            <p>{{modalDialogTitle}}</p>\n        </div>\n        <ng-content></ng-content>\n        <button *ngIf=\"isClosable\" (click)=\"closeDialog()\" aria-label=\"Close\" class=\"dialog__close-btn\">X</button>\n        <div class=\"dialogFooter\" >\n            <hr style=\"margin-left: 20px; margin-bottom: 10px; \" />\n            <button *ngIf=\"showCancelButton\" [disabled]=\"cancelDisabled\" class=\"btn btn-primary\" style=\"float: right; margin-left: 5px; margin-bottom: 10px; width: 75px;\" (click)=\"onbuttonClicked('cancel')\">Cancel</button>\n            <button *ngIf=\"showOkButton\" [disabled]=\"okDisabled\" class=\"btn btn-primary\" style=\"float: right; margin-left: 5px; margin-bottom: 10px; width: 75px;\" (click)=\"onbuttonClicked('ok')\">OK</button>\n            <button *ngIf=\"showNoButton\" [disabled]=\"noDisabled\" class=\"btn btn-primary\" style=\"float: right; margin-left: 5px; margin-bottom: 10px; width: 75px;\" (click)=\"onbuttonClicked('no')\">No</button>\n            <button *ngIf=\"showYesButton\" [disabled]=\"yesDisabled\" class=\"btn btn-primary\" style=\"float: right; margin-left: 5px; margin-bottom: 10px; width: 75px;\" (click)=\"onbuttonClicked('yes')\">Yes</button>\n        </div>\n    </div>\n    <div *ngIf=\"isVisible\" class=\"overlay\" (click)=\"clickedOutsideOfDialog()\"></div>\n    ",
            // #endregion
            animations: [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["trigger"])("modalDialogTrigger", [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])("void => *", [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ transform: "scale3d(.3, .3, .3)" }),
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])(100)
                    ]),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])("* => void", [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])(100, Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ transform: "scale3d(.0, .0, .0)" }))
                    ])
                ])
            ],
            styles: ["\n    .overlay {\n      position: fixed;\n      top: 0;\n      bottom: 0;\n      left: 0;\n      right: 0;\n      background-color: rgba(0, 0, 0, 0.5);\n      z-index: 999;\n    }\n    .modalDialog {\n      z-index: 1000;\n      position: fixed;\n      right: 0;\n      left: 0;\n      top: 20px;\n      margin-top: 100px;\n      margin-right: auto;\n      margin-left: auto;\n      background-color: #fff;\n      padding: 12px;\n      box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2), 0 13px 19px 2px rgba(0, 0, 0, 0.14), 0 5px 24px 4px rgba(0, 0, 0, 0.12);\n     -ms-border-radius: 5px !important;\n     border-radius: 5px !important;\n    }\n    @media (min-width: 768px) {\n      .modalDialog {\n        top: 40px;\n      }\n    }\n    .dialog__close-btn {\n      border: 0;\n      background: none;\n      color: #2d2d2d;\n      position: absolute;\n      top: 8px;\n      right: 8px;\n      font-size: 1.2em;\n      cursor: pointer;\n    }\n    .dialogTitle {\n      overflow:auto;\n        width: 90%;\n      max-width: 520px;\n        font-size: 16px;\n    }\n    .dialogFooter {\n      overflow:hidden;\n        width: 95%;\n        position: absolute;\n        bottom: 0;\n    }\n    "]
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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm5/animations.js");



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
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ViewBlinker.prototype, "blinking", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ViewBlinker.prototype, "visibleWhenNotBlinking", void 0);
    ViewBlinker = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "view-blinker",
            template: "\n    <div [@visibilityChanged]=\"visibility\" [style.visibility]=\"initalized ? 'visible' : 'hidden' \">\n      <ng-content></ng-content>    \n    </div>\n  ",
            animations: [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["trigger"])("visibilityChanged", [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["state"])("shown", Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ opacity: 1 })),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["state"])("hidden", Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ opacity: 0 })),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])("* => *", Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])(".25s"))
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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm5/animations.js");



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
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ViewFader.prototype, "isViewVisible", void 0);
    ViewFader = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "view-fader",
            template: "\n    <div [@visibilityChanged]=\"visibility\" [style.visibility]=\"initalized ? 'visible' : 'hidden' \">\n      <ng-content></ng-content>    \n    </div>\n  ",
            animations: [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["trigger"])("visibilityChanged", [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["state"])("shown", Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ opacity: 1 })),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["state"])("hidden", Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ opacity: 0 })),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])("* => *", Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])(".5s"))
                ])
            ]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _appServices__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./appServices */ "./shared/ng2-apphelper/appServices.ts");



var AppHelper = /** @class */ (function () {
    function AppHelper() {
    }
    AppHelper_1 = AppHelper;
    AppHelper.forRoot = function () {
        return {
            ngModule: AppHelper_1,
            providers: [_appServices__WEBPACK_IMPORTED_MODULE_2__["AppServices"]]
        };
    };
    var AppHelper_1;
    AppHelper = AppHelper_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var thisWindow = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](thisWindow, _super);
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
    AppServices = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], AppServices);
    return AppServices;
}());



/***/ }),

/***/ "./shared/ng2-mobiletech/appMobileTech.ts":
/*!************************************************!*\
  !*** ./shared/ng2-mobiletech/appMobileTech.ts ***!
  \************************************************/
/*! exports provided: AppMobileTech */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppMobileTech", function() { return AppMobileTech; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _speechToText__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./speechToText */ "./shared/ng2-mobiletech/speechToText.ts");
/* harmony import */ var _textToSpeech__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./textToSpeech */ "./shared/ng2-mobiletech/textToSpeech.ts");
/* harmony import */ var _googleMaps__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./googleMaps */ "./shared/ng2-mobiletech/googleMaps.ts");







var AppMobileTech = /** @class */ (function () {
    function AppMobileTech() {
    }
    AppMobileTech = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]],
            declarations: [_speechToText__WEBPACK_IMPORTED_MODULE_4__["SpeechToText"], _textToSpeech__WEBPACK_IMPORTED_MODULE_5__["TextToSpeech"], _googleMaps__WEBPACK_IMPORTED_MODULE_6__["GoogleMaps"]],
            exports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _speechToText__WEBPACK_IMPORTED_MODULE_4__["SpeechToText"],
                _textToSpeech__WEBPACK_IMPORTED_MODULE_5__["TextToSpeech"],
                _googleMaps__WEBPACK_IMPORTED_MODULE_6__["GoogleMaps"]
            ],
            providers: []
        })
    ], AppMobileTech);
    return AppMobileTech;
}());



/***/ }),

/***/ "./shared/ng2-mobiletech/googleMaps.ts":
/*!*********************************************!*\
  !*** ./shared/ng2-mobiletech/googleMaps.ts ***!
  \*********************************************/
/*! exports provided: GoogleMaps */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GoogleMaps", function() { return GoogleMaps; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var GoogleMaps = /** @class */ (function () {
    function GoogleMaps(cd, ngZone) {
        this.cd = cd;
        this.ngZone = ngZone;
        this.width = "";
        this.height = "";
        this.widthPercent = "";
        this.heightPercent = "";
        this.visibleChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.maplat = 0;
        this.maplng = 0;
    }
    GoogleMaps_1 = GoogleMaps;
    GoogleMaps.prototype.initialize = function () {
        var _this = this;
        this.url = "https://maps.googleapis.com/maps/api/js?key=" + this.googleMapKey + "&callback=__onGoogleLoaded";
        GoogleMaps_1.promise = new Promise(function () {
            window["__onGoogleLoaded"] = function () {
                _this.loadGoogleMaps();
            };
            var node = document.createElement("script");
            node.src = _this.url;
            node.type = "text/javascript";
            document.getElementsByTagName("head")[0].appendChild(node);
        });
        return GoogleMaps_1.promise;
    };
    GoogleMaps.prototype.loadGoogleMaps = function () {
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
        this.map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
        this.marker = new google.maps.Marker({ position: new google.maps.LatLng(this.maplat, this.maplng), draggable: true });
        this.marker.setMap(this.map);
        google.maps.event.addListener(this.map, "click", function (event) {
            _this.marker.setPosition(event.latLng);
            _this.latitude = event.latLng.lat();
            _this.longitude = event.latLng.lng();
        });
        var contentInfoWindow = "\n        <div>\n        <div>Set the Latitude and Longitude</div>\n        <div>to this marker location?</div>\n        <button style=\"margin-top:.5em;\" class=\"btn btn-primary btn-xs buttonUpdateCoordsFromMarkerLocation\">Update</button>\n        </div>";
        google.maps.event.addListener(this.marker, "click", function () {
            var div = document.createElement("div");
            div.innerHTML = contentInfoWindow;
            var buttonUpdateCoordsFromMarkerLocation = div.getElementsByClassName("buttonUpdateCoordsFromMarkerLocation");
            if (buttonUpdateCoordsFromMarkerLocation.length) {
                (buttonUpdateCoordsFromMarkerLocation[0]).onclick = function () {
                    _this.onClickUpdateCoordsFromMarkerLocation();
                };
            }
            var infowindow = new google.maps.InfoWindow({
                content: div
            });
            infowindow.open(_this.map, _this.marker);
        });
        google.maps.event.addListener(this.marker, "dragend", function (event) {
            _this.latitude = event.latLng.lat();
            _this.longitude = event.latLng.lng();
        });
    };
    GoogleMaps.prototype.recenterMapAndMarker = function () {
        if (!isNaN(this.latitude) && !isNaN(this.longitude)) {
            this.maplat = this.latitude;
            this.maplng = this.longitude;
            var latLgn = new google.maps.LatLng(this.maplat, this.maplng);
            this.map.setCenter(latLgn);
            this.marker.setPosition(latLgn);
        }
    };
    GoogleMaps.prototype.markerDragEnd = function (m, $event) {
        this.latitude = $event.latLng.lat();
        this.longitude = $event.latLng.lng();
    };
    GoogleMaps.prototype.onClickUpdateCoordsFromMarkerLocation = function () {
        var _this = this;
        this.ngZone.run(function () {
            _this.updateOwner();
        });
    };
    GoogleMaps.prototype.updateOwner = function () {
        if (this.owner && this.updateCoordinatesCallback) {
            this.owner[this.updateCoordinatesCallback](Math.round(this.latitude * 100000) / 100000, Math.round(this.longitude * 100000) / 100000);
        }
    };
    GoogleMaps.prototype.onBlurLatLng = function () {
        this.recenterMapAndMarker();
    };
    GoogleMaps.prototype.findMe = function () {
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
    GoogleMaps.prototype.useAddress = function (address, zipcode) {
        var _this = this;
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ "address": address + " " + zipcode }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                _this.latitude = results[0].geometry.location.lat();
                _this.longitude = results[0].geometry.location.lng();
                _this.recenterMapAndMarker();
                _this.updateOwner();
            }
            else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
    };
    GoogleMaps.prototype.lookupAddress = function () {
        var _this = this;
        var geocoder = new google.maps.Geocoder();
        var latlng = { lat: this.latitude, lng: this.longitude };
        geocoder.geocode({ "location": latlng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                results[0].formatted_address;
                var address = results[0].address_components[0].short_name + " " + results[0].address_components[1].short_name;
                _this.owner[_this.updateAddressCallback](address, results[0].address_components[7].short_name);
            }
            else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
    };
    var GoogleMaps_1;
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], GoogleMaps.prototype, "isVisible", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], GoogleMaps.prototype, "owner", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], GoogleMaps.prototype, "updateCoordinatesCallback", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], GoogleMaps.prototype, "updateAddressCallback", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], GoogleMaps.prototype, "width", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], GoogleMaps.prototype, "height", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], GoogleMaps.prototype, "widthPercent", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], GoogleMaps.prototype, "heightPercent", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], GoogleMaps.prototype, "latitude", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], GoogleMaps.prototype, "longitude", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], GoogleMaps.prototype, "visibleChange", void 0);
    GoogleMaps = GoogleMaps_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "google-maps",
            //#region template:
            template: "<div id=\"googleMap\" [style.height.px]=\"height\" [style.height.%]=\"heightPercent\" [style.width.px]=\"width\" [style.width.%]=\"widthPercent\" ></div>"
            // #endregion
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]])
    ], GoogleMaps);
    return GoogleMaps;
}());



/***/ }),

/***/ "./shared/ng2-mobiletech/speechToText.ts":
/*!***********************************************!*\
  !*** ./shared/ng2-mobiletech/speechToText.ts ***!
  \***********************************************/
/*! exports provided: thisWindow, SpeechToText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "thisWindow", function() { return thisWindow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpeechToText", function() { return SpeechToText; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm5/animations.js");



var thisWindow = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](thisWindow, _super);
    function thisWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return thisWindow;
}(Window));

var SpeechToText = /** @class */ (function () {
    function SpeechToText(cd) {
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
    SpeechToText.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.initalized = true;
            _this.setupSpeechToText();
        }, 500);
    };
    SpeechToText.prototype.debugText = function (message) {
        setTimeout(function () {
            try {
                var dt = document.getElementById("debugText");
                dt.innerHTML = message;
            }
            catch (e) { }
        });
    };
    SpeechToText.prototype.setupSpeechToText = function () {
        var _this = this;
        try {
            this.s2t = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
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
    SpeechToText.prototype.ngOnChanges = function () {
        if (!this.initalized)
            return;
        if (!this.s2tOn) {
            this.startButtonLabel = "Start";
            this.onClickStart();
        }
    };
    SpeechToText.prototype.closeDialog = function () {
        if (this.s2tOn || this.s2tPaused)
            this.onClickStop();
        this.isVisible = false;
        this.visibleChange.emit(this.isVisible);
    };
    SpeechToText.prototype.onClickStart = function () {
        this.debugText("");
        this.startS2T();
        this.s2tOn = true;
    };
    SpeechToText.prototype.onClickStop = function () {
        this.s2t.stop();
        this.s2tOn = false;
        this.s2tPaused = false;
        this.startButtonLabel = "Restart";
    };
    SpeechToText.prototype.onClickPause = function () {
        this.s2t.stop();
        this.s2tOn = false;
        this.s2tPaused = true;
        this.startButtonLabel = "Resume";
    };
    SpeechToText.prototype.endS2T = function () {
        if (this.s2tOn) {
            this.s2tPaused = true;
            try {
                this.s2t.start();
            }
            catch (e) { }
        }
    };
    SpeechToText.prototype.startS2T = function () {
        if (!this.s2tOn) {
            if (!this.s2tPaused) {
                this.owner[this.onRestartCallback]();
                this.newSentence = true;
            }
            this.s2t.start();
        }
    };
    SpeechToText.prototype.errorS2T = function (message) {
        var _this = this;
        this.onClickPause();
        this.debugText("System Error: " + message);
        this.cd.detectChanges();
        if (!this.autoRetry)
            return;
        this.debugText("Auto Retry");
        setTimeout(function () {
            _this.onClickStart();
        }, 1000);
    };
    SpeechToText.prototype.noMatchS2T = function () {
        this.debugText("System Error: Cannot recognize speech!");
    };
    SpeechToText.prototype.onResultsS2T = function (event) {
        var justSpoken = event.results[event.results.length - 1][0].transcript;
        justSpoken = this.speechRules(justSpoken);
        this.owner[this.onResultsCallback](justSpoken);
    };
    SpeechToText.prototype.speechRules = function (inputString) {
        inputString = inputString.charAt(0).toUpperCase() + inputString.slice(1);
        return inputString;
    };
    SpeechToText.prototype.ngOnDestroy = function () {
        if (this.s2tOn)
            this.onClickStop();
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], SpeechToText.prototype, "isClosable", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], SpeechToText.prototype, "isVisible", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], SpeechToText.prototype, "owner", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], SpeechToText.prototype, "onResultsCallback", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], SpeechToText.prototype, "onRestartCallback", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], SpeechToText.prototype, "positionTop", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], SpeechToText.prototype, "autoRetry", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], SpeechToText.prototype, "visibleChange", void 0);
    SpeechToText = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "speech-to-text",
            //#region template:
            template: "\n    <div [@modalDialogTrigger] *ngIf=\"isVisible\" class=\"modalDialog\" style=\"width: 350px; height: 73px; \" [style.top.px]=\"positionTop\"  >\n        <ng-content></ng-content>\n        <button *ngIf=\"isClosable\" (click)=\"closeDialog()\" aria-label=\"Close\" class=\"dialog__close-btn\">X</button>\n        <div style=\"text-align: center; \">\n            <i class=\"fa fa-microphone fa-2x\" style=\"color: cornflowerblue; float:left; margin-left: 20px;\"></i>\n            <div class=\"btn-group\" style=\"margin-right: 20px;\">\n                <button class=\"btn btn-primary btn-sm\" [disabled]=\"!s2tOn\" style=\"width: 75px;\" (click)=\"onClickStop()\">Stop</button>\n                <button class=\"btn btn-primary btn-sm\" [disabled]=\"!s2tOn\" style=\"width: 75px;\" (click)=\"onClickPause()\">Pause</button>\n                <button class=\"btn btn-primary btn-sm\" [disabled]=\"s2tOn\" style=\"width: 75px;\" (click)=\"onClickStart()\">{{ startButtonLabel }}</button>\n           </div>\n           <br />\n           <div id=\"debugText\" style=\"color: red; font-weight: bold; overflow: hidden; \"></div> \n         </div>\n    </div>\n    <div *ngIf=\"isVisible\" class=\"overlay\" (click)=\"closeDialog()\"></div>\n    ",
            // #endregion
            animations: [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["trigger"])("modalDialogTrigger", [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])("void => *", [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ transform: "scale3d(.3, .3, .3)" }),
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])(100)
                    ]),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])("* => void", [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])(100, Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ transform: "scale3d(.0, .0, .0)" }))
                    ])
                ])
            ],
            styles: ["\n    .overlay {\n      position: fixed;\n      top: 0;\n      bottom: 0;\n      left: 0;\n      right: 0;\n      background-color: rgba(0, 0, 0, 0.25);\n      z-index: 999;\n    }\n    .modalDialog {\n      z-index: 1000;\n      position: fixed;\n      right: 0;\n      left: 0;\n      top: 20px;\n      margin-top: 100px;\n      margin-right: auto;\n      margin-left: auto;\n      height: 200px;\n      width: 90%;\n      max-width: 520px;\n      background-color: #fff;\n      padding: 12px;\n      box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2), 0 13px 19px 2px rgba(0, 0, 0, 0.14), 0 5px 24px 4px rgba(0, 0, 0, 0.12);\n     -ms-border-radius: 5px !important;\n     border-radius: 25px !important;\n    }\n    @media (min-width: 768px) {\n      .modalDialog {\n        top: 40px;\n      }\n    }\n    .dialog__close-btn {\n      border: 0;\n      background: none;\n      color: #2d2d2d;\n      position: absolute;\n      top: 8px;\n      right: 8px;\n      font-size: 1.2em;\n      cursor: pointer;\n    }\n    "]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])
    ], SpeechToText);
    return SpeechToText;
}());



/***/ }),

/***/ "./shared/ng2-mobiletech/textToSpeech.ts":
/*!***********************************************!*\
  !*** ./shared/ng2-mobiletech/textToSpeech.ts ***!
  \***********************************************/
/*! exports provided: TextToSpeech */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextToSpeech", function() { return TextToSpeech; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm5/animations.js");



var TextToSpeech = /** @class */ (function () {
    function TextToSpeech(cd) {
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
    TextToSpeech.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.initalized = true;
            _this.setupT2S();
        }, 500);
    };
    TextToSpeech.prototype.setupT2S = function () {
        try {
            this.t2s = window.speechSynthesis;
            var textToSpeak = new SpeechSynthesisUtterance("testing... 1, 2, 3");
        }
        catch (e) {
            this.featureIsAvailable = false;
            return;
        }
    };
    TextToSpeech.prototype.ngOnChanges = function () {
        if (!this.initalized)
            return;
        if (!this.t2sOn) {
            this.startButtonLabel = "Start";
            this.onClickStart();
        }
    };
    TextToSpeech.prototype.closeDialog = function () {
        if (this.t2sOn || this.t2sPaused)
            this.onClickStop();
        this.isVisible = false;
        this.visibleChange.emit(this.isVisible);
    };
    TextToSpeech.prototype.Start = function () {
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
        this.owner[this.onChangeCallback]();
    };
    TextToSpeech.prototype.onClickStart = function () {
        this.Start();
    };
    TextToSpeech.prototype.onClickStop = function () {
        this.t2s.cancel();
        this.t2sOn = false;
        this.t2sPaused = false;
        this.startButtonLabel = "Restart";
        this.owner[this.onChangeCallback]();
    };
    TextToSpeech.prototype.onClickPause = function () {
        this.t2sOn = false;
        this.t2sPaused = true;
        this.t2s.pause();
        this.startButtonLabel = "Resume";
        this.owner[this.onChangeCallback]();
    };
    TextToSpeech.prototype.ngOnDestroy = function () {
        if (this.t2sOn)
            this.onClickStop();
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], TextToSpeech.prototype, "isClosable", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], TextToSpeech.prototype, "isUnattended", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], TextToSpeech.prototype, "isVisible", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], TextToSpeech.prototype, "textToSpeak", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], TextToSpeech.prototype, "owner", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], TextToSpeech.prototype, "onChangeCallback", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], TextToSpeech.prototype, "positionTop", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], TextToSpeech.prototype, "visibleChange", void 0);
    TextToSpeech = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "text-to-speech",
            //#region template:
            template: "\n    <div [@modalDialogTrigger] *ngIf=\"isVisible\" class=\"modalDialog\" style=\"width: 350px; height: 53px; \" [style.top.px]=\"positionTop\"  >\n        <ng-content></ng-content>\n\n        <button *ngIf=\"isClosable\" (click)=\"closeDialog()\" aria-label=\"Close\" class=\"dialog__close-btn\">X</button>\n        <div style=\"text-align: center; \">\n            <i class=\"fa fa-volume-up fa-2x\" style=\"color: cornflowerblue; float:left; margin-left: 20px;\"></i>\n            <div class=\"btn-group\" style=\"margin-right: 20px;\">\n                <button class=\"btn btn-primary btn-sm\" [disabled]=\"!t2sOn\" style=\"width: 75px;\" (click)=\"onClickStop()\">Stop</button>\n                <button class=\"btn btn-primary btn-sm\" [disabled]=\"!t2sOn\" style=\"width: 75px;\" (click)=\"onClickPause()\">Pause</button>\n                <button class=\"btn btn-primary btn-sm\" [disabled]=\"t2sOn\" style=\"width: 75px;\" (click)=\"onClickStart()\">{{ startButtonLabel }}</button>\n            </div>\n         </div>\n    </div>\n    <div *ngIf=\"isVisible\" class=\"overlay\" (click)=\"closeDialog()\"></div>\n    ",
            // #endregion
            animations: [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["trigger"])("modalDialogTrigger", [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])("void => *", [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ transform: "scale3d(.3, .3, .3)" }),
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])(100)
                    ]),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])("* => void", [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])(100, Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ transform: "scale3d(.0, .0, .0)" }))
                    ])
                ])
            ],
            styles: ["\n    .overlay {\n      position: fixed;\n      top: 0;\n      bottom: 0;\n      left: 0;\n      right: 0;\n      background-color: rgba(0, 0, 0, 0.25);\n      z-index: 999;\n    }\n    .modalDialog {\n      z-index: 1000;\n      position: fixed;\n      right: 0;\n      left: 0;\n      top: 20px;\n      margin-top: 100px;\n      margin-right: auto;\n      margin-left: auto;\n      height: 200px;\n      width: 90%;\n      max-width: 520px;\n      background-color: #fff;\n      padding: 12px;\n      box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2), 0 13px 19px 2px rgba(0, 0, 0, 0.14), 0 5px 24px 4px rgba(0, 0, 0, 0.12);\n     -ms-border-radius: 5px !important;\n     border-radius: 25px !important;\n    }\n    @media (min-width: 768px) {\n      .modalDialog {\n        top: 40px;\n      }\n    }\n    .dialog__close-btn {\n      border: 0;\n      background: none;\n      color: #2d2d2d;\n      position: absolute;\n      top: 8px;\n      right: 8px;\n      font-size: 1.2em;\n      cursor: pointer;\n    }\n    "]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])
    ], TextToSpeech);
    return TextToSpeech;
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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _common_appConfig__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../common/appConfig */ "./common/appConfig.ts");
/* harmony import */ var _common_messagePump__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../common/messagePump */ "./common/messagePump.ts");
/* harmony import */ var _shared_ng2_apphelper_appServices__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/ng2-apphelper/appServices */ "./shared/ng2-apphelper/appServices.ts");
/* harmony import */ var _shared_ng2_animation_modalDialog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/ng2-animation/modalDialog */ "./shared/ng2-animation/modalDialog.ts");







// services




var AppComponent = /** @class */ (function () {
    function AppComponent(route, router, ac, toastr, as) {
        this.route = route;
        this.router = router;
        this.ac = ac;
        this.toastr = toastr;
        this.as = as;
        this.appTitle = "Angular.Net Starter Application";
        this.titleBlinking = true;
        this.titleVisibleWhenNotBlinking = true;
        this.showModalDialog = false;
        this.appLoaded = false;
        this.subtitle = "";
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.events.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["filter"])(function (event) { return event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_2__["NavigationEnd"]; })).subscribe(function (event) {
            var currentRoute = _this.route.root;
            while (currentRoute.children[0] !== undefined) {
                currentRoute = currentRoute.children[0];
            }
            _this.subtitle = currentRoute.snapshot.data.subtitle;
        });
        this.date = new Date();
        this.theWeekOf = moment__WEBPACK_IMPORTED_MODULE_3__().startOf("week").format("ddd MMM D YYYY");
        this.appHref = window.location.href;
        this.ac.getAppSettings(function () {
            _this.checkForUpdates();
            _this.navigateForward();
        }, function (errorMessage) {
            if (navigator.onLine)
                _this.toastr.error(errorMessage);
            else
                _this.toastr.warning(_this.appTitle + ": is Offline!");
            _this.navigateForward();
        });
    };
    AppComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.ac.onResizeApp();
        this.ac.onOrientationChange();
        window.addEventListener("offline", function (event) {
            _this.toastr.info("The application just went offline!");
            _this.ac.isOnline = false;
        }, false);
        window.addEventListener("online", function (event) {
            _this.toastr.info("The application is back online!");
            _this.ac.isOnline = true;
        }, false);
        window.addEventListener("resize", function (event) {
            if (_this.resizeTimerId)
                return;
            _this.resizeTimerId = setTimeout(function () {
                _this.ac.onResizeApp();
                _this.resizeTimerId = null;
            }, 500);
        }, false);
        window.addEventListener("orientationchange", function (event) {
            setTimeout(function () {
                _this.ac.onOrientationChange();
            });
        }, false);
    };
    AppComponent.prototype.updateVersionAndRestart = function () {
        var _this = this;
        this.ac.setLocalStorage("versionNumber", { vn: this.ac.appSettings.projectVersionNo });
        this.toastr.info("Updating to latest version! Restarting the application...");
        setTimeout(function () {
            _this.restartApp();
        }, 3000);
    };
    AppComponent.prototype.checkForUpdates = function () {
        if (this.ac.appSettings.debug)
            return;
        var versionNumber = this.ac.getLocalStorage("versionNumber");
        if (!versionNumber)
            this.updateVersionAndRestart();
        if (versionNumber.vn !== this.ac.appSettings.projectVersionNo)
            this.updateVersionAndRestart();
        if (navigator.onLine) {
            this.ac.isOnline = true;
            this.toastr.success("This application is operating online as normal.", "Success!");
        }
        else {
            this.ac.isOnline = false;
            this.toastr.warning("This application is operating offline as normal.", "Warning!");
        }
    };
    AppComponent.prototype.getOnlineStatus = function () {
        return navigator.onLine;
    };
    AppComponent.prototype.navigateForward = function () {
        var _this = this;
        setTimeout(function () {
            if (window.screen.width <= 768) {
                _this.navigateTo("/mobileApis");
                return;
            }
            var navigateTo = _this.ac.getLocalStorage("navigateTo");
            if (navigateTo)
                _this.navigateTo(navigateTo.feature);
            else
                _this.navigateTo("/splash");
            _this.titleBlinking = false;
            _this.appLoaded = true;
        }, this.ac.appSettings.splashTime); // navigate away from splash view        
    };
    AppComponent.prototype.restartApp = function () {
        window.location.href = this.appHref;
    };
    AppComponent.prototype.currentRouteUrl = function () {
        if (this.selectedFeature === "/restart")
            return "/restart";
        return this.router.url;
    };
    AppComponent.prototype.navigateTo = function (feature) {
        var _this = this;
        this.selectedFeature = feature;
        if (feature === "/restart") {
            setTimeout(function () {
                _this.restartApp();
            }, 1000);
            return;
        }
        this.ac.setLocalStorage("navigateTo", { feature: feature });
        this.router.navigate([feature]);
    };
    AppComponent.prototype.onClickAbout = function () {
        var _this = this;
        this.md.modalDialogTitle = "About: " + this.appTitle;
        this.md.showOkButton = true;
        this.md.isClosable = true;
        this.md.desiredWidth = 430;
        this.md.desiredHeight = 300;
        this.showModalDialog = false;
        setTimeout(function () {
            _this.showModalDialog = true;
        });
        this.md.dialogButtonCallback = function (buttonClicked) {
            if (buttonClicked === "ok") {
                _this.md.closeDialog();
            }
        };
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_shared_ng2_animation_modalDialog__WEBPACK_IMPORTED_MODULE_9__["ModalDialog"]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _shared_ng2_animation_modalDialog__WEBPACK_IMPORTED_MODULE_9__["ModalDialog"])
    ], AppComponent.prototype, "md", void 0);
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-root",
            template: "\n<modal-dialog class=\"text-primary\" [isVisible]=\"showModalDialog\">\n    <div style=\"text-align: center; \">\n        <label>Project Version: {{ac.apiVersions.application}}</label>\n        <br />\n        <label>Angular Version: {{ac.apiVersions.angular}}</label>\n        <br />\n        <label>ASP.Net Core Version: {{ac.appSettings.aspNetCoreVersion}}</label>\n        <br />\n        <div>The date is: {{date.toLocaleDateString()}}</div>\n        <div>The time is: {{date.toLocaleTimeString()}}</div>\n        <div>This is the week of: {{theWeekOf}}</div>\n    </div>\n</modal-dialog>\n\n<view-fader *ngIf=\"ac.isSpinnerAvailable\" [isViewVisible]=\"ac.isSpinnerVisible\" style=\"position: fixed; top: 45%; left: 45%; z-index: 500; font-size: 75px; color:#3379b7\">\n    <i class=\"fa fa-spinner fa-spin\"></i>\n</view-fader>\n\n<div class=\"topMargin\">\n    <view-fader class=\"displayIfNotPhone\" [isViewVisible]=\"appLoaded\">\n        <div *ngIf=\"appLoaded\">\n            <button class=\"btn btn-primary\" style=\"float: right; margin-left: 10px; margin-top: 7px;\" (click)=\"onClickAbout();\">About</button>\n            <div *ngIf=\"this.ac.isOnline\"><i class=\"fa fa-podcast fa-2x\" style=\"float: right; margin-left: 10px; margin-top: 10px; color: green; \" title=\"Application is Online\"></i></div>\n            <div *ngIf=\"!this.ac.isOnline\"><i class=\"fa fa-podcast fa-2x\" style=\"float: right; margin-left: 10px; margin-top: 10px; color: #ff6a00; \" title=\"Application is Offline\"></i></div>\n            <div class=\"btn-group\" style=\"float: right; top: 7px; \">\n                <button class=\"btn btn-primary btn-sm feature-not-selected\" [ngClass]=\"{\'btn-outline-primary btn-sm feature-selected\': selectedFeature === \'/restart\'}\" (click)=\"navigateTo(\'/restart\')\">Restart</button>\n                <button class=\"btn btn-primary btn-sm feature-not-selected\" [ngClass]=\"{\'btn-outline-primary btn-sm feature-selected\': currentRouteUrl() === \'/notification\'}\" (click)=\"navigateTo(\'/notification\')\">Notification</button>\n                <button class=\"btn btn-primary btn-sm feature-not-selected\" [ngClass]=\"{\'btn-outline-primary btn-sm feature-selected\': currentRouteUrl() === \'/mobileApis\'}\" (click)=\"navigateTo(\'/mobileApis\')\">Mobile APIs</button>\n                <button class=\"btn btn-primary btn-sm feature-not-selected\" [ngClass]=\"{\'btn-outline-primary btn-sm feature-selected\': currentRouteUrl() === \'/splash\'}\" (click)=\"navigateTo(\'/splash\')\">Technology</button>\n                <button class=\"btn btn-primary btn-sm feature-not-selected\" [ngClass]=\"{\'btn-outline-primary btn-sm feature-selected\': currentRouteUrl() === \'/settings\'}\" (click)=\"navigateTo(\'/settings\')\">Settings</button>\n                <button class=\"btn btn-primary btn-sm feature-not-selected\" [ngClass]=\"{\'btn-outline-primary btn-sm feature-selected\': currentRouteUrl() === \'/features\'}\" (click)=\"navigateTo(\'/features\')\">Features</button>\n                <button class=\"btn btn-primary btn-sm feature-not-selected\" [ngClass]=\"{\'btn-outline-primary btn-sm feature-selected\': currentRouteUrl() === \'/analytics\'}\" (click)=\"navigateTo(\'/analytics\')\">Analytics</button>\n                <button class=\"btn btn-primary btn-sm feature-not-selected\" [ngClass]=\"{\'btn-outline-primary btn-sm feature-selected\': currentRouteUrl() === \'/alreadyReady\'}\" (click)=\"navigateTo(\'/alreadyReady\')\">Already Ready</button>\n            </div>\n        </div>\n    </view-fader>\n    <br /><br />\n    <view-blinker class=\"displayIfNotPhone\" [blinking]=\"titleBlinking\" [visibleWhenNotBlinking]=\"true\">\n        <div class=\"text-primary\" style=\"text-align: center; width: 100%; font-family: px-neuropol; font-size: 54px; \">{{appTitle}}</div>\n    </view-blinker>\n    <router-outlet></router-outlet>\n</div>\n" /* this was squashed */,
            // #endregion
            providers: [_common_appConfig__WEBPACK_IMPORTED_MODULE_6__["AppConfig"], _shared_ng2_apphelper_appServices__WEBPACK_IMPORTED_MODULE_8__["AppServices"], _common_messagePump__WEBPACK_IMPORTED_MODULE_7__["MessagePump"]],
            styles: ["\n.topMargin {\n  margin: 20px;\n}\n\n.displayIfNotPhone { /*is not phone*/\n  display: normal;\n}\n\n@media screen and (max-width: 667px) {\n  .topMargin {\n    margin: -20px;\n  }\n\n  .displayIfNotPhone {\n    display: none;\n  }\n}\n\n.feature-selected {\n  cursor: none;\n  background-color: white;\n}\n\n.feature-selected:hover {\n        cursor: default;\n        color: #007bff;\n        background-color: transparent;\n    }\n\n.feature-not-selected {\n  cursor: pointer;\n}\n"]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _common_appConfig__WEBPACK_IMPORTED_MODULE_6__["AppConfig"], ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"], _shared_ng2_apphelper_appServices__WEBPACK_IMPORTED_MODULE_8__["AppServices"]])
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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_ng2_animation_appAnimation__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/ng2-animation/appAnimation */ "./shared/ng2-animation/appAnimation.ts");
/* harmony import */ var _shared_ng2_mobiletech_appMobileTech__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/ng2-mobiletech/appMobileTech */ "./shared/ng2-mobiletech/appMobileTech.ts");
/* harmony import */ var _shared_ng2_apphelper_appHelper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../shared/ng2-apphelper/appHelper */ "./shared/ng2-apphelper/appHelper.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _features_alreadyReady__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../features/alreadyReady */ "./features/alreadyReady.ts");
/* harmony import */ var _features_analytics__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../features/analytics */ "./features/analytics.ts");
/* harmony import */ var _features_features__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../features/features */ "./features/features.ts");
/* harmony import */ var _features_mobileApis__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../features/mobileApis */ "./features/mobileApis.ts");
/* harmony import */ var _features_notification__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../features/notification */ "./features/notification.ts");
/* harmony import */ var _features_settings__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../features/settings */ "./features/settings.ts");
/* harmony import */ var _features_splash__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../features/splash */ "./features/splash.ts");











// features








var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_11__["AppComponent"], _features_alreadyReady__WEBPACK_IMPORTED_MODULE_12__["AlreadyReady"], _features_analytics__WEBPACK_IMPORTED_MODULE_13__["Analytics"], _features_features__WEBPACK_IMPORTED_MODULE_14__["Features"], _features_notification__WEBPACK_IMPORTED_MODULE_16__["Notification"], _features_mobileApis__WEBPACK_IMPORTED_MODULE_15__["MobileApis"], _features_settings__WEBPACK_IMPORTED_MODULE_17__["Settings"], _features_splash__WEBPACK_IMPORTED_MODULE_18__["Splash"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"].withServerTransition({ appId: 'ng-cli-universal' }),
                _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"],
                _shared_ng2_animation_appAnimation__WEBPACK_IMPORTED_MODULE_8__["AppAnimation"],
                _shared_ng2_mobiletech_appMobileTech__WEBPACK_IMPORTED_MODULE_9__["AppMobileTech"],
                _shared_ng2_apphelper_appHelper__WEBPACK_IMPORTED_MODULE_10__["AppHelper"].forRoot(),
                _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"].forRoot([
                    { path: "", component: _features_splash__WEBPACK_IMPORTED_MODULE_18__["Splash"], data: { subtitle: "Quick SPLASH" } },
                    { path: "splash", component: _features_splash__WEBPACK_IMPORTED_MODULE_18__["Splash"], data: { subtitle: "Quick SPLASH" } },
                    { path: "settings", component: _features_settings__WEBPACK_IMPORTED_MODULE_17__["Settings"], data: { subtitle: "VERSIONS & SETTINGS" } },
                    { path: "analytics", component: _features_analytics__WEBPACK_IMPORTED_MODULE_13__["Analytics"], data: { subtitle: "Application Analytics" } },
                    { path: "features", component: _features_features__WEBPACK_IMPORTED_MODULE_14__["Features"], data: { subtitle: "More About this Application" } },
                    { path: "notification", component: _features_notification__WEBPACK_IMPORTED_MODULE_16__["Notification"], data: { subtitle: "Immediate Notification" } },
                    { path: 'alreadyReady', component: _features_alreadyReady__WEBPACK_IMPORTED_MODULE_12__["AlreadyReady"], data: { subtitle: "Feature Quick Start" } },
                    { path: "mobileApis", component: _features_mobileApis__WEBPACK_IMPORTED_MODULE_15__["MobileApis"], data: { subtitle: "Modern Mobile Features" } },
                    { path: "**", redirectTo: "/splash", pathMatch: "full" }
                ]),
                ngx_toastr__WEBPACK_IMPORTED_MODULE_7__["ToastrModule"].forRoot({
                    timeOut: 5000,
                    positionClass: 'toast-bottom-right',
                    preventDuplicates: true,
                })
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_11__["AppComponent"]]
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

module.exports = __webpack_require__(/*! C:\ProMatrix.2\Angular.Net.CLI\AngularDotNet\wwwroot\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map