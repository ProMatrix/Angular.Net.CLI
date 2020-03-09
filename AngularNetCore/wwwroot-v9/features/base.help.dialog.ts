import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'base-help-dialog',
  templateUrl: './base.help.dialog.html'
})
export class BaseHelpDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { title, subtitle, bytesTransfered, totalBytes, description }) {
    // data contains values passed by the router
  }
}
