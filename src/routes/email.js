const { Router } = require('express');
const { Users } = require("../db");
const {sendMail, sendMailReport,sendMailPremium  } = require("../controllers/mailer")
const router = Router();

async function hacerPremium(e){
    try{
        if(e){
            
            const findUser = await Users.findByPk(e);
            if (!findUser) throw new Error("No se ha encontrado un usuario existente con el id ingresado");
            const fields = {};
            fields.premiun = true;
            await findUser.update(fields); 
        }else{
            throw new Error("faltan datos")
        }
    }catch(error){
        throw new Error(error)
    }
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
        let mensage =await sendMailReport(name,email,msg,usarioreport,tituloPost)
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
        const {name ,email, msg ,id}= req.body
        if (id && name && email){
            await hacerPremium(id)
            let mensage =await sendMailPremium(name,email,msg)
            res.status(200).json({repon : "AHORA SOS PREMIUM ", msg : mensage})
        }else{
            res.status(500).json({msg:"faltan datos"})
        }
    } catch (error) {
        res.status(500).json({msg:error})
    }
})


module.exports = router;