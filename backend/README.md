# ReceiptGen Backend

Simple Express + Mongoose backend for the Receipt Generator app.

Setup:

1. Copy `.env.example` to `.env` and update `MONGO_URI`.
2. npm install
3. npm run dev (requires nodemon) or npm start

Endpoints:
- GET /api/receipts
- POST /api/receipts { title, items: [{name, qty, price}] }
