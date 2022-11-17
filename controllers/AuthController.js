const User  =require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const register =(req,res,next)=>{
    bcrypt.hash(req.body.Password,10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }
        let user = new User({
            Username: req.body.Username,
            Email: req.body.Email,
            Password: hashedPass,
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
    })   
}

const login =(req,res,next)=>{
    var username = req.body.Username
    var password = req.body.Password

    User.findOne({$or:[{Username:username},{Email:username}]})
    .then(user =>{
        if(user){
            bcrypt.compare(password,user.Password,function(err,result){
                if(err){
                    res.json({
                        error:err
                    })
                }
                if(result){
                    let token = jwt.sign({name:user.Username},process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRE_TIME})
                    let refreshtoken = jwt.sign({name:user.Username},process.env.REFRESH_TOKEN_SECRET,{expiresIn:process.env.REFRESH_TOKEN_EXPIRE_TIME})

                    res.json({
                        message:'Login Successful!',
                        token,
                        refreshtoken
                    })
                }else{
                    res.json({
                        message:'Password does not matched'
                    })
                }
            })
        }else{
            res.json({
                message: 'Utilisateur not found!'
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
    register,login,refreshToken
}

    
