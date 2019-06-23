import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { NotificationComponent } from "../../features/notification/notification.component";
import { FormsModule } from "@angular/forms";
import { AppAnimation } from "../../shared/ng2-animation/appAnimation";
import { AppMobileTech } from "../../shared/ng2-mobiletech/appMobileTech";
import { AppHelper } from "../../shared/ng2-apphelper/appHelper";
import { RouterModule } from "@angular/router";
import { MaterialModule } from '../../shared/modules/material.module';
import { NotificationHelpDialog } from "./notification.component.help";
var NotificationModule = /** @class */ (function () {
    function NotificationModule() {
    }
    NotificationModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                NotificationComponent
            ],
            imports: [
                FormsModule,
                AppAnimation,
                AppMobileTech,
                MaterialModule,
                AppHelper.forRoot(),
                RouterModule.forChild([
                    { path: "notification", component: NotificationComponent, data: { title: "Notification", subtitle: "Notification System", show: true, helpTemplate: NotificationHelpDialog } },
                ])
            ]
        })
    ], NotificationModule);
    return NotificationModule;
}());
export { NotificationModule };
//# sourceMappingURL=notification.module.js.map