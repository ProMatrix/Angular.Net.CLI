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
using System.Diagnostics;
using System.Linq;
using System.Collections.Generic;

namespace AngularNetCore.Controllers
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
        protected string _applicationLog;
        protected AppSettings _appSettings; // this collection is passed to the client
        protected ProSettings _proSettings; // this collection stays on the server

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
            var e = exception;
            var evt = new EventProperties
            {
                message = exception.Message,
                entryType = (int)EventLogEntryType.Error
            };

            var stringCollection = new List<string>
            {
                _applicationLog
            };

            do
            {
                stringCollection.Add("Exception Message: " + exception.Message);
                stringCollection.Add("Stack Trace: " + exception.StackTrace);
                exception = exception.InnerException;
            } while (exception != null);

            string[] replacementStrings = stringCollection.ToArray();
            EventLog.WriteEvent("Application", new EventInstance(0, 0, (EventLogEntryType)evt.entryType), replacementStrings);
            
            throw new Exception(e.ToString());
        }

        protected void LogEventEntry(EventProperties evt)
        {
            string[] replacementStrings = {
                _applicationLog,
                "Message: " + evt.message
            };
            EventLog.WriteEvent("Application", new EventInstance(0, 0, (EventLogEntryType)evt.entryType), replacementStrings);
        }
    }
}