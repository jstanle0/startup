const express = require('express');
const aws = require('aws-sdk');
const multer = require('multer');
const multers3 = require('multer-s3');
const config = require('./dbconfig.json');

aws.config.update({
  secretAccessKey: config.key,
  accessKeyId: config.id,
  region: 'us-east-1'
})

const s3 = new aws.S3();

const upload = multer({
  storage: multers3({
    s3: s3,
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
