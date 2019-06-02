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
  templateUrl: "./toolbar.component.html",
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
    this.dialog.open(FeatureAboutDialog, { width: '450px' });
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
  templateUrl: "../assets/notification.help.html"
})
export class NotificationHelpDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }
}

@Component({
  templateUrl: "../assets/mobileapi.help.html"
})
export class MobileApiHelpDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }
}

@Component({
  templateUrl: 'toolbar.component.about.html'
})
export class FeatureAboutDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }
}
