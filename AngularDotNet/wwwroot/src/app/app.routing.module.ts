import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlreadyReadyComponent, AlreadyReadyHelpDialog } from "../../features/alreadyReady.component";
import { AnalyticsComponent, AnalyticsHelpDialog } from "../../features/analytics.component";
import { FeaturesComponent, FeaturesHelpDialog } from "../../features/features.component";
import { SettingsComponent, SettingsHelpDialog } from "../../features/settings.component";
import { SplashComponent, SplashHelpDialog } from "../../features/splash.component";
import { MobileApisModule } from "../../features/mobileApis/mobileApis.module";
import { NotificationModule } from "../../features/notification/notification.module";

const routes: Routes = [
  { path: "", component: SplashComponent },
  { path: "splash", component: SplashComponent, data: { title: "Technologies", subtitle: "Quick SPLASH", show: true, helpTemplate: SplashHelpDialog } },
  { path: "settings", component: SettingsComponent, data: { title: "Settings", subtitle: "VERSIONS & SETTINGS", show: true, helpTemplate: SettingsHelpDialog } },
  { path: "analytics", component: AnalyticsComponent, data: { title: "Analytics", subtitle: "Application Analytics", show: true, helpTemplate: AnalyticsHelpDialog } },
  { path: "features", component: FeaturesComponent, data: { title: "Features", subtitle: "More About this Application", show: true, helpTemplate: FeaturesHelpDialog } },
  { path: 'alreadyReady', component: AlreadyReadyComponent, data: { title: "Already Ready", subtitle: "Feature Quick Start", show: true, helpTemplate: AlreadyReadyHelpDialog } },
  { path: "**", redirectTo: "/splash", pathMatch: "full" },
  { path: "restart", redirectTo: "", pathMatch: "full", data: { title: "Restart", subtitle: "Restarting the Application...", show: true, helpTemplate: SplashHelpDialog } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), NotificationModule, MobileApisModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
