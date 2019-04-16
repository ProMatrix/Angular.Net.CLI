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
var TaskImport = /** @class */ (function (_super) {
    __extends(TaskImport, _super);
    function TaskImport() {
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
    ;
    TaskImport.prototype.single = function (visualProject) {
        var bc = this.getBuildConfiguration();
        this.lib.importLibrariesForVsProject(bc, visualProject);
        console.log("Import Single Completed!");
        while (this.waitOnCompleted) { }
    };
    TaskImport.prototype.multiple = function () {
        var _this = this;
        var bc = this.getBuildConfiguration();
        var visualProjects = _.filter(bc.visualProjects, function (x) { return (x.developerSettings.importHook); });
        visualProjects.forEach(function (visualProject) {
            if (visualProject.name !== "ProjectBuild")
                if (visualProject.developerSettings.importHook)
                    _this.lib.importLibrariesForVsProject(bc, visualProject.name);
        });
        console.log("Import Multiple Completed!");
        while (this.waitOnCompleted) { }
    };
    return TaskImport;
}(taskBase_1.TaskBase));
exports.TaskImport = TaskImport;
try {
    new TaskImport();
}
catch (e) {
    console.log(e);
    while (true) { }
}
//# sourceMappingURL=taskImport.js.map