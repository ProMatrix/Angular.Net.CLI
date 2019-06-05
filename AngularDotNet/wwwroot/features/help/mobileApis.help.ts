import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  template: "\n<h1 mat-dialog-title>How to: {{data.subtitle}}</h1>\n<div style=\"background-color:red; color: white; \">!!!HELP WITH MOBILE APIs!!!</div>\n"/* this was squashed */
})
export class MobileApisHelpDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {}) { }
}
