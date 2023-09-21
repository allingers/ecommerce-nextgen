const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const fs = require('fs');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); 

const getUsers = () => {
  try {
    const usersData = fs.readFileSync('users.json', 'utf8');
    return JSON.parse(usersData);
  } catch (error) {
    console.error('Fel vid läsning av användare: ', error);
    return [];
  }
};

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const users = getUsers();
    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      return res.status(400).json({ message: 'Användaren finns redan.' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = {
      name,
      email,
      passwordHash: hashedPassword, 
    };

    users.push(newUser);
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2), 'utf8');
    
    const stripeCustomer = await stripe.customers.create({
      name: name,
      email: email, 
    });

    newUser.stripeCustomerId = stripeCustomer.id;

    fs.writeFileSync('users.json', JSON.stringify(users, null, 2), 'utf8');

    res.status(201).json({ message: 'Registrering lyckades.' });
  } catch (error) {
    console.error('Fel vid registrering: ', error);
    res.status(500).json({ message: 'Serverfel.' });
  }
});

module.exports = router;
