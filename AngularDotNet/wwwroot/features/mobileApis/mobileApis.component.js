import * as tslib_1 from "tslib";
// #region Imports
import { Component, ViewChild, ChangeDetectorRef } from "@angular/core";
// services
import { AppConfig } from "../../common/appConfig";
import { SpeechToText } from "../../shared/ng2-mobiletech/speechToText";
import { TextToSpeech } from "../../shared/ng2-mobiletech/textToSpeech";
import { GoogleMaps } from "../../shared/ng2-mobiletech/googleMaps";
import { AppServices } from "../../shared/ng2-apphelper/appServices";
// ngxs
import { Store } from '@ngxs/store';
import { ToggleSpellChecking, UpdateMessage, ClearMessage, ChangeMobileCarrier, UpdateMobileNumber } from "./mobileapis.actions";
// #endregions
// #region Constructor
var MobileApisComponent = /** @class */ (function () {
    function MobileApisComponent(store, ac, cd, as) {
        this.store = store;
        this.ac = ac;
        this.cd = cd;
        this.as = as;
        this.isViewVisible = false;
        this.speechRecognitionOn = false;
        this.speechRecognitionPaused = false;
        this.showSpeechToText = false;
        this.showTextToSpeech = false;
        this.latitude = 0;
        this.longitude = 0;
        this.address = "";
        this.zipcode = "";
        this.showTextArea = true;
        this.showToggleGroup = false;
        this.cellCarriers = new Array();
        this.textAreaMinRowCount = 4;
        this.mobileNumberMaxLength = 10;
        this.gmHeaderHeight = 80;
        this.gmTextHeight = 230;
        this.mobileNumber = this.ac.mobileApisState.mobileNumber;
    }
    MobileApisComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ac.waitUntilInitialized(function () {
            _this.isViewVisible = true;
            _this.updateCellCarriers();
            setTimeout(function () {
                _this.showToggleGroup = true;
                _this.initGoogleMaps();
            }, 0);
        });
    };
    // #endregion
    //#region Speech To Text:
    MobileApisComponent.prototype.onClickSpeechToText = function () {
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
        this.store.dispatch(new UpdateMessage(""));
        setTimeout(function () {
            _this.showSpeechToText = true;
        });
    };
    MobileApisComponent.prototype.onRestartS2TCallback = function () {
        // in this case, don't clear the text on restart
    };
    MobileApisComponent.prototype.onChangeMessage = function (text) {
        this.store.dispatch(new UpdateMessage(text));
    };
    MobileApisComponent.prototype.onResultsS2TCallback = function (speech) {
        this.store.dispatch(new UpdateMessage(this.ac.mobileApisState.textMessage + speech));
        this.cd.detectChanges();
    };
    MobileApisComponent.prototype.unavailableFeature = function (feature) {
        var _this = this;
        this.ac.toastrInfo(feature + " is unavailable with this browser...");
        setTimeout(function () {
            _this.ac.toastrInfo("Upgrade to Google Chrome!");
        }, 5000);
    };
    MobileApisComponent.prototype.onClickTextToSpeech = function () {
        var _this = this;
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
        setTimeout(function () {
            _this.showTextToSpeech = true;
        });
    };
    MobileApisComponent.prototype.onT2SChangeCallback = function () {
        // Speech completed, paused, or stopped
    };
    MobileApisComponent.prototype.onClickClearText = function () {
        this.store.dispatch(new ClearMessage());
        // ??? not sure I am doing this right here?
        this.ac.mobileApisState.textMessage = "";
    };
    MobileApisComponent.prototype.onClickSpellCheck = function (spellCheck) {
        var _this = this;
        this.store.dispatch([new ToggleSpellChecking(spellCheck)]);
        if (this.ac.mobileApisState.spellCheckingEnabled) {
            setTimeout(function () {
                var textArea = document.querySelector(".textAreaNgModel");
                if (_this.ac.mobileApisState.spellCheckingEnabled)
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
    MobileApisComponent.prototype.getRowCount = function () {
        try {
            var count = document.querySelector(".textAreaNgModel").value.split("\n").length;
            if (count > this.textAreaMinRowCount)
                return count;
            else
                return this.textAreaMinRowCount;
        }
        catch (e) {
            return this.textAreaMinRowCount;
        }
    };
    // #endregion
    //#region Text Messaging:
    MobileApisComponent.prototype.updateCellCarriers = function () {
        var _this = this;
        this.cellCarriers = new Array();
        this.ac.appSettings.cellCarriers.split(";").forEach(function (cellCarrier) {
            _this.cellCarriers.push({ name: cellCarrier.split(":")[0], smsProfile: cellCarrier.split(":")[1] });
        });
    };
    MobileApisComponent.prototype.onChangeCarrier = function (carrier) {
        this.store.dispatch(new ChangeMobileCarrier(carrier));
        this.shouldSendBeDisabled();
    };
    MobileApisComponent.prototype.onKeyDown = function (event) {
        var mobileNumber = event.target.value;
        if (event.key === "Backspace" || event.key === "ArrowLeft" || event.key === "ArrowRight") {
            return true;
        }
        if (mobileNumber.length === this.mobileNumberMaxLength)
            return false;
        else
            return true;
    };
    MobileApisComponent.prototype.onKeyUp = function (mobileNumber) {
        this.mobileNumber = mobileNumber;
        if (mobileNumber.toString().length === this.mobileNumberMaxLength) {
            this.store.dispatch(new UpdateMobileNumber(mobileNumber));
        }
    };
    MobileApisComponent.prototype.shouldSendBeDisabled = function () {
        if (this.ac.mobileApisState.mobileCarrier.length === 0)
            return true;
        if (!this.mobileNumber)
            return true;
        if (this.mobileNumber.toString().length < this.mobileNumberMaxLength)
            return true;
        return false;
    };
    MobileApisComponent.prototype.onClickSend = function () {
        var _this = this;
        this.ac.showSpinner(true);
        this.ac.sendTextMessage({
            message: this.ac.mobileApisState.textMessage,
            cellCarrierName: this.ac.mobileApisState.mobileCarrier,
            mobileNumber: this.ac.mobileApisState.mobileNumber
        }, function () {
            _this.ac.showSpinner(false);
            _this.playAscending(0.01);
            _this.ac.toastrSuccess("Success: Your text message has been sent to: " + _this.ac.mobileApisState.mobileNumber);
        }, function (errorMessage) {
            _this.ac.showSpinner(false);
            _this.ac.toastrError("Error: " + errorMessage);
        });
    };
    MobileApisComponent.prototype.playAscending = function (volume) {
        var _this = this;
        setTimeout(function () {
            _this.play4Ths(volume);
            setTimeout(function () {
                _this.play4Ths(volume / 2);
                setTimeout(function () {
                    _this.play4Ths(volume / 4);
                    setTimeout(function () {
                        _this.play4Ths(volume / 8);
                    }, 500);
                }, 500);
            }, 500);
        }, 500);
    };
    MobileApisComponent.prototype.play4Ths = function (volume) {
        var _this = this;
        setTimeout(function () {
            _this.as.beep(1500, 523.25, volume, "sine", null);
            setTimeout(function () {
                _this.as.beep(1500, 698.46, volume, "sine", null);
                setTimeout(function () {
                    _this.as.beep(1500, 932.33, volume, "sine", null);
                    setTimeout(function () {
                        _this.as.beep(1500, 1244.51, volume, "sine", null);
                    }, 250);
                }, 250);
            }, 250);
        }, 250);
    };
    // #endregion
    //#region GoogleMaps:
    MobileApisComponent.prototype.initGoogleMaps = function () {
        var _this = this;
        setTimeout(function () {
            _this.gm.owner = _this;
            _this.gm.updateCoordinatesCallback = "updateCoordinatesCallback";
            _this.gm.updateAddressCallback = "updateAddressCallback";
            _this.gm.googleMapKey = _this.ac.appSettings.googleMapKey;
            _this.gm.initialize();
        });
    };
    MobileApisComponent.prototype.updateAddressCallback = function (address, zipcode) {
        this.address = address;
        this.zipcode = zipcode;
    };
    MobileApisComponent.prototype.updateCoordinatesCallback = function (latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.gm.lookupAddress();
    };
    MobileApisComponent.prototype.shouldUpdateByAddressBeDisabled = function () {
        return this.address.trim().length === 0 || this.zipcode.toString().trim().length < 5;
    };
    MobileApisComponent.prototype.calcGmTextWidth = function () {
        if (this.ac.isPhoneSize) {
            if (this.ac.isLandscapeView)
                return this.ac.screenWidth / 3;
            else
                return this.ac.screenWidth - 70;
        }
        return 270;
    };
    MobileApisComponent.prototype.getGmTextWidth = function () {
        return this.calcGmTextWidth();
    };
    MobileApisComponent.prototype.getMapWidth = function () {
        if (document.documentElement.clientWidth <= this.ac.smallWidthBreakpoint)
            return document.documentElement.clientWidth;
        if (document.documentElement.clientWidth <= this.ac.mediaQueryBreak)
            return document.documentElement.clientWidth - (this.ac.sideNavWidth);
        return document.documentElement.clientWidth - (this.ac.sideNavWidth + this.ac.mapControlsWidth);
    };
    MobileApisComponent.prototype.getMapHeight = function () {
        if (document.documentElement.clientWidth <= this.ac.mediaQueryBreak)
            return document.documentElement.clientHeight - (this.ac.headerHeight + this.ac.mapControlsHeight);
        return document.documentElement.clientHeight - this.ac.headerHeight;
    };
    tslib_1.__decorate([
        ViewChild(SpeechToText),
        tslib_1.__metadata("design:type", SpeechToText)
    ], MobileApisComponent.prototype, "s2T", void 0);
    tslib_1.__decorate([
        ViewChild(TextToSpeech),
        tslib_1.__metadata("design:type", TextToSpeech)
    ], MobileApisComponent.prototype, "t2S", void 0);
    tslib_1.__decorate([
        ViewChild(GoogleMaps),
        tslib_1.__metadata("design:type", GoogleMaps)
    ], MobileApisComponent.prototype, "gm", void 0);
    MobileApisComponent = tslib_1.__decorate([
        Component({
            // #region template
            templateUrl: "mobileApis.component.html"
            // #endregion
        }),
        tslib_1.__metadata("design:paramtypes", [Store, AppConfig, ChangeDetectorRef, AppServices])
    ], MobileApisComponent);
    return MobileApisComponent;
}());
export { MobileApisComponent };
//# sourceMappingURL=mobileApis.component.js.map