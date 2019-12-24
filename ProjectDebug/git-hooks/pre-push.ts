import { TaskNpmPublish } from "../../angularNetCore/build_library/taskNpmPublish";

export class PrePush {

    constructor() {
        try {
            // assume the libary_ng is in wwwroot, find the path for the npm update
            const noop = new TaskNpmPublish('ng2-express', 'npm', '..\\..\\NgResources\\ng2-express', 'library', '..\\AngularNetCore\\wwwroot');
            // we can only see the console.log is the process.exit(1);
            // process.exit(1);
        } catch (e) {
            console.error(e.message);
            process.exit(1);
        }
    }
}
new PrePush();