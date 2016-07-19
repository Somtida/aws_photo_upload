'use strict';

const mongoose = require('mongoose');
const uuid = require('uuid');

const aws = require('aws-sdk');
const s3 = new aws.S3();

let imageSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  url: {type: String, required: true},
  key: {type: String, required: true},
  name: {type: String, required: true}
})

imageSchema.statics.upload = function(file, user, cb){
  // file.originalname -----> extension
  // uuid() + extension -----> Key

  console.log("user: ", user);
  console.log("file: ", file);
  let fileType = file.originalname.split('.')[1];
  let fileFirstName = uuid();
  let fileName = `${fileFirstName}.${fileType}`;
  console.log("file type: ", fileType);
  console.log("file FirstName: ", fileFirstName);
  console.log("fileName: ", fileName);

  let imageObj = {
    user: user,
    url: `https://s3.amazonaws.com/SomtidaNewBucket/${fileName}`,
    key: fileName,
    name: file.originalname
  }
  console.log("imageObj: ", imageObj);
  this.create(imageObj, err => {
    console.log("trying to save");

    var params = {
      Bucket: 'SomtidaNewBucket',
      Key: fileName,
      Body: file.buffer,
      ACL: 'public-read'
    };
    s3.upload(params, function(err, data) {
      if(err) return res.status(400).send(err);
      let url = `https://s3.amazonaws.com/SomtidaNewBucket/${fileName}`;

      // let base64img = req.file.buffer.toString('base64');
      // res.send(`<img src="data:image/jpg;base64,${base64img}">`);

      // console.log(err, data);

      console.log("url: ",url);
      // res.send(`<img src="${url}">`);
      cb(err);
    });
  });

}

// imageSchema.methods.delete = function(cb){
//   // this.key
// }


var Image = mongoose.model('Image', imageSchema);

module.exports = Image;
