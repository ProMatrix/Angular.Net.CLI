import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpressDirectComponent, ExpressDirectHelpDialogComponent } from './expressDirect.component';


const routes: Routes = [
    { path: '', component: ExpressDirectComponent },
  {
      path: 'expressDirect', component: ExpressDirectComponent,
      data: { debugOnly: true, title: 'ExpressDirect', subtitle: 'ExpressDirect Utilities', show: true, helpExpressDirect: ExpressDirectHelpDialogComponent }
  },
  {
    path: 'restart', redirectTo: '', pathMatch: 'full',
      data: { debugOnly: false, title: 'Restart', subtitle: 'Restarting the Application...', show: true, helpExpressDirect: ExpressDirectHelpDialogComponent }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
