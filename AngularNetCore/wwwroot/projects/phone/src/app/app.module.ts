import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// features
import { AppComponent } from './app.component';
// services
import { AppAnimationModule } from '../../../../library_ng/ng2-animation/appAnimation.module';
import { MobileTechModule } from '../../../../library_ng/ng2-mobiletech/mobileTech.module';
import { AppHelperModule } from '../../../../library_ng/ng2-apphelper/appHelper.module';

// ngxs
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { MobileApisModule } from '../../../../features/mobileApis.module';

import { MaterialModule } from '../../../../library_ng/modules/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { BaseHelpDialogComponent } from '../../../../features/base.help.dialog';
import { MobileApisHelpDialogComponent } from '../../../../features/mobileApis.component';

@NgModule({
  declarations: [AppComponent, BaseHelpDialogComponent, MobileApisHelpDialogComponent],
  imports: [BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AppAnimationModule,
    MobileTechModule,
    AppHelperModule.forRoot(),
    MobileApisModule,
    RouterModule.forRoot([
    ]),
    NgxsModule.forRoot([
    ]),
    MobileApisModule,
    NgxsReduxDevtoolsPluginModule.forRoot(), // Should be last in the list
    NgxsLoggerPluginModule.forRoot(), MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
