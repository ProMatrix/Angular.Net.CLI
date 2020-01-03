using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Angular.Net.CLI.Models;
using Microsoft.Extensions.Logging;
using System.Reflection;

namespace AngularNetCore.Controllers
{
    [Route("api/[controller]")]
    public class SysInfoController : BaseController
    {
        public SysInfoController(IOptions<AppSettings> appSettings, IOptions<ProSettings> proSettings, ILogger<SysInfoController> logger) : base(appSettings, logger)
        {
            _appSettings = appSettings.Value;
            _proSettings = proSettings.Value;
            ManageSettings();
        }

        private void ManageSettings()
        {
            _appSettings.aspNetCoreVersion = typeof(Controller).Assembly.GetName().Version.ToString();
            _appSettings.debug = true;
#if RELEASE
            _appSettings.debug = false;
#endif
            if (_proSettings.connectionString.Length == 0)
            {
                _proSettings.connectionString = _appSettings.connectionString;
                _appSettings.connectionString = "???????";
            }
            
            // Remove sensitive data you don't want to pass to the client
            _appSettings.connectionString = "???";
            _appSettings.smtpHost = "???";
            _appSettings.smtpPort = 0;
            _appSettings.smtpPw = "???";
            _appSettings.smtpReply = "???";
            _appSettings.smtpUn = "???";
        }

        //private static Dictionary<string, string> GetProperties(object obj)
        //{
        //    var props = new Dictionary<string, string>();
        //    if (obj == null)
        //        return props;

        //    var type = obj.GetType();
        //    foreach (var prop in type.GetProperties())
        //    {
        //        var val = prop.GetValue(obj, new object[] { });
        //        var valStr = val == null ? "" : val.ToString();
        //        props.Add(prop.Name, valStr);
        //    }

        //    return props;
        //}

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

        // demo sending 1 parameter
        [HttpGet("{id}")]
        public IActionResult Get(int id)
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

        // demo sending 2 parameter
        [HttpGet("{id}/{dateString}")]
        public IActionResult Get(int id, string dateString)
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
