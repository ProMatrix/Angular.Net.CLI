module.exports = function (gulp, vsProjectName) {

    const cwd = process.cwd();
    process.chdir("..\\ProjectBuild");
    const projectBuildPath = process.cwd();
    process.chdir(cwd);

    gulp.task("import-libraries",
        async function () {
            try {
                process.chdir(cwd);
                const x = require("../taskImport.js");
                new x.TaskImport().single(vsProjectName);
            } catch (e) {
                console.error(e.message);
            }
        });

    gulp.task("export-libraries",
        async function () {
            try {
                process.chdir(cwd);
                const x = require("../taskExport.js");
                new x.TaskExport().single(vsProjectName);
            } catch (e) {
                console.error(e.message);
            }
        });

    gulp.task("project-build",
        async function () {
            try {
                var x = require("../taskBuild.js");
                process.chdir(projectBuildPath);
                new x.TaskBuild().single(vsProjectName);
            } catch (e) {
                console.error(e.message);
            }
        });

    gulp.task("lanch-app",
        async function () {
            try {
                let l = require("../taskLaunch.js");
                let tl = new l.TaskLaunch();
                process.chdir("..\\ProjectBuild");
                tl.execute(vsProjectName);
            } catch (e) {
                console.error(e.message);
            }
        });
};

