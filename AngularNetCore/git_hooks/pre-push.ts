export class PrePush {

    constructor() {
        try {

        } catch (e) {
            console.error(e.message);
            process.exit(1);
        }
    }
}
new PrePush();