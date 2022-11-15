const { Router } = require('express');
const router = Router();

const {sendMail, sendMailReport} = require("../controllers/mailer")

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
        
           console.log( req.body)    
    } catch (error) {
        res.status(500).json({msg:error})
    }
    })


module.exports = router;