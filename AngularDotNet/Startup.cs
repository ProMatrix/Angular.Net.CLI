using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using Angular.Net.CLI.Models;
using Newtonsoft.Json;
using System.IO;

namespace AngularDotNet
{
    public class Startup
    {
        private string _launchPath;
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
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

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
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

            if (executeDist)
            {
                app.UseDefaultFiles();
                var defaultFilesOptions = new DefaultFilesOptions();
                defaultFilesOptions.DefaultFileNames.Clear();
                // launch a specific build.
                // choices are "dist-desktop/index.html, dist-phone/index.html, startup.html (startup.html is for production and includes a serviceworker)
                _launchPath = "/wwwroot/" + developerSettings.releaseApp;
                defaultFilesOptions.DefaultFileNames.Add(developerSettings.releaseApp);
                app.UseDefaultFiles(defaultFilesOptions);
                app.UseStaticFiles();
                app.UseMvc();
            }
            else
            {   // Debug mode
                app.UseSpa(spa =>
                {
                    // To learn more about options for serving an Angular SPA from ASP.NET Core,
                    // see https://go.microsoft.com/fwlink/?linkid=864501
                    spa.Options.SourcePath = "wwwroot";
                    if (env.IsDevelopment())
                    {
                        var npmScript = "serveApp:" + developerSettings.serveApp;
                        spa.UseAngularCliServer(npmScript: npmScript);
                        var angularProject = developerSettings.angularProjects.Single(x => x.name == developerSettings.serveApp);
                        _launchPath = angularProject.angularModule + "\\index.html";
                    }
                });
            }

            // This fixes issue in release with refresh page
            app.Use(async (context, next) =>
            {
                if (context.Request.Path.Value == "/")
                {
                    await next();
                }
                else
                {
                    context.Response.Redirect("/", false);
                }
            });
        }
    }
}
