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
var librarian_1 = require("./librarian");
var TaskGitPush = /** @class */ (function (_super) {
    __extends(TaskGitPush, _super);
    function TaskGitPush() {
        var _this = _super.call(this) || this;
        _this.lib = new librarian_1.Librarian();
        return _this;
    }
    return TaskGitPush;
}(taskBase_1.TaskBase));
exports.TaskGitPush = TaskGitPush;
try {
    var noop = new TaskGitPush();
}
catch (e) {
    console.log(e);
    while (true) {
        var noop = 0;
    }
}
//# sourceMappingURL=taskGitPush.js.map