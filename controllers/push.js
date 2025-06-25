const fs = require('fs').promises;
const Path = require('path')
const {s3, S3_Bucket} = require('../config/aws-config');


async function makePush() {

    const repoPath = Path.resolve(process.cwd(),".personalGit");
    const commitsPath = Path.join(repoPath, "commits");

    try{
        const commitDirs = await fs.readdir(commitsPath);
        for (const commitDir of commitDirs){
            const commitPath = Path.join(commitsPath, commitDir);
            const files = await fs.readdir(commitPath);
            for (const file of files){
                const filePath = Path.join(commitPath, file);
                const fileContent = await fs.readFile(filePath);
                const params ={
                    Bucket: S3_Bucket,
                    Key:`commits/${commitDir}/${file}`,
                    Body: fileContent,
                };
                
                await s3.upload(params).promise();
            }
        }
        console.log("Upload in S3 is Successfully completed")
    }catch(err){
        console.error("Error pushing to S3: ",err);
    }

}
module.exports = {makePush}