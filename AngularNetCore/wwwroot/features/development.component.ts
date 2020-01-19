import { Component, OnInit, AfterViewChecked, EventEmitter, Output, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// services
import { AppConfig } from '../common/appConfig';
import { BuildConfig } from '../common/buildConfig';
import { EntityService } from '../common/entityService';
import { BuildConfiguration, VisualProject, AngularProject, BuildResponse } from 'ngx-modeling';

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

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
        this.buildDialogData = data.buildDialogData;
    }
}

export class AddDialogData {
    title: string;
    bc: BuildConfig;
    ac: AppConfig;
    saveDisabled: boolean;
    projectName: string;
    matDialogRef: MatDialogRef<any, any>;
}

@Component({
    templateUrl: './development.add.dialog.html'
})
export class DevelopmentAddDialogComponent {
    private ad: AddDialogData;
    private showSpinner = false;
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
        this.ad = data.addDialogData;
    }

    private onClickAddAngularProject() {
        this.ad.projectName = this.ad.projectName.charAt(0).toLowerCase() + this.ad.projectName.slice(1);
        if (this.ad.bc.vsProject.developerSettings.angularProjects.find(project => project.name === this.ad.projectName)) {
            this.ad.ac.toastrError('A project with that name already exists! Please choose a unique project name.');
            return;
        }
        this.showSpinner = true;
        this.ad.bc.angularProject = new AngularProject();
        this.ad.bc.angularProject.name = this.ad.projectName;
        this.ad.bc.addProject(() => {
            this.ad.ac.toastrSuccess('Completed the add successfully!');
            this.ad.matDialogRef.close();
        }, (errorMessage) => {
            this.ad.ac.toastrError(errorMessage);
        }, () => {
            this.showSpinner = false;
        });
    }
}

export class RemoveDialogData {
    title: string;
    message: string;
    bc: BuildConfig;
    ac: AppConfig;
    projectName: string;
    matDialogRef: MatDialogRef<any, any>;
}

@Component({
    templateUrl: './development.remove.dialog.html'
})
export class DevelopmentRemoveDialogComponent {
    private removeDialogData: RemoveDialogData;
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
        this.removeDialogData = data.removeDialogData;
    }

    private onClickYes() {
        this.removeDialogData.bc.removeProject(() => {
            this.removeDialogData.ac.toastrSuccess('Completed the remove successfully!');
            this.removeDialogData.matDialogRef.close();
        },
            (errorMessage) => {
                this.removeDialogData.ac.toastrError(errorMessage);
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
    private removeDialogData = new RemoveDialogData();
    private matDialogRef: MatDialogRef<any, any>;

    constructor(private readonly bc: BuildConfig, private readonly ac: AppConfig, private readonly dialog: MatDialog, private readonly es: EntityService) {
    }

    ngOnInit() {
        this.ac.waitUntilInitialized(() => {
            setTimeout(() => {
                this.getBuildConfig();
            }, 0);
        });
    }

    private onChangeTab(selectedIndex: number) {
        if (selectedIndex === 2) {
            this.getLogEntries();
        }
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
        if (this.bc.vsProject.developerSettings.serveApp === angularProject.name && !this.bc.vsProject.developerSettings.executeDist) {
            return true;
        } else {
            return false;
        }
    }

    private angularProjectSelected(vsProject: VisualProject, angularProject: AngularProject): boolean {
        if (vsProject.developerSettings.serveApp === angularProject.name) {
            return true;
        } else {
            return false;
        }
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
            if (this.savingChanges) {
                return;
            }
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
        if (vsProject.developerSettings.executeDist) {
            return 'checked';
        } else {
            return '';
        }
    }

    private onClickBuild() {
        this.bc.buildOutput = '';
        this.buildDialogData.title = 'Building: Angular Project(s)';
        this.buildDialogData.bc = this.bc;
        this.buildDialogData.closeDisabled = true;

        this.matDialogRef = this.dialog.open(DevelopmentBuildDialogComponent, {
            width: '675px',
            disableClose: true,
            data: {
                buildDialogData: this.buildDialogData
            }
        });
        this.bc.buildAngularProjects((buildVersion: string) => {
            this.buildDialogData.closeDisabled = false;
            if (buildVersion) {
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
        this.addDialogData.ac = this.ac;
        this.addDialogData.bc = this.bc;
        this.addDialogData.saveDisabled = false;
        this.addDialogData.projectName = '';
        this.addDialogData.matDialogRef = this.dialog.open(DevelopmentAddDialogComponent, {
            width: '400px',
            disableClose: true,
            data: {
                addDialogData: this.addDialogData,
            }
        });
    }

    private onClickRemove(vsProject: VisualProject, angularProject: AngularProject) {
        this.bc.angularProject = angularProject;
        this.removeDialogData.title = 'Warning! Removing Project: ' + angularProject.name;
        this.removeDialogData.ac = this.ac;
        this.removeDialogData.bc = this.bc;
        this.removeDialogData.message = 'Are you sure that you want to remove the project: ' + angularProject.name + ', and all of its components?';
        this.removeDialogData.projectName = angularProject.name;
        this.removeDialogData.matDialogRef = this.dialog.open(DevelopmentRemoveDialogComponent, {
            width: '400px',
            disableClose: true,
            data: {
                removeDialogData: this.removeDialogData,
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

    private getLogEntries() {
        this.bc.getLogEntries(() => {
            this.isViewVisible = true;
        }, (errorMessage: string) => {
            this.isViewVisible = true;
        });
    }

    private getEventTypeColor(entryType: number): string {
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
                this.getLogEntries();
                this.ac.toastrError(errorMessage);
            });
    }

    private onClickLogEntry() {
        this.bc.logEntry(() => {
            this.getLogEntries();
        },
            (errorMessage) => {
                this.ac.toastrError(errorMessage);
            });
    }

    // Metrics
    onClickClearResponseTime() {
        this.ac.clearResponseTime();
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
