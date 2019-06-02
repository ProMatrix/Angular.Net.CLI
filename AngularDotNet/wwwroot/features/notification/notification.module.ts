/// <reference path="../../src/app/toolbar.component.ts" />
import { NgModule } from '@angular/core';
import { NotificationComponent } from "../../features/notification/notification.component";
import { FormsModule } from "@angular/forms";
import { AppAnimation } from "../../shared/ng2-animation/appAnimation";
import { AppMobileTech } from "../../shared/ng2-mobiletech/appMobileTech";
import { AppHelper } from "../../shared/ng2-apphelper/appHelper";
import { RouterModule } from "@angular/router";
import { MaterialModule } from '../../shared/material/material.module';
import { NotificationHelpDialog } from "../../src/app/toolbar.component";

@NgModule({
  declarations: [
    NotificationComponent
  ],
  imports: [
    FormsModule,
    AppAnimation,
    AppMobileTech,
    MaterialModule,
    AppHelper.forRoot(),
    RouterModule.forChild([
      { path: "notification", component: NotificationComponent, data: { subtitle: "Notification System", template: NotificationHelpDialog } },
    ])
  ]
})
export class NotificationModule { }
