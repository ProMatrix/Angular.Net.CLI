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
var animations_1 = require("@angular/platform-browser/animations");
// ngxs
var store_1 = require("@ngxs/store");
var devtools_plugin_1 = require("@ngxs/devtools-plugin");
var logger_plugin_1 = require("@ngxs/logger-plugin");
var side_nav_component_state_1 = require("./side-nav.component.state");
var httpDemo_component_state_1 = require("../../features/httpDemo.component.state");
var app_routing_module_1 = require("./app.routing.module");
var appAnimation_module_1 = require("../../library_ng/ng2-animation/appAnimation.module");
var mobileTech_module_1 = require("../../library_ng/ng2-mobiletech/mobileTech.module");
var appHelper_module_1 = require("../../library_ng/ng2-apphelper/appHelper.module");
// features
var app_component_1 = require("./app.component");
var development_component_1 = require("../../features/development.component");
var alreadyReady_component_1 = require("../../features/alreadyReady.component");
var httpDemo_component_1 = require("../../features/httpDemo.component");
var features_component_1 = require("../../features/features.component");
var settings_component_1 = require("../../features/settings.component");
var splash_component_1 = require("../../features/splash.component");
var notification_module_1 = require("../../features/notification.module");
var mobileApis_module_1 = require("../../features/mobileApis.module");
var material_module_1 = require("../../library_ng/modules/material.module");
var flex_layout_1 = require("@angular/flex-layout");
var toolbar_component_1 = require("./toolbar.component");
var content_component_1 = require("./content.component");
var side_nav_component_1 = require("./side-nav.component");
var base_help_dialog_1 = require("../../features/base.help.dialog");
var notification_component_1 = require("../../features/notification.component");
var mobileApis_component_1 = require("../../features/mobileApis.component");
var file_transfer_dialog_1 = require("../../library_ng/enterprise/file.transfer.dialog");
var entityService_1 = require("../../common/entityService");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent, development_component_1.DevelopmentComponent, alreadyReady_component_1.AlreadyReadyComponent, content_component_1.ContentComponent,
                settings_component_1.SettingsComponent, splash_component_1.SplashComponent, toolbar_component_1.ToolbarComponent, base_help_dialog_1.BaseHelpDialogComponent,
                notification_component_1.NotificationHelpDialogComponent, mobileApis_component_1.MobileApisHelpDialogComponent, splash_component_1.SplashHelpDialogComponent,
                settings_component_1.SettingsHelpDialogComponent, features_component_1.FeaturesHelpDialogComponent,
                development_component_1.DevelopmentHelpDialogComponent, development_component_1.DevelopmentBuildDialogComponent, development_component_1.DevelopmentAddDialogComponent, development_component_1.DevelopmentRemoveDialogComponent, alreadyReady_component_1.AlreadyReadyHelpDialogComponent, httpDemo_component_1.HttpDemoComponent, httpDemo_component_1.HttpDemoHelpDialogComponent,
                toolbar_component_1.ApplicationAboutDialogComponent, features_component_1.FeaturesComponent, side_nav_component_1.SideNavComponent, file_transfer_dialog_1.FileTransferDialogComponent
            ],
            entryComponents: [notification_component_1.NotificationHelpDialogComponent, mobileApis_component_1.MobileApisHelpDialogComponent,
                toolbar_component_1.ApplicationAboutDialogComponent, file_transfer_dialog_1.FileTransferDialogComponent, development_component_1.DevelopmentBuildDialogComponent, development_component_1.DevelopmentAddDialogComponent, development_component_1.DevelopmentRemoveDialogComponent],
            imports: [
                platform_browser_1.BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
                http_1.HttpClientModule,
                forms_1.FormsModule,
                animations_1.BrowserAnimationsModule,
                appAnimation_module_1.AppAnimationModule,
                mobileTech_module_1.MobileTechModule,
                appHelper_module_1.AppHelperModule.forRoot(),
                store_1.NgxsModule.forRoot([
                    side_nav_component_state_1.SideNavState, httpDemo_component_state_1.HttpDemoState
                ]),
                notification_module_1.NotificationModule, mobileApis_module_1.MobileApisModule, app_routing_module_1.AppRoutingModule,
                material_module_1.MaterialModule, flex_layout_1.FlexLayoutModule,
                devtools_plugin_1.NgxsReduxDevtoolsPluginModule.forRoot(),
                logger_plugin_1.NgxsLoggerPluginModule.forRoot()
            ],
            providers: [entityService_1.EntityService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map