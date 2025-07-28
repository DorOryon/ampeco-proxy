const express = require('express');
const fetch = require('node-fetch');
const app = express();

const PORT = process.env.PORT || 10000;

// 🔑 API token שהוזן עבורך
const API_TOKEN = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE5MzE4NjEwNDcsImlhdCI6MTcxOTMwNTA0NywianRpIjoiM2E1ZTVhNDMtZjQwNC00NDExLTk5NDEtOGM5ZTgzOWJmNzE0IiwidXNlcl9pZCI6InVzci03MzUzIn0.qWB5X-m8iZ3dShujU-xY9BzMSPArS4Ye_ylHyxlD9Yk';

app.get('/', (req, res) => {
  res.send('✅ AMPECO Proxy is working. Go to /chargepoints to see data.');
});

app.get('/chargepoints', async (req, res) => {
  try {
    const response = await fetch('https://api.portal.ampeco.io/api/v1/charge-points', {
      headers: {
        Authorization: API_TOKEN,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`AMPECO API error: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Error fetching charge points:', err);
    res.status(500).send('❌ Failed to fetch charge points from AMPECO');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Proxy server running on port ${PORT}`);
});
