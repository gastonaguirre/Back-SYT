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
        unit_price: 4,
        quantity: 1,
      },
    ],
    back_urls: {
			"success": "http://localhost:3000/",
			"failure": "http://localhost:3000/",
			"pending": "http://localhost:3000/"
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
		Status: req.query.status,
	});
});

module.exports = router;