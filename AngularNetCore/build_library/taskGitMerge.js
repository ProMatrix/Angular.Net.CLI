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
var commandLine_1 = require("./commandLine");
var TaskGitMerge = /** @class */ (function (_super) {
    __extends(TaskGitMerge, _super);
    function TaskGitMerge($mergeFrom, $mergeTo) {
        var _this = _super.call(this) || this;
        _this.cli = new commandLine_1.CommandLine();
        if ($mergeFrom !== null && $mergeFrom !== undefined) {
            _this.mergeFrom = $mergeFrom;
        }
        else {
            var mergeFrom = _this.getCommandArg('mergeFrom', 'unknown');
            if (mergeFrom === 'unknown') {
                throw new Error('mergeFrom parameter is missing!');
            }
            else {
                _this.mergeFrom = mergeFrom;
            }
        }
        if ($mergeTo !== null && $mergeTo !== undefined) {
            _this.mergeTo = $mergeTo;
        }
        else {
            var mergeTo = _this.getCommandArg('mergeTo', 'unknown');
            if (mergeTo === 'unknown') {
                throw new Error('mergeTo parameter is missing!');
            }
            else {
                _this.mergeTo = mergeTo;
            }
        }
        _this.execute();
        return _this;
    }
    TaskGitMerge.prototype.execute = function () {
        var outgoingMerges = this.cli.executeSync('git log ' + this.mergeTo + ' --merges --not --remotes');
        console.log('outgoingMerges (' + this.mergeFrom + ' -> ' + this.mergeTo + '): ' + outgoingMerges);
        if (outgoingMerges.length > 0) {
            // any merges into the mergeTo branch will publish to npm
            process.chdir('angular-lib');
            console.log('begin build of: ' + this.mergeTo);
            this.cli.executeSync('npm run build-npm');
            console.log('completed build of: ' + this.mergeTo);
            console.log('begin publish of: ' + this.mergeTo);
            this.cli.executeSync('npm run publish-npm');
            console.log('completed publish of: ' + this.mergeTo);
        }
    };
    TaskGitMerge.prototype.update = function (npmPackage) {
    };
    return TaskGitMerge;
}(taskBase_1.TaskBase));
exports.TaskGitMerge = TaskGitMerge;
//# sourceMappingURL=taskGitMerge.js.map