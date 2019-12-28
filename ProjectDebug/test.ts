import pe = require("path-exists");

//let CommonTest = require('build_library/commonTest').MyModule.CommonTest;
import { MyModule } from 'build_library/commonTest';

try {
    let ct = new MyModule.CommonTest();
    ct.printTime();
    let z = pe.sync('sdfsdf');

    while (true) {
    }
} catch (e) {

}

