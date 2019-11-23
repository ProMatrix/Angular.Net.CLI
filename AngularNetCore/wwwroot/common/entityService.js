"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var apiService_1 = require("../library_ng/enterprise/apiService");
var environment_1 = require("../src/environments/environment");
var BookInfo = /** @class */ (function () {
    function BookInfo() {
    }
    return BookInfo;
}());
exports.BookInfo = BookInfo;
// #endregion
var EntityService = /** @class */ (function (_super) {
    __extends(EntityService, _super);
    function EntityService(store, http) {
        var _this = _super.call(this, http, store) || this;
        _this.store = store;
        _this.http = http;
        return _this;
    }
    EntityService.prototype.getAll = function (success, error) {
        this.get(environment_1.environment.api.getAll, function (library) {
            success(library);
        }, function (errorMessage) { error(errorMessage); });
    };
    EntityService.prototype.getAllLocally = function (success, error) {
        this.get(environment_1.environment.api.getAllLocally, function (library) {
            success(library);
        }, function (errorMessage) { error(errorMessage); });
    };
    EntityService.prototype.getFromId = function (success, error, fileName) {
        this.get(environment_1.environment.api.getContent, function (response) {
            success(response.content);
        }, error, new http_1.HttpParams().set('fileName', fileName));
    };
    EntityService.prototype.getWithProgress = function (success, error, fileName, progressCallback) {
        this.get(environment_1.environment.api.getContent, function (response) {
            success(response.content);
        }, error, new http_1.HttpParams().set('fileName', fileName), null, function (event) {
            if (progressCallback) {
                progressCallback(event);
            }
        });
    };
    EntityService.prototype.downloadFile = function (success, error, fileName) {
        this.download(environment_1.environment.api.download, function (response) {
            var fileBlob = new Blob([response.body], { type: 'text/plain' });
            success(fileBlob);
        }, error, new http_1.HttpParams().set('fileName', fileName));
    };
    EntityService.prototype.samplePayload = function (blob, type, success, error) {
        var file = new File([blob], 'simple.txt', { type: type });
        var files = new Array();
        files.push(file);
        this.upload(files, environment_1.environment.api.samplePayload, function (response) {
            success('Successfully completed Upload Payload Sample!');
        }, error, null, null, function (event) {
        });
    };
    EntityService.prototype.downloadWithProgress = function (success, error, fileName, progressCallback) {
        var _this = this;
        this.download(environment_1.environment.api.download, function (response) {
            _this.saveFile(new Blob([response.body]), fileName);
            success();
        }, error, new http_1.HttpParams().set('fileName', fileName), null, function (event) {
            if (progressCallback) {
                return progressCallback(event);
            }
        });
    };
    EntityService.prototype.postEntity = function (success, error) {
        this.post({ id: 123, name: 'A Bedtime Story', summary: 'BORING...' }, environment_1.environment.api.postEntity, function (response) {
            success('Successfully completed Post Entity!');
        }, error);
    };
    EntityService.prototype.postCollection = function (success, error) {
        this.post([{ id: 123, name: 'A Bedtime Story', summary: 'BORING...' },
            { id: 456, name: 'An Endless Story', summary: 'Endless...' },
            { id: 789, name: 'Happy Ever After', summary: 'Exciting...' }], environment_1.environment.api.postCollection, function (response) {
            success('Successfully completed Post Collection!');
        }, error);
    };
    EntityService.prototype.postCollectionWithProgess = function (success, error, progressCallback) {
        var collection = [{ id: 123, name: 'A Bedtime Story', summary: 'BORING...' },
            { id: 456, name: 'An Endless Story', summary: 'Endless...' },
            { id: 789, name: 'Happy Ever After', summary: 'Exciting...' }];
        this.post(collection, environment_1.environment.api.postCollection, function (response) {
            success('Successfully completed Post with Progress!');
        }, error, null, null, function (event) {
            if (progressCallback) {
                progressCallback(event);
            }
        });
    };
    EntityService.prototype.uploadFile = function (files, success, error, progressCallback) {
        this.upload(files, environment_1.environment.api.upload, function (response) {
            success('Successfully completed Upload Files(s)!');
        }, error, null, null, function (event) {
            if (progressCallback) {
                progressCallback(event);
            }
        });
    };
    EntityService.prototype.uploadFileWithProgess = function (files, success, error, progressCallback) {
        this.upload(files, environment_1.environment.api.upload, function () {
            success();
        }, error, null, null, function (event) {
            if (progressCallback) {
                return progressCallback(event);
            }
        });
    };
    EntityService.prototype.deleteEntity = function (success, error, id) {
        this.delete(environment_1.environment.api.deleteEntity, function (response) {
            success('Successfully deleted entity!');
        }, error, new http_1.HttpParams().set('id', id));
    };
    EntityService.prototype.saveActionsQueue = function (success, error) {
        this.post({ fileName: 'actionsQueue003.json', actions: this.ngAction.actionsQueue }, environment_1.environment.api.saveActionsQueue, function (response) {
            success('Successfully saved the Actions Queue!');
        }, error);
    };
    EntityService.prototype.loadActionsQueue = function (success, error, fileName) {
        var _this = this;
        this.get(environment_1.environment.api.loadActionsQueue, function (actionsQueue) {
            _this.ngAction.replaceActionsQueue(actionsQueue);
            success('Successfully loaded the Actions Queue!');
        }, error, new http_1.HttpParams().set('fileName', fileName));
    };
    EntityService = __decorate([
        core_1.Injectable()
    ], EntityService);
    return EntityService;
}(apiService_1.ApiService));
exports.EntityService = EntityService;
//# sourceMappingURL=entityService.js.map