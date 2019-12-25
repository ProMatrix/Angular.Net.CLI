module.exports = function (gulp, vsProjectName) {
    gulp.task('task-build', function (complete) {
        console.log('vsProjectName: ' + vsProjectName);
        var t = require('./taskBuild');
        var noop = new t.TaskBuild(true, vsProjectName, true);
        complete();
    });
    gulp.task('task-launch', function (complete) {
        var t = require('./taskLaunch');
        var noop = new t.TaskLaunch(vsProjectName, false);
        complete();
    });
    gulp.task('project-settings', function (complete) {
        var t = require('./taskLaunch');
        var noop = new t.TaskLaunch(vsProjectName, false, 'configure');
        complete();
    });
    gulp.task('task-embed', function (complete) {
        // fallback in case ProjectDebug is not running
        var t = require('./taskEmbed');
        var noop = new t.TaskEmbed(false, vsProjectName);
        complete();
    });
};
//# sourceMappingURL=gulpTasks.js.map