import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppAnimationModule } from 'ng2-models';
import { MobileTechModule } from '../../../../NgResources/ng2-models/library/projects/ng2-express/ngx-mobileTech/mobileTech.module';
import { AppHelperModule } from 'ng2-models';
import { RouterModule } from '@angular/router';
import { MobileApisComponent } from './mobileApis.component';
import { NgxsModule } from '@ngxs/store';
import { MobileApisState } from './mobileApis.component.state';
import { MaterialModule } from 'ng2-models';
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
