// #region Imports
import { Component, ViewChild, ChangeDetectorRef } from "@angular/core";
// services
import { AppConfig } from "../common/appConfig";
import { ToastrService } from "ngx-toastr";
import { SpeechToText } from "../shared/ng2-mobiletech/speechToText";
import { TextToSpeech } from "../shared/ng2-mobiletech/textToSpeech";
import { GoogleMaps } from "../shared/ng2-mobiletech/googleMaps";
import { AppServices } from "../shared/ng2-apphelper/appServices";
import { CellCarrier, TextMessage } from "../shared/client-side-models/buildModels";
// #endregions

// #region Constructor
@Component({
    // #region template
    selector: "mobileapis",
    template: "\n<speech-to-text [isVisible]=\"showSpeechToText\"></speech-to-text>\n<text-to-speech [isVisible]=\"showTextToSpeech\"></text-to-speech>\n\n<view-fader [isViewVisible]=\"isViewVisible\" style=\"font-size: 110%; \">\n\n    <div class=\"text-primary\">\n        <div align=\"center\">\n\n            <div class=\"btn-group\" style=\"width: 300px;  margin-left: 25px; \">\n                <button class=\"btn btn-primary feature-not-selected\" [ngClass]=\"{\'btn-outline-primary feature-selected\': selectedFeature === \'speech2Text\'}\" (click)=\"selectedFeature = \'speech2Text\'\">Speech to Text</button>\n                <button class=\"btn btn-primary feature-not-selected\" [ngClass]=\"{\'btn-outline-primary feature-selected\': selectedFeature === \'textMessaging\'}\" (click)=\"selectedFeature = \'textMessaging\'\">SMS/MMS</button>\n                <button class=\"btn btn-primary feature-not-selected\" [ngClass]=\"{\'btn-outline-primary feature-selected\': selectedFeature === \'googleMaps\'}\" (click)=\"onClickGoogleMaps()\">Map</button>\n            </div>\n\n            <view-fader *ngIf=\"selectedFeature === \'speech2Text\'\" [isViewVisible]=\"selectedFeature === \'speech2Text\'\">\n                <div class=\"s2t-text\" style=\"width: 285px;  margin-top: 20px; margin-left:10px; \">\n                    <span>\n                        <a href=\"javascript:void(0);\" (click)=\"onClickTextToSpeech()\" style=\"color: cornflowerblue; float:left; cursor: pointer; margin-bottom: 5px; \" title=\"Text-to-speech\"> <i class=\"fa fa-volume-up fa-2x\"></i></a>\n                        <a href=\"javascript:void(0);\" (click)=\"onClickSpeechToText()\" style=\"color: cornflowerblue; float:right; cursor: pointer; margin-bottom: 5px; \" title=\"Speech-to-text\"><i class=\"fa fa-microphone fa-2x\"></i></a>\n                    </span>\n                    <textarea style=\"font-size: 110%; height: 170px; color: #007aff; \" *ngIf=\"showTextArea\" [spellcheck]=\"spellCheck\" class=\"form-control textAreaNgModel\" [rows]=\"getRowCount()\" [(ngModel)]=\"textAreaNgModel\"></textarea>\n                    <span>\n                        <a *ngIf=\"!spellCheck\" href=\"javascript:void(0);\" (click)=\"onClickSpellCheck(true)\" style=\"color: red; float:left; cursor: pointer; margin-top: 5px; \" title=\"Spell Checking: Off\"><i class=\"fa fa-check fa-2x\"></i></a>\n                        <a *ngIf=\"spellCheck\" href=\"javascript:void(0);\" (click)=\"onClickSpellCheck(false)\" style=\"color: green; float:left; cursor: pointer; margin-top: 5px; \" title=\"Spell Checking: On\"><i class=\"fa fa-check fa-2x\"></i></a>\n                        <a href=\"javascript:void(0);\" (click)=\"onClickClearText()\" style=\"color: cornflowerblue; float:right; cursor: pointer; margin-top: 5px; \" title=\"Clear Text\"><i class=\"fa fa-recycle fa-2x\"></i></a>\n\n                        <span style=\"float: left; margin-left: 5px; margin-top: 7px; font-size: 16px; \">Spell Checking: <span style=\"font-weight: bold; \">{{ spellCheck ? \"On\" : \"Off\" }}</span></span>\n                    </span>\n                </div>\n            </view-fader>\n\n            <view-fader *ngIf=\"selectedFeature === \'textMessaging\'\" [isViewVisible]=\"selectedFeature === \'textMessaging\'\">\n                <br />\n                <div style=\"width: 285px; margin-left: 10px; \">\n                    <div>* Cellular Carrier</div>\n                    <select [(ngModel)]=\"cellCarrierName\" class=\"form-control text-primary\">\n                        <option *ngIf=\"!cellCarrier\" [value]=\"none\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<< Select a Cellular Carrier >></option>\n                        <option *ngFor=\"let cellCarrier of getCellCarriers()\" [value]=\"cellCarrier.name\">{{cellCarrier.name}}</option>\n                    </select>\n                    <br />\n                    <div style=\"margin-left: 10px;\">* Phone Number (Numbers Only)</div>\n                    <input min=\"0\" max=\"9999999999\" (keyup)=\"limitPhoneNoInput($event.target.value)\" [(ngModel)]=\"phoneNumber\" class=\"form-control\" type=\"number\" style=\"width: 100%; margin-right: 10px; color: #007aff; \" />\n                    <br />\n                    <button class=\"btn btn-primary\" [disabled]=\"shouldSendBeDisabled()\" style=\"width: 75px; float: right; \" (click)=\"onClickSend()\">Send</button>\n                </div>\n            </view-fader>\n\n            <view-fader *ngIf=\"selectedFeature === \'googleMaps\'\" [isViewVisible]=\"selectedFeature === \'googleMaps\'\">\n                <div style=\"margin-left: 10px; margin-top: 20px; width: 90%; \" class=\"row\">\n                    \n                    <div [style.min-width.px]=\"getGmTextWidth()\"  [style.min-height.px]=\"gmTextHeight\" >\n                        \n                        <div>&nbsp;&nbsp;Address</div>\n                        <input [(ngModel)]=\"address\" class=\"form-control\" type=\"text\" style=\"height: 28px; width: 100%; font-size: 18px; vertical-align: middle; color: #007aff; \" />\n                        <div style=\"margin-top: 10px; \">&nbsp;&nbsp;Zip Code</div>\n                        <input [(ngModel)]=\"zipcode\" class=\"form-control\" type=\"number\" min=\"0\" max=\"99999\" style=\"height: 28px; width: 100%; font-size: 18px; vertical-align: middle; color: #007aff; \" />\n                        <div style=\"float: left; margin-top: 10px; \">&nbsp;&nbsp;Latitude</div>\n                        <div style=\"float: right; margin-top: 10px; \">Longitude&nbsp;&nbsp;</div>\n                        <br />\n                        <div style=\"margin-top: 10px; \">\n                            <div *ngIf=\"latitude !== 0\" style=\"float: left; \">&nbsp;&nbsp;{{latitude}}</div>\n                            <div *ngIf=\"latitude === 0\" style=\"float: left; \">&nbsp;&nbsp;00.00000</div>\n\n                            <div *ngIf=\"longitude !== 0\" style=\"float: right; \">{{longitude}}&nbsp;&nbsp;&nbsp;</div>\n                            <div *ngIf=\"longitude === 0\" style=\"float: right; \">00.00000&nbsp;&nbsp;&nbsp;</div>\n                            <br />\n                            <button style=\"margin-top: 10px; float: left; \" (click)=\"gm.findMe()\" class=\"btn btn-sm  btn-primary\" title=\"Find Me on Google Maps\">Find Me</button>\n                            <button style=\"margin-left: 10px; margin-top: 10px; float: right;\" (click)=\"gm.useAddress(address, zipcode)\" [disabled]=\"shouldUpdateByAddressBeDisabled()\" class=\"btn btn-sm btn-primary\" title=\"Use Address to Google Maps\">Use Address</button>\n                        </div>\n\n                    </div>\n\n                    <div [style.min-width.px]=\"getGmMapWidth()\" [style.min-height.px]=\"getGmMapHeight()\" style=\"padding-left: 10px; \">\n                        <google-maps [widthPercent]=\"100\" [heightPercent]=\"95\" [isVisible]=\"true\" style=\"border-radius: 10px; \"></google-maps>\n                    </div>\n                </div>\n            </view-fader>\n\n        </div>\n    </div>\n</view-fader>\n"/* this was squashed */,
    styles: ["\n.feature-title {\n    color: #007aff;\n    background-color: #dfdfdf;\n    padding: 10px;\n    width: 200px;\n    height: 60px;\n    text-align: center;\n    border-radius: 25px;\n}\n\n.feature-list {\n    background-color: #dfdfdf;\n    padding: 10px;\n    border-radius: 25px;\n}\n\n.feature-heading {\n    padding: 10px;\n    border-radius: 15px;\n}\n\n.textAreaNgModel {\n}\n\n.s2t-text {\n    margin-top: 20px;\n}\n\n.feature-selected {\n    cursor: none;\n    background-color: white;\n}\n\n.feature-selected:hover {\n    cursor: default;\n    color: #007bff;\n    background-color: transparent;\n}\n\n.feature-not-selected {\n    cursor: pointer;\n}\n"/* this was squashed */]
    // #endregion
})
export class MobileApis {
    @ViewChild(SpeechToText) s2T: SpeechToText;
    @ViewChild(TextToSpeech) t2S: TextToSpeech;
    @ViewChild(GoogleMaps) gm: GoogleMaps;
    private isViewVisible = false;
    private speechRecognitionOn = false;
    private speechRecognitionPaused = false;
    private recognition: any;
    private textAreaNgModel = "";
    private newSentence: boolean;
    private showSpeechToText = false;
    private showTextToSpeech = false;
    private spellCheck = false;
    private latitude = 0;
    private longitude = 0;
    private address = "";
    private zipcode = "";
    private showTextArea = true;
    private readonly textAreaMinRowCount = 4;
    private selectedFeature = "";
    private cellCarrierName: string;
    private phoneNumber = "";

    constructor(private readonly ac: AppConfig, private readonly toastr: ToastrService, private readonly cd: ChangeDetectorRef, private readonly as: AppServices) {
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
        this.textAreaNgModel = "";
        setTimeout(() => {
            this.showSpeechToText = true;
        });
    }

    private onRestartS2TCallback() {
        // in this case, don't clear the text on restart
    }

    private onResultsS2TCallback(speech: string) {
        this.textAreaNgModel += speech;
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
        this.t2S.textToSpeak = this.textAreaNgModel;
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
        this.textAreaNgModel = "";
    }

    private onClickSpellCheck(spellCheck: boolean) {
        this.spellCheck = spellCheck;

        if (this.spellCheck) {
            setTimeout(() => {
                const textArea = (document.querySelector(".textAreaNgModel") as HTMLFormElement);

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

    private onClickTextMessaging() {
        this.selectedFeature = "textMessaging";
    }

    private limitPhoneNoInput(phoneNumber) {
        if (phoneNumber.length > 10) {
            this.phoneNumber = phoneNumber.toString().substr(0, 10);
        }
    }

    private shouldSendBeDisabled(): boolean {
        if (!this.cellCarrierName || this.phoneNumber.toString().length < 10)
            return true;
        return false;
    }

    private onClickSend() {
        this.ac.showSpinner(true);
        this.ac.sendTextMessage({
            message: this.textAreaNgModel,
            cellCarrierName: this.cellCarrierName,
            phoneNumber: this.phoneNumber
        }, () => {
            this.ac.showSpinner(false);
            this.playAscending(0.01);
            this.toastr.success(`Success: Your text message has been sent to: ${this.phoneNumber}`);
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
