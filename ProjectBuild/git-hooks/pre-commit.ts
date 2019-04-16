import { TaskGitCommit } from "../taskGitCommit";

export class PreCommit {

    constructor() {
        try {
            const tgh = new TaskGitCommit();
            process.chdir("../Angular.Net.CLI/ProjectBuild");
            tgh.execute();
        } catch (e) {
            console.error(e.message);
            process.exit(1);
        }
    }
}
new PreCommit();
