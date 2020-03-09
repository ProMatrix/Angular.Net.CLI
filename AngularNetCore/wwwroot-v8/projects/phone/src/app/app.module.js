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
// ngxs
var store_1 = require("@ngxs/store");
var devtools_plugin_1 = require("@ngxs/devtools-plugin");
var logger_plugin_1 = require("@ngxs/logger-plugin");
var mobileApis_module_1 = require("../../../../features/mobileApis.module");
var base_help_dialog_1 = require("../../../../features/base.help.dialog");
var mobileApis_component_1 = require("../../../../features/mobileApis.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [app_component_1.AppComponent, base_help_dialog_1.BaseHelpDialogComponent, mobileApis_component_1.MobileApisHelpDialogComponent],
            imports: [platform_browser_1.BrowserModule,
                http_1.HttpClientModule,
                forms_1.FormsModule,
                animations_1.BrowserAnimationsModule,
                ngx_motion_1.AppAnimationModule,
                ngx_motion_1.MobileTechModule,
                ngx_motion_1.AppHelperModule.forRoot(),
                mobileApis_module_1.MobileApisModule,
                router_1.RouterModule.forRoot([]),
                store_1.NgxsModule.forRoot([]),
                mobileApis_module_1.MobileApisModule,
                devtools_plugin_1.NgxsReduxDevtoolsPluginModule.forRoot(),
                logger_plugin_1.NgxsLoggerPluginModule.forRoot(), ngx_motion_1.MaterialModule
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map