var express  = require('express')
var router = express.Router()
var User = require('../../models/user')
var auth = require('../../auth.js/auth')
var jwt = require("jsonwebtoken")
var Thought = require('../../models/thoughts')
// user route

router.get('/',auth.verifyJWT, async (req,res) => {
  try{
    var user = await User.findById(req.user.userId)
    res.json({success:true, user})
  }catch(error){
    res.json({success:false, error})
  }
})


// get thoughts
router.get('/thoughts', async function(req, res) {
  try{
  var thoughts = await Thought.find({}).populate('author')
  res.status(200).json({success:true, thoughts})
  } catch(error){
    res.json({success: false, error})
  }
});

// create thoughts 
router.post('/thoughts',auth.verifyJWT, async function(req, res) {
  try{
  req.body.author = req.user.userId
  var thought = await Thought.create(req.body)
  res.status(200).json({success:true, thought})
  } catch(error){
    res.json({success: false, error})
  }
});

//update user
router.put('/update',auth.verifyJWT, async function(req, res) {
  try{
  var user = await User.findByIdAndUpdate(req.user.userId, req.body, {new:true})
  res.status(200).json({success:true, user})
  } catch(error){
    res.json({success: false, error})
  }
});

//update location
router.put('/location',auth.verifyJWT, async function(req, res) {
  try{
    coordinates = req.body.coordinates.map(Number)
    var [long, lat] = await coordinates.map(Number)
  var user = await User.findByIdAndUpdate(req.user.userId, {$set : {"location.coordinates":  [long,lat]}}, {new:true})
  res.status(200).json({success:true, user})
  } catch(error){
    res.json({success: false, error})
  }
});

router.get('/location',auth.verifyJWT, async (req,res) => {
  try{
  var users = await User.find({
    location: {
     $near: {
      $maxDistance: 1000,
      $geometry: {
       type: "Point",
       coordinates: [77.17339009999999, 31.1048294] }}}
   })
   res.status(200).json({success:true, users})
  } catch(error){
    res.json({success:false, error})
  }
})



module.exports = router