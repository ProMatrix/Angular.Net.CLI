import { Component, OnInit, AfterViewChecked, AfterViewInit, EventEmitter, Output, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// services
import { AppConfig } from '../../../../common/appConfig';
import { TimingMetrics } from '../../../../library_ng/enterprise/timingmetrics';
import { ExpressService } from '../../../../library_ng/ng2-express/expressService';


@Component({
    // #region template
    templateUrl: './expressDirect.component.html',
    providers: [ExpressService]
    // #endregion
})
export class ExpressDirectComponent implements OnInit, AfterViewChecked {
    private isViewVisible = false;
    private timerId = null;
    private numberArray: Array<number>;

    constructor(private readonly ac: AppConfig, private readonly es: ExpressService) {
        this.numberArray = es.getNumberArray();
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
