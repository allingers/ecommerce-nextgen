const fs = require('fs');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

const users = JSON.parse(fs.readFileSync('users.json', 'utf-8'));

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Kontrollera om användaren redan finns i JSON-filen
    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      return res.status(400).json({ error: 'Användaren finns redan.' });
    }

    // Skapa en ny kund i Stripe
    const customer = await stripe.customers.create({
      email,
      name,
      // Lägg till andra relevanta uppgifter här
    });

    // Hasha lösenordet innan det sparas
    const hashedPassword = await bcrypt.hash(password, 10);

    // Skapa en ny användare
    const newUser = {
      id: uuidv4(),
      email,
      hashedPassword,
    };

    // Lägg till den nya användaren i JSON-filen
    users.push(newUser);
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));

    // Skicka en bekräftelse till klienten
    return res.status(201).json({ message: 'Användaren har registrerats.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Registrering misslyckades.' });
  }
};

const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Hitta användaren i listan med användare
      const user = users.find((u) => u.email === email);
  
      if (!user) {
        return res.status(401).json({ error: 'Felaktig e-post eller lösenord.' });
      }
  
      // Jämför lösenordet med den hashade versionen
      const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
  
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Felaktig e-post eller lösenord.' });
      }
  
      // Sätt en cookie med användarens ID (om du vill använda sessioner)
      req.session.userId = user.id;
  
      // Skicka en bekräftelse till klienten
      return res.status(200).json({ message: 'Inloggningen var framgångsrik.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Inloggningen misslyckades.' });
    }
  };
  
module.exports = {
  registerUser, loginUser
};
