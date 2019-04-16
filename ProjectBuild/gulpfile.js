const gulp = require("gulp");
const cwd = process.cwd();
const vsProjectName = cwd.substr(cwd.lastIndexOf("\\") + 1);
process.chdir("..\\ProjectBuild");
const projectBuildPath = process.cwd();
process.chdir(cwd);

gulp.task("import-libraries",
    async function () {
        try {
            process.chdir(cwd);
            const x = require("../ProjectBuild/taskImport.js");
            new x.TaskImport().multiple();
        } catch (e) {
            console.error(e.message);
        }
    });

gulp.task("export-libraries",
    async function () {
        try {
            process.chdir(cwd);
            const x = require("../ProjectBuild/taskExport.js");
            new x.TaskExport().multiple();
        } catch (e) {
            console.error(e.message);
        }
    });



gulp.task("project-build",
    async function () {
        try {
            var x = require("../ProjectBuild/taskBuild.js");
            process.chdir(projectBuildPath);
            new x.TaskBuild().single(vsProjectName);
        } catch (e) {
            console.error(e.message);
        }
    });

gulp.task("all-projects-build",
    async function () {
        try {
            var x = require("../ProjectBuild/taskBuild.js");
            process.chdir(projectBuildPath);
            new x.TaskBuild().multiple();
        } catch (e) {
            console.error(e.message);
        }
    });

gulp.task("launch-app",
    async function () {
        try {
            var x = require("../ProjectBuild/taskLaunch.js");
            new x.TaskLaunch().execute(vsProjectName);
        } catch (e) {
            console.error(e.message);
        }
    });
