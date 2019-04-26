import { NgModule } from '@angular/core';
import { NotificationComponent } from "../../features/notification/notification.component";
import { RequiredModulesModule } from "../../features/requiredModules.module";

@NgModule({
  declarations: [
    NotificationComponent
  ],
  imports: [
    RequiredModulesModule
  ]
})
export class NotificationModule { }
