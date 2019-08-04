import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlreadyReadyComponent, AlreadyReadyHelpDialogComponent } from '../../features/alreadyReady.component';
import { HttpDemoComponent, HttpDemoHelpDialogComponent } from '../../features/httpDemo.component';
import { AnalyticsComponent, AnalyticsHelpDialogComponent } from '../../features/analytics.component';
import { FeaturesComponent, FeaturesHelpDialogComponent } from '../../features/features.component';
import { SettingsComponent, SettingsHelpDialogComponent } from '../../features/settings.component';
import { SplashComponent, SplashHelpDialogComponent } from '../../features/splash.component';
import { MobileApisModule } from '../../features/mobileApis/mobileApis.module';
import { NotificationModule } from '../../features/notification/notification.module';

const routes: Routes = [
  { path: '', component: SplashComponent },
  {
    path: 'splash', component: SplashComponent,
    data: { title: 'Technologies', subtitle: 'Quick SPLASH', show: true, helpTemplate: SplashHelpDialogComponent }
  },
  {
    path: 'settings', component: SettingsComponent,
    data: { title: 'Settings', subtitle: 'VERSIONS & SETTINGS', show: true, helpTemplate: SettingsHelpDialogComponent }
  },
  {
    path: 'analytics', component: AnalyticsComponent,
    data: { title: 'Analytics', subtitle: 'Application Analytics', show: true, helpTemplate: AnalyticsHelpDialogComponent }
  },
  {
    path: 'features', component: FeaturesComponent,
    data: { title: 'Features', subtitle: 'More About this Application', show: true, helpTemplate: FeaturesHelpDialogComponent }
  },
  {
    path: 'alreadyReady', component: AlreadyReadyComponent,
    data: { title: 'Already Ready', subtitle: 'Feature Quick Start', show: true, helpTemplate: AlreadyReadyHelpDialogComponent }
  },
  {
    path: 'httpDemo', component: HttpDemoComponent,
    data: { title: 'Http Demo', subtitle: 'Features of the Http Service', show: true, helpTemplate: HttpDemoHelpDialogComponent }
  },
  { path: '**', redirectTo: '/splash', pathMatch: 'full' },
  {
    path: 'restart', redirectTo: '', pathMatch: 'full',
    data: { title: 'Restart', subtitle: 'Restarting the Application...', show: true, helpTemplate: SplashHelpDialogComponent }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
