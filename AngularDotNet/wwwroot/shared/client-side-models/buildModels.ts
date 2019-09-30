export class Dependency {
  key: string;
  value: string;
}

export class TextMessage {
  message: string;
  cellCarrierName: string;
  mobileNumber: number;
  emailAddress?: string;
}

export class CellCarrier {
  name: string;
  smsProfile: string;
}

export class ApiVersions {
  typeScript = '';
  nodeJs = '';
  v8Engine = '';
  angular = '';
  rxJs = '';
  lodash = '';
  moment = '';
  fileSaver = '';
  coreJs = '';
  zoneJs = '';
  googleMaps = '';
  ngxtoastr = '';
}

export class AppSettings {
  debug = false;
  testing = false;
  connectionString = '';
  projectVersionNo = '';
  splashTime = 0;
  googleMapKey = '';
  smtpReply = '';
  smtpHost = '';
  smtpPort = 0;
  smtpUn = '';
  smtpPw = '';
  cellCarriers = '';
  aspNetCoreVersion = '';
  apiVersions = new ApiVersions();
}

export class AngularProject {
  visualProject = '';
  name = '';
  buildEnabled = false;
  pwaSupport = false;
  production = false;
  distFolder = '';
  angularModule = '';
  angularRoot = '';
  angularProjectDir = '';
  showPanel = false;
}

export class LaunchSettings {
  iisSettings: {
    iisExpress: {
      applicationUrl: ''
    }
  };
  profiles: {

  };
}

export class DeveloperSettings {
  machineName = '';
  buildHook = false;
  importHook = false;
  executeDist = false;
  serveApp = '';
  releaseApp = '';
  libraryExports = Array<string>();
  angularProjects = Array<AngularProject>();
}

export class VisualProject {
  name = '';
  projectVersionNo = '';
  applicationUrl = '';
  workingDirectory = '';
  developerSettings = new DeveloperSettings();
  showPanel = false;
  showVersion = true;
}

export class BuildConfiguration {
  machineName = '';
  visualProjects = Array<VisualProject>();
  shared = Array<string>();
}

export class BuildResponse {
  consoleWindow = '';
  versionNo = '';
}
