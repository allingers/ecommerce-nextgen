const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const CLIENT_URL = "http://localhost:5173/"



const createCheckoutSession = async (req, res) => {
try {
    const {customerData} = req.body;
    const userData = JSON.parse(customerData)

    const customerEmail = userData.user.email;
    
    const session = await stripe.checkout.sessions.create({
      line_items: req.body.cart.map((item) => {
        return {
          price: item.price,
          quantity: item.quantity,
        };
      }),
      mode: "payment",
      allow_promotion_codes: true,
      success_url: `${CLIENT_URL}/confirmation`,
      customer_email: customerEmail,
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
