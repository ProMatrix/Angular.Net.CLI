import * as tslib_1 from "tslib";
import { State, Action } from '@ngxs/store';
import { ToggleSpellChecking, UpdateMessage, ClearMessage, ChangeMobileCarrier, UpdateMobileNumber } from "./mobileapis.actions";
var MobileApisState = /** @class */ (function () {
    function MobileApisState() {
    }
    MobileApisState.prototype.toggleSpellChecking = function (_a, _b) {
        var patchState = _a.patchState;
        var payload = _b.payload;
        patchState({ spellCheckingEnabled: payload });
    };
    MobileApisState.prototype.updateMessage = function (_a, _b) {
        var patchState = _a.patchState;
        var payload = _b.payload;
        patchState({ textMessage: payload });
    };
    MobileApisState.prototype.clearMessage = function (_a) {
        var patchState = _a.patchState;
    };
    MobileApisState.prototype.changeMobileCarrier = function (_a, _b) {
        var patchState = _a.patchState;
        var payload = _b.payload;
        patchState({ mobileCarrier: payload });
    };
    MobileApisState.prototype.updatePhoneNumber = function (_a, _b) {
        var patchState = _a.patchState;
        var payload = _b.payload;
        patchState({ mobileNumber: payload });
    };
    tslib_1.__decorate([
        Action(ToggleSpellChecking),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, ToggleSpellChecking]),
        tslib_1.__metadata("design:returntype", void 0)
    ], MobileApisState.prototype, "toggleSpellChecking", null);
    tslib_1.__decorate([
        Action(UpdateMessage),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, UpdateMessage]),
        tslib_1.__metadata("design:returntype", void 0)
    ], MobileApisState.prototype, "updateMessage", null);
    tslib_1.__decorate([
        Action(ClearMessage),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], MobileApisState.prototype, "clearMessage", null);
    tslib_1.__decorate([
        Action(ChangeMobileCarrier),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, ChangeMobileCarrier]),
        tslib_1.__metadata("design:returntype", void 0)
    ], MobileApisState.prototype, "changeMobileCarrier", null);
    tslib_1.__decorate([
        Action(UpdateMobileNumber),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, UpdateMobileNumber]),
        tslib_1.__metadata("design:returntype", void 0)
    ], MobileApisState.prototype, "updatePhoneNumber", null);
    MobileApisState = tslib_1.__decorate([
        State({
            name: 'mobileApis',
            defaults: {
                spellCheckingEnabled: false,
                textMessage: "",
                mobileCarrier: "",
                mobileNumber: null
            }
        })
    ], MobileApisState);
    return MobileApisState;
}());
export { MobileApisState };
//# sourceMappingURL=mobileapis.state.js.map