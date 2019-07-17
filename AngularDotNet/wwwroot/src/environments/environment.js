// this will work whenever the frontend and backend are served from one server
export const environment = {
    production: false,
    api: {
        getAll: location.origin + "/api/GetAll",
        getEntity: location.origin + "/api/GetEntity",
        download: location.origin + "/api/Download",
        postEntity: location.origin + "/api/v1/PostEntity",
        postCollection: location.origin + "/api/v1/PostCollection",
        upload: location.origin + "/api/v1/Upload",
        deleteEntity: location.origin + "/api/v1/DeleteEntity"
    }
};
//# sourceMappingURL=environment.js.map