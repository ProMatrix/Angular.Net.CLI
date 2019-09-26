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
    }
    complete();
});

gulp.task("print-version", complete => {
    if (ct.getIsDebuggingGulp()) {
        execute("print-version");
    } else {
        process.chdir("..\\AngularDotNet");
        ct.printVersion();
    }
    complete();
});

gulp.task("task-cofigure", complete => {
    if (ct.getIsDebuggingGulp())
        execute("task-cofigure");
    else {
        const t = require("../AngularDotNet/build_library/taskConfig");
        new t.TaskConfig(true, "AngularDotNet");
    }
    complete();
});

gulp.task("task-build", complete => {
    if (ct.getIsDebuggingGulp())
        execute("task-build");
    else {
        const t = require("../AngularDotNet/build_library/taskBuild");
        new t.TaskBuild(true, "AngularDotNet", true);
    }
    complete();
});

gulp.task("task-launch", complete => {
    if (ct.getIsDebuggingGulp()) {
        execute("launch");
    } else {
        let t = require("../AngularDotNet/build_library/taskLaunch.js");
        new l.TaskLaunch("AngularDotNet");
    }
    complete();
});

function execute(task) {
    const client = new net.Socket();
    client.connect(1337, "127.0.0.1", function () { client.write(task); });
}