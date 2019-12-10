"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var taskGitMerge_1 = require("../../angularnetcore/build_library/taskGitMerge");
var taskNpmUpdate_1 = require("../../angularnetcore/build_library/taskNpmUpdate");
var PrePush = /** @class */ (function () {
    function PrePush() {
        try {
            var tgm = new taskGitMerge_1.TaskGitMerge('master', 'npm');
            if (tgm.mergeCompleted) {
                new taskNpmUpdate_1.TaskNpmUpdate('ng2-express');
            }
            // we can only see the console.log is the process.exit(1);
            process.exit(1);
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