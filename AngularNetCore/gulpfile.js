const gulp = require("gulp");
const cwd = process.cwd();
const vsProjectName = cwd.substr(cwd.lastIndexOf("\\") + 1);
require("./node_modules/self-control/src/gulpTasks")(gulp, vsProjectName);
