const express = require('express');
const cors = require('cors');
dotenv = require('dotenv').config(); 
const productRoutes = require('./productRoutes');



const app = express();
const CLIENT_URL = "http://localhost:5173";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

//middleware 
app.use(express.json());
app.use(cors({
    origin: "*", 
})
);

//Routes
app.use(productRoutes);


// app.post("/create-checkout-session", async (req, res) => {
//   try {
//     const session = await stripe.checkout.sessions.create({
//       line_items: req.body.map((item) => {
//         return {
//           price: item.product,
//           quantity: item.quantity,
//         };
//       }),
//       mode: "payment",
//       success_url: `${CLIENT_URL}/confirmation`,
//       cancel_url: CLIENT_URL,
//     });

//     res.status(200).json({ url: session.url });
//   } catch (error) {
//     console.log(error.message);
//     res.status(400).json("Det gick inte bra...");
//   }
// });


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servern lyssnar på port ${port}`);
});