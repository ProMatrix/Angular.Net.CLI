import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { createCustomElement } from "@angular/elements";
import { CounterComponent } from './counter/counter.component';

@NgModule({
  declarations: [
    CounterComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule
  ],
  entryComponents: [CounterComponent]
})
export class AppModule {
  constructor(private injector: Injector) { }

  ngDoBootstrap() {
    const el = createCustomElement(CounterComponent, { injector: this.injector });
    customElements.define("counter-component", el);
  }
}
