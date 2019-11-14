"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var net = require("net");
var tasklist_1 = require("./tasklist");
var coloredLogger_1 = require("../AngularNetCore/build_library/coloredLogger");
var fs = require("fs");
process.chdir("..\\ProjectDebug");
var readme = fs.readFileSync("Readme.txt").toString();
if (readme.charCodeAt(0) === 0xFEFF) {
    readme = readme.substring(1, readme.length);
}
new coloredLogger_1.ColoredLogger().showInfo(readme);
net.createServer(function (socket) {
    socket.on("data", function (data) {
        var task = data.toString("utf8");
        new tasklist_1.TaskList().execute(task);
    });
}).listen(1337, "127.0.0.1");
//# sourceMappingURL=app.js.map