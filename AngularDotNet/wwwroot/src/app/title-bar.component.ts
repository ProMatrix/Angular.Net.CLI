//import { Component, OnInit } from '@angular/core';

//@Component({
//  selector: 'app-title-bar',
//  templateUrl: "./title-bar.component.html",
//  styles: ['title-bar.component.css']
//})
//export class TitleBarComponent implements OnInit {

//  constructor() { }

//  ngOnInit() {
//  }

//}




import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
//import { NewContactDialogComponent } from '../new-contact-dialog/new-contact-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-title-bar',
  templateUrl: "./title-bar.component.html",
  styles: ['title-bar.component.css']
})
export class TitleBarComponent implements OnInit {

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
