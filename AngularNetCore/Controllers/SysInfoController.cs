using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Angular.Net.CLI.Models;
using System.Reflection;

namespace AngularNetCore.Controllers
{
    [Route("api/[controller]")]
    public class SysInfoController : BaseController
    {
        public SysInfoController(IOptions<AppSettings> appSettings, IOptions<ProSettings> proSettings) : base(appSettings, proSettings)
        {
        }

//        private void ManageSettings()
//        {
//            _appSettings.aspNetCoreVersion = typeof(Controller).Assembly.GetName().Version.ToString();
//            _appSettings.debug = true;
//#if RELEASE
//            _appSettings.debug = false;
//#endif
//            // updating for the client
//            if (_proSettings.googleMapKey != null)
//                _appSettings.googleMapKey = _proSettings.googleMapKey;
//            // updating for the server            
//            if (_proSettings.connectionString == null)
//                _proSettings.connectionString = _appSettings.connectionString;
//            if (_proSettings.smtpHost == null)
//                _proSettings.smtpHost = _appSettings.smtpHost;
//            if (_proSettings.smtpPort == 0)
//                _proSettings.smtpPort = _appSettings.smtpPort;
//            if (_proSettings.smtpPw == null)
//                _proSettings.smtpPw = _appSettings.smtpPw;
//            if (_proSettings.smtpReply == null)
//                _proSettings.smtpReply = _appSettings.smtpReply;
//            if (_proSettings.smtpUn == null)
//                _proSettings.smtpUn = _appSettings.smtpUn;
//        }

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
