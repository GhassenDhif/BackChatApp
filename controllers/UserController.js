const User = require('../models/User')

// afficher tous les users
const index = (req,res,next)=>{
    User.find()
    .then(response =>{
        res.json({
            response
        })
    }
    )
    .catch(error =>{
        res.json({
            message: 'An error occured!'
        })
    }
    )
}



// show single User
const show =(req,res,next)=>{
    let userId=req.params.userId
    User.findById(userId)
    .then(response =>{
        res.json({
            response,
            
       
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
            Image: req.body.Image,
            Genre: req.body.Genre,
            Date_Naissance: req.body.Date_Naissance,
          
        
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
//verfi Activation code
const verfiCode = (req,res,next)=>{
    let code = req.params.Activationcode
    User.findOne
    ({Activationcode:code})
    .then(user=>{
        if(user){
            return res.status(200).json({
                message:"code exist"
            })
        }
        else{
            return res.status(409).json({
                message:"code not exist"
            })
        }
    }
    )
}





// update user
const updateUser = (req,res,next)=>{
    let userId = req.body.userId    
    let updateData = {
        Username: req.body.Username,
        Email: req.body.Email,
        Image: req.body.Image,
        Genre: req.body.Genre,
        Role:req.body.Role,
        Classe:req.body.Clsse,
        Filiere:req.body.Filiere,
        Banne:req.body.Banne,
        IsActive:req.body.IsActive,
        Date_Naissance: req.body.Date_Naissance,
      
    
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

//search user name
const search = (req,res,next)=>{
    let Username = req.body.Username
    User.find
    ({Username:Username})
    .then(User=>{
        if(User){
            return res.status(200).json({
                User
            })
        }
        else{
            return res.status(409).json({
                message:"user not exist"
            })
        }
    }
    )
}

 

module.exports = {
    index, show, Add, update, destroy,verfiCode, updateUser ,search

}
