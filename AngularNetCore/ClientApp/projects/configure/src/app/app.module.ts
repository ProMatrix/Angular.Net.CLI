import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// features
import { AppComponent } from './app.component';
import { DevelopmentComponent, DevelopmentHelpDialogComponent, DevelopmentBuildDialogComponent, DevelopmentAddDialogComponent, DevelopmentRemoveDialogComponent } from '../../../../features/development.component';

import { BuildConfig } from '../../../../common/buildConfig';
import { EntityService } from '../../../../common/entityService';

// services
import { AppAnimationModule } from '../../../../shared/ng2-animation/appAnimation.module';
import { AppHelperModule } from '../../../../shared/ng2-apphelper/appHelper.module';


// ngxs
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

import { MaterialModule } from '../../../../shared/modules/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { BaseHelpDialogComponent } from '../../../../features/base.help.dialog';
import { AppRoutingModule } from './app.routing.module';


@NgModule({
    declarations: [AppComponent, DevelopmentComponent, DevelopmentHelpDialogComponent, DevelopmentBuildDialogComponent, DevelopmentAddDialogComponent, DevelopmentRemoveDialogComponent, BaseHelpDialogComponent],
    entryComponents: [DevelopmentBuildDialogComponent, DevelopmentAddDialogComponent, DevelopmentRemoveDialogComponent],
    imports: [BrowserModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        AppAnimationModule,
        AppHelperModule.forRoot(),
        RouterModule.forRoot([
        ]),
        NgxsModule.forRoot([
        ]),
        AppRoutingModule,
        NgxsReduxDevtoolsPluginModule.forRoot(), // Should be last in the list
        NgxsLoggerPluginModule.forRoot(), MaterialModule
    ],
    providers: [BuildConfig, EntityService],
    bootstrap: [AppComponent]
})
export class AppModule { }
