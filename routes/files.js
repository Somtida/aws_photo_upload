'use strict';

const express = require('express');
const multer = require('multer');

const Image = require('../models/image');

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limit: { fileSize: 52428800}
});
// const upload = multer({storage: multer.memoryStorage()});
// const upload = multer({dest: './uploads'});

let router = express.Router();

// /api/files



router.post('/', upload.single('file'), (req, res) => {
  console.log('req.body: ', req.body);
  console.log('req.file: ', req.file);

  Image.upload(req.file, req.body.id, (err) => {
    // 1. generate a unique key
    // 2. upload to s3
    // 3. create the image document, and save to db.
    if(err) return res.status(400).send(err);
    res.send();
    // res.send(url);
  })
});

router.delete('/:id', (req, res) => {
  console.log("req.params.id: ", req.params.id);
  console.log("Image.deletePhoto: ", Image.deletePhoto);
  Image.deletePhoto(req.params.id, (err) => {
    console.log("delete image");
    if(err) return res.status(400).send(err);
    res.send();
  });
})

router.get('/:userId', (req, res) => {
  Image.find({user: req.params.userId}, (err, images)=>{
    res.status(err ? 400 : 200).send(err || images);
  });
})

module.exports = router;
