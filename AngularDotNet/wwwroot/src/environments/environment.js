"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// this will work whenever the frontend and backend are served on one server
exports.environment = {
    production: false,
    api: {
        getAll: location.origin + "/api/GetAll",
        getEntity: location.origin + "/api/GetEntity"
    }
};
//# sourceMappingURL=environment.js.map