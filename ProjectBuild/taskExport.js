"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var taskBase_1 = require("./taskBase");
var librarian_1 = require("./build_library/librarian");
var _ = require("lodash");
var TaskExport = /** @class */ (function (_super) {
    __extends(TaskExport, _super);
    function TaskExport() {
        var _this = _super.call(this) || this;
        _this.lib = new librarian_1.Librarian();
        var waitOnCompleted = _this.getCommandArg("waitOnCompleted", "unknown");
        if (waitOnCompleted === "unknown")
            return _this;
        _this.waitOnCompleted = true;
        var visualProject = _this.getCommandArg("visualProject", "unknown");
        if (visualProject !== "unknown")
            _this.single(visualProject);
        else
            _this.multiple();
        return _this;
    }
    TaskExport.prototype.single = function (visualProject) {
        var bc = this.getBuildConfiguration();
        this.lib.exportLibrariesForVsProject(bc, visualProject);
        console.log("Export Single Completed!");
        while (this.waitOnCompleted) { }
    };
    TaskExport.prototype.multiple = function () {
        var _this = this;
        var bc = this.getBuildConfiguration();
        var visualProjects = _.filter(bc.visualProjects, function (x) { return (x.developerSettings.libraryExports.length > 0); });
        visualProjects.forEach(function (visualProject) {
            if (visualProject.name !== "ProjectBuild")
                _this.lib.exportLibrariesForVsProject(bc, visualProject.name);
        });
        console.log("Export Multiple Completed!");
        while (this.waitOnCompleted) { }
    };
    return TaskExport;
}(taskBase_1.TaskBase));
exports.TaskExport = TaskExport;
try {
    new TaskExport();
}
catch (e) {
    console.log(e);
    while (true) { }
}
//# sourceMappingURL=taskExport.js.map