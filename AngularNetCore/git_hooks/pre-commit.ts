//import { readFileSync, writeFileSync, existsSync } from 'fs';
//import { TaskGitCommit } from "../build_library/taskGitCommit";

export class PreCommit {

    constructor() {
        try {
            //const noop = new TaskGitCommit(true, "AngularNetCore", true);
            //const tgh = new TaskGitCommit();
            //process.chdir("../Angular.Net.CLI/ProjectBuild");
            //tgh.execute();
        } catch (e) {
            //writeFileSync('git-hooks.log', e);
        }
    }
}
new PreCommit();
