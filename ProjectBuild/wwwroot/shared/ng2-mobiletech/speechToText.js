import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from "@angular/core";
import { trigger, animate, transition, style } from "@angular/animations";
var thisWindow = /** @class */ (function (_super) {
    tslib_1.__extends(thisWindow, _super);
    function thisWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return thisWindow;
}(Window));
export { thisWindow };
var SpeechToText = /** @class */ (function () {
    function SpeechToText(cd) {
        this.cd = cd;
        this.isClosable = true;
        this.positionTop = 20;
        this.autoRetry = false;
        this.visibleChange = new EventEmitter();
        this.initalized = false;
        this.s2tOn = false;
        this.s2tPaused = false;
        this.featureIsAvailable = true;
    }
    SpeechToText.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.initalized = true;
            _this.setupSpeechToText();
        }, 500);
    };
    SpeechToText.prototype.debugText = function (message) {
        setTimeout(function () {
            try {
                var dt = document.getElementById("debugText");
                dt.innerHTML = message;
            }
            catch (e) { }
        });
    };
    SpeechToText.prototype.setupSpeechToText = function () {
        var _this = this;
        try {
            this.s2t = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
        }
        catch (e) {
            this.featureIsAvailable = false;
            return;
        }
        this.s2t.lang = 'en-US';
        this.s2t.interimResults = false;
        this.s2t.continuous = true;
        this.s2t.maxAlternatives = 5;
        this.s2t.onresult = function (event) {
            _this.onResultsS2T(event);
        };
        this.s2t.onspeechend = function (event) {
            _this.endS2T();
        };
        this.s2t.onend = function (event) {
            _this.endS2T();
        };
        this.s2t.onerror = function (event) {
            _this.errorS2T(event.error);
        };
        this.s2t.onnomatch = function (event) {
            _this.noMatchS2T();
        };
    };
    SpeechToText.prototype.ngOnChanges = function () {
        if (!this.initalized)
            return;
        if (!this.s2tOn) {
            this.startButtonLabel = "Start";
            this.onClickStart();
        }
    };
    SpeechToText.prototype.closeDialog = function () {
        if (this.s2tOn || this.s2tPaused)
            this.onClickStop();
        this.isVisible = false;
        this.visibleChange.emit(this.isVisible);
    };
    SpeechToText.prototype.onClickStart = function () {
        this.debugText("");
        this.startS2T();
        this.s2tOn = true;
    };
    SpeechToText.prototype.onClickStop = function () {
        this.s2t.stop();
        this.s2tOn = false;
        this.s2tPaused = false;
        this.startButtonLabel = "Restart";
    };
    SpeechToText.prototype.onClickPause = function () {
        this.s2t.stop();
        this.s2tOn = false;
        this.s2tPaused = true;
        this.startButtonLabel = "Resume";
    };
    SpeechToText.prototype.endS2T = function () {
        if (this.s2tOn) {
            this.s2tPaused = true;
            try {
                this.s2t.start();
            }
            catch (e) { }
        }
    };
    SpeechToText.prototype.startS2T = function () {
        if (!this.s2tOn) {
            if (!this.s2tPaused) {
                this.owner[this.onRestartCallback]();
                this.newSentence = true;
            }
            this.s2t.start();
        }
    };
    SpeechToText.prototype.errorS2T = function (message) {
        var _this = this;
        this.onClickPause();
        this.debugText("System Error: " + message);
        this.cd.detectChanges();
        if (!this.autoRetry)
            return;
        this.debugText("Auto Retry");
        setTimeout(function () {
            _this.onClickStart();
        }, 1000);
    };
    SpeechToText.prototype.noMatchS2T = function () {
        this.debugText("System Error: Cannot recognize speech!");
    };
    SpeechToText.prototype.onResultsS2T = function (event) {
        var justSpoken = event.results[event.results.length - 1][0].transcript;
        justSpoken = this.speechRules(justSpoken);
        this.owner[this.onResultsCallback](justSpoken);
    };
    SpeechToText.prototype.speechRules = function (inputString) {
        inputString = inputString.charAt(0).toUpperCase() + inputString.slice(1);
        return inputString;
    };
    SpeechToText.prototype.ngOnDestroy = function () {
        if (this.s2tOn)
            this.onClickStop();
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], SpeechToText.prototype, "isClosable", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], SpeechToText.prototype, "isVisible", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], SpeechToText.prototype, "owner", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], SpeechToText.prototype, "onResultsCallback", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], SpeechToText.prototype, "onRestartCallback", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], SpeechToText.prototype, "positionTop", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], SpeechToText.prototype, "autoRetry", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], SpeechToText.prototype, "visibleChange", void 0);
    SpeechToText = tslib_1.__decorate([
        Component({
            selector: "speech-to-text",
            //#region template:
            template: "\n    <div [@modalDialogTrigger] *ngIf=\"isVisible\" class=\"modalDialog\" style=\"width: 350px; height: 73px; \" [style.top.px]=\"positionTop\"  >\n        <ng-content></ng-content>\n        <button *ngIf=\"isClosable\" (click)=\"closeDialog()\" aria-label=\"Close\" class=\"dialog__close-btn\">X</button>\n        <div style=\"text-align: center; \">\n            <i class=\"fa fa-microphone fa-2x\" style=\"color: cornflowerblue; float:left; margin-left: 20px;\"></i>\n            <div class=\"btn-group\" style=\"margin-right: 20px;\">\n                <button class=\"btn btn-primary btn-sm\" [disabled]=\"!s2tOn\" style=\"width: 75px;\" (click)=\"onClickStop()\">Stop</button>\n                <button class=\"btn btn-primary btn-sm\" [disabled]=\"!s2tOn\" style=\"width: 75px;\" (click)=\"onClickPause()\">Pause</button>\n                <button class=\"btn btn-primary btn-sm\" [disabled]=\"s2tOn\" style=\"width: 75px;\" (click)=\"onClickStart()\">{{ startButtonLabel }}</button>\n           </div>\n           <br />\n           <div id=\"debugText\" style=\"color: red; font-weight: bold; overflow: hidden; \"></div> \n         </div>\n    </div>\n    <div *ngIf=\"isVisible\" class=\"overlay\" (click)=\"closeDialog()\"></div>\n    ",
            // #endregion
            //#region styles:
            styles: ["\n    .overlay {\n      position: fixed;\n      top: 0;\n      bottom: 0;\n      left: 0;\n      right: 0;\n      background-color: rgba(0, 0, 0, 0.25);\n      z-index: 999;\n    }\n    .modalDialog {\n      z-index: 1000;\n      position: fixed;\n      right: 0;\n      left: 0;\n      top: 20px;\n      margin-top: 100px;\n      margin-right: auto;\n      margin-left: auto;\n      height: 200px;\n      width: 90%;\n      max-width: 520px;\n      background-color: #fff;\n      padding: 12px;\n      box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2), 0 13px 19px 2px rgba(0, 0, 0, 0.14), 0 5px 24px 4px rgba(0, 0, 0, 0.12);\n     -ms-border-radius: 5px !important;\n     border-radius: 25px !important;\n    }\n    @media (min-width: 768px) {\n      .modalDialog {\n        top: 40px;\n      }\n    }\n    .dialog__close-btn {\n      border: 0;\n      background: none;\n      color: #2d2d2d;\n      position: absolute;\n      top: 8px;\n      right: 8px;\n      font-size: 1.2em;\n      cursor: pointer;\n    }\n    "],
            // #endregion
            animations: [
                trigger("modalDialogTrigger", [
                    transition("void => *", [
                        style({ transform: "scale3d(.3, .3, .3)" }),
                        animate(100)
                    ]),
                    transition("* => void", [
                        animate(100, style({ transform: "scale3d(.0, .0, .0)" }))
                    ])
                ])
            ]
        }),
        tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef])
    ], SpeechToText);
    return SpeechToText;
}());
export { SpeechToText };
//# sourceMappingURL=speechToText.js.map