//const c = require('self-control');
const c = require('../../NgResources/self-control');
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
        new c.TaskConfig(false, "AngularNetCore");
        complete();
    });
    complete();
});

gulp.task("task-build", complete => {
    debug("task-build", () => {
        // fallback in case ProjectDebug is not running
        new c.TaskBuild(true, "AngularNetCore", true);
        complete();
    });
    complete();
});

gulp.task("task-launch", complete => {
    debug("task-launch", () => {
        // fallback in case ProjectDebug is not running
        new c.TaskLaunch("AngularNetCore", false);
        complete();
    });
    complete();
});

gulp.task("task-embed", complete => {
    debug("task-embed", () => {
        // fallback in case ProjectDebug is not running
        new c.TaskEmbed(false, "AngularNetCore");
        complete();
    });
    complete();
});

gulp.task("task-ng-serve", complete => {
    debug("task-ng-serve", () => {
        // fallback in case ProjectDebug is not running
        new c.TaskNgServe();
        complete();
    });
    complete();
});

gulp.task("npm-publish-angular", complete => {
    debug("npm-publish-angular", () => {
        // fallback in case ProjectDebug is not running
        new c.TaskNpmPublish('ng2-express', 'npm', '..\\..\\NgResources\\ng2-express', 'library', 'projects\\ng2-express\\dist', '..\\AngularNetCore\\wwwroot', 'package-ng2-express');
        complete();
    });
    complete();
});

gulp.task("npm-publish-library", complete => {
    debug("npm-publish-library", () => {
        // fallback in case ProjectDebug is not running
        new c.TaskNpmPublish('self-control', 'npm', '..\\..\\NgResources\\self-control', '.\\', '.\\', '..\\..\\Angular.Net.CLI\\ProjectDebug,..\\..\\Angular.Net.CLI\\AngularNetCore\\wwwroot', '');
        complete();
    });
    complete();
});

gulp.task("task-add", complete => {
    debug("task-add", () => {
        complete();
    });
    complete();
});

gulp.task("task-remove", complete => {
    debug("task-remove", () => {
        complete();
    });
    complete();
});

gulp.task("add-remove-test", complete => {
    debug("add-remove-test", () => {
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