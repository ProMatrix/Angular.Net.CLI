import * as tslib_1 from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// features
import { AppComponent } from './app.component';
// services
import { AppAnimation } from '../../../../shared/ng2-animation/appAnimation';
import { AppMobileTech } from '../../../../shared/ng2-mobiletech/appMobileTech';
import { AppHelper } from '../../../../shared/ng2-apphelper/appHelper';
// ngxs
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { AppState } from '../../../../shared/modules/app.state';
import { MobileApisModule } from '../../../../features/mobileApis/mobileApis.module';
import { MaterialModule } from '../../../../shared/modules/material.module';
import { BaseHelpDialog } from '../../../../features/base.help.dialog';
import { MobileApisHelpDialog } from "../../../../features/mobileApis/mobileApis.component.help";
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib_1.__decorate([
        NgModule({
            declarations: [AppComponent, BaseHelpDialog, MobileApisHelpDialog],
            imports: [BrowserModule,
                HttpClientModule,
                FormsModule,
                BrowserAnimationsModule,
                AppAnimation,
                AppMobileTech,
                AppHelper.forRoot(),
                MobileApisModule,
                RouterModule.forRoot([]),
                NgxsModule.forRoot([
                    AppState
                ]),
                MobileApisModule,
                NgxsReduxDevtoolsPluginModule.forRoot(),
                NgxsLoggerPluginModule.forRoot(), MaterialModule
            ],
            providers: [],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map