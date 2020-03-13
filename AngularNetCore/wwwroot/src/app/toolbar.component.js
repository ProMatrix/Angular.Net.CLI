"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var appConfig_1 = require("../../common/appConfig");
var ApplicationAboutDialogComponent = /** @class */ (function () {
    function ApplicationAboutDialogComponent(data, ac) {
        this.data = data;
        this.ac = ac;
    }
    ApplicationAboutDialogComponent = __decorate([
        core_1.Component({
            templateUrl: './toolbar.component.help.html',
            providers: [appConfig_1.AppConfig]
        }),
        __param(0, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], ApplicationAboutDialogComponent);
    return ApplicationAboutDialogComponent;
}());
exports.ApplicationAboutDialogComponent = ApplicationAboutDialogComponent;
var ToolbarComponent = /** @class */ (function () {
    function ToolbarComponent(ac, dialog, route, router) {
        this.ac = ac;
        this.dialog = dialog;
        this.route = route;
        this.router = router;
        this.toggleSidenav = new core_1.EventEmitter();
    }
    ToolbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        window.addEventListener('offline', function (event) {
            _this.ac.toastrWarning('The application just went offline!');
            _this.ac.isOnline = false;
        }, false);
        window.addEventListener('online', function (event) {
            _this.ac.toastrSuccess('The application is back online!');
            _this.ac.isOnline = true;
        }, false);
    };
    ToolbarComponent.prototype.onClickToggleSidenav = function () {
        this.toggleSidenav.emit();
    };
    ToolbarComponent.prototype.openAboutDialog = function () {
        var matDialogRef = this.dialog.open(ApplicationAboutDialogComponent, { width: '450px' });
    };
    ToolbarComponent.prototype.getOnlineStatusIconName = function () {
        if (this.ac.isOnline) {
            return 'signal_wifi_4_bar';
        }
        else {
            return 'signal_wifi_offline';
        }
    };
    ToolbarComponent.prototype.getOnlineStatusText = function () {
        if (this.ac.isOnline) {
            return 'ONLINE';
        }
        else {
            return 'OFFLINE';
        }
    };
    ToolbarComponent.prototype.onClickHelp = function () {
        var data$ = this.ac.getRouteData();
        this.dialog.open(data$.helpTemplate, {
            width: '600px',
            data: data$,
            id: 'pro-help-dialog'
        });
    };
    __decorate([
        core_1.Output()
    ], ToolbarComponent.prototype, "toggleSidenav", void 0);
    ToolbarComponent = __decorate([
        core_1.Component({
            selector: 'app-toolbar',
            templateUrl: './toolbar.component.html',
            providers: [appConfig_1.AppConfig]
        })
    ], ToolbarComponent);
    return ToolbarComponent;
}());
exports.ToolbarComponent = ToolbarComponent;
//# sourceMappingURL=toolbar.component.js.map