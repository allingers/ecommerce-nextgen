const express = require("express");
const checkoutRoute = express.Router();
const { createCheckoutSession } = require("./controllers/checkoutController");

// Skapa en ny checkout-session
checkoutRoute.post("/create-checkout-session", createCheckoutSession);

module.exports = checkoutRoute;
