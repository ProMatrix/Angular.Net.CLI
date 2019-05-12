"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commonTasks_1 = require("./commonTasks");
var coloredLogger_1 = require("./coloredLogger");
var fs = require("fs");
var glob = require("glob");
var base64Img = require('base64-img');
var ProductionReady = /** @class */ (function () {
    function ProductionReady() {
        this.cl = new coloredLogger_1.ColoredLogger();
        this.ct = new commonTasks_1.CommonTasks();
        this.imageTagBeg = "<img";
        this.imageTagEnd = "/>";
        this.srcBeg = "src=";
        this.srcEnd = ".png\"";
        this.crlf = "\r\n";
        this.appServiceWorkerTemplate = "wwwroot/serviceWorker-template.js";
        this.squashedSignal = "/* this was squashed */";
        this.tsFileswithHtml = Array();
        this.tsFileswithHtmx = Array();
        this.tsFileswithCss = Array();
        this.tsFileswithScss = Array();
    }
    ProductionReady.prototype.addProdMode = function (inputFile, outputFile, middleString, identifier) {
        var data = fs.readFileSync(inputFile, "utf-8");
        var s = data.toString();
        var insertIndex = s.lastIndexOf(identifier);
        var beginning = s.substring(0, insertIndex);
        var middle = middleString;
        var ending = s.substring(insertIndex);
        var imageTagBeg = "<img";
        var imageTagEnd = "/>";
        var srcBeg = "src=";
        var srcEnd = ".png\"";
        fs.writeFileSync(outputFile, beginning + middle + "\n" + ending);
    };
    ProductionReady.prototype.removeProdMode = function (inputFile, outputFile, identifier) {
        var data = fs.readFileSync(inputFile, "utf-8");
        var s = data.toString();
        var insertIndex = 0;
        var beginning = "";
        var ending = "";
        do {
            insertIndex = s.lastIndexOf(identifier);
            if (insertIndex !== -1) {
                beginning = s.substring(0, insertIndex);
                ending = s.substring(insertIndex + identifier.length + 1);
                s = beginning + ending;
            }
        } while (insertIndex !== -1);
        if (beginning.length > 0)
            fs.writeFileSync(outputFile, beginning + ending);
    };
    ProductionReady.prototype.squash = function (path) {
        var _this = this;
        var folder = path.substring(path.lastIndexOf("/") + 1);
        glob.sync(path + "/**/*ts").forEach(function (file) {
            file = file.substring(0, file.lastIndexOf("."));
            _this.squashHelper(folder, file, "html", "templateUrl", "template", _this.tsFileswithHtml);
        });
        //??? more
        glob.sync(path + "/**/*ts").forEach(function (file) {
            file = file.substring(0, file.lastIndexOf("."));
            _this.squashHelper(folder, file, "css", "styleUrls", "styles", _this.tsFileswithCss);
        });
        return;
    };
    ProductionReady.prototype.squashHelper = function (folder, file, fileType, targetIn, targetOut, matchOn) {
        var ts = file + ".ts";
        var data = fs.readFileSync(ts).toString();
        var targetUrl;
        targetUrl = "./" + file.substring(file.lastIndexOf("/") + 1) + "." + fileType;
        var dataResource = "";
        if (data.indexOf(targetIn) > 0) {
            if (dataResource.length === 0) {
                var resourceFile = file + "." + fileType;
                if (fs.existsSync(resourceFile)) {
                    dataResource = fs.readFileSync(resourceFile).toString();
                }
                else
                    dataResource = "Can't find file:)";
            }
            if (dataResource.charCodeAt(0) === 0xFEFF)
                dataResource = dataResource.substring(1, dataResource.length);
            data = data.replace(targetIn, targetOut);
            dataResource = dataResource.replace(/\"/g, "\\\"");
            dataResource = dataResource.replace(/\'/g, "\\\'");
            dataResource = dataResource.replace(/\r\n/g, "\\n");
            dataResource = dataResource.replace(/\n/g, "\\n");
            data = data.replace("\"" + targetUrl + "\"", "\"\\n" + dataResource + "\"" + this.squashedSignal);
            data = data.replace("\'" + targetUrl + "\'", "\'\\n" + dataResource + "\'" + this.squashedSignal);
            matchOn.push(ts);
            fs.writeFileSync(ts, data);
        }
    };
    ProductionReady.prototype.unSquash = function (path) {
        var _this = this;
        this.tsFileswithHtml.forEach(function (file) {
            file = file.substring(0, file.lastIndexOf("."));
            _this.unSquashHelper(path, file, "html", "template", "templateUrl", ": \"\\n", _this.squashedSignal);
            //this.unSquashHelper(path, file, "css", "styles", "styleUrls", ": [\"\\n", this.squashedSignal, this.cssFiles);
        });
    };
    ProductionReady.prototype.unSquashHelper = function (folder, file, fileType, targetIn, targetOut, startId, endId) {
        if (!fs.existsSync(file + ".html") && fileType === "html")
            return;
        if (!fs.existsSync(file + ".css") && fileType === "css")
            return;
        var ts = file + ".ts";
        var data = fs.readFileSync(ts, "utf-8");
        var startOfTarget = targetIn + startId;
        if (data.indexOf(startOfTarget) > 0) {
            var targetUrl = void 0;
            targetUrl = "./" + file.substring(file.lastIndexOf("/") + 1) + "." + fileType;
            var startOfResourceIndex = data.indexOf(startOfTarget) + startOfTarget.length;
            var resource = data.substring(startOfResourceIndex);
            var endOfResoucelIndex = resource.indexOf(endId);
            var newTsPre = data.substring(0, startOfResourceIndex);
            var newTsPost = resource.substring(endOfResoucelIndex + endId.length, resource.length);
            newTsPre = newTsPre.replace(targetIn + startId, targetOut + ": ");
            var stylesOpen = "";
            if (fileType === "css")
                stylesOpen = "[";
            var newFile = newTsPre + stylesOpen + "\"" + targetUrl + "\"" + newTsPost;
            fs.writeFileSync(ts, newFile);
        }
    };
    ProductionReady.prototype.embed_image = function (path) {
        var _this = this;
        // Please note that this only works for static files in the application
        // for dynamic files or file in another domain, use the Angular [src]=""
        glob.sync(path + "/**/*.html").forEach(function (file) {
            var dataResource = fs.readFileSync(file).toString();
            if (dataResource.charCodeAt(0) === 0xFEFF)
                dataResource = dataResource.substr(1, dataResource.length);
            var beforeImageString = "";
            var imageTagString = "";
            var afterImageString = "";
            var newHtmlFile = "";
            var index = 0;
            var embededResource = false;
            var imageTagBegIndex;
            // begnning of file while
            do {
                dataResource = dataResource.substr(index);
                // some variables are used for development
                imageTagBegIndex = dataResource.indexOf(_this.imageTagBeg);
                if (imageTagBegIndex !== -1) {
                    beforeImageString = dataResource.substr(0, imageTagBegIndex);
                    imageTagString = dataResource.substr(imageTagBegIndex);
                    var imageTagEndIndex = imageTagString.indexOf(_this.imageTagEnd);
                    afterImageString = imageTagString.substr(imageTagEndIndex + _this.imageTagEnd.length);
                    imageTagString = imageTagString.substr(0, imageTagEndIndex + _this.imageTagEnd.length);
                    index = imageTagBegIndex + imageTagString.length;
                    if (imageTagString.indexOf("data:image") === -1) {
                        if (imageTagString.indexOf("[src") != -1) {
                            newHtmlFile += beforeImageString + imageTagString;
                            continue;
                        }
                        var srcIndex = imageTagString.indexOf(" src");
                        if (srcIndex !== -1) {
                            var beforeSrcString = imageTagString.substr(0, imageTagString.indexOf(_this.srcBeg));
                            var srcDelimiter = imageTagString.substr(imageTagString.indexOf(_this.srcBeg) + _this.srcBeg.length, 1);
                            var imageUrl = imageTagString.substr(imageTagString.indexOf(_this.srcBeg) + _this.srcBeg.length + 1);
                            imageUrl = imageUrl.replace(/\.\.\//g, "");
                            var afterSrcString = imageUrl.substr(imageUrl.indexOf(srcDelimiter) + 1);
                            imageUrl = imageUrl.substr(0, imageUrl.indexOf(srcDelimiter));
                            embededResource = true;
                            var imageData = void 0;
                            try {
                                imageData = base64Img.base64Sync(imageUrl);
                            }
                            catch (e) {
                                imageData = "CANNOT FIND IMAGE:)";
                            }
                            newHtmlFile += beforeImageString + beforeSrcString + "src=" + srcDelimiter + imageData + srcDelimiter + afterSrcString;
                        }
                    }
                }
                else {
                    newHtmlFile += dataResource;
                }
            } while (imageTagBegIndex !== -1);
            if (newHtmlFile.length > 0 && embededResource) {
                var filex = file.replace("html", "htmx");
                fs.writeFileSync(filex, newHtmlFile);
            }
        });
    };
    ProductionReady.prototype.createServiceWorker = function (distFolder, version) {
        var crlf = "\r\n";
        var ngswPath = "..\\..\\ProjectBuild\\build_library\\ngsw.js";
        if (fs.existsSync(ngswPath)) {
            var filesString_1 = "";
            glob.sync(distFolder + "/**/*.*").forEach(function (file) {
                file = file.substr(file.indexOf("dist"));
                filesString_1 += "    \"/" + file + "\"," + crlf;
            });
            var sw = fs.readFileSync(ngswPath).toString();
            sw = sw.replace(/replacement_script_goes_here/g, filesString_1);
            sw = sw.replace(/serviceWorker.js/g, "ngsw.js");
            sw = sw.replace(/swVersion/g, version);
            fs.writeFileSync(distFolder + "/ngsw.js", sw);
        }
        else {
            this.cl.printError("ngsw.js doesn't exist! Can't create Service Worker!");
            while (true) { }
            ;
        }
    };
    ProductionReady.prototype.copyProjectFiles = function (distFolder) {
        var manifest = fs.readFileSync("manifest.json").toString();
        fs.writeFileSync(distFolder + "\\manifest.json", manifest);
        var favicon = fs.readFileSync("favicon.ico");
        fs.writeFileSync(distFolder + "\\favicon.ico", favicon);
    };
    ProductionReady.prototype.enableServiceWorker = function (distFolder) {
        var pathToIndex = distFolder + "\\index.html";
        var indexHtml = fs.readFileSync(pathToIndex).toString();
        var beg = "<!--begin serviceWorker script";
        var end = "end serviceWorker script-->";
        indexHtml = indexHtml.replace(beg, "");
        indexHtml = indexHtml.replace(end, "");
        fs.writeFileSync(pathToIndex, indexHtml);
    };
    ProductionReady.prototype.removeServiceWorker = function (distFolder) {
        var pathToIndex = distFolder + "\\index.html";
        var indexHtml = fs.readFileSync(pathToIndex).toString();
        var beg = "<!--begin serviceWorker script";
        var end = "end serviceWorker script-->";
        var newHtml = indexHtml.substr(0, indexHtml.indexOf(beg));
        newHtml += indexHtml.substr(indexHtml.indexOf(end) + end.length);
        fs.writeFileSync(pathToIndex, newHtml);
    };
    ProductionReady.prototype.manageManifestPath = function (distFolder) {
        var pathToIndex = distFolder + "\\index.html";
        var indexHtml = fs.readFileSync(pathToIndex).toString();
        indexHtml = indexHtml.replace("../manifest.json", "/" + distFolder + "/manifest.json");
        indexHtml = indexHtml.replace("-debug build)", "-release build)");
        fs.writeFileSync(pathToIndex, indexHtml);
    };
    return ProductionReady;
}());
exports.ProductionReady = ProductionReady;
//# sourceMappingURL=productionReady.js.map