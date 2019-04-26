import { ColoredLogger } from "./coloredLogger";
import { AppSettings } from "../wwwroot/shared/client-side-models/buildModels";
import { ApiVersions } from "../wwwroot/shared/client-side-models/apiVersions";
import { CommandLine } from "./commandLine";
import * as fs from "fs";

class BuildTime {
    exitAfterExecution = false;
    isDebuggingGulp = false;
}

class ProjectSettings {
    buildTime: BuildTime;
}

export class CommonTasks {
    private cl = new ColoredLogger();
    private buildTime = new BuildTime();
    private cli = new CommandLine();

    constructor() {
    }

    getIsDebuggingGulp(): boolean {
        const settings = this.getProjectSettings();
        return settings.buildTime.isDebuggingGulp;
    }

    setIsDebuggingGulp(isDebuggingGulp: boolean) {
        const settings = this.getProjectSettings();
        settings.buildTime.isDebuggingGulp = isDebuggingGulp;
        this.setProjectSettings(settings);
    }

    getProjectSettings(): ProjectSettings {
        let cwd = process.cwd();
        let projectSettings = fs.readFileSync(cwd + "\\projectSettings.json").toString();
        if (projectSettings.charCodeAt(0) === 0xFEFF)
            projectSettings = projectSettings.substring(1, projectSettings.length);
        return JSON.parse(projectSettings);
    }

    setProjectSettings(projectSettings: ProjectSettings) {
        let cwd = process.cwd();
        const projectSettingsString = JSON.stringify(projectSettings, null, 2);
        fs.writeFileSync(cwd + "\\projectSettings.json", projectSettingsString);
    }

    getAppSettings(): AppSettings {
        let appsettings = fs.readFileSync(process.cwd() + "\\appsettings.json").toString();
        if (appsettings.charCodeAt(0) === 0xFEFF)
            appsettings = appsettings.substring(1, appsettings.length);
        const json = JSON.parse(appsettings);
        return json.AppSettings;
    }

    setAppSettings(appSettings: AppSettings) {
        let appsettings = fs.readFileSync(process.cwd() + "\\appsettings.json").toString();
        if (appsettings.charCodeAt(0) === 0xFEFF)
            appsettings = appsettings.substring(1, appsettings.length);
        const json = JSON.parse(appsettings);
        json.AppSettings = appSettings;
        fs.writeFileSync(process.cwd() + "\\appsettings.json", JSON.stringify(json, null, 2));
    }

    getInstalledDependencies(apiVersions: ApiVersions) {
        let path = process.cwd() + "\\wwwroot\\package.json";
        let jsonString = fs.readFileSync(process.cwd() + "\\wwwroot\\package.json").toString();
        if (jsonString.charCodeAt(0) === 0xFEFF)
            jsonString = jsonString.substring(1, jsonString.length);
        const dependencies = JSON.parse(jsonString).dependencies;
        apiVersions.rxJs = this.getDependency(dependencies, "rxjs");
        apiVersions.bootstrap = this.getDependency(dependencies, "bootstrap");
        apiVersions.lodash = this.getDependency(dependencies, "lodash");
        apiVersions.moment = this.getDependency(dependencies, "moment");
        apiVersions.ngxtoastr = this.getDependency(dependencies, "ngx-toastr");
        apiVersions.fileSaver = this.getDependency(dependencies, "file-saver");
        apiVersions.coreJs = this.getDependency(dependencies, "core-js");
        apiVersions.zoneJs = this.getDependency(dependencies, "zone.js");
        apiVersions.googleMaps = this.getDependency(dependencies, "@types/google-maps");
    }

    getInstalledDevDependencies(apiVersions: ApiVersions) {
        let path = process.cwd() + "\\wwwroot\\package.json";
        let jsonString = fs.readFileSync(process.cwd() + "\\wwwroot\\package.json").toString();
        if (jsonString.charCodeAt(0) === 0xFEFF)
            jsonString = jsonString.substring(1, jsonString.length);
        const devDependencies = JSON.parse(jsonString).devDependencies;
        apiVersions.typeScript = this.getDependency(devDependencies, "typescript");
    }

    getApiVersions(): ApiVersions {
        let apiVersions = new ApiVersions();
        this.getInstalledDependencies(apiVersions);
        this.getInstalledDevDependencies(apiVersions);
        return apiVersions;
    }

    private getDependency(obj: Object, key: string): string {
        let version = obj[key];
        if (!version)
            return "";
        version = version.replace("^", "");
        version = version.replace("~", "");
        return version;
    }

    setApiVersions(apiVersions: ApiVersions) {
        let objString = this.objToString(apiVersions);
        const apiVersionsPath = process.cwd() + "\\wwwroot\\shared\\client-side-models\\apiVersions.ts";
        fs.writeFileSync(apiVersionsPath, objString);
    }

    objToString(obj: any): string {
        let objName = obj.constructor.name;
        let preString = "export class " + objName + " {\n";
        let properties = "";
        for (let p in obj) {
            if (obj.hasOwnProperty(p)) {
                let value = "";
                if (obj[p])
                    value = obj[p];
                properties += "    " + p + " = \"" + value + "\";\n";
            }
        }
        let postString = "    }\n";
        return preString + properties + postString;
    }

    printTime() {
        const d = new Date();
        const t = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ":" + d.getMilliseconds();
        this.cl.printSuccess(`TIME: ${t}`);
    }

    printVersion() {
        const rt = this.getAppSettings();
        const vn = rt.projectVersionNo;
        this.cl.printSuccess(`VERSION: ${vn}`);
    }

    getVersion(): string {
        const rt = this.getAppSettings();
        return rt.projectVersionNo;
    }

    removeDirectory(directory: string) {
        if (!fs.existsSync(directory))
            return;
        fs.readdirSync(directory).forEach((i) => {
            const path = directory + "\\" + i;
            if (fs.statSync(path).isDirectory()) {
                this.removeDirectory(path);
            } else {
                fs.unlinkSync(path);
            }
        });
        fs.rmdirSync(directory);
    }
}
