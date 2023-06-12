/**
 *  Middleware to check if response is in cache
 *  @{req, res, next}
 *  */
function checkCache(req, res, next) {
    const cacheKey = req.originalUrl;
    const cachedResponse = cache.get(cacheKey);

    if (cachedResponse) {
        console.log('Response found in cache.');
        res.json(cachedResponse);
    } else {
        next();
    }
}


module.exports = {
    checkCache,
};