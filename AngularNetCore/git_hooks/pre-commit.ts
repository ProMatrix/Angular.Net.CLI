export class PreCommit {

    constructor() {
        try {
            throw new Error("!!!");
        } catch (e) {
            console.error(e.message);
            process.exit(1);
        }
    }
}
new PreCommit();
