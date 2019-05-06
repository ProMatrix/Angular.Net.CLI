// #region Imports
import { Component, ViewChild, ChangeDetectorRef } from "@angular/core";
// services
import { AppConfig } from "../../common/appConfig";
import { ToastrService } from "ngx-toastr";
import { SpeechToText } from "../../shared/ng2-mobiletech/speechToText";
import { TextToSpeech } from "../../shared/ng2-mobiletech/textToSpeech";
import { GoogleMaps } from "../../shared/ng2-mobiletech/googleMaps";
import { AppServices } from "../../shared/ng2-apphelper/appServices";
import { CellCarrier, TextMessage } from "../../shared/client-side-models/buildModels";
// ngxs
import { Store } from '@ngxs/store';
import { ToggleSpellChecking, UpdateMessage, ClearMessage, ChangeMobileCarrier, UpdatePhoneNumber } from "./mobileapis.actions";

// #endregions

// #region Constructor
@Component({
  // #region template
  templateUrl: "./mobileApis.component.html",
  styleUrls: ["./mobileApis.component.css"]
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
  private readonly textAreaMinRowCount = 4;
  private selectedFeature = "";
  private phoneNumber: number;

  constructor(private store: Store, private readonly ac: AppConfig, private readonly toastr: ToastrService, private readonly cd: ChangeDetectorRef, private readonly as: AppServices) {
  }

  ngOnInit() {
    this.ac.waitUntilInitialized(() => {
      this.isViewVisible = true;
      setTimeout(() => {
        this.selectedFeature = "speech2Text";
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
    //this.store.dispatch(new mobileApisActions.UpdateMessage(""));
    setTimeout(() => {
      this.showSpeechToText = true;
    });
  }

  private onRestartS2TCallback() {
    // in this case, don't clear the text on restart
  }

  private onFocusOut(text: string) {
    //this.store.dispatch(new mobileApisActions.UpdateMessage(text));
  }

  private onResultsS2TCallback(speech: string) {

    //this.store.dispatch(new mobileApisActions.UpdateMessage(this.ac.textMessage + speech));
    this.cd.detectChanges();
  }

  private unavailableFeature(feature: string) {
    this.toastr.info(feature + " is unavailable with this browser...");
    setTimeout(() => {
      this.toastr.info("Upgrade to Google Chrome!");
    }, 5000);
  }

  private onClickTextToSpeech() {
    if (!this.t2S.featureIsAvailable) {
      this.unavailableFeature("Text to Speech");
      return;
    }
    this.t2S.textToSpeak = this.ac.textMessage;
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
    //this.store.dispatch(new mobileApisActions.ClearMessage());
  }

  private onClickSpellCheck(spellCheck: boolean) {
    this.store.dispatch([new ToggleSpellChecking(spellCheck)]);

    this.ac.spellcheckingEnabled = !this.ac.spellcheckingEnabled;

    if (this.ac.spellcheckingEnabled) {
      setTimeout(() => {
        const textArea = (document.querySelector(".textAreaNgModel") as HTMLFormElement);

        if (this.ac.spellcheckingEnabled)
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
    const count: number = (document.querySelector(".textAreaNgModel") as HTMLFormElement).value.split("\n").length;
    if (count > this.textAreaMinRowCount)
      return count;
    else
      return this.textAreaMinRowCount;
  }
  // #endregion

  //#region Text Messaging:
  private getCellCarriers(): Array<CellCarrier> {
    let cellCarriers = new Array<CellCarrier>();
    this.ac.appSettings.cellCarriers.split(";").forEach(cellCarrier => {
      cellCarriers.push({ name: cellCarrier.split(":")[0], smsProfile: cellCarrier.split(":")[1] });
    });
    return cellCarriers;
  }

  private onChangeCarrier(carrier: string) {
    //this.store.dispatch(new mobileApisActions.ChangeMobileCarrier(carrier));
  }

  private onChangePhoneNumber(phoneNumber: string) {
    //this.store.dispatch(new mobileApisActions.UpdatePhoneNumber(phoneNumber));
  }

  private onClickTextMessaging() {
    this.selectedFeature = "textMessaging";
  }

  private limitPhoneNoInput(phoneNumber: string) {
    if (phoneNumber.length > 10) {
      return false;
    }
  }

  private shouldSendBeDisabled(): boolean {
    if (!this.ac.mobileApisStateSlice.mobileCarrier || this.ac.mobileApisStateSlice.phoneNumber.toString().length < 10)
      return true;
    return false;
  }

  private onClickSend() {
    this.ac.showSpinner(true);
    this.ac.sendTextMessage({
      message: this.ac.textMessage,
      cellCarrierName: this.ac.mobileApisStateSlice.mobileCarrier,
      phoneNumber: this.ac.mobileApisStateSlice.phoneNumber
    }, () => {
      this.ac.showSpinner(false);
      this.playAscending(0.01);
      this.toastr.success(`Success: Your text message has been sent to: ${this.ac.mobileApisStateSlice.phoneNumber}`);
    }, (errorMessage) => {
      this.ac.showSpinner(false);
      this.toastr.error(`Error: ${errorMessage}`);
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
  private onClickGoogleMaps() {
    this.selectedFeature = "googleMaps";
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

  private getGmMapWidth() {
    if (this.ac.isPhoneSize) {
      if (this.ac.isLandscapeView)
        return this.ac.screenWidth - (this.calcGmTextWidth() + 75);
      else
        return this.calcGmTextWidth();
    }
    return this.ac.screenWidth - 500;
  }

  private getGmMapHeight() {
    if (this.ac.isPhoneSize) {
      if (this.ac.isLandscapeView)
        return this.ac.screenHeight - (this.gmHeaderHeight);
      else {
        return this.ac.screenHeight - (this.gmTextHeight + this.gmHeaderHeight);
      }
    }
    return screen.availHeight / 2;
  }

  // #endregion

}
