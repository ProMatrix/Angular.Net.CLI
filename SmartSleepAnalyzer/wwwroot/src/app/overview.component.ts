import { Component, OnInit } from '@angular/core';
import { WebComponent } from './web.component';

@Component({
  selector: 'app-overview',
  templateUrl: "./overview.component.html",
  styles: []
})
export class OverviewComponent implements OnInit {
  parent: WebComponent;

  constructor() { }

  ngOnInit() {
  }

  onStartSurvey(option: string) {
    this.parent.currentComponent = "survey";
  }

}
