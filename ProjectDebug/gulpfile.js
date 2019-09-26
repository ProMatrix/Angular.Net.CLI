const c = require("../AngularDotNet/build_library/commonTasks");
const ct = new c.CommonTasks();
const tl = require("./tasklist");
const gulp = require("gulp");
const net = require("net");

gulp.task("print-time-d", complete => {
    debug("print-time");
    complete();
});

gulp.task("print-time-e", complete => {
    ct.printTime();
    complete();
});

gulp.task("print-version-d", complete => {
    process.chdir("..\\AngularDotNet");
    debug("print-version");
    complete();
});

gulp.task("print-version-e", complete => {
    process.chdir("..\\AngularDotNet");
    ct.printVersion();
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

gulp.task("print-time", complete => {
    debug("print-time", () => {
        ct.printTime();
        complete();
    });
    complete();
});

function debug(task, fallback) {
    const client = new net.Socket();
    client.connect(1337, "127.0.0.1", () => { client.write(task); });
    client.on('error', function (ex) {
        fallback();
    });
}

function debug2(task) {
    const client = new net.Socket();
    client.connect(1337, "127.0.0.1", function () { client.write(task); });

    client.on('error', function (ex) {
        console.log("handled error");
    });
}