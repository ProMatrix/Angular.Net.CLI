import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { MatDialog, MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { AppConfig } from "../../common/appConfig";

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-toolbar',
  template: "\n<mat-toolbar color=\"primary\">\n  <table style=\"width: 100%\">\n    <tr>\n      <td style=\"width: 5%; text-align: left; \">\n        <mat-icon class=\"toolbar-icon-button\" (click)=\"toggleSidenav.emit()\">menu</mat-icon>\n      </td>\n      <td style=\"width: 5%; text-align: left; \">\n        <mat-icon class=\"toolbar-icon\" title=\"Application is Online\">{{getOnlineStatusIconName()}}</mat-icon>\n      </td>\n      <td style=\"text-align: center; width: 80%; \">\n        <div style=\"font-family: px-neuropol; font-size: 32px; \">Angular.Net</div>\n      </td>\n      <td style=\"width: 5%; text-align: right;\">\n        <mat-icon class=\"toolbar-icon-button\" (click)=\"onClickHelp()\">help</mat-icon>\n      </td>\n      <td style=\"width: 5%; text-align: right;\">\n        <mat-icon [matMenuTriggerFor]=\"menu\" class=\"toolbar-icon-button\">more_vert</mat-icon>\n      </td>\n    </tr>\n  </table>\n  <mat-menu #menu=\"matMenu\">\n    <button mat-menu-item (click)=\"openAboutDialog()\">About</button>\n  </mat-menu>\n</mat-toolbar>\n"/* this was squashed */,
  providers: [AppConfig]
})
export class ToolbarComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(
    private readonly ac: AppConfig,
    private readonly dialog: MatDialog,
    private readonly route: ActivatedRoute,
    private readonly router: Router) { }
  private routerData: Data;

  ngOnInit() {
    window.addEventListener("offline", (event: Event) => {
      this.ac.toastrWarning("The application just went offline!");
      this.ac.isOnline = false;
    }, false);

    window.addEventListener("online", (event: Event) => {
      this.ac.toastrSuccess("The application is back online!");
      this.ac.isOnline = true;
    }, false);
  }

  openAboutDialog(): void {
    this.dialog.open(ApplicationAboutDialog, { width: '450px' });
  }

  private getOnlineStatusIconName() {
    if (this.ac.isOnline)
      return "signal_wifi_4_bar";
    else
      return "signal_wifi_offline";
  }

  private onClickHelp() {
    const data = this.ac.getRouteData();

    this.dialog.open(data.template, {
      width: '450px',
      data: data
    });
  }
}

@Component({
  templateUrl: "../../help/notification.help.html"
})
export class NotificationHelpDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }
}

@Component({
  templateUrl: "../../help/mobileapi.help.html"
})
export class MobileApiHelpDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }
}

@Component({
  templateUrl: 'toolbar.component.about.html'
})
export class ApplicationAboutDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }
}
