import net = require("net");
import { TaskList } from "./tasklist";
import { CommonTasks } from "../AngularDotNet/build_library/commonTasks";
import { ColoredLogger } from "../AngularDotNet/build_library/coloredLogger";
import fs = require("fs");

process.chdir("..\\ProjectDebug");

new CommonTasks().setIsDebuggingGulp(true);

process.on("exit", () => {
    new CommonTasks().setIsDebuggingGulp(false);
});

process.on("SIGHUP", () => {
    new CommonTasks().setIsDebuggingGulp(false);
    process.exit();
});

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
