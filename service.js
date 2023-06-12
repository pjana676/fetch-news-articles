
const axios = require('axios');

const G_NEWS_API_KEY = process.env.G_NEWS_API_KEY;

/**
 *  Fetch news articles from GNews API
 *  @{params} : query string
 *  */
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


module.exports = {
    fetchNews,
};