import { Component, ViewChild, EventEmitter, Input, Output, ElementRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { LandingComponent } from './landing.component';
import { OverviewComponent } from './overview.component';
import { SurveyComponent } from './survey.component';

@Component({
  selector: 'app-counter-component',
  templateUrl: "./web.component.html"
})
export class WebComponent implements AfterViewInit, AfterViewChecked {
  @ViewChild(LandingComponent) landing: LandingComponent;
  @ViewChild(OverviewComponent) overview: OverviewComponent;
  @ViewChild(SurveyComponent) survey: SurveyComponent;

  public currentCount = 0;
  currentComponent = "landing";
  showNavigation = false;

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
  }

  ngAfterViewChecked() {
    if (this.landing)
      this.landing.parent = this;
    if (this.overview)
      this.overview.parent = this;
  }

  ngOnInit() {


  }

}
