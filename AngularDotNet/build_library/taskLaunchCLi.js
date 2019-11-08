"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var taskLaunch_1 = require("./taskLaunch");
try {
    var noop = new taskLaunch_1.TaskLaunch();
}
catch (e) {
    console.log(e);
    while (true) { }
}
//# sourceMappingURL=taskLaunchCLi.js.map