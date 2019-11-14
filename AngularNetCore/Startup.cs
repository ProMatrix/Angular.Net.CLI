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

namespace AngularNetCore
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "wwwroot/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        //public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        //{
        //    if (env.IsDevelopment())
        //    {
        //        app.UseDeveloperExceptionPage();
        //    }
        //    else
        //    {
        //        app.UseExceptionHandler("/Error");
        //        // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
        //        app.UseHsts();
        //    }

        //    app.UseHttpsRedirection();
        //    app.UseStaticFiles();
        //    if (!env.IsDevelopment())
        //    {
        //        app.UseSpaStaticFiles();
        //    }

        //    app.UseRouting();

        //    app.UseEndpoints(endpoints =>
        //    {
        //        endpoints.MapControllerRoute(
        //            name: "default",
        //            pattern: "{controller}/{action=Index}/{id?}");
        //    });

        //    app.UseSpa(spa =>
        //    {
        //        // To learn more about options for serving an Angular SPA from ASP.NET Core,
        //        // see https://go.microsoft.com/fwlink/?linkid=864501

        //        spa.Options.SourcePath = "wwwroot";

        //        if (env.IsDevelopment())
        //        {
        //            spa.UseAngularCliServer(npmScript: "start");
        //        }
        //    });
        //}

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

            //app.UseMvc(routes =>
            //{
            //    routes.MapRoute(
            //        name: "default",
            //        template: "{controller}/{action=Index}/{id?}");
            //});
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
                // choices are "dist/desktop/index.html, dist/phone/index.html, startup.html (startup.html is for production and includes a serviceworker)
                if (developerSettings.serveApp.Length > 0)
                    defaultFilesOptions.DefaultFileNames.Add("dist/" + developerSettings.serveApp + "/index.html");
                else
                    defaultFilesOptions.DefaultFileNames.Add(developerSettings.releaseApp);
                app.UseDefaultFiles(defaultFilesOptions);
                app.UseStaticFiles();
                //app.UseMvc();
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
