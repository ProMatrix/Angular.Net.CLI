"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var taskNpmUpdate_1 = require("./taskNpmUpdate");
try {
    process.chdir('..\\AngularNetCore\\wwwroot');
    var noop = new taskNpmUpdate_1.TaskNpmUpdate();
    while (true) { }
}
catch (e) {
    console.log(e);
    while (true) { }
}
//# sourceMappingURL=taskNpmUpdateCli.js.map