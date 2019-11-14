"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RequestAppSettings = /** @class */ (function () {
    function RequestAppSettings(action, name, payload, playback, delay) {
        this.action = action;
        this.name = name;
        this.payload = payload;
        this.playback = playback;
        this.delay = delay;
    }
    RequestAppSettings.type = '[side-nav] Request AppSettings';
    return RequestAppSettings;
}());
exports.RequestAppSettings = RequestAppSettings;
var ResponseAppSettings = /** @class */ (function () {
    function ResponseAppSettings(action, name, payload, playback, delay) {
        this.action = action;
        this.name = name;
        this.payload = payload;
        this.playback = playback;
        this.delay = delay;
    }
    ResponseAppSettings.type = '[side-nav] Response AppSettings';
    return ResponseAppSettings;
}());
exports.ResponseAppSettings = ResponseAppSettings;
var NavigateTo = /** @class */ (function () {
    function NavigateTo(action, name, payload, playback, delay) {
        this.action = action;
        this.name = name;
        this.payload = payload;
        this.playback = playback;
        this.delay = delay;
    }
    NavigateTo.type = '[side-nav] NavigateTo';
    return NavigateTo;
}());
exports.NavigateTo = NavigateTo;
var SideNavInit = /** @class */ (function () {
    // remove circular reference by using ngAction: any
    function SideNavInit(ngAction) {
        this.ngAction = ngAction;
    }
    SideNavInit.type = '[side-nav] SideNavInit';
    return SideNavInit;
}());
exports.SideNavInit = SideNavInit;
//# sourceMappingURL=side-nav.component.actions.js.map