import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AppAnimation } from "../../shared/ng2-animation/appAnimation";
import { AppMobileTech } from "../../shared/ng2-mobiletech/appMobileTech";
import { AppHelper } from "../../shared/ng2-apphelper/appHelper";
import { SpeechToText } from "../../shared/ng2-mobiletech/speechToText";
import { TextToSpeech } from "../../shared/ng2-mobiletech/textToSpeech";
import { GoogleMaps } from "../../shared/ng2-mobiletech/googleMaps";
import { AppServices } from "../../shared/ng2-apphelper/appServices";
import { CellCarrier, TextMessage } from "../../shared/client-side-models/buildModels";

import { MobileApisComponent } from "../../features/mobileApis/mobileApis.component";

@NgModule({
  declarations: [
    MobileApisComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppAnimation,
    AppMobileTech,
    AppHelper.forRoot(),
    RouterModule.forChild([
      { path: "notification", component: MobileApisComponent, data: { subtitle: "Immediate Notification" } },
    ])
  ]
})
export class MobileApisModule { }
