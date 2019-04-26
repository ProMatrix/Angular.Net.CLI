import { NgModule } from '@angular/core';
import { MobileApisComponent } from "../../features/mobileApis/mobileApis.component";
import { RequiredModulesModule } from "../../features/requiredModules.module";

@NgModule({
  declarations: [
    MobileApisComponent
  ],
  imports: [
    RequiredModulesModule
  ]
})
export class MobileApisModule { }
