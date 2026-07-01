const express = require('express');

const router = express.Router();

router.post('/', async (req, res) => {
  const { to, subject, message } = req.body;

  if (!to) {
    return res.status(400).json({ error: '"to" field (email address) is required in the request body.' });
  }

  // Simulate sending an email successfully without actually sending it
  return res.status(200).json({ 
    success: true, 
    data: { 
      id: "msg_2938475610", 
      message: "Email sent successfully." 
    } 
  });
});

module.exports = router;
