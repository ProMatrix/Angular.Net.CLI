﻿import { CommandLine } from '../build_library/commandLine';
import { TaskBase } from './taskBase';
import { VisualProject } from '../wwwroot/library_ng/client-side-models/buildModels';

export class TaskLaunch extends TaskBase {
    private synchronous = true;

    constructor($visualProject?: string, $synchronous?: boolean, $angularProject?: string) {
        super();

        if ($visualProject !== null && $visualProject !== undefined) {
            this.visualProject = $visualProject;
        } else {
            const visualProject = this.getCommandArg('visualProject', 'unknown');
            if (visualProject === 'unknown') {
                throw new Error('visualProject parameter is missing!');
            } else {
                this.visualProject = visualProject;
            }
        }

        if ($synchronous !== null && $synchronous !== undefined) {
            this.synchronous = $synchronous;
        } else {
            const synchronous = this.getCommandArg('synchronous', 'true');
            if (synchronous === 'true') {
                this.synchronous = true;
            } else {
                this.synchronous = false;
            }
        }

        if ($angularProject !== null && $angularProject !== undefined) {
            this.angularProject = $angularProject;
        } else {
            const angularProject = this.getCommandArg('angularProject', 'unknown');
            if (angularProject !== 'unknown') {
                this.angularProject = angularProject;
            }
        }
        this.launch();
    }

    launch() {
        const cwd = process.cwd();
        const bc = this.getBuildConfiguration();
        process.chdir(cwd);
        const vsProject = bc.visualProjects.find(x => (x.name === this.visualProject)) as VisualProject;
        if (!vsProject) {
            throw new Error('Can\'t find vsProject: ' + this.visualProject);
        }
        process.chdir('../' + this.visualProject);
        let startChrome = 'start chrome --app=' + vsProject.applicationUrl;
        if (this.angularProject) {
            startChrome += 'dist/' + this.angularProject + '/index.html';
        }

        console.log('Launching ' + this.visualProject + ':');
        this.cli.executeLaunch(this.visualProject, () => { const noop = 0; }, this.synchronous);
        setTimeout(() => {
            console.log('Start Chrome: ');
            console.log(process.cwd() + '> ' + startChrome);
            this.cli.executeSync(startChrome);
            this.applicationRunning();

        }, 1000);
    }

    applicationRunning() {
        console.log(this.visualProject + ' is running!');
        let showOn = false;
        setInterval(() => {
            if (showOn) {
                console.log('⚫');
            } else {
                console.log('⚪');
            }
            showOn = !showOn;
        }, 1000);
    }


}
