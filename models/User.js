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
        type: Date,
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
},  {timeStamps:true})

module.exports = mongoose.model('User', Schema)