using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Angular.Net.CLI.Models;

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


    }




}