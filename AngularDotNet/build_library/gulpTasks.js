module.exports = function (gulp, vsProjectName) {
    gulp.task('task-build', function (complete) {
        var t = require('./taskBuild');
        var noop = new t.TaskBuild(true, 'AngularDotNet', true);
        complete();
    });
    gulp.task('task-launch', function (complete) {
        var t = require('./taskLaunch');
        var noop = new t.TaskLaunch('AngularDotNet', false);
        complete();
    });
    gulp.task('configure', function (complete) {
        var t = require('./taskLaunch');
        var noop = new t.TaskLaunch('AngularDotNet', false, 'configure');
        complete();
    });
    gulp.task('task-embed', function (complete) {
        // fallback in case ProjectDebug is not running
        var t = require('./taskEmbed');
        var noop = new t.TaskEmbed(false, 'AngularDotNet');
        complete();
    });
};
//# sourceMappingURL=gulpTasks.js.map