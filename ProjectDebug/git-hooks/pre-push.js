"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var taskImport_1 = require("../taskImport");
var PrePush = /** @class */ (function () {
    function PrePush() {
        try {
            var ti = new taskImport_1.TaskImport();
            process.chdir("../Angular.Net.CLI/ProjectBuild");
            ti.multiple();
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