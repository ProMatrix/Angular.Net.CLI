import { TaskNpmPublish } from './taskNpmPublish';

try {
    process.chdir('..\\AngularNetCore\\wwwroot\\library_ng');
    const noop = new TaskNpmPublish();
    while (true) { }
} catch (e) {
    console.log(e);
    while (true) { }
}
