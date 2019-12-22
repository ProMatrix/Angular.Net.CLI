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
var TaskNpmPublish = /** @class */ (function (_super) {
    __extends(TaskNpmPublish, _super);
    function TaskNpmPublish($npmPackage, $branch) {
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
    TaskNpmPublish.prototype.execute = function () {
        var _this = this;
        var localVersion = this.getLocalVersionNo(this.npmPackage);
        console.log(this.npmPackage + '- local Version: ' + localVersion);
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
            console.log('Version On npm (before build): ' + versionOnNpm);
            this.cli.executeSync('npm version ' + versionOnNpm + ' --allow-same-version');
            // run build script
            console.log('begin build of: ' + this.branch);
            this.cli.executeSync('npm version patch');
            process.chdir('..\\');
            console.log('cwd: ' + process.cwd());
            // could not find a way to do this without running a script command
            this.cli.executeSync('npm run package-ng2-express');
            console.log('completed build of: ' + this.branch);
            console.log('begin publish of: ' + this.branch);
            process.chdir(this.npmPackage + '\\dist');
            this.cli.executeSync('npm publish');
            console.log('completed publish of: ' + this.branch);
            versionOnNpm = this.getNpmVersionNo(this.npmPackage);
            console.log('Version On npm (after build): ' + versionOnNpm);
            this.cli.executeSync('npm version ' + versionOnNpm + ' --allow-same-version');
            //????
            this.publishCompleted = true;
            process.chdir('..\\..\\..\\..\\..\\'); // wwwroot
            console.log('cwd: ' + process.cwd());
            var uninstall = this.cli.executeSync('npm uninstall ' + this.npmPackage + ' --save');
            console.log(uninstall);
            var install = this.cli.executeSync('npm install ' + this.npmPackage + ' --save');
            console.log(install);
            var localVersion_1 = this.getLocalVersionNo(this.npmPackage);
            console.log(this.npmPackage + '- local Version: ' + localVersion_1);
            console.log(this.npmPackage + '- npm Version: ' + versionOnNpm);
            if (versionOnNpm !== localVersion_1) {
                throw new Error('Error: npm package version mismatch!');
            }
            return;
            // Undo files that changed during the build process (package.json)
            process.chdir('library_ng');
            var changedFiles = this.getChangedFiles();
            changedFiles.forEach(function (changedFile) {
                console.log('Undo: ' + changedFile);
                var message = _this.undoLocalChangedFile(changedFile);
                console.log('message: ' + message);
            });
        }
    };
    return TaskNpmPublish;
}(taskBase_1.TaskBase));
exports.TaskNpmPublish = TaskNpmPublish;
//# sourceMappingURL=taskNpmPublish.js.map