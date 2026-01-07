const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: String,
  qty: { type: Number, default: 1 },
  price: { type: Number, default: 0 }
});

const ReceiptSchema = new mongoose.Schema({
  title: { type: String, default: 'Receipt' },
  date: { type: Date, default: Date.now },
  items: [ItemSchema],
  total: { type: Number, default: 0 }
});

module.exports = mongoose.model('Receipt', ReceiptSchema);