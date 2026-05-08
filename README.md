# Mock PDF Server

A simple Express mock server that returns PDF binary files based on an account ID.

## Endpoints

### POST /document
Returns a PDF file for the given account ID.

**Request Body:**
```json
{
  "accountId": "001"
}
```

**Response:**
- `Content-Type: application/pdf`
- Binary PDF file

**Available Account IDs:**
| Account ID | Document |
|------------|----------|
| 001 | account_statement.pdf |
| 002 | account_summary.pdf |

**Error Responses:**
- `400` — missing accountId
- `404` — accountId not found

### GET /health
Returns `{ "status": "ok" }` — useful for Render health checks.

---

## Local Development

```bash
npm install
npm start
```

Server runs on `http://localhost:3000`

**Test with curl:**
```bash
curl -X POST http://localhost:3000/document \
  -H "Content-Type: application/json" \
  -d '{"accountId": "ACC001"}' \
  --output result.pdf
```

---

## Deploy to Render

1. Push this repo to GitHub
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your GitHub repo
4. Set the following:
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Click **Deploy**

Render will assign a public HTTPS URL automatically.
