import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// services
import { AppConfig } from "../common/appConfig";
import { EntityService } from "../common/entityService";
@Component({
  // #region template
  templateUrl: "./httpDemo.component.html",
  providers: [EntityService]
  // #endregion
})
export class HttpDemoComponent implements OnInit {
  private isViewVisible = false;

  constructor(private readonly ac: AppConfig, private readonly es: EntityService) {
  }

  ngOnInit() {
    this.ac.waitUntilInitialized(() => {
      setTimeout(() => {
        this.isViewVisible = true;
      }, 0);
    });
  }

  //#region Http Get
  private getAll() {
    this.es.getAll((successMessage: string) => {
      this.ac.toastrInfo(successMessage, -1);
    }, (errorMessage: string) => {
      this.ac.toastrError(errorMessage);
    });
  }

  private getFromId() {
    this.es.getFromId((textMessage: string) => {
      this.ac.toastrInfo(textMessage, -1);
    }, (error: string) => {
      alert(`error: ${error}`);
    }, "tsserver.js");
  }
  //#endregion

}

@Component({
  templateUrl: "./httpDemo.component.help.html"
})
export class HttpDemoHelpDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {
  }) {
    // data contains values passed by the router
  }
}
