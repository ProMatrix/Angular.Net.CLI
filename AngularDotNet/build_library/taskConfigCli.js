"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var taskConfig_1 = require("./taskConfig");
try {
    new taskConfig_1.TaskConfig();
}
catch (e) {
    console.log(e);
    if (this.waitOnCompleted) {
        while (true) { }
    }
}
//# sourceMappingURL=taskConfigCli.js.map