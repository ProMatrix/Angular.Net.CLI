// this will work whenever the frontend and backend are served from one server
export const environment = {
  production: true,
  api: {
    // App Settings
    getSysInfo: location.origin + '/api/sysInfo',
    sendTextMessage: location.origin + '/api/comm',
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

    getPackageJson: './package.json',

  }
};
