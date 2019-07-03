"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var taskPrePush_1 = require("../taskPrePush");
var PrePush = /** @class */ (function () {
    function PrePush() {
        try {
            var task = new taskPrePush_1.TaskPrePush();
            throw new Error("Not Implemented!");
        }
        catch (e) {
            console.error(e.message);
            process.exit(1);
        }
    }
    return PrePush;
}());
exports.PrePush = PrePush;
new PrePush();
//# sourceMappingURL=pre-push.js.map