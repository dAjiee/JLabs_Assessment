require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors({
  origin: process.env.CLIENT_ORIGIN,
  credentials: false
}));

app.get('/', (_, res) => res.json({ ok: true }));
app.use('/api', require('./routes/auth'));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`API on http://localhost:${port}`));
