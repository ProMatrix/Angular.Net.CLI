const c = require("../AngularDotNet/build_library/commonTasks");
const ct = new c.CommonTasks();
const tl = require("./tasklist");
const gulp = require("gulp");
const net = require("net");

gulp.task("print-time", complete => {
    debug("print-time", () => {
        // fallback in case ProjectDebug is not running
        ct.printTime();
        complete();
    });
    complete();
});

gulp.task("print-version", complete => {
    process.chdir("..\\AngularDotNet");
    debug("print-version", () => {
        // fallback in case ProjectDebug is not running
        ct.printVersion();
        complete();
    });
    complete();
});

gulp.task("task-config-d", complete => {
    debug("task-cofigure");
    complete();
});

gulp.task("task-config-e", complete => {
    const t = require("../AngularDotNet/build_library/taskConfig");
    new t.TaskConfig(true, "AngularDotNet");
    complete();
});

gulp.task("task-build-d", complete => {
    debug("task-build");
    complete();
});

gulp.task("task-build-e", complete => {
    const t = require("../AngularDotNet/build_library/taskBuild");
    new t.TaskBuild(true, "AngularDotNet", true);
    complete();
});

gulp.task("task-launch-d", complete => {
    debug("launch");
    complete();
});

gulp.task("task-launch-e", complete => {
    let t = require("../AngularDotNet/build_library/taskLaunch");
    new t.TaskLaunch("AngularDotNet");
    complete();
});

function debug(task, fallback) {
    const client = new net.Socket();
    client.connect(1337, "127.0.0.1", () => { client.write(task); });
    client.on('error', function (ex) {
        fallback();
    });
}