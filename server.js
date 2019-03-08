const mongoose = require('mongoose');
const app = require('./app');

/** Database connection */
// Database config
const DB = require('./config/db-keys').mongoURI;

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));


/** Port listening */
// Use port 3000 unless there exists a preconfigured port
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started on post: ${port}.`);
});