import { Component, OnInit, AfterViewChecked, EventEmitter, Output, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// services
import { AppConfig } from '../common/appConfig';
import { BuildConfig } from '../common/buildConfig';
import { EntityService } from '../common/entityService';
import { BuildConfiguration, VisualProject, AngularProject, BuildResponse } from '../shared/client-side-models/buildModels';

export class BuildDialogData {
    title: string;
    bc: BuildConfig;
    closeDisabled: boolean;
}

@Component({
    templateUrl: './development.build.dialog.html'
})
export class DevelopmentBuildDialogComponent {
    private buildDialogData: BuildDialogData;
    private bc: BuildConfig;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
        this.bc = data.buildDialogData.bc;
        this.buildDialogData = data.buildDialogData;
    }
}

export class AddDialogData {
    title: string;
    bc: BuildConfig;
    saveDisabled: boolean;
    projectName: string;
}

@Component({
    templateUrl: './development.add.dialog.html'
})
export class DevelopmentAddDialogComponent {
    private addDialogData: AddDialogData;
    private bc: BuildConfig;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
        this.bc = data.addDialogData.bc;
        this.addDialogData = data.addDialogData;
    }


    private onClickAddAngularProject() {
        // ???
        //this.close();
        const angularProject = new AngularProject();
        angularProject.name = this.addDialogData.projectName;
        let vsProject = new VisualProject();
        const vsp = Object.assign(vsProject, this.bc.vsProject);
        vsp.developerSettings.angularProjects.push(angularProject);

        this.bc.addProject(vsp, () => {
            //this.ac.showSpinner(false);
            vsProject.developerSettings.angularProjects.push(angularProject);
            //this.toastr.success("Completed the add successfully!");
        },
            (errorMessage) => {
                //this.toastr.error(errorMessage);
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
    private buildDialogData = new BuildDialogData();
    private addDialogData = new AddDialogData();
    private matDialogRef: MatDialogRef<any, any>;

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
                this.getExceptions();
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

    // project management
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
        this.bc.buildOutput = '';
        this.buildDialogData.title = "Building: Angular Project(s)";
        this.buildDialogData.bc = this.bc;
        this.buildDialogData.closeDisabled = true;

        this.matDialogRef = this.dialog.open(DevelopmentBuildDialogComponent, {
            width: '675px',
            disableClose: true,
            data: {
                'buildDialogData': this.buildDialogData
            }
        });
        this.bc.buildAngularProjects((buildVersion: string) => {
            this.buildDialogData.closeDisabled = false;
            if (buildVersion) {
                this.ac.appSettings.buildVersion = buildVersion;
                this.buildDialogData.closeDisabled = false;
            }
            this.ac.toastrSuccess('Successful build!');
        }, () => {
                this.ac.toastrError('Error while building: ');
                this.buildDialogData.closeDisabled = false;
        });
    }

    private onClickAdd() {
        this.addDialogData.title = 'Adding: Angular Project';
        this.addDialogData.bc = this.bc;
        this.addDialogData.saveDisabled = false;
        this.addDialogData.projectName = '';
        this.matDialogRef = this.dialog.open(DevelopmentAddDialogComponent, {
            width: '400px',
            disableClose: true,
            data: {
                'addDialogData': this.addDialogData
            }
        });
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

    // Application Exceptions

    private getExceptions() {
        this.bc.getExceptions(() => {
            this.isViewVisible = true;
        }, (errorMessage: string) => {
            this.isViewVisible = true;
        });
    }

    private getEventTypeColor(entryType: number) :string {
        switch (entryType) {
            case 0: return 'yellow';
            case 1: return 'red';
            case 2: return 'orange';
            case 3: return 'yellow';
            case 4: return 'blue';
        }
        return 'orange';
    }

    private getIconName(entryType: number): string {
        switch (entryType) {
            case 0: return 'missing';
            case 1: return 'error';
            case 2: return 'warning';
            case 3: return 'missing';
            case 4: return 'error_outline';
        }
        return 'orange';
    }

    private getEventTypeText(entryType: number): string {
        switch (entryType) {
            case 0: return 'Missing';
            case 1: return 'Error';
            case 2: return 'Warning';
            case 3: return 'Missing';
            case 4: return 'Information';
        }
        return 'orange';
    }

    private onClickThrowException() {
        this.bc.throwException(() => {

            },
            (errorMessage) => {
                this.getExceptions();
                this.ac.toastrError(errorMessage);
            });
    }

    private onClickLogEntry() {
        this.bc.logEntry(() => {
            this.getExceptions();
            },
            (errorMessage) => {
                this.ac.toastrError(errorMessage);
            });
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
