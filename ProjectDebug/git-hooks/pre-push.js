"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var taskGitMerge_1 = require("../../angularnetcore/build_library/taskGitMerge");
var PrePush = /** @class */ (function () {
    function PrePush() {
        try {
            new taskGitMerge_1.TaskGitMerge('master', 'publish');
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