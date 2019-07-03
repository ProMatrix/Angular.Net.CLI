import { TaskPrePush } from "../taskPrePush";

export class PrePush {

    constructor() {
        try {
            const task = new TaskPrePush();
            throw new Error("Not Implemented!");
        } catch (e) {
            console.error(e.message);
            process.exit(1);
        }
    }
}
new PrePush();
