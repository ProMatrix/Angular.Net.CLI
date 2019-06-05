const gulp = require("gulp");
const cwd = process.cwd();
const vsProjectName = cwd.substr(cwd.lastIndexOf("\\") + 1);
require("../ProjectBuild/gulp-tasks/project")(gulp, vsProjectName);