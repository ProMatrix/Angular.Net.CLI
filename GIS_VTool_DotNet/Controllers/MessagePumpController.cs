using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Angular.Net.CLI.Models;

namespace AngularDotNet.Controllers
{
    #region ChannelRegistration object
    public class ChannelRegistration
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public List<string> Subscriptions { get; set; }
        public Timer ChannelTimeoutTimer;
        public Timer BlockHttpTimer;
        public Queue<ChannelMessage> Messages = new Queue<ChannelMessage>();
        public long SendersId;
        public bool CancellationInProccess = false;
        public AutoResetEvent AutoResetEvent;
        public DateTime lastChannelSync;
        public const int BlockTimeoutPeriod = 90000; // 90 seconds (90000ms). IIS is set to generate a 503 error after 100 seconds
        public delegate void TimeoutUnregister(ChannelRegistration channel);
        private TimeoutUnregister _unregister;

        public void StartChannelTimeout(int dueTime, TimeoutUnregister unregister)
        {
            this._unregister = unregister;
            ChannelTimeoutTimer = new Timer(ChannelTimedOut);
            ChannelTimeoutTimer.Change(dueTime, 0);
        }

        public void ChannelTimedOut(object state)
        {
            CancellationInProccess = true;
            _unregister(this);
            CancelChannelTimeout();
        }

        public void CancelChannelTimeout()
        {
            if (ChannelTimeoutTimer == null)
                return;
            ChannelTimeoutTimer.Dispose();
            ChannelTimeoutTimer = null;
        }

        public void ActivateBlockHttpRequest()
        {
            AutoResetEvent?.Reset();
            AutoResetEvent = new AutoResetEvent(false);
            StartCancelBlockTimeout(BlockTimeoutPeriod);
            AutoResetEvent.WaitOne();
            AutoResetEvent = null;
        }

        public void CancelBlockHttpRequest()
        {
            AutoResetEvent?.Set();
        }

        protected void StartCancelBlockTimeout(int dueTime)
        {
            BlockHttpTimer = new Timer(CancelBlockTimedOut);
            BlockHttpTimer.Change(dueTime, 0);
        }

        protected void CancelBlockTimedOut(object timer)
        {
            if (BlockHttpTimer == null)
                return;
            BlockHttpTimer.Dispose();
            BlockHttpTimer = null;
            if (!CancellationInProccess && AutoResetEvent != null)
                CancelBlockHttpRequest();
        }
    }
    #endregion

    #region Channel View Models
    public class ChannelSync
    {
        public bool Cancel { get; set; }
        public string Type = "ChannelSync";
    }

    public class ChannelMessage
    {
        public object Message { get; set; }
        public string SendersName { get; set; }
        public string SyncAction { get; set; }
        public string Type = "ChannelMessage";
    }

    public class GetAllChannels
    {
        public List<ChannelRegistration> Channels { get; set; }
        public string Type = "GetAllChannels";
    }

    public class ChannelData
    {
        public string Message { get; set; }
    }
    #endregion

    [Route("api/[controller]")]
    public class MessagePumpController : BaseController
    {
        #region Channel Construction
        private ChannelRegistration _channel;
        private ChannelSync _channelSync;
        private static readonly List<ChannelRegistration> ChannelRegistrations = new List<ChannelRegistration>();
        private readonly bool _inReleaseMode = false; // when false, allows me to debug, without interruption of timeout timers

        public MessagePumpController(IOptions<AppSettings> appSettings) : base(appSettings)
        {
#if RELEASE
            _inReleaseMode = true;
#endif
        }
        #endregion

        #region Channel Registration / Unregistration
        [HttpPost]
        [Route("Registration")]
        public GetAllChannels Registration([FromBody] ChannelRegistration channelRegistration)
        {
            try
            {
                if (ChannelRegistrations.Exists(i => i.Name == channelRegistration.Name && i.Id != channelRegistration.Id))
                    throw new Exception("The channel name is already registered!");
                var channel = ChannelRegistrations.FirstOrDefault(i => i.Id == channelRegistration.Id);
                if (channel != null) // this channel already exists so just update the subscriptions
                    channel.Subscriptions = channelRegistration.Subscriptions;
                else
                    ChannelRegistrations.Add(channelRegistration);
                NotifyAllChannelsOfChannelChange();
                Thread.Sleep(1);
                return GetAllChannels();
            }
            catch (Exception e)
            {
                ExceptionHandler(this.GetType().Name, GetCallerMemberName(), e);
                return null;
            }
        }

        private static void TimeoutUnregister(ChannelRegistration channel)
        {
            try
            {
                ChannelRegistrations.Remove(channel);
                // With this implementation, we will can't support notifying subscribers, that a subscription went offline
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
            }
        }

        [HttpPost]
        [Route("Unregistration")]
        public GetAllChannels Unregistration([FromBody] ChannelRegistration channelRegistration)
        {
            try
            {
                var channel = ChannelRegistrations.FirstOrDefault(i => i.Name == channelRegistration.Name);
                return Unregister(channel);
            }
            catch (Exception e)
            {
                ExceptionHandler(this.GetType().Name, GetCallerMemberName(), e);
                return null;
            }
        }

        [HttpPost]
        [Route("NamedUnregister")]
        public GetAllChannels NamedUnregister([FromBody]ChannelRegistration channelRegistration)
        {
            try
            {
                var channel = ChannelRegistrations.FirstOrDefault(i => i.Name == channelRegistration.Name);
                channel.Id = channelRegistration.Id;
                return Unregister(channel);
            }
            catch (Exception e)
            {
                ExceptionHandler(this.GetType().Name, GetCallerMemberName(), e);
                return null;
            }
        }

        [HttpGet]
        [Route("GetRegisteredChannels")]
        public GetAllChannels GetRegisteredChannels()
        {
            try
            {
                var timeNow = DateTime.Now;

                try
                {
                    foreach (var channel in ChannelRegistrations)
                    {
                        var ticksDif = timeNow.Ticks - channel.lastChannelSync.Ticks;
                        if (ticksDif > TimeSpan.TicksPerMillisecond * ChannelRegistration.BlockTimeoutPeriod)
                            Unregistration(channel);
                    }
                }
                catch (Exception) { /* handle this exception by not doing anything */  }
                return GetAllChannels();
            }
            catch (Exception e)
            {
                ExceptionHandler(this.GetType().Name, GetCallerMemberName(), e);
                return null;
            }
        }

        private static GetAllChannels Unregister(ChannelRegistration channel)
        {
            if (channel != null)
                UnBlockWaitingChannel(channel);

            NotifyAllChannelsOfChannelChange();
            return GetAllChannels();
        }

        private static void UnBlockWaitingChannel(ChannelRegistration channel)
        {
            channel.Messages.Enqueue(new ChannelMessage() { SyncAction = "unregistration" });
            channel.CancelBlockHttpRequest();
            ChannelRegistrations.Remove(channel);
        }

        private static void NotifyAllChannelsOfChannelChange()
        {   // except the channel that changed

            foreach (var channel in ChannelRegistrations)
            {
                if (channel.AutoResetEvent == null) continue;
                channel.Messages.Enqueue(new ChannelMessage() { SyncAction = "getAllChannels" });

                channel.CancelBlockHttpRequest();
            }
        }
        #endregion

        #region Send Channel Message
        [HttpPost]
        [Route("SendChannelMessage")]
        public bool SendChannelMessage([FromBody] ChannelMessage channelMessage)
        {
            try
            {
                foreach (var channel in ChannelRegistrations)
                {
                    foreach (var subscription in channel.Subscriptions)
                    {

                        if (subscription != channelMessage.SendersName) continue;
                        channel.Messages.Enqueue(channelMessage);
                        channel.CancelBlockHttpRequest();
                    }
                }
                return true;
            }
            catch (Exception e)
            {
                ExceptionHandler(this.GetType().Name, GetCallerMemberName(), e);
                return false;
            }
        }
        #endregion

        #region Get Channel Data
        [HttpGet("{id}")]
        public object Get(long id)
        {
            try
            {
                _channel = ChannelRegistrations.FirstOrDefault(i => i.Id == id);
                _channelSync = new ChannelSync() { Cancel = true };
                if (_channel == null)
                    return _channelSync;
                if (_channel.ChannelTimeoutTimer != null)
                    _channel.CancelChannelTimeout();
                _channel.lastChannelSync = DateTime.Now;
                if (_channel.Messages.Count == 0)
                    _channel.ActivateBlockHttpRequest();

                if (_channel.Messages.Count == 0)
                    _channel.Messages.Enqueue(new ChannelMessage() { SyncAction = "waitForSignal" });

                var channelMessage = _channel.Messages.Dequeue();
                switch (channelMessage.SyncAction)
                {
                    case "unregistration":
                        return _channelSync;
                    case "waitForSignal":
                        if (_inReleaseMode)
                            _channel.StartChannelTimeout(5000, TimeoutUnregister);
                        _channelSync.Cancel = false;
                        return _channelSync;
                    case "getAllChannels":
                        return GetAllChannels();
                    case "dispatchMessage":
                        if (_inReleaseMode)
                            _channel.StartChannelTimeout(5000, TimeoutUnregister);
                        return channelMessage;
                    default:
                        throw new Exception("Error on: waitForSignal. ");
                }
            }
            catch (Exception e)
            {
                ExceptionHandler(this.GetType().Name, GetCallerMemberName(), e);
                return false;
            }
        }

        private static GetAllChannels GetAllChannels()
        {
            return new GetAllChannels() { Channels = ChannelRegistrations };
        }
        #endregion
    }
}
