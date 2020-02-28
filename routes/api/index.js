var express  = require('express')
var router = express.Router()
var User = require('../../models/user')
var auth = require('../../auth.js/auth')

/* signup page. */
router.post('/signup', async function(req, res) {
  try{
  // var user = await User.create(req.body)
  var saveUser = await User ({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    location: {
      type: "Point",
      coordinates: [77.17339009999999, 31.1048294]
     }
  })
  var user = await saveUser.save()
  res.status(200).json({success:true, user})
  } catch(error){
    res.json({success: false, error})
  }
});


//login page
router.post('/login', async (req,res) => {
  try{
    var user = await User.findOne({email:req.body.email})
    if(!user) return res.json({success:false, msg: "email isn't registered" })
    if(!user.verifyPassword(req.body.password)) return res.json({success:false, msg: "password is wrong" })
    var token = await auth.generateJWT(user)
    res.json({success:true, user, token})
  }catch(error){
    console.log(error)
    res.json({success:false, error})
  }
})



module.exports = router;
