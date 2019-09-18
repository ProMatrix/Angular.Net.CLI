﻿using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using Angular.Net.CLI.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Linq;
using Microsoft.Extensions.Options;

namespace AngularDotNet.Controllers
{
    [Route("api/[controller]")]
    public class BuildController : BaseController
    {
        public BuildController(IOptions<AppSettings> appSettings) : base(appSettings)
        {
            // keep this as an example how to pass application settings from the startup.cs
        }

        private BuildConfiguration ExecConfig()
        {
            var arguments = "taskConfig.js";
            var responseJson = this.ExecCmd("node.exe", arguments, "");
            var responseObject = JsonConvert.DeserializeObject<BuildConfiguration>(responseJson);
            return responseObject;
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
                var arguments = "taskBuild.js ";
                arguments += "visualProject=" + angularProject.visualProject;
                arguments += " waitOnCompleted=false synchronous=false";
                var log = ExecCmd("node.exe", arguments, "");
                var versionKey = "Version: ";
                var versionNo = log.Substring(log.LastIndexOf(versionKey) + versionKey.Length);
                versionNo = versionNo.Substring(0, versionNo.IndexOf("\n"));
                var buildResponse = new BuildResponse() { consoleWindow = log, versionNo = versionNo };

                return Ok(buildResponse);
            }
            catch (Exception e)
            {
                ExceptionHandler(this.GetType().Name, GetCallerMemberName(), e);
                return null;
            }
        }

        [HttpPost]
        [Route("SaveVisualProject")]
        public IActionResult SaveVisualProject([FromBody] VisualProject visualProject)
        {
            try
            {
                var pathToDeveloperSettings = Directory.GetParent(Directory.GetCurrentDirectory()) + "\\" + visualProject.name + "\\developersSettings.json";
                var pathToReleaseTemplate = Directory.GetParent(Directory.GetCurrentDirectory()) + "\\" + visualProject.name + "\\wwwroot\\release.template.html";
                var pathToReleaseHtml = Directory.GetParent(Directory.GetCurrentDirectory()) + "\\" + visualProject.name + "\\wwwroot\\release.html";

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

        [HttpPost]
        [Route("UpdateImports")]
        public IActionResult UpdateImports([FromBody] VisualProject visualProject)
        {
            try
            {
                var arguments = "import.js ";
                arguments += "visualProject=" + visualProject.name;
                var log = ExecCmd("node.exe", arguments, "");
                return Ok();
            }
            catch (Exception e)
            {
                ExceptionHandler(this.GetType().Name, GetCallerMemberName(), e);
                return null;
            }
        }

        [HttpPost]
        [Route("UpdateExports")]
        public IActionResult UpdateExports([FromBody] VisualProject visualProject)
        {
            try
            {
                var arguments = "export.js ";
                arguments += "visualProject=" + visualProject.name;
                var log = ExecCmd("node.exe", arguments, "");
                return Ok();
            }
            catch (Exception e)
            {
                ExceptionHandler(this.GetType().Name, GetCallerMemberName(), e);
                return null;
            }
        }

        [HttpPost]
        [Route("AddProject")]
        public IActionResult AddProject([FromBody] VisualProject visualProject)
        {
            try
            {
                var arguments = "taskAdd.js ";
                arguments += "visualProject=" + visualProject.name;
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
        [Route("RemoveProject")]
        public IActionResult RemoveProject([FromBody] VisualProject visualProject)
        {
            try
            {
                var arguments = "taskRemove.js ";
                arguments += "visualProject=" + visualProject.name;
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

        [HttpGet]
        [Route("GetIsExportLibrariesSame/{visualProject}")]
        public IActionResult GetIsExportLibrariesSame(string visualProject)
        {
            try
            {
                var arguments = "isUpdated.js isImports=false visualProject=" + visualProject;
                var bc = new BuildConfiguration();
                var response = this.ExecCmd("node.exe", arguments, "");
                if (response == "allFilesSame\n")
                    return Ok(true);
                else
                    return Ok(false);
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
                    buildOutput += sr.ReadToEnd();
                }
            }
            return buildOutput;
        }
    }
}
