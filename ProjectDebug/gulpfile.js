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

gulp.task("task-config", complete => {
    debug("task-config", () => {
        // fallback in case ProjectDebug is not running
        const t = require("../AngularDotNet/build_library/taskConfig");
        new t.TaskConfig(false, "AngularDotNet");
        complete();
    });
    complete();
});

gulp.task("task-build", complete => {
    debug("task-build", () => {
        // fallback in case ProjectDebug is not running
        const t = require("../AngularDotNet/build_library/taskBuild");
        new t.TaskBuild(true, "AngularDotNet", true);
        complete();
    });
    complete();
});

gulp.task("task-launch", complete => {
    debug("task-launch", () => {
        // fallback in case ProjectDebug is not running
        let t = require("../AngularDotNet/build_library/taskLaunch");
        new t.TaskLaunch("AngularDotNet");
        complete();
    });
    complete();
});

gulp.task("task-embed", complete => {
    debug("task-embed", () => {
        // fallback in case ProjectDebug is not running
        let t = require("../AngularDotNet/build_library/taskEmbed");
        new t.TaskEmbed("AngularDotNet");
        complete();
    });
    complete();
});

gulp.task("task-unEmbed", complete => {
    debug("task-unEmbed", () => {
        // fallback in case ProjectDebug is not running
        let t = require("../AngularDotNet/build_library/taskUnEmbed");
        new t.TaskUnEmbed("AngularDotNet");
        complete();
    });
    complete();
});



function debug(task, fallback) {
    task = process.cwd() + ";" + task;
    const client = new net.Socket();
    client.connect(1337, "127.0.0.1", () => {
        client.write(task);
        client.destroy();
    });
    client.on('error', function (ex) {
        fallback();
    });
}