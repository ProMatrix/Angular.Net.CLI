"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PreCommit = /** @class */ (function () {
    function PreCommit() {
        try {
            process.chdir('./AngularNetCore');
            //new TaskGitCommit(false, 'AngularNetCore', true);
            //throw new Error('Debug Message!');
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