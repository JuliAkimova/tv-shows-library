//File for all middlewares and other stuff
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//require routes api file
const routes = require('./routes/api');
const adminRoutes = require('./routes/admin');

//body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//CORS error handling
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.header("Cache-Control", "no-cache, no-store, must-revalidate")
    if(req.method === 'OPTIONS') {
        res.header('Acces-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
        return res.status(200).json({});
    }
    next()
});

/** Initialize routes */
// Everything after 'api/' will use routes object
app.use('/api/shows', routes);

//Initialize admin routes
app.use('/admin', adminRoutes);

//public access to uploads folder
app.use('/uploads', express.static('uploads'));

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