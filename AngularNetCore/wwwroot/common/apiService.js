"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/common/http");
var ngAction_1 = require("./ngAction");
var ApiService = /** @class */ (function () {
    function ApiService(http, store) {
        this.http = http;
        this.store = store;
        this.serverError = 'Server could be busy or offline!';
        this.downloadTimeout = 45000;
        this.uploadTimeout = 45000;
        this.ngAction = ngAction_1.NgAction.getInstance(store);
    }
    //#region httpRequest
    ApiService.prototype.httpRequest = function (obj, requestType, responseType$, url, success, error, params$, headers$, progressCallback) {
        var _this = this;
        var reportProgress$ = (progressCallback !== undefined && progressCallback !== null);
        var request;
        if (obj) {
            request = new http_1.HttpRequest(requestType, url, obj, { reportProgress: reportProgress$, headers: headers$, params: params$ });
        }
        else {
            request = new http_1.HttpRequest(requestType, url, {
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
                case http_1.HttpEventType.Sent:
                    break;
                case http_1.HttpEventType.ResponseHeader:
                    break;
                case http_1.HttpEventType.DownloadProgress:
                    if (requestType === 'Get') {
                        if (progressCallback(event)) {
                            clearTimeout(timerId);
                            httpSubscription.unsubscribe();
                        }
                    }
                    break;
                case http_1.HttpEventType.UploadProgress:
                    if (requestType === 'Post') {
                        if (progressCallback(event)) {
                            clearTimeout(timerId);
                            httpSubscription.unsubscribe();
                        }
                    }
                    break;
                case http_1.HttpEventType.Response:
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
exports.ApiService = ApiService;
//# sourceMappingURL=apiService.js.map