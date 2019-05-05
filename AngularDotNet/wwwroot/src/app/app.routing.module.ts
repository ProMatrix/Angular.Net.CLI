import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlreadyReadyComponent } from "../../features/alreadyReady.component";
import { AnalyticsComponent } from "../../features/analytics.component";
import { FeaturesComponent } from "../../features/features.component";
import { SettingsComponent } from "../../features/settings.component";
import { SplashComponent } from "../../features/splash.component";
import { MobileApisModule } from "../../features/mobileApis/mobileApis.module";
import { NotificationModule } from "../../features/notification/notification.module";

const routes: Routes = [
  { path: "", component: SplashComponent, data: { subtitle: "Quick SPLASH" } },
  { path: "splash", component: SplashComponent, data: { subtitle: "Quick SPLASH" } },
  { path: "settings", component: SettingsComponent, data: { subtitle: "VERSIONS & SETTINGS" } },
  { path: "analytics", component: AnalyticsComponent, data: { subtitle: "Application Analytics" } },
  { path: "features", component: FeaturesComponent, data: { subtitle: "More About this Application" } },
  { path: 'alreadyReady', component: AlreadyReadyComponent, data: { subtitle: "Feature Quick Start" } },
  { path: "**", redirectTo: "/splash", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), MobileApisModule, NotificationModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
