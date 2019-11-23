"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var taskBuild_1 = require("./taskBuild");
try {
    var noop = new taskBuild_1.TaskBuild();
}
catch (e) {
    console.log(e);
    while (true) { }
}
//# sourceMappingURL=taskBuildCli.js.map