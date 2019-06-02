import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: "./mobileApi.help.html"
})
export class MobileApiHelpDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {}) { }
}
