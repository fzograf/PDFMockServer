const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Map account IDs to PDF files
const accountDocuments = {
  '001': 'account_statement.pdf',
  '002': 'account_summary.pdf',
};

app.post('/document', (req, res) => {
  const { accountId } = req.body;

  if (!accountId) {
    return res.status(400).json({ error: 'accountId is required in the request body.' });
  }

  const fileName = accountDocuments[accountId];

  if (!fileName) {
    return res.status(404).json({ error: `No document found for accountId: ${accountId}` });
  }

  const filePath = path.join(__dirname, 'pdfs', fileName);

  if (!fs.existsSync(filePath)) {
    return res.status(500).json({ error: 'Document file not found on server.' });
  }

  const stat = fs.statSync(filePath);

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `inline; filename="${fileName}"`);
  res.setHeader('Content-Length', stat.size);

  const stream = fs.createReadStream(filePath);
  stream.pipe(res);
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Mock PDF server running on port ${PORT}`);
});
