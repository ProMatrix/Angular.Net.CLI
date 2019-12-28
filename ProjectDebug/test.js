"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pe = require("path-exists");
//let CommonTest = require('build_library/commonTest').MyModule.CommonTest;
var commonTest_1 = require("build_library/commonTest");
try {
    var ct = new commonTest_1.MyModule.CommonTest();
    ct.printTime();
    var z = pe.sync('sdfsdf');
    while (true) {
    }
}
catch (e) {
}
//# sourceMappingURL=test.js.map