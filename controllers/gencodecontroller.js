const Gencode = require('../models/genecodet')
const { sendConfirmationEmail } = require('../server/nodemailer')

//generate gencode and save it
const generate = (req,res,next)=>{
    const code = Math.floor(Math.random()*9000+1000)
    let gencode = new Gencode({
        email: req.body.email,
        Code: code,
       
    })
    gencode.save()
    .then(response =>{
        sendConfirmationEmail(gencode.email,gencode.Code)

        res.json({
            message: 'gencode added successfully!'
        }) 
    })
    .catch(error =>{
        res.json({
            message: 'An error occured!'
        })
    })

}



module.exports = {
    generate}