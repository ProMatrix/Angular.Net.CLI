// #region Imports
import { Component, ViewChild, ChangeDetectorRef } from "@angular/core";
// services
import { AppConfig } from "../../common/appConfig";
import { SpeechToText } from "../../shared/ng2-mobiletech/speechToText";
import { TextToSpeech } from "../../shared/ng2-mobiletech/textToSpeech";
import { GoogleMaps } from "../../shared/ng2-mobiletech/googleMaps";
import { AppServices } from "../../shared/ng2-apphelper/appServices";
import { CellCarrier, TextMessage } from "../../shared/client-side-models/buildModels";
// ngxs
import { Store } from '@ngxs/store';
import { ToggleSpellChecking, UpdateMessage, ClearMessage, ChangeMobileCarrier, UpdateMobileNumber } from "./mobileapis.actions";
import { MatButtonToggleGroup } from '@angular/material';

// #endregions

// #region Constructor
@Component({
  // #region template
  templateUrl: "mobileApis.component.html"
  // #endregion
})
export class MobileApisComponent {
  @ViewChild(SpeechToText) s2T: SpeechToText;
  @ViewChild(TextToSpeech) t2S: TextToSpeech;
  @ViewChild(GoogleMaps) gm: GoogleMaps;
  private isViewVisible = false;
  private speechRecognitionOn = false;
  private speechRecognitionPaused = false;
  private recognition: any;
  private newSentence: boolean;
  private showSpeechToText = false;
  private showTextToSpeech = false;
  private latitude = 0;
  private longitude = 0;
  private address = "";
  private zipcode = "";
  private showTextArea = true;
  private showToggleGroup = false;
  private mobileNumber: number;
  private cellCarriers = new Array<CellCarrier>();
  private readonly textAreaMinRowCount = 4;
  private readonly mobileNumberMaxLength = 10;
  private readonly headerHeight = 190;
  private readonly sideNavWidth = 400;
  private readonly mapControlsHeight = 250;
  private readonly mapControlsWidth = 300;
  private readonly mediaQueryBreak = 1280;

  constructor(private store: Store, private readonly ac: AppConfig, private readonly cd: ChangeDetectorRef, private readonly as: AppServices) {
    this.mobileNumber = this.ac.mobileApisState.mobileNumber;
  }

  ngOnInit() {
    this.ac.waitUntilInitialized(() => {
      this.isViewVisible = true;
      this.updateCellCarriers();
      setTimeout(() => {
        this.showToggleGroup = true;
        this.initGoogleMaps();
      }, 0);
    });
  }
  // #endregion

  //#region Speech To Text:
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
    this.store.dispatch(new UpdateMessage(""));
    setTimeout(() => {
      this.showSpeechToText = true;
    });
  }

  private onRestartS2TCallback() {
    // in this case, don't clear the text on restart
  }

  private onChangeMessage(text: string) {
    this.store.dispatch(new UpdateMessage(text));
  }

  private onResultsS2TCallback(speech: string) {

    this.store.dispatch(new UpdateMessage(this.ac.mobileApisState.textMessage + speech));
    this.cd.detectChanges();
  }

  private unavailableFeature(feature: string) {
    this.ac.toastrInfo(feature + " is unavailable with this browser...");
    setTimeout(() => {
      this.ac.toastrInfo("Upgrade to Google Chrome!");
    }, 5000);
  }

  private onClickTextToSpeech() {
    if (!this.t2S.featureIsAvailable) {
      this.unavailableFeature("Text to Speech");
      return;
    }
    this.t2S.textToSpeak = this.ac.mobileApisState.textMessage;
    this.t2S.isClosable = true;
    this.t2S.positionTop = -75;
    this.t2S.owner = this;
    this.t2S.onChangeCallback = "onT2SChangeCallback";
    this.showTextToSpeech = false;
    setTimeout(() => {
      this.showTextToSpeech = true;
    });
  }

  private onT2SChangeCallback() {
    // Speech completed, paused, or stopped
  }

  private onClickClearText() {
    this.store.dispatch(new ClearMessage());
    // ??? not sure I am doing this right here?
    this.ac.mobileApisState.textMessage = "";
  }

  private onClickSpellCheck(spellCheck: boolean) {
    this.store.dispatch([new ToggleSpellChecking(spellCheck)]);
    if (this.ac.mobileApisState.spellCheckingEnabled) {
      setTimeout(() => {
        const textArea = (document.querySelector(".textAreaNgModel") as HTMLFormElement);

        if (this.ac.mobileApisState.spellCheckingEnabled)
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
    try {
      const count: number = (document.querySelector(".textAreaNgModel") as HTMLFormElement).value.split("\n").length;
      if (count > this.textAreaMinRowCount)
        return count;
      else
        return this.textAreaMinRowCount;
    } catch (e) {
      return this.textAreaMinRowCount;
    }
  }
  // #endregion

  //#region Text Messaging:
  private updateCellCarriers() {
    this.cellCarriers = new Array<CellCarrier>();
    this.ac.appSettings.cellCarriers.split(";").forEach(cellCarrier => {
      this.cellCarriers.push({ name: cellCarrier.split(":")[0], smsProfile: cellCarrier.split(":")[1] });
    });
  }

  private onChangeCarrier(carrier: string) {
    this.store.dispatch(new ChangeMobileCarrier(carrier));
    this.shouldSendBeDisabled();
  }

  private onKeyDown(event) {
    let mobileNumber = event.target.value;

    if (event.key === "Backspace" || event.key === "ArrowLeft" || event.key === "ArrowRight") {
      return true;
    }

    if (mobileNumber.length === this.mobileNumberMaxLength)
      return false;
    else
      return true;
  }

  private onKeyUp(mobileNumber: number) {
    this.mobileNumber = mobileNumber;
    if (mobileNumber.toString().length === this.mobileNumberMaxLength) {
      this.store.dispatch(new UpdateMobileNumber(mobileNumber));
    }

  }

  private shouldSendBeDisabled() {
    if (this.ac.mobileApisState.mobileCarrier.length === 0)
      return true;
    if (!this.mobileNumber)
      return true;
    if (this.mobileNumber.toString().length < this.mobileNumberMaxLength)
      return true;
    return false;
  }

  private onClickSend() {
    this.ac.showSpinner(true);
    this.ac.sendTextMessage({
      message: this.ac.mobileApisState.textMessage,
      cellCarrierName: this.ac.mobileApisState.mobileCarrier,
      mobileNumber: this.ac.mobileApisState.mobileNumber
    }, () => {
      this.ac.showSpinner(false);
      this.playAscending(0.01);
      this.ac.toastrSuccess(`Success: Your text message has been sent to: ${this.ac.mobileApisState.mobileNumber}`);
    }, (errorMessage) => {
      this.ac.showSpinner(false);
      this.ac.toastrError(`Error: ${errorMessage}`);

    }
    );
  }

  private playAscending(volume: number) {

    setTimeout(() => {
      this.play4Ths(volume);
      setTimeout(() => {
        this.play4Ths(volume / 2);
        setTimeout(() => {
          this.play4Ths(volume / 4);
          setTimeout(() => {
            this.play4Ths(volume / 8);
          }, 500);
        }, 500);
      }, 500);
    }, 500);
  }

  private play4Ths(volume: number) {
    setTimeout(() => {
      this.as.beep(1500, 523.25, volume, "sine", null);
      setTimeout(() => {
        this.as.beep(1500, 698.46, volume, "sine", null);
        setTimeout(() => {
          this.as.beep(1500, 932.33, volume, "sine", null);
          setTimeout(() => {
            this.as.beep(1500, 1244.51, volume, "sine", null);
          }, 250);
        }, 250);
      }, 250);
    }, 250);
  }

  // #endregion

  //#region GoogleMaps:
  private initGoogleMaps() {
    setTimeout(() => {
      this.gm.owner = this;
      this.gm.updateCoordinatesCallback = "updateCoordinatesCallback";
      this.gm.updateAddressCallback = "updateAddressCallback";
      this.gm.googleMapKey = this.ac.appSettings.googleMapKey;
      this.gm.initialize();
    });
  }

  private updateAddressCallback(address: string, zipcode: string) {
    this.address = address;
    this.zipcode = zipcode;
  }

  private updateCoordinatesCallback(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.gm.lookupAddress();
  }

  private shouldUpdateByAddressBeDisabled() {
    return this.address.trim().length === 0 || this.zipcode.toString().trim().length < 5;
  }

  private readonly gmHeaderHeight = 80;
  private readonly gmTextHeight = 230;

  private calcGmTextWidth(): number {
    if (this.ac.isPhoneSize) {
      if (this.ac.isLandscapeView)
        return this.ac.screenWidth / 3;
      else
        return this.ac.screenWidth - 70;
    }
    return 270;
  }

  private getGmTextWidth(): number {
    return this.calcGmTextWidth();
  }

  getMapWidth() {
    if (document.documentElement.clientWidth <= 720)
      return document.documentElement.clientWidth;
    if (document.documentElement.clientWidth <= this.mediaQueryBreak)
      return document.documentElement.clientWidth - (this.sideNavWidth);
    return document.documentElement.clientWidth - (this.sideNavWidth + this.mapControlsWidth);
  }

  getMapHeight() {
    if (document.documentElement.clientWidth <= this.mediaQueryBreak)
      return document.documentElement.clientHeight - (this.headerHeight + this.mapControlsHeight);
    return document.documentElement.clientHeight - this.headerHeight;
  }

  getGmMapWidth() {
    return "200px";
  }

  getGmMapHeight() {
    return "200px";
  }

  // #endregion
}
