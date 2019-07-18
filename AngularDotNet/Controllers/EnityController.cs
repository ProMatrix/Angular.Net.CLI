﻿using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using System.Net.Http;

public class BookInfo
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Summary { get; set; }
}

namespace AngularDotNet.Controllers
{
    public class EnityController : ControllerBase
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        public EnityController(IHostingEnvironment hostingEnvironment)
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
                        Name = "Uber Roses",
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
        [Route("api/GetEntity")]
        public IActionResult GetEntity(string fileName)
        {
            // download a specific file based on the fileName
            var dataBytes = System.IO.File.ReadAllBytes(_hostingEnvironment.ContentRootPath + @"\Downloads\" + fileName);
            string result = System.Text.Encoding.UTF8.GetString(dataBytes);
            result = result.Substring(0, 300) + ".........";
            return Ok(new { content = result });
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

        //[HttpPost]
        //[Route("api/PostCollection")]
        //public HttpResponseMessage PostCollection(List<TestFileInfo> testFileInfo)
        //{
        //    return Request.CreateResponse(HttpStatusCode.OK, "PostCollection completed successfully!");
        //}

        //[HttpPost]
        //[Route("api/Upload")]
        //public HttpResponseMessage Upload()
        //{
        //    for (var i = 0; i < HttpContext.Current.Request.Files.Count; i++)
        //    {
        //        var uploadedFile = HttpContext.Current.Request.Files[i];
        //    }
        //    return Request.CreateResponse(HttpStatusCode.OK, "Upload Successful!");
        //}

        //[HttpDelete]
        //[Route("api/DeleteEntity")]
        //public HttpResponseMessage DeleteEntity(string id)
        //{
        //    return Request.CreateResponse(HttpStatusCode.OK, "DeleteEntity completed successfully!");
        //}
    }
}