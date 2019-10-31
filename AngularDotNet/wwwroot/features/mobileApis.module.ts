import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppAnimationModule } from '../shared/ng2-animation/appAnimation.module';
import { MobileTechModule } from '../shared/ng2-mobiletech/mobileTech.module';
import { AppHelperModule } from '../shared/ng2-apphelper/appHelper.module';
import { RouterModule } from '@angular/router';
import { MobileApisComponent } from './mobileApis.component';
import { NgxsModule } from '@ngxs/store';
import { MobileApisState } from './mobileApis.component.state';
import { MaterialModule } from '../shared/modules/material.module';
import { MobileApisHelpDialogComponent } from './mobileApis.component';

@NgModule({
  declarations: [
    MobileApisComponent,
  ],
  imports: [
    FormsModule,
    AppAnimationModule,
    MobileTechModule,
    MaterialModule,
    AppHelperModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'mobileApis',
        component: MobileApisComponent,
            data: { debugOnly: false, title: 'Mobile Apis', subtitle: 'Mobile API features', show: true, helpTemplate: MobileApisHelpDialogComponent }
      },
    ]),
    NgxsModule.forFeature([
      MobileApisState
    ])
  ]
})
export class MobileApisModule { }
