module.exports = function (gulp, vsProjectName) {
    gulp.task('task-build', function (complete) {
        var t = require('./taskBuild');
        var noop = new t.TaskBuild(true, 'AngularNetCore', true);
        complete();
    });
    gulp.task('task-launch', function (complete) {
        var t = require('./taskLaunch');
        var noop = new t.TaskLaunch('AngularNetCore', false);
        complete();
    });
    gulp.task('project-settings', function (complete) {
        var t = require('./taskLaunch');
        var noop = new t.TaskLaunch('AngularNetCore', false, 'configure');
        complete();
    });
    gulp.task('task-embed', function (complete) {
        // fallback in case ProjectDebug is not running
        var t = require('./taskEmbed');
        var noop = new t.TaskEmbed(false, 'AngularNetCore');
        complete();
    });
};
//# sourceMappingURL=gulpTasks.js.map