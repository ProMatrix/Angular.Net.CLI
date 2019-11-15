const gulp = require("gulp");
const cwd = process.cwd();
const vsProjectName = cwd.substr(cwd.lastIndexOf("\\") + 1);
require("../AngularNetCore/build_library/gulpTasks")(gulp, vsProjectName);