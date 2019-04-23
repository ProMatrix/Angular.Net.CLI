export class ChannelRegistration {
    id = 0;
    name = "";
    subscriptions = Array<string>();
}

export class ChannelMessage {
    message = new Object();
    syncAction = "";
    type = "ChannelMessage";
    sendersName = "";
}

export class ChannelSync {
    cancel = false;
    type = "ChannelSync";
}

export class GetAllChannels {
    channels = Array<ChannelRegistration>();
    type = "GetAllChannels";
}