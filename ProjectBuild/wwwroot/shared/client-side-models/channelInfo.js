"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChannelRegistration = /** @class */ (function () {
    function ChannelRegistration() {
        this.id = 0;
        this.name = "";
        this.subscriptions = Array();
    }
    return ChannelRegistration;
}());
exports.ChannelRegistration = ChannelRegistration;
var ChannelMessage = /** @class */ (function () {
    function ChannelMessage() {
        this.message = new Object();
        this.syncAction = "";
        this.type = "ChannelMessage";
        this.sendersName = "";
    }
    return ChannelMessage;
}());
exports.ChannelMessage = ChannelMessage;
var ChannelSync = /** @class */ (function () {
    function ChannelSync() {
        this.cancel = false;
        this.type = "ChannelSync";
    }
    return ChannelSync;
}());
exports.ChannelSync = ChannelSync;
var GetAllChannels = /** @class */ (function () {
    function GetAllChannels() {
        this.channels = Array();
        this.type = "GetAllChannels";
    }
    return GetAllChannels;
}());
exports.GetAllChannels = GetAllChannels;
//# sourceMappingURL=channelInfo.js.map