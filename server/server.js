const express = require('express');
const cors = require('cors');
dotenv = require('dotenv').config(); 
const session = require('express-session');
const secretKey = process.env.MY_SECRET_KEY;
const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

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


const loginController = require('./controllers/loginController'); 
const logoutController = require('./controllers/logoutController');
const registerController = require('./controllers/registerController'); 
const checkoutController = require ('./controllers/checkoutController');
const orderController = require ('./controllers/orderController');
const productController = require('./controllers/productController');
const stripeController = require('./controllers/stripeController')


app.use('/api', productController);
app.use('/api', loginController); 
app.use('/api', logoutController); 
app.use('/api', registerController); 
app.use('/api', checkoutController ); 
app.use('/api', orderController);
app.use('/api', stripeController)


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servern lyssnar på port ${port}`);
});