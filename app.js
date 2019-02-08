//File for all middlewares and other stuff
const express = require('express');
const app = express();

//require routes api file
const routes = require('./routes/api');

/** Initialize routes */
// Everything after 'api/' will use routes object

app.use('/api', routes);

/**Error handle middleware */
app.use((req, res, next) => {
    const error = new Error('Route not found');
    error.status = 404;//route not found
    next(error);//forward error request
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});


module.exports = app;