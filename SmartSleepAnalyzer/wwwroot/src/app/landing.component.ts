import { Component, OnInit } from '@angular/core';
import { WebComponent } from './web.component';
import { MatSelectionList, MatListOption } from '@angular/material/list';
import { SelectionModel } from '@angular/cdk/collections';
@Component({
  selector: 'app-landing',
  templateUrl: "./landing.component.html",
  styles: []
})
export class LandingComponent implements OnInit {
  parent: WebComponent;
  panelOpenState = false;
  showNavigation = false;
  navigationClosed = false;
  sleep_issues: MatSelectionList;

  constructor() { }

  ngOnInit() {
  }

  onStartSurvey(option: string) {
    switch (option) {
      case "decide_sleepbetter_survey":
        this.panelOpenState = !this.panelOpenState;
        break;
      case "take_the_sleepbetter_survey":
        this.parent.currentComponent = "overview";
        break;
    }
  }

  onToggleNavigation() {
  }

  onClickNoneOfAbove(mat: MatSelectionList) {
    mat.options.forEach((item, index) => {
      if (index !== mat.options.length - 1)
        item.selected = false;
    });
  }

}
