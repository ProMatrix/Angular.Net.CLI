using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Hosting;
using System.Net.Http;
using Angular.Net.CLI.Models;
using System.IO;

public class BookInfo
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Summary { get; set; }
}

namespace AngularDotNet.Controllers
{
    public class EnityController : BaseController
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        public EnityController(IHostingEnvironment hostingEnvironment, IOptions<AppSettings> appsettings) : base(appsettings)
        {
            _hostingEnvironment = hostingEnvironment;
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
            var dataBytes = System.IO.File.ReadAllBytes(_hostingEnvironment.ContentRootPath + @"\Downloads\" + fileName);
            string content = System.Text.Encoding.UTF8.GetString(dataBytes);
            content = content.Substring(0, 300) + ".........";
            return Ok(new { content });
        }

        [HttpGet]
        [Route("api/Download")]
        public IActionResult Download(string fileName)
        {
            // download a specific file
            var dataBytes = System.IO.File.ReadAllBytes(_hostingEnvironment.ContentRootPath + @"\Downloads\" + fileName);
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
        [Route("api/PostBlob")]
        public IActionResult PostBlob()
        {
            try
            {
                var formFile = HttpContext.Request.Form.Files[0];
                var filename = _hostingEnvironment.ContentRootPath + @"\Snapshots\" + formFile.Name;

                if (!System.IO.File.Exists(filename))
                {
                    FileStream fs = System.IO.File.Create(filename);
                    formFile.CopyTo(fs);
                    fs.Flush();
                }else
                {
                    var dataBytes = System.IO.File.ReadAllBytes(_hostingEnvironment.ContentRootPath + @"\Snapshots\" + formFile.Name);
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
    }
}