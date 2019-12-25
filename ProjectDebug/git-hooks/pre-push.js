"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var taskNpmPublish_1 = require("../../angularNetCore/build_library/taskNpmPublish");
var PrePush = /** @class */ (function () {
    function PrePush() {
        try {
            // assume the libary_ng is in wwwroot, find the path for the npm update
            var noop = new taskNpmPublish_1.TaskNpmPublish('ng2-express', 'npm', '..\\..\\NgResources\\ng2-express', 'library', '..\\..\\Angular.Net.CLI\\AngularNetCore\\wwwroot');
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