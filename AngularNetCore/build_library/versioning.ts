import { CommonTasks } from './commonTasks';
import { ColoredLogger } from './coloredLogger';
import { AppSettings, ApiVersions } from '../wwwroot/shared/client-side-models/buildModels';
import * as fs from 'fs';

export class Versioning {
    private readonly ct = new CommonTasks();
    private readonly cl = new ColoredLogger();

    constructor() {
        try {
            const ct = new CommonTasks();
        } catch (e) {
            console.log(e);
            while (true) {

            }
        }
    }

    updatePackageVersion(): string {
        const packageJson = this.ct.getPackageJson();
        const versionParts = packageJson.version.split('.');
        let versionPatch = parseInt(versionParts[2], 10);
        versionPatch++;
        versionParts[2] = versionPatch.toString();
        packageJson.version = versionParts.join('.');
        this.ct.setPackageJson(packageJson);
        return packageJson.version;
    }

    updateVersions(): string {
        const version = this.updatePackageVersion();
        const apiVersions: ApiVersions = this.ct.getApiVersions();
        apiVersions.nodeJs = process.versions.node;
        apiVersions.v8Engine = process.versions.v8;

        const appSettings: AppSettings = this.ct.getAppSettings();
        appSettings.apiVersions = apiVersions;
        appSettings.buildVersion = version;
        this.ct.setAppSettings(appSettings);
        return version;
    }
}
