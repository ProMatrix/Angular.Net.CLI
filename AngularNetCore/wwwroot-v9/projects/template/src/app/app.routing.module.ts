import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TemplateComponent, TemplateHelpDialogComponent } from './template.component';


const routes: Routes = [
    { path: '', component: TemplateComponent },
  {
      path: 'template', component: TemplateComponent,
      data: { debugOnly: true, title: 'Template', subtitle: 'Template Utilities', show: true, helpTemplate: TemplateHelpDialogComponent }
  },
  {
    path: 'restart', redirectTo: '', pathMatch: 'full',
      data: { debugOnly: false, title: 'Restart', subtitle: 'Restarting the Application...', show: true, helpTemplate: TemplateHelpDialogComponent }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
