const mongoose   =require('mongoose')
const Schema = new mongoose.Schema
({
    Code:{
        type: String,
    },
    email:{
        type: String,
    },

    
})

module.exports = mongoose.model('Gencode', Schema)