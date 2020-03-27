using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using Angular.Net.CLI.Models;
using System.Diagnostics;
using System.Threading;

namespace AngularNetCore
{
    public class Startup
    {
        const string wwwroot = "wwwroot";
        private bool proSettingAvailable { get; set; }
        public Startup(IWebHostEnvironment env)
        {
            var proSettingPath = Path.GetFullPath(Path.Combine(@".\strong-box\proSettings.json")); // get absolute path
            proSettingAvailable = File.Exists(proSettingPath);

            var builder = new ConfigurationBuilder()
            .SetBasePath(env.ContentRootPath)
            .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
            if (proSettingAvailable)
            {
                builder.AddJsonFile(proSettingPath, optional: true, reloadOnChange: true);
            }
            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = wwwroot + "/dist";
            });
            services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));
            if (proSettingAvailable)
            {
                services.Configure<ProSettings>(Configuration.GetSection("ProSettings"));
            }
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            Directory.SetCurrentDirectory(env.ContentRootPath);
            var developersSettingsJson = System.IO.File.ReadAllText("developersSettings.json");
            var developersSettings = JsonConvert.DeserializeObject<List<DeveloperSettings>>(developersSettingsJson);
            var developersettingsCount = developersSettings.Where(x => x.machineName == Environment.MachineName).Count();
            DeveloperSettings developerSettings;
            if (developersettingsCount == 0)
                developerSettings = developersSettings.Where(x => x.machineName == "ANONYMOUS DEVELOPERS MACHINE NAME").Single();
            else
                developerSettings = developersSettings.Where(x => x.machineName == Environment.MachineName).Single();
            var executeDist = false;
#if RELEASE
            executeDist = true;
#endif
            if (developerSettings.executeDist)
                executeDist = true;

            var angularProject = developerSettings.angularProjects.Single(x => x.name == developerSettings.serveApp);

            if (executeDist)
            {
                app.UseDefaultFiles();
                var defaultFilesOptions = new DefaultFilesOptions();
                defaultFilesOptions.DefaultFileNames.Clear();
                // launch a specific build.
                // choices are "dist/desktop/index.html, dist/phone/index.html, startup.html (startup.html is for production and includes a serviceworker)
                if ((angularProject.buildType != BuildType.native && angularProject.buildType != BuildType.pwa) ||
                    !File.Exists(wwwroot + "/dist/" + developerSettings.serveApp + "/index.html"))
                {
                    defaultFilesOptions.DefaultFileNames.Add("dist/error.html");
                }
                else
                {
                    if (developerSettings.serveApp.Length > 0)
                        defaultFilesOptions.DefaultFileNames.Add("dist/" + developerSettings.serveApp + "/index.html");
                    else
                        defaultFilesOptions.DefaultFileNames.Add(developerSettings.releaseApp);
                }
                app.UseDefaultFiles(defaultFilesOptions);
                app.UseStaticFiles();
            }
            else
            {   // Debug mode
                app.UseSpa(spa =>
                {
                    spa.Options.SourcePath = wwwroot;
                    if (env.IsDevelopment())
                    {
                        if (developerSettings.executeTest)
                        {
                            Directory.SetCurrentDirectory(Directory.GetCurrentDirectory() + "\\" + wwwroot);
                            var runningTest = Process.GetProcessesByName("cmd").SingleOrDefault(x => x.MainWindowTitle == "ng test");

                            // All test
                            const string testSpecs = "";

                            // 1 file
                            // const string testSpecs = " --include src/app/fetch-data/fetch-data.component.spec.ts";

                            // directory or bunch of files
                            // npm run test-- --include src/app/components
                            // const string testSpecs = " --include src/app";

                            if (runningTest == null)
                            {
                                Process.Start("cmd.exe", "/k start ng test" + testSpecs);
                                Thread.Sleep(10000);
                            }
                            spa.UseProxyToSpaDevelopmentServer("http://localhost:9999");
                        }
                        else
                        {
                            var npmScript = "serveApp:" + developerSettings.serveApp;
                            spa.UseAngularCliServer(npmScript: npmScript);
                        }
                    }
                });
            }

            // This fixes issue in release with refresh page
            app.Use(async (context, next) =>
            {
                if (context.Request.Path.Value == "/")
                {
                    await next().ConfigureAwait(false);
                }
                else
                {
                    context.Response.Redirect("/", false);
                }
            });
        }

    }
}
