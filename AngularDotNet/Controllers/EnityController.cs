using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Angular.Net.CLI.Models;

public class TestFileInfo
{
    public string FileId { get; set; }
    public string FileName { get; set; }
}

namespace AngularDotNet.Controllers
{
    public class EnityController : ControllerBase
    {
        [HttpGet]
        [Route("GetAll")]
        public IActionResult GetAll()
        {
            try
            {
                return Ok(true);
            }
            catch (Exception)
            {
                return null;
            }
        }


    }




}