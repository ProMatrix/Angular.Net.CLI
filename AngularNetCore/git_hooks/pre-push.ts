import { TaskImport } from "../taskImport";

export class PrePush {

    constructor() {
        try {
            const ti = new TaskImport();
            process.chdir("../Angular.Net.CLI/ProjectBuild");
            ti.multiple();
        } catch (e) {
            console.error(e.message);
            process.exit(1);
        }
    }
}
new PrePush();
