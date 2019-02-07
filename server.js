const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();


/* Port listening */
// Use port 3000 unless there exists a preconfigured port
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started on post: ${port}.`);
});