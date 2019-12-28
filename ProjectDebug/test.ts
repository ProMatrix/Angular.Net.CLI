import pe = require("path-exists");
//import { pe } from "path-exists";

//import { CommonTest } from "../AngularNetCore/build_library/commonTest";
import { CommonTest } from './node_modules/build_library/commonTest';

//import { CommonTest } from 'self-control';

//import se = require("self-control");

try {
    let z = pe.sync('sdfsdf');

    let ct = new CommonTest();
    ct.printTime();

    while (true) {
    }
} catch (e) {

}

