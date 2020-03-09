import { Component, OnInit, EventEmitter, Output, Inject, InjectionToken } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export class FileTransferData {
  bytesTransfered = 0;
  totalBytes = 0;
  percentComplete = 0;
  cancel = false;
}

@Component({
  templateUrl: './file.transfer.dialog.component.html',
})
export class FileTransferDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { title, description, bytesTransfered, totalBytes, percentComplete, cancel }, private dialogRef: MatDialogRef<FileTransferDialogComponent>) {
  }

  cancel(data: FileTransferData) {
    data.cancel = true;
    this.dialogRef.close();
  }
}
