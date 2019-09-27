import { Component, OnInit, AfterViewChecked, AfterViewInit, EventEmitter, Output, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// services
import { AppConfig } from '../common/appConfig';
import { EntityService } from '../common/entityService';
import { BuildConfiguration, VisualProject, AngularProject, BuildResponse } from '../shared/client-side-models/buildModels';

@Component({
  // #region template
  templateUrl: './development.component.html'
  // #endregion
})
export class DevelopmentComponent implements OnInit, AfterViewChecked {
  private isViewVisible = false;
  private selectedIndex = 1;

  constructor(private readonly ac: AppConfig, private readonly es: EntityService) {
  }

  ngOnInit() {
    this.ac.waitUntilInitialized(() => {
      setTimeout(() => {
        this.getBuildConfig();
      }, 0);
    });
  }

  private getBuildConfig() {
    this.ac.getBuildConfig(() => {
      this.isViewVisible = true;
    }, (errorMessage: string) => {
        this.isViewVisible = true;
      });
  }

  private willExecuteProject(angularProject: AngularProject): boolean {
    if (this.ac.vsProject.developerSettings.serveApp === angularProject.name && !this.ac.vsProject.developerSettings.executeDist)
      return true;
    else
      return false;
  }

  ngAfterViewChecked() { }

  private onClickSave() {
    this.es.saveActionsQueue(successMessage => {
      this.ac.toastrInfo(successMessage, -1);
    }, (errorMessage: string) => {
      this.ac.toastrError(errorMessage);
    });
  }

  private onClickLoad() {
    this.es.loadActionsQueue((textMessage: string) => {
      this.ac.toastrInfo(textMessage, -1);
    }, (errorMessage: string) => {
      this.ac.toastrError(errorMessage);
    }, 'actionsQueue003.json');
  }

}

@Component({
  templateUrl: './development.component.help.html'
})
export class DevelopmentHelpDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {
  }) {
    // data contains values passed by the router
  }
}
