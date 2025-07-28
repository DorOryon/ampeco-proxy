const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 10000;

const AMPECO_TOKEN = '5b616246-8aac-48a3-aae2-98f94494f669'; // ← שים את הטוקן שלך כאן

const AMPECO_BASE_URL = 'https://cp.edgecontrol.net/public-api/resources/charge-points/v1.0';

app.use(cors());

// נתיב ראשי - כדי שלא תקבל שגיאה ב- /
app.get('/', (req, res) => {
  res.send('AMPECO Proxy Server is running');
});

// הנתיב שאתה אמור לקרוא אליו מה-Frontend
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
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch charge points from AMPECO' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});
