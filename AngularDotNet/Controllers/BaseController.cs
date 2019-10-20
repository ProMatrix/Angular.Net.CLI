using System;
using System.Net;
using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.EventLog;
using Angular.Net.CLI.Models;
using System.Text;

namespace AngularDotNet.Controllers
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
        private readonly ILogger _logger;
        protected string ConnectionString;
        public BaseController(IOptions<AppSettings> appSettings, ILogger<BaseController> logger)
        {
            _logger = logger;
        }

        protected void ExceptionHandler(string className, string methodName, Exception e)
        {
            LogException(e);
        }

        protected static string GetCallerMemberName([CallerMemberName]string name = "")
        {
            return name;
        }

        protected void LogException(Exception exception)
        {
            var message = new StringBuilder();
            do
            {
                message.Append("Exception Message: " + exception.Message + Environment.NewLine + Environment.NewLine);
                message.Append("Stack Trace: " + exception.StackTrace + Environment.NewLine + Environment.NewLine);

                exception = exception.InnerException;
            } while (exception != null);

            _logger.LogError(message.ToString());
            throw new Exception(message.ToString());
        }
    }
}