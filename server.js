const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 10000;

const AMPECO_TOKEN = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOi...'; // ← החלף את הטוקן אם משתנה בעתיד

const AMPECO_BASE_URL = 'https://cp.edgecontrol.net/public-api/resources/charge-points/v1.0';

app.use(cors());

app.get('/charge-points', async (req, res) => {
  try {
    const response = await axios.get(AMPECO_BASE_URL, {
      headers: {
        Authorization: AMPECO_TOKEN,
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch charge points from AMPECO' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});
