const express = require('express');
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


router.post('/create-checkout-session', async (req, res) => {
  try {
    const { customerData } = req.body;
    const userData = JSON.parse(customerData);

    const session = await stripe.checkout.sessions.create({
      line_items: req.body.cart.map((item) => {
        return {
          price: item.price,
          quantity: item.quantity,
        };
      }),
      mode: "payment",
      allow_promotion_codes: true,
      success_url: `http://localhost:5173/confirmation`,
      customer: userData.user.stripeCustomerId,
    });

    res.status(200).json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error(error.message);
    res.status(400).json("Det gick inte bra...");
  }
});
module.exports = router;


