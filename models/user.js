const mongoose = require('mongoose');
const validator=require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash'); 
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

userSchema.methods.toJSON=function(){
  const user = this;
  var userObject= user.toObject();

  return _.pick(userObject,['_id','email']);
}

// userSchema.methods.generateAuthToken = function (){
//   const user = this;
//   var access='auth';
//   var token = jwt.sign({_id : user._id.toHexString(),access},'abc123').toString();

//   user.tokens.push({access,token});

//   user.save().then(()=>{
//     var tok = token;
//     console.log(tok);
//     return tok;
//   });

// };

userSchema.methods.generateAuthToken = function () {
  const user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens.push({access, token});

  return user.save().then(() => {
    return token;
  });
};


userSchema.statics.findByToken=function(token){
  var User=this;
  var decoded;
  try{

    decoded = jwt.verify(token,'abc123');
  }catch(e){
    return new Promise((resolve,reject)=>{
      reject();
    })

  }

  return User.findOne(
    {
      _id:decoded._id,
      'tokens.token':token,
      'tokens.access':'auth' 
    }
  )
}

const User = mongoose.model('User', userSchema);
 
module.exports = User;