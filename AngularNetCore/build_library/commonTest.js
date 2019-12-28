"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommonTest = /** @class */ (function () {
    function CommonTest() {
    }
    CommonTest.prototype.printTime = function () {
        var d = new Date();
        var t = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + ':' + d.getMilliseconds();
        console.log("TIME: " + t);
    };
    return CommonTest;
}());
exports.CommonTest = CommonTest;
//# sourceMappingURL=commonTest.js.map