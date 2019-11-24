"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var notification_component_1 = require("./notification.component");
var forms_1 = require("@angular/forms");
var appAnimation_module_1 = require("../library_ng/ng2-animation/appAnimation.module");
var mobileTech_module_1 = require("../library_ng/ng2-mobiletech/mobileTech.module");
var appHelper_module_1 = require("../library_ng/ng2-apphelper/appHelper.module");
var router_1 = require("@angular/router");
var material_module_1 = require("../library_ng/modules/material.module");
var NotificationModule = /** @class */ (function () {
    function NotificationModule() {
    }
    NotificationModule = __decorate([
        core_1.NgModule({
            declarations: [
                notification_component_1.NotificationComponent
            ],
            imports: [
                forms_1.FormsModule,
                appAnimation_module_1.AppAnimationModule,
                mobileTech_module_1.MobileTechModule,
                material_module_1.MaterialModule,
                appHelper_module_1.AppHelperModule.forRoot(),
                router_1.RouterModule.forChild([
                    {
                        path: 'notification',
                        component: notification_component_1.NotificationComponent,
                        data: { debugOnly: false, title: 'Notification', subtitle: 'Notification System', show: true, helpTemplate: notification_component_1.NotificationHelpDialogComponent }
                    },
                ])
            ]
        })
    ], NotificationModule);
    return NotificationModule;
}());
exports.NotificationModule = NotificationModule;
//# sourceMappingURL=notification.module.js.map