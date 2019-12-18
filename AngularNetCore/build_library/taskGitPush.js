"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var taskBase_1 = require("./taskBase");
var TaskGitPush = /** @class */ (function (_super) {
    __extends(TaskGitPush, _super);
    function TaskGitPush($branch) {
        var _this = _super.call(this) || this;
        _this.publishCompleted = false;
        if ($branch !== null && $branch !== undefined) {
            _this.branch = $branch;
        }
        else {
            var branch = _this.getCommandArg('branch', 'unknown');
            if (branch === 'unknown') {
                throw new Error('branch parameter is missing!');
            }
            else {
                _this.branch = branch;
            }
        }
        _this.execute();
        return _this;
    }
    TaskGitPush.prototype.execute = function () {
        var currentBranch = this.getCurrentBranch();
        if (currentBranch !== this.branch) {
            console.log('Cannot publish from the branch: ' + currentBranch);
            return;
        }
        var outgoingCommits = this.cli.executeSync('git log origin/' + this.branch + '..' + this.branch);
        if (outgoingCommits.length > 0) {
            process.chdir('angular-lib');
            console.log('begin build of: ' + this.branch);
            this.cli.executeSync('npm run build-npm');
            console.log('completed build of: ' + this.branch);
            console.log('begin publish of: ' + this.branch);
            this.cli.executeSync('npm run publish-npm');
            console.log('completed publish of: ' + this.branch);
            this.publishCompleted = true;
        }
    };
    return TaskGitPush;
}(taskBase_1.TaskBase));
exports.TaskGitPush = TaskGitPush;
//# sourceMappingURL=taskGitPush.js.map