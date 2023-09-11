const express = require('express');
const authController = require('./controllers/authController');
const loginRoute = express.Router();

loginRoute.post('/login', authController.loginUser);


module.exports = loginRoute;
