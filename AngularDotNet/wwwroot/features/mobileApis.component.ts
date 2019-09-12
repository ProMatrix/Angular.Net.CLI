// #region Imports
import { Component, ViewChild, ChangeDetectorRef, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// services
import { AppConfig } from '../common/appConfig';
import { SpeechToTextComponent } from '../shared/ng2-mobiletech/speechToText';
import { TextToSpeechComponent } from '../shared/ng2-mobiletech/textToSpeech';
import { GoogleMapsComponent } from '../shared/ng2-mobiletech/googleMaps';
import { AppServices } from '../shared/ng2-apphelper/appServices';
import { CellCarrier, TextMessage } from '../shared/client-side-models/buildModels';
// ngxs
import { Store } from '@ngxs/store';
import {
  ChangeTabIndex, ToggleSpellChecking, UpdateTextMessage, ClearTextMessage,
  ChangeMobileCarrier, UpdateMobileNumber, MobileApiInit
} from './mobileApis.component.actions';
import { MatButtonToggleGroup } from '@angular/material';
import { MobileApisState, MobileApisStateModel } from './mobileApis.component.state';

// #endregions

// #region Constructor
@Component({
  // #region template
  templateUrl: 'mobileApis.component.html'
  // #endregion
})
export class MobileApisComponent implements OnInit {
  @ViewChild(SpeechToTextComponent, { static: true }) s2T: SpeechToTextComponent;
  @ViewChild(TextToSpeechComponent, { static: true }) t2S: TextToSpeechComponent;
  @ViewChild(GoogleMapsComponent, { static: true }) gm: GoogleMapsComponent;
  private selectedIndex = 0;
  private isViewVisible = false;
  private speechRecognitionOn = false;
  private speechRecognitionPaused = false;
  private recognition: any;
  private newSentence: boolean;
  private showSpeechToText = false;
  private showTextToSpeech = false;
  private latitude = 0;
  private longitude = 0;
  private address = '';
  private zipcode = '';
  private showTextArea = true;
  private showToggleGroup = false;
  private mobileNumber: number;
  private cellCarriers = new Array<CellCarrier>();
  private readonly textAreaMinRowCount = 4;
  private readonly mobileNumberMaxLength = 10;
  private readonly gmHeaderHeight = 80;
  private readonly gmTextHeight = 230;
  private mobileApisState = new MobileApisStateModel();

  constructor(
    private store: Store,
    private readonly ac: AppConfig,
    private readonly cd: ChangeDetectorRef,
    private readonly as: AppServices) {

    this.store.dispatch(new MobileApiInit(this.ac.ngAction));
    this.stateChanges();
  }

  private stateChanges() {
    this.store.subscribe(state => {
      if (state.mobileApis) {
        const mobileApisState = state.mobileApis as MobileApisStateModel;
        mobileApisState.previousState = this.mobileApisState;
        this.mobileApisState = mobileApisState;

        if (mobileApisState.selectedIndex !== mobileApisState.previousState.selectedIndex) {
          this.updateTabIndex(mobileApisState.selectedIndex);
        }

        if (mobileApisState.spellCheckingEnabled !== mobileApisState.previousState.spellCheckingEnabled) {
            this.spellCheck();
        }

        if (mobileApisState.clearTextMessage !== mobileApisState.previousState.clearTextMessage) {
          setTimeout(() => {
            this.clearTextMessage();
          }, 500); // Adding motion
        }
      }
    });
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

  private onChangeTab(selectedIndex: number) {
    if (!this.ac.ngAction.isDispatching()) {
      this.store.dispatch(new ChangeTabIndex('', 'Click Tab', selectedIndex, true, -1));
    }
  }

  private updateTabIndex(selectedIndex: number) {
    this.selectedIndex = selectedIndex;
  }

  //#region Speech To Text:
  private onClickSpeechToText() {
    if (!this.s2T.featureIsAvailable) {
      this.unavailableFeature('Speech to Text');
      return;
    }
    this.s2T.owner = this;
    this.s2T.onRestartCallback = () => {
      // Don't do anything for now
    };

    this.s2T.onResultsCallback = (speech: string) => {
      this.store.dispatch(new UpdateTextMessage('', 'Enter Message', this.mobileApisState.textMessage + speech, true, -1));
      this.cd.detectChanges();
    };
    this.s2T.isClosable = true;
    this.s2T.positionTop = -75;
    this.showSpeechToText = false;
    this.store.dispatch(new UpdateTextMessage('', 'Enter Message', '', true, -1));
    setTimeout(() => {
      this.showSpeechToText = true;
    });
  }

  private onChangeTextMessage(text: string) {
    this.store.dispatch(new UpdateTextMessage('', 'Enter Message', text, true, -1));
  }

  private unavailableFeature(feature: string) {
    this.ac.toastrInfo(feature + ' is unavailable with this browser...');
    setTimeout(() => {
      this.ac.toastrInfo('Upgrade to Google Chrome!');
    }, 5000);
  }

  private onClickTextToSpeech() {
    if (!this.t2S.featureIsAvailable) {
      this.unavailableFeature('Text to Speech');
      return;
    }
    this.t2S.textToSpeak = this.mobileApisState.textMessage;
    this.t2S.isClosable = true;
    this.t2S.positionTop = -75;
    this.t2S.owner = this;
    this.t2S.onChangeCallback = (text) => {
      // Speech completed, paused, or stopped
    };
    this.showTextToSpeech = false;
    setTimeout(() => {
      this.showTextToSpeech = true;
    });
  }

  private onClickClearTextMessage() {
    this.store.dispatch(new ClearTextMessage('', 'Clear Message', true, true, -1));

  }

  private clearTextMessage() {
    this.mobileApisState.textMessage = '';
    this.mobileApisState.clearTextMessage = false;
  }

  private onClickSpellCheck(spellCheck: boolean) {
    this.store.dispatch(new ToggleSpellChecking('', 'SpellChecking', spellCheck, true, -1));
  }

  private spellCheck() {
    if (this.mobileApisState.spellCheckingEnabled) {
      const textArea = (document.querySelector('.textAreaNgModel') as HTMLFormElement);

      if (this.mobileApisState.spellCheckingEnabled) {
        this.as.spellChecker(textArea);
      } else {
        textArea.focus();
      }
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
      const count: number = (document.querySelector('.textAreaNgModel') as HTMLFormElement).value.split('\n').length;
      if (count > this.textAreaMinRowCount) {
        return count;
      } else {
        return this.textAreaMinRowCount;
      }
    } catch (e) {
      return this.textAreaMinRowCount;
    }
  }
  // #endregion

  //#region Text Messaging:
  private updateCellCarriers() {
    this.cellCarriers = new Array<CellCarrier>();
    this.ac.appSettings.cellCarriers.split(';').forEach(cellCarrier => {
      this.cellCarriers.push({ name: cellCarrier.split(':')[0], smsProfile: cellCarrier.split(':')[1] });
    });
  }

  private onChangeCarrier(carrier: string) {
    // this.store.dispatch(new ChangeMobileCarrier(carrier));
    this.shouldSendBeDisabled();
  }

  private onKeyDown(event) {
    const mobileNumber = event.target.value;

    if (event.key === 'Backspace' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      return true;
    }

    if (mobileNumber.length === this.mobileNumberMaxLength) {
      return false;
    } else {
      return true;
    }
  }

  private onKeyUp(mobileNumber: number) {
    this.mobileNumber = mobileNumber;
    if (mobileNumber.toString().length === this.mobileNumberMaxLength) {
      // this.store.dispatch(new UpdateMobileNumber(mobileNumber));
    }

  }

  private shouldSendBeDisabled() {
    if (this.mobileApisState.mobileCarrier.length === 0) {
      return true;
    }
    if (!this.mobileNumber) {
      return true;
    }
    if (this.mobileNumber.toString().length < this.mobileNumberMaxLength) {
      return true;
    }
    return false;
  }

  private onClickSend() {
    this.ac.showSpinner(true);
    this.ac.sendTextMessage({
      message: this.mobileApisState.textMessage,
      cellCarrierName: this.mobileApisState.mobileCarrier,
      mobileNumber: this.mobileApisState.mobileNumber
    }, () => {
      this.ac.showSpinner(false);
      this.playAscending(0.01);
      this.ac.toastrSuccess(`Success: Your text message has been sent to: ${this.mobileApisState.mobileNumber}`);
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
      this.as.beep(1500, 523.25, volume, 'sine', null);
      setTimeout(() => {
        this.as.beep(1500, 698.46, volume, 'sine', null);
        setTimeout(() => {
          this.as.beep(1500, 932.33, volume, 'sine', null);
          setTimeout(() => {
            this.as.beep(1500, 1244.51, volume, 'sine', null);
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
      this.gm.updateCoordinatesCallback = 'updateCoordinatesCallback';
      this.gm.updateAddressCallback = 'updateAddressCallback';
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

  private calcGmTextWidth(): number {
    if (this.ac.isPhoneSize) {
      if (this.ac.isLandscapeView) {
        return this.ac.screenWidth / 3;
      } else {
        return this.ac.screenWidth - 70;
      }
    }
    return 270;
  }

  private getGmTextWidth(): number {
    return this.calcGmTextWidth();
  }

  getMapWidth() {
    if (document.documentElement.clientWidth <= this.ac.smallWidthBreakpoint) {
      return document.documentElement.clientWidth;
    }
    if (document.documentElement.clientWidth <= this.ac.mediaQueryBreak) {
      return document.documentElement.clientWidth - (this.ac.sideNavWidth);
    }
    return document.documentElement.clientWidth - (this.ac.sideNavWidth + this.ac.mapControlsWidth);
  }

  getMapHeight() {
    if (document.documentElement.clientWidth <= this.ac.mediaQueryBreak) {
      return document.documentElement.clientHeight - (this.ac.headerHeight + this.ac.mapControlsHeight);
    }
    return document.documentElement.clientHeight - this.ac.headerHeight;
  }
  // #endregion
}

@Component({
  templateUrl: './mobileApis.component.help.html'
})
export class MobileApisHelpDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {}) { }
}
