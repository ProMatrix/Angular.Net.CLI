import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevelopmentComponent, DevelopmentHelpDialogComponent } from '../../features/development.component';
import { AlreadyReadyComponent, AlreadyReadyHelpDialogComponent } from '../../features/alreadyReady.component';
import { HttpDemoComponent, HttpDemoHelpDialogComponent } from '../../features/httpDemo.component';
import { AnalyticsComponent, AnalyticsHelpDialogComponent } from '../../features/analytics.component';
import { FeaturesComponent, FeaturesHelpDialogComponent } from '../../features/features.component';
import { SettingsComponent, SettingsHelpDialogComponent } from '../../features/settings.component';
import { SplashComponent, SplashHelpDialogComponent } from '../../features/splash.component';
import { MobileApisModule } from '../../features/mobileApis.module';
import { NotificationModule } from '../../features/notification.module';

const routes: Routes = [
  { path: '', component: SplashComponent },
  {
    path: 'splash', component: SplashComponent,
      data: { debugOnly: false, title: 'Technologies', subtitle: 'Quick SPLASH', show: true, helpTemplate: SplashHelpDialogComponent }
  },
  {
    path: 'settings', component: SettingsComponent,
      data: { debugOnly: false, title: 'Settings', subtitle: 'VERSIONS & SETTINGS', show: true, helpTemplate: SettingsHelpDialogComponent }
  },
  {
    path: 'analytics', component: AnalyticsComponent,
      data: { debugOnly: false, title: 'Analytics', subtitle: 'Application Analytics', show: true, helpTemplate: AnalyticsHelpDialogComponent }
  },
  {
    path: 'features', component: FeaturesComponent,
      data: { debugOnly: false, title: 'Features', subtitle: 'More About this Application', show: true, helpTemplate: FeaturesHelpDialogComponent }
  },
  {
    path: 'alreadyReady', component: AlreadyReadyComponent,
      data: { debugOnly: false, title: 'Already Ready', subtitle: 'Feature Quick Start', show: true, helpTemplate: AlreadyReadyHelpDialogComponent }
  },
  {
    path: 'httpDemo', component: HttpDemoComponent,
      data: { debugOnly: false, title: 'Http Demo', subtitle: 'Features of the Http Service', show: true, helpTemplate: HttpDemoHelpDialogComponent }
  },
  {
    path: 'development', component: DevelopmentComponent,
      data: { debugOnly: true, title: 'Developement', subtitle: 'Developement Utilities', show: true, helpTemplate: DevelopmentHelpDialogComponent }
  },
  { path: '**', redirectTo: '/splash', pathMatch: 'full' },
  {
    path: 'restart', redirectTo: '', pathMatch: 'full',
      data: { debugOnly: false, title: 'Restart', subtitle: 'Restarting the Application...', show: true, helpTemplate: SplashHelpDialogComponent }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
