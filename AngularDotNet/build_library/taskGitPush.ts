import { TaskBase } from './taskBase';
import { Librarian } from './build_library/librarian';

export class TaskGitPush extends TaskBase {
    private readonly lib = new Librarian();
    constructor() {
        super();
    }

}

try {
    const noop = new TaskGitPush();
} catch (e) {
    console.log(e);
    while (true) { }
}
