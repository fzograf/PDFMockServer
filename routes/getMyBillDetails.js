const express = require('express');
const { getAccountData } = require('../store');

const router = express.Router();

router.post('/', (req, res) => {
  const { I_PARTNER, I_VKONT } = req.body;
  if (!I_PARTNER || !I_VKONT) {
    return res.status(400).json({ error: 'I_PARTNER and I_VKONT are required in the request body.' });
  }

  const accountData = getAccountData(I_PARTNER, I_VKONT);
  if (!accountData) {
    return res.status(404).json({ error: `No mock data found for partner ${I_PARTNER} and account ${I_VKONT}.` });
  }

  res.json(accountData.billDetails);
});

module.exports = router;
