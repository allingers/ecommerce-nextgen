const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const fs = require('fs');
const uuid = require('uuid');

const getUsers = () => {
    try {
      const usersData = fs.readFileSync('users.json', 'utf8');
      return JSON.parse(usersData);
    } catch (error) {
      console.error('Fel vid läsning av användare: ', error);
      return [];
    }
  };
  
  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const users = getUsers();
      const user = users.find((u) => u.email === email);
  
      if (!user) {
        return res.status(401).send('Användaren finns inte.');
      }
      const passwordMatch = await bcrypt.compare(password, user.passwordHash);
  
      if (!passwordMatch) {
        return res.status(401).send('Felaktiga inloggningsuppgifter.');
      }

      const authToken = uuid.v4();

    req.session.user = { id: user.stripeCustomerId, authToken };
    res.cookie('authCookie', authToken, { httpOnly: false });
    console.log(req.session.user)

    return res.status(200).json({ user: user});
    } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Inloggningen misslyckades.' });
    }
    });

module.exports = router;
