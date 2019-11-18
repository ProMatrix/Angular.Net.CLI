using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Hosting;
using System.Net.Http;
using Angular.Net.CLI.Models;
using System.IO;
using Newtonsoft.Json;
using Microsoft.Extensions.Logging;

public class BookInfo
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Summary { get; set; }
}

public class ActionsQueue
{
    public string fileName { get; set; }
    public List <Action> Actions { get; set; }
}

public class Action
{
    public string name { get; set; }
    public string title { get; set; }
    public string delay { get; set; }
    public object payload { get; set; }
    public bool playback { get; set; }
}

namespace AngularNetCore.Controllers
{
    public class EnityController : BaseController
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly string _wwwroot;

        public EnityController(IWebHostEnvironment hostingEnvironment, IOptions<AppSettings> appSettings, ILogger<EnityController> logger) : base(appSettings, logger)
        {
            _hostingEnvironment = hostingEnvironment;
            _wwwroot = _hostingEnvironment.WebRootPath;
        }

        [HttpGet]
        [Route("api/GetAll")]
        public IActionResult GetAll()
        {
            try
            {
                var library = new List<BookInfo>
                {
                    new BookInfo
                    {
                        Id = 754566,
                        Name = "An Awesome Book",
                        Summary = "A continuation from before!"
                    },
                    new BookInfo
                    {
                        Id = 854522,
                        Name = "The Real Deal",
                        Summary = "Love that cover... Nothing more."
                    },
                    new BookInfo
                    {
                        Id = 167435,
                        Name = "PayPal Roses",
                        Summary = "Read the book for the detals on how to begin."
                    }
                };
                return Ok(library);
            }
            catch (Exception)
            {
                return null;
            }
        }

        [HttpGet]
        [Route("api/GetContent")]
        public IActionResult GetContent(string fileName)
        {
            // download a specific file based on the fileName
            var dataBytes = System.IO.File.ReadAllBytes(_wwwroot + @"\Downloads\" + fileName);
            string content = System.Text.Encoding.UTF8.GetString(dataBytes);
            content = content.Substring(0, 300) + ".........";
            return Ok(new { content });
        }

        [HttpGet]
        [Route("api/Download")]
        public IActionResult Download(string fileName)
        {
            // download a specific file
            var dataBytes = System.IO.File.ReadAllBytes(_wwwroot + @"\Downloads\" + fileName);
            var content = new System.IO.MemoryStream(dataBytes);
            var contentType = "application/octet-stream";
            return File(content, contentType, fileName);
        }

        [HttpPost]
        [Route("api/PostEntity")]
        public IActionResult PostEntity([FromBody] BookInfo bookInfo)
        {
            return Ok();
        }

        [HttpPost]
        [Route("api/PostCollection")]
        public IActionResult PostCollection([FromBody] List<BookInfo> testFileInfo)
        {
            return Ok();
        }

        [HttpPost]
        [Route("api/Upload")]
        public IActionResult Upload()
        {
            for (var i = 0; i < HttpContext.Request.Form.Files.Count; i++)
            {
                var uploadedFile = HttpContext.Request.Form.Files[i];
            }
            return Ok();
        }

        [HttpDelete]
        [Route("api/DeleteEntity")]
        public IActionResult DeleteEntity(string id)
        {
            return Ok();
        }

        [HttpPost]
        [Route("api/SamplePayload")]
        public IActionResult SamplePayload()
        {
            try
            {
                var formFile = HttpContext.Request.Form.Files[0];
                var filename = _wwwroot + @"\Snapshots\" + formFile.Name;

                if (!System.IO.File.Exists(filename))
                {
                    FileStream fs = System.IO.File.Create(filename);
                    formFile.CopyTo(fs);
                    fs.Flush();
                }else
                {
                    var dataBytes = System.IO.File.ReadAllBytes(_wwwroot + @"\Snapshots\" + formFile.Name);
                    var modelStream = new System.IO.MemoryStream(dataBytes);

                    var compareStream = new MemoryStream();
                    formFile.CopyTo(compareStream);
                    compareStream.Position = 0;

                    if(modelStream.Length != compareStream.Length)
                        throw new Exception("Comparitor Failed!");

                    for (var i = 0; i < modelStream.Length; i++)
                    {
                        var modelByte = modelStream.ReadByte();
                        var compareByte = compareStream.ReadByte();
                        if(modelByte != compareByte)
                        {
                            throw new Exception("Comparitor Failed!");
                        }
                    }
                }
                return Ok();
            }
            catch (Exception e)
            {
                ExceptionHandler(this.GetType().Name, GetCallerMemberName(), e);
                return null;
            }

        }

        [HttpPost]
        [Route("api/SaveActionsQueue")]
        public IActionResult SaveActionsQueue([FromBody] ActionsQueue actionsQueue)
        {
            var json = JsonConvert.SerializeObject(actionsQueue.Actions);
            var filePath = _wwwroot + @"\Actions\" + actionsQueue.fileName;
            var streamWriter = System.IO.File.CreateText(filePath);
            streamWriter.WriteLine(json);
            streamWriter.Dispose();

            return Ok();
        }

        [HttpGet]
        [Route("api/LoadActionsQueue")]
        public IActionResult LoadActionsQueue(string fileName)
        {
            // download a specific file based on the fileName
            var dataString = System.IO.File.ReadAllText(_wwwroot + @"\Actions\" + fileName);
            var actions = JsonConvert.DeserializeObject<List<Action>>(dataString);
            return Ok(actions);
        }


    }
}