import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { AppConfig } from '../../common/appConfig';

@Component({
  templateUrl: './toolbar.component.help.html'
})
export class ApplicationAboutDialogComponent {
  ac: AppConfig;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { title, subtitle, bytesTransfered, totalBytes, description }) {
    this.ac = AppConfig.getInstance();
  }
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();
  ac: AppConfig;

  constructor(
    private readonly dialog: MatDialog,
    private readonly route: ActivatedRoute,
    private readonly router: Router) {
    this.ac = AppConfig.getInstance();
  }

  ngOnInit() {
    this.ac.waitUntilInitialized(() => {

      window.addEventListener('offline', (event: Event) => {
        this.ac.toastrWarning('The application just went offline!');
        this.ac.isOnline = false;
      }, false);

      window.addEventListener('online', (event: Event) => {
        this.ac.toastrSuccess('The application is back online!');
        this.ac.isOnline = true;
      }, false);
    });
  }

  onClickToggleSidenav(): void {
    this.toggleSidenav.emit(); 
  }

  openAboutDialog(): void {
    const matDialogRef = this.dialog.open(ApplicationAboutDialogComponent, { width: '450px' });
  }

  getOnlineStatusIconName() {
    if (this.ac.isOnline) {
      return 'signal_wifi_4_bar';
    } else {
      return 'signal_wifi_offline';
    }
  }

  getOnlineStatusText() {
    if (this.ac.isOnline) {
      return 'ONLINE';
    } else {
      return 'OFFLINE';
    }
  }

  onClickHelp() {
    const data$ = this.ac.getRouteData();

    this.dialog.open(data$.helpTemplate, {
      width: '600px',
      data: data$,
      id: 'pro-help-dialog'
    });
  }
}

