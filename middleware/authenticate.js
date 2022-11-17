const jwt= require('jsonwebtoken')
const authenticate = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        req.user = decoded
        next()
    }catch(error){
        if(error.name =="TokenExpiredError"){
            res.status(401).json({
                message: 'Token Expired'
            })
        }else{
            res.json({
                message: 'Authenticate failed!'
            })
        }
       
    }
}
module.exports = authenticate