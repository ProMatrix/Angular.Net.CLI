import { TaskBase } from './taskBase';

export class TaskGitPush extends TaskBase {
    constructor() {
        super();
    }

}

try {
    const noop = new TaskGitPush();
} catch (e) {
    console.log(e);
    while (true) { const noop = 0; }
}
