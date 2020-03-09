"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var store_1 = require("@ngxs/store");
var mobileApis_component_actions_1 = require("./mobileApis.component.actions");
var $MobileApisStateModel = /** @class */ (function () {
    function $MobileApisStateModel() {
        this.selectedIndex = 0;
        this.spellCheckingEnabled = false;
        this.clearTextMessage = false;
        this.textMessage = '';
        this.mobileCarrier = '';
        this.mobileNumber = '';
    }
    return $MobileApisStateModel;
}());
exports.$MobileApisStateModel = $MobileApisStateModel;
var MobileApisStateModel = /** @class */ (function () {
    function MobileApisStateModel() {
        this.selectedIndex = 0;
        this.spellCheckingEnabled = false;
        this.clearTextMessage = false;
        this.textMessage = '';
        this.mobileCarrier = '';
        this.mobileNumber = '';
        this.previousState = new $MobileApisStateModel();
    }
    return MobileApisStateModel;
}());
exports.MobileApisStateModel = MobileApisStateModel;
var MobileApisState = /** @class */ (function () {
    function MobileApisState() {
    }
    MobileApisState.prototype.action01 = function (_a, _b) {
        var patchState = _a.patchState;
        var name = _b.name, title = _b.title, payload = _b.payload, playback = _b.playback, delay = _b.delay;
        patchState({ selectedIndex: payload });
        this.ngAction.appendToQueue(new mobileApis_component_actions_1.ChangeTabIndex(name, title, payload, playback, delay));
    };
    MobileApisState.prototype.action02 = function (_a, _b) {
        var patchState = _a.patchState;
        var name = _b.name, title = _b.title, payload = _b.payload, playback = _b.playback, delay = _b.delay;
        patchState({ spellCheckingEnabled: payload });
        this.ngAction.appendToQueue(new mobileApis_component_actions_1.ToggleSpellChecking(name, title, payload, playback, delay));
    };
    MobileApisState.prototype.action03 = function (_a, _b) {
        var patchState = _a.patchState;
        var name = _b.name, title = _b.title, payload = _b.payload, playback = _b.playback, delay = _b.delay;
        patchState({ clearTextMessage: payload });
        this.ngAction.appendToQueue(new mobileApis_component_actions_1.ClearTextMessage(name, title, payload, playback, delay));
    };
    MobileApisState.prototype.action04 = function (_a, _b) {
        var patchState = _a.patchState;
        var name = _b.name, title = _b.title, payload = _b.payload, playback = _b.playback, delay = _b.delay;
        patchState({ textMessage: payload });
        this.ngAction.appendToQueue(new mobileApis_component_actions_1.UpdateTextMessage(name, title, payload, playback, delay));
    };
    MobileApisState.prototype.action05 = function (_a, _b) {
        var patchState = _a.patchState;
        var name = _b.name, title = _b.title, payload = _b.payload, playback = _b.playback, delay = _b.delay;
        patchState({ mobileCarrier: payload });
        this.ngAction.appendToQueue(new mobileApis_component_actions_1.ChangeMobileCarrier(name, title, payload, playback, delay));
    };
    MobileApisState.prototype.action06 = function (_a, _b) {
        var patchState = _a.patchState;
        var name = _b.name, title = _b.title, payload = _b.payload, playback = _b.playback, delay = _b.delay;
        patchState({ mobileNumber: payload });
        this.ngAction.appendToQueue(new mobileApis_component_actions_1.UpdateMobileNumber(name, title, payload, playback, delay));
    };
    MobileApisState.prototype.action07 = function (_a, _b) {
        var patchState = _a.patchState;
        var ngAction = _b.ngAction;
        patchState({ selectedIndex: 0 });
        patchState({ spellCheckingEnabled: false });
        patchState({ clearTextMessage: false });
        patchState({ textMessage: '' });
        patchState({ mobileCarrier: '' });
        patchState({ mobileNumber: null });
        patchState({ previousState: new $MobileApisStateModel() });
        this.ngAction = ngAction;
    };
    __decorate([
        store_1.Action(mobileApis_component_actions_1.ChangeTabIndex)
    ], MobileApisState.prototype, "action01", null);
    __decorate([
        store_1.Action(mobileApis_component_actions_1.ToggleSpellChecking)
    ], MobileApisState.prototype, "action02", null);
    __decorate([
        store_1.Action(mobileApis_component_actions_1.ClearTextMessage)
    ], MobileApisState.prototype, "action03", null);
    __decorate([
        store_1.Action(mobileApis_component_actions_1.UpdateTextMessage)
    ], MobileApisState.prototype, "action04", null);
    __decorate([
        store_1.Action(mobileApis_component_actions_1.ChangeMobileCarrier)
    ], MobileApisState.prototype, "action05", null);
    __decorate([
        store_1.Action(mobileApis_component_actions_1.UpdateMobileNumber)
    ], MobileApisState.prototype, "action06", null);
    __decorate([
        store_1.Action(mobileApis_component_actions_1.MobileApiInit)
    ], MobileApisState.prototype, "action07", null);
    MobileApisState = __decorate([
        store_1.State({
            name: 'mobileApis',
            defaults: new MobileApisStateModel()
        })
    ], MobileApisState);
    return MobileApisState;
}());
exports.MobileApisState = MobileApisState;
//# sourceMappingURL=mobileApis.component.state.js.map