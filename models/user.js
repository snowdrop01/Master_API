const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt')
const crypto = require('crypto')

var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role: {
      type: String,
      default : "user"
    },
    cart: {
      type: Array,
      default: []
    },
    address: {  type:String },
    wishlist: 
    [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    }],
    refreshToken : {
      type : String
    },
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date
},
{
  timestamps : true
},

);

userSchema.pre('save', async function (next) {
  const user = this

  if(user.isModified('password')){
    user.password =  await bcrypt.hash(user.password,8);
  }
  next();
})

userSchema.methods.isPasswordMatched = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.createPasswordResetToken = async function(){
  const refreshtoken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto.createHash("sha256").update(refreshtoken).digest("hex");
  this.passwordResetExpires = Date.now() + 30*60*1000; // 30 minutes
  return refreshtoken;
}
const User = mongoose.model('User', userSchema);
//Export the model
module.exports = User;
