"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChangeTabIndex = /** @class */ (function () {
    function ChangeTabIndex(action, name, payload, playback, delay) {
        this.action = action;
        this.name = name;
        this.payload = payload;
        this.playback = playback;
        this.delay = delay;
    }
    ChangeTabIndex.type = '[mobileApi] ChangeTabIndex';
    return ChangeTabIndex;
}());
exports.ChangeTabIndex = ChangeTabIndex;
var ToggleSpellChecking = /** @class */ (function () {
    function ToggleSpellChecking(action, name, payload, playback, delay) {
        this.action = action;
        this.name = name;
        this.payload = payload;
        this.playback = playback;
        this.delay = delay;
    }
    ToggleSpellChecking.type = '[mobileApi] ToggleSpellChecking';
    return ToggleSpellChecking;
}());
exports.ToggleSpellChecking = ToggleSpellChecking;
var UpdateTextMessage = /** @class */ (function () {
    function UpdateTextMessage(action, name, payload, playback, delay) {
        this.action = action;
        this.name = name;
        this.payload = payload;
        this.playback = playback;
        this.delay = delay;
    }
    UpdateTextMessage.type = '[mobileApi] UpdateTextMessage';
    return UpdateTextMessage;
}());
exports.UpdateTextMessage = UpdateTextMessage;
var ClearTextMessage = /** @class */ (function () {
    function ClearTextMessage(action, name, payload, playback, delay) {
        this.action = action;
        this.name = name;
        this.payload = payload;
        this.playback = playback;
        this.delay = delay;
    }
    ClearTextMessage.type = '[mobileApi] ClearTextMessage';
    return ClearTextMessage;
}());
exports.ClearTextMessage = ClearTextMessage;
var ChangeMobileCarrier = /** @class */ (function () {
    function ChangeMobileCarrier(action, name, payload, playback, delay) {
        this.action = action;
        this.name = name;
        this.payload = payload;
        this.playback = playback;
        this.delay = delay;
    }
    ChangeMobileCarrier.type = '[mobileApi] ChangeMobileCarrier';
    return ChangeMobileCarrier;
}());
exports.ChangeMobileCarrier = ChangeMobileCarrier;
var UpdateMobileNumber = /** @class */ (function () {
    function UpdateMobileNumber(action, name, payload, playback, delay) {
        this.action = action;
        this.name = name;
        this.payload = payload;
        this.playback = playback;
        this.delay = delay;
    }
    UpdateMobileNumber.type = '[mobileApi] UpdateMobileNumber';
    return UpdateMobileNumber;
}());
exports.UpdateMobileNumber = UpdateMobileNumber;
var MobileApiInit = /** @class */ (function () {
    function MobileApiInit(ngAction) {
        this.ngAction = ngAction;
    }
    MobileApiInit.type = '[mobileApi] MobileApiInit';
    return MobileApiInit;
}());
exports.MobileApiInit = MobileApiInit;
//# sourceMappingURL=mobileApis.component.actions.js.map