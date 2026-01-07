const express = require('express');
const cors = require('cors');
const bodyParser = require('express').json;
const connectDB = require('./db');
const receiptsRouter = require('./routes/receipts');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(bodyParser());

app.use('/api/receipts', receiptsRouter);

app.get('/', (req, res) => res.send('ReceiptGen backend up'));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));