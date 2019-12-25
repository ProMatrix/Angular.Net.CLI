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
var expressNpm_component_1 = require("./expressNpm.component");
var routes = [
    { path: '', component: expressNpm_component_1.ExpressNpmComponent },
    {
        path: 'expressNpm', component: expressNpm_component_1.ExpressNpmComponent,
        data: { debugOnly: true, title: 'ExpressNpm', subtitle: 'ExpressNpm Utilities', show: true, helpExpressNpm: expressNpm_component_1.ExpressNpmHelpDialogComponent }
    },
    {
        path: 'restart', redirectTo: '', pathMatch: 'full',
        data: { debugOnly: false, title: 'Restart', subtitle: 'Restarting the Application...', show: true, helpExpressNpm: expressNpm_component_1.ExpressNpmHelpDialogComponent }
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