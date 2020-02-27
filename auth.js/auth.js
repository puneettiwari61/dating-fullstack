var jwt = require('jsonwebtoken')

module.exports = {
  generateJWT: async (user) => {
    var payload = {email: user.email, userId: user.id}
    var token = await jwt.sign(payload,process.env.SECRET)
    return token
  },
  verifyJWT: async(req,res,next) => {
  var token =  await req.headers['authorization'] || '' ; 
  if(token){
    try{  
      var payload = jwt.verify(token, process.env.SECRET);
      req.user = payload;
      req.user.token = token  
      next();
    }catch(error){
      res.json({success: false, msg:'invalid token'})
    }
    }else{
    res.json({success:false, msg:'token required'})
    } 
  }
}