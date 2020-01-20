import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// features
import { AppComponent } from './app.component';

// services
import { AppAnimationModule } from 'ngx-motion';
import { AppHelperModule } from 'ngx-motion';

// components
// direct access
import { ExpressModule } from '../../../../../../../NgResources/ng2-express/library/projects/ng2-express/src/express.module';

import { MaterialModule } from 'ngx-motion';
import { FlexLayoutModule } from '@angular/flex-layout';

import { BaseHelpDialogComponent } from '../../../../features/base.help.dialog';

@NgModule({
    declarations: [AppComponent, BaseHelpDialogComponent],
    entryComponents: [],
    imports: [BrowserModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        AppAnimationModule,
        AppHelperModule.forRoot(),
        RouterModule.forRoot([
        ]),
        MaterialModule, ExpressModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
