const express = require('express');
const router = express.Router();

// POST /api/logout
router.post('/logout', (req, res) => {
  // Ta bort autentiseringscookien från klienten.
  req.session.destroy();
  res.clearCookie('authCookie');
  res.status(200).send('Utloggning lyckades.');
});

module.exports = router;