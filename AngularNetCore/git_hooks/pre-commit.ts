import { TaskGitCommit } from "../build_library/taskGitCommit";


export class PreCommit {


    constructor() {
        try {
            throw new Error("ISSUES");
            //const tgh = new TaskGitCommit();
            //process.chdir("../Angular.Net.CLI/ProjectBuild");
            //tgh.execute();
        } catch (e) {
            console.error(e.message);
            //process.exit(1);
        }
    }
}
new PreCommit();
