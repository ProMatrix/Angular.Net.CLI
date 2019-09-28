import { Component, OnInit, AfterViewChecked, AfterViewInit, EventEmitter, Output, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// services
import { AppConfig } from '../common/appConfig';
import { BuildConfig } from '../common/buildConfig';
import { EntityService } from '../common/entityService';
import { BuildConfiguration, VisualProject, AngularProject, BuildResponse } from '../shared/client-side-models/buildModels';

@Component({
  templateUrl: './development.component.html'
})
export class DevelopmentComponent implements OnInit, AfterViewChecked {
  private isViewVisible = false;
  private selectedIndex = 1;
  private savingChanges = false;

  constructor(private readonly bc: BuildConfig, private readonly ac: AppConfig, private readonly es: EntityService) {
  }

  ngOnInit() {
    this.ac.waitUntilInitialized(() => {
      setTimeout(() => {
        this.getBuildConfig();
      }, 0);
    });
  }

  private getBuildConfig() {
    this.bc.getBuildConfig(() => {
      this.isViewVisible = true;
    }, (errorMessage: string) => {
        this.isViewVisible = true;
      });
  }

  private willExecuteProject(angularProject: AngularProject): boolean {
    if (this.bc.vsProject.developerSettings.serveApp === angularProject.name && !this.bc.vsProject.developerSettings.executeDist)
      return true;
    else
      return false;
  }

  private onClickDebugEnabled(angularProject: AngularProject) {
    this.bc.vsProject.developerSettings.executeDist = false;
    this.bc.vsProject.developerSettings.serveApp = angularProject.name;
  }

  private saveChanges() {
    if (this.savingChanges)
      return;
    this.savingChanges = true;
    //this.bc.saveVisualProject(vsProject,
    //  () => {
    //    this.savingChanges = false;
    //  },
    //  (errorMessage) => {
    //    this.toastr.error(errorMessage);
    //    this.savingChanges = false;
    //  });
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
