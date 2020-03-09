"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RequestHttpDownload = /** @class */ (function () {
    function RequestHttpDownload(payload) {
        this.payload = payload;
    }
    RequestHttpDownload.type = '[httpDemo] Request Http Download';
    return RequestHttpDownload;
}());
exports.RequestHttpDownload = RequestHttpDownload;
var ResponseHttpDownload = /** @class */ (function () {
    function ResponseHttpDownload(payload, samplePayload) {
        this.payload = payload;
        this.samplePayload = samplePayload;
    }
    ResponseHttpDownload.type = '[httpDemo] Response Http Download';
    return ResponseHttpDownload;
}());
exports.ResponseHttpDownload = ResponseHttpDownload;
//# sourceMappingURL=httpDemo.component.actions.js.map