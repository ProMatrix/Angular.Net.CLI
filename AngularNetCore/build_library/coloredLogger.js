"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var colors = require('colors');
var ColoredLogger = /** @class */ (function () {
    function ColoredLogger() {
    }
    ColoredLogger.prototype.printSuccess = function (message) {
        console.log(colors.green('SUCCESS: ' + message));
    };
    ColoredLogger.prototype.printWarning = function (message) {
        console.log(colors.yellow('WARNING: ' + message));
    };
    ColoredLogger.prototype.printInfo = function (message) {
        console.log(colors.cyan('INFO: ' + message));
    };
    ColoredLogger.prototype.printError = function (message) {
        console.log(colors.red('ERROR: ' + message));
    };
    ColoredLogger.prototype.showInfo = function (message) {
        console.log(colors.yellow(message));
    };
    return ColoredLogger;
}());
exports.ColoredLogger = ColoredLogger;
//# sourceMappingURL=coloredLogger.js.map