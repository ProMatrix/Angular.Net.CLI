import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewbeeComponent, NewbeeHelpDialogComponent } from './newbee.component';


const routes: Routes = [
    { path: '', component: NewbeeComponent },
  {
      path: 'newbee', component: NewbeeComponent,
      data: { debugOnly: true, title: 'Newbee', subtitle: 'Newbee Utilities', show: true, helpNewbee: NewbeeHelpDialogComponent }
  },
  {
    path: 'restart', redirectTo: '', pathMatch: 'full',
      data: { debugOnly: false, title: 'Restart', subtitle: 'Restarting the Application...', show: true, helpNewbee: NewbeeHelpDialogComponent }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
