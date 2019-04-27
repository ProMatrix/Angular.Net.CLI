import { NgModule } from '@angular/core';
import { MobileApisComponent } from "../../features/mobileApis/mobileApis.component";
import { RequiredModulesModule } from "../../features/requiredModules.module";
import { StoreModule } from "@ngrx/store";
import { reducer } from './mobileApis.reducer';

@NgModule({
  declarations: [
    MobileApisComponent
  ],
  imports: [
    RequiredModulesModule,
    StoreModule.forFeature("mobileApis", reducer)
  ]
})
export class MobileApisModule { }
