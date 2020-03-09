import { Component, OnInit, EventEmitter, Output, Inject, InjectionToken } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export class FileTransferData {
  bytesTransfered = 0;
  totalBytes = 0;
  percentComplete = 0;
  cancel = false;
}

@Component({
  templateUrl: './file.transfer.dialog.html',
})
export class FileTransferDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {}, private dialogRef: MatDialogRef<FileTransferDialogComponent>) {
  }

  private cancel(data: FileTransferData) {
    data.cancel = true;
    this.dialogRef.close();
  }
}
