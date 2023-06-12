var express = require('express');
var router = express.Router();


const { fetchNews } = require('../service')
const { checkCache } = require('../customMiddleware')

/**
 *  Route: Get N news articles
 *  Used cache as middleware to response from in memory
 *  @{req, res}
 *  @{n} : number articles want to fetch
 *  */
router.get('/articles', checkCache, async (req, res) => {
    const { n } = req.query;
    let queryObj = { lang: 'en' };
    if (n)
        queryObj['max'] = n
    const articles = await fetchNews({ lang: 'en', max: n });

    cache.set(req.originalUrl, articles);
    res.json(articles);
});


/**
 *  Route: Search articles by title or author
 *  Used cache as middleware to response from in memory
 *  @{req, res}
 *  */
router.get('/search', checkCache, async (req, res) => {
    const { q } = req.query;
    const articles = await fetchNews({ lang: 'en', q });

    cache.set(req.originalUrl, articles);
    res.json(articles);
});


/**
 *  Route: Search articles by keywords
 *  Used cache as middleware to response from in memory
 *  @{req, res}
 *  */
router.get('/keywords/:keywords', checkCache, async (req, res) => {
    const { keywords } = req.params;
    const articles = await fetchNews({ lang: 'en', topic: keywords });

    cache.set(req.originalUrl, articles);
    res.json(articles);
});

module.exports = router;