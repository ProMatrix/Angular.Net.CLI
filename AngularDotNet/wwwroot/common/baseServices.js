import { map, catchError } from "rxjs/operators";
import { AnalyticsData, Exception } from "../shared/client-side-models/analyticsData";
var BaseServices = /** @class */ (function () {
    function BaseServices(http) {
        this.http = http;
        if (!this.getLocalStorage("analyticsData")) {
            var analyticsData = new AnalyticsData();
            analyticsData.exceptions = new Array();
            analyticsData.performances = new Array();
            this.setLocalStorage("analyticsData", analyticsData);
        }
    }
    BaseServices.prototype.httpGet = function (controller, success, error) {
        var parameters = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            parameters[_i - 3] = arguments[_i];
        }
        var httpSubscription;
        httpSubscription = this.get(controller, parameters)
            .subscribe(function (obj) {
            httpSubscription.unsubscribe();
            success(obj);
        }, function (errorMessage) {
            httpSubscription.unsubscribe();
            error(errorMessage);
        });
    };
    BaseServices.prototype.get = function (controller, parameters) {
        var endPoint = "api/" + controller;
        parameters.forEach(function (parameter) {
            endPoint += "/" + parameter;
        });
        endPoint = location.origin + "/" + endPoint;
        return this.http.get(endPoint).pipe(map(function (response) { return response; }), catchError(this.handleError));
    };
    BaseServices.prototype.httpPost = function (controller, action, object, success, error) {
        var httpSubscription;
        httpSubscription = this.post(controller, action, object)
            .subscribe(function (obj) {
            httpSubscription.unsubscribe();
            success(obj);
        }, function (errorMessage) {
            httpSubscription.unsubscribe();
            error(errorMessage);
        });
    };
    BaseServices.prototype.post = function (controller, action, object) {
        var endPoint = "api/" + controller;
        endPoint = location.origin + "/" + endPoint;
        return this.http.post(endPoint + ("/" + action), object).pipe(map(function (response) { return response; }), catchError(this.handleError));
    };
    BaseServices.prototype.httpDelete = function (controller, success, error) {
        var httpSubscription;
        httpSubscription = this.delete(controller)
            .subscribe(function (obj) {
            httpSubscription.unsubscribe();
            success(obj);
        }, function (errorMessage) {
            httpSubscription.unsubscribe();
            error(errorMessage);
        });
    };
    BaseServices.prototype.delete = function (controller) {
        var endPoint = "api/" + controller;
        endPoint = location.origin + "/" + endPoint;
        return this.http.delete(endPoint + ("api/" + controller)).pipe(map(function (response) { return response; }), catchError(this.handleError));
    };
    BaseServices.prototype.handleError = function (customResponse, caught) {
        if (customResponse.status !== 0) {
            var analyticsData = JSON.parse(localStorage.getItem("analyticsData"));
            if (analyticsData.exceptions.length > 99) {
                analyticsData.exceptions.pop();
            }
            var exception = new Exception();
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
export { BaseServices };
//# sourceMappingURL=baseServices.js.map