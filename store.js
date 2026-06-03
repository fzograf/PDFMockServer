const fs = require('fs');
const path = require('path');

const PARTNERS = [
  "1234512345",
  "2345623456",
  "3456734567",
  "1001034906"
];

const ACCOUNTS = [
  { partner: PARTNERS[0], account: "9876598765" },
  { partner: PARTNERS[0], account: "8765487654" },
  { partner: PARTNERS[1], account: "7654376543" },
  { partner: PARTNERS[1], account: "6543265432" },
  { partner: PARTNERS[2], account: "5432154321" },
  { partner: PARTNERS[3], account: "3396669693" }
];

console.log("--- Loading Mock Data for the following accounts ---");
ACCOUNTS.forEach(({ partner, account }) => {
  console.log(`Partner: ${partner} | Account: ${account}`);
});
console.log("------------------------------------------------------");

function getAccountData(partner, account) {
  const dataDir = path.join(__dirname, 'data');
  const webDashboardFile = path.join(dataDir, `${partner}_${account}_WebDashboardWrapper.json`);
  const getMyBillDetailsFile = path.join(dataDir, `${partner}_${account}_GetMyBillDetails.json`);

  if (!fs.existsSync(webDashboardFile) || !fs.existsSync(getMyBillDetailsFile)) {
    return null;
  }

  const webDashboard = JSON.parse(fs.readFileSync(webDashboardFile, 'utf-8'));
  const billDetails = JSON.parse(fs.readFileSync(getMyBillDetailsFile, 'utf-8'));

  return {
    webDashboard,
    billDetails
  };
}

module.exports = {
  getAccountData
};
