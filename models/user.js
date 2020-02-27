var mongoose = require('mongoose')
var Schema = mongoose.Schema
var bcrypt = require('bcryptjs') 

userSchema = new Schema({
   name: {
     type: String,
     required: true
   },
   email: {
     type: String,
     required:true,
     unique: true
   },
   password:{
     type: String,
     required:true,
     minlength : 6
   }
}, { timestamps: true} )


userSchema.pre('save', function(next){
  if(this.password && this.isModified('password')){
  this.password = bcrypt.hashSync(this.password, 10)
  next();
  }
})

userSchema.methods.verifyPassword = function(password){
  var validate =  bcrypt.compareSync(password, this.password)
  return validate
}


module.exports = mongoose.model('User', userSchema)