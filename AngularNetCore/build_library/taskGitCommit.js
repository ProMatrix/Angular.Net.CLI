import { __extends } from "tslib";
import { TaskBase } from './taskBase';
import { CommandLine } from './commandLine';
import { TaskBuild } from './taskBuild';
var _ = require('lodash');
// note this doesn't commit, but is simply a hook during the commit process
var TaskGitCommit = /** @class */ (function (_super) {
    __extends(TaskGitCommit, _super);
    function TaskGitCommit($waitOnCompleted, $visualProject, $synchronous) {
        var _this = _super.call(this) || this;
        _this.cli = new CommandLine();
        _this.synchronous = true;
        if ($waitOnCompleted !== null && $waitOnCompleted !== undefined) {
            _this.waitOnCompleted = $waitOnCompleted;
        }
        else {
            var waitOnCompleted = _this.getCommandArg('waitOnCompleted', 'true');
            if (waitOnCompleted === 'true') {
                _this.waitOnCompleted = true;
            }
            else {
                _this.waitOnCompleted = false;
            }
        }
        if ($synchronous !== null && $synchronous !== undefined) {
            _this.synchronous = $synchronous;
        }
        else {
            var synchronous = _this.getCommandArg('synchronous', 'true');
            if (synchronous === 'true') {
                _this.synchronous = true;
            }
            else {
                _this.synchronous = false;
            }
        }
        if ($visualProject !== null && $visualProject !== undefined) {
            _this.visualProject = $visualProject;
        }
        else {
            var visualProject = _this.getCommandArg('visualProject', 'unknown');
            if (visualProject === 'unknown') {
                throw new Error('visualProject parameter is missing!');
            }
            else {
                _this.visualProject = visualProject;
            }
        }
        _this.execute();
        return _this;
    }
    TaskGitCommit.prototype.execute = function () {
        var bc = this.getBuildConfiguration();
        if (true) {
            var noop = new TaskBuild(this.waitOnCompleted, "AngularNetCore", this.synchronous);
            process.chdir('../../');
            // added any changed files after the Build process
            this.cli.executeSync('git add -u');
        }
    };
    return TaskGitCommit;
}(TaskBase));
export { TaskGitCommit };
//# sourceMappingURL=taskGitCommit.js.map