const axios = require("axios");

class PaymentService {

  async createSubscription(email, plan, month) {
    const url = "https://api.mercadopago.com/preapproval";

    const body = {
      reason: "Pagame Papito",
      auto_recurring: {
        frequency: month,
        frequency_type: "months",
        transaction_amount: plan,
        currency_id: "ARS"
      },
      back_url: "https://google.com.ar/",
      payer_email: email
    };

    const subscription = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
      }
    });

    return subscription.data;
  }
}

module.exports = PaymentService;
