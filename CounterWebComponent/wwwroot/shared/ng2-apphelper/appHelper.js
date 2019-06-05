"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var appServices_1 = require("./appServices");
var AppHelper = /** @class */ (function () {
    function AppHelper() {
    }
    AppHelper_1 = AppHelper;
    AppHelper.forRoot = function () {
        return {
            ngModule: AppHelper_1,
            providers: [appServices_1.AppServices]
        };
    };
    var AppHelper_1;
    AppHelper = AppHelper_1 = __decorate([
        core_1.NgModule({
            declarations: [],
            exports: []
        })
    ], AppHelper);
    return AppHelper;
}());
exports.AppHelper = AppHelper;
//# sourceMappingURL=appHelper.js.map