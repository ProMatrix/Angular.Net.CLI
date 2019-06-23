import * as tslib_1 from "tslib";
//#region Imports
import { Component, ViewChild, ChangeDetectorRef } from "@angular/core";
// services
import { AppConfig } from "../../common/appConfig";
import { MessagePump } from "../../common/messagePump";
import { AppServices } from "../../shared/ng2-apphelper/appServices";
import { SpeechToText } from "../../shared/ng2-mobiletech/speechToText";
import { TextToSpeech } from "../../shared/ng2-mobiletech/textToSpeech";
import { ModalDialog } from "../../shared/ng2-animation/modalDialog";
import * as _ from "lodash";
// models
import { ChannelMessage } from "../../shared/client-side-models/channelInfo";
//#endregion
var NotificationComponent = /** @class */ (function () {
    function NotificationComponent(ac, xcvr, cd, as) {
        var _this = this;
        this.ac = ac;
        this.xcvr = xcvr;
        this.cd = cd;
        this.as = as;
        this.isViewVisible = true;
        this.textToSend = "";
        this.textReceived = "";
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
        this.ac.toastrInfo(feature + " \" is unavailable with this browser...");
        setTimeout(function () {
            _this.ac.toastrInfo("Upgrade to Google Chrome!");
        }, 5000);
    };
    NotificationComponent.prototype.onClickSpeechToText = function () {
        var _this = this;
        if (!this.s2T.featureIsAvailable) {
            this.unavailableFeature("Speech to Text");
            return;
        }
        this.s2T.owner = this;
        this.s2T.onRestartCallback = "onRestartS2TCallback";
        this.s2T.onResultsCallback = "onResultsS2TCallback";
        this.s2T.isClosable = true;
        this.s2T.positionTop = -75;
        this.showSpeechToText = false;
        this.textToSend = "";
        setTimeout(function () {
            _this.showSpeechToText = true;
        });
    };
    NotificationComponent.prototype.onRestartS2TCallback = function () {
        // in this case, don't clear the text on restart
    };
    NotificationComponent.prototype.onResultsS2TCallback = function (speech) {
        if (!this.voiceActivation(speech)) {
            if (this.xcvr.channelRegistered) {
                this.textToSend += speech + "\n";
                this.cd.detectChanges();
            }
            else {
                this.audioResponses("can't compose message");
            }
        }
    };
    NotificationComponent.prototype.voiceActivation = function (command) {
        switch (command.toLowerCase().trim()) {
            case "computer register channel":
                if (this.shouldRegistrationBeDisabled()) {
                    this.audioResponses("can't register channel");
                }
                else
                    this.onClickRegister();
                return true;
            case "computer unregister channel":
                if (this.shouldUnregistrationBeDisabled())
                    this.audioResponses("can't unregister channel");
                else
                    this.onClickUnregister();
                return true;
            case "computer check spelling":
                this.onClickSpellCheck(true);
                return true;
            case "computer send message":
                if (this.shouldSendBeDisabled())
                    this.audioResponses("can't send message");
                else
                    this.onClickSendMessage();
                return true;
            case "computer clear text":
                this.onClickClearText();
                return true;
            default:
                break;
        }
        // partial matches
        if (command.toLowerCase().trim().indexOf("computer register channel") !== -1) {
            this.voiceRegisterChannel(command);
            return true;
        }
        if (command.toLowerCase().trim().indexOf("computer subscribe to channel") !== -1) {
            this.voiceSubscribeToChannel(command);
            return true;
        }
    };
    NotificationComponent.prototype.voiceRegisterChannel = function (command) {
        // protocol: "computer register channel A"
        var commandParts = command.split(" ");
        if (commandParts.length < 4) {
            this.audioResponses("what do you want");
            return;
        }
        this.xcvr.channelRegistration.name = this.getChannelNameFromCommand(command, 3);
        this.onClickRegister();
    };
    NotificationComponent.prototype.getChannelNameFromCommand = function (command, index) {
        var commandParts = command.split(" ");
        var channelName = "";
        for (var i = index; i < commandParts.length; i++) {
            channelName += commandParts[i] + " ";
        }
        return channelName.trim().toUpperCase();
    };
    NotificationComponent.prototype.voiceSubscribeToChannel = function (command) {
        // protocol: "computer subscribe to channel A"
        var commandParts = command.split(" ");
        if (commandParts.length < 5) {
            this.audioResponses("what do you want");
            return;
        }
        var channelName = this.getChannelNameFromCommand(command, 4);
        // is channel already subscribed to?
        var already = _.filter(this.xcvr.channelRegistration.subscriptions, function (i) { return (i === channelName); });
        if (already.length > 0) {
            this.audioResponses("channel already subscribed", channelName);
            return;
        }
        var available = _.filter(this.xcvr.getOrderedChanneNameslForSubscriptions(), function (i) { return (i === channelName); });
        if (available.length !== 1) {
            this.audioResponses("channel not available", channelName);
            return;
        }
        this.xcvr.channelRegistration.subscriptions.push(channelName);
        this.onUpdateSubscriptions();
    };
    NotificationComponent.prototype.audioResponses = function (response, value) {
        var audioResponse = "";
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
                audioResponse = "Sorry! You are already subscribed to channel: " + value;
                break;
            case "channel not available":
                this.s2T.onClickPause();
                audioResponse = "Sorry! Channel " + value + " is not available for supscription!";
                break;
            case "can't send message":
                this.s2T.onClickPause();
                audioResponse = "Sorry! To send a message, you must have a registered channel, and a message to send!";
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
            this.unavailableFeature("Text to Speech");
            return;
        }
        this.t2S.textToSpeak = speech;
        this.t2S.isClosable = true;
        this.t2S.positionTop = -75;
        this.t2S.owner = this;
        this.t2S.onChangeCallback = "onT2SChangeCallback";
        setTimeout(function () {
            _this.t2S.setupT2S();
            _this.t2S.Start();
        });
    };
    NotificationComponent.prototype.onT2SChangeCallback = function () {
        // Speech completed, paused, or stopped
    };
    NotificationComponent.prototype.onClickClearText = function () {
        this.textToSend = "";
    };
    NotificationComponent.prototype.onClickSpellCheck = function (spellCheck) {
        var _this = this;
        this.spellCheck = spellCheck;
        if (this.spellCheck) {
            setTimeout(function () {
                var textArea = document.querySelector(".text-to-send");
                if (_this.spellCheck)
                    _this.as.spellChecker(textArea);
                else
                    textArea.focus();
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
        var count = document.querySelector(".text-to-send").value.split("\n").length;
        if (count > this.textAreaMinRowCount)
            return count;
        else
            return this.textAreaMinRowCount;
    };
    // #endregion
    //#region Message Control
    NotificationComponent.prototype.updateMessagesReceived = function () {
        var _this = this;
        this.textReceived = "";
        this.xcvr.receiveMessageQueue.forEach(function (receiveMessage) {
            if (_this.t2S.featureIsAvailable)
                _this.textToSpeech("channel " + receiveMessage.sendersName + " sends, " + receiveMessage.message.toString());
            var sendersName = _.filter(_this.xcvr.channelForSubscriptions, function (a) { return (a.name === receiveMessage.sendersName); })[0].name;
            _this.textReceived += sendersName + "> " + receiveMessage.message.toString() + "\n";
        });
    };
    NotificationComponent.prototype.onClickSendMessage = function () {
        var _this = this;
        // queue message before sending
        this.xcvr.transmitMessageQueue.push(this.getMessageObj(this.textToSend));
        if (this.s2T.featureIsAvailable)
            this.s2T.onClickPause();
        this.xcvr.queueChannelMessage(function () {
            _this.ac.toastrSuccess("Message sent successfully!");
        }, function (errorMessage) {
            _this.ac.toastrError("Error: " + errorMessage);
        }, function () {
            _this.ac.toastrInfo("Offline: Message is cached for sending when back online");
        });
    };
    NotificationComponent.prototype.getMessageObj = function (message) {
        var channelMessage = new ChannelMessage();
        channelMessage.type = "ChannelMessage";
        channelMessage.syncAction = "dispatchMessage";
        channelMessage.sendersName = this.xcvr.channelRegistration.name;
        channelMessage.message = message;
        //channelMessage.message = new Date(); //cool! because on the server, this looks like a DateTime in UTC
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
            else
                _this.synchronize();
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
    NotificationComponent.prototype.onClickNamedUnregister = function () {
        var _this = this;
        var channelName = "";
        if (this.xcvr.channelsToUnregister.includes(this.xcvr.channelRegistration.name))
            channelName = this.xcvr.channelRegistration.name;
        else
            channelName = this.xcvr.channelsToUnregister[0];
        this.xcvr.namedUnregister(channelName, function () {
            _.pull(_this.xcvr.channelsToUnregister, channelName);
            _this.ac.toastrSuccess("You successfully unregistered channel: " + channelName);
            if (_this.xcvr.channelsToUnregister.length > 0)
                setTimeout(function () { _this.onClickNamedUnregister(); });
        }, function (errorMessage) {
            _this.ac.toastrError("Error: " + errorMessage);
        });
    };
    NotificationComponent.prototype.onUpdateSubscriptions = function () {
        var _this = this;
        this.xcvr.onUpdateSubscriptions(function () {
            _this.ac.toastrSuccess("Update to subscription was successfully!");
        }, function (errorMessage) {
            _this.ac.toastrError("Error: " + errorMessage);
        });
    };
    //#endregion
    //#region Button Control
    NotificationComponent.prototype.shouldRegistrationBeDisabled = function () {
        if (this.xcvr.channelRegistration.name.trim().length === 0 || this.xcvr.channelRegistered || !navigator.onLine)
            return true;
        return false;
    };
    NotificationComponent.prototype.shouldNamedUnregistrationBeDisabled = function () {
        if (this.xcvr.channelsToUnregister.length === 0)
            return true;
        return false;
    };
    NotificationComponent.prototype.shouldUnregistrationBeDisabled = function () {
        if (!this.xcvr.channelRegistered || this.xcvr.channelUnregistrationInProcess)
            return true;
        return false;
    };
    NotificationComponent.prototype.shouldSendBeDisabled = function () {
        if (this.textToSend.trim().length === 0)
            return true;
        if (!this.xcvr.channelRegistered && navigator.onLine)
            return true;
        return false;
    };
    //#endregion
    //#region Help System
    NotificationComponent.prototype.onClickHelp = function () {
        var _this = this;
        this.md.modalDialogTitle = "Help on Notification";
        this.md.showOkButton = true;
        this.md.isClosable = true;
        this.md.desiredWidth = 750;
        this.md.desiredHeight = 425;
        this.showModalDialog = false;
        setTimeout(function () {
            _this.showModalDialog = true;
        });
        this.md.dialogButtonCallback = function (buttonClicked) {
            if (buttonClicked === "ok") {
                _this.md.closeDialog();
            }
        };
    };
    tslib_1.__decorate([
        ViewChild(SpeechToText),
        tslib_1.__metadata("design:type", SpeechToText)
    ], NotificationComponent.prototype, "s2T", void 0);
    tslib_1.__decorate([
        ViewChild(TextToSpeech),
        tslib_1.__metadata("design:type", TextToSpeech)
    ], NotificationComponent.prototype, "t2S", void 0);
    tslib_1.__decorate([
        ViewChild(ModalDialog),
        tslib_1.__metadata("design:type", ModalDialog)
    ], NotificationComponent.prototype, "md", void 0);
    NotificationComponent = tslib_1.__decorate([
        Component({
            // #region template
            templateUrl: "./notification.component.html"
            // #endregion
        }),
        tslib_1.__metadata("design:paramtypes", [AppConfig, MessagePump, ChangeDetectorRef, AppServices])
    ], NotificationComponent);
    return NotificationComponent;
}());
export { NotificationComponent };
//# sourceMappingURL=notification.component.js.map