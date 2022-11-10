const nodemailer = require("nodemailer")

const { PASSWORD_EMAIL} = process.env;

  const transporter = nodemailer.createTransport({
    host:"smtp.ethereal.email",
    port:587,
    secure: false,
    auth:{
        user:"brian66@ethereal.email",
        pass:"pe8r94FqtxcFeM4WbW"
    }
    }) 
transporter.verify().then(()=>{
    console.log("listo para enviar emails")
})

 const enviarEmailsPost = async(req, res)=>{
try {
    let {text, email,titulo, usuario} = req.body
    let mailOptions = {
        from : "Remitente",
        to: email,
        subject:"Enviando desde nodemailer",
        html:
        ` <h1>${titulo}</h1>
            <h2>nombre de usuario del report: ${usuario}</h2
        <p>razon de report /o, cuenta premuim  ${text}</p>
        `
    }
    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            res.status(500).send(error)
        }else{
            console.log("email enviado")
            res.status(200).json(req.body)
        }
    })
} catch (error) {
    console.log(error)
}
}


module.exports={
    enviarEmailsPost
}