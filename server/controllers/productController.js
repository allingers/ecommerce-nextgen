const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function getFormattedProducts(req, res) {
  try {
    const products = await stripe.prices.list({
      active: true,
      expand: ['data.product'],
      limit: 10,
    });

    const formattedProducts = products.data.map((price) => {
      const product = price.product;
      return {
        id: product.price,
        name: product.name,
        image: product.images[0] || null,
        price: product.default_price,
        defaultPrice: price.unit_amount / 100,
      };
    });

    res.json(formattedProducts);
  } catch (error) {
    console.error('Fel vid hämtning av produkter:', error);
    res.status(500).json({ error: 'Kunde inte hämta produkter.' });
  }
}

module.exports = { getFormattedProducts }
  
  