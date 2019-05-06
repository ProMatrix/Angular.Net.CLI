import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AppAnimation } from "../../shared/ng2-animation/appAnimation";
import { AppMobileTech } from "../../shared/ng2-mobiletech/appMobileTech";
import { AppHelper } from "../../shared/ng2-apphelper/appHelper";
import { RouterModule } from "@angular/router";
import { MobileApisComponent } from "../../features/mobileApis/mobileApis.component";
import { NgxsModule } from '@ngxs/store';
import { MobileApisState } from './mobileapis.state';

@NgModule({
  declarations: [
    MobileApisComponent,
  ],
  imports: [
    FormsModule,
    AppAnimation,
    AppMobileTech,
    AppHelper.forRoot(),
    RouterModule.forChild([
      { path: "mobileApis", component: MobileApisComponent, data: { subtitle: "Mobile API features" } },
    ]),
    NgxsModule.forFeature([
      MobileApisState
    ])
  ]
})
export class MobileApisModule { }
