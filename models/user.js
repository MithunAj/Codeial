const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password:{
        type : String,
        required : true
    },
    name : {
        type: String,
        required:true
    },
    avatar :{
        type: String,

    },
    friendships:[
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Frienships'
        }
    ] 
},{
    timestamps: true
});

// defining the storage where the uploaded file needs to be saved
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // constructing the path of the uploads folder using path module
      cb(null, path.join(__dirname,"..",AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

// static methods  
userSchema.statics.uploadedAvatar = multer({
    storage : storage
}).single('avatar')
userSchema.statics.avatarPath = AVATAR_PATH;

const user = mongoose.model('user',userSchema);

module.exports = user;