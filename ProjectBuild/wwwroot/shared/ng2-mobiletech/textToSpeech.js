import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from "@angular/core";
import { trigger, animate, transition, style } from "@angular/animations";
var TextToSpeech = /** @class */ (function () {
    function TextToSpeech(cd) {
        this.cd = cd;
        this.isClosable = true;
        this.isUnattended = false;
        this.positionTop = 20;
        this.visibleChange = new EventEmitter();
        this.initalized = false;
        this.t2sOn = false;
        this.t2sPaused = false;
        this.featureIsAvailable = true;
    }
    TextToSpeech.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.initalized = true;
            _this.setupT2S();
        }, 500);
    };
    TextToSpeech.prototype.setupT2S = function () {
        try {
            this.t2s = window.speechSynthesis;
            var textToSpeak = new SpeechSynthesisUtterance("testing... 1, 2, 3");
        }
        catch (e) {
            this.featureIsAvailable = false;
            return;
        }
    };
    TextToSpeech.prototype.ngOnChanges = function () {
        if (!this.initalized)
            return;
        if (!this.t2sOn) {
            this.startButtonLabel = "Start";
            this.onClickStart();
        }
    };
    TextToSpeech.prototype.closeDialog = function () {
        if (this.t2sOn || this.t2sPaused)
            this.onClickStop();
        this.isVisible = false;
        this.visibleChange.emit(this.isVisible);
    };
    TextToSpeech.prototype.Start = function () {
        var _this = this;
        if (this.t2sPaused) {
            this.t2s.resume();
        }
        else {
            var textToSpeak = new SpeechSynthesisUtterance(this.textToSpeak);
            this.t2s.speak(textToSpeak);
            textToSpeak.onend = function (event) {
                _this.onClickStop();
                _this.cd.detectChanges();
            };
        }
        this.t2sOn = true;
        this.t2sPaused = false;
        this.owner[this.onChangeCallback]();
    };
    TextToSpeech.prototype.onClickStart = function () {
        this.Start();
    };
    TextToSpeech.prototype.onClickStop = function () {
        this.t2s.cancel();
        this.t2sOn = false;
        this.t2sPaused = false;
        this.startButtonLabel = "Restart";
        this.owner[this.onChangeCallback]();
    };
    TextToSpeech.prototype.onClickPause = function () {
        this.t2sOn = false;
        this.t2sPaused = true;
        this.t2s.pause();
        this.startButtonLabel = "Resume";
        this.owner[this.onChangeCallback]();
    };
    TextToSpeech.prototype.ngOnDestroy = function () {
        if (this.t2sOn)
            this.onClickStop();
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TextToSpeech.prototype, "isClosable", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TextToSpeech.prototype, "isUnattended", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], TextToSpeech.prototype, "isVisible", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], TextToSpeech.prototype, "textToSpeak", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TextToSpeech.prototype, "owner", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], TextToSpeech.prototype, "onChangeCallback", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TextToSpeech.prototype, "positionTop", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], TextToSpeech.prototype, "visibleChange", void 0);
    TextToSpeech = tslib_1.__decorate([
        Component({
            selector: "text-to-speech",
            //#region template:
            template: "\n    <div [@modalDialogTrigger] *ngIf=\"isVisible\" class=\"modalDialog\" style=\"width: 350px; height: 53px; \" [style.top.px]=\"positionTop\"  >\n        <ng-content></ng-content>\n\n        <button *ngIf=\"isClosable\" (click)=\"closeDialog()\" aria-label=\"Close\" class=\"dialog__close-btn\">X</button>\n        <div style=\"text-align: center; \">\n            <i class=\"fa fa-volume-up fa-2x\" style=\"color: cornflowerblue; float:left; margin-left: 20px;\"></i>\n            <div class=\"btn-group\" style=\"margin-right: 20px;\">\n                <button class=\"btn btn-primary btn-sm\" [disabled]=\"!t2sOn\" style=\"width: 75px;\" (click)=\"onClickStop()\">Stop</button>\n                <button class=\"btn btn-primary btn-sm\" [disabled]=\"!t2sOn\" style=\"width: 75px;\" (click)=\"onClickPause()\">Pause</button>\n                <button class=\"btn btn-primary btn-sm\" [disabled]=\"t2sOn\" style=\"width: 75px;\" (click)=\"onClickStart()\">{{ startButtonLabel }}</button>\n            </div>\n         </div>\n    </div>\n    <div *ngIf=\"isVisible\" class=\"overlay\" (click)=\"closeDialog()\"></div>\n    ",
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
    ], TextToSpeech);
    return TextToSpeech;
}());
export { TextToSpeech };
//# sourceMappingURL=textToSpeech.js.map