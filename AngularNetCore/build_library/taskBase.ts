import * as fs from 'fs';
import * as os from 'os';
import * as _ from 'lodash';
const path = require('path');
import {
    DeveloperSettings, LaunchSettings,
    VisualProject, BuildConfiguration, AppSettings
} from '../wwwroot/library_ng/client-side-models/buildModels';

export class TaskBase {
    waitOnCompleted = false;
    visualProject = '';
    angularProject = '';

    getDevelopersSettings(visualProject: string): Array<DeveloperSettings> {
        const developersettingsPath = process.cwd() + '\\' + visualProject + '\\developersSettings.json';
        const developersSettings = JSON.parse(fs.readFileSync(developersettingsPath).toString()) as Array<DeveloperSettings>;
        return developersSettings;
    }

    saveDevelopersSettings(visualProject: string, developersSettings: Array<DeveloperSettings>) {
        const developersettingsPath = process.cwd() + '\\' + visualProject + '\\developersSettings.json';
        fs.writeFileSync(developersettingsPath, JSON.stringify(developersSettings, null, 2));
    }

    getAngularJson(visualProject: string): any {
        const angularJsonPath = process.cwd() + '\\' + visualProject + '\\wwwroot\\angular.json';
        const angularJson = JSON.parse(fs.readFileSync(angularJsonPath).toString());
        return angularJson;
    }

    saveAngularJson(visualProject: string, angularJson: any) {
        const angularJsonPath = process.cwd() + '\\' + visualProject + '\\wwwroot\\angular.json';
        fs.writeFileSync(angularJsonPath, JSON.stringify(angularJson, null, 2));
    }

    getPackageJson(visualProject: string): any {
        const packageJsonPath = process.cwd() + '\\' + visualProject + '\\wwwroot\\package.json';
        const packageJsonString = fs.readFileSync(packageJsonPath).toString();
        const packageJson = JSON.parse(packageJsonString);
        return packageJson;
    }

    savePackageJson(visualProject: string, packageJson: any) {
        // let packageJson2 = JSON.stringify(packageJson, null, 2);
        const packageJsonPath = process.cwd() + '\\' + visualProject + '\\wwwroot\\package.json';
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    }

    getBuildConfiguration(): BuildConfiguration {
        process.chdir('..\\' + this.visualProject);
        const pbp = process.cwd();
        let library_ngPath = process.cwd();
        library_ngPath += '\\wwwroot\\library_ng';
        const library_ng = fs.readdirSync(library_ngPath);

        process.chdir('..\\');
        const cwd = process.cwd();
        const bc: BuildConfiguration = { machineName: os.hostname(), visualProjects: new Array<VisualProject>(), library_ng };
        const dirs = fs.readdirSync(cwd)
            .map(file => path.join(cwd, file))
            .filter(x => fs.statSync(x).isDirectory());
        dirs.forEach((dir) => {
            const appsettingsPath = dir + '\\appsettings.json';
            if (fs.existsSync(appsettingsPath)) {

                let appsettings = fs.readFileSync(appsettingsPath).toString();
                if (appsettings.charCodeAt(0) === 0xFEFF) {
                    appsettings = appsettings.substring(1, appsettings.length);
                }

                const ax = JSON.parse(appsettings);
                const as: AppSettings = ax.appSettings;
                if (as) {
                    const buildVersion = as.buildVersion;
                    if (buildVersion) {
                        const developersettingsPath = dir + '\\developersSettings.json';
                        const developersSettings = JSON.parse(fs.readFileSync(developersettingsPath)
                            .toString()) as Array<DeveloperSettings>;
                        let developerSettings = _.find(developersSettings, x => (x.machineName === os.hostname()));
                        const launchSettingsPath = dir + '\\properties\\launchsettings.json';
                        let launchSettings = new LaunchSettings();
                        const project = dir.substr(dir.lastIndexOf('\\') + 1);
                        if (fs.existsSync(launchSettingsPath)) {
                            let launchSettingsString = fs.readFileSync(launchSettingsPath).toString();
                            if (launchSettingsString.charCodeAt(0) === 0xFEFF) {
                                launchSettingsString = launchSettingsString.substring(1, launchSettingsString.length);
                            }
                            launchSettings = JSON.parse(launchSettingsString) as LaunchSettings;
                        }
                        if (!developerSettings) {
                            developerSettings = _.find(developersSettings, x => (x.machineName === 'ANONYMOUS DEVELOPERS MACHINE NAME'));
                        }
                        if (launchSettings.profiles[project]) {
                            let applicationUrl = launchSettings.profiles[project].applicationUrl;
                            if (applicationUrl.indexOf(';') !== -1) {
                                applicationUrl = applicationUrl.substr(0, applicationUrl.indexOf(';'));
                            }
                            bc.visualProjects.push({ name: path.basename(dir),
                                developerSettings, showPanel: false, showVersion: true,
                                applicationUrl, workingDirectory: dir
                            });
                        }
                    }
                }
            }
        });
        process.chdir(pbp);
        return bc;
    }

    findValueOf(arg: string): string {
        try {
            return process.argv.filter(x => x.indexOf(arg) !== -1)[0].split('=')[1];
        } catch (e) {
            // expected
        }
    }

    getCommandArg(arg: string, defaultString: string): string {
        try {
            return process.argv.filter(x => x.indexOf(arg) !== -1)[0].split('=')[1];
        } catch (e) {
            return defaultString;
        }
    }
}
