import { NgModule } from '@angular/core';
import { NotificationComponent, NotificationHelpDialogComponent } from './notification.component';
import { FormsModule } from '@angular/forms';
import { AppAnimationModule } from '../library_ng/ng2-animation/appAnimation.module';
import { MobileTechModule } from '../library_ng/ng2-mobiletech/mobileTech.module';
import { AppHelperModule } from 'ng2-models';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'ng2-models';

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
