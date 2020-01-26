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
using System.Threading.Tasks;
using System.IO;
using System.Net;
using System.Text;

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
                // This method is designed specifically for rest.clicksend.com
                var rawData = "{\"messages\":[{\"from\":\"" + _proSettings.smsFrom + "\",\"body\":\"" + textMessage.Message + "\",\"to\":\"" + textMessage.MobileNumber + "\",\"source\":\"sdk\",\"schedule\":0}]}";
                // the address should be abstracted
                WebRequest request = WebRequest.Create("https://rest.clicksend.com/v3/sms/send");
                request.Method = "POST";
                // the Authorization token should be abstracted
                request.Headers.Add("Authorization", "Basic " + _proSettings.smsPw);
                request.Headers.Add("Content-Type", "application/json");

                ASCIIEncoding encoding = new ASCIIEncoding();
                byte[] rawBytes = encoding.GetBytes(rawData);
                request.ContentLength = rawBytes.Length;
                Stream newStream = request.GetRequestStream();
                newStream.Write(rawBytes, 0, rawBytes.Length);
                WebResponse response = request.GetResponse();
                Stream dataStream = response.GetResponseStream();
                StreamReader reader = new StreamReader(dataStream);
                string serverResponse = reader.ReadToEnd();
                return Ok(true);
            }
            catch (Exception e)
            {
                ExceptionHandler(this.GetType().Name, MethodBase.GetCurrentMethod().Name, e);
                return Ok(false);
            }
        }

        [HttpPost]
        [Route("api/SendEmailMessage")]
        public ActionResult SendEmailMessage([FromBody] TextMessage textMessage)
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