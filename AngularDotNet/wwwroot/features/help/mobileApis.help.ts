import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: "./mobileApis.help.html"
})
export class MobileApisHelpDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {}) { }
}
