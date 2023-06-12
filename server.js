const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');

const app = express();
const cache = new NodeCache({ stdTTL: 3600 });

const G_NEWS_API_KEY =  process.env.G_NEWS_API_KEY; // Replace with your GNews API key

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});