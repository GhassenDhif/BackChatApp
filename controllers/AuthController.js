const User  =require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { sendConfirmationEmail, sendResetPassword } = require('../server/nodemailer')
const {generate} = require('../controllers/gencodecontroller')

//signup verifie email exist or not   
/*const register  = (req,res,next)=>{
    User.findOne
    ({Email
    :req.body.Email})
    .then(user=>{
        if(user){
            return res.status(409).json({
                message:"email exist"
            })
        }
        else{
            bcrypt.hash(req.body.Password,10,(err,hash)=>{
                if(err){
                    return res.status(500).json({
                        error:err
                    })
                }
                else{
                    const user = new User({
                            Username: req.body.Username,
                            Email: req.body.Email,
                            Password: hash,
                            Image: req.body.Image,
                            Genre: req.body.Genre,
                            Date_Naissance: req.body.Date_Naissance,
                            Role: req.body.Role,
                            Classe: req.body.Classe,
                            Filiere: req.body.Filiere
                    })
                    user.save()
        .then(user =>{
            res.json({
                message: 'Utilisateur added successfully!'
            })
        })
        .catch(error =>{
            res.json({
                message: 'An error occured!'
            })
        })
                }
            })
        }
    })
}*/


//find Email 
const findEmail = (req,res,next)=>{
    User.findOne
    ({Email
    :req.body.Email})
    .then(user=>{
        if(user){
            sendResetPassword(user.Email,user.ActivationCode)
            return res.status(200).json({
                message:"email exist"
                
            })
        }
        else{
            return res.status(409).json({
                message:"email does'nt exist"
            })
        }
    }
    )
}

//reset password activation code
const resetpassword = (req,res,next)=>{
        User.findOne
        ({ActivationCode
        :req.body.ActivationCode})
        .then(user=>{
        if(user){
            bcrypt.hash(req.body.Password,10,(err,hash)=>{
                if(err){
                    return res.status(500).json({
                        error:err
                    })
                }
                else{
                    user.Password=hash
                    user.save()
                    return res.status(200).json({
                        message:"password reseted"
                    })
                }
            })
        }
        else{
            return res.status(409).json({
                message:"Activation code wrong"
            })
        }
    })

} 




//signup verifie email exist or not   
const register  = (req,res,next)=>{
  
    User.findOne
    ({Email
    :req.body.Email})
    .then(user=>{
        if(user){
            return res.status(409).json({
                message:"email exist"
            })
        }
        
        else{
            const characters = 
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let Activationcode="";
            for (let i = 0; i < 20; i++) {
                Activationcode += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            bcrypt.hash(req.body.Password,10,(err,hash)=>{
                if(err){
                    return res.status(500).json({
                        error:err
                    })
                }
                else{
                    const user = new User({
                            Username: req.body.Username,
                            Email: req.body.Email,
                            Password: hash,
                            Image: req.body.Image,
                            Genre: req.body.Genre,
                            Date_Naissance: req.body.Date_Naissance,
                            Role: req.body.Role,
                            Classe: req.body.Classe,
                            Filiere: req.body.Filiere,
                            ActivationCode: Activationcode,
                    })
                    user.save().then(user =>{
                    res.json({
                    message: 'Utilisateur added successfully!'
                    
            })
        })
        .catch(error =>{
            res.json({
                message: 'An error occured!'
            })
        })
        sendConfirmationEmail(user.Email,user.ActivationCode)
                }
            })
        }
    })
 
}

 //verfif Activaationcode and activate user

const activate = (req,res,next)=>{
    User.findOne
    ({ActivationCode
    :req.body.ActivationCode})
    .then(user=>{
        if(user){
            User.update
            ({ActivationCode
            :req.body.ActivationCode},
            {$set:{IsActive:true}})
            .then(user=>{
                res.json({
                    message:"user activated"
                })
            }
            )
        }
        else{
            return res.status(409).json({
                message:"code not exist"
            })
        }
    })
}
  
const login = (req,res,next )=>{
    var Username =req.body.Username
    var Password =req.body.Password
      User.findOne({Email:Username})
        .then(user =>{
            if(user){
                bcrypt.compare(Password,user.Password,function(err,result){
                    if(err){
                        return res.status(404).json({
                            error:err
                        })
                        }
                    if(result){
                        if(!user.IsActive){
                            return res.status(404).json({
                            message: "user not activated"
                        })
                    
                    }else if(user.Banne){
                        return res.status(404).json({
                            message: "user banned"
                        })
                    }else{
                        let token = jwt.sign({Username:user.Email},'verySecretValue',{expiresIn:'1h'})
                        return res.json(
                        user
                    )
                }
            }
                    else{
                        return res.status(404).json({
                message:'Password does not matched'
                })
                    }      
            })
            }else{
                return res.status(404).json({
                    message:'No user found'
                })
            }
        })
    }




const refreshToken = (req,res,next)=>{
    const refreshToken = req.body.refreshToken
    jwt.verify(refreshToken,'refreshtokensecret',function(err,decode){
        if(err){
            res.json({
                err
            })
        }else{
            let token = jwt.sign({name:decode.name},process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRE_TIME})
            let refreshToken=req.body.refreshToken
            res.json({
                message: 'Token Refreshed successfully!',
                token,
                refreshToken
            })
        }
    })
}
module.exports={
    register,login,refreshToken,activate,resetpassword,findEmail
}

    
