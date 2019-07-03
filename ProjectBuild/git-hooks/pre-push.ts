import { TaskGitPush } from "../taskGitPush";

export class PrePush {

    constructor() {
        try {
            const task = new TaskGitPush();
        } catch (e) {
            console.error(e.message);
            process.exit(1);
        }
    }
}
new PrePush();
