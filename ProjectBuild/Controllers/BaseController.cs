using System;
using System.Net;
using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Angular.Net.CLI.Models;
using Microsoft.Extensions.Options;

namespace ProjectBuild.Controllers
{
    public class CustomExceptionFilterAttribute : ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            var exception = context.Exception;
            context.Result = new ContentResult
            {
                Content = $"{exception.Message}",
                ContentType = "test/plain",
                StatusCode = (int?)HttpStatusCode.BadRequest
            };
        }
    }

    [CustomExceptionFilterAttribute]
    public class BaseController : Controller
    {
        protected string ConnectionString;
        public BaseController(IOptions<AppSettings> appsettings)
        {
        }

        protected void ExceptionHandler(string className, string methodName, Exception e)
        {
            var lineNumber = "???";
            const string lineSearch = ":line ";
            var index = e.StackTrace.LastIndexOf(lineSearch, StringComparison.Ordinal);
            if (index != -1)
                lineNumber = e.StackTrace.Substring(index + lineSearch.Length);
            var message = e.InnerException?.Message ?? e.Message;
            var errorMessage = "Application error: " + message + ". Error was generated from: " + className + "." + methodName + " line number: " + lineNumber;
            throw new Exception(errorMessage);
        }

        protected static string GetCallerMemberName([CallerMemberName]string name = "")
        {
            return name;
        }
    }
}