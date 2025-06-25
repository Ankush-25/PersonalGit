const fs = require('fs');
const Path = require('path');
const {promisify } = require("util");

const readdir = promisify(fs.readdir);
const copyFile = promisify(fs.copyFile);

async function makeRevert(commitId) {
    const repoPath = Path.resolve(process.cwd(),".personalGit");
    const CommitsPath = Path.join(repoPath,"commits");

    try {
        const commitDir = Path.join(CommitsPath, commitId);
        const files = await readdir(commitDir);
        const ParentDir = Path.resolve(repoPath, "..");
        for (const file of files){
            await copyFile(Path.join(commitDir,file), Path.join(ParentDir, file))
        }
        console.log(`Commit ${commitId} reverted successfully`)

    } catch (error) {
        console.error("Unable to revert the commits: ", error);
    }

}
module.exports = {makeRevert};