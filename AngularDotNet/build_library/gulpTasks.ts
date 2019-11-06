const ncli = require("node-command-line");
const c_p = require('child_process');

module.exports = function (gulp, vsProjectName) {

    gulp.task("task-build", complete => {
        const t = require("./taskBuild");
        new t.TaskBuild(true, "AngularDotNet", true);
        complete();
    });

    gulp.task("task-launch", complete => {
        let t = require("./taskLaunch");
        new t.TaskLaunch("AngularDotNet", false);
        complete();
    });

    gulp.task("task-embed", complete => {
        // fallback in case ProjectDebug is not running
        let t = require("./taskEmbed");
        new t.TaskEmbed(false, "AngularDotNet");
        complete();
    });
};

