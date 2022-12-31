const nodemailer = require("nodemailer")
const transport = nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user:"dhif.ghassen@esprit.tn",
        pass:"GhAlone11951954",
    },
})

module.exports.sendConfirmationEmail = (Email,ActivationCode)=>{
    transport.sendMail({
        from:"dhif.ghassen@esprit.tn",
        to:Email,
        subject:"Confirmer votre compte",
        html:`<h1>Email de Confirmation</h1>
        <h2>${ActivationCode}</h2>
        <p>pour activer votre compte,veuillez copier ce code </p>
        </div>`,
    })

.catch((err)=>console.log(err))
}

module.exports.sendResetPassword = (Email,ActivationCode)=>{
    transport.sendMail({
        from:"dhif.ghassen@esprit.tn",
        to:Email,
        subject:"reset Password",
        html:`<h1>Reset Password</h1>
        <h2>${ActivationCode}</h2>
        <p>pour activer votre compte,veuillez copier ce code </p>
        </div>`,
    })

.catch((err)=>console.log(err))
}