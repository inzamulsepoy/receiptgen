const express = require('express');
const Receipt = require('../models/Receipt');
const router = express.Router();

// GET /api/receipts - list receipts
router.get('/', async (req, res) => {
  try {
    const receipts = await Receipt.find().sort({ date: -1 });
    res.json(receipts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/receipts - create a receipt
router.post('/', async (req, res) => {
  try {
    const { title, items } = req.body;
    const total = (items || []).reduce((s, it) => s + (it.price || 0) * (it.qty || 1), 0);
    const r = new Receipt({ title, items, total });
    await r.save();
    res.status(201).json(r);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;