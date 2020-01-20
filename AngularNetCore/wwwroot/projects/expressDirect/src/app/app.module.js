"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var router_1 = require("@angular/router");
var animations_1 = require("@angular/platform-browser/animations");
// features
var app_component_1 = require("./app.component");
// services
var ngx_motion_1 = require("ngx-motion");
var ngx_motion_2 = require("ngx-motion");
// components
// direct access
var express_module_1 = require("../../../../../../../NgResources/ng2-express/library/projects/ng2-express/src/express.module");
var ngx_motion_3 = require("ngx-motion");
var base_help_dialog_1 = require("../../../../features/base.help.dialog");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [app_component_1.AppComponent, base_help_dialog_1.BaseHelpDialogComponent],
            entryComponents: [],
            imports: [platform_browser_1.BrowserModule,
                http_1.HttpClientModule,
                forms_1.FormsModule,
                animations_1.BrowserAnimationsModule,
                ngx_motion_1.AppAnimationModule,
                ngx_motion_2.AppHelperModule.forRoot(),
                router_1.RouterModule.forRoot([]),
                ngx_motion_3.MaterialModule, express_module_1.ExpressModule
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map