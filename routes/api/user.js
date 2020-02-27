var express  = require('express')
var router = express.Router()
var User = require('../../models/user')
var auth = require('../../auth.js/auth')
var jwt = require("jsonwebtoken")

// user route

router.get('/',auth.verifyJWT, async (req,res) => {
  try{
    var user = await User.findById(req.user.userId)
    res.json({success:true, user})
  }catch(error){
    res.json({success:false, error})
  }
})


module.exports = router