// authRoutes.js
const express = require('express');
const authController = require('./controllers/authController');
const registrationRoute = express.Router();

registrationRoute.post('/register', authController.registerUser);

module.exports = registrationRoute;
