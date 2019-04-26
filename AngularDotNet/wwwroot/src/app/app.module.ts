import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { StoreModule } from "@ngrx/store";

import { AppAnimation } from "../../shared/ng2-animation/appAnimation";
import { AppMobileTech } from "../../shared/ng2-mobiletech/appMobileTech";
import { AppHelper } from "../../shared/ng2-apphelper/appHelper";

// features
import { AppComponent } from './app.component';
import { AlreadyReadyComponent } from "../../features/alreadyReady.component";
import { AnalyticsComponent } from "../../features/analytics.component";
import { FeaturesComponent } from "../../features/features.component";
import { MobileApisComponent } from "../../features/mobileApis/mobileApis.component";
import { SettingsComponent } from "../../features/settings.component";
import { SplashComponent } from "../../features/splash.component";
import { NotificationModule } from '../../features/notification/notification.module';

@NgModule({
  declarations: [
    AppComponent, AlreadyReadyComponent, AnalyticsComponent, FeaturesComponent, MobileApisComponent, SettingsComponent, SplashComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AppAnimation,
    AppMobileTech,
    AppHelper.forRoot(),

    RouterModule.forRoot([
      { path: "", component: SplashComponent, data: { subtitle: "Quick SPLASH" } },
      { path: "splash", component: SplashComponent, data: { subtitle: "Quick SPLASH" } },
      { path: "settings", component: SettingsComponent, data: { subtitle: "VERSIONS & SETTINGS" } },
      { path: "analytics", component: AnalyticsComponent, data: { subtitle: "Application Analytics" } },
      { path: "features", component: FeaturesComponent, data: { subtitle: "More About this Application" } },
      { path: 'alreadyReady', component: AlreadyReadyComponent, data: { subtitle: "Feature Quick Start" } },
      { path: "mobileApis", component: MobileApisComponent, data: { subtitle: "Modern Mobile Features" } },
      { path: "**", redirectTo: "/splash", pathMatch: "full" }
    ]),
    ToastrModule.forRoot(
      {
        timeOut: 5000,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
      }
    ),
    StoreModule.forRoot({}),
    NotificationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
