import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiService } from './apiService';
import { AppSettings, ChannelRegistration, ChannelMessage, ChannelSync, GetAllChannels } from 'ngx-modeling';
import { environment } from '../src/environments/environment';
import * as moment from 'moment';

// ngxs
import { Store } from '@ngxs/store';

@Injectable()
export class MessagePump extends ApiService {
    channelForSubscriptions = Array<ChannelRegistration>();
    allRegisteredChannels = Array<ChannelRegistration>();
    transmitMessageQueue = Array<ChannelMessage>();
    receiveMessageQueue = Array<ChannelMessage>();
    channelsToUnregister = Array<string>();
    channelRegistered = false;
    channelUnregistrationInProcess = false;
    setToAutoRegister = false;

    channelRegistration: ChannelRegistration = {
        id: new Date().getTime(),
        name: '',
        subscriptions: []
    };

    constructor(public store: Store, public http: HttpClient) {
        super(http, store);

        const cachedMessages = this.getLocalStorage('transmitMessageQueue');
        if (cachedMessages) {
            this.transmitMessageQueue = cachedMessages;
        }
    }

    register(success: () => void, error: (x: string) => any) {
        if (this.channelRegistered) {
            error('This channel is already unregistered!');
        }
        this.onUpdateSubscriptions(success, error);
    }

    setToOffline() {
        this.channelForSubscriptions.length = 0;
        this.channelRegistration.subscriptions.length = 0;
        this.allRegisteredChannels.length = 0;
        if (this.channelRegistered) {
            this.setToAutoRegister = true;
        }
        this.channelRegistered = false;
    }

    unregister(success: () => void, error: (x: string) => any) {
        if (!this.channelRegistered) {
            error('This channel is already unregistered!');
            return;
        }
        this.channelUnregistrationInProcess = true;
        this.post(this.channelRegistration, environment.api.executeChannelUnregistration,
            (getAllChannels: GetAllChannels) => {
                this.channelForSubscriptions.length = 0;
                this.channelRegistration.subscriptions.length = 0;
                this.allRegisteredChannels = Array.from(getAllChannels.channels);
                success();
            },
            errorMessage => {
                error(errorMessage);
            });
    }

    onUpdateSubscriptions(success: () => void, error: (x: string) => any) {
        this.channelRegistration.id = this.channelRegistration.id;
        this.post(this.channelRegistration, environment.api.executeChannelRegistration,
            (getAllChannels: GetAllChannels) => {
                this.channelForSubscriptions = getAllChannels.channels;

                this.allRegisteredChannels = Array.from(getAllChannels.channels);
                this.channelRegistered = true;
                success();
            },
            errorMessage => {
                error(errorMessage);
            });
    }

    synchronize(messageReceivedCallback: () => void, success: () => void, error: (x: string) => any) {
        this.get(environment.api.getChannelData,
            (obj: any) => {
                if (!this.channelRegistered) {
                    return;
                }
                switch (obj.type) {
                    case 'ChannelSync':
                        const channelSync = obj as ChannelSync;
                        if (channelSync.cancel) {
                            // channel was unregistered
                            this.channelForSubscriptions.length = 0;
                            this.channelRegistered = false;
                            this.channelUnregistrationInProcess = false;
                            success();
                        } else {
                            this.synchronize(messageReceivedCallback, success, error);
                        }
                        break;
                    case 'GetAllChannels':
                        const getAllChannels = obj as GetAllChannels;
                        this.channelForSubscriptions = getAllChannels.channels;
                        this.allRegisteredChannels = Array.from(getAllChannels.channels);
                        this.synchronize(messageReceivedCallback, success, error);
                        break;
                    case 'ChannelMessage':
                        const channelMessage = obj as ChannelMessage;
                        const sendersName = this.channelForSubscriptions.filter(a => (a.name === channelMessage.sendersName))[0].name;
                        this.receiveMessageQueue.push(channelMessage);
                        messageReceivedCallback();
                        this.synchronize(messageReceivedCallback, success, error);
                        break;
                }
            }, errorMessage => {
                // most likely a 502 network timeout
                if (navigator.onLine) {
                    this.synchronize(messageReceivedCallback, success, error);
                }
            }, new HttpParams().set('id', this.channelRegistration.id.toString()));
    }

    getAllRegisteredChannels(success: () => void, error: (x: string) => void) {
        this.get(environment.api.getRegisteredChannels,
            (getAllChannels: GetAllChannels) => {
                this.allRegisteredChannels = getAllChannels.channels;
                success();
            },
            errorMessage => {
                error(errorMessage);
            });
    }

    queueChannelMessage(success: () => void, error: (x: string) => any, offlineCondition: () => void) {
        this.sendChannelMessage(success, error, offlineCondition);
    }

    sendChannelMessage(success: () => void, error: (x: string) => any, offlineCondition: () => void) {

        if (this.transmitMessageQueue.length === 0) {
            return;
        }

        if (!navigator.onLine) {
            this.setLocalStorage('transmitMessageQueue', this.transmitMessageQueue);
            offlineCondition();
            return;
        }
        const nextMessage = this.transmitMessageQueue.shift();
        this.post(nextMessage, environment.api.sendChannelMessage,
            (wasSuccessful: boolean) => {
                if (wasSuccessful) {
                    if (this.transmitMessageQueue.length > 0) {
                        this.sendChannelMessage(success, error, null);
                    } else {
                        this.setLocalStorage('transmitMessageQueue', null);
                        success();
                    }
                } else {
                    error('Channel message Error!');
                }
            },
            errorMessage => {
                error(errorMessage);
            });
    }

    getOrderedChannelForSubscriptions(): Array<ChannelRegistration> {
        return this.channelForSubscriptions.sort((a, b) => {
            const textA = a.name.toUpperCase();
            const textB = b.name.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
    }

    getChanneNamesForSubscriptions(): Array<string> {
        return this.channelForSubscriptions.map(a => a.name );
    }

    getOrderedAllRegisteredChannels(): Array<ChannelRegistration> {
        return this.allRegisteredChannels.sort((a, b) => {
            const textA = a.name.toUpperCase();
            const textB = b.name.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
    }
}
