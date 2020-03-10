using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Angular.Net.CLI.Models;
using System.Reflection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Cors;

namespace AngularNetCore.Controllers
{
    [Route("api/[controller]")]
    public class SysInfoController : BaseController
    {
        public SysInfoController(IWebHostEnvironment hostingEnvironment, IOptions<AppSettings> appSettings, IOptions<ProSettings> proSettings) : base(hostingEnvironment, appSettings, proSettings)
        {
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
