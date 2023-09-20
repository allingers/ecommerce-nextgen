const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const fs = require('fs');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Importera Stripe SDK

const getUsers = () => {
  try {
    const usersData = fs.readFileSync('users.json', 'utf8');
    return JSON.parse(usersData);
  } catch (error) {
    console.error('Fel vid läsning av användare: ', error);
    return [];
  }
};

// POST /api/register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Kontrollera om användaren redan finns (efter e-postadressen)
    const users = getUsers();
    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      return res.status(400).json({ message: 'Användaren finns redan.' });
    }

    // Skapa en hash av lösenordet
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Skapa en ny användare
    const newUser = {
      name,
      email,
      passwordHash: hashedPassword, // Sparat som hash
    };

    // Lägg till den nya användaren i JSON-filen
    users.push(newUser);
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2), 'utf8');

    // Skapa en kund i Stripe när användaren registrerar sig
    const stripeCustomer = await stripe.customers.create({
      name: name,
      email: email, // Användarens e-postadress
      // Andra kunduppgifter om det behövs
    });

    // Spara Stripe-kundens ID i din användardatabas eller där du lagrar användarinformationen
    newUser.stripeCustomerId = stripeCustomer.id;

    // Uppdatera användaren med Stripe-kundens ID i JSON-filen
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2), 'utf8');

    res.status(201).json({ message: 'Registrering lyckades.' });
  } catch (error) {
    console.error('Fel vid registrering: ', error);
    res.status(500).json({ message: 'Serverfel.' });
  }
});

module.exports = router;
