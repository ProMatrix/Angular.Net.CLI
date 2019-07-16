// this will work whenever the frontend and backend are served from one server
export const environment = {
  production: true,
  api: {
    getAll: location.origin + "/api/GetAll",
    getEntity: location.origin + "/api/GetEntity",
    download: location.origin + "/api/Download"
  }
};
