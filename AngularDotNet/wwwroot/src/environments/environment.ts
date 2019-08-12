// this will work whenever the frontend and backend are served from one server
export const environment = {
  production: false,
  api: {
    getAll: location.origin + '/api/GetAll',
    getContent: location.origin + '/api/GetContent',
    download: location.origin + '/api/Download',
    postEntity: location.origin + '/api/PostEntity',
    postCollection: location.origin + '/api/PostCollection',
    upload: location.origin + '/api/Upload',
    deleteEntity: location.origin + '/api/DeleteEntity',
    // Message Punp
    getRegisteredChannels: location.origin + '/api/messagePump/getRegisteredChannels',
    getChannelData: location.origin + '/api/messagePump/getchanneldata',
    sendChannelMessage: location.origin + '/api/messagePump/sendChannelMessage',
    executeNamedUnregister: location.origin + '/api/messagePump/executeNamedUnregister',
    executeChannelUnregistration: location.origin + '/api/messagePump/executeChannelUnregistration',
    executeChannelRegistration: location.origin + '/api/messagePump/executeChannelRegistration',
  }
};
