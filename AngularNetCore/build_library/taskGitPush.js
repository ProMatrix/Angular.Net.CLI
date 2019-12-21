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
    function TaskGitPush($npmPackage, $branch) {
        var _this = _super.call(this) || this;
        _this.publishCompleted = false;
        if ($npmPackage !== null && $npmPackage !== undefined) {
            _this.npmPackage = $npmPackage;
        }
        else {
            var npmPackage = _this.getCommandArg('npmPackage', 'unknown');
            if (npmPackage === 'unknown') {
                throw new Error('npmPackage parameter is missing!');
            }
            else {
                _this.npmPackage = npmPackage;
            }
        }
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
            // any outgoingCommits into the this.branch will publish to npm
            process.chdir('angular-lib\\');
            var libFolder = process.cwd();
            process.chdir('projects\\' + this.npmPackage);
            // get the latest version from npm, and update local package version no.
            var versionOnNpm = this.getNpmVersionNo(this.npmPackage);
            console.log('versionOnNpm: ' + versionOnNpm);
            this.cli.executeSync('npm version ' + versionOnNpm + ' --allow-same-version');
            // run build script
            console.log('begin build of: ' + this.branch);
            this.cli.executeSync('npm version patch');
            process.chdir('..\\');
            this.cli.executeSync('npm run package-ng2-express');
            console.log('completed build of: ' + this.branch);
            console.log('begin publish of: ' + this.branch);
            process.chdir(this.npmPackage + '\\dist');
            this.cli.executeSync('npm publish');
            console.log('completed publish of: ' + this.branch);
            this.publishCompleted = true;
            throw new Error('TERMINATED');
        }
    };
    return TaskGitPush;
}(taskBase_1.TaskBase));
exports.TaskGitPush = TaskGitPush;
//# sourceMappingURL=taskGitPush.js.map