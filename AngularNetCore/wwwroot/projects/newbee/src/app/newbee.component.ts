import { Component, OnInit, AfterViewChecked, AfterViewInit, EventEmitter, Output, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// services
import { AppConfig } from '../../../../common/appConfig';
import { EntityService, BookInfo } from '../../../../common/entityService';

@Component({
  // #region template
  templateUrl: './newbee.component.html'
  // #endregion
})
export class NewbeeComponent implements OnInit, AfterViewChecked {
  private isViewVisible = false;
  private timerId = null;
  private library = Array<BookInfo>();

  constructor(private readonly ac: AppConfig, private readonly es: EntityService) {
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

  private getJson() {
    this.es.getAllLocally((library: Array<BookInfo>) => {
      this.library = library;
      this.ac.toastrInfo('Successfully completed locally getting Json!', -1);
    }, (errorMessage: string) => {
      this.ac.toastrError(errorMessage);
    });
  }

  onClickGetJson() {
    debugger;

    try {
      this.getJson();
    } catch (e) {
      let message = e;

    }
  }

  onClickExportJson() {
    debugger;

    try {
      const fileName = 'library.json';

      var fileBlob = new Blob([JSON.stringify(this.library, null, 2)], { type: 'application/json' });
      this.es.saveFile(fileBlob, fileName);
    } catch (e) {
      let message = e;

    }
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
