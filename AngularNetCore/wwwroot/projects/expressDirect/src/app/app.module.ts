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

// ngxs
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

import { MaterialModule } from 'ngx-motion';
import { FlexLayoutModule } from '@angular/flex-layout';

import { BaseHelpDialogComponent } from '../../../../features/base.help.dialog';
import { AppRoutingModule } from './app.routing.module';


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
        NgxsModule.forRoot([
        ]),
        AppRoutingModule,
        NgxsReduxDevtoolsPluginModule.forRoot(), // Should be last in the list
      NgxsLoggerPluginModule.forRoot(), MaterialModule, ExpressModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
