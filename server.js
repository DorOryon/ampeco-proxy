const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

const AMPECO_TOKEN = "5b616246-8aac-48a3-aae2-98f94494f669";
const AMPECO_URL = "https://cp.edgecontrol.net/public-api/resources/charge-points/v1.0";

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/api/chargers', async (req, res) => {
  try {
    const response = await fetch(AMPECO_URL, {
      headers: {
        Authorization: `Bearer ${AMPECO_TOKEN}`
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch from AMPECO', details: err.toString() });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});