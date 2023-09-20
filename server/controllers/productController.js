const express = require('express');
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.get('/products', async (req, res) => {
  try {
    const products = await stripe.products.list({ limit: 10 }); // Justera 'limit' efter dina behov

    const productsWithPrices = await Promise.all(
      products.data.map(async (product) => {
        const price = await stripe.prices.retrieve(product.default_price);
        return {
          id: product.default_price,
          name: product.name,
          description: product.description,
          image: product.images[0] || null,
          price: price.unit_amount / 100, // Dela med 100 för att få priset i rätt format
          currency: price.currency,
        };
      })
    );

    res.status(200).json(productsWithPrices);
  } catch (error) {
    console.error('Fel vid hämtning av produkter:', error);
    res.status(500).json('Det gick inte att hämta produkter.');
  }
});

module.exports = router;

  