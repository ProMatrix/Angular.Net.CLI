"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var apiService_1 = require("../shared/enterprise/apiService");
var environment_1 = require("../src/environments/environment");
var _ = require("lodash");
var MessagePump = /** @class */ (function (_super) {
    __extends(MessagePump, _super);
    function MessagePump(store, http) {
        var _this = _super.call(this, http, store) || this;
        _this.store = store;
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
            name: '',
            subscriptions: []
        };
        var cachedMessages = _this.getLocalStorage('transmitMessageQueue');
        if (cachedMessages) {
            _this.transmitMessageQueue = cachedMessages;
        }
        return _this;
    }
    MessagePump.prototype.register = function (success, error) {
        if (this.channelRegistered) {
            error('This channel is already unregistered!');
        }
        this.onUpdateSubscriptions(success, error);
    };
    MessagePump.prototype.setToOffline = function () {
        this.channelForSubscriptions.length = 0;
        this.channelRegistration.subscriptions.length = 0;
        this.allRegisteredChannels.length = 0;
        if (this.channelRegistered) {
            this.setToAutoRegister = true;
        }
        this.channelRegistered = false;
    };
    MessagePump.prototype.unregister = function (success, error) {
        var _this = this;
        if (!this.channelRegistered) {
            error('This channel is already unregistered!');
            return;
        }
        this.channelUnregistrationInProcess = true;
        this.post(this.channelRegistration, environment_1.environment.api.executeChannelUnregistration, function (getAllChannels) {
            _this.channelForSubscriptions.length = 0;
            _this.channelRegistration.subscriptions.length = 0;
            _this.allRegisteredChannels = _.cloneDeep(getAllChannels.channels);
            success();
        }, function (errorMessage) {
            error(errorMessage);
        });
    };
    MessagePump.prototype.namedUnregister = function (name$, success, error) {
        var _this = this;
        var namedChannels = _.filter(this.channelForSubscriptions, function (a) { return (a.name === name); });
        if (namedChannels.length === 0) {
            error('Channel: ' + name + ' does not exist!');
            return;
        }
        this.post({ name: name$ }, environment_1.environment.api.executeNamedUnregister, function (getAllChannels) {
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
        this.post(this.channelRegistration, environment_1.environment.api.executeChannelRegistration, function (getAllChannels) {
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
        this.get(environment_1.environment.api.getChannelData, function (obj) {
            if (!_this.channelRegistered) {
                return;
            }
            switch (obj.type) {
                case 'ChannelSync':
                    var channelSync = obj;
                    if (channelSync.cancel) {
                        // channel was unregistered
                        _this.channelForSubscriptions.length = 0;
                        _this.channelRegistered = false;
                        _this.channelUnregistrationInProcess = false;
                        success();
                    }
                    else {
                        _this.synchronize(messageReceivedCallback, success, error);
                    }
                    break;
                case 'GetAllChannels':
                    var getAllChannels = obj;
                    _this.channelForSubscriptions = getAllChannels.channels;
                    _this.allRegisteredChannels = _.cloneDeep(getAllChannels.channels);
                    _this.synchronize(messageReceivedCallback, success, error);
                    break;
                case 'ChannelMessage':
                    var channelMessage_1 = obj;
                    var sendersName = _.filter(_this.channelForSubscriptions, function (a) { return (a.name === channelMessage_1.sendersName); })[0].name;
                    _this.receiveMessageQueue.push(channelMessage_1);
                    messageReceivedCallback();
                    _this.synchronize(messageReceivedCallback, success, error);
                    break;
            }
        }, function (errorMessage) {
            // most likely a 502 network timeout
            if (navigator.onLine) {
                _this.synchronize(messageReceivedCallback, success, error);
            }
        }, new http_1.HttpParams().set('id', this.channelRegistration.id.toString()));
    };
    MessagePump.prototype.getAllRegisteredChannels = function (success, error) {
        var _this = this;
        this.get(environment_1.environment.api.getRegisteredChannels, function (getAllChannels) {
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
            this.setLocalStorage('transmitMessageQueue', this.transmitMessageQueue);
            offlineCondition();
            return;
        }
        var nextMessage = this.transmitMessageQueue.shift();
        this.post(nextMessage, environment_1.environment.api.sendChannelMessage, function (wasSuccessful) {
            if (wasSuccessful) {
                if (_this.transmitMessageQueue.length > 0) {
                    _this.sendChannelMessage(success, error, null);
                }
                else {
                    _this.setLocalStorage('transmitMessageQueue', null);
                    success();
                }
            }
            else {
                error('Channel message Error!');
            }
        }, function (errorMessage) {
            error(errorMessage);
        });
    };
    MessagePump.prototype.getOrderedChannelForSubscriptions = function () {
        return _.sortBy(this.channelForSubscriptions, 'name');
    };
    MessagePump.prototype.getOrderedChanneNameslForSubscriptions = function () {
        return _.map(this.channelForSubscriptions, 'name');
    };
    MessagePump.prototype.getOrderedAllRegisteredChannels = function () {
        return _.sortBy(this.allRegisteredChannels, 'name');
    };
    MessagePump = __decorate([
        core_1.Injectable()
    ], MessagePump);
    return MessagePump;
}(apiService_1.ApiService));
exports.MessagePump = MessagePump;
//# sourceMappingURL=messagePump.js.map