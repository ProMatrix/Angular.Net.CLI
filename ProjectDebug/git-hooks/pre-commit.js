"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var self_control_1 = require("self-control");
var PreCommit = /** @class */ (function () {
    function PreCommit() {
        try {
            process.chdir('./AngularNetCore');
            new self_control_1.TaskGitCommit(false, 'AngularNetCore', true);
        }
        catch (e) {
            console.error(e.message);
            process.exit(1);
        }
    }
    return PreCommit;
}());
exports.PreCommit = PreCommit;
new PreCommit();
//# sourceMappingURL=pre-commit.js.map