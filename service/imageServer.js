const express = require('express');
const aws = require('aws-sdk');
const multer = require('multer');
const multers3 = require('multer-s3');
const config = require('./.aws/awsconfig.json');

aws.config.update({
  secretAccessKey: config.key,
  accessKeyId: config.id,
  region: 'us-east-1'
})

const s3 = new aws.S3();

const upload = multer({
  storage: multers3({
    s3: s3,
    //acl: 'public-read',
    bucket: 'shootforthestars',
    key: function(req, file, cb) {
      const filetype = file.originalname.split('.').pop();
      const id = Math.round(Math.random() * 1e9);
      const filename = `${id}.${filetype}`;
      cb(null, filename);
    }
  }),
  limits: { fileSize: 500000 },
})

module.exports = {
  upload,
}
/*const AWSClient = require('@aws-sdk/client-s3');
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
  return Body.fileName;
}

module.exports = {
  uploadFile,
  readFile
}*/
