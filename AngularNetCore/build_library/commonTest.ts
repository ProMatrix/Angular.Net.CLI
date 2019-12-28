
export class CommonTest {
    printTime() {
        const d = new Date();
        const t = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + ':' + d.getMilliseconds();
        console.log(`TIME: ${t}`);
    }
}
