//loading express and morgan
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const {
    spawn
} = require('child_process');

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
    }
    next();
});

app.post('/wol', (req, res) => {

    // TODO: Add post password protection

    // if no mac address was sent
    if (!req.body.mac) {
        res.status(404).json({
            error: {
                message: "Missing Mac Address"
            }
        });
        return;
    }

    // chceking to see if its a real mac address
    if (!req.body.mac.toString().match(/^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/g)) {
        res.status(404).json({
            error: {
                message: "Incorrect Mac Address Format | Mac Address must be in format \"01:23:45:67:89:AB\""
            }
        });
        return;
    }

    const wol = spawn("echo", ["lol"]);

    res.status(200).json({
        message: "Lol"
    });
});


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