const mongoose   =require('mongoose')
const Schema = new mongoose.Schema

({
    Username:{
        type: String,
    },
    Email:{
        type: String,   
    },
    
    Password:{
        type: String,
    },

    Image:{
        type: String,
    },

    Genre:{
        type: String,
    },

    Date_Naissance:{
        type: String,
    },

    Role:{
        type: String,
    },

    Classe:{
        type: String,
    },

    Filiere:{
        type: String,   
    },
    IsActive:{
        type: Boolean,
        default: false,
    },
    ActivationCode:{
        type: String,
    },
    Banne:{
        type: Boolean,
        default:false,
    }
},  {timeStamps:true})

module.exports = mongoose.model('User', Schema)
