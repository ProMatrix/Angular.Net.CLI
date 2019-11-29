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
var TaskGitMerge = /** @class */ (function (_super) {
    __extends(TaskGitMerge, _super);
    function TaskGitMerge() {
        return _super.call(this) || this;
    }
    return TaskGitMerge;
}(taskBase_1.TaskBase));
exports.TaskGitMerge = TaskGitMerge;
try {
    var noop = new TaskGitMerge();
}
catch (e) {
    console.log(e);
    while (true) {
        var noop = 0;
    }
}
//# sourceMappingURL=taskGitMerge.js.map