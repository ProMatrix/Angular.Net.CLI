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
var TaskNpmUpdate = /** @class */ (function (_super) {
    __extends(TaskNpmUpdate, _super);
    function TaskNpmUpdate($npmPackage) {
        var _this = _super.call(this) || this;
        _this.cli = new commandLine_1.CommandLine();
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
        _this.execute();
        return _this;
    }
    TaskNpmUpdate.prototype.execute = function () {
        var uninstall = this.cli.executeSync('npm uninstall ' + this.npmPackage + ' --save-dev');
        console.log(uninstall);
        var install = this.cli.executeSync('npm install ' + this.npmPackage + ' --save-dev');
        console.log(install);
    };
    return TaskNpmUpdate;
}(taskBase_1.TaskBase));
exports.TaskNpmUpdate = TaskNpmUpdate;
//# sourceMappingURL=taskNpmUpdate.js.map