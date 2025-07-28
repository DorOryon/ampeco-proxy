const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// מסלול בדיקה
app.get('/', (req, res) => {
  res.send('AMPECO Proxy is working!');
});

// כאן בעתיד נכניס את השאילתה ל-API

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
