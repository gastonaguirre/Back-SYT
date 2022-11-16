const express = require("express");
const router = express.Router();
const mercadopago = require("mercadopago")
const Stripe = require("stripe");
const { Users } = require("../db");
const { MPAGO_ACCESS_TOKEN } = process.env;
mercadopago.configure({
  access_token: MPAGO_ACCESS_TOKEN,
})
const stripe = new Stripe("sk_test_51M4XYbIEql9X77EBzKonxJpaGRoqHvufT3XLhV2sWbGUFenpZ6tsLPMW3Jn5uMirPe96T7OacjD65fsdr0LSwm7M00qKOcsbaT")

async function hacerPremiumStripe(e){
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

router.post("/pay", async (req, res) => {
  try {
    let preference = {
      items: [
        {
          title: "Premium",
          unit_price: 2,
          quantity: 1,
        },
      ],
      back_urls: {
        "success": "http://localhost:3001/premium/feedback",
        "failure": "http://localhost:3001/premium/feedback",
        "pending": "http://localhost:3001/premium/feedback"
      },
      auto_return: "approved",
    };
    const respon = await mercadopago.preferences.create(preference);
    const preferenId = respon.body.id;
    res.json({ preferenId })

  } catch (error) {
    res.status(500).json({ msg: error })
  }
  // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
})
router.get('/feedback', async (req, res) => {

  if (req.query) {
    const resul = req.query.collection_status
    console.log(resul)
    res.status(200).send({
      msg: "todo bien pa ahi reviso de paga",
      Status: resul,
    });
  } else {
    res.status(500).send({ msg: "TODO MAL OTRA VEZ" })
  }

});


router.post("/api/checkout", async (req, res) => {
  try {
    const { id, amount,userId } = req.body
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      payment_method: id,
      confirm: true,
    })
    hacerPremiumStripe(userId)

    res.send({msg: "Aprobet"})
  } catch (error) {
    
    res.status(500).json({msg: error})
  }

})

module.exports = router;