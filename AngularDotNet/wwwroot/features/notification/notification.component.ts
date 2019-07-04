//#region Imports
import { Component, ViewChild, ChangeDetectorRef, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// services
import { AppConfig } from "../../common/appConfig";
import { MessagePump } from "../../common/messagePump";
import { AppServices } from "../../shared/ng2-apphelper/appServices";
import { SpeechToText } from "../../shared/ng2-mobiletech/speechToText";
import { TextToSpeech } from "../../shared/ng2-mobiletech/textToSpeech";
import { ModalDialog } from "../../shared/ng2-animation/modalDialog";

import * as _ from "lodash";
// models
import { ChannelRegistration, GetAllChannels, ChannelMessage } from "../../shared/client-side-models/channelInfo";
//#endregion

@Component({
  // #region template
  templateUrl: "./notification.component.html"
  // #endregion
})
export class NotificationComponent {

  //#region Initialization
  @ViewChild(SpeechToText, { static: true }) s2T: SpeechToText;
  @ViewChild(TextToSpeech, { static: true }) t2S: TextToSpeech;
  @ViewChild(ModalDialog, { static: true }) md: ModalDialog;
  private isViewVisible = true;
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

  constructor(private readonly ac: AppConfig, private readonly xcvr: MessagePump, private readonly cd: ChangeDetectorRef, private readonly as: AppServices) {
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
        this.ac.toastrError(`Error: ${errorMessage}`);
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
    this.ac.toastrInfo(`${feature} " is unavailable with this browser...`);
    setTimeout(() => {
      this.ac.toastrInfo("Upgrade to Google Chrome!");
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
    this.ac.toastrError(audioResponse);
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
        const textArea = (document.querySelector(".text-to-send") as HTMLFormElement);
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
    const count: number = (document.querySelector(".text-to-send") as HTMLFormElement).value.split("\n").length;
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
    if (this.s2T.featureIsAvailable)
      this.s2T.onClickPause();
    this.xcvr.queueChannelMessage(() => {
      this.ac.toastrSuccess("Message sent successfully!");
    }, (errorMessage) => {
      this.ac.toastrError(`Error: ${errorMessage}`);
    }, () => {
      this.ac.toastrInfo("Offline: Message is cached for sending when back online");
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
      this.ac.toastrSuccess(`You successfully unregistered channel: ${this.xcvr.channelRegistration.name}`);
    },
      (errorMessage) => {
        this.ac.toastrError(`Error: ${errorMessage}`);
      });
  }
  //#endregion

  //#region Registration
  private onClickRegister() {
    this.xcvr.channelRegistration.name = this.xcvr.channelRegistration.name.toUpperCase();
    this.xcvr.register(() => {
      this.ac.toastrSuccess(`You successfully registered channel: ${this.xcvr.channelRegistration.name}`);
      this.xcvr.setToAutoRegister = false;
      if (this.xcvr.transmitMessageQueue.length > 0) {
        this.xcvr.sendChannelMessage(() => {
          this.synchronize();
        }, (errorMessage) => { }, () => { });
      } else
        this.synchronize();

    }, (errorMessage) => {
      this.ac.toastrError(`Error: ${errorMessage}`);
    });
  }

  private onClickUnregister() {
    this.xcvr.unregister(() => {
      // no message
    }, (errorMessage) => {
      this.ac.toastrError(`Error: ${errorMessage}`);
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
      this.ac.toastrSuccess(`You successfully unregistered channel: ${channelName}`);
      if (this.xcvr.channelsToUnregister.length > 0)
        setTimeout(() => { this.onClickNamedUnregister(); });
    }, (errorMessage) => {
      this.ac.toastrError(`Error: ${errorMessage}`);
    });
  }

  private onUpdateSubscriptions() {
    this.xcvr.onUpdateSubscriptions(() => {
      this.ac.toastrSuccess("Update to subscription was successfully!");
    }, (errorMessage) => {
      this.ac.toastrError(`Error: ${errorMessage}`);
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

@Component({
  templateUrl: "./notification.component.help.html"
})
export class NotificationHelpDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {
  }) {
    // data contains values passed by the router
  }
}
