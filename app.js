//loading express and morgan
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//where our routes exist ./api/routes
const productRoute = require('./api/routes/products');
const orderRoute = require('./api/routes/orders');
const usersRoute = require('./api/routes/user')
mongoose.connect(`mongodb+srv://node-rest:${process.env.MONGO_KEY}@cluster0.bi2mq.mongodb.net/<dbname>?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// Console log of anything hitting our server 
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Routes
app.use('/products', productRoute);
app.use('/orders', orderRoute);
app.use('/users', usersRoute);
// Errrors 
// Handle 404 not found
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});
// Handle anything else thats not a 404 now found
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    });
});
module.exports = app;