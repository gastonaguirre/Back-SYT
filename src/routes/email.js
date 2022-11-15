const { Router } = require('express');
const router = Router();
const { Users } = require("../db");
const {sendMail, sendMailReport,sendMailPremium} = require("../controllers/mailer")


function hacerPremium (e){
    const findUser = Users.findByPk(e)
    if (!findUser) return "no hay nada";
    const fields = {};
    fields.premiun = true;
 return   findUser.update(fields)
}

router.post("/emails",async(req,res)=>{
        const {name , email}=req.body
   try {
    let mensage =await sendMail(name,email)
    res.status(200).json({mensage})
   } catch (error) {
    res.status(500).json({msg:error})
   } 
})
router.post("/emails/report",async(req,res)=>{
try {
    const {name ,email, msg, usarioreport,tituloPost}= req.body
    if (name && email && msg && usarioreport&& tituloPost){
        let mensage = await sendMailReport(name,email,msg,usarioreport,tituloPost)
        res.status(200).json({mensage})
    }else{
        res.status(500).json({msg:"faltan datos"})
    }
} catch (error) {
    res.status(500).json({msg:error})
}
})

router.post("/emails/premium",async(req,res)=>{
    try {
        const {id, msg,name, email}= req.body;
        
        if(id ){
        let mensagePremium = await sendMailPremium(name,email,msg)
         await hacerPremium(id)
        res.status(200).json({msg : mensagePremium , user: mensagePremium})
         }  
    } catch (error) {
        res.status(500).json({msg:error})
    }
    })

module.exports = router;