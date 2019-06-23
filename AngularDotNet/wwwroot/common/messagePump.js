import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseServices } from "./baseServices";
import * as _ from "lodash";
var MessagePump = /** @class */ (function (_super) {
    tslib_1.__extends(MessagePump, _super);
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
            _this.allRegisteredChannels = _.cloneDeep(getAllChannels.channels);
            success();
        }, function (errorMessage) {
            error(errorMessage);
        });
    };
    MessagePump.prototype.namedUnregister = function (name, success, error) {
        var _this = this;
        var namedChannels = _.filter(this.channelForSubscriptions, function (a) { return (a.name === name); });
        if (namedChannels.length === 0) {
            error("Channel: " + name + " does not exist!");
            return;
        }
        this.httpPost("messagePump", "NamedUnregister", { name: name }, function (getAllChannels) {
            _this.channelForSubscriptions = getAllChannels.channels;
            _.pull(_this.channelRegistration.subscriptions, name);
            _this.allRegisteredChannels = _.cloneDeep(getAllChannels.channels);
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
            _this.allRegisteredChannels = _.cloneDeep(getAllChannels.channels);
            _this.channelRegistered = true;
            success();
        }, function (errorMessage) {
            error(errorMessage);
        });
    };
    MessagePump.prototype.synchronize = function (messageReceivedCallback, success, error) {
        var _this = this;
        this.httpGet("messagePump", function (obj) {
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
                        _this.allRegisteredChannels = _.cloneDeep(getAllChannels.channels);
                        _this.synchronize(messageReceivedCallback, success, error);
                        break;
                    }
                case "ChannelMessage":
                    {
                        var channelMessage_1 = obj;
                        var sendersName = _.filter(_this.channelForSubscriptions, function (a) { return (a.name === channelMessage_1.sendersName); })[0].name;
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
        }, this.channelRegistration.id.toString());
    };
    MessagePump.prototype.getAllRegisteredChannels = function (success, error) {
        var _this = this;
        this.httpGet("messagePump", function (getAllChannels) {
            _this.allRegisteredChannels = getAllChannels.channels;
            success();
        }, function (errorMessage) {
            error(errorMessage);
        }, "getregisteredchannels");
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
        return _.sortBy(this.channelForSubscriptions, "name");
    };
    MessagePump.prototype.getOrderedChanneNameslForSubscriptions = function () {
        return _.map(this.channelForSubscriptions, "name");
    };
    MessagePump.prototype.getOrderedAllRegisteredChannels = function () {
        return _.sortBy(this.allRegisteredChannels, "name");
    };
    MessagePump = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], MessagePump);
    return MessagePump;
}(BaseServices));
export { MessagePump };
//# sourceMappingURL=messagePump.js.map