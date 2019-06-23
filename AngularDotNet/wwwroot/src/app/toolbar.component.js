import * as tslib_1 from "tslib";
import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { AppConfig } from "../../common/appConfig";
import { ApplicationAboutDialog } from './toolbar.component.help';
var ToolbarComponent = /** @class */ (function () {
    function ToolbarComponent(ac, dialog, route, router) {
        this.ac = ac;
        this.dialog = dialog;
        this.route = route;
        this.router = router;
        this.toggleSidenav = new EventEmitter();
    }
    ToolbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        window.addEventListener("offline", function (event) {
            _this.ac.toastrWarning("The application just went offline!");
            _this.ac.isOnline = false;
        }, false);
        window.addEventListener("online", function (event) {
            _this.ac.toastrSuccess("The application is back online!");
            _this.ac.isOnline = true;
        }, false);
    };
    ToolbarComponent.prototype.openAboutDialog = function () {
        var matDialogRef = this.dialog.open(ApplicationAboutDialog, { width: '450px' });
    };
    ToolbarComponent.prototype.getOnlineStatusIconName = function () {
        if (this.ac.isOnline)
            return "signal_wifi_4_bar";
        else
            return "signal_wifi_offline";
    };
    ToolbarComponent.prototype.onClickHelp = function () {
        var data = this.ac.getRouteData();
        this.dialog.open(data.helpTemplate, {
            width: '600px',
            height: '600px',
            data: data
        });
    };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], ToolbarComponent.prototype, "toggleSidenav", void 0);
    ToolbarComponent = tslib_1.__decorate([
        Component({
            selector: 'app-toolbar',
            templateUrl: "./toolbar.component.html",
            providers: [AppConfig]
        }),
        tslib_1.__metadata("design:paramtypes", [AppConfig,
            MatDialog,
            ActivatedRoute,
            Router])
    ], ToolbarComponent);
    return ToolbarComponent;
}());
export { ToolbarComponent };
//# sourceMappingURL=toolbar.component.js.map