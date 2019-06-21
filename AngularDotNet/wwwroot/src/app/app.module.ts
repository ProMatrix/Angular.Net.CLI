import { BrowserModule } from "@angular/platform-browser";
import { NgModule, enableProdMode } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { SplashHelpDialog } from "../../features/splash.component.help";
import { SettingsHelpDialog } from "../../features/settings.component.help";
import { AnalyticsHelpDialog } from "../../features/anaytics.component.help";
import { FeaturesHelpDialog } from "../../features/features.component.help";
import { AlreadyReadyHelpDialog } from "../../features/alreadyReady.component.help";

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
import { AlreadyReadyComponent } from "../../features/alreadyReady.component";
import { AnalyticsComponent } from "../../features/analytics.component";
import { FeaturesComponent } from "../../features/features.component";
import { SettingsComponent } from "../../features/settings.component";
import { SplashComponent } from "../../features/splash.component";
import { NotificationModule } from '../../features/notification/notification.module';
import { MobileApisModule } from '../../features/mobileApis/mobileApis.module';
import { MaterialModule } from '../../shared/modules/material.module';
import { FlexLayoutModule } from "@angular/flex-layout";

import { ToolbarComponent } from './toolbar.component';
import { ContentComponent } from './content.component';
import { SideNavComponent } from './side-nav.component';

import { BaseHelpDialog } from '../../features/base.help.dialog';
import { NotificationHelpDialog } from '../../features/notification/notification.component.help';
import { MobileApisHelpDialog } from '../../features/mobileApis/mobileApis.component.help';
import { ApplicationAboutDialog } from './toolbar.component.help';

@NgModule({
  declarations: [
    AppComponent, AlreadyReadyComponent, AnalyticsComponent, ContentComponent, SettingsComponent, SplashComponent, ToolbarComponent, BaseHelpDialog, NotificationHelpDialog, MobileApisHelpDialog, SplashHelpDialog, SettingsHelpDialog, AnalyticsHelpDialog, FeaturesHelpDialog, AlreadyReadyHelpDialog, ApplicationAboutDialog, FeaturesComponent, SideNavComponent
  ],
  entryComponents: [NotificationHelpDialog, MobileApisHelpDialog, ApplicationAboutDialog],
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
