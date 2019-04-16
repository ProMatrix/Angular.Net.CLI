using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Angular.Net.CLI.Models;

namespace Angular.Net.Controllers
{
    [Route("api/[controller]")]
    public class SysInfoController : BaseController
    {
        AppSettings _appSettings;

        public SysInfoController(IOptions<AppSettings> appsettings) : base(appsettings)
        {
            _appSettings = appsettings.Value;
            _appSettings.aspNetCoreVersion = typeof(Controller).Assembly.GetName().Version.ToString();
            _appSettings.debug = true;

#if RELEASE
            _appSettings.debug = false;
#endif
            ConnectionString = appsettings.Value.connectionString;

            // Remove sensitive data you don't want to pass to the client
            _appSettings.connectionString = "???";
            _appSettings.smtpHost = "???";
            _appSettings.smtpPort = 0;
            _appSettings.smtpPw = "???";
            _appSettings.smtpReply = "???";
            _appSettings.smtpUn = "???";
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_appSettings);
            }
            catch (Exception e)
            {
                ExceptionHandler(this.GetType().Name, GetCallerMemberName(), e);
                return null;
            }
        }

        public static List<CellCarrier> CreateCellCarriers(string s)
        {
            var cellCarriers = s.Split(';');
            return cellCarriers.Select(cellCarrier => cellCarrier.Split(':')).Select(parts => new CellCarrier() { name = parts[0], smsProfile = parts[1] }).ToList();
        }
    }
}
