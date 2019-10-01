import { Component, OnInit, AfterViewChecked, EventEmitter, Output, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// services
import { AppConfig } from '../common/appConfig';
import { BuildConfig } from '../common/buildConfig';
import { EntityService } from '../common/entityService';
import { BuildConfiguration, VisualProject, AngularProject, BuildResponse } from '../shared/client-side-models/buildModels';


@Component({
  templateUrl: './development.build.dialog.html',
  providers: [AppConfig, BuildConfig]
})
export class DevelopmentBuildDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {}, private readonly ac: AppConfig, private readonly bc: BuildConfig) {

  }

  ngOnInit() {
    this.bc.buildAngularProjects(() => {
      this.ac.toastrSuccess('Successful build!');
    }, () => {
      this.ac.toastrError('Error while building: ');
    });
  }

}


@Component({
  templateUrl: './development.component.html'
})
export class DevelopmentComponent implements OnInit {
  private isViewVisible = false;
  private selectedIndex = 1;
  private savingChanges = false;

  constructor(private readonly bc: BuildConfig,
    private readonly ac: AppConfig,
    private readonly dialog: MatDialog,
    private readonly es: EntityService

  ) {
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

  private onClickDebugRelease(vsProject: VisualProject) {
    vsProject.developerSettings.executeDist = true;
  }

  private willExecuteProject(angularProject: AngularProject): boolean {
    if (this.bc.vsProject.developerSettings.serveApp === angularProject.name && !this.bc.vsProject.developerSettings.executeDist)
      return true;
    else
      return false;
  }

  private angularProjectSelected(vsProject: VisualProject, angularProject: AngularProject): boolean {
    if (vsProject.developerSettings.serveApp === angularProject.name)
      return true;
    else
      return false;
  }

  private onClickReleaseProject(angularProject: AngularProject) {
    this.bc.vsProject.developerSettings.serveApp = angularProject.name;
  }

  private onClickDebugEnabled(angularProject: AngularProject) {
    this.bc.vsProject.developerSettings.executeDist = false;
    this.bc.vsProject.developerSettings.serveApp = angularProject.name;
  }

  private saveChanges() {
    setTimeout(() => {
      if (this.savingChanges)
        return;
      this.savingChanges = true;
      this.bc.saveVisualProject(
        () => {
          this.savingChanges = false;
        },
        (errorMessage) => {
          this.ac.toastrError(errorMessage);
          this.savingChanges = false;
        });
    }, 0);
  }

  private willExecuteRelease(vsProject: VisualProject): string {
    if (vsProject.developerSettings.executeDist)
      return "checked";
    else
      return "";
  }

  private onClickBuild() {
    const matDialogRef = this.dialog.open(DevelopmentBuildDialogComponent, { width: '700px' });

    //return;

    //setTimeout(() => {
    //  this.bc.buildAngularProjects(() => {

    //    this.ac.toastrSuccess('Successful build!');
    //  }, () => {
    //    this.ac.toastrError('Error while building: ');
    //  });
    //}, 1000);
  }

  // State Management
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
