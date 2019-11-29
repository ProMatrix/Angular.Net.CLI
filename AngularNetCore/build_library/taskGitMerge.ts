import { TaskBase } from './taskBase';

export class TaskGitMerge extends TaskBase {
    constructor() {
        super();
    }

    execute() {

    }
}

try {
    const noop = new TaskGitMerge();
} catch (e) {
    console.log(e);
    while (true) { const noop = 0; }
}
