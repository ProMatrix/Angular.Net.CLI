import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpeechToText } from './speechToText';
import { TextToSpeech } from './textToSpeech';
import { GoogleMaps } from './googleMaps';

@NgModule({
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
export class AppMobileTech { }
