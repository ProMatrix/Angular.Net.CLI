import { CommonTasks } from "./commonTasks";
import { ColoredLogger } from "./coloredLogger";
import { AppSettings } from "../wwwroot/shared/client-side-models/buildModels";
import { ApiVersions } from "../wwwroot/shared/client-side-models/apiVersions";
import * as fs from "fs";

export class Versioning {
    private readonly ct = new CommonTasks();
    private readonly cl = new ColoredLogger();

    constructor() {
        try {
            let ct = new CommonTasks();
        } catch (e) {
            console.log(e);
            while (true) {

            }
        }
    }

    incrementApplicationVersion() {

        const packageJson = this.ct.getPackageJson();
        const versionParts = packageJson.version.split('.');
        let versionPatch = parseInt(versionParts[2]);
        versionPatch++;
        versionParts[2] = versionPatch.toString();
        packageJson.version = versionParts.join(".");
        this.ct.setPackageJson(packageJson);

        const appSettings: AppSettings = this.ct.getAppSettings();
        appSettings.projectVersionNo = packageJson.version;
        this.ct.setAppSettings(appSettings);
    }

    updateVersions(): string {
        this.incrementApplicationVersion();

        const apiVersions: ApiVersions = this.ct.getApiVersions();
        apiVersions.nodeJs = process.versions.node;
        apiVersions.v8Engine = process.versions.v8;
        apiVersions.application = this.ct.getVersion();
        this.ct.setApiVersions(apiVersions);
        return apiVersions.application;
    }
}