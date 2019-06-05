import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: "\n<app-side-nav></app-side-nav>\n\n<app-toolbar></app-toolbar>\n<app-content></app-content>\n"/* this was squashed */,
  providers: []
})
export class AppComponent implements OnInit {

  constructor() { }
  ngOnInit() {


  }
}
