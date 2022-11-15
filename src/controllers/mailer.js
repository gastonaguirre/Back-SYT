const nodemailer = require("nodemailer")
const { google } = require("googleapis");
const { GMAIL_CLIENT_ID,GNAIL_CLIENT_SECRET,GMAIL_REFRESH_TOKEN,GAMIL_REDIRECT } = process.env;

const CLIENTID = GMAIL_CLIENT_ID
const CLIENTSECRET=GNAIL_CLIENT_SECRET
const REFRESHTOKEN=GMAIL_REFRESH_TOKEN
const REDIRECT=GAMIL_REDIRECT


const oAuth2client = new google.auth.OAuth2(
    CLIENTID,
    CLIENTSECRET,
    REDIRECT
)
oAuth2client.setCredentials({
    refresh_token:REFRESHTOKEN
})

async function sendMail(name,email){
    
    try{
        const contentHtml = `Bienvenido SYT
        <h1>Gracias :${email} </h1>
        <p>Hola como esta gracias por unirte a esta nueva comunidad de SYT
        con el nombre de usuario 
        </p> 
        <p>email de usuario : ${email}</p>
        <p>nickname de usuario:  ${name}</p>
        <p>tu ahi es  </p>`
        const accessToken= await oAuth2client.getAccessToken()
        const transporter =  nodemailer.createTransport({
            service:"gmail",
            auth:{
                type:"OAuth2",
                user:"luis2003nb@gmail.com",
                clientId:CLIENTID,
                clientSecret:CLIENTSECRET,
                refreshToken:REFRESHTOKEN,
                accessToken
            }
        })

        const mailOptions= {
            from: "PAgina ",
            to:email,
            subject:"< SYT MENSAJE DE BIENVENIDA>",
            html: contentHtml
        }
  const emailBienvenida=  await transporter.sendMail(mailOptions)

   res.status(200).json({msg:emailBienvenida})
    }catch(error){
        res.status(500).json({msg:error})
    }
}
async function sendMailReport(name,email,msg, usarioreport , tituloPost){
    
    try{
        const contentHtmlAdmin= `<h1>SYT solicitud de REPORT</h1>
        <h2>Report enviado de : ${name} , con el email: ${email} </h2>
        <p>Titulo del Post a report: ${tituloPost} , nickname del propietario ${usarioreport}</p>
        <p>Razon de report:${msg}</p>
        `
        const contentHtml = `
                <h1>SYT solicitud de REPORT</h1>
                <h2>Report enviado de : ${name} , con el email: ${email} </h2>
                <p>Titulo del Post a report: ${tituloPost} , nickname del propietario ${usarioreport}</p>
                <p>Razon de report: ${msg}</p>
                `

        const accessToken= await oAuth2client.getAccessToken()
      const transporter =  nodemailer.createTransport({
            service:"gmail",
            auth:{
                type:"OAuth2",
                user:"luis2003nb@gmail.com",
                clientId:CLIENTID,
                clientSecret:CLIENTSECRET,
                refreshToken:REFRESHTOKEN,
                accessToken
            }
        })
        const mailOptions= {
            from: "PAgina ",
            to:email,
            subject:"<TE PUSISTE LA GORRA, GRACIAS PA BESITOS>",
            html: contentHtml
        }
        const mailOptionsAdmin={
            from: "PAgina ",
            to:"luis2003nb@gmail.com",
            subject:"<UN USUARIO ROMPIO LAS REGLAS DE SYT >",
            html: contentHtmlAdmin
        }
        const emailReport = await transporter.sendMail(mailOptions)
        const emailReportumAdmin = await transporter.sendMail(mailOptionsAdmin)
        return emailReport, emailReportumAdmin
    }catch(error){
        res.status(500).json({msg:error})
    }
}

async function sendMailPremium(name,email,msg){
    
    try{
        const contentHtmlAdmin= `<h1>SYT solicitud de PREMIUM</h1>
        <h2>DATOS DEL USUARIO QUE COMPRO PREMIUM enviado de : ${name} , con el email: ${email} </h2>
        <p>DATA DEL PAGO:${msg}</p>
        `
        const contentHtml = `
                <h1>SYT GRACIAS PAPA POR HACERTE PREMIUM</h1>
                <h2>TE HICISTE PREMIUM CON ESTE USUARIO name : ${name} ,  email: ${email} </h2>
                <p>DATOS DE LA COMPRA : ${msg}</p>
                `

        const accessToken= await oAuth2client.getAccessToken()
      const transporter =  nodemailer.createTransport({
            service:"gmail",
            auth:{
                type:"OAuth2",
                user:"luis2003nb@gmail.com",
                clientId:CLIENTID,
                clientSecret:CLIENTSECRET,
                refreshToken:REFRESHTOKEN,
                accessToken
            }
        })
        const mailOptions= {
            from: "PAgina ",
            to:email,
            subject:"<TE LA PUEDO ..., GRACIAS PA BESITOS>",
            html: contentHtml
        }
        const mailOptionsAdmin={
            from: "PAgina ",
            to:"luis2003nb@gmail.com",
            subject:"<UN USUARIO PAGO PREMIUM DE SYT >",
            html: contentHtmlAdmin
        }
   const emailPremium =  await transporter.sendMail(mailOptions)
   const emailPremiumAdmin =  await transporter.sendMail(mailOptionsAdmin)
        return emailPremium , emailPremiumAdmin
    }catch(error){
        return error
    }
}


module.exports ={
    sendMail,
    sendMailReport,
    sendMailPremium
}
