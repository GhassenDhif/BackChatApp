const User = require('../models/User')

// show the list of user
const index = (req,res,next)=>{
    User.find()
    .then(response =>{
        res.json({
            response
        })
    })
    .catch(error =>{
        res.json({
            message: 'An error occured!'
        })
    })
}

// show single User
const show =(req,res,next)=>{
    let userId = req.body.userId
    User.findById(userId)
    .then(response =>{
        res.json({
            response
        })
    })
    .catch(error =>{
        res.json({
            message: 'An error occured!'
        })
    })
}

// add user in base
const Add = (req,res,next)=>{
    let user = new User({
        Username: req.body.Username,
        Email: req.body.Email,
        Password: req.body.Password,
        Image: req.body.Image,
        Genre: req.body.Genre,
        Date_Naissance: req.body.Date_Naissance,
        Role: req.body.Role,
        Classe: req.body.Classe,
        Filiere: req.body.Filiere
    })
    if(req.files){
        let path ='' 
        req.files.forEach(function(files,index,arr){
            path = path + files.path + ','

        })
        path = path.substring(0,path.lastIndexOf(","))
        user.Image = path
    }
    user.save()
    .then(response =>{
        res.json({
            message: 'User added successfully!'
        })
    })
    .catch(error =>{
        res.json({
            message: 'An error occured!'
        })
    })
}


// update user
const update = (req,res,next)=>{
    let userId = req.body.userId
    let updateData = {
        Username: req.body.Username,
        Email: req.body.Email,
        Password: req.body.Password,
        Image: req.body.Image,
        Genre: req.body.Genre,
        Date_Naissance: req.body.Date_Naissance,
        Role: req.body.Role,
        Classe: req.body.Classe,
        Filiere: req.body.Filiere
    }
    User.findByIdAndUpdate(userId, {$set: updateData})
    .then(()=>{
        res.json({
            message: 'User updated successfully!'
        })
    })
    .catch(error =>{
        res.json({
            message: 'An error occured!'
        })
    })


}

// delete user
const destroy = (req,res,next)=>{
    let userId = req.body.userId
    User.findByIdAndRemove(userId)
    .then(()=>{
        res.json({
            message: 'User deleted successfully!'
        })
    })
    .catch(error =>{
        res.json({
            message: 'An error occured!'
        })
    })
}

module.exports = {
    index, show, Add, update, destroy
}