"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ncli = require('node-command-line');
var Promise = require('bluebird');
var cP = require('child_process');
var CommandLine = /** @class */ (function () {
    function CommandLine() {
    }
    CommandLine.prototype.executeLaunch = function (input, callback, synchronous) {
        try {
            var command = 'dotnet run -p ' + input + '.csproj -s ' + input + '.csproj';
            // command += ' -c Release';
            console.log(process.cwd() + "> " + command);
            if (synchronous) {
                this.executeSync(command);
                callback();
            }
            else {
                this.execute(command, callback);
            }
        }
        catch (e) {
            throw new Error(e);
        }
    };
    CommandLine.prototype.executeAdd = function (input, synchronous, callback) {
        try {
            var addString_1 = 'ng generate @schematics/angular:application ' + input + ' --minimal';
            console.log(addString_1);
            if (synchronous) {
                this.executeSync(addString_1);
                callback();
            }
            else {
                Promise.coroutine(function () {
                    var response;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, ncli.run(addString_1)];
                            case 1:
                                response = _a.sent();
                                if (response.success) {
                                    callback();
                                }
                                else {
                                    throw new Error('Error executing Add command!');
                                }
                                return [2 /*return*/];
                        }
                    });
                })();
            }
        }
        catch (e) {
            throw new Error(e);
        }
    };
    CommandLine.prototype.executeBuild = function (input, output, production, synchronous, success, error) {
        try {
            var addProduction = '';
            if (production) {
                addProduction = ' --configuration=production  --aot=false --build-optimizer=false  --source-map=false';
            }
            var progress = ' --progress=false';
            var buildString_1 = 'ng build ' + input + ' --outputPath=./' + output + ' --baseHref=/' + output +
                '/ --no-deleteOutputPath' + addProduction + progress;
            console.log(buildString_1);
            if (synchronous) {
                this.executeSync(buildString_1);
                success();
            }
            else {
                Promise.coroutine(function () {
                    var response;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, ncli.run(buildString_1)];
                            case 1:
                                response = _a.sent();
                                if (response.success) {
                                    success();
                                }
                                else {
                                    error();
                                }
                                return [2 /*return*/];
                        }
                    });
                })();
            }
        }
        catch (e) {
            throw new Error(e);
        }
    };
    CommandLine.prototype.execute = function (command, callback) {
        try {
            var response = ncli.run(command);
            callback();
        }
        catch (e) {
            throw new Error(e);
        }
    };
    CommandLine.prototype.executeSync = function (command) {
        try {
            var stdout = cP.execSync(command);
            return stdout.toString();
        }
        catch (e) {
            throw new Error(e.message);
        }
    };
    return CommandLine;
}());
exports.CommandLine = CommandLine;
//# sourceMappingURL=commandLine.js.map