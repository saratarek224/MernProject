const mongoose = require('mongoose');
const validator=require('validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fname: String,
  lname: String,
  email: {
    type:String,
    required:true,
    trim:true,
    minlength:1,
    unique:true,
    validate:{
      validator:validator.isEmail,
      message:'{VALUE} is not a valid email'
    }
      
  } ,
  password:{
    type:String,
    require:true,
    minlength:6
  },
  tokens:[{
    access:{type:String,required:true},
    token:{type:String,required:true}
  }],
  image:String,  
  isAdmin: Boolean

}); 

const User = mongoose.model('User', userSchema);

module.exports = User;