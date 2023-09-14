const express = require('express');
const cors = require('cors');
dotenv = require('dotenv').config(); 
const session = require('express-session');
const cookieParser = require('cookie-parser');

const productRoutes = require('./productRoutes');
const authRoutes = require('./authRoutes'); 
const authController = require('./controllers/authController'); 
const checkoutRoutes = require('./checkoutRoutes');

const app = express();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const secretKey = process.env.MY_SECRET_KEY;

//middleware 
app.use(express.json());
app.use(cors({
    origin: "*", 
})
);

app.use(cookieParser());
app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
  })
);

//Routes
app.use(productRoutes);
app.use('/auth', authRoutes.registrationRoute); // För registrering
app.use('/auth', authRoutes.loginRoute); // För inloggning
app.use('/auth', authRoutes.logoutRoute); // För utloggning
app.use('/checkout', checkoutRoutes);



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servern lyssnar på port ${port}`);
});