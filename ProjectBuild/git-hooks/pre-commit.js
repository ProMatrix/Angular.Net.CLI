"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var taskGitCommit_1 = require("../taskGitCommit");
var PreCommit = /** @class */ (function () {
    function PreCommit() {
        try {
            var tgh = new taskGitCommit_1.TaskGitCommit();
            process.chdir("../Angular.Net.CLI/ProjectBuild");
            tgh.execute();
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