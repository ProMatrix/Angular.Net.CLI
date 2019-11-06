const gulp = require("gulp");
const cwd = process.cwd();
const vsProjectName = cwd.substr(cwd.lastIndexOf("\\") + 1);
require("../ProjectDebug/gulp-tasks/project")(gulp, vsProjectName);