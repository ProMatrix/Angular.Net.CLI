using System.Collections.Generic;

namespace Angular.Net.CLI.Models
{
    public class ApiVersions
    {
        public string typeScript { get; set; }
        public string nodeJs { get; set; }
        public string v8Engine { get; set; }
        public string angular { get; set; }
        public string rxJs { get; set; }
        public string lodash { get; set; }
        public string moment { get; set; }
        public string fileSaver { get; set; }
        public string coreJs { get; set; }
        public string zoneJs { get; set; }
        public string googleMaps { get; set; }
        public string ngxtoastr { get; set; }
    }

    public class AppSettings
    {
        public string launchPath { get; set; }
        public bool debug { get; set; }
        public bool testing { get; set; }
        public bool onlineStatus { get; set; }
        public string connectionString { get; set; }
        public string buildVersion { get; set; }
        public int splashTime { get; set; }
        public string googleMapKey { get; set; }
        public string smtpReply { get; set; }
        public string smtpHost { get; set; }
        public int smtpPort { get; set; }
        public string smtpUn { get; set; }
        public string smtpPw { get; set; }
        public string cellCarriers { get; set; }
        public string aspNetCoreVersion { get; set; }
        public ApiVersions apiVersions { get; set; }
    }

    public class CellCarrier
    {
        public string name { get; set; }
        public string smsProfile { get; set; }
    }

    public class AngularProject
    {
        public string visualProject { get; set; }
        public string name { get; set; }
        public bool buildEnabled { get; set; }
        public bool pwaSupport { get; set; }
        public bool production { get; set; }
        public string distFolder { get; set; }
        public string angularModule { get; set; }
        public string angularRoot { get; set; }
        public string angularProjectDir { get; set; }
        public bool showPanel { get; set; }
    }

    public class BuildResponse
    {
        public string payloadType { get; set; }
        public string outputStream { get; set; }
        public string consoleWindow { get; set; }
        public string versionNo { get; set; }
    }

    public class DeveloperSettings
    {
        public string machineName { get; set; }
        public bool buildHook { get; set; }
        public bool importHook { get; set; }
        public bool executeDist { get; set; }
        public string serveApp { get; set; }
        public string releaseApp { get; set; }
        public List<string> libraryExports { get; set; }
        public List<AngularProject> angularProjects { get; set; }
    }

    public class VisualProject
    {
        public string name { get; set; }
        public string applicationUrl { get; set; }
        public string workingDirectory { get; set; }
        public DeveloperSettings developerSettings { get; set; }
        public bool showPanel { get; set; }
        public bool showVersion { get; set; }
    }

    public class BuildConfiguration
    {
        public string machineName { get; set; }
        public List<VisualProject> visualProjects { get; set; }
        public List<string> shared { get; set; }
    }


}
