import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// ngxs
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { SideNavState } from './side-nav.component.state';
import { HttpDemoState } from '../../features/httpdemo.component.state';

import { AppRoutingModule } from './app.routing.module';
import { AppAnimationModule } from '../../shared/ng2-animation/appAnimation.module';
import { MobileTechModule } from '../../shared/ng2-mobiletech/mobileTech.module';
import { AppHelperModule } from '../../shared/ng2-apphelper/appHelper.module';

// features
import { AppComponent } from './app.component';
import { AlreadyReadyComponent, AlreadyReadyHelpDialogComponent } from '../../features/alreadyReady.component';
import { HttpDemoComponent, HttpDemoHelpDialogComponent } from '../../features/httpDemo.component';
import { AnalyticsComponent, AnalyticsHelpDialogComponent } from '../../features/analytics.component';
import { FeaturesComponent, FeaturesHelpDialogComponent } from '../../features/features.component';
import { SettingsComponent, SettingsHelpDialogComponent } from '../../features/settings.component';
import { SplashComponent, SplashHelpDialogComponent } from '../../features/splash.component';
import { NotificationModule } from '../../features/notification.module';
import { MobileApisModule } from '../../features/mobileApis.module';
import { MaterialModule } from '../../shared/modules/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ToolbarComponent, ApplicationAboutDialogComponent } from './toolbar.component';
import { ContentComponent } from './content.component';
import { SideNavComponent } from './side-nav.component';
import { BaseHelpDialogComponent } from '../../features/base.help.dialog';
import { NotificationHelpDialogComponent } from '../../features/notification.component';
import { MobileApisHelpDialogComponent } from '../../features/mobileApis.component';
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
    AppAnimationModule,
    MobileTechModule,
    AppHelperModule.forRoot(),
    NgxsModule.forRoot([
      SideNavState, HttpDemoState
    ]),
    NotificationModule, MobileApisModule, AppRoutingModule,
    MaterialModule, FlexLayoutModule,
    NgxsReduxDevtoolsPluginModule.forRoot(), // Should be last in the list
    NgxsLoggerPluginModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
