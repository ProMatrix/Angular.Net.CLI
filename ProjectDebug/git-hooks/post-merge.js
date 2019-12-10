"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PreCommit = /** @class */ (function () {
    function PreCommit() {
        try {
            throw new Error('Bad Juju');
            //new TaskGitMerge('master', 'release');
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
//# sourceMappingURL=post-merge.js.map