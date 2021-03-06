﻿import net = require("net");
import { TaskList } from "./tasklist";
//import { CommonTasks, ColoredLogger } from 'self-control';
import { CommonTasks, ColoredLogger } from '../../NgResources/self-control';
import fs = require("fs-extra");

process.chdir("..\\ProjectDebug");
let readme = fs.readFileSync("Readme.txt").toString();
if (readme.charCodeAt(0) === 0xFEFF) {
    readme = readme.substring(1, readme.length);
}
new ColoredLogger().showInfo(readme);

net.createServer((socket) => {
    socket.on("data", data => {
        const task = data.toString("utf8");
        new TaskList().execute(task);
    });
}).listen(1337, "127.0.0.1");
