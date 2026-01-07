# ReceiptGen

Monorepo with a simple backend (Express + MongoDB) and a Next.js + TypeScript frontend (TailwindCSS).

Quick start:

1. Backend
   - cd backend
   - cp .env.example .env and set `MONGO_URI` to your connection string
   - npm install
   - npm run dev

2. Frontend
   - cd frontend
   - npm install
   - npm run dev

Backend runs on port 5000 by default. Frontend runs on port 3000 by default.

Notes: This scaffold includes an API at `GET/POST /api/receipts` used by the frontend.
# receiptgen
