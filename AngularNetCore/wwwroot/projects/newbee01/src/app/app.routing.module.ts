import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Newbee01Component, Newbee01HelpDialogComponent } from './newbee01.component';


const routes: Routes = [
    { path: '', component: Newbee01Component },
  {
      path: 'template', component: Newbee01Component,
      data: { debugOnly: true, title: 'Newbee01', subtitle: 'Newbee01 Utilities', show: true, helpNewbee01: Newbee01HelpDialogComponent }
  },
  {
    path: 'restart', redirectTo: '', pathMatch: 'full',
      data: { debugOnly: false, title: 'Restart', subtitle: 'Restarting the Application...', show: true, helpNewbee01: Newbee01HelpDialogComponent }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
