import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { StoreModule } from "@ngrx/store";
// features
import { AppComponent } from './app.component';
// services
import { AppAnimation } from '../../../../shared/ng2-animation/appAnimation';
import { AppMobileTech } from '../../../../shared/ng2-mobiletech/appMobileTech';
import { AppHelper } from '../../../../shared/ng2-apphelper/appHelper';
// features
import { MobileApisModule } from '../../../../features/mobileApis/mobileApis.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AppAnimation,
    AppMobileTech,
    AppHelper.forRoot(),
    MobileApisModule,
    RouterModule.forRoot([
    ]),
    ToastrModule.forRoot(
      {
        timeOut: 5000,
        positionClass: "toast-bottom-right",
        preventDuplicates: true,
      }),
    StoreModule.forRoot({}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
