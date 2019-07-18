import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileTransferDialog } from "../shared/enterprise/file.transfer.dialog";
import { MatDialog, MatDialogConfig } from '@angular/material';
import { HttpProgressEvent } from '@angular/common/http';
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

  constructor(private readonly ac: AppConfig, private readonly es: EntityService, private readonly dialog: MatDialog) {
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
    }, (errorMessage: string) => {
      this.ac.toastrError(errorMessage);
    }, "tsserver.txt");
  }

  private getWithProgress() {
    this.es.getWithProgress((successMessage: string) => {
      this.ac.toastrInfo(successMessage, -1);
    }, (errorMessage: string) => {
      this.ac.toastrError(errorMessage);
    }, "tsserver.txt", event => {
      if (event.loaded < 1024) {
        console.log(`Get in progress! ${event.loaded} bytes loaded`);
      } else {
        const kbDownloaded = Math.round(event.loaded / 1024);
        console.log(`Get in progress! ${kbDownloaded}Kb loaded`);
      }
    });
  }

  private downloadTextFile() {
    this.es.downloadFile((successMessage: string) => {
      this.ac.toastrInfo(successMessage, -1);
    }, (errorMessage: string) => {
      this.ac.toastrError(errorMessage);
    }, "tsserver.txt");
  }

  private downloadPdfFile() {
    this.es.downloadFile((successMessage: string) => {
      this.ac.toastrInfo(successMessage, -1);
    }, (errorMessage: string) => {
      this.ac.toastrError(errorMessage);
    }, "ProASPNetCoreMVC.pdf");
  }

  private downloadPdfWithProgress() {
    const dialogConfig: MatDialogConfig = { width: '450px', disableClose: true };
    dialogConfig.data = {
      id: 1,
      title: 'Download: ProASPNetCoreMVC.pdf',
      description: "Download Progress (click Cancel to discontinue)",
      bytesTransfered: 0,
      totalBytes: 0,
      cancel: false
    };

    const matDialogRef = this.dialog.open(FileTransferDialog, dialogConfig);
    this.es.downloadWithProgress(() => {
      setTimeout(() => { matDialogRef.close(); }, 1000);
    }, (errorMessage: string) => {
      if (!dialogConfig.data.cancel) {
        matDialogRef.close();
        setTimeout(() => {
          this.ac.toastrError(errorMessage);
        }, 500);
        return true;
      }
    }, "ProASPNetCoreMVC.pdf", (event: HttpProgressEvent) => {
      dialogConfig.data.bytesTransfered = Math.round(event.loaded / 1000);
      dialogConfig.data.totalBytes = Math.round(event.total / 1000);
      dialogConfig.data.percentComplete = 100 / (event.total / event.loaded);
      if (dialogConfig.data.cancel) {
        matDialogRef.close();
        return true;
      }
    });
  }
  //#endregion

  //#region Http Post
  private postEntity() {
    this.es.postEntity(successMessage => {
      this.ac.toastrInfo(successMessage, -1);
    }, (errorMessage: string) => {
      this.ac.toastrError(errorMessage);
    });
  }

  private postCollection() {
    this.es.postCollection(successMessage => {
      this.ac.toastrInfo(successMessage, -1);
    }, (errorMessage: string) => {
      this.ac.toastrError(errorMessage);
    });
  }

  private postCollectionWithProgess() {
    this.es.postCollectionWithProgess(successMessage => {
      this.ac.toastrInfo(successMessage, -1);
    }, (errorMessage: string) => {
      this.ac.toastrError(errorMessage);
    }, (event: HttpProgressEvent) => {
      if (event.loaded < 1024) {
        console.log(`Post in progress! ${event.loaded} bytes loaded`);
      } else {
        const kbUploaded = Math.round(event.loaded / 1024);
        console.log(`Post in progress! ${kbUploaded}Kb loaded`);
      }
    });
  }

  private uploadFiles(element: HTMLInputElement, files: Array<File>) {
    this.es.uploadFile(files, (successMessage: string) => {
      element.value = null;
      this.ac.toastrInfo(successMessage, -1);
    }, (errorMessage: string) => {
      element.value = null;
      this.ac.toastrError(errorMessage);
    }, (event: HttpProgressEvent) => {
      if (event.loaded < 1024) {
        console.log(`Post in progress! ${event.loaded} bytes loaded`);
      } else {
        const kbUploaded = Math.round(event.loaded / 1024);
        console.log(`Post in progress! ${kbUploaded}Kb loaded`);
      }
    });
  }

  private uploadWithProgress(element: HTMLInputElement, files: Array<File>) {
    const dialogConfig: MatDialogConfig = { width: '450px', disableClose: true };
    dialogConfig.data = {
      id: 1,
      title: 'Upload: Choose any file to upload',
      description: "Upload Progress (click Cancel to discontinue)",
      bytesTransfered: 0,
      totalBytes: 0,
      cancel: false
    };

    const matDialogRef = this.dialog.open(FileTransferDialog, dialogConfig);
    this.es.uploadFileWithProgess(files, () => {
      setTimeout(() => {
        matDialogRef.close();
        element.value = null;
      }, 1000);
    }, (errorMessage: string) => {
      element.value = null;
      if (!dialogConfig.data.cancel) {
        matDialogRef.close();
        setTimeout(() => {
          this.ac.toastrError(errorMessage);
        }, 500);
        return true;
      }
    }, (event: HttpProgressEvent) => {
      dialogConfig.data.bytesTransfered = Math.round(event.loaded / 1000);
      dialogConfig.data.totalBytes = Math.round(event.total / 1000);
      dialogConfig.data.percentComplete = 100 / (event.total / event.loaded);
      if (dialogConfig.data.cancel) {
        matDialogRef.close();
        element.value = null;
        return true;
      }
    });
  }
  //#endregion

  //#region Http Delete
  private deleteEntity() {
    this.es.deleteEntity(successMessage => {
      this.ac.toastrInfo(successMessage, -1);
    }, (errorMessage: string) => {
      this.ac.toastrError(errorMessage);
    }, "1492");
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
