import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  template: "\n<h1 mat-dialog-title>About: Angular.Net</h1>\n<div mat-dialog-content>\n  xxx:\n  <div>\n    yyy\n  </div>\n</div>\n"/* this was squashed */
})
export class ApplicationAboutDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {}) { }
}
