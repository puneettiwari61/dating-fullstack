var mongoose = require('mongoose')
var Schema = mongoose.Schema


thoughtsSchema = new Schema({
   topic: {
     type: String,
     required: true
   },
   desc: {
     type: String,
     required:true,
   },
    author:{
     type: Schema.Types.ObjectId,
     ref: 'User'
   }
}, { timestamps: true} )




module.exports = mongoose.model('Thought', thoughtsSchema)