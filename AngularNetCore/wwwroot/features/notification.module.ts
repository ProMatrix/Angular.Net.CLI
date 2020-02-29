import { NgModule } from '@angular/core';
import { NotificationComponent, NotificationHelpDialogComponent } from './notification.component';
import { FormsModule } from '@angular/forms';
import { AppAnimationModule, MobileTechModule, AppHelperModule, MaterialModule } from 'ngx-motion';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    NotificationComponent
  ],
  imports: [
    FormsModule,
    AppAnimationModule,
    MobileTechModule,
    MaterialModule,
    AppHelperModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'notification',
        component: NotificationComponent,
            data: { debugOnly: false, title: 'Notification', subtitle: 'Notification System', show: true, helpTemplate: NotificationHelpDialogComponent }
      },
    ])
  ]
})
export class NotificationModule { }
