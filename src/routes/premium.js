const express = require("express");
const router = express.Router();

const PaymentController = require("../controllers/PaymentController");
const PaymentService = require("../controllers/PaymentService");

const PaymentInstance = new PaymentController(new PaymentService());

router.get("/", function (req, res, next) {
  return res.json({
    "/subscription": "generates a subscription link"
  });
});


router.get("/subscription/:email/:plan/:month", async function (req, res, next) {
  const { email, plan, month } = req.params;
  if (email) {
    try {
      PaymentInstance.getSubscriptionLink(req, res, email, plan, month);
    } catch (error) {
      next(error);
    }
  } else {
    res.status(400).send({ msg: "need a email" });
  }
});
router.get("/payment", function (req, res, next) {
  PaymentInstance.getPaymentLink(req,res)
});


module.exports = router;