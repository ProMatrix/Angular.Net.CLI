"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var taskNpmPublish_1 = require("./taskNpmPublish");
try {
    process.chdir('..\\AngularNetCore\\wwwroot');
    var noop = new taskNpmPublish_1.TaskNpmPublish();
    while (true) { }
}
catch (e) {
    console.log(e);
    while (true) { }
}
//# sourceMappingURL=taskNpmPublishCli.js.map