let imageSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  url: {type: String, required: true},
  key: {type: String, required: true},
  name: {type: String, required: true},
})

imageSchema.statics.upload = function(file, user, cb){
  // file.originalname -----> extension
  // uuid() + extension -----> Key
}

imageSchema.methods.delete = function(cb){
  this.key
}

Image.upload(req.file, req.user, err => {
  // 1. generate a unique key
  // 2. upload to s3
  // 3. create the image document, and save to db.
})

image.delete = (){
  
}
