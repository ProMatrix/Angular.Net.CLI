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
var ngx_motion_1 = require("ngx-motion");
var router_1 = require("@angular/router");
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
                ngx_motion_1.AppAnimationModule,
                ngx_motion_1.MobileTechModule,
                ngx_motion_1.MaterialModule,
                ngx_motion_1.AppHelperModule.forRoot(),
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