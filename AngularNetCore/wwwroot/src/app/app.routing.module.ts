import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevelopmentComponent, DevelopmentHelpDialogComponent } from '../../features/development.component';
import { AlreadyReadyComponent, AlreadyReadyHelpDialogComponent } from '../../features/alreadyReady.component';
import { HttpDemoComponent, HttpDemoHelpDialogComponent } from '../../features/httpDemo.component';
import { FeaturesComponent, FeaturesHelpDialogComponent } from '../../features/features.component';
import { SettingsComponent, SettingsHelpDialogComponent } from '../../features/settings.component';
import { SplashComponent, SplashHelpDialogComponent } from '../../features/splash.component';
import { MobileApisModule } from '../../features/mobileApis.module';
import { NotificationModule } from '../../features/notification.module';

const routes: Routes = [
  { path: '', component: SplashComponent },
  {
    path: 'splash', component: SplashComponent,
      data: { debugOnly: false, title: 'Technologies', subtitle: 'Blend of Technologies', show: true, helpTemplate: SplashHelpDialogComponent }
  },
  {
    path: 'settings', component: SettingsComponent,
      data: { debugOnly: false, title: 'Settings', subtitle: 'Versions & Settings', show: true, helpTemplate: SettingsHelpDialogComponent }
  },
  {
    path: 'features', component: FeaturesComponent,
      data: { debugOnly: false, title: 'Features', subtitle: 'Features of the Angular.Net Studio', show: true, helpTemplate: FeaturesHelpDialogComponent }
  },
  {
    path: 'alreadyReady', component: AlreadyReadyComponent,
      data: { debugOnly: false, title: 'Already Ready', subtitle: 'Already Ready', show: true, helpTemplate: AlreadyReadyHelpDialogComponent }
  },
  {
    path: 'httpDemo', component: HttpDemoComponent,
      data: { debugOnly: false, title: 'Http Demos', subtitle: 'Features of the Http Service', show: true, helpTemplate: HttpDemoHelpDialogComponent }
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
