import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
// services
import { AppAnimation } from '../../../../shared/ng2-animation/appAnimation';
import { AppMobileTech } from '../../../../shared/ng2-mobiletech/appMobileTech';
import { AppHelper } from '../../../../shared/ng2-apphelper/appHelper';
import { AppServices } from '../../../../shared/ng2-apphelper/appServices';
// features
import { MobileApis } from "../../../../features/mobileApis";

@NgModule({
  declarations: [
    AppComponent, MobileApis
  ],
  imports: [BrowserModule, HttpClientModule, BrowserAnimationsModule, ToastrModule.forRoot(
    {
      timeOut: 5000,
      positionClass: "toast-bottom-right",
      preventDuplicates: true,
    }
  ), AppAnimation, AppMobileTech, AppHelper.forRoot()],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
