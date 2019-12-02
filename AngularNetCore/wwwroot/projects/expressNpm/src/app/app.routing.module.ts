import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpressNpmComponent, ExpressNpmHelpDialogComponent } from './expressNpm.component';


const routes: Routes = [
    { path: '', component: ExpressNpmComponent },
  {
      path: 'expressNpm', component: ExpressNpmComponent,
      data: { debugOnly: true, title: 'ExpressNpm', subtitle: 'ExpressNpm Utilities', show: true, helpExpressNpm: ExpressNpmHelpDialogComponent }
  },
  {
    path: 'restart', redirectTo: '', pathMatch: 'full',
      data: { debugOnly: false, title: 'Restart', subtitle: 'Restarting the Application...', show: true, helpExpressNpm: ExpressNpmHelpDialogComponent }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
