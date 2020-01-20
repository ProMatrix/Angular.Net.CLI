import { Component, OnInit, AfterViewChecked, AfterViewInit, EventEmitter, Output, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// services
import { AppConfig } from '../../../../common/appConfig';
import { TimingMetrics } from '../../../../../../../NgResources/ngx-modeling/src/timingMetrics';

@Component({
    // #region template
    templateUrl: './expressDirect.component.html',
    providers: []
    // #endregion
})
export class ExpressDirectComponent implements OnInit, AfterViewChecked {
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
    templateUrl: './expressDirect.component.help.html'
})
export class ExpressDirectHelpDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: {
    }) {
        // data contains values passed by the router
    }
}
