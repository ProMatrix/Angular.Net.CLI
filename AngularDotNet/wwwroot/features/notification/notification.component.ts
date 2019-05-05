//#region Imports
import { Component, ViewChild, ChangeDetectorRef } from "@angular/core";
// services
import { AppConfig } from "../../common/appConfig";
import { MessagePump } from "../../common/messagePump";
import { AppServices } from "../../shared/ng2-apphelper/appServices";
import { SpeechToText } from "../../shared/ng2-mobiletech/speechToText";
import { TextToSpeech } from "../../shared/ng2-mobiletech/textToSpeech";
import { ToastrService } from 'ngx-toastr';
import { ModalDialog } from "../../shared/ng2-animation/modalDialog";

import * as _ from "lodash";
// models
import { ChannelRegistration, GetAllChannels, ChannelMessage } from "../../shared/client-side-models/channelInfo";
//#endregion

@Component({
  // #region template
  template: "\n<speech-to-text [isVisible]=\"showSpeechToText\"></speech-to-text>\n<text-to-speech [isVisible]=\"showTextToSpeech\"></text-to-speech>\n\n<modal-dialog class=\"text-primary\" [isVisible]=\"showModalDialog\">\n    <div style=\"margin: 10px; height: 285px; overflow-y: scroll; \">\n\n        <div style=\"text-align: center; font-weight: bold; \">\n            OVERVIEW\n        </div>\n        <div>\n            The Notification feature is a type of messaging system. The system will send and receive notifications, but is not limited to text. It is also possible to send and receive objects and collection.\n        </div>\n        <div style=\"text-align: center; font-weight: bold; \">\n            Steps to Send a Notification\n        </div>\n        <div>\n            1)	Register the channel by entering the channel name in the \"Channel Name\" textbox.\n            <br />\n            &nbsp;&nbsp;&nbsp;&nbsp;The channel name can be any name you choose\n            <br />\n            2)	Click the \"Register\" button\n            <br />\n            3)	Enter text in the \"Transmit Message(s)\" textbox\n            <br />\n            4)	Click the send button\n        </div>\n        <div style=\"text-align: center; font-weight: bold; \">\n            Steps to Receive a Notification\n        </div>\n        <div>\n            1)	Register the channel, as you did in step 1 above\n            <br />\n            2)	From the \"Receiving Subscription(s)\" list box, select which channel(s) that you want\n            <br />\n            &nbsp;&nbsp;&nbsp;&nbsp;to receive notifications from. This can be your own channel\n            <br />\n            3)	Now when the channels that you have subscribed to send notifications, you will see the channel name along with the message, in the \"Received Message(s)\" textbox\n        </div>\n        <br />\n        <div style=\"text-align: center; font-weight: bold; \">\n            Composing a Text Message\n        </div>\n        <div>\n            You can enter text without the keyboard by using the \"Speech to Text\" converter.\n            To the right of the \"Transmit Message(s)\" textbox is a microphone icon. Click this icon and begin speaking. Your speech will be converted to text.\n        </div>\n        <br />\n        <div style=\"text-align: center; font-weight: bold; \">\n            Voice Activated Commands\n        </div>\n        <div>\n            You can activate commands without the keyboard or mouse by using the \"Speech to Text\" converter. Click the microphone and begin speaking. Your voice commands will initiate the notification commands.\n            <br /><br />\n            Here is an example registering a channel named \"Jupiter Station\".\n            <br />\n            1)	Click on the microphone icon\n            <br />\n            2)	Speak: Computer, register channel \"Jupiter Station\"\n        </div>\n        <br />\n        <div style=\"text-align: center; font-weight: bold; \">\n            Other Voice Activate Commands\n        </div>\n        <div>\n            Computer, subscribe to channel \"Jupiter Station\"\n            <br />\n            Computer, unregister channel\n            <br />\n            Computer, send message\n            <br />\n            Computer, clear text\n            <br />\n        </div>\n    </div>\n\n</modal-dialog>\n\n<view-fader [isViewVisible]=\"isViewVisible\">\n    <div class=\"row\">\n        <div class=\"col-5\">\n            <h4 class=\"feature-subtitle\">Registration</h4>\n            <div class=\"feature-registration\">\n                <div style=\"margin: 5px;\">\n                    <div style=\"margin-left: 10px;\">* Channel Name</div>\n                    <input [disabled]=\"xcvr.channelRegistered\" [(ngModel)]=\"xcvr.channelRegistration.name\" class=\"form-control\" type=\"text\" style=\"width: 100%; margin-right: 10px; color: #007aff; text-transform: uppercase;\" />\n                    <button *ngIf=\"!xcvr.channelRegistered\" [disabled]=\"shouldRegistrationBeDisabled()\" style=\"margin-top: 10px; float: right; \" (click)=\"onClickRegister()\" class=\"btn btn-primary\" title=\"Register Channel\">Register</button>\n                    <button *ngIf=\"xcvr.channelRegistered\" [disabled]=\"shouldUnregistrationBeDisabled()\" style=\"margin-top: 10px; float: right; \" (click)=\"onClickUnregister()\" class=\"btn btn-primary\" title=\"Unregister Channel\">Unregister</button>\n                    <div style=\"height: 50px; width: 100%; \"></div>\n                </div>\n            </div>\n            <br />\n            <h4 class=\"feature-subtitle\">Registered Channels</h4>\n            <div class=\"feature-registration\">\n                <div style=\"margin: 5px;\">\n                        <select [(ngModel)]=\"xcvr.channelsToUnregister\" [disabled]=\"true\" class=\"form-control text-primary\" size=\"5\">\n                        <option *ngFor=\"let channel of xcvr.getOrderedAllRegisteredChannels()\" [value]=\"channel.name\">{{channel.name}}</option>\n                    </select>\n                    <div style=\"height: 50px; width: 100%; \"></div>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-1\"></div>\n        <div class=\"col-5\">\n            <h4 class=\"feature-subtitle\">Transceiver</h4>\n\n            <div class=\"feature-transceiver\">\n                <div>\n                    <span>\n                        <a href=\"javascript:void(0);\" (click)=\"onClickTextToSpeech()\" style=\"color: cornflowerblue; float:left; cursor: pointer; font-size: 22px; \" title=\"Text-to-speech\"> <i class=\"fa fa-volume-up fa\"></i></a>\n                        <span style=\"margin-left: 70px; \">Transmit Message(s)</span>\n                        <a href=\"javascript:void(0);\" (click)=\"onClickSpeechToText()\" style=\"color: cornflowerblue; float:right; cursor: pointer; font-size: 24px; \" title=\"Speech-to-text\"><i class=\"fa fa-microphone fa\"></i></a>\n                    </span>\n                    <textarea *ngIf=\"showTextArea\" [spellcheck]=\"spellCheck\" [rows]=\"getRowCount()\" [(ngModel)]=\"textToSend\" class=\"form-control textToSend\" type=\"text\" style=\"width: 100%; margin-right: 10px; color: #007aff;\"></textarea>\n                    <a *ngIf=\"!spellCheck\" href=\"javascript:void(0);\" (click)=\"onClickSpellCheck(true)\" style=\"color: red; float:left; cursor: pointer; margin-top: 5px; \" title=\"Spell Checking: Off\"><i class=\"fa fa-check fa\"></i></a>\n                    <a *ngIf=\"spellCheck\" href=\"javascript:void(0);\" (click)=\"onClickSpellCheck(false)\" style=\"color: green; float:left; cursor: pointer; margin-top: 5px; \" title=\"Spell Checking: On\"><i class=\"fa fa-check fa\"></i></a>\n                    <span style=\"float: left; margin-left: 5px; margin-top: 7px; font-size: 16px; \">Spell Checking</span>\n                    <a href=\"javascript:void(0);\" (click)=\"onClickClearText()\" style=\"color: cornflowerblue; cursor: pointer; float: left; margin-top: 5px; margin-left: 50px; font-size: 22px; \" title=\"Clear Text\"><i class=\"fa fa-recycle fa\"></i></a>\n\n                    <button [disabled]=\"shouldSendBeDisabled()\" style=\"margin-top: 5px; float: right; \" (click)=\"onClickSendMessage()\" class=\"btn btn-primary\" title=\"Send Message\">Send</button>\n                    <br /><br />\n                    <div style=\"margin-left: 10px;\">Receiving Subscription(s)</div>\n                    <select [(ngModel)]=\"xcvr.channelRegistration.subscriptions\" multiple=\"multiple\" class=\"form-control text-primary\" size=\"3\" (change)=\"onUpdateSubscriptions()\">\n                        <option *ngFor=\"let channel of xcvr.getOrderedChannelForSubscriptions()\" [value]=\"channel.name\">{{channel.name}}</option>\n                    </select>\n                    <span>Received Message(s)</span>\n                    <textarea disabled=\"disabled\" [rows]=\"4\" class=\"form-control\" type=\"text\" style=\"width: 100%; margin-right: 10px; color: #007aff;\">{{textReceived}}</textarea>\n                </div>\n            </div>\n        </div>\n        <div (click)=\"onClickHelp()\" style=\"width: 36px; height: 36px; \">\n            <i  style=\"color: cornflowerblue; cursor: pointer; font-size: 36px; \" title=\"Help on Notification\" class=\"fa fa-question-circle fa\"></i>\n        </div>\n        <div class=\"col-1\"></div>\n    </div>\n</view-fader>\n\n"/* this was squashed */,
  styles: ["\n.feature-title {\n    color: #007aff;\n    background-color: #dfdfdf;\n    padding: 10px;\n    width: 300px;\n    height: 60px;\n    text-align: center;\n    border-radius: 25px;\n}\n\n.feature-subtitle {\n    color: #007aff;\n    background-color: #dfdfdf;\n    font-family: px-neuropol;\n    padding: 10px;\n    width: 400px;\n    height: 60px;\n    text-align: center;\n    border-radius: 25px;\n}\n\n.feature-registration {\n    color: #007aff;\n    background-color: #dfdfdf;\n    padding: 10px;\n    width: 400px;\n    text-align: justify;\n    border-radius: 25px;\n    font-size: 20px;\n}\n\n.feature-transceiver {\n    color: #007aff;\n    background-color: #dfdfdf;\n    padding: 10px;\n    width: 400px;\n    text-align: justify;\n    border-radius: 25px;\n    font-size: 20px;\n}"/* this was squashed */]
  // #endregion
})
export class NotificationComponent {

  //#region Initialization
  @ViewChild(SpeechToText) s2T: SpeechToText;
  @ViewChild(TextToSpeech) t2S: TextToSpeech;
  @ViewChild(ModalDialog) md: ModalDialog;
  private isViewVisible = false;
  private textToSend = "";
  private textReceived = "";
  private showTextArea = true;
  private speechRecognitionOn = false;
  private speechRecognitionPaused = false;
  private recognition: any;
  private newSentence: boolean;
  private showSpeechToText = false;
  private showTextToSpeech = false;
  private spellCheck = false;
  private readonly textAreaMinRowCount = 3;
  private showModalDialog = false;

  constructor(private readonly ac: AppConfig, private readonly toastr: ToastrService, private readonly xcvr: MessagePump, private readonly cd: ChangeDetectorRef, private readonly as: AppServices) {
    window.ononline = () => {
      this.onlineCallback();
    };
    window.onoffline = () => {
      this.offlineCallback();
    };
  }

  private onlineCallback() {
    if (this.xcvr.setToAutoRegister) {
      this.onClickRegister();
    }
  }

  private offlineCallback() {
    this.xcvr.setToOffline();
  }

  private ngOnInit() {

    this.ac.waitUntilInitialized(() => {
      this.xcvr.getAllRegisteredChannels(() => { }, (errorMessage) => {
        this.toastr.error(`Error: ${errorMessage}`);
      });

      this.isViewVisible = true;
      window.onbeforeunload = () => {
        if (this.xcvr.channelRegistered) {
          this.onClickUnregister();
        }
      };
    });

  }
  //#endregion

  //#region S2T & T2S:
  private unavailableFeature(feature: string) {
    this.toastr.info(feature + " is unavailable with this browser...");
    setTimeout(() => {
      this.toastr.info("Upgrade to Google Chrome!");
    }, 5000);
  }

  private onClickSpeechToText() {
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
    setTimeout(() => {
      this.showSpeechToText = true;
    });
  }

  private onRestartS2TCallback() {
    // in this case, don't clear the text on restart
  }

  private onResultsS2TCallback(speech: string) {
    if (!this.voiceActivation(speech)) {
      if (this.xcvr.channelRegistered) {
        this.textToSend += speech + "\n";
        this.cd.detectChanges();
      } else {
        this.audioResponses("can't compose message");
      }
    }
  }

  private voiceActivation(command: string): boolean {
    switch (command.toLowerCase().trim()) {
      case "computer register channel":
        if (this.shouldRegistrationBeDisabled()) {
          this.audioResponses("can't register channel");
        } else
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
  }

  private voiceRegisterChannel(command: string) {
    // protocol: "computer register channel A"
    const commandParts = command.split(" ");
    if (commandParts.length < 4) {
      this.audioResponses("what do you want");
      return;
    }
    this.xcvr.channelRegistration.name = this.getChannelNameFromCommand(command, 3);
    this.onClickRegister();
  }

  private getChannelNameFromCommand(command: string, index: number): string {
    const commandParts = command.split(" ");
    let channelName = "";
    for (let i = index; i < commandParts.length; i++) {
      channelName += commandParts[i] + " ";
    }
    return channelName.trim().toUpperCase();
  }

  private voiceSubscribeToChannel(command: string) {
    // protocol: "computer subscribe to channel A"
    const commandParts = command.split(" ");
    if (commandParts.length < 5) {
      this.audioResponses("what do you want");
      return;
    }
    let channelName = this.getChannelNameFromCommand(command, 4);

    // is channel already subscribed to?
    const already = _.filter(this.xcvr.channelRegistration.subscriptions, i => (i === channelName));
    if (already.length > 0) {
      this.audioResponses("channel already subscribed", channelName);
      return;
    }

    const available = _.filter(this.xcvr.getOrderedChanneNameslForSubscriptions(), i => (i === channelName));
    if (available.length !== 1) {
      this.audioResponses("channel not available", channelName);
      return;
    }
    this.xcvr.channelRegistration.subscriptions.push(channelName);
    this.onUpdateSubscriptions();
  }

  private audioResponses(response: string, value?: string) {
    let audioResponse = "";
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
    this.toastr.error(audioResponse);
  }

  private onClickTextToSpeech() {
    this.textToSpeech(this.textToSend);
  }

  private textToSpeech(speech: string) {
    if (!this.t2S.featureIsAvailable) {
      this.unavailableFeature("Text to Speech");
      return;
    }
    this.t2S.textToSpeak = speech;
    this.t2S.isClosable = true;
    this.t2S.positionTop = -75;
    this.t2S.owner = this;
    this.t2S.onChangeCallback = "onT2SChangeCallback";
    setTimeout(() => {
      this.t2S.setupT2S();
      this.t2S.Start();
    });
  }

  private onT2SChangeCallback() {
    // Speech completed, paused, or stopped
  }

  private onClickClearText() {
    this.textToSend = "";
  }

  private onClickSpellCheck(spellCheck: boolean) {
    this.spellCheck = spellCheck;

    if (this.spellCheck) {
      setTimeout(() => {
        const textArea = (document.querySelector(".textToSend") as HTMLFormElement);

        if (this.spellCheck)
          this.as.spellChecker(textArea);
        else
          textArea.focus();
      });
    } else {
      setTimeout(() => {
        this.showTextArea = false;
        setTimeout(() => {
          this.showTextArea = true;
        });
      });
    }
  }

  private getRowCount(): number {
    const count: number = (document.querySelector(".textToSend") as HTMLFormElement).value.split("\n").length;
    if (count > this.textAreaMinRowCount)
      return count;
    else
      return this.textAreaMinRowCount;
  }
  // #endregion

  //#region Message Control
  private updateMessagesReceived() {
    this.textReceived = "";
    this.xcvr.receiveMessageQueue.forEach((receiveMessage) => {
      if (this.t2S.featureIsAvailable)
        this.textToSpeech("channel " + receiveMessage.sendersName + " sends, " + receiveMessage.message.toString());
      const sendersName = _.filter(this.xcvr.channelForSubscriptions, a => (a.name === receiveMessage.sendersName))[0].name;
      this.textReceived += sendersName + "> " + receiveMessage.message.toString() + "\n";
    });
  }

  private onClickSendMessage() {
    // queue message before sending
    this.xcvr.transmitMessageQueue.push(this.getMessageObj(this.textToSend));
    this.s2T.onClickPause();
    this.xcvr.queueChannelMessage(() => {
      this.toastr.success("Message sent successfully!");
    }, (errorMessage) => {
      this.toastr.error(`Error: ${errorMessage}`);
    }, () => {
      this.toastr.info("Offline: Message is cached for sending when back online");
    }
    );
  }

  private getMessageObj(message): ChannelMessage {
    let channelMessage = new ChannelMessage();
    channelMessage.type = "ChannelMessage";
    channelMessage.syncAction = "dispatchMessage";
    channelMessage.sendersName = this.xcvr.channelRegistration.name;
    channelMessage.message = message;
    //channelMessage.message = new Date(); //cool! because on the server, this looks like a DateTime in UTC
    return channelMessage;
  }

  private synchronize() {
    this.xcvr.synchronize(() => {
      // messageReceivedCallback
      this.updateMessagesReceived();
    }, () => {
      this.toastr.success(`You successfully unregistered channel: ${this.xcvr.channelRegistration.name}`);
    },
      (errorMessage) => {
        this.toastr.error(`Error: ${errorMessage}`);
      });
  }
  //#endregion

  //#region Registration
  private onClickRegister() {
    this.xcvr.channelRegistration.name = this.xcvr.channelRegistration.name.toUpperCase();
    this.xcvr.register(() => {
      this.toastr.success(`You successfully registered channel: ${this.xcvr.channelRegistration.name}`);
      this.xcvr.setToAutoRegister = false;
      if (this.xcvr.transmitMessageQueue.length > 0) {
        this.xcvr.sendChannelMessage(() => {
          this.synchronize();
        }, (errorMessage) => { }, () => { });
      } else
        this.synchronize();

    }, (errorMessage) => {
      this.toastr.error(`Error: ${errorMessage}`);
    });
  }

  private onClickUnregister() {
    this.xcvr.unregister(() => {
      // no message
    }, (errorMessage) => {
      this.toastr.error(`Error: ${errorMessage}`);
    });
    this.as.sleep(500);
  }

  private onClickNamedUnregister() {
    let channelName = "";
    if (this.xcvr.channelsToUnregister.includes(this.xcvr.channelRegistration.name))
      channelName = this.xcvr.channelRegistration.name;
    else
      channelName = this.xcvr.channelsToUnregister[0];
    this.xcvr.namedUnregister(channelName, () => {
      _.pull(this.xcvr.channelsToUnregister, channelName);
      this.toastr.success(`You successfully unregistered channel: ${channelName}`);
      if (this.xcvr.channelsToUnregister.length > 0)
        setTimeout(() => { this.onClickNamedUnregister(); });
    }, (errorMessage) => {
      this.toastr.error(`Error: ${errorMessage}`);
    });
  }

  private onUpdateSubscriptions() {
    this.xcvr.onUpdateSubscriptions(() => {
      this.toastr.success("Update to subscription was successfully!");
    }, (errorMessage) => {
      this.toastr.error(`Error: ${errorMessage}`);
    });
  }
  //#endregion

  //#region Button Control
  private shouldRegistrationBeDisabled(): boolean {
    if (this.xcvr.channelRegistration.name.trim().length === 0 || this.xcvr.channelRegistered || !navigator.onLine)
      return true;
    return false;
  }

  private shouldNamedUnregistrationBeDisabled(): boolean {
    if (this.xcvr.channelsToUnregister.length === 0)
      return true;
    return false;
  }

  private shouldUnregistrationBeDisabled(): boolean {
    if (!this.xcvr.channelRegistered || this.xcvr.channelUnregistrationInProcess)
      return true;
    return false;
  }

  private shouldSendBeDisabled(): boolean {
    if (this.textToSend.trim().length === 0)
      return true;
    if (!this.xcvr.channelRegistered && navigator.onLine)
      return true;
    return false;
  }
  //#endregion

  //#region Help System
  private onClickHelp() {
    this.md.modalDialogTitle = "Help on Notification";
    this.md.showOkButton = true;
    this.md.isClosable = true;
    this.md.desiredWidth = 750;
    this.md.desiredHeight = 425;
    this.showModalDialog = false;
    setTimeout(() => {
      this.showModalDialog = true;
    });
    this.md.dialogButtonCallback = (buttonClicked: string) => {
      if (buttonClicked === "ok") {
        this.md.closeDialog();
      }
    };
  }
  //#endregion
}
