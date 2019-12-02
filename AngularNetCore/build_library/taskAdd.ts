import { CommandLine } from '../build_library/commandLine';
import { CommonTasks } from '../build_library/commonTasks';
import { TaskBase } from './taskbase';
import { AngularProject } from '../wwwroot/library_ng/client-side-models/buildModels';
import * as fs from 'fs';
const ncp = require('ncp');
const glob = require('glob');

export class TaskAdd extends TaskBase {
    cli = new CommandLine();
    ct = new CommonTasks();
    synchronous = false;
    constructor($waitOnCompleted?: boolean, $visualProject?: string, $angularProject?: string, $synchronous?: boolean) {
        super();

        if ($waitOnCompleted !== null && $waitOnCompleted !== undefined) {
            this.waitOnCompleted = $waitOnCompleted;
        } else {
            const waitOnCompleted = this.getCommandArg('waitOnCompleted', 'true');
            if (waitOnCompleted === 'true') {
                this.waitOnCompleted = true;
            } else {
                this.waitOnCompleted = false;
            }
        }

        if ($synchronous !== null && $synchronous !== undefined) {
            this.synchronous = $synchronous;
        } else {
            const synchronous = this.getCommandArg('synchronous', 'true');
            if (synchronous === 'true') {
                this.synchronous = true;
            } else {
                this.synchronous = false;
            }
        }

        if ($visualProject !== null && $visualProject !== undefined) {
            this.visualProject = $visualProject;
        } else {
            const visualProject = this.getCommandArg('visualProject', 'unknown');
            if (visualProject === 'unknown') {
                throw new Error('visualProject parameter is missing!');
            } else {
                this.visualProject = visualProject;

            }
        }

        if ($angularProject !== null && $angularProject !== undefined) {
            this.angularProject = $angularProject;
        } else {
            const angularProject = this.getCommandArg('angularProject', 'unknown');
            if (angularProject === 'unknown') {
                throw new Error('angularProject parameter is missing!');
            } else {
                this.angularProject = angularProject;

            }
        }

        process.chdir('..//');
        const cwd = process.cwd();

        this.addAngularProject(() => {
            process.chdir(cwd);
            // update the package.json
            const pj = this.getPackageJson(this.visualProject);
            if (!pj.scripts['serveApp:' + this.angularProject]) {
                pj.scripts['serveApp:' + this.angularProject] = 'ng serve ' + this.angularProject;
            }
            this.savePackageJson(this.visualProject, pj);

            // update the angular.json
            const aj = this.getAngularJson(this.visualProject);
            aj.projects[this.angularProject].architect.build.options.styles[0] = 'src/styles.scss';
            this.saveAngularJson(this.visualProject, aj);

            // update the DeveloperSettings
            const ds = this.getDevelopersSettings(this.visualProject);
            const newAngularProject = new AngularProject();
            newAngularProject.angularModule = '\\wwwroot\\projects\\' + this.angularProject + '\\src\\app';
            newAngularProject.angularProjectDir = 'projects\\' + this.angularProject;
            newAngularProject.angularRoot = this.angularProject;
            newAngularProject.buildEnabled = false;
            newAngularProject.distFolder = this.angularProject;
            newAngularProject.name = this.angularProject;
            newAngularProject.production = false;
            newAngularProject.showPanel = false;
            newAngularProject.visualProject = null;

            ds.forEach((d) => {
                d.angularProjects.push(newAngularProject);
            });
            this.saveDevelopersSettings(this.visualProject, ds);
            this.manageProjectFiles();
        });
    }

    private addAngularProject(callback: () => void) {
        process.chdir(this.visualProject + '\\wwwroot');
        console.log('\nBeginning add to: ' + this.visualProject + ' Angular project: ');
        this.cli.executeAdd(this.angularProject, this.synchronous, () => {
            callback();
        });
    }

    private manageProjectFiles() {
        const cwd = process.cwd();
        const templateProject = cwd + '\\' + this.visualProject + '\\wwwroot\\projects\\template';
        const originalProject = cwd + '\\' + this.visualProject + '\\wwwroot\\projects\\' + this.angularProject;
        if (fs.existsSync(originalProject)) {
            this.ct.removeDirectory(originalProject);
        }

        ncp(templateProject, originalProject, (err) => {
            if (err) {
                return console.error(err);
            }
            const sourceRoot = originalProject + '\\src\\app';

            this.replaceTemplateName(sourceRoot + '\\app.component.ts');
            glob.sync(sourceRoot + '\\template.component.*').forEach((filePath: string) => {
                const newFilePath = filePath.replace('template.component', this.angularProject + '.component');
                fs.renameSync(filePath, newFilePath);
                this.replaceTemplateName(newFilePath);
            });
            glob.sync(sourceRoot + '\\app.module.*').forEach((filePath: string) => {
                this.replaceTemplateName(filePath);
            });
            glob.sync(sourceRoot + '\\app.routing.module.*').forEach((filePath: string) => {
                this.replaceTemplateName(filePath);
            });
            this.replaceTemplateSimple(sourceRoot + '\\app.component.ts', '/template', '/' + this.angularProject);
            this.replaceTemplateSimple(sourceRoot + '\\app.routing.module.ts', 'template', this.angularProject);

            console.log('Completed adding: ' + this.angularProject + ' to Visual Studio project: ' + this.visualProject);
            while (this.waitOnCompleted) { }
        });
    }

    private replaceTemplateSimple(newFilePath: string, from: string, to: string) {
        let fileString = fs.readFileSync(newFilePath).toString();
        fileString = this.replaceStrings(fileString, from, to);
        fs.writeFileSync(newFilePath, fileString);
    }

    private replaceTemplateName(newFilePath: string) {
        let fileString = fs.readFileSync(newFilePath).toString();
        fileString = this.replaceStrings(fileString, 'template.', this.angularProject + '.');
        let featureTitle = this.angularProject;
        featureTitle = featureTitle.charAt(0).toUpperCase() + featureTitle.slice(1);
        fileString = this.replaceStrings(fileString, 'Template', featureTitle);
        fs.writeFileSync(newFilePath, fileString);
    }

    private replaceStrings(fileString: string, from: string, to: string) {
        while (fileString.indexOf(from) !== -1) {
            fileString = fileString.replace(from, to);
        }
        return fileString;
    }
}
