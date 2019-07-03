import { TaskBase } from "./taskBase";
import { Librarian } from "./build_library/librarian";

export class TaskPrePush extends TaskBase {
    private readonly lib = new Librarian();
    constructor() {
        super();
    });

}

try {
    new TaskPrePush();
} catch (e) {
    console.log(e);
    while (true) { }
}
