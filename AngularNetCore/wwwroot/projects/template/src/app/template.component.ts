import { Component, OnInit, AfterViewChecked, AfterViewInit, EventEmitter, Output, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// services
import { AppConfig } from '../../../../common/appConfig';

@Component({
    // #region template
    templateUrl: './template.component.html'
    // #endregion
})
export class TemplateComponent implements OnInit, AfterViewChecked {
    isViewVisible = false;
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
}

@Component({
    templateUrl: './template.component.help.html'
})
export class TemplateHelpDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { debugOnly, title, subtitle, show, helpTemplate }) {
        // data contains values passed by the router
    }
}
