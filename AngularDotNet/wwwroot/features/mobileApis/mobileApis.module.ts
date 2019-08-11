import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppAnimation } from '../../shared/ng2-animation/appAnimation';
import { MobileTechModule } from '../../shared/ng2-mobiletech/mobileTech.module';
import { AppHelper } from '../../shared/ng2-apphelper/appHelper';
import { RouterModule } from '@angular/router';
import { MobileApisComponent } from '../../features/mobileapis/mobileApis.component';
import { NgxsModule } from '@ngxs/store';
import { MobileApisState } from './mobileApis.state';
import { MaterialModule } from '../../shared/modules/material.module';
import { MobileApisHelpDialogComponent } from '../mobileapis/mobileApis.component';

@NgModule({
  declarations: [
    MobileApisComponent,
  ],
  imports: [
    FormsModule,
    AppAnimation,
    MobileTechModule,
    MaterialModule,
    AppHelper.forRoot(),
    RouterModule.forChild([
      {
        path: 'mobileApis',
        component: MobileApisComponent,
        data: {
          title: 'Mobile Apis',
          subtitle: 'Mobile API features',
          show: true, helpTemplate: MobileApisHelpDialogComponent
        }
      },
    ]),
    NgxsModule.forFeature([
      MobileApisState
    ])
  ]
})
export class MobileApisModule { }
