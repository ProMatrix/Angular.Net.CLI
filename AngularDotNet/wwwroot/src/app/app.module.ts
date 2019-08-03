import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// ngxs
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsStoragePluginModule, STORAGE_ENGINE } from '@ngxs/storage-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { AppState } from '../../shared/modules/app.state';
import { AppStorageEngine } from './app.storage.engine';


import { AppRoutingModule } from './app.routing.module';
import { AppAnimation } from '../../shared/ng2-animation/appAnimation';
import { AppMobileTech } from '../../shared/ng2-mobiletech/appMobileTech';
import { AppHelper } from '../../shared/ng2-apphelper/appHelper';

// features
import { AppComponent } from './app.component';
import { AlreadyReadyComponent, AlreadyReadyHelpDialogComponent } from '../../features/alreadyReady.component';
import { HttpDemoComponent, HttpDemoHelpDialogComponent } from '../../features/httpDemo.component';
import { AnalyticsComponent, AnalyticsHelpDialogComponent } from '../../features/analytics.component';
import { FeaturesComponent, FeaturesHelpDialogComponent } from '../../features/features.component';
import { SettingsComponent, SettingsHelpDialogComponent } from '../../features/settings.component';
import { SplashComponent, SplashHelpDialogComponent } from '../../features/splash.component';
import { NotificationModule } from '../../features/notification/notification.module';
import { MobileApisModule } from '../../features/mobileApis/mobileApis.module';
import { MaterialModule } from '../../shared/modules/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ToolbarComponent, ApplicationAboutDialogComponent } from './toolbar.component';
import { ContentComponent } from './content.component';
import { SideNavComponent } from './side-nav.component';

import { BaseHelpDialogComponent } from '../../features/base.help.dialog';
import { NotificationHelpDialogComponent } from '../../features/notification/notification.component';
import { MobileApisHelpDialogComponent } from '../../features/mobileApis/mobileApis.component';

import { FileTransferDialogComponent } from '../../shared/enterprise/file.transfer.dialog';

@NgModule({
  declarations: [
    AppComponent, AlreadyReadyComponent, AnalyticsComponent, ContentComponent,
    SettingsComponent, SplashComponent, ToolbarComponent, BaseHelpDialogComponent,
    NotificationHelpDialogComponent, MobileApisHelpDialogComponent, SplashHelpDialogComponent,
    SettingsHelpDialogComponent, AnalyticsHelpDialogComponent, FeaturesHelpDialogComponent,
    AlreadyReadyHelpDialogComponent, HttpDemoComponent, HttpDemoHelpDialogComponent,
    ApplicationAboutDialogComponent, FeaturesComponent, SideNavComponent, FileTransferDialogComponent
  ],
  entryComponents: [NotificationHelpDialogComponent, MobileApisHelpDialogComponent,
    ApplicationAboutDialogComponent, FileTransferDialogComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AppAnimation,
    AppMobileTech,
    AppHelper.forRoot(),
    NgxsModule.forRoot([
      AppState
    ]),
    NgxsStoragePluginModule.forRoot(),
    NotificationModule, MobileApisModule, AppRoutingModule,
    MaterialModule, FlexLayoutModule,
    NgxsReduxDevtoolsPluginModule.forRoot(), // Should be last in the list
    NgxsLoggerPluginModule.forRoot()
  ],
  providers: [
    {
      provide: STORAGE_ENGINE,
      useClass: AppStorageEngine,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
