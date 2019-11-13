"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ncp = require('ncp');
var fs = require("fs");
var _ = require('lodash');
var glob = require('glob');
var commandLine_1 = require("./commandLine");
var Librarian = /** @class */ (function () {
    function Librarian() {
        this.cli = new commandLine_1.CommandLine();
    }
    Librarian.prototype.importLibraries = function (bc) {
        // import all libraries
        var projectBuild = _.find(bc.visualProjects, (function (x) { return x.name === 'ProjectBuild'; })).workingDirectory + '\\wwwroot\\shared\\';
        var vsProjects = _.filter(bc.visualProjects, (function (x) { return x.name !== 'ProjectBuild'; }));
        vsProjects.forEach(function (vsProject) {
            if (vsProject.developerSettings.buildHook) {
                vsProject.developerSettings.libraryImports.forEach(function (library) {
                    var source = projectBuild + library;
                    var destination = vsProject.workingDirectory + '\\wwwroot\\shared\\' + library;
                    if (fs.existsSync(source)) {
                        // remove js and map files
                        var options = { filter: new RegExp(/^[^.]+$|\.(?!(js|map)$)([^.]+$)/) };
                        ncp(source, destination, options, function (err) {
                            if (err) {
                                return console.error(err);
                            }
                        });
                    }
                });
            }
        });
    };
    Librarian.prototype.exportLibraries = function (bc) {
        // export all libraries
        bc.visualProjects.forEach(function (vsProject) {
            if (vsProject.developerSettings.buildHook) {
                vsProject.developerSettings.libraryExports.forEach(function (library) {
                    var source = vsProject.workingDirectory + '\\wwwroot\\shared\\' + library;
                    if (fs.existsSync(source)) {
                        var destination = _.find(bc.visualProjects, (function (x) { return x.name === 'ProjectBuild'; })).workingDirectory +
                            '\\wwwroot\\shared\\' + library;
                        ncp(source, destination, function (err) {
                            if (err) {
                                return console.error(err);
                            }
                        });
                    }
                });
            }
        });
    };
    Librarian.prototype.importLibrariesForVsProject = function (bc, visualProject) {
        var _this = this;
        // export all libraries. Note: only folder not subfolders
        var vsProject = _.find(bc.visualProjects, function (x) { return (x.name === visualProject); });
        bc.shared.forEach(function (library) {
            var source = _.find(bc.visualProjects, (function (x) { return x.name === 'ProjectBuild'; })).workingDirectory + '\\wwwroot\\shared\\' + library;
            if (fs.existsSync(source)) {
                var destination = vsProject.workingDirectory + '\\wwwroot\\shared\\' + library;
                if (!fs.existsSync(destination)) {
                    throw new Error('Error: ' + destination + ' doesn\'t exist!');
                }
                // copy all shared libraries except exports
                if (!_.find(vsProject.developerSettings.libraryExports, (function (x) { return x === library; }))) {
                    _this.copySourceToDestination(source, destination);
                }
            }
            else {
                throw new Error('Error: ' + source + ' doesn\'t exist!');
            }
        });
    };
    Librarian.prototype.copySourceToDestination = function (source, destination) {
        var _this = this;
        fs.readdirSync(source).forEach(function (x) {
            var sourcePath = source + '\\' + x;
            var destinationPath = destination + '\\' + x;
            var sourceFile = fs.readFileSync(sourcePath).toString();
            if (fs.existsSync(destinationPath)) {
                var destinationFile = fs.readFileSync(destinationPath).toString();
                if (sourceFile !== destinationFile) {
                    fs.writeFileSync(destinationPath, sourceFile);
                    console.log('Updated: ' + destinationPath);
                    if (destinationPath.substr(destinationPath.length - 2) === 'ts') {
                        console.log('Compiling: ' + destinationPath);
                        _this.cli.executeSync('tsc ' + destinationPath + ' --module commonjs');
                    }
                }
            }
            else {
                fs.writeFileSync(destinationPath, sourceFile);
            }
        });
    };
    Librarian.prototype.exportLibrariesForVsProject = function (bc, visualProject) {
        var _this = this;
        // export all libraries. Note: only folder not subfolders
        var vsProject = _.find(bc.visualProjects, function (x) { return (x.name === visualProject); });
        vsProject.developerSettings.libraryExports.forEach(function (library) {
            var source = vsProject.workingDirectory + '\\wwwroot\\shared\\' + library;
            if (fs.existsSync(source)) {
                var destination = _.find(bc.visualProjects, (function (x) { return x.name === 'ProjectBuild'; })).workingDirectory +
                    '\\wwwroot\\shared\\' + library;
                if (!fs.existsSync(destination)) {
                    throw new Error('Error: ' + destination + ' doesn\'t exist!');
                }
                _this.copySourceToDestination(source, destination);
            }
            else {
                throw new Error('Error: ' + source + ' doesn\'t exist!');
            }
        });
    };
    Librarian.prototype.isExportLibrariesUpdated = function (bc, visualProject) {
        var vsProject = _.find(bc.visualProjects, function (x) { return (x.name === visualProject); });
        var cwd = process.cwd();
        var wwwShared = '/wwwroot/shared';
        var projectBuildSharedPath = cwd + '/ProjectBuild' + wwwShared;
        projectBuildSharedPath = projectBuildSharedPath.replace(/\\/g, '/');
        var vsProjectSharedPath = vsProject.workingDirectory + wwwShared;
        vsProjectSharedPath = vsProjectSharedPath.replace(/\\/g, '/');
        var patternMatch = projectBuildSharedPath + '/**/*ts';
        var exportExcludes = new Array();
        vsProject.developerSettings.libraryExports.forEach(function (libraryExport) {
            exportExcludes.push(projectBuildSharedPath + '/' + libraryExport + '/*ts');
        });
        var allFilesSame = true;
        glob.sync(patternMatch, { ignore: exportExcludes }).forEach(function (file) {
            var projectBuildFile = fs.readFileSync(file).toString();
            var indexOf = file.indexOf(wwwShared) + wwwShared.length;
            file = vsProjectSharedPath + file.substr(indexOf);
            var applicationFile = fs.readFileSync(file).toString();
            if (applicationFile !== projectBuildFile) {
                allFilesSame = false;
            }
        });
        if (allFilesSame) {
            console.log('allFilesSame');
        }
        else {
            console.log('allFilesNotSame');
        }
        return allFilesSame;
    };
    return Librarian;
}());
exports.Librarian = Librarian;
//# sourceMappingURL=librarian.js.map