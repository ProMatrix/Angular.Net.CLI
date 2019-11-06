var ncli = require("node-command-line");
var c_p = require('child_process');
module.exports = function (gulp, vsProjectName) {
    gulp.task("task-launch", function (complete) {
        var t = require("./taskLaunch.js");
        new t.TaskLaunch("AngularDotNet", false);
        complete();
    });
};
//# sourceMappingURL=gulpTasks.js.map