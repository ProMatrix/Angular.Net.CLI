import { Component, ViewChild } from '@angular/core';
import { ToastrModule } from "ngx-toastr";
// services
import { AppConfig } from "../../common/appConfig";
import { BuildConfig } from "../../common/buildConfig";
import { ToastrService } from 'ngx-toastr';
import { AppServices } from '../../shared/ng2-apphelper/appServices';
import { VisualProject, AngularProject } from "../../shared/client-side-models/buildModels";
import { ModalDialog } from "../../shared/ng2-animation/modalDialog";
import * as _ from "lodash";
import { Event } from '@angular/router';

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styles: [],
    providers: [AppConfig, BuildConfig]
})
export class AppComponent {
    @ViewChild(ModalDialog) md: ModalDialog;
    private appTitle = "Angular.Net Configuration Tool";
    private appHref: string;
    private appCache: string;
    private showOpeningTitle = true;
    private showBuildView = false;
    private selectedFeature: string;
    private appLoaded = false;
    private resizeTimerId: any;
    private showModalDialog = false;
    private showBuildDialog = false;
    private showAddDialog = false;
    private showRemoveDialog = false;
    private savingChanges = false;
    private isImportsUpdated = false;
    private isExportsUpdated = false;
    private newAngularProject = "";

    constructor(private readonly ac: AppConfig, private readonly bc: BuildConfig, private readonly toastr: ToastrService, as: AppServices) {
        this.appHref = window.location.href;
    }

    private ngOnInit() {
        this.getBuildConfig();
    }

    private getBuildConfig() {
        this.bc.getBuildConfig(() => {
            setTimeout(() => {
                this.showOpeningTitle = false;
                setTimeout(() => {
                    this.bc.buildOutput = "Angular.Net> ";
                    this.showBuildView = true;
                }, 500);
            }, 500);
        }, (errorMessage) => {
            this.toastr.error(errorMessage);
        });
    }

    private onClickDebugRelease(vsProject: VisualProject) {
        vsProject.developerSettings.executeDist = !vsProject.developerSettings.executeDist;
    }

    private willExecuteRelease(vsProject: VisualProject): string {
        if (vsProject.developerSettings.executeDist)
            return "checked";
        else
            return "";
    }

    private angularProjectSelected(vsProject: VisualProject, angularProject: AngularProject): boolean {
        if (vsProject.developerSettings.serveApp === angularProject.name)
            return true;
        else
            return false;
    }

    private willExecuteProject(vsProject: VisualProject, angularProject: AngularProject): boolean {
        if (vsProject.developerSettings.serveApp === angularProject.name && !vsProject.developerSettings.executeDist)
            return true;
        else
            return false;
    }

    private onClickDebugEnabled(vsProject: VisualProject, angularProject: AngularProject) {
        vsProject.developerSettings.executeDist = false;
        vsProject.developerSettings.serveApp = angularProject.name;
    }

    private onClickReleaseProject(vsProject: VisualProject, angularProject: AngularProject) {
        vsProject.developerSettings.serveApp = angularProject.name;
    }

    private isBuildDisabled(vsProject: VisualProject): boolean {
        if (_.filter(vsProject.developerSettings.angularProjects, x => (x.buildEnabled)).length === 0)
            return true;
        else
            return false;
    }

    private saveChanges(vsProject: VisualProject) {
        if (this.savingChanges)
            return;
        this.savingChanges = true;
        this.bc.saveVisualProject(vsProject,
            () => {
                this.savingChanges = false;
            },
            (errorMessage) => {
                this.toastr.error(errorMessage);
                this.savingChanges = false;
            });
    }

    private isProjectNameValue() {
        this.md.okDisabled = true;
        if (this.newAngularProject.length > 2)
            this.md.okDisabled = false;
        if (_.find(this.bc.visualProject.developerSettings.angularProjects, x => (x.name === this.newAngularProject)))
            this.md.okDisabled = true;
    }

    private isKeyValid(key: string) {
        if (key === " ")
            return false;
        var rg1 = /^[^\\/:\*\?\]"<>.,0123456789;!@#$%^&'{}[\|]+$/; // forbidden characters
        if (rg1.test(key))
            return true;
        return false;
    }

    private onClickRemove(vsProject: VisualProject, angularProject: AngularProject) {
        this.bc.visualProject = vsProject;
        this.bc.angularProject = angularProject;
        this.md.modalDialogTitle = `Removing an Angular Project`;
        this.md.showCancelButton = false;
        this.md.isClosable = true;
        this.md.desiredWidth = 400;
        this.md.desiredHeight = 200;
        this.md.showYesButton = true;
        this.md.showNoButton = true;
        this.md.showOkButton = false;
        this.md.showCancelButton = false;
        this.showModalDialog = false;
        this.showBuildDialog = false;
        this.showAddDialog = false;
        this.showRemoveDialog = false;

        setTimeout(() => {
            this.showModalDialog = true;
            this.showRemoveDialog = true;
        }, 0);
        this.md.dialogButtonCallback = (buttonClicked: string) => {
            if (buttonClicked === "yes") {
                // move Angular project to the bottom
                _.remove(vsProject.developerSettings.angularProjects, angularProject);
                vsProject.developerSettings.angularProjects.push(angularProject);
                this.bc.removeProject(vsProject, () => {
                    this.toastr.success("Completed the remove successfully!");
                    _.remove(vsProject.developerSettings.angularProjects, angularProject);
                    this.md.closeDialog();
                },
                    (errorMessage) => {
                        this.toastr.error(errorMessage);
                    });
            } else
                this.md.closeDialog();
        }
    }

    private onClickLanch(vsProject: VisualProject) {
        this.bc.launchApp(vsProject, () => {
            this.toastr.success("Completed the launch successfully!");
        },
            (errorMessage) => {
                this.toastr.error(errorMessage);
            });
    }

    private onClickAdd(vsProject: VisualProject) {
        this.bc.visualProject = vsProject;
        this.md.modalDialogTitle = `Adding an Angular Project to: ${vsProject.name}`;
        this.md.showCancelButton = false;
        this.md.isClosable = true;
        this.md.desiredWidth = 400;
        this.md.desiredHeight = 200;
        this.md.showOkButton = true;
        this.md.showCancelButton = true;
        this.md.showYesButton = false;
        this.md.showNoButton = false;
        this.md.okDisabled = true;
        this.showModalDialog = false;
        this.showBuildDialog = false;
        this.showAddDialog = false;
        this.showRemoveDialog = false;
        this.newAngularProject = "";

        setTimeout(() => {
            this.showModalDialog = true;
            this.showAddDialog = true;
            setTimeout(() => {
                const angularProjectName = (document.querySelector(".angularProjectName") as HTMLFormElement);
                angularProjectName.focus();
            }, 0);
        }, 0);
        this.md.dialogButtonCallback = (buttonClicked: string) => {
            if (buttonClicked === "ok") {
                this.md.closeDialog();
                const angularProject = new AngularProject();
                angularProject.name = this.newAngularProject;
                const vsp = _.cloneDeep(vsProject);
                vsp.developerSettings.angularProjects.push(angularProject);
                this.ac.showSpinner(true);
                this.bc.addProject(vsp, () => {
                    this.ac.showSpinner(false);
                    vsProject.developerSettings.angularProjects.push(angularProject);
                    this.toastr.success("Completed the add successfully!");
                },
                    (errorMessage) => {
                        this.toastr.error(errorMessage);
                    });
            } else
                this.md.closeDialog();
        }
    }

    private onClickBuild(visualProject: VisualProject) {
        this.md.modalDialogTitle = `Building: ${visualProject.name}`;
        this.md.showCancelButton = false;
        this.md.isClosable = false;
        this.md.showOkButton = false;
        this.md.showCancelButton = false;
        this.md.showYesButton = false;
        this.md.showNoButton = false;
        this.md.desiredWidth = 650;
        this.md.desiredHeight = 475;
        this.showModalDialog = false;
        this.showBuildDialog = false;
        this.showAddDialog = false;
        this.showRemoveDialog = false;
        this.md.denyClosing = true;

        setTimeout(() => {
            this.showModalDialog = true;
            this.showBuildDialog = true;
            setTimeout(() => {
                this.bc.buildAngularProjects(visualProject, () => {
                    setTimeout(() => {
                        this.md.closeDialog();
                        visualProject.showVersion = false;
                        this.toastr.success("Completed the build successfully!");
                        setTimeout(() => {
                            visualProject.showVersion = true;
                        }, 1000);
                    }, 3000);

                }, (errorMessage) => {
                    this.toastr.error(errorMessage);
                });
            }, 1000);
        }, 0);
        this.md.dialogButtonCallback = (buttonClicked: string) => {
            this.md.closeDialog();
        }
    }

    private isFolderExported(visualProject: VisualProject, folder: string) {
        let selected = "";
        if (_.find(visualProject.developerSettings.libraryExports, x => (x === folder)))
            return "selected";
    }

    private onChangeLibraryExport(target: HTMLSelectElement, selectedLibraries: Array<string>, vsProjectName: string) {
        selectedLibraries.length = 0;
        const libraries = _.filter(target.options, x => (x.selected));
        const otherVsProjects = _.filter(this.bc.config.visualProjects, x => (x.name !== vsProjectName));
        libraries.forEach(library => {
            if (!this.isExportedAlready(otherVsProjects, library.innerHTML)) {
                selectedLibraries.push(library.innerHTML)
            } else
                library.selected = false;
        });
    }

    private isExportedAlready(otherVsProjects: Array<VisualProject>, library: string): boolean {
        let alreadyExported = false;
        otherVsProjects.forEach(vsProject => {
            if (_.find(vsProject.developerSettings.libraryExports, x => (x === library))) {
                this.toastr.error("Library: " + library + " is already exported by Project: " + vsProject.name, "", { tapToDismiss: true, closeButton: true });
                alreadyExported = true;
            }
        });
        return alreadyExported;
    }

    private isProjectBuildProject(vsProject: VisualProject): boolean {
        return vsProject.name === "ProjectBuild";
    }

    private openVsProjectPanel(vsProject: VisualProject) {
        if (vsProject.showPanel) {
            this.bc.getIsExportsUpdated(vsProject, (isExportsUpdated: boolean) => { this.isExportsUpdated = isExportsUpdated; },
                (errorMessage) => {
                    this.toastr.error(errorMessage);
                });
        }
    }
}