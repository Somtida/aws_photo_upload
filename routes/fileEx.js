'use strict';

const express = require('express');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limit: { fileSize: 52428800}
});
// const upload = multer({storage: multer.memoryStorage()});
// const upload = multer({dest: './uploads'});

const aws = require('aws-sdk');
const s3 = new aws.S3();


let router = express.Router();

// /api/files



router.post('/', upload.single('file'), (req, res) => {
  console.log('req.body: ', req.body);
  console.log('req.file: ', req.file);

  var params = {
    Bucket: 'SomtidaNewBucket',
    Key: req.file.originalname,
    Body: req.file.buffer,
    ACL: 'public-read'
  };
  s3.upload(params, function(err, data) {
    if(err) return res.status(400).send(err);
    let url = `https://s3.amazonaws.com/SomtidaNewBucket/${req.file.originalname}`;
    res.send(url);

    // let base64img = req.file.buffer.toString('base64');
    // res.send(`<img src="data:image/jpg;base64,${base64img}">`);

    // console.log(err, data);

    // console.log("url: ",url);
    // res.send(`<img src="${url}">`);

  });
});

module.exports = router;
