"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var taskGitPush_1 = require("./taskGitPush");
try {
    process.chdir('..\\AngularNetCore\\wwwroot\\library_ng');
    var noop = new taskGitPush_1.TaskGitPush();
}
catch (e) {
    console.log(e);
}
while (true) { }
//# sourceMappingURL=taskGitPushCli.js.map