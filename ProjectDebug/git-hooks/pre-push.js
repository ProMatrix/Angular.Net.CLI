"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var taskNpmPublish_1 = require("../../angularnetcore/build_library/taskNpmPublish");
var PrePush = /** @class */ (function () {
    function PrePush() {
        try {
            // assume the libary_ng is in wwwroot, find the path for the npm update
            var tgp = new taskNpmPublish_1.TaskNpmPublish('ng2-express', 'npm');
            //process.chdir('..\\'); // quick
            process.chdir('..\\..\\');
            // should now be in wwwroot
            if (tgp.publishCompleted) {
                new TaskNpmUpdate('ng2-express');
            }
            // we can only see the console.log is the process.exit(1);
            // process.exit(1);
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