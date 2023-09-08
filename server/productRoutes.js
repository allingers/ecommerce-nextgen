const express = require('express');
const productRoutes = express.Router();
const { getFormattedProducts } = require('../server/controllers/productController');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Använd getFormattedProducts-funktionen från din controller för att hämta och returnera formaterade produkter
productRoutes.get('/api/products', getFormattedProducts);

module.exports = productRoutes;
