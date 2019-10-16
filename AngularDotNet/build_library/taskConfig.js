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
var TaskConfig = /** @class */ (function (_super) {
    __extends(TaskConfig, _super);
    function TaskConfig($waitOnCompleted, $visualProject) {
        var _this = _super.call(this) || this;
        if ($waitOnCompleted !== null) {
            _this.waitOnCompleted = $waitOnCompleted;
        }
        else {
            var waitOnCompleted = _this.getCommandArg("waitOnCompleted", "true");
            if (waitOnCompleted === "true") {
                _this.waitOnCompleted = true;
            }
            else {
                _this.waitOnCompleted = false;
            }
        }
        if ($visualProject !== null) {
            _this.visualProject = $visualProject;
        }
        else {
            var visualProject = _this.getCommandArg("visualProject", "unknown");
            if (visualProject === "unknown") {
                throw new Error("visualProject parameter is missing!");
            }
            else {
                _this.visualProject = visualProject;
            }
        }
        console.log(JSON.stringify(_this.getBuildConfiguration(), null, 2));
        if (_this.waitOnCompleted) {
            while (true) { }
        }
        return _this;
    }
    return TaskConfig;
}(taskBase_1.TaskBase));
exports.TaskConfig = TaskConfig;
//# sourceMappingURL=taskConfig.js.map