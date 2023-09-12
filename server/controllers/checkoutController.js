const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const CLIENT_URL = "http://localhost:5173"; // Uppdatera detta till din frontend-webbplatsens URL

const createCheckoutSession = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: req.body.map((item) => {
        return {
          price: item.product,
          quantity: item.quantity,
        };
      }),
      mode: "payment",
      success_url: `${CLIENT_URL}/confirmation`,
      cancel_url: CLIENT_URL,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error(error.message);
    res.status(400).json("Det gick inte bra...");
  }
};

module.exports = {
  createCheckoutSession,
};
