const express = require('express');
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post('/check-payment-status', async (req, res) => {
  try {
    const { sessionId } = req.body;

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      res.status(200).json({ status: 'paid' });
    } else {
      res.status(200).json({ status: 'unpaid' });
    }
  } catch (error) {
    console.error('Fel vid kontroll av betalningsstatus:', error);
    res.status(500).json({ status: 'error' });
  }
});

module.exports = router;
