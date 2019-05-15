//import { Component, OnInit } from '@angular/core';

//@Component({
//  selector: 'app-toolbar',
//  templateUrl: "./toolbar.component.html",
//  styles: ['toolbar.component.css']
//})
//export class ToolbarComponent implements OnInit {

//  constructor() { }

//  ngOnInit() {
//  }

//}




import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
//import { NewContactDialogComponent } from '../new-contact-dialog/new-contact-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  template: "\n<mat-toolbar color=\"primary\">\n  <button mat-button class=\"sidenav-toggle\" (click)=\"toggleSidenav.emit()\">\n    <mat-icon>menu</mat-icon>\n  </button>\n  <span>Angular.Net</span>\n  <span class=\"example-spacer\"></span>\n  <button mat-button [matMenuTriggerFor]=\"menu\">\n    <mat-icon>more_vert</mat-icon>\n  </button>\n  <mat-menu #menu=\"matMenu\">\n    <button mat-menu-item (click)=\"openAddContactDialog()\">About</button>\n    <button mat-menu-item (click)=\"toggleTheme.emit()\">Toggle theme</button>\n    <button mat-menu-item (click)=\"toggleDir.emit()\">Toggle dir</button>\n  </mat-menu>\n</mat-toolbar>\n"/* this was squashed */,
  styles: ['toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleTheme = new EventEmitter<void>();
  @Output() toggleDir = new EventEmitter<void>();

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
  }

  openAddContactDialog(): void {
    alert("???");
    //let dialogRef = this.dialog.open(NewContactDialogComponent, {
    //  width: '450px'
    //});

    //dialogRef.afterClosed().subscribe(result => {
    //  console.log('The dialog was closed', result);

    //  if (result) {
    //    this.openSnackBar("Contact added", "Navigate")
    //      .onAction().subscribe(() => {
    //        this.router.navigate(['/contactmanager', result.id]);
    //      });
    //  }
    //});
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
