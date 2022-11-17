const express = require("express");
const router = express.Router();

const Stripe = require("stripe");
const { Users } = require("../db");
const {sendMailPremium} = require("../controllers/mailer")

const stripe = new Stripe("sk_test_51M4XYbIEql9X77EBzKonxJpaGRoqHvufT3XLhV2sWbGUFenpZ6tsLPMW3Jn5uMirPe96T7OacjD65fsdr0LSwm7M00qKOcsbaT")

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





router.post("/api/checkout", async (req, res) => {
  try {
    console.log(req.body)
    const { id, amount, userId , name , email } = req.body
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "SYT-suscripcion",
      payment_method: id,
      confirm: true,
    })
    const msg = payment
  const userPremiumEmail = await sendMailPremium(name, email,payment)
  const userpremium =  await  hacerPremium(userId)
    
    res.send({msg: "Aprobet"})
  } catch (error) {
    
    res.status(500).json({msg: error})
  }

})

module.exports = router;