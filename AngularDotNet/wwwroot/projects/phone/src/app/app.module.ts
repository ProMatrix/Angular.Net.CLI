import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// features
import { AppComponent } from './app.component';
// services
import { AppAnimation } from '../../../../shared/ng2-animation/appAnimation';
import { AppMobileTech } from '../../../../shared/ng2-mobiletech/appMobileTech';
import { AppHelper } from '../../../../shared/ng2-apphelper/appHelper';

// ngxs
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { AppState } from '../../../../shared/modules/app.state';
import { MobileApisModule } from '../../../../features/mobileapis/mobileApis.module';

import { MaterialModule } from '../../../../shared/modules/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { BaseHelpDialogComponent } from '../../../../features/base.help.dialog';
import { MobileApisHelpDialogComponent } from '../../../../features/mobileapis/mobileApis.component';

@NgModule({
  declarations: [AppComponent, BaseHelpDialogComponent, MobileApisHelpDialogComponent],
  imports: [BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AppAnimation,
    AppMobileTech,
    AppHelper.forRoot(),
    MobileApisModule,
    RouterModule.forRoot([
    ]),
    NgxsModule.forRoot([
      AppState
    ]),
    MobileApisModule,
    NgxsReduxDevtoolsPluginModule.forRoot(), // Should be last in the list
    NgxsLoggerPluginModule.forRoot(), MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
