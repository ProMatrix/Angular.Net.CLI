const c = require('self-control');
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
    process.chdir("..\\AngularNetCore");
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
        const t = require("../AngularNetCore/build_library/taskConfig");
        new t.TaskConfig(false, "AngularNetCore");
        complete();
    });
    complete();
});

gulp.task("task-build", complete => {
    debug("task-build", () => {
        // fallback in case ProjectDebug is not running
        const t = require("../AngularNetCore/build_library/taskBuild");
        new t.TaskBuild(true, "AngularNetCore", true);
        complete();
    });
    complete();
});

gulp.task("task-launch", complete => {
    debug("task-launch", () => {
        // fallback in case ProjectDebug is not running
        let t = require("../AngularNetCore/build_library/taskLaunch");
        new t.TaskLaunch("AngularNetCore", false);
        complete();
    });
    complete();
});

gulp.task("task-embed", complete => {
    debug("task-embed", () => {
        // fallback in case ProjectDebug is not running
        let t = require("../AngularNetCore/build_library/taskEmbed");
        new t.TaskEmbed(false, "AngularNetCore");
        complete();
    });
    complete();
});

gulp.task("npm-publish-angular", complete => {
    debug("npm-publish-angular", () => {
        // fallback in case ProjectDebug is not running
        let t = require("../AngularNetCore/build_library/taskNpmPublish");
        // ???
        new t.TaskNpmPublish('ng2-express', 'npm', '..\\..\\NgResources\\ng2-express', 'library', 'projects\\ng2-express\\dist', '..\\AngularNetCore\\wwwroot', 'package-ng2-express');
        complete();
    });
    complete();
});

gulp.task("npm-publish-library", complete => {
    debug("npm-publish-library", () => {
        // fallback in case ProjectDebug is not running
        let t = require("../AngularNetCore/build_library/taskNpmPublish");
        // ???
        new t.TaskNpmPublish('self-control', 'npm', '..\\..\\NgResources\\self-control', '.\\', '.\\', '..\\..\\Angular.Net.CLI\\ProjectDebug,..\\..\\Angular.Net.CLI\\AngularNetCore\\wwwroot', '');
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