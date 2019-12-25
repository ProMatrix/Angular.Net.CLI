
module.exports = (gulp: any, vsProjectName: string) => {

    gulp.task('task-build', complete => {
        console.log('vsProjectName: ' + vsProjectName);

        const t = require('./taskBuild');
        const noop = new t.TaskBuild(true, vsProjectName, true);
        complete();
    });

    gulp.task('task-launch', complete => {
        const t = require('./taskLaunch');
        const noop = new t.TaskLaunch(vsProjectName, false);
        complete();
    });

    gulp.task('project-settings', complete => {
        const t = require('./taskLaunch');
        const noop = new t.TaskLaunch(vsProjectName, false, 'configure');
        complete();
    });

    gulp.task('task-embed', complete => {
        // fallback in case ProjectDebug is not running
        const t = require('./taskEmbed');
        const noop = new t.TaskEmbed(false, vsProjectName);
        complete();
    });
};

