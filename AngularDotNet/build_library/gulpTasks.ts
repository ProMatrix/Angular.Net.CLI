const ncli = require("node-command-line");
const c_p = require('child_process');

module.exports = function (gulp, vsProjectName) {

    gulp.task("task-launch", complete => {
        let t = require("./taskLaunch.js");
        new t.TaskLaunch("AngularDotNet");
        complete();
    });

};

