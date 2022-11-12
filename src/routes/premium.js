const express = require("express");
const router = express.Router();
const mercadopago= require("mercadopago")
const { MPAGO_ACCESS_TOKEN } = process.env;
mercadopago.configure({
  access_token: MPAGO_ACCESS_TOKEN,
})

router.post("/pay",async(req,res)=>{
try {
  let preference = {
    items: [
      {
        title: "Mi producto",
        unit_price: 5,
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
  res.json({preferenId})

} catch (error) {
  res.status(500).json({msg:error})
}
    // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
})
router.get('/feedback', function (req, res) {
  
	res.json({
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id,
    html:`<a href="http://localhost:3001/profile" target="_blank">volve a la pagina </a>`
	});
});

module.exports = router;