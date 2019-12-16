"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var taskGitMerge_1 = require("./taskGitMerge");
var taskNpmUpdate_1 = require("./taskNpmUpdate");
try {
    var cwd = process.cwd();
    while (true) {
        process.chdir(cwd);
        process.chdir('..\\AngularNetCore\\wwwroot\\library_ng');
        var noop1 = new taskGitMerge_1.TaskGitMerge('master', 'npm');
        process.chdir(cwd);
        process.chdir('..\\AngularNetCore\\wwwroot');
        var noop2 = new taskNpmUpdate_1.TaskNpmUpdate('ng2-express');
    }
}
catch (e) {
    console.log(e);
    while (true) { }
}
//# sourceMappingURL=taskTestCli.js.map