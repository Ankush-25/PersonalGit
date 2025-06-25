const fs = require("fs").promises;
const Path = require("path");
const { v4: uuidv4 } = require("uuid");

async function makeCommit(message) {
    console.log(message)
  const repoPath = Path.resolve(process.cwd(), ".personalGit");
  const stagedPath = Path.join(repoPath, "staging");
  const commitPath = Path.join(repoPath, "commits");
  try {
    const commitId = uuidv4();
    const commitDir = Path.join(commitPath, commitId);
    await fs.mkdir(commitDir, { recursive: true });
    const files = await fs.readdir(stagedPath);
    for (const file of files){
        await fs.copyFile(Path.join(stagedPath, file), Path.join(commitDir, file));
    }

    await fs.writeFile(Path.join(commitDir,"commit.json"),JSON.stringify({message, date:new Date().toISOString()}))
    
    console.log(`Successfully Commit CommitID: ${commitId} created with message : ${message}`);
    
  } catch (error) {
    console.error("Error commiting files:", error);
  }
}

module.exports = { makeCommit };
