"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var net = require("net");
var tasklist_1 = require("./tasklist");
var commonTasks_1 = require("../ProjectBuild/build_library/commonTasks");
var coloredLogger_1 = require("../ProjectBuild/build_library/coloredLogger");
var fs = require("fs");
new commonTasks_1.CommonTasks().setIsDebuggingGulp(true);
process.on("exit", function () {
    new commonTasks_1.CommonTasks().setIsDebuggingGulp(false);
});
process.on('SIGHUP', function () {
    new commonTasks_1.CommonTasks().setIsDebuggingGulp(false);
    process.exit();
});
var readme = fs.readFileSync("Readme.txt").toString();
if (readme.charCodeAt(0) === 0xFEFF)
    readme = readme.substring(1, readme.length);
new coloredLogger_1.ColoredLogger().showInfo(readme);
net.createServer(function (socket) {
    socket.on("data", function (data) {
        var task = data.toString("utf8");
        new tasklist_1.TaskList().execute(task);
    });
}).listen(1337, "127.0.0.1");
//# sourceMappingURL=app.js.map