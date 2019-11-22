var PreCommit = /** @class */ (function () {
    function PreCommit() {
        try {
            throw new Error("ISSUES");
            //const tgh = new TaskGitCommit();
            //process.chdir("../Angular.Net.CLI/ProjectBuild");
            //tgh.execute();
        }
        catch (e) {
            console.error(e.message);
            //process.exit(1);
        }
    }
    return PreCommit;
}());
export { PreCommit };
new PreCommit();
//# sourceMappingURL=pre-commit.js.map