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
  { path: "", component: SplashComponent },
  { path: "**", redirectTo: "/splash", pathMatch: "full" },
  { path: "splash", component: SplashComponent, data: { title: "Technologies", subtitle: "Quick SPLASH", show: true } },
  { path: "settings", component: SettingsComponent, data: { title: "Settings", subtitle: "VERSIONS & SETTINGS", show: true } },
  { path: "analytics", component: AnalyticsComponent, data: { title: "Analytics", subtitle: "Application Analytics", show: true } },
  { path: "features", component: FeaturesComponent, data: { title: "Features", subtitle: "More About this Application", show: true } },
  { path: 'alreadyReady', component: AlreadyReadyComponent, data: { title: "Already Ready", subtitle: "Feature Quick Start", show: true } },
  { path: "restart", redirectTo: "", pathMatch: "full", data: { title: "Restart", subtitle: "Restarting the Application...", show: true } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), NotificationModule, MobileApisModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
