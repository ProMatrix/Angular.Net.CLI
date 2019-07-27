import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExpandVisible } from './expandVisible';
import { ViewFader } from './viewFader';
import { ViewBlinker } from './viewBlinker';
import { ModalDialog } from './modalDialog';

@NgModule({
    imports: [CommonModule],
    declarations: [ViewFader, ViewBlinker, ExpandVisible, ModalDialog],
    exports: [
        CommonModule,
        FormsModule,
        ViewFader,
        ViewBlinker,
        ExpandVisible,
        ModalDialog
    ]
})
export class AppAnimation { }
