/// <binding ProjectOpened='task-ng-serve' />
const gulp = require("gulp");
const cwd = process.cwd();
const vsProjectName = cwd.substr(cwd.lastIndexOf("\\") + 1);

//require("self-control/src/gulpTasks")(gulp, vsProjectName);

require('../../NgResources/self-control/src/gulpTasks')(gulp, vsProjectName);