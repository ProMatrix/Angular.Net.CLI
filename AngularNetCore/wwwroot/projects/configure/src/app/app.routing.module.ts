import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevelopmentComponent, DevelopmentHelpDialogComponent } from '../../../../features/development.component';


const routes: Routes = [
    { path: '', component: DevelopmentComponent },
  {
    path: 'development', component: DevelopmentComponent,
      data: { debugOnly: true, title: 'Development', subtitle: 'Development Utilities', show: true, helpTemplate: DevelopmentHelpDialogComponent }
  },
  {
    path: 'restart', redirectTo: '', pathMatch: 'full',
      data: { debugOnly: false, title: 'Restart', subtitle: 'Restarting the Application...', show: true, helpTemplate: DevelopmentHelpDialogComponent }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
