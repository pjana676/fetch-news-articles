const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');

require('dotenv').config()

const app = express();
const cache = new NodeCache({ stdTTL: 3600 });

const G_NEWS_API_KEY =  process.env.G_NEWS_API_KEY; // Replace with your GNews API key

// Middleware to check if response is in cache
const checkCache = (req, res, next) => {
    const cacheKey = req.originalUrl;
    const cachedResponse = cache.get(cacheKey);

    if (cachedResponse) {
        console.log('Response found in cache.');
        res.json(cachedResponse);
    } else {
        next();
    }
};

// Fetch news articles from GNews API
const fetchNews = async (params) => {
    try {
        const response = await axios.get('https://gnews.io/api/v4/top-headlines?apikey=', {
            params: {
                ...params,
                apikey: G_NEWS_API_KEY,
            },
        });
        return response.data.articles;
    } catch (error) {
        console.error('Error fetching news:', error.message);
        return [];
    }
};

// Route: Get N news articles
app.get('/articles', checkCache, async (req, res) => {
    const { n = 5 } = req.query;
    const articles = await fetchNews({ lang: 'en', max: n });

    cache.set(req.originalUrl, articles);
    res.json(articles);
});

// Route: Search articles by title or author
app.get('/search', checkCache, async (req, res) => {
    const { q } = req.query;
    const articles = await fetchNews({ lang: 'en', q });

    cache.set(req.originalUrl, articles);
    res.json(articles);
});

// Route: Search articles by keywords
app.get('/keywords', checkCache, async (req, res) => {
    const { keywords } = req.query;
    const articles = await fetchNews({ lang: 'en', topic: keywords });

    cache.set(req.originalUrl, articles);
    res.json(articles);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});