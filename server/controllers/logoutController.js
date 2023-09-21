const express = require('express');
const router = express.Router();

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('authCookie');
  res.status(200).send('Utloggning lyckades.');
});

module.exports = router;