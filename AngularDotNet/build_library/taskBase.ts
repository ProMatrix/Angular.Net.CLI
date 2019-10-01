import * as fs from "fs";
import * as os from "os";
import * as _ from "lodash";

const path = require("path");
import {
    DeveloperSettings, LaunchSettings,
    VisualProject, BuildConfiguration, AppSettings
} from "../wwwroot/shared/client-side-models/buildModels";

export class TaskBase {
    waitOnCompleted = false;
    visualProject = "";

    getDevelopersSettings(visualProject: string): Array<DeveloperSettings> {
        const developersettingsPath = process.cwd() + "\\" + visualProject + "\\developersSettings.json";
        const developersSettings = JSON.parse(fs.readFileSync(developersettingsPath).toString()) as Array<DeveloperSettings>;
        return developersSettings;
    }

    saveDevelopersSettings(visualProject: string, developersSettings: Array<DeveloperSettings>) {
        const developersettingsPath = process.cwd() + "\\" + visualProject + "\\developersSettings.json";
        fs.writeFileSync(developersettingsPath, JSON.stringify(developersSettings, null, 2));
    }

    getAngularJson(visualProject: string): any {
        const angularJsonPath = process.cwd() + "\\" + visualProject + "\\wwwroot\\angular.json";
        const angularJson = JSON.parse(fs.readFileSync(angularJsonPath).toString());
        return angularJson;
    }

    saveAngularJson(visualProject: string, angularJson: any) {
        const angularJsonPath = process.cwd() + "\\" + visualProject + "\\wwwroot\\angular.json";
        fs.writeFileSync(angularJsonPath, JSON.stringify(angularJson, null, 2));
    }

    getPackageJson(visualProject: string): any {
        const packageJsonPath = process.cwd() + "\\" + visualProject + "\\wwwroot\\package.json";
        const packageJsonString = fs.readFileSync(packageJsonPath).toString();
        const packageJson = JSON.parse(packageJsonString);
        return packageJson;
    }

    savePackageJson(visualProject: string, packageJson: any) {
        // let packageJson2 = JSON.stringify(packageJson, null, 2);
        const packageJsonPath = process.cwd() + "\\" + visualProject + "\\wwwroot\\package.json";
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    }

    getBuildConfiguration(): BuildConfiguration {
        process.chdir("..\\" + this.visualProject);
        const pbp = process.cwd();
        let sharedPath = process.cwd();
        sharedPath += "\\wwwroot\\shared";
        const shared = fs.readdirSync(sharedPath);

        process.chdir("..\\");
        const cwd = process.cwd();
        let bc: BuildConfiguration = { machineName: os.hostname(), visualProjects: new Array<VisualProject>(), shared: shared };
        const dirs = fs.readdirSync(cwd)
            .map(file => path.join(cwd, file))
            .filter(path => fs.statSync(path).isDirectory());
        dirs.forEach((dir) => {
            const appsettings = dir + "\\appsettings.json";
            if (fs.existsSync(appsettings)) {
                const ax = JSON.parse(fs.readFileSync(appsettings).toString());
                const as: AppSettings = ax['AppSettings'];
                if (as) {
                    const buildVersion = as.buildVersion;
                    if (buildVersion) {
                        const developersettingsPath = dir + "\\developersSettings.json";
                        const developersSettings = JSON.parse(fs.readFileSync(developersettingsPath)
                            .toString()) as Array<DeveloperSettings>;
                        let developerSettings = _.find(developersSettings, x => (x.machineName === os.hostname()));
                        const launchsettingsPath = dir + "\\properties\\launchsettings.json";
                        let launchSettings = new LaunchSettings();
                        let project = dir.substr(dir.lastIndexOf("\\") + 1);
                        if (fs.existsSync(launchsettingsPath)) {
                            launchSettings = JSON.parse(fs.readFileSync(launchsettingsPath).toString()) as LaunchSettings;
                        }
                        if (!developerSettings) {
                            developerSettings = _.find(developersSettings, x => (x.machineName === "ANONYMOUS DEVELOPERS MACHINE NAME"));
                        }
                        if (launchSettings.profiles[project]) {
                            let applicationUrl = launchSettings.profiles[project].applicationUrl;
                            if (applicationUrl.indexOf(";") !== -1) {
                                applicationUrl = applicationUrl.substr(0, applicationUrl.indexOf(";"));
                            }
                            bc.visualProjects.push({ name: path.basename(dir),
                                developerSettings: developerSettings, showPanel: false, showVersion: true,
                                applicationUrl: applicationUrl, workingDirectory: dir
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
            return process.argv.filter(x => x.indexOf(arg) !== -1)[0].split("=")[1];
        } catch (e) {
            // expected
        }
    }

    getCommandArg(arg: string, defaultString: string): string {
        try {
            return process.argv.filter(x => x.indexOf(arg) !== -1)[0].split("=")[1];
        } catch (e) {
            return defaultString;
        }
    }
}
