const fs = require('fs').promises;
const Path = require("path");

async function addRepo(filePath) {
    const repoPath = Path.resolve(process.cwd(), ".personalGit");
    const  stagingPath = Path.join(repoPath,"staging");
    try {
        await fs.mkdir(stagingPath,{recursive: true});
        const fileName = Path.basename(filePath)
        await fs.copyFile (filePath, Path.join(stagingPath,fileName));
        console.log(`The File ${fileName} added to the staging area!.`);
    } catch (error) {
        console.error("Error adding file :", error)
    }
}
module.exports = {addRepo}
