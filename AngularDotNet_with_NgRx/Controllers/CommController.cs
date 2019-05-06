using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Reflection;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Angular.Net.CLI.Models;

namespace AngularDotNet.Controllers
{
    public class TextMessage
    {
        public string Message { get; set; }
        public string CellCarrierName { get; set; }
        public string PhoneNumber { get; set; }
    }

    [Route("api/[controller]")]
    public class CommController : BaseController
    {
        private static string SmtpReply { get; set; }
        private static string SmtpHost { get; set; }
        private static int SmtpPort { get; set; }
        private static string SmtpUn { get; set; }
        private static string SmtpPw { get; set; }

        private static List<CellCarrier> _cellCarriers;

        public CommController(IOptions<AppSettings> appSettings) : base(appSettings)
        {
            SmtpReply = appSettings.Value.smtpReply;
            SmtpHost = appSettings.Value.smtpReply;
            SmtpHost = appSettings.Value.smtpHost;
            SmtpPort = appSettings.Value.smtpPort;
            SmtpUn = appSettings.Value.smtpUn;
            SmtpPw = appSettings.Value.smtpPw;
            _cellCarriers = SysInfoController.CreateCellCarriers(appSettings.Value.cellCarriers);
        }

        [HttpPost]
        [Route("Post")]
        public bool Post([FromBody] TextMessage textMessage)
        {
            try
            {
                var subject = textMessage.Message;
                if (subject.Length > 30)
                    subject = subject.Substring(0, 30) + "...";
                var mailMessage = new MailMessage(SmtpReply, GetSmsAddress(textMessage.CellCarrierName, textMessage.PhoneNumber), subject, textMessage.Message)
                {
                    IsBodyHtml = true,
                    BodyEncoding = System.Text.Encoding.ASCII
                };
                var mailAuthentication = new System.Net.NetworkCredential(SmtpUn, SmtpPw);
                var mailClient = new SmtpClient(SmtpHost, SmtpPort)
                {
                    EnableSsl = true,
                    UseDefaultCredentials = false,
                    Credentials = mailAuthentication
                };
                mailClient.Send(mailMessage);
                return true;
            }
            catch (Exception e)
            {
                ExceptionHandler(this.GetType().Name, MethodBase.GetCurrentMethod().Name, e);
                return false;
            }
        }

        private static string GetSmsAddress(string cellCarrier, string phoneNumber)
        {
            var smsProfile = _cellCarriers.Single(a => a.name == cellCarrier).smsProfile;
            phoneNumber = Regex.Replace(phoneNumber, @"[^\d]", "");
            return smsProfile.Replace("phonenumber", phoneNumber);
        }
    }
}
