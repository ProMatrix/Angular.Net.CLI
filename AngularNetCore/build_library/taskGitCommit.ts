import { BuildConfiguration, AngularProject, VisualProject } from '../wwwroot/library_ng/client-side-models/buildModels';
import { TaskBase } from './taskBase';
import { CommandLine } from './commandLine';
import { TaskBuild } from './taskBuild';

// note this doesn't commit, but is simply a hook during the commit process

export class TaskGitCommit extends TaskBase {
    private synchronous = true;

    constructor($waitOnCompleted?: boolean, $visualProject?: string, $synchronous?: boolean) {
        super();

        if ($waitOnCompleted !== null && $waitOnCompleted !== undefined) {
            this.waitOnCompleted = $waitOnCompleted;
        } else {
            const waitOnCompleted = this.getCommandArg('waitOnCompleted', 'true');
            if (waitOnCompleted === 'true') {
                this.waitOnCompleted = true;
            } else {
                this.waitOnCompleted = false;
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
        this.execute();
    }

    execute() {
        const bc = this.getBuildConfiguration();
        const vsProject = bc.visualProjects.find(x => (x.name === this.visualProject)) as VisualProject;
        if (vsProject.developerSettings.buildHook) {
            const noop = new TaskBuild(this.waitOnCompleted, 'AngularNetCore', this.synchronous);
            // added any changed files after the Build process
            this.cli.executeSync('git add -u');
        }
    }
}
