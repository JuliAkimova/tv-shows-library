const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

/** Database connection */
// Database config
const DB = require('./config/db-keys').mongoURI;

mongoose
    .connect(DB)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));


/** Port listening */
// Use port 3000 unless there exists a preconfigured port
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started on post: ${port}.`);
});