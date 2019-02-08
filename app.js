//File for all middlewares and other stuff
const express = require('express');
const app = express();

//require routes api file
const routes = require('./routes/api');

/** Initialize routes */
// Everything after 'api/' will use routes object

app.use('/api', routes);

module.exports = app;