import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { AppAnimation } from "../shared/ng2-animation/appAnimation";
import { AppMobileTech } from "../shared/ng2-mobiletech/appMobileTech";
import { AppHelper } from "../shared/ng2-apphelper/appHelper";
import { RouterModule } from "@angular/router";
import { NotificationComponent } from "../features/notification/notification.component";
import { MobileApisComponent } from "../features/mobileApis/mobileApis.component";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    AppAnimation,
    AppMobileTech,
    AppHelper.forRoot(),
    RouterModule.forChild([
      { path: "notification", component: NotificationComponent, data: { subtitle: "Immediate Notification" } },
      { path: "mobileApis", component: MobileApisComponent, data: { subtitle: "Mobile API features" } },
    ])
  ],
  exports: [
    AppAnimation,
    AppMobileTech,
    AppHelper
  ]
})
export class RequiredModulesModule { }
