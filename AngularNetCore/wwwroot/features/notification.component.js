"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
//#region Imports
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var speechToText_1 = require("../library_ng/ng2-mobiletech/speechToText");
var textToSpeech_1 = require("../library_ng/ng2-mobiletech/textToSpeech");
var modalDialog_1 = require("../library_ng/ng2-animation/modalDialog");
// models
var channelInfo_1 = require("../library_ng/client-side-models/channelInfo");
//#endregion
var NotificationComponent = /** @class */ (function () {
    function NotificationComponent(ac, xcvr, cd, as) {
        var _this = this;
        this.ac = ac;
        this.xcvr = xcvr;
        this.cd = cd;
        this.as = as;
        this.isViewVisible = true;
        this.textToSend = '';
        this.textReceived = '';
        this.showTextArea = true;
        this.speechRecognitionOn = false;
        this.speechRecognitionPaused = false;
        this.showSpeechToText = false;
        this.showTextToSpeech = false;
        this.spellCheck = false;
        this.textAreaMinRowCount = 3;
        this.showModalDialog = false;
        window.ononline = function () {
            _this.onlineCallback();
        };
        window.onoffline = function () {
            _this.offlineCallback();
        };
    }
    NotificationComponent.prototype.onlineCallback = function () {
        if (this.xcvr.setToAutoRegister) {
            this.onClickRegister();
        }
    };
    NotificationComponent.prototype.offlineCallback = function () {
        this.xcvr.setToOffline();
    };
    NotificationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ac.waitUntilInitialized(function () {
            _this.xcvr.getAllRegisteredChannels(function () { }, function (errorMessage) {
                _this.ac.toastrError("Error: " + errorMessage);
            });
            _this.isViewVisible = true;
            window.onbeforeunload = function () {
                if (_this.xcvr.channelRegistered) {
                    _this.onClickUnregister();
                }
            };
        });
    };
    //#endregion
    //#region S2T & T2S:
    NotificationComponent.prototype.unavailableFeature = function (feature) {
        var _this = this;
        this.ac.toastrInfo(feature + " ' is unavailable with this browser...");
        setTimeout(function () {
            _this.ac.toastrInfo('Upgrade to Google Chrome!');
        }, 5000);
    };
    NotificationComponent.prototype.onClickSpeechToText = function () {
        var _this = this;
        if (!this.s2T.featureIsAvailable) {
            this.unavailableFeature('Speech to Text');
            return;
        }
        this.s2T.owner = this;
        this.s2T.onRestartCallback = function () {
            // Don't do anything for now
        };
        this.s2T.onResultsCallback = function (speech) {
            if (!_this.voiceActivation(speech)) {
                if (_this.xcvr.channelRegistered) {
                    _this.textToSend += speech + '\n';
                    _this.cd.detectChanges();
                }
                else {
                    _this.audioResponses("can't compose message");
                }
            }
        };
        this.s2T.isClosable = true;
        this.s2T.positionTop = -75;
        this.showSpeechToText = false;
        this.textToSend = '';
        setTimeout(function () {
            _this.showSpeechToText = true;
        });
    };
    NotificationComponent.prototype.voiceActivation = function (command) {
        switch (command.toLowerCase().trim()) {
            case 'computer register channel':
                if (this.shouldRegistrationBeDisabled()) {
                    this.audioResponses("can't register channel");
                }
                else {
                    this.onClickRegister();
                }
                return true;
            case 'computer unregister channel':
                if (this.shouldUnregistrationBeDisabled()) {
                    this.audioResponses("can't unregister channel");
                }
                else {
                    this.onClickUnregister();
                }
                return true;
            case 'computer check spelling':
                this.onClickSpellCheck(true);
                return true;
            case 'computer send message':
                if (this.shouldSendBeDisabled()) {
                    this.audioResponses("can't send message");
                }
                else {
                    this.onClickSendMessage();
                }
                return true;
            case 'computer clear text':
                this.onClickClearText();
                return true;
            default:
                break;
        }
        // partial matches
        if (command.toLowerCase().trim().indexOf('computer register channel') !== -1) {
            this.voiceRegisterChannel(command);
            return true;
        }
        if (command.toLowerCase().trim().indexOf('computer subscribe to channel') !== -1) {
            this.voiceSubscribeToChannel(command);
            return true;
        }
    };
    NotificationComponent.prototype.voiceRegisterChannel = function (command) {
        // protocol: 'computer register channel A'
        var commandParts = command.split(' ');
        if (commandParts.length < 4) {
            this.audioResponses('what do you want');
            return;
        }
        this.xcvr.channelRegistration.name = this.getChannelNameFromCommand(command, 3);
        this.onClickRegister();
    };
    NotificationComponent.prototype.getChannelNameFromCommand = function (command, index) {
        var commandParts = command.split(' ');
        var channelName = '';
        for (var i = index; i < commandParts.length; i++) {
            channelName += commandParts[i] + ' ';
        }
        return channelName.trim().toUpperCase();
    };
    NotificationComponent.prototype.voiceSubscribeToChannel = function (command) {
        // protocol: 'computer subscribe to channel A'
        var commandParts = command.split(' ');
        if (commandParts.length < 5) {
            this.audioResponses('what do you want');
            return;
        }
        var channelName = this.getChannelNameFromCommand(command, 4);
        // is channel already subscribed to?
        var already = this.xcvr.channelRegistration.subscriptions.filter(function (i) { return (i === channelName); });
        if (already.length > 0) {
            this.audioResponses('channel already subscribed', channelName);
            return;
        }
        var available = this.xcvr.getChanneNamesForSubscriptions().filter(function (i) { return (i === channelName); });
        if (available.length !== 1) {
            this.audioResponses('channel not available', channelName);
            return;
        }
        this.xcvr.channelRegistration.subscriptions.push(channelName);
        this.onUpdateSubscriptions();
    };
    NotificationComponent.prototype.audioResponses = function (response, value) {
        var audioResponse = '';
        switch (response) {
            case "can't register channel":
                this.s2T.onClickPause();
                audioResponse = "Sorry! It's not possible to register the channel at this time!";
                break;
            case "can't unregister channel":
                this.s2T.onClickPause();
                audioResponse = "Sorry! It's not possible to unregister the channel at this time!";
                break;
            case "can't compose message":
                this.s2T.onClickPause();
                audioResponse = "Sorry! It's not possible to compose a message until after channel registration!";
                break;
            case "what do you want":
                this.s2T.onClickPause();
                audioResponse = "Sorry! I really don't know what you expect me to do. Please repeat!";
                break;
            case "channel already subscribed":
                this.s2T.onClickPause();
                audioResponse = 'Sorry! You are already subscribed to channel: ' + value;
                break;
            case "channel not available":
                this.s2T.onClickPause();
                audioResponse = 'Sorry! Channel ' + value + ' is not available for supscription!';
                break;
            case "can't send message":
                this.s2T.onClickPause();
                audioResponse = 'Sorry! To send a message, you must have a registered channel, and a message to send!';
                break;
            default:
                break;
        }
        this.textToSpeech(audioResponse);
        this.ac.toastrError(audioResponse);
    };
    NotificationComponent.prototype.onClickTextToSpeech = function () {
        this.textToSpeech(this.textToSend);
    };
    NotificationComponent.prototype.textToSpeech = function (speech) {
        var _this = this;
        if (!this.t2S.featureIsAvailable) {
            this.unavailableFeature('Text to Speech');
            return;
        }
        this.t2S.textToSpeak = speech;
        this.t2S.isClosable = true;
        this.t2S.positionTop = -75;
        this.t2S.owner = this;
        this.t2S.onChangeCallback = function (text) {
            // Speech completed, paused, or stopped
        };
        setTimeout(function () {
            _this.t2S.setupT2S();
            _this.t2S.Start();
        });
    };
    NotificationComponent.prototype.onClickClearText = function () {
        this.textToSend = '';
    };
    NotificationComponent.prototype.onClickSpellCheck = function (spellCheck) {
        var _this = this;
        this.spellCheck = spellCheck;
        if (this.spellCheck) {
            setTimeout(function () {
                var textArea = document.querySelector('.text-to-send');
                if (_this.spellCheck) {
                    _this.as.spellChecker(textArea);
                }
                else {
                    textArea.focus();
                }
            });
        }
        else {
            setTimeout(function () {
                _this.showTextArea = false;
                setTimeout(function () {
                    _this.showTextArea = true;
                });
            });
        }
    };
    NotificationComponent.prototype.getRowCount = function () {
        var count = document.querySelector('.text-to-send').value.split('\n').length;
        if (count > this.textAreaMinRowCount) {
            return count;
        }
        else {
            return this.textAreaMinRowCount;
        }
    };
    // #endregion
    //#region Message Control
    NotificationComponent.prototype.updateMessagesReceived = function () {
        var _this = this;
        this.textReceived = '';
        this.xcvr.receiveMessageQueue.forEach(function (receiveMessage) {
            if (_this.t2S.featureIsAvailable) {
                _this.textToSpeech('channel ' + receiveMessage.sendersName + ' sends, ' + receiveMessage.message.toString());
            }
            var sendersName = _this.xcvr.channelForSubscriptions.filter(function (a) { return (a.name === receiveMessage.sendersName); })[0].name;
            _this.textReceived += sendersName + '> ' + receiveMessage.message.toString() + '\n';
        });
    };
    NotificationComponent.prototype.onClickSendMessage = function () {
        var _this = this;
        // queue message before sending
        this.xcvr.transmitMessageQueue.push(this.getMessageObj(this.textToSend));
        if (this.s2T.featureIsAvailable) {
            this.s2T.onClickPause();
        }
        this.xcvr.queueChannelMessage(function () {
            _this.ac.toastrSuccess('Message sent successfully!');
        }, function (errorMessage) {
            _this.ac.toastrError("Error: " + errorMessage);
        }, function () {
            _this.ac.toastrInfo('Offline: Message is cached for sending when back online');
        });
    };
    NotificationComponent.prototype.getMessageObj = function (message) {
        var channelMessage = new channelInfo_1.ChannelMessage();
        channelMessage.type = 'ChannelMessage';
        channelMessage.syncAction = 'dispatchMessage';
        channelMessage.sendersName = this.xcvr.channelRegistration.name;
        channelMessage.message = message;
        // channelMessage.message = new Date(); //cool! because on the server, this looks like a DateTime in UTC
        return channelMessage;
    };
    NotificationComponent.prototype.synchronize = function () {
        var _this = this;
        this.xcvr.synchronize(function () {
            // messageReceivedCallback
            _this.updateMessagesReceived();
        }, function () {
            _this.ac.toastrSuccess("You successfully unregistered channel: " + _this.xcvr.channelRegistration.name);
        }, function (errorMessage) {
            _this.ac.toastrError("Error: " + errorMessage);
        });
    };
    //#endregion
    //#region Registration
    NotificationComponent.prototype.onClickRegister = function () {
        var _this = this;
        this.xcvr.channelRegistration.name = this.xcvr.channelRegistration.name.toUpperCase();
        this.xcvr.register(function () {
            _this.ac.toastrSuccess("You successfully registered channel: " + _this.xcvr.channelRegistration.name);
            _this.xcvr.setToAutoRegister = false;
            if (_this.xcvr.transmitMessageQueue.length > 0) {
                _this.xcvr.sendChannelMessage(function () {
                    _this.synchronize();
                }, function (errorMessage) { }, function () { });
            }
            else {
                _this.synchronize();
            }
        }, function (errorMessage) {
            _this.ac.toastrError("Error: " + errorMessage);
        });
    };
    NotificationComponent.prototype.onClickUnregister = function () {
        var _this = this;
        this.xcvr.unregister(function () {
            // no message
        }, function (errorMessage) {
            _this.ac.toastrError("Error: " + errorMessage);
        });
        this.as.sleep(500);
    };
    NotificationComponent.prototype.onUpdateSubscriptions = function () {
        var _this = this;
        this.xcvr.onUpdateSubscriptions(function () {
            _this.ac.toastrSuccess('Update to subscription was successfully!');
        }, function (errorMessage) {
            _this.ac.toastrError("Error: " + errorMessage);
        });
    };
    //#endregion
    //#region Button Control
    NotificationComponent.prototype.shouldRegistrationBeDisabled = function () {
        if (this.xcvr.channelRegistration.name.trim().length === 0 || this.xcvr.channelRegistered || !navigator.onLine) {
            return true;
        }
        return false;
    };
    NotificationComponent.prototype.shouldNamedUnregistrationBeDisabled = function () {
        if (this.xcvr.channelsToUnregister.length === 0) {
            return true;
        }
        return false;
    };
    NotificationComponent.prototype.shouldUnregistrationBeDisabled = function () {
        if (!this.xcvr.channelRegistered || this.xcvr.channelUnregistrationInProcess) {
            return true;
        }
        return false;
    };
    NotificationComponent.prototype.shouldSendBeDisabled = function () {
        if (this.textToSend.trim().length === 0) {
            return true;
        }
        if (!this.xcvr.channelRegistered && navigator.onLine) {
            return true;
        }
        return false;
    };
    //#endregion
    //#region Help System
    NotificationComponent.prototype.onClickHelp = function () {
        var _this = this;
        this.md.modalDialogTitle = 'Help on Notification';
        this.md.showOkButton = true;
        this.md.isClosable = true;
        this.md.desiredWidth = 750;
        this.md.desiredHeight = 425;
        this.showModalDialog = false;
        setTimeout(function () {
            _this.showModalDialog = true;
        });
        this.md.dialogButtonCallback = function (buttonClicked) {
            if (buttonClicked === 'ok') {
                _this.md.closeDialog();
            }
        };
    };
    __decorate([
        core_1.ViewChild(speechToText_1.SpeechToTextComponent, { static: true })
    ], NotificationComponent.prototype, "s2T", void 0);
    __decorate([
        core_1.ViewChild(textToSpeech_1.TextToSpeechComponent, { static: true })
    ], NotificationComponent.prototype, "t2S", void 0);
    __decorate([
        core_1.ViewChild(modalDialog_1.ModalDialogComponent, { static: true })
    ], NotificationComponent.prototype, "md", void 0);
    NotificationComponent = __decorate([
        core_1.Component({
            // #region template
            templateUrl: './notification.component.html'
            // #endregion
        })
    ], NotificationComponent);
    return NotificationComponent;
}());
exports.NotificationComponent = NotificationComponent;
var NotificationHelpDialogComponent = /** @class */ (function () {
    function NotificationHelpDialogComponent(data) {
        this.data = data;
        // data contains values passed by the router
    }
    NotificationHelpDialogComponent = __decorate([
        core_1.Component({
            templateUrl: './notification.component.help.html'
        }),
        __param(0, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], NotificationHelpDialogComponent);
    return NotificationHelpDialogComponent;
}());
exports.NotificationHelpDialogComponent = NotificationHelpDialogComponent;
//# sourceMappingURL=notification.component.js.map