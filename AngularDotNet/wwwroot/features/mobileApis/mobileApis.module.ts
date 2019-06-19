import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AppAnimation } from "../../shared/ng2-animation/appAnimation";
import { AppMobileTech } from "../../shared/ng2-mobiletech/appMobileTech";
import { AppHelper } from "../../shared/ng2-apphelper/appHelper";
import { RouterModule } from "@angular/router";
import { MobileApisComponent } from "../../features/mobileApis/mobileApis.component";
import { NgxsModule } from '@ngxs/store';
import { MobileApisState } from './mobileapis.state';
import { MaterialModule } from '../../shared/modules/material.module';
import { MobileApisHelpDialog } from "../mobileApis/mobileApis.component.help";

@NgModule({
  declarations: [
    MobileApisComponent,
  ],
  imports: [
    FormsModule,
    AppAnimation,
    AppMobileTech,
    MaterialModule,
    AppHelper.forRoot(),
    RouterModule.forChild([
      { path: "mobileApis", component: MobileApisComponent, data: { title: "Mobile Apis", subtitle: "Mobile API features", show: true, helpTemplate: MobileApisHelpDialog } },
    ]),
    NgxsModule.forFeature([
      MobileApisState
    ])
  ]
})
export class MobileApisModule { }
