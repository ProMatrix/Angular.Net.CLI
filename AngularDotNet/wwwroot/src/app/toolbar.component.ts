import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AppConfig } from "../../common/appConfig";

@Component({
  selector: 'app-toolbar',
  templateUrl: "./toolbar.component.html",
  providers: [AppConfig]
})
export class ToolbarComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleTheme = new EventEmitter<void>();
  @Output() toggleDir = new EventEmitter<void>();

  constructor(
    private ac: AppConfig,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
    window.addEventListener("offline", (event: Event) => {
      //this.ac.toastrInfo("The application just went offline!");
      this.ac.isOnline = false;
    }, false);

    window.addEventListener("online", (event: Event) => {
      //this.toastr.info("The application is back online!");
      this.ac.isOnline = true;
    }, false);
  }

  openAddContactDialog(): void {
    alert("???");
  }

  isOnline(): boolean {
    return this.ac.isOnline;
  }

}
