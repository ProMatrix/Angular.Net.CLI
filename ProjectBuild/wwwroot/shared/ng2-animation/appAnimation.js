var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//???
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ExpandVisible } from "./expandVisible";
import { ViewFader } from "./viewFader";
import { ViewBlinker } from "./viewBlinker";
import { ModalDialog } from "./modalDialog";
var AppAnimation = /** @class */ (function () {
    function AppAnimation() {
    }
    AppAnimation = __decorate([
        NgModule({
            imports: [CommonModule],
            declarations: [ViewFader, ViewBlinker, ExpandVisible, ModalDialog],
            exports: [
                CommonModule,
                FormsModule,
                ViewFader,
                ViewBlinker,
                ExpandVisible,
                ModalDialog
            ]
        })
    ], AppAnimation);
    return AppAnimation;
}());
export { AppAnimation };
//# sourceMappingURL=appAnimation.js.map