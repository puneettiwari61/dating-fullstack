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
   },
   image:{
     type: String,
     default: 'https://lh3.googleusercontent.com/proxy/M5NmEvmfDv5iG0pqFikRjoyhHh5ZPIAaUyeP5RjBv7Yvh_SDKYxdRy1u0YcvalzZhyYHjnqGt-AJsRItMrYay1gB8oZb7IAqvcsraXIaDx4s_MELIWrjaEnr7ahpOfs8ydXUaziT1bc'
   },
   location: {
    type: {
      type: String,
      enum: ['Point'], 
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
}, { timestamps: true} )

userSchema.index({ location: "2dsphere" });


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