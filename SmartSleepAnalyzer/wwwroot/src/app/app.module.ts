import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { createCustomElement } from "@angular/elements";
import { WebComponent } from './web.component';
import { LandingComponent } from './landing.component';
import { OverviewComponent } from './overview.component';
import { SurveyComponent } from './survey.component';
import { DetailsComponent } from './details.component';
import { PrivacyComponent } from './privacy.component';
import { ResultsComponent } from './results.component';
import { ClockComponent } from './clock.component';

@NgModule({
  declarations: [
    WebComponent,
    LandingComponent,
    OverviewComponent,
    SurveyComponent,
    DetailsComponent,
    PrivacyComponent,
    ResultsComponent,
    ClockComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  entryComponents: [WebComponent]
})
export class AppModule {
  constructor(private injector: Injector) { }

  ngDoBootstrap() {
    const el = createCustomElement(WebComponent, { injector: this.injector });
    customElements.define("philips-ssa", el);
  }
}
