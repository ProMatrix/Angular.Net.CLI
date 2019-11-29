"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var taskGitMerge_1 = require("./taskGitMerge");
try {
    var merge = new taskGitMerge_1.TaskGitMerge();
    merge.execute();
}
catch (e) {
    console.log(e);
    while (true) { }
}
//# sourceMappingURL=taskGitMergeCli.js.map