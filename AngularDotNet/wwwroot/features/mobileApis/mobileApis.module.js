import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AppAnimation } from "../../shared/ng2-animation/appAnimation";
import { AppMobileTech } from "../../shared/ng2-mobiletech/appMobileTech";
import { AppHelper } from "../../shared/ng2-apphelper/appHelper";
import { RouterModule } from "@angular/router";
import { MobileApisComponent } from "../../features/mobileApis/mobileApis.component";
import { NgxsModule } from '@ngxs/store';
import { MobileApisState } from './mobileapis.state';
import { MaterialModule } from '../../shared/modules/material.module';
import { MobileApisHelpDialog } from "../mobileApis/mobileApis.component.help";
var MobileApisModule = /** @class */ (function () {
    function MobileApisModule() {
    }
    MobileApisModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                MobileApisComponent,
            ],
            imports: [
                FormsModule,
                AppAnimation,
                AppMobileTech,
                MaterialModule,
                AppHelper.forRoot(),
                RouterModule.forChild([
                    { path: "mobileApis", component: MobileApisComponent, data: { title: "Mobile Apis", subtitle: "Mobile API features", show: true, helpTemplate: MobileApisHelpDialog } },
                ]),
                NgxsModule.forFeature([
                    MobileApisState
                ])
            ]
        })
    ], MobileApisModule);
    return MobileApisModule;
}());
export { MobileApisModule };
//# sourceMappingURL=mobileApis.module.js.map