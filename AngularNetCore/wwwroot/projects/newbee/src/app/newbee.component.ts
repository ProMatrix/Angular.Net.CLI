import { Component, OnInit, AfterViewChecked, AfterViewInit, EventEmitter, Output, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// services
import { AppConfig } from '../../../../common/appConfig';


@Component({
  // #region template
  templateUrl: './newbee.component.html'
  // #endregion
})
export class NewbeeComponent implements OnInit, AfterViewChecked {
  private isViewVisible = false;
  private timerId = null;

  constructor(private readonly ac: AppConfig) {
  }

  ngOnInit() {
    this.ac.waitUntilInitialized(() => {
      setTimeout(() => {
        this.isViewVisible = true;
      }, 0);
    });
  }

  ngAfterViewChecked() {

  }

  onClickDebug() {
    debugger;
  }
}

@Component({
  templateUrl: './newbee.component.help.html'
})
export class NewbeeHelpDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {
  }) {
    // data contains values passed by the router
  }
}
