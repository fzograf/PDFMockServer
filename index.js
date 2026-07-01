require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

// Import route modules
const documentRouter = require('./routes/document');
const webDashboardWrapperRouter = require('./routes/webDashboardWrapper');
const getMyBillDetailsRouter = require('./routes/getMyBillDetails');
const sendUtilityDocumentsRouter = require('./routes/sendUtilityDocuments');

// Mount routes
app.use('/document', documentRouter);
app.use('/WebDashboardWrapper', webDashboardWrapperRouter);
app.use('/GetMyBillDetails', getMyBillDetailsRouter);
app.use('/sendUtilityDocuments', sendUtilityDocumentsRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Mock PDF server running on port ${PORT}`);
});
