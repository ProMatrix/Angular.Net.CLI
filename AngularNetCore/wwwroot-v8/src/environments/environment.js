"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// this will work whenever the frontend and backend are served from one server
var indexController = 'http://localhost:1999/index';
// No SSL
// const angularStudio = 'http://localhost:53507';
// With SSL
//const angularStudio = 'https://localhost:44354';
exports.environment = {
    production: false,
    api: {
        // App Settings
        getSysInfo: location.origin + '/api/sysInfo',
        sendTextMessage: location.origin + '/api/sendTextMessage',
        // Http Demo
        getAll: location.origin + '/api/GetAll',
        getAllLocally: './assets/data/library.json',
        getContent: location.origin + '/api/GetContent',
        download: location.origin + '/api/Download',
        postEntity: location.origin + '/api/PostEntity',
        postCollection: location.origin + '/api/PostCollection',
        upload: location.origin + '/api/Upload',
        deleteEntity: location.origin + '/api/DeleteEntity',
        // Message Pump
        getRegisteredChannels: location.origin + '/api/messagePump/getRegisteredChannels',
        getChannelData: location.origin + '/api/messagePump/getchanneldata',
        sendChannelMessage: location.origin + '/api/messagePump/sendChannelMessage',
        executeNamedUnregister: location.origin + '/api/messagePump/executeNamedUnregister',
        executeChannelUnregistration: location.origin + '/api/messagePump/executeChannelUnregistration',
        executeChannelRegistration: location.origin + '/api/messagePump/executeChannelRegistration',
        // Redux
        samplePayload: location.origin + '/api/SamplePayload',
        // NgXs
        saveActionsQueue: location.origin + '/api/saveActionsQueue',
        loadActionsQueue: location.origin + '/api/loadActionsQueue',
        // Developer's Settings
        getBuildConfig: indexController + '/getConfig',
        saveVisualProject: indexController + '/saveVisualProject',
        buildAngularProject: indexController + '/buildAngularProject',
        addAngularProject: indexController + '/addAngularProject',
        removeAngularProject: indexController + '/removeAngularProject',
        // logEntry
        throwException: location.origin + '/api/build/throwException',
        postLogEntry: location.origin + '/api/build/postLogEntry',
        getLogEntries: location.origin + '/api/build/getLogEntries'
    }
};
//# sourceMappingURL=environment.js.map