const ncli = require("node-command-line");
const Promise = require("bluebird");
const c_p = require('child_process');

export class CommandLine {

    executeLaunch(input, callback: Function) {
        try {
            const command = "dotnet run -p " + input + ".csproj -s " + input + ".csproj";
            console.log("run: " + command);
            this.executeSync(command);
            callback();
        } catch (e) {
            throw new Error(e);
        }
    }

    executeAdd(input: string, synchronous: boolean, callback: Function) {
        try {
            const addString = "ng generate @schematics/angular:application " + input + " --minimal";
            console.log(addString);
            if (synchronous) {
                this.executeSync(addString);
                callback();
            } else {
                Promise.coroutine(function* () {
                    var response = yield ncli.run(addString);
                    if (response.success) {
                        callback();
                    } else {
                        throw new Error("Error executing Add command!");
                    }
                })();
            }
        } catch (e) {
            throw new Error(e);
        }
    }

    executeBuild(input: string, output: string, production: boolean, synchronous: boolean, callback: Function) {
        try {
            let addProduction = "";
            if (production)
                addProduction = " --configuration=production  --aot=false --build-optimizer=false  --source-map=false";
            let progress = " --progress=false";
            const buildString = "ng build " + input + " --outputPath=./" + output + " --baseHref=/" + output + "/ --no-deleteOutputPath" + addProduction + progress;
            console.log(buildString);
            if (synchronous) {
                this.executeSync(buildString);
                callback();
            } else {
                Promise.coroutine(function* () {
                    var response = yield ncli.run(buildString);
                    if (response.success) {
                        callback();
                    } else {
                        throw new Error("Error executing Add command!");
                    }
                })();
            }
        } catch (e) {
            throw new Error(e);
        }
    }

    execute(command: string, callback: Function) {
        try {
            var response = ncli.run(command);
            callback();
        } catch (e) {
            throw new Error(e);
        }
    }

    executeSync(command: string): string {
        try {
            let stdout = c_p.execSync(command);
            return stdout.toString();
        } catch (e) {
            throw new Error(e.message);
        }
    }
}