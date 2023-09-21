const express = require('express');
const cors = require('cors');
dotenv = require('dotenv').config(); 
const session = require('express-session');
const secretKey = process.env.MY_SECRET_KEY;
const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());



// Middleware
app.use(express.json());
app.use(cors({
  origin: '*', 
  credentials: true, 
}));

app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
  })
);

// controllers
const loginController = require('./controllers/loginController'); 
const logoutController = require('./controllers/logoutController');
const registerController = require('./controllers/registerController'); 
const checkoutController = require ('./controllers/checkoutController');
const orderController = require ('./controllers/orderController');
const productController = require('./controllers/productController');
const stripeController = require('./controllers/stripeController')


//Routes
app.use('/api', productController);
app.use('/api', loginController); //login
app.use('/api', logoutController); //logout
app.use('/api', registerController); //register
app.use('/api', checkoutController ); //checkout
app.use('/api', orderController);
app.use('/api', stripeController)


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servern lyssnar på port ${port}`);
});