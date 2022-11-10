class PaymentController {
  constructor(subscriptionService) {
    this.subscriptionService = subscriptionService;
  }

  async getSubscriptionLink(req, res, email, plan, month) {
    try {
      const subscription = await this.subscriptionService.createSubscription(email, plan, month);

      return res.json(subscription);
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({ error: true, msg: "Failed to create subscription" });
    }
  }
}

module.exports = PaymentController;