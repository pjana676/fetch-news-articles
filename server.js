const express = require('express');
const NodeCache = require('node-cache');

require('dotenv').config()

var articles = require('./routes/articles');

const app = express();
cache = new NodeCache({ stdTTL: 3600 });


app.use('/api', articles)

/**
 *  Start the server
 *  @{port}
 *  */
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});