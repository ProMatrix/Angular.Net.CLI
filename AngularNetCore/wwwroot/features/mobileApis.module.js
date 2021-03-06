"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ngx_motion_1 = require("ngx-motion");
var router_1 = require("@angular/router");
var mobileApis_component_1 = require("./mobileApis.component");
var store_1 = require("@ngxs/store");
var mobileApis_component_state_1 = require("./mobileApis.component.state");
var mobileApis_component_2 = require("./mobileApis.component");
var MobileApisModule = /** @class */ (function () {
    function MobileApisModule() {
    }
    MobileApisModule = __decorate([
        core_1.NgModule({
            declarations: [
                mobileApis_component_1.MobileApisComponent,
            ],
            imports: [
                forms_1.FormsModule,
                ngx_motion_1.AppAnimationModule,
                ngx_motion_1.MobileTechModule,
                ngx_motion_1.MaterialModule,
                ngx_motion_1.AppHelperModule.forRoot(),
                router_1.RouterModule.forChild([
                    {
                        path: 'mobileApis',
                        component: mobileApis_component_1.MobileApisComponent,
                        data: { debugOnly: false, title: 'Mobile Apis', subtitle: 'Mobile API features', show: true, helpTemplate: mobileApis_component_2.MobileApisHelpDialogComponent }
                    },
                ]),
                store_1.NgxsModule.forFeature([
                    mobileApis_component_state_1.MobileApisState
                ])
            ]
        })
    ], MobileApisModule);
    return MobileApisModule;
}());
exports.MobileApisModule = MobileApisModule;
//# sourceMappingURL=mobileApis.module.js.map