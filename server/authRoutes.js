// authRoutes.js
const express = require('express');
const authController = require('./controllers/authController');
const registrationRoute = express.Router();
const loginRoute = express.Router();
const logoutRoute = express.Router();

registrationRoute.post('/register', authController.registerUser);
loginRoute.post('/login', authController.loginUser);
logoutRoute.post('/logout', authController.logoutUser);

module.exports = {
    registrationRoute,
    loginRoute, 
    logoutRoute,
  };
