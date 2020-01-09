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
// #region Imports
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var speechToText_1 = require("../library_ng/ng2-mobiletech/speechToText");
var textToSpeech_1 = require("../library_ng/ng2-mobiletech/textToSpeech");
var googleMaps_1 = require("../library_ng/ng2-mobiletech/googleMaps");
var mobileApis_component_actions_1 = require("./mobileApis.component.actions");
var mobileApis_component_state_1 = require("./mobileApis.component.state");
// #endregions
// #region Constructor
var MobileApisComponent = /** @class */ (function () {
    function MobileApisComponent(store, ac, cd, as) {
        this.store = store;
        this.ac = ac;
        this.cd = cd;
        this.as = as;
        this.selectedIndex = 1;
        this.isViewVisible = false;
        this.speechRecognitionOn = false;
        this.speechRecognitionPaused = false;
        this.showSpeechToText = false;
        this.showTextToSpeech = false;
        this.latitude = 0;
        this.longitude = 0;
        this.address = '';
        this.zipcode = '';
        this.showTextArea = true;
        this.showToggleGroup = false;
        this.cellCarriers = new Array();
        this.textAreaMinRowCount = 4;
        this.mobileNumberMaxLength = 10;
        this.gmHeaderHeight = 80;
        this.gmTextHeight = 230;
        this.mobileApisState = new mobileApis_component_state_1.MobileApisStateModel();
        this.store.dispatch(new mobileApis_component_actions_1.MobileApiInit(this.ac.ngAction));
        this.stateChanges();
    }
    MobileApisComponent.prototype.stateChanges = function () {
        var _this = this;
        this.store.subscribe(function (state) {
            if (state.mobileApis) {
                var mobileApisState = state.mobileApis;
                mobileApisState.previousState = _this.mobileApisState;
                _this.mobileApisState = mobileApisState;
                if (mobileApisState.selectedIndex !== mobileApisState.previousState.selectedIndex) {
                    _this.updateTabIndex(mobileApisState.selectedIndex);
                }
                if (mobileApisState.spellCheckingEnabled !== mobileApisState.previousState.spellCheckingEnabled) {
                    _this.spellCheck();
                }
                if (mobileApisState.clearTextMessage !== mobileApisState.previousState.clearTextMessage) {
                    setTimeout(function () {
                        _this.clearTextMessage();
                    }, 500); // Adding motion
                }
            }
        });
    };
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
    MobileApisComponent.prototype.onChangeTab = function (selectedIndex) {
        if (!this.ac.ngAction.isDispatching()) {
            this.store.dispatch(new mobileApis_component_actions_1.ChangeTabIndex('ChangeTab', 'Click Tab', selectedIndex, true, -1));
        }
    };
    MobileApisComponent.prototype.updateTabIndex = function (selectedIndex) {
        this.selectedIndex = selectedIndex;
    };
    //#region Speech To Text:
    MobileApisComponent.prototype.onClickSpeechToText = function () {
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
            _this.store.dispatch(new mobileApis_component_actions_1.UpdateTextMessage('UpdateMessage', 'Enter Message', _this.mobileApisState.textMessage + speech, true, -1));
            _this.cd.detectChanges();
        };
        this.s2T.isClosable = true;
        this.s2T.positionTop = -75;
        this.showSpeechToText = false;
        this.store.dispatch(new mobileApis_component_actions_1.UpdateTextMessage('UpdateMessage', 'Enter Message', '', true, -1));
        setTimeout(function () {
            _this.showSpeechToText = true;
        });
    };
    MobileApisComponent.prototype.onChangeTextMessage = function (text) {
        this.store.dispatch(new mobileApis_component_actions_1.UpdateTextMessage('UpdateMessage', 'Enter Message', text, true, -1));
    };
    MobileApisComponent.prototype.unavailableFeature = function (feature) {
        var _this = this;
        this.ac.toastrInfo(feature + ' is unavailable with this browser...');
        setTimeout(function () {
            _this.ac.toastrInfo('Upgrade to Google Chrome!');
        }, 5000);
    };
    MobileApisComponent.prototype.onClickTextToSpeech = function () {
        var _this = this;
        if (!this.t2S.featureIsAvailable) {
            this.unavailableFeature('Text to Speech');
            return;
        }
        this.t2S.textToSpeak = this.mobileApisState.textMessage;
        this.t2S.isClosable = true;
        this.t2S.positionTop = -75;
        this.t2S.owner = this;
        this.t2S.onChangeCallback = function (text) {
            // Speech completed, paused, or stopped
        };
        this.showTextToSpeech = false;
        setTimeout(function () {
            _this.showTextToSpeech = true;
        });
    };
    MobileApisComponent.prototype.onClickClearTextMessage = function () {
        this.store.dispatch(new mobileApis_component_actions_1.ClearTextMessage('ClearMessage', 'Clear Message', true, true, -1));
    };
    MobileApisComponent.prototype.clearTextMessage = function () {
        this.mobileApisState.textMessage = '';
        this.mobileApisState.clearTextMessage = false;
    };
    MobileApisComponent.prototype.onClickSpellCheck = function (spellCheck) {
        this.store.dispatch(new mobileApis_component_actions_1.ToggleSpellChecking('SpellChecking', 'SpellChecking', spellCheck, true, -1));
    };
    MobileApisComponent.prototype.spellCheck = function () {
        var _this = this;
        if (this.mobileApisState.spellCheckingEnabled) {
            var textArea = document.querySelector('.textAreaNgModel');
            if (this.mobileApisState.spellCheckingEnabled) {
                this.as.spellChecker(textArea);
            }
            else {
                textArea.focus();
            }
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
            var count = document.querySelector('.textAreaNgModel').value.split('\n').length;
            if (count > this.textAreaMinRowCount) {
                return count;
            }
            else {
                return this.textAreaMinRowCount;
            }
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
        this.ac.appSettings.cellCarriers.split(';').forEach(function (cellCarrier) {
            _this.cellCarriers.push({ name: cellCarrier.split(':')[0], smsProfile: cellCarrier.split(':')[1] });
        });
    };
    MobileApisComponent.prototype.onChangeCarrier = function (carrier) {
        // this.store.dispatch(new ChangeMobileCarrier(carrier));
        this.shouldSendBeDisabled();
    };
    MobileApisComponent.prototype.onKeyDown = function (event) {
        var mobileNumber = event.target.value;
        if (event.key === 'Backspace' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            return true;
        }
        if (mobileNumber.length === this.mobileNumberMaxLength) {
            return false;
        }
        else {
            return true;
        }
    };
    MobileApisComponent.prototype.onKeyUp = function (mobileNumber) {
        this.mobileNumber = mobileNumber;
        if (mobileNumber.toString().length === this.mobileNumberMaxLength) {
            this.mobileApisState.mobileNumber = mobileNumber.toString();
            // this.store.dispatch(new UpdateMobileNumber(mobileNumber));
        }
    };
    MobileApisComponent.prototype.shouldSendBeDisabled = function () {
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
    };
    MobileApisComponent.prototype.onClickSend = function () {
        var _this = this;
        this.ac.showSpinner(true);
        this.ac.sendTextMessage({
            message: this.mobileApisState.textMessage,
            cellCarrierName: this.mobileApisState.mobileCarrier,
            mobileNumber: parseInt(this.mobileApisState.mobileNumber)
        }, function () {
            _this.ac.showSpinner(false);
            _this.playAscending(0.01);
            _this.ac.toastrSuccess("Success: Your text message has been sent to: " + _this.mobileApisState.mobileNumber);
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
            _this.as.beep(1500, 523.25, volume, 'sine', null);
            setTimeout(function () {
                _this.as.beep(1500, 698.46, volume, 'sine', null);
                setTimeout(function () {
                    _this.as.beep(1500, 932.33, volume, 'sine', null);
                    setTimeout(function () {
                        _this.as.beep(1500, 1244.51, volume, 'sine', null);
                    }, 250);
                }, 250);
            }, 250);
        }, 250);
    };
    // #endregion
    //#region GoogleMaps:
    MobileApisComponent.prototype.initGoogleMaps = function () {
        setTimeout(function () {
            //this.gm.owner = this;
            //this.gm.updateCoordinatesCallback = 'updateCoordinatesCallback';
            //this.gm.updateAddressCallback = 'updateAddressCallback';
            //this.gm.googleMapKey = this.ac.appSettings.googleMapKey;
            //this.gm.initialize();
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
            if (this.ac.isLandscapeView) {
                return this.ac.screenWidth / 3;
            }
            else {
                return this.ac.screenWidth - 70;
            }
        }
        return 270;
    };
    MobileApisComponent.prototype.getGmTextWidth = function () {
        return this.calcGmTextWidth();
    };
    MobileApisComponent.prototype.getMapWidth = function () {
        if (document.documentElement.clientWidth <= this.ac.smallWidthBreakpoint) {
            return document.documentElement.clientWidth;
        }
        if (document.documentElement.clientWidth <= this.ac.mediaQueryBreak) {
            return document.documentElement.clientWidth - (this.ac.sideNavWidth);
        }
        return document.documentElement.clientWidth - (this.ac.sideNavWidth + this.ac.mapControlsWidth);
    };
    MobileApisComponent.prototype.getMapHeight = function () {
        if (document.documentElement.clientWidth <= this.ac.mediaQueryBreak) {
            return document.documentElement.clientHeight - (this.ac.headerHeight + this.ac.mapControlsHeight);
        }
        return document.documentElement.clientHeight - this.ac.headerHeight;
    };
    __decorate([
        core_1.ViewChild(speechToText_1.SpeechToTextComponent, { static: true })
    ], MobileApisComponent.prototype, "s2T", void 0);
    __decorate([
        core_1.ViewChild(textToSpeech_1.TextToSpeechComponent, { static: true })
    ], MobileApisComponent.prototype, "t2S", void 0);
    __decorate([
        core_1.ViewChild(googleMaps_1.GoogleMapsComponent, { static: true })
    ], MobileApisComponent.prototype, "gm", void 0);
    MobileApisComponent = __decorate([
        core_1.Component({
            // #region template
            templateUrl: 'mobileApis.component.html'
            // #endregion
        })
    ], MobileApisComponent);
    return MobileApisComponent;
}());
exports.MobileApisComponent = MobileApisComponent;
var MobileApisHelpDialogComponent = /** @class */ (function () {
    function MobileApisHelpDialogComponent(data) {
        this.data = data;
    }
    MobileApisHelpDialogComponent = __decorate([
        core_1.Component({
            templateUrl: './mobileApis.component.help.html'
        }),
        __param(0, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], MobileApisHelpDialogComponent);
    return MobileApisHelpDialogComponent;
}());
exports.MobileApisHelpDialogComponent = MobileApisHelpDialogComponent;
//# sourceMappingURL=mobileApis.component.js.map