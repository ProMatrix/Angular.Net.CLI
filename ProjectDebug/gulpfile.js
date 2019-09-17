const c = require("../AngularDotNet/build_library/commonTasks");
const ct = new c.CommonTasks();
const tl = require("./tasklist");
const gulp = require("gulp");
const net = require("net");

gulp.task("print-time", complete => {
    if (ct.getIsDebuggingGulp()) {
        execute("print-time");
    } else {
        ct.printTime();
        complete();
    }
});

gulp.task("print-version", complete => {
    if (ct.getIsDebuggingGulp()) {
        execute("print-version");
    } else {
        process.chdir("..\\AngularDotNet");
        ct.printVersion();
        complete();
    }
});

gulp.task("launch-act", complete => {
    if (ct.getIsDebuggingGulp()) {
        execute("launch");
    } else {
        let l = require("../ProjectBuild/taskLaunch.js");
        let tl = new l.TaskLaunch();
        process.chdir("..\\ProjectBuild");
        tl.execute("ProjectBuild");
    }
});

gulp.task("task-cofigure", complete => {
    if (ct.getIsDebuggingGulp())
        execute("task-cofigure");
    else {
        require("../AngularDotNet/taskConfigCli");
        complete();
    }
});

function execute(task) {
    const client = new net.Socket();
    client.connect(1337, "127.0.0.1", function () { client.write(task); });
}