import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AppAnimation } from "../../shared/ng2-animation/appAnimation";
import { AppMobileTech } from "../../shared/ng2-mobiletech/appMobileTech";
import { AppHelper } from "../../shared/ng2-apphelper/appHelper";

import { NotificationComponent } from "../../features/notification/notification.component";

@NgModule({
  declarations: [
    NotificationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppAnimation,
    AppMobileTech,
    AppHelper.forRoot(),
    RouterModule.forChild([
      { path: "notification", component: NotificationComponent, data: { subtitle: "Immediate Notification" } },
    ])
  ]
})
export class NotificationModule { }
