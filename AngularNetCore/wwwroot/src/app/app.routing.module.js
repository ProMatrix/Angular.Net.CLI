"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var development_component_1 = require("../../features/development.component");
var alreadyReady_component_1 = require("../../features/alreadyReady.component");
var httpDemo_component_1 = require("../../features/httpDemo.component");
var analytics_component_1 = require("../../features/analytics.component");
var features_component_1 = require("../../features/features.component");
var settings_component_1 = require("../../features/settings.component");
var splash_component_1 = require("../../features/splash.component");
var routes = [
    { path: '', component: splash_component_1.SplashComponent },
    {
        path: 'splash', component: splash_component_1.SplashComponent,
        data: { debugOnly: false, title: 'Technologies', subtitle: 'Quick SPLASH', show: true, helpTemplate: splash_component_1.SplashHelpDialogComponent }
    },
    {
        path: 'settings', component: settings_component_1.SettingsComponent,
        data: { debugOnly: false, title: 'Settings', subtitle: 'VERSIONS & SETTINGS', show: true, helpTemplate: settings_component_1.SettingsHelpDialogComponent }
    },
    {
        path: 'analytics', component: analytics_component_1.AnalyticsComponent,
        data: { debugOnly: false, title: 'Analytics', subtitle: 'Application Analytics', show: true, helpTemplate: analytics_component_1.AnalyticsHelpDialogComponent }
    },
    {
        path: 'features', component: features_component_1.FeaturesComponent,
        data: { debugOnly: false, title: 'Features', subtitle: 'More About this Application', show: true, helpTemplate: features_component_1.FeaturesHelpDialogComponent }
    },
    {
        path: 'alreadyReady', component: alreadyReady_component_1.AlreadyReadyComponent,
        data: { debugOnly: false, title: 'Already Ready', subtitle: 'Feature Quick Start', show: true, helpTemplate: alreadyReady_component_1.AlreadyReadyHelpDialogComponent }
    },
    {
        path: 'httpDemo', component: httpDemo_component_1.HttpDemoComponent,
        data: { debugOnly: false, title: 'Http Demo', subtitle: 'Features of the Http Service', show: true, helpTemplate: httpDemo_component_1.HttpDemoHelpDialogComponent }
    },
    {
        path: 'development', component: development_component_1.DevelopmentComponent,
        data: { debugOnly: true, title: 'Developement', subtitle: 'Developement Utilities', show: true, helpTemplate: development_component_1.DevelopmentHelpDialogComponent }
    },
    { path: '**', redirectTo: '/splash', pathMatch: 'full' },
    {
        path: 'restart', redirectTo: '', pathMatch: 'full',
        data: { debugOnly: false, title: 'Restart', subtitle: 'Restarting the Application...', show: true, helpTemplate: splash_component_1.SplashHelpDialogComponent }
    },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app.routing.module.js.map