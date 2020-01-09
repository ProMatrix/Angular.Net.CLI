import { Component, OnInit, AfterViewChecked, AfterViewInit, EventEmitter, Output, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// services
import { AppConfig } from '../../../../common/appConfig';
import { TimingMetrics } from 'ng2-models';


@Component({
    // #region template
    templateUrl: './template.component.html'
    // #endregion
})
export class TemplateComponent implements OnInit, AfterViewChecked {
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
}

@Component({
    templateUrl: './template.component.help.html'
})
export class TemplateHelpDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: {
    }) {
        // data contains values passed by the router
    }
}
