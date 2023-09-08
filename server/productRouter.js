const express = require('express');
const productRouter = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

productRouter.get('/api/products', async (req, res) => {
    try {
      const products = await stripe.prices.list({ active: true });
      res.json(products.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kunde inte hämta produkter.' });
    }
  });

module.exports = productRouter;