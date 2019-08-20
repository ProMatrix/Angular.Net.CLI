import { NgModule } from '@angular/core';
import { NotificationComponent, NotificationHelpDialogComponent } from './notification.component';
import { FormsModule } from '@angular/forms';
import { AppAnimationModule } from '../shared/ng2-animation/appAnimation.module';
import { MobileTechModule } from '../shared/ng2-mobiletech/mobileTech.module';
import { AppHelperModule } from '../shared/ng2-apphelper/appHelper.module';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/modules/material.module';

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
        data: {
          title: 'Notification',
          subtitle: 'Notification System',
          show: true, helpTemplate: NotificationHelpDialogComponent
        }
      },
    ])
  ]
})
export class NotificationModule { }
