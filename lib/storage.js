const { v4: uuidv4 } = require('uuid');
const {Storage} = require('@google-cloud/storage');
const storage = new Storage({
    projectId: process.env.GCP_PROJECT_ID
});
const crypto = require("crypto");


const generateSignedUrl =  async (filename) =>{

      let hashedFilename = crypto.createHash('md5')
          .update(filename)
          .digest("hex")
          .substr(0, 8);

      // These options will allow temporary read access to the file
      const options = {
        version: 'v4',
        action: 'write',
        contentType: 'application/octet-stream',
        expires: Date.now() + 5 * 60 * 1000, // 5 minutes
      };

      // Get a v4 signed URL for reading the file
      const [url] = await storage
        .bucket(process.env.GCS_PUBLIC_BUCKET)
        .file(`media/${hashedFilename}${filename}`)
        .getSignedUrl(options);

      return url;
}

module.exports = {
    generateSignedUrl
};