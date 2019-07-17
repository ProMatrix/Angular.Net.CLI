import { BrowserModule } from "@angular/platform-browser";
import { NgModule, enableProdMode } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// ngxs
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { AppState } from '../../shared/modules/app.state';

import { AppRoutingModule } from './app.routing.module';
import { AppAnimation } from "../../shared/ng2-animation/appAnimation";
import { AppMobileTech } from "../../shared/ng2-mobiletech/appMobileTech";
import { AppHelper } from "../../shared/ng2-apphelper/appHelper";

// features
import { AppComponent } from './app.component';
import { AlreadyReadyComponent, AlreadyReadyHelpDialog } from "../../features/alreadyReady.component";
import { HttpDemoComponent, HttpDemoHelpDialog } from "../../features/httpDemo.component";
import { AnalyticsComponent, AnalyticsHelpDialog } from "../../features/analytics.component";
import { FeaturesComponent, FeaturesHelpDialog } from "../../features/features.component";
import { SettingsComponent, SettingsHelpDialog } from "../../features/settings.component";
import { SplashComponent, SplashHelpDialog } from "../../features/splash.component";
import { NotificationModule } from '../../features/notification/notification.module';
import { MobileApisModule } from '../../features/mobileApis/mobileApis.module';
import { MaterialModule } from '../../shared/modules/material.module';
import { FlexLayoutModule } from "@angular/flex-layout";

import { ToolbarComponent, ApplicationAboutDialog } from './toolbar.component';
import { ContentComponent } from './content.component';
import { SideNavComponent } from './side-nav.component';

import { BaseHelpDialog } from '../../features/base.help.dialog';
import { NotificationHelpDialog } from '../../features/notification/notification.component';
import { MobileApisHelpDialog } from '../../features/mobileApis/mobileApis.component';

import { FileTransferDialog } from "../../shared/enterprise/file.transfer.dialog";

@NgModule({
  declarations: [
    AppComponent, AlreadyReadyComponent, AnalyticsComponent, ContentComponent, SettingsComponent, SplashComponent, ToolbarComponent, BaseHelpDialog, NotificationHelpDialog, MobileApisHelpDialog, SplashHelpDialog, SettingsHelpDialog, AnalyticsHelpDialog, FeaturesHelpDialog, AlreadyReadyHelpDialog, HttpDemoComponent, HttpDemoHelpDialog, ApplicationAboutDialog, FeaturesComponent, SideNavComponent, FileTransferDialog
  ],
  entryComponents: [NotificationHelpDialog, MobileApisHelpDialog, ApplicationAboutDialog, FileTransferDialog],
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
    NotificationModule, MobileApisModule, AppRoutingModule,
    MaterialModule, FlexLayoutModule,
    NgxsReduxDevtoolsPluginModule.forRoot(), // Should be last in the list
    NgxsLoggerPluginModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
