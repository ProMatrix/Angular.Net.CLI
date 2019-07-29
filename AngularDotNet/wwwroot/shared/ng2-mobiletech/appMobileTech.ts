import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpeechToTextComponent } from './speechToText';
import { TextToSpeechComponent } from './textToSpeech';
import { GoogleMapsComponent } from './googleMaps';

@NgModule({
    imports: [CommonModule],
  declarations: [SpeechToTextComponent, TextToSpeechComponent, GoogleMapsComponent],
    exports: [
        CommonModule,
        FormsModule,
      SpeechToTextComponent,
      TextToSpeechComponent,
      GoogleMapsComponent
    ],
    providers: []
})
export class AppMobileTech { }
