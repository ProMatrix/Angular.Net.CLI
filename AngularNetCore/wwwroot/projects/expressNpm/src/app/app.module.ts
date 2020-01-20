import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// features
import { AppComponent } from './app.component';

// services
import { AppAnimationModule } from 'ngx-motion';
import { AppHelperModule } from 'ngx-motion';

// components

import { ExpressModule } from 'ng2-express';

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
        MaterialModule, ExpressModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
