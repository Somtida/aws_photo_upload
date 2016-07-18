'use strict';

const aws = require('aws-sdk');

const s3 = new aws.S3();

const fs = require('fs');
// s3.createBucket({
//   Bucket: 'SomtidaNewBucket'
// }, (err, data) => {
//   console.log("err: ", err);
//   console.log("data: ", data);
// })

// s3.putObject({
//   Bucket: 'SomtidaNewBucket',
//   Key: 'in.jpg',
//   Body: fs.readFileSync('./in.jpg'),
//   ACL: 'public-read'
// }, (err, data) => {
//   console.log("err: ", err);
//   console.log("data: ", data);
//
// })
fs.readFile('./in.jpg', (err, data) => {
  s3.putObject({
    Bucket: 'SomtidaNewBucket',
    Key: 'in.jpg',
    Body: data,
    ACL: 'public-read'
  }, (err, data) => {
    console.log("err: ", err);
    console.log("data: ", data);

  })

})
