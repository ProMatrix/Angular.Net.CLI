using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using Angular.Net.CLI.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Linq;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Hosting;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace AngularDotNet.Controllers
{
    [Route("api/[controller]")]
    public class BuildController : BaseController
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private static List<string> _buildProcessStrings;
        public BuildController(IHostingEnvironment hostingEnvironment, IOptions<AppSettings> appSettings, ILogger<BuildController> logger) : base(appSettings, logger)
        {
            _hostingEnvironment = hostingEnvironment;
            _applicationLog = "Application Log: " + hostingEnvironment.ApplicationName;
        }

        private BuildConfiguration ExecConfig()
        {
            var arguments = "build_library\\taskConfigCli.js visualProject=" + _hostingEnvironment.ApplicationName + " waitOnCompleted =false";
            var responseJson = this.ExecCmd("node.exe", arguments, "");
            var responseObject = JsonConvert.DeserializeObject<BuildConfiguration>(responseJson);
            return responseObject;
        }

        [HttpPost]
        [Route("ThrowException")]
        public IActionResult ThrowException([FromBody] EventProperties evt)
        {
            try
            {
                throw new Exception(evt.exception);
            }
            catch (Exception e)
            {
                ExceptionHandler(this.GetType().Name, GetCallerMemberName(), e);
                return null;
            }
        }

        [HttpPost]
        [Route("PostLogEntry")]
        public IActionResult PostLogEntry([FromBody] EventProperties evt)
        {
            try
            {
                LogEventEntry(evt);
                return Ok();
            }
            catch (Exception e)
            {
                ExceptionHandler(this.GetType().Name, GetCallerMemberName(), e);
                return null;
            }
        }

        [HttpGet]
        [Route("GetLogEntries")]
        public IActionResult GetLogEntries()
        {
            try
            {
                const string eventLogName = "Application";
                List<EventLogEntry> eventLogEntries = new List<EventLogEntry>();
                if (EventLog.Exists(eventLogName))
                {
                    var appLog = EventLog.GetEventLogs().ToList().First(x => x.Log == eventLogName);
                    eventLogEntries = appLog.Entries.Cast<EventLogEntry>().
                        Where(x => x.ReplacementStrings.Length > 0 && x.ReplacementStrings[0] == _applicationLog).Take(100).Reverse().ToList();
                }
                return Ok(eventLogEntries);
            }
            catch (Exception e)
            {
                ExceptionHandler(this.GetType().Name, GetCallerMemberName(), e);
                return null;
            }
        }

        [HttpGet]
        [Route("GetConfig")]
        public IActionResult GetConfig()
        {
            try
            {
                return Ok(ExecConfig());
            }
            catch (Exception e)
            {
                ExceptionHandler(this.GetType().Name, GetCallerMemberName(), e);
                return null;
            }
        }

        [HttpPost]
        [Route("BuildAngularProject")]
        public IActionResult BuildAngularProject([FromBody] AngularProject angularProject)
        {
            try
            {
                var buildResponse = new BuildResponse() { consoleText = "", versionNo = "" };
                buildResponse.payloadType = "processing";
                if (_buildProcessStrings == null)
                {
                    InitBuildProcess();

                    buildResponse.consoleText = "";
                    return Ok(buildResponse);
                }

                if (_buildProcessStrings.Count == 0)
                {
                    buildResponse.consoleText = ".";
                    return Ok(buildResponse);
                }
                var consoleText = "";
                const string versionKey = "Version: ";
                const string errorKey = "Error building: ";
                do
                {
                    consoleText += _buildProcessStrings[0];
                    _buildProcessStrings.RemoveAt(0);
                    var versionIndex = consoleText.LastIndexOf(versionKey);
                    var errorIndex = consoleText.LastIndexOf(errorKey);

                    if (versionIndex == -1 && errorIndex == -1)
                    {
                        consoleText += "\n";
                    }

                    if (versionIndex != -1)
                    {
                        buildResponse.versionNo = consoleText.Substring(versionIndex + versionKey.Length);
                        buildResponse.payloadType = "completed";
                        _buildProcessStrings = null;
                    }

                    if (errorIndex != -1)
                    {
                        buildResponse.payloadType = "errored";
                        _buildProcessStrings = null;
                    }

                } while (_buildProcessStrings != null && _buildProcessStrings.Count > 0);
                buildResponse.consoleText = consoleText;
                return Ok(buildResponse);
            }
            catch (Exception e)
            {
                ExceptionHandler(this.GetType().Name, GetCallerMemberName(), e);
                return null;
            }
        }

        private void InitBuildProcess()
        {
            _buildProcessStrings = new List<string>();
            var arguments = "build_library\\taskBuildCli.js ";
            arguments += "visualProject=" + _hostingEnvironment.ApplicationName;
            arguments += " waitOnCompleted=false synchronous=false";
            Task.Run(() => { ExecCmdAsync("node.exe", arguments, ""); });
        }

        [HttpPost]
        [Route("SaveVisualProject")]
        public IActionResult SaveVisualProject([FromBody] VisualProject visualProject)
        {
            try
            {
                var pathToDeveloperSettings = Directory.GetParent(Directory.GetCurrentDirectory()) + "\\" + visualProject.name + "\\developersSettings.json";
                var pathToReleaseTemplate = Directory.GetParent(Directory.GetCurrentDirectory()) + "\\" + visualProject.name + "\\wwwroot\\dist\\release.template.html";
                var pathToReleaseHtml = Directory.GetParent(Directory.GetCurrentDirectory()) + "\\" + visualProject.name + "\\wwwroot\\dist\\release.html";

                // Modify the DeveloperSettings
                string developerSettingsString = System.IO.File.ReadAllText(pathToDeveloperSettings);
                var developerSettings = JsonConvert.DeserializeObject<List<DeveloperSettings>>(developerSettingsString);
                var indexOf = developerSettings.FindIndex(x => x.machineName == Environment.MachineName);
                if (indexOf == -1)
                    indexOf = developerSettings.FindIndex(x => x.machineName == "ANONYMOUS DEVELOPERS MACHINE NAME");
                if (indexOf == -1)
                    throw new Exception("Can't find user in developersSettings.json");
                developerSettings[indexOf] = visualProject.developerSettings;
                var serialized = JsonConvert.SerializeObject(developerSettings, Formatting.Indented);
                System.IO.File.WriteAllText(pathToDeveloperSettings, serialized);
                // Modify the Release HTML
                string releaseHtmlString = System.IO.File.ReadAllText(pathToReleaseTemplate);
                releaseHtmlString = releaseHtmlString.Replace("dist-template", "dist/" + developerSettings[indexOf].serveApp);
                System.IO.File.WriteAllText(pathToReleaseHtml, releaseHtmlString);
                return Ok();
            }
            catch (Exception e)
            {
                ExceptionHandler(this.GetType().Name, GetCallerMemberName(), e);
                return null;
            }
        }

        //[HttpPost]
        //[Route("UpdateImports")]
        //public IActionResult UpdateImports([FromBody] VisualProject visualProject)
        //{
        //    try
        //    {
        //        var arguments = "import.js ";
        //        arguments += "visualProject=" + visualProject.name;
        //        var log = ExecCmd("node.exe", arguments, "");
        //        return Ok();
        //    }
        //    catch (Exception e)
        //    {
        //        ExceptionHandler(this.GetType().Name, GetCallerMemberName(), e);
        //        return null;
        //    }
        //}

        //[HttpPost]
        //[Route("UpdateExports")]
        //public IActionResult UpdateExports([FromBody] VisualProject visualProject)
        //{
        //    try
        //    {
        //        var arguments = "export.js ";
        //        arguments += "visualProject=" + visualProject.name;
        //        var log = ExecCmd("node.exe", arguments, "");
        //        return Ok();
        //    }
        //    catch (Exception e)
        //    {
        //        ExceptionHandler(this.GetType().Name, GetCallerMemberName(), e);
        //        return null;
        //    }
        //}

        //[HttpGet]
        //[Route("GetIsExportLibrariesSame/{visualProject}")]
        //public IActionResult GetIsExportLibrariesSame(string visualProject)
        //{
        //    try
        //    {
        //        var arguments = "isUpdated.js isImports=false visualProject=" + visualProject;
        //        var bc = new BuildConfiguration();
        //        var response = this.ExecCmd("node.exe", arguments, "");
        //        if (response == "allFilesSame\n")
        //            return Ok(true);
        //        else
        //            return Ok(false);
        //    }
        //    catch (Exception e)
        //    {
        //        ExceptionHandler(this.GetType().Name, GetCallerMemberName(), e);
        //        return null;
        //    }
        //}

        [HttpPost]
        [Route("AddAngularProject")]
        public IActionResult AddAngularProject([FromBody] VisualProject visualProject)
        {
            try
            {
                var arguments = "build_library\\taskAddCli.js ";
                arguments += "visualProject=" + _hostingEnvironment.ApplicationName;
                arguments += " angularProject=" + visualProject.developerSettings.angularProjects.Last().name;
                arguments += " waitOnCompleted=false  synchronous=false";
                ExecCmd("node.exe", arguments, "");

                var bc = ExecConfig() as BuildConfiguration;
                visualProject = bc.visualProjects.Single(x => x.name == visualProject.name);
                visualProject.showPanel = true;
                return Ok(visualProject);
            }
            catch (Exception e)
            {
                ExceptionHandler(this.GetType().Name, GetCallerMemberName(), e);
                return null;
            }
        }

        [HttpPost]
        [Route("RemoveAngularProject")]
        public IActionResult RemoveAngularProject([FromBody] VisualProject visualProject)
        {
            try
            {
                var arguments = "build_library\\taskRemoveCli.js ";
                arguments += "visualProject=" + _hostingEnvironment.ApplicationName;
                arguments += " angularProject=" + visualProject.developerSettings.angularProjects.Last().name;
                arguments += " waitOnCompleted=false";
                
                ExecCmd("node.exe", arguments, "");
                return Ok();
            }
            catch (Exception e)
            {
                ExceptionHandler(this.GetType().Name, GetCallerMemberName(), e);
                return null;
            }
        }

        [HttpPost]
        [Route("LaunchApp")]
        public IActionResult LaunchApp([FromBody] VisualProject visualProject)
        {
            try
            {
                var arguments = "launch.js ";
                arguments += "visualProject=" + visualProject.name;
                ExecCmd("node.exe", arguments, "");
                return Ok();
            }
            catch (Exception e)
            {
                ExceptionHandler(this.GetType().Name, GetCallerMemberName(), e);
                return null;
            }
        }

        private string ExecCmd(string command, string arguments, string workingDirectory)
        {
            var psi = new ProcessStartInfo(command, arguments)
            {
                UseShellExecute = false,
                CreateNoWindow = true,
                RedirectStandardOutput = true,
                WorkingDirectory = workingDirectory
            };

            var buildOutput = "";
            using (var proc = Process.Start(psi))
            {
                using (StreamReader sr = proc.StandardOutput)
                {
                    do
                    {
                        buildOutput += sr.ReadLine() + "\n";
                    } while (!sr.EndOfStream);
                }
            }
            return buildOutput;
        }

        private Task<string> ExecCmdAsync(string command, string arguments, string workingDirectory)
        {
            var psi = new ProcessStartInfo(command, arguments)
            {
                UseShellExecute = false,
                CreateNoWindow = true,
                RedirectStandardOutput = true,
                WorkingDirectory = workingDirectory
            };

            var buildOutput = "";
            using (var proc = Process.Start(psi))
            using (StreamReader sr = proc.StandardOutput)
            {
                do
                {
                    var consoleText = sr.ReadLine();
                    buildOutput += consoleText;
                    if (_buildProcessStrings != null)
                    {
                        _buildProcessStrings.Add(consoleText);
                    }
                } while (!sr.EndOfStream);
            }
            return Task.FromResult<string>(buildOutput);
        }

    }
}
