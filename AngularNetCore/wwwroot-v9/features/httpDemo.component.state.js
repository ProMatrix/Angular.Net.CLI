"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var store_1 = require("@ngxs/store");
var httpDemo_component_actions_1 = require("./httpDemo.component.actions");
var HttpDemoStateModel = /** @class */ (function () {
    function HttpDemoStateModel() {
        this.requestHttpDownload = false;
    }
    return HttpDemoStateModel;
}());
exports.HttpDemoStateModel = HttpDemoStateModel;
var HttpDemoState = /** @class */ (function () {
    function HttpDemoState(es) {
        this.es = es;
    }
    HttpDemoState.prototype.action01 = function (_a, _b) {
        var patchState = _a.patchState;
        var payload = _b.payload;
        patchState({ requestHttpDownload: payload });
    };
    HttpDemoState.prototype.action02 = function (_a, _b) {
        var patchState = _a.patchState;
        var payload = _b.payload, samplePayload = _b.samplePayload;
        if (samplePayload) {
            this.es.samplePayload(payload, 'text/plain', function (successMessage) {
                patchState({ blob: payload });
            }, function (errorMessage) {
                alert(errorMessage);
            });
        }
        else {
            patchState({ blob: payload });
        }
    };
    __decorate([
        store_1.Action(httpDemo_component_actions_1.RequestHttpDownload)
    ], HttpDemoState.prototype, "action01", null);
    __decorate([
        store_1.Action(httpDemo_component_actions_1.ResponseHttpDownload)
    ], HttpDemoState.prototype, "action02", null);
    HttpDemoState = __decorate([
        store_1.State({
            name: 'httpDemo',
            defaults: new HttpDemoStateModel()
        }),
        core_1.Injectable()
    ], HttpDemoState);
    return HttpDemoState;
}());
exports.HttpDemoState = HttpDemoState;
//# sourceMappingURL=httpDemo.component.state.js.map