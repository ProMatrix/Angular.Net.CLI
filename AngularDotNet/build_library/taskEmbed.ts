import { ColoredLogger } from "../build_library/coloredLogger";
import { BuildConfiguration, AngularProject, VisualProject } from "../wwwroot/shared/client-side-models/buildModels";
import { Versioning } from "../build_library/versioning";
import { CommonTasks } from "../build_library/commonTasks";
import { CommandLine } from "../build_library/commandLine";
import { ProductionReady } from "../build_library/productionReady";
import { TaskBase } from "./taskBase";
const _ = require("lodash");
import * as fs from "fs";
const ncp = require("ncp");

export class TaskEmbed extends TaskBase {
    private readonly cl = new ColoredLogger();
    private readonly ver = new Versioning();
    private readonly pr = new ProductionReady();
    private readonly cli = new CommandLine();
    private readonly ct = new CommonTasks();
    private ngProjectQueue: Array<AngularProject>;
    private cwd: string;
    private synchronous = true;
    constructor($waitOnCompleted?: boolean, $visualProject?: string, $synchronous?: boolean) {
        super();

        if ($waitOnCompleted !== null && $waitOnCompleted !== undefined) {
            this.waitOnCompleted = $waitOnCompleted;
        } else {
            const waitOnCompleted = this.getCommandArg("waitOnCompleted", "true");
            if (waitOnCompleted === "true") {
                this.waitOnCompleted = true;
            } else {
                this.waitOnCompleted = false;
            }
        }

        if ($synchronous !== null && $synchronous !== undefined) {
            this.synchronous = $synchronous;
        } else {
            const synchronous = this.getCommandArg("synchronous", "true");
            if (synchronous === "true") {
                this.synchronous = true;
            } else {
                this.synchronous = false;
            }
        }

        if ($visualProject !== null && $visualProject !== undefined) {
            this.visualProject = $visualProject;
        } else {
            const visualProject = this.getCommandArg("visualProject", "unknown");
            if (visualProject === "unknown") {
                throw new Error("visualProject parameter is missing!");
            } else {
                this.visualProject = visualProject;

            }
        }
        this.embed(this.visualProject);
    }

    private embed(visualProject: string) {

    }
}