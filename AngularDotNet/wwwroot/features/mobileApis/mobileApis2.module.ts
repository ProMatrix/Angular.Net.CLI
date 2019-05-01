import { NgModule } from '@angular/core';
import { MobileApisComponent } from "../../features/mobileApis/mobileApis.component";
import { RequiredModules2Module } from "../../features/requiredModules2.module";
import { StoreModule } from "@ngrx/store";
import { reducer } from './mobileApis.reducer';

@NgModule({
  declarations: [
    MobileApisComponent
  ],
  imports: [
    RequiredModules2Module,
    StoreModule.forFeature("mobileApis", reducer)
  ]
})
export class MobileApis2Module { }
