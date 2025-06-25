const fs = require("fs").promises;
const Path = require("path");
const { s3, S3_Bucket } = require("../config/aws-config");

async function makePull() {
  repoPath = Path.resolve(process.cwd(), ".personalGit");
  const commitsPath = Path.join(repoPath, "commits");

  try {
    const data = await s3.listObjectsV2({
      Bucket: S3_Bucket,
      Prefix: "commits/",
    }).promise();
    
    const objects = data.Contents;
    for (const object of objects){
        const key = object.Key
        const commitDir = Path.join(commitsPath, Path.dirname(key).split('/').pop());

        await fs.mkdir(commitDir, {recursive: true});

        const params ={
            Bucket: S3_Bucket,
            Key: key
        };

        const fileContent = await s3.getObject(params).promise();
        await fs.writeFile(Path.join(repoPath, key), fileContent.Body);
        console.log("All commit is pulled Successfully");
        
    }

  } catch (error) {
    console.error("Unable to Pull: ",error);

  }

}
module.exports = { makePull };
