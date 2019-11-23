const ncp = require('ncp');
import * as fs from 'fs';
const _ = require('lodash');
const glob = require('glob');
import { CommandLine } from './commandLine';

import { AngularProject, DeveloperSettings, VisualProject, BuildConfiguration, AppSettings } from '../wwwroot/library_ng/client-side-models/buildModels';

export class Librarian {
    private cli = new CommandLine();

    constructor() {

    }

    importLibraries(bc: BuildConfiguration) {
        // import all libraries
        const projectBuild = _.find(bc.visualProjects, (x => x.name === 'ProjectBuild')).workingDirectory + '\\wwwroot\\library_ng\\';
        const vsProjects = _.filter(bc.visualProjects, (x => x.name !== 'ProjectBuild'));
        vsProjects.forEach((vsProject) => {
            if (vsProject.developerSettings.buildHook) {
                vsProject.developerSettings.libraryImports.forEach(library => {
                    const source = projectBuild + library;
                    const destination = vsProject.workingDirectory + '\\wwwroot\\library_ng\\' + library;
                    if (fs.existsSync(source)) {
                        // remove js and map files
                        const options = { filter: new RegExp(/^[^.]+$|\.(?!(js|map)$)([^.]+$)/) };
                        ncp(source, destination, options, (err) => {
                            if (err) {
                                return console.error(err);
                            }
                        });
                    }
                });
            }
        });
    }

    exportLibraries(bc: BuildConfiguration) {
        // export all libraries
        bc.visualProjects.forEach((vsProject) => {
            if (vsProject.developerSettings.buildHook) {
                vsProject.developerSettings.libraryExports.forEach(library => {
                    const source = vsProject.workingDirectory + '\\wwwroot\\library_ng\\' + library;
                    if (fs.existsSync(source)) {
                        const destination = _.find(bc.visualProjects, (x => x.name === 'ProjectBuild')).workingDirectory +
                            '\\wwwroot\\library_ng\\' + library;
                        ncp(source, destination, (err) => {
                            if (err) {
                                return console.error(err);
                            }
                        });
                    }
                });
            }
        });
    }

    importLibrariesForVsProject(bc: BuildConfiguration, visualProject: string) {
        // export all libraries. Note: only folder not subfolders
        const vsProject = _.find(bc.visualProjects, x => (x.name === visualProject)) as VisualProject;
        bc.library_ng.forEach(library => {
            const source = _.find(bc.visualProjects, (x => x.name === 'ProjectBuild')).workingDirectory + '\\wwwroot\\library_ng\\' + library;
            if (fs.existsSync(source)) {
                const destination = vsProject.workingDirectory + '\\wwwroot\\library_ng\\' + library;
                if (!fs.existsSync(destination)) {
                    throw new Error('Error: ' + destination + ' doesn\'t exist!');
                }
                // copy all library_ng libraries except exports
                if (!_.find(vsProject.developerSettings.libraryExports, (x => x === library))) {
                    this.copySourceToDestination(source, destination);
                }

            } else {
                throw new Error('Error: ' + source + ' doesn\'t exist!');
            }
        });
    }

    copySourceToDestination(source: string, destination: string) {
        fs.readdirSync(source).forEach((x) => {
            const sourcePath = source + '\\' + x;
            const destinationPath = destination + '\\' + x;
            const sourceFile = fs.readFileSync(sourcePath).toString();
            if (fs.existsSync(destinationPath)) {
                const destinationFile = fs.readFileSync(destinationPath).toString();
                if (sourceFile !== destinationFile) {
                    fs.writeFileSync(destinationPath, sourceFile);
                    console.log('Updated: ' + destinationPath);
                    if (destinationPath.substr(destinationPath.length - 2) === 'ts') {
                        console.log('Compiling: ' + destinationPath);
                        this.cli.executeSync('tsc ' + destinationPath + ' --module commonjs');
                    }
                }
            } else {
                fs.writeFileSync(destinationPath, sourceFile);
            }
        });
    }

    exportLibrariesForVsProject(bc: BuildConfiguration, visualProject: string) {
        // export all libraries. Note: only folder not subfolders
        const vsProject = _.find(bc.visualProjects, x => (x.name === visualProject));
        vsProject.developerSettings.libraryExports.forEach(library => {
            const source = vsProject.workingDirectory + '\\wwwroot\\library_ng\\' + library;
            if (fs.existsSync(source)) {
                const destination = _.find(bc.visualProjects, (x => x.name === 'ProjectBuild')).workingDirectory +
                    '\\wwwroot\\library_ng\\' + library;
                if (!fs.existsSync(destination)) {
                    throw new Error('Error: ' + destination + ' doesn\'t exist!');
                }
                this.copySourceToDestination(source, destination);
            } else {
                throw new Error('Error: ' + source + ' doesn\'t exist!');
            }
        });
    }

    isExportLibrariesUpdated(bc: BuildConfiguration, visualProject: string): boolean {
        const vsProject = _.find(bc.visualProjects, x => (x.name === visualProject)) as VisualProject;

        const cwd = process.cwd();
        const wwwlibrary_ng = '/wwwroot/library_ng';
        let projectBuildlibrary_ngPath = cwd + '/ProjectBuild' + wwwlibrary_ng;
        projectBuildlibrary_ngPath = projectBuildlibrary_ngPath.replace(/\\/g, '/');
        let vsProjectlibrary_ngPath = vsProject.workingDirectory + wwwlibrary_ng;
        vsProjectlibrary_ngPath = vsProjectlibrary_ngPath.replace(/\\/g, '/');

        const patternMatch = projectBuildlibrary_ngPath + '/**/*ts';
        const exportExcludes = new Array<string>();
        vsProject.developerSettings.libraryExports.forEach(libraryExport => {
            exportExcludes.push(projectBuildlibrary_ngPath + '/' + libraryExport + '/*ts');
        });

        let allFilesSame = true;
        glob.sync(patternMatch, { ignore: exportExcludes }).forEach((file: string) => {
            const projectBuildFile = fs.readFileSync(file).toString();
            const indexOf = file.indexOf(wwwlibrary_ng) + wwwlibrary_ng.length;
            file = vsProjectlibrary_ngPath + file.substr(indexOf);
            const applicationFile = fs.readFileSync(file).toString();

            if (applicationFile !== projectBuildFile) {
                allFilesSame = false;
            }
        });
        if (allFilesSame) {
            console.log('allFilesSame');
        } else {
            console.log('allFilesNotSame');
        }
        return allFilesSame;
    }
}
