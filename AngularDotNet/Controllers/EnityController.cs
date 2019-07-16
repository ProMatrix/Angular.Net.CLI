using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;

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
            string testFile_txt = _hostingEnvironment.ContentRootPath + @"\Downloads\" + fileName;
            var dataBytes = System.IO.File.ReadAllBytes(testFile_txt);
            string result = System.Text.Encoding.UTF8.GetString(dataBytes);
            result = result.Substring(0, 300) + ".........";
            return Ok(new { content = result });
        }
    }

}