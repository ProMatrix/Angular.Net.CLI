import { TaskNpmUpdate } from './taskNpmUpdate';

try {
    process.chdir('..\\AngularNetCore\\wwwroot');
    const noop = new TaskNpmUpdate();
    while (true) { }
} catch (e) {
    console.log(e);
    while (true) { }
}
