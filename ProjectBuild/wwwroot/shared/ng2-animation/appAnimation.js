import * as tslib_1 from "tslib";
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
    AppAnimation = tslib_1.__decorate([
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