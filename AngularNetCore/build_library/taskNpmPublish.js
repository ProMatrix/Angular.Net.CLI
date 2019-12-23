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
    function TaskNpmPublish($npmPackage, $branch, $gitFolder, $libFolder, $workspaces) {
        var _this = _super.call(this) || this;
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
        if ($gitFolder !== null && $gitFolder !== undefined) {
            _this.gitFolder = $gitFolder;
        }
        else {
            var gitFolder = _this.getCommandArg('gitFolder', 'unknown');
            if (gitFolder === 'unknown') {
                throw new Error('gitFolder parameter is missing!');
            }
            else {
                _this.gitFolder = gitFolder;
            }
        }
        if ($libFolder !== null && $libFolder !== undefined) {
            _this.libFolder = $libFolder;
        }
        else {
            var libFolder = _this.getCommandArg('libFolder', 'unknown');
            if (libFolder === 'unknown') {
                throw new Error('libFolder parameter is missing!');
            }
            else {
                _this.libFolder = libFolder;
            }
        }
        if ($workspaces !== null && $workspaces !== undefined) {
            _this.workspaces = $workspaces;
        }
        else {
            var workspaces = _this.getCommandArg('workspaces', 'unknown');
            if (workspaces === 'unknown') {
                throw new Error('workspaces parameter is missing!');
            }
            else {
                _this.workspaces = workspaces;
            }
        }
        _this.execute();
        return _this;
    }
    TaskNpmPublish.prototype.execute = function () {
        var _this = this;
        this.entryPath = process.cwd();
        process.chdir(this.gitFolder);
        this.gitPath = process.cwd();
        process.chdir(this.libFolder);
        this.libPath = process.cwd();
        process.chdir(this.gitPath);
        var currentBranch = this.getCurrentBranch();
        if (currentBranch !== this.branch) {
            console.log('Cannot publish from the branch: ' + currentBranch);
            return;
        }
        var outgoingCommits = this.cli.executeSync('git log origin/' + this.branch + '..' + this.branch);
        if (outgoingCommits.length > 0) {
            // any outgoingCommits into the this.branch will publish to npm
            process.chdir(this.libPath + '\\projects\\' + this.npmPackage);
            // get the latest version from npm, and update local package version no.
            var versionOnNpm_1 = this.getNpmVersionNo(this.npmPackage);
            console.log(this.npmPackage + ' - npm Version: ' + versionOnNpm_1);
            this.cli.executeSync('npm version ' + versionOnNpm_1 + ' --allow-same-version');
            // run build script
            console.log('begin build of: ' + this.npmPackage);
            this.cli.executeSync('npm version patch');
            process.chdir('..\\');
            // could not find a way to do this without running a script command
            this.cli.executeSync('npm run package-ng2-express');
            console.log('begin publish of: ' + this.npmPackage);
            process.chdir(this.npmPackage + '\\dist');
            this.cli.executeSync('npm publish');
            versionOnNpm_1 = this.getNpmVersionNo(this.npmPackage);
            console.log(this.npmPackage + '- npm Version: ' + versionOnNpm_1);
            this.cli.executeSync('npm version ' + versionOnNpm_1 + ' --allow-same-version');
            process.chdir(this.gitPath);
            var cwd = process.cwd();
            // Undo all files that changed during the build process (package.json)
            // By undoing these files, we will be able to change to another branch
            var changedFiles = this.getChangedFiles();
            changedFiles.forEach(function (changedFile) {
                console.log('Undo: ' + changedFile);
                _this.undoLocalChangedFile(changedFile);
            });
            // reinstall the package on all the Angular workspace that use the this.npmPackage
            var workspaceArray = this.workspaces.split(',');
            workspaceArray.forEach(function (workspace) {
                process.chdir(_this.entryPath);
                process.chdir(workspace);
                console.log('re-install package for: ' + workspace);
                _this.cli.executeSync('npm uninstall ' + _this.npmPackage + ' --save');
                _this.cli.executeSync('npm install ' + _this.npmPackage + ' --save');
                var localVersion = _this.getLocalVersionNo(_this.npmPackage);
                console.log(_this.npmPackage + '- local Version: ' + localVersion);
                console.log(_this.npmPackage + '- npm Version: ' + versionOnNpm_1);
                if (versionOnNpm_1 !== localVersion) {
                    throw new Error('Error: npm package version mismatch!');
                }
            });
            console.log('npm publishing completed');
        }
    };
    return TaskNpmPublish;
}(taskBase_1.TaskBase));
exports.TaskNpmPublish = TaskNpmPublish;
//# sourceMappingURL=taskNpmPublish.js.map