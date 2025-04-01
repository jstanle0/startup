//import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
//import { fromIni } from '@aws-sdk/credential-providers';
const AWSClient = require('@aws-sdk/client-s3');
const credentialProvider = require('@aws-sdk/credential-providers');

const s3 = new AWSClient.S3Client({
  credentials: credentialProvider.fromIni(),
});

const bucketName = 'shootforthestars';

async function uploadFile(fileName, fileContent) {
  const command = new AWSClient.PutObjectCommand({
    Bucket: bucketName,
    Key: fileName,
    Body: fileContent,
  });
  return s3.send(command);
}

async function readFile(fileName) {
  const command = new AWSClient.GetObjectCommand({
    Bucket: bucketName,
    Key: fileName,
  });
  const { Body } = await s3.send(command);
  return Body.transformToString();
}

module.exports = {
  uploadFile,
  readFile
}
