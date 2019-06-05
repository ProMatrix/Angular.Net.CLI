"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var thisWindow = /** @class */ (function (_super) {
    __extends(thisWindow, _super);
    function thisWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return thisWindow;
}(Window));
exports.thisWindow = thisWindow;
var AppServices = /** @class */ (function () {
    function AppServices() {
    }
    //#region beep
    AppServices.prototype.beep = function (duration, frequency, volume, type, callback) {
        // type can be: sine, square, sawtooth, triangle or custom
        // frequency: 440 is 440Hz
        if (!this.audioCtx)
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext || window.audioContext);
        var oscillator = this.audioCtx.createOscillator();
        var gainNode = this.audioCtx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(this.audioCtx.destination);
        if (volume) {
            gainNode.gain.setValueAtTime(volume, this.audioCtx.currentTime);
        }
        ;
        if (frequency) {
            oscillator.frequency.setValueAtTime(frequency, this.audioCtx.currentTime);
        }
        if (type) {
            oscillator.type = type;
        }
        if (callback) {
            oscillator.onended = callback;
        }
        oscillator.start();
        setTimeout(function () { oscillator.stop(); }, (duration ? duration : 500));
    };
    ;
    //#endregion
    //#region sleep
    AppServices.prototype.sleep = function (ms) {
        var futureMs = new Date().getTime() + ms;
        var timeNow = 0;
        do {
            timeNow = new Date().getTime();
        } while (timeNow < futureMs);
    };
    //#endregion
    //#region spellChecker
    AppServices.prototype.spellChecker = function (txtElement) {
        var newLines = new Array();
        var index = 0;
        newLines.push(index);
        var newLineArray = txtElement.value.split("\n");
        newLineArray.forEach(function (newLine) {
            index += newLine.length + 1;
            newLines.push(index);
        });
        index = 0;
        var intervalId = setInterval(function () {
            if (txtElement.setSelectionRange) {
                txtElement.focus();
                txtElement.setSelectionRange(newLines[index], newLines[index]);
            }
            else if (txtElement.createTextRange) {
                var range = txtElement.createTextRange();
                range.moveStart("character", newLines[index]);
                range.select();
            }
            if (index === newLines.length - 1)
                clearInterval(intervalId);
            index++;
        }, 100);
    };
    //#endregion
    //#region fullscreen
    AppServices.prototype.launchFullScreen = function () {
        var element = document.documentElement;
        if (element.requestFullScreen) {
            element.requestFullScreen();
        }
        else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
        }
        else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        }
    };
    AppServices.prototype.exitFullScreen = function () {
        var doc = document;
        if (doc.exitFullscreen) {
            doc.exitFullscreen();
        }
        else if (doc.mozCancelFullScreen) {
            doc.mozCancelFullScreen();
        }
        else if (doc.webkitExitFullscreen) {
            doc.webkitExitFullscreen();
        }
    };
    AppServices.prototype.isFullScreen = function () {
        var doc = document;
        if (doc.fullscreenElement || doc.webkitFullscreenElement || doc.mozFullScreenElement || doc.msFullscreenElement)
            return true;
        else
            return false;
    };
    AppServices = __decorate([
        core_1.Injectable()
    ], AppServices);
    return AppServices;
}());
exports.AppServices = AppServices;
//# sourceMappingURL=appServices.js.map