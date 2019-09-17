"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var store_1 = require("@ngxs/store");
var side_nav_component_actions_1 = require("./side-nav.component.actions");
var buildModels_1 = require("../../shared/client-side-models/buildModels");
var $SideNavStateModel = /** @class */ (function () {
    function $SideNavStateModel() {
        this.requestAppSettings = false;
        this.responseAppSettings = new buildModels_1.AppSettings();
        this.featureName = "";
    }
    return $SideNavStateModel;
}());
exports.$SideNavStateModel = $SideNavStateModel;
var SideNavStateModel = /** @class */ (function () {
    function SideNavStateModel() {
        this.requestAppSettings = false;
        this.responseAppSettings = new buildModels_1.AppSettings();
        this.featureName = "";
        this.previousState = new $SideNavStateModel();
    }
    return SideNavStateModel;
}());
exports.SideNavStateModel = SideNavStateModel;
var SideNavState = /** @class */ (function () {
    function SideNavState() {
    }
    SideNavState.prototype.action01 = function (_a, _b) {
        var patchState = _a.patchState;
        var name = _b.name, payload = _b.payload;
        patchState({ requestAppSettings: payload });
        // Don't record this state change
    };
    SideNavState.prototype.action02 = function (_a, _b) {
        var patchState = _a.patchState;
        var name = _b.name, payload = _b.payload;
        patchState({ responseAppSettings: payload });
        // Don't record this state change
    };
    SideNavState.prototype.action03 = function (_a, _b) {
        var patchState = _a.patchState;
        var action = _b.action, name = _b.name, payload = _b.payload, playback = _b.playback, delay = _b.delay;
        patchState({ featureName: payload });
        this.ngAction.appendToQueue(new side_nav_component_actions_1.NavigateTo(action, name, payload, playback, delay));
    };
    SideNavState.prototype.action04 = function (_a, _b) {
        var patchState = _a.patchState, getState = _a.getState;
        var ngAction = _b.ngAction;
        this.ngAction = ngAction;
    };
    __decorate([
        store_1.Action(side_nav_component_actions_1.RequestAppSettings)
    ], SideNavState.prototype, "action01", null);
    __decorate([
        store_1.Action(side_nav_component_actions_1.ResponseAppSettings)
    ], SideNavState.prototype, "action02", null);
    __decorate([
        store_1.Action(side_nav_component_actions_1.NavigateTo)
    ], SideNavState.prototype, "action03", null);
    __decorate([
        store_1.Action(side_nav_component_actions_1.SideNavInit)
    ], SideNavState.prototype, "action04", null);
    SideNavState = __decorate([
        store_1.State({
            name: 'sideNav',
            defaults: new SideNavStateModel()
        })
    ], SideNavState);
    return SideNavState;
}());
exports.SideNavState = SideNavState;
//# sourceMappingURL=side-nav.component.state.js.map