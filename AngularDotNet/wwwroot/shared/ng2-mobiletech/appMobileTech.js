import * as tslib_1 from "tslib";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SpeechToText } from "./speechToText";
import { TextToSpeech } from "./textToSpeech";
import { GoogleMaps } from "./googleMaps";
var AppMobileTech = /** @class */ (function () {
    function AppMobileTech() {
    }
    AppMobileTech = tslib_1.__decorate([
        NgModule({
            imports: [CommonModule],
            declarations: [SpeechToText, TextToSpeech, GoogleMaps],
            exports: [
                CommonModule,
                FormsModule,
                SpeechToText,
                TextToSpeech,
                GoogleMaps
            ],
            providers: []
        })
    ], AppMobileTech);
    return AppMobileTech;
}());
export { AppMobileTech };
//# sourceMappingURL=appMobileTech.js.map