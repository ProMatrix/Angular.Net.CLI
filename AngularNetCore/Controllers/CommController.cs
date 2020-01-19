using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Reflection;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Angular.Net.CLI.Models;
using Microsoft.AspNetCore.Hosting;

namespace AngularNetCore.Controllers
{
    public class CommController : BaseController
    {
        private static List<CellCarrier> _cellCarriers;
        public CommController(IWebHostEnvironment hostingEnvironment, IOptions<AppSettings> appSettings, IOptions<ProSettings> proSettings) : base(hostingEnvironment, appSettings, proSettings)
        {
            _cellCarriers = SysInfoController.CreateCellCarriers(_appSettings.cellCarriers);
        }

        [HttpPost]
        [Route("api/SendTextMessage")]
        public ActionResult SendTextMessage([FromBody] TextMessage textMessage)
        {
            try
            {
                var subject = textMessage.Message;
                if (subject.Length > 30)
                    subject = subject.Substring(0, 30) + "...";
                var mailMessage = new MailMessage(_proSettings.smtpReply, GetSmsAddress(textMessage.CellCarrierName, textMessage.MobileNumber.ToString()), subject, textMessage.Message)
                {
                    IsBodyHtml = true,
                    BodyEncoding = System.Text.Encoding.ASCII
                };
                var mailAuthentication = new System.Net.NetworkCredential(_proSettings.smtpUn, _proSettings.smtpPw);
                var mailClient = new SmtpClient(_proSettings.smtpHost, _proSettings.smtpPort)
                {
                    EnableSsl = true,
                    UseDefaultCredentials = false,
                    Credentials = mailAuthentication
                };
                mailClient.Send(mailMessage);
                return Ok(true);
            }
            catch (Exception e)
            {
                ExceptionHandler(this.GetType().Name, MethodBase.GetCurrentMethod().Name, e);
                return Ok(false);
            }
        }


        private static string GetSmsAddress(string cellCarrier, string mobileNumber)
        {
            var smsProfile = _cellCarriers.Single(a => a.name == cellCarrier).smsProfile;
            mobileNumber = Regex.Replace(mobileNumber, @"[^\d]", "");
            return smsProfile.Replace("phonenumber", mobileNumber);
        }

    }
}