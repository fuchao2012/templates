const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const api = require('./middleware/api');

mongoose.connect('mongodb://127.0.0.1:27017/demo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const templateRouter = require('./controller/template');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

require('./middleware/index')(app);

app.use('/xhr/v1', templateRouter);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(8080, () => {
    console.log('server running at http://localhost:8080');
})

module.exports = app;


