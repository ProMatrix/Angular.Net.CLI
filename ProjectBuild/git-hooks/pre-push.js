"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var taskGitPush_1 = require("../taskGitPush");
var PrePush = /** @class */ (function () {
    function PrePush() {
        try {
            var task = new taskGitPush_1.TaskGitPush();
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