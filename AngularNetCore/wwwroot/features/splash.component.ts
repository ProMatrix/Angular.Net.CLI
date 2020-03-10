import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// services
import { AppConfig } from '../common/appConfig';

@Component({
  // #region template
  templateUrl: './splash.component.base64.html'
  // #endregion
})
export class SplashComponent implements OnInit {
  isViewVisible = true;
  image0Visible = false;
  image1Visible = false;
  image2Visible = false;
  image3Visible = false;
  image4Visible = false;
  image5Visible = false;
  image6Visible = false;
  private sequence = 0;

  constructor(private readonly ac: AppConfig) {
  }

  ngOnInit() {
    this.ac.waitUntilInitialized(() => {
      this.isViewVisible = true;
      this.switchImages();
    });

  }

  private switchImages() {
    setInterval(() => {
      if (this.sequence === 7) {
        this.sequence = 0;
      }
      this.image0Visible = false;
      this.image1Visible = false;
      this.image2Visible = false;
      this.image3Visible = false;
      this.image4Visible = false;
      this.image5Visible = false;
      this.image6Visible = false;
      switch (this.sequence) {
        case 0:
          this.image0Visible = true;
          break;
        case 1:
          this.image1Visible = true;
          break;
        case 2:
          this.image2Visible = true;
          break;
        case 3:
          this.image3Visible = true;
          break;
        case 4:
          this.image4Visible = true;
          break;
        case 5:
          this.image5Visible = true;
          break;
        case 6:
          this.image6Visible = true;
          break;
      }
      this.sequence++;
    }, 2000);
  }

}

@Component({
  templateUrl: './splash.component.help.html'
})
export class SplashHelpDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { title, subtitle, bytesTransfered, totalBytes, description }) {
    // data contains values passed by the router
  }
}
